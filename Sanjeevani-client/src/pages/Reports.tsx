import { useState, useEffect } from "react";
import axios from "axios";
import { REPORTS_API_URL } from "@/lib/api";
import { AlertTriangle, Loader, Send } from "lucide-react";

const Reports = () => {
  const patientId = "67db196b1ec10de398f4ca50"; // Hardcoded for now, should be dynamic

    const [reports, setReports] = useState([]); // Store fetched reports
    const [file, setFile] = useState(null); // Store selected file
    const [reportName, setReportName] = useState(""); // Store report name
    const [loading, setLoading] = useState(false); // Track loading state
    const [error, setError] = useState(""); // Store errors

    const API_BASE_URL = REPORTS_API_URL;


    const [query, setQuery] = useState("");
    const [messages, setMessages] = useState([]);


    const handleQuery = async () => {
        if (!query.trim()) return;
    
        const userMessage = { text: query, sender: "user" };
        setMessages([...messages, userMessage]);
        setQuery("");
        setLoading(true);
        setError(null);
    
        try {
          const res = await axios.post(`${API_BASE_URL}/chat`, {
            patientId: patientId,
            prompt: query,
            context:"want to know about the report",
          });
          console.log("Query response:", res.data.data.response);
    
          const aiResponse = {
            text: res.data.data.response,
            sender: "ai",
            sources: res.data.sources,
          };
    
          setMessages((prev) => [...prev, userMessage, aiResponse]);
        } catch (error) {
          console.error("Error querying report:", error);
          setError("Failed to fetch response. Please try again.");
        } finally {
          setLoading(false);
        }
      };

    // Fetch reports on component load
    useEffect(() => {
        fetchReports();
    }, []);

    // Function to fetch reports from backend
    const fetchReports = async () => {
      try {
          setLoading(true);
          const response = await axios.get(`${API_BASE_URL}/${patientId}`);
  
          if (response.data && Array.isArray(response.data.data)) {
              setReports(response.data.data); // Correctly accessing the array
          } else {
              setReports([]); // Ensure no crashes if empty
              console.error("Unexpected response format:", response.data);
          }
      } catch (error) {
          setReports([]);
          setError(error.response?.data?.message || "Failed to load reports.");
      } finally {
          setLoading(false);
      }
  };
  

    // Upload report to Azure Blob Storage
    const uploadReportToAzure = async () => {
      try {
          const { data } = await axios.post(`${REPORTS_API_URL}/signed-url`, {
              reportName,
              patientId
          });
  
          console.log("✅ API Full Response:", data);  // Debugging step
  
          // ✅ Ensure `data` contains `url` and `reportPDFLink`
          const { url, reportPDFLink } = data.data || {}; 
          console.log(data.data);
  
          if (!url || !reportPDFLink) {
              throw new Error("❌ Missing `url` or `reportPDFLink` from response");
          }
  
          console.log("📌 Uploading to URL:", url);
  
          // ✅ Upload file to Azure Storage
          await axios.put(url, file, {
            headers: {
                "Content-Type": "application/pdf",
                "x-ms-blob-type": "BlockBlob" // ✅ Mandatory for Azure Blob Storage
            }
        });
          console.log("✅ Successfully uploaded file:", reportPDFLink);
  
          return reportPDFLink; // ✅ Return correct file path
      } catch (error) {
          console.error("❌ Error uploading report:", error);
          throw error;
      }
  };
  
  
  

    // Function to add a report after uploading
    const addReport = async () => {
        try {
            setLoading(true);
            const reportPDFLink = await uploadReportToAzure();
            if (!reportPDFLink) return;

            const reportData = {
                reportName,
                reportDate: new Date(),
                location: "Online",
                reportPDFLink,
                patientId,
            };

            const response = await axios.post(`${API_BASE_URL}/add/${patientId}`, reportData);
            console.log("Report added:", response.data);
            setReportName(""); // Reset input fields
            setFile(null);
            fetchReports(); // Refresh reports list
        } catch (error) {
            setError("Error adding report. Please try again.");
            console.error("Add report error:", error.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    };

    // Function to delete a report
    const removeReport = async (reportId) => {
        if (!window.confirm("Are you sure you want to delete this report?")) return;

        try {
            setLoading(true);
            await axios.delete(`${API_BASE_URL}/remove`, { data: { reportId, patientId } });
            setReports(reports.filter(report => report._id !== reportId));
        } catch (error) {
            setError("Error deleting report.");
            console.error("Delete error:", error.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
            <h2>Patient Reports</h2>

            {/* Show error messages */}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {/* Report upload section */}
            <div>
                <input
                    type="text"
                    placeholder="Report Name"
                    value={reportName}
                    onChange={(e) => setReportName(e.target.value)}
                />
                <input
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <button onClick={addReport} disabled={loading}>
                    {loading ? "Uploading..." : "Upload Report"}
                </button>
            </div>

            {/* Reports List */}
            {loading ? (
                <p>Loading reports...</p>
            ) : reports.length > 0 ? (
                <ul>
                    {reports.map((report) => (
                    //   console.log(report),
                        <li key={report._id}>
                            {report.reportName} -{" "}
                            <a href={report.url} target="_blank" rel="noopener noreferrer">
                                View
                            </a>
                            {/* <p>Report Summary:
                                <br />
                                {report.reportSummary}
                            </p> */}
                            <button onClick={() => removeReport(report._id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No reports found.</p>
            )}

<div className="bg-white shadow-lg rounded-md p-4 border">
      <h2 className="text-xl font-semibold mb-2">Chat with Report</h2>

      <div className="h-60 overflow-y-auto border rounded-md p-3 space-y-2 bg-gray-50">
        {messages.map((msg, index) => (
          <div key={index} className={`p-2 rounded-md ${msg.sender === "user" ? "bg-blue-100 text-right" : "bg-gray-200"}`}>

            <p>{msg.text}</p>
            {msg.sender === "ai" && msg.sources && (
              <p className="text-xs text-gray-500 mt-1">Sources: {msg.sources.join(", ")}</p>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex items-center justify-center mt-2">
            <Loader className="animate-spin text-blue-500" size={20} />
            <p className="ml-2 text-gray-600">Loading...</p>
          </div>
        )}

        {error && (
          <div className="flex items-center text-red-600 mt-2">
            <AlertTriangle size={20} />
            <p className="ml-2">{error}</p>
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center gap-2">
        <input
          type="text"
          className="border rounded-md p-2 flex-1"
          placeholder="Ask a question..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={loading}
        />
        <button
          className="bg-blue-600 text-white px-3 py-2 rounded-md flex items-center"
          onClick={handleQuery}
          disabled={loading}
        >
          {loading ? <Loader className="animate-spin" size={16} /> : <Send size={16} />}
        </button>
      </div>
    </div>
        </div>

        
    );
};

export default Reports;
