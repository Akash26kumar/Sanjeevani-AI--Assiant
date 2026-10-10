import { Patient } from "../models/patientModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { extractTextFromPDF,getBlobURL,getUploadURL,deleteBlob } from "../utils/azure.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import axios from "axios";
import { makeUniqueFileName } from "../utils/helper.js";
import mongoose from "mongoose";


const getReportList = asyncHandler(async (req, res) => {
    try {
        // Fetch patient directly using provided ID (since there's no User model)
        const patient = await Patient.findById(req.params.id || req.body.id).populate("reportsList");
        console.log("🔍 Checking patient ID:", req.params.id || req.body.id);
        console.log("✅ Patient fetch completed:", patient);

        if (!patient) {
            throw new ApiError(404, "Patient not found");
        }

        // Helper function to parse "DD/MM/YY" into a Date object
        const parseDate = (dateString) => {
            if (!dateString) return new Date(0); // Default to old date if missing
            const [day, month, year] = dateString.split("/").map(Number);
            const fullYear = year < 100 ? 2000 + year : year;
            return new Date(fullYear, month - 1, day);
        };

        // Sort reports in descending order of reportDate
        const sortedReportsList = patient.reportsList
            .map(report => ({
                ...report.toObject(),
            }))
            .sort((a, b) => parseDate(b.reportDate) - parseDate(a.reportDate));

        // Process each report
        const reportList = [];
        for (const report of sortedReportsList) {
            report.reportPDFLink = await getBlobURL(report.reportPDFLink);
            report.cid = report.cid ? `https://ipfs.io/ipfs/${report.cid}` : report.reportPDFLink;
            reportList.push(report);
        }

        return res.status(200).json(
            new ApiResponse(200, reportList, "Report list retrieved successfully")
        );
    } catch (error) {
        console.error("❌ Error in getReportList:", error);
        throw new ApiError(500, "Something went wrong in getReportList");
    }
});


const addReport = asyncHandler(async (req, res, next) => {
  try {
      const { reportName, location, reportDate, reportPDFLink, cid, containerName } = req.body;
      const patient = await Patient.findById(req.params.patientId);
      if (!patient) return next(new ApiError(404, "Patient not found"));

      // Extract text from PDF
      let reportPDFText = String(await extractTextFromPDF(reportPDFLink));
      console.log("🔍 Extracted Report Text:", reportPDFText);

      // Knowledge base update logic
      const cntOfReports = patient.reportsList.length;
      let absText = patient.absoluteSummary;

      if (cntOfReports > 0 && cntOfReports % 10 === 0) {
          absText = patient.lastAbsoluteSummary || "";
          for (let i = Math.max(0, cntOfReports - 10); i < cntOfReports; i++) {
              absText += patient.reportsList[i].reportSummary;
          }
      }

      // Send data to Flask for knowledge base update
      let reportSummary;
      try {
          const response = await axios.post(
              `${process.env.FLASK_SERVER}/reports/update_kb`,
              { reportText: reportPDFText, absoluteText: absText },
              { headers: { "Content-Type": "application/json" } }
          );
          reportSummary = response.data;
      } catch (axiosError) {
          console.error("❌ Error in Flask request:", axiosError.response?.data || axiosError.message);
          return next(new ApiError(500, "Failed to update knowledge base"));
      }

      const { indReportSummary, newAbsoluteText } = reportSummary;
      if (!indReportSummary || !newAbsoluteText) {
          return next(new ApiError(500, "Invalid response from knowledge base update"));
      }

      if (cntOfReports > 0 && cntOfReports % 10 === 0) {
          patient.lastAbsoluteSummary = newAbsoluteText;
      }
      let fileURL = await getBlobURL(reportPDFLink);
      const url = await getUploadURL(reportPDFLink, 600);
      // Create new report object
      const newReport = {
          reportName,
          reportDate,
          location,
          reportPDFLink,
          url,
          cid,
          reportPDFText,
          reportSummary: indReportSummary,
      };

      // Update patient data
      patient.reportsList.push(newReport);
      patient.absoluteSummary = newAbsoluteText;
      await patient.save();

      // Generate Blob URL
    
      try {
          fileURL = await getBlobURL(reportPDFLink);
          console.log("📄 Blob File URL:", fileURL);
      } catch (error) {
          console.error("❌ Error generating Blob URL:", error);
          return next(new ApiError(500, "Failed to generate report URL"));
      }

      // Embed report in Flask system
      try {
          await axios.post(
              `${process.env.FLASK_SERVER}/reports/embed_report`,
              {
                  reportText: reportPDFText,
                  reportId: patient.reportsList[patient.reportsList.length - 1]._id,
                  patientId: patient._id,
                  url: fileURL,
                  date: reportDate,
              },
              { headers: { "Content-Type": "application/json" } }
          );
      } catch (axiosError) {
          console.error("❌ Error embedding report:", axiosError.response?.data || axiosError.message);
          return next(new ApiError(500, "Failed to embed report"));
      }

      return res.status(200).json(new ApiResponse(200, { patient, reportSummary: indReportSummary }, "Report added successfully"));
  } catch (error) {
      console.error("❌ Error in addReport:", error);
      return next(new ApiError(500, "Something went wrong in addReport"));
  }
});


const addChatReport = asyncHandler(async (req, res) => {
  try {
    const { reportDate, reportPDFText } = req.body;
    console.log("i am here")

    // Fetch patient directly (no user)
    const patient = await Patient.findById(req.params.patientId);
    if (!patient) {
      throw new ApiError(404, "Patient not found");
    }

    // Knowledge base update logic
    const cntOfReports = patient.reportsList.length;
    let absText = patient.absoluteSummary;

    if (cntOfReports > 0 && cntOfReports % 10 === 0) {
      // Reset absolute summary every 10 reports
      let newAbsoluteText = patient.lastAbsoluteSummary;
      let index = cntOfReports - 1;
      let cnt = 9;
      while (index-- && cnt--) {
        newAbsoluteText += patient.reportsList[index].reportSummary;
      }
      absText = newAbsoluteText;
    }

    // Call Flask server to update knowledge base
    const reportSummary = await axios.post(`${process.env.FLASK_SERVER}/reports/update_kb`, {
      reportText: reportPDFText,
      absoluteText: absText,
    });

    if (cntOfReports > 0 && cntOfReports % 10 === 0) {
      patient.lastAbsoluteSummary = reportSummary.data.newAbsoluteText;
    }

    // Update patient’s absolute summary
    patient.absoluteSummary = reportSummary.data.newAbsoluteText;
    await patient.save();

    // Report embedding logic
    const reportEmbedding = await axios.post(`${process.env.FLASK_SERVER}/reports/embed_report`, {
      reportText: reportPDFText,
      reportId: "chat-based-report",
      patientId: patient._id,
      url: "chat-based-report",
      date: reportDate,
    });

    return res.status(200).json(
      new ApiResponse(200, { patient }, "Chat Report added successfully")
    );
  } catch (error) {
    console.error("❌ Error in addChatReport:", error);
    throw new ApiError(500, "Something went wrong in addChatReport");
  }
});





const reportAddSignedURL = asyncHandler(async (req, res) => {
  try {
      const { reportName, patientId } = req.body;

      if (!reportName || !patientId) {
          throw new ApiError(400, "Report name and patient ID are required");
      }

      // Generate unique file name
      const timestamp = Date.now();
      const reportPDFLink = `Reports/${patientId}_${reportName}_${timestamp}.pdf`;

      console.log("📌 Blob Name (File Path):", reportPDFLink);

      // Get Azure Blob upload URL
      const url = await getUploadURL(reportPDFLink, 600);
      

      return res.status(200).json(
          new ApiResponse(
              200,
              { url, reportPDFLink },  // ✅ Include `reportPDFLink`
              "Report signed URL generated successfully"
          )
      );
  } catch (error) {
      console.error("❌ Error in reportAddSignedURL:", error);
      throw new ApiError(500, "Something went wrong in reportAddSignedURL");
  }
});



  const removeReport = asyncHandler(async (req, res) => {
    try {
      const { reportId, patientId } = req.body; // Directly accept patientId
  
      // Find the patient
      const patient = await Patient.findById(patientId);
      if (!patient) {
        throw new ApiError(404, "Patient not found");
      }
  
      // Find index of report in reportsList
      const reportIndex = patient.reportsList.findIndex(
        (report) => report._id.toString() === reportId
      );
  
      if (reportIndex === -1) {
        throw new ApiError(404, "Report not found");
      }
  
      // Get the report's Azure Blob storage path
      const reportPDFLink = patient.reportsList[reportIndex].reportPDFLink;
  
      // Remove report from the list
      patient.reportsList.splice(reportIndex, 1);
      await patient.save();
  
      // Delete report from Azure Storage
      await Promise.race([
        deleteBlob(reportPDFLink),
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error("❌ Timeout: deleteBlob")), 5000)
        ),
    ]);
    console.log("✅ Report deleted from Azure Storage");
    
  
      return res.status(200).json(
        new ApiResponse(
          200,
          patient.reportsList,
          "Report removed successfully"
        )
      );
    } catch (error) {
      console.error("❌ Error in removeReport:", error);
      throw new ApiError(500, "Something went wrong in removeReport");
    }
  });
  
  const queryReports = asyncHandler(async (req, res) => {
    try {
      const { patientId, queryText } = req.body;
      console.log("🔍 Query Text:", queryText);
  
      // Find the patient
      const patient = await Patient.findById(patientId);
      if (!patient) {
        throw new ApiError(404, "Patient not found");
      }
  
      // Query AI-powered report search
      const queryRes = await axios.post(`${process.env.FLASK_SERVER}/reports/generalReportQuery`, {
        patientId,
        queryText,
      });
  
      return res.status(200).json(
        new ApiResponse(200, {
          response: queryRes.data.response,
          sources: queryRes.data.sources,
        }, "Query processed successfully")
      );
    } catch (error) {
      throw new ApiError(500, "Something went wrong in queryReports");
    }
  });
  
  const queryDateVal = asyncHandler(async (req, res) => {
    try {
      const { patientId, queryText } = req.body;
  
      // Find the patient
      const patient = await Patient.findById(patientId);
      if (!patient) {
        throw new ApiError(404, "Patient not found");
      }
  
      // Query AI-powered date validation
      const queryRes = await axios.post(`${process.env.FLASK_SERVER}/reports/dateValQuery`, {
        patientId,
        queryText,
      });
  
      return res.status(200).json(
        new ApiResponse(200, queryRes.data, "Date-based query processed successfully")
      );
    } catch (error) {
      throw new ApiError(500, "Something went wrong in queryDateVal");
    }
  });
  

  const patientChat = asyncHandler(async (req, res) => {
    try {
      const { patientId,prompt, context } = req.body;
  
      // Fetch the patient directly
      const patient = await Patient.findById(patientId);
      if (!patient) {
        throw new ApiError(404, "Patient not found");
      }
  
      // Extract medicines list and doctor notes
      const medicines =
        patient.medicinesList?.map((m) => m.medicine).join(", ") || "No medicines prescribed";
  
      const notes = patient.medicalHistorySummary || "No doctor notes available";
  
      // Send request to Flask AI chat model
      const resp = await axios.post(`${process.env.FLASK_SERVER}/patientChat/chat`, {
        prompt,
        context,
        medicines,
        notes,
        patientId: patient._id
      });
  
      return res
        .status(200)
        .json(new ApiResponse(200, resp.data, "Chat response retrieved successfully"));
    } catch (error) {
      console.error(error);
      throw new ApiError(500, "Something went wrong in patientChat");
    }
  });
  

  const getMedicines = asyncHandler(async (req, res) => {
    try {
      const { patientId } = req.body;
  
      // Find the patient
      const patient = await Patient.findById(patientId);
      if (!patient) {
        throw new ApiError(404, "Patient not found");
      }
  
      const currDate = new Date().setHours(0, 0, 0, 0); // Normalize to local timezone midnight
      const medicineStatusDate = patient.medicineStatusDate 
        ? new Date(patient.medicineStatusDate).setHours(0, 0, 0, 0) 
        : null;
  
      let medicinesList = [];
  
      // If medicineStatusDate matches the current date, return existing medicine statuses
      if (medicineStatusDate === currDate) {
        medicinesList = await Promise.all(
          patient.medicinesList.map(async (medicine) => {
            const doctor = await Doctor.findById(medicine.doctor);
            return {
              id: medicine._id,
              medicine: medicine.medicine,
              dosage: medicine.dosage,
              doctor: doctor ? doctor.name : "Unknown",
              status: medicine.status,
              doctorId: medicine.doctor,
            };
          })
        );
      } else {
        // If dates don't match, reset all medicines to 'pending' and update DB
        patient.medicineStatusDate = currDate;
        medicinesList = await Promise.all(
          patient.medicinesList.map(async (medicine) => {
            medicine.status = "pending"; // Reset status
            const doctor = await Doctor.findById(medicine.doctor);
            return {
              id: medicine._id,
              medicine: medicine.medicine,
              dosage: medicine.dosage,
              doctor: doctor ? doctor.name : "Unknown",
              status: "pending",
              doctorId: medicine.doctor,
            };
          })
        );
  
        // Save updated medicine list
        await patient.save();
      }
  
      // Sort medicines: Pending first, taken last
      medicinesList.sort((a, b) => (a.status === "pending" ? -1 : 1));
  
      return res.status(200).json(
        new ApiResponse(
          200,
          {
            medicinesList,
            medicineStatusDate: currDate,
          },
          "Medicines retrieved successfully"
        )
      );
    } catch (error) {
      console.error(error);
      throw new ApiError(500, "Something went wrong in getMedicines");
    }
  });
  
  
  const toggleMedicineStatus = asyncHandler(async (req, res) => {
    try {
      const { medicineId, status } = req.body;
  
      // Prevent access for doctors
      if (req.user.isDoctor) {
        throw new ApiError(401, "Unauthorized access");
      }
  
      // Fetch the user's patient
      const user = await User.findById(req.user._id).populate("patientDetails");
      if (!user || !user.patientDetails) {
        throw new ApiError(404, "Patient not found");
      }
  
      const patient = await Patient.findById(user.patientDetails._id);
      if (!patient) {
        throw new ApiError(404, "Patient not found");
      }
  
      // Find the medicine
      const medicine = patient.medicinesList.find(
        (m) => m._id.toString() === medicineId.toString()
      );
      if (!medicine) {
        throw new ApiError(404, "Medicine not found");
      }
  
      // Update medicine status
      medicine.status = status;
  
      // Save the updated patient document
      await patient.save();
  
      return res.status(200).json(
        new ApiResponse(200, { medicinesList: patient.medicinesList }, "Medicine status updated successfully")
      );
    } catch (error) {
      console.error(error);
      throw new ApiError(500, "Something went wrong in toggleMedicineStatus");
    }
  });


  const createDietPlan = async (req, res) => {
      console.log("Creating Diet Plan...");
  
      try {
          console.log("Received request body:", req.body);
  
          const { patientId } = req.body;
          if (!patientId) {
              return res.status(400).json({ error: "Patient ID is required" });
          }
  
          // Fetch patient data
          const patient = await Patient.findById(patientId);
          if (!patient) {
              return res.status(404).json({ error: "Patient not found" });
          }
  
          // Prepare full patient details
          const patientData = patient.toObject(); // Convert Mongoose document to plain object
          delete patientData._id; // Remove MongoDB ID if not needed
  
          // Send request to Flask API
          const response = await axios.post(`${process.env.FLASK_SERVER}/reports/dietPlan`, patientData, {
              headers: { "Content-Type": "application/json" },
          });
  
          console.log("Flask API Response:", response.data);
          res.status(201).json(response.data);
      } catch (error) {
          console.error("Diet Plan Error:", error.toJSON ? error.toJSON() : error);
  
          res.status(error.response?.status || 500).json({
              error: error.response?.data?.error || "Failed to generate diet plan",
          });
      }
  };


 export  const createHealthAlerts = async (req, res) => {
    console.log("Generating Health Alerts...");

    try {
        console.log("Received request body:", req.body);

        const { patientId } = req.body;
        if (!patientId) {
            return res.status(400).json({ error: "Patient ID is required" });
        }

        // Fetch patient data
        const patient = await Patient.findById(patientId);
        if (!patient) {
            return res.status(404).json({ error: "Patient not found" });
        }

        // Prepare full patient details
        const patientData = patient.toObject(); // Convert Mongoose document to plain object
        delete patientData._id; // Remove MongoDB ID if not needed
        console.log(patientData);

        // Send request to Flask API for health alerts
        const response = await axios.post(`${process.env.FLASK_SERVER}/reports/healthAlerts`, patientData, {
            headers: { "Content-Type": "application/json" },
        });


        console.log("Flask API Response:", response.data);
        res.status(201).json(response.data);
    } catch (error) {
        console.error("Health Alerts Error:", error.toJSON ? error.toJSON() : error);

        res.status(error.response?.status || 500).json({
            error: error.response?.data?.error || "Failed to generate health alerts",
        });
    }
};

  
  

  
export const createPatient = asyncHandler(async (req, res) => {
    try {
        const {
            name,
            imageLink,
            sex,
            age,
            currentCondition,
            bloodGroup,
            absoluteSummary,
            lastAbsoluteSummary,
            medicalHistorySummary,
            currentSymptomsSummary,
            assistiveDiagnosis,
            reportsList,
            medicinesList
        } = req.body;

        // Validate required fields
        if (!name || !sex || !age || !bloodGroup) {
            throw new ApiError(400, "Missing required fields: name, sex, age, or bloodGroup");
        }

        // Create new patient
        const newPatient = await Patient.create({
            name,
            imageLink,
            sex,
            age,
            currentCondition,
            bloodGroup,
            absoluteSummary,
            lastAbsoluteSummary,
            medicalHistorySummary,
            currentSymptomsSummary,
            assistiveDiagnosis,
            reportsList,
            medicinesList
        });

        return res.status(201).json(new ApiResponse(201, newPatient, "Patient created successfully"));
    } catch (error) {
        console.error("❌ Error creating patient:", error);
        throw new ApiError(500, "Something went wrong in createPatient");
    }
});

export{
    addReport,
    getReportList,
    removeReport,
    queryReports,
    queryDateVal,
    getMedicines,
    toggleMedicineStatus,
    reportAddSignedURL,
    addChatReport,
    patientChat,
    createDietPlan
}