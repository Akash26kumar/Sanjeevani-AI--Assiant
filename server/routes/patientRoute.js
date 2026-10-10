import express from 'express';
import { addReport,
    getReportList,
    removeReport,
    queryReports,
    queryDateVal,
    getMedicines,
    toggleMedicineStatus,
    reportAddSignedURL,
    addChatReport,
    patientChat,
    createPatient,
    createDietPlan,
    createHealthAlerts, } from '../controllers/patientController.js';



    const router = express.Router();

// Get reports list
router.get("/reports/:id", getReportList);

// Add a new report
router.post("/reports/add/:patientId", addReport);

// Add a chat-based report
router.post("/reports/chat/:patientId", addChatReport);


// Generate signed URL for report upload
router.post("/reports/signed-url", reportAddSignedURL);

// Remove a report
router.delete("/reports/remove", removeReport);

// Query reports using AI
router.post("/reports/query", queryReports);

// Query reports based on date
router.post("/reports/query/date", queryDateVal);

// Patient chat with AI assistant
router.post("/reports/chat", patientChat);

// Get patient's medicine list
router.post("/medicines/get", getMedicines);

// Toggle medicine status
router.put("/medicines/toggle-status", toggleMedicineStatus);

router.post("/patients/add", createPatient);

router.post("/reports/diet",createDietPlan);

router.post('/reports/alerts',createHealthAlerts);


router.get("/", (req, res) => {
    res.send("Hello, Patient Controller is running!");
});

export default router;
