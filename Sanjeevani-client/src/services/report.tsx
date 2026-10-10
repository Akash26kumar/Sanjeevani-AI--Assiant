import axios from "axios";
import { REPORTS_API_URL as API_BASE_URL } from "@/lib/api";

// Fetch reports
export const fetchReports = async (patientId, setReports, setError, setLoading) => {
    try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/${patientId}`);
        setReports(response.data?.data || []);
    } catch (error) {
        setError(error.response?.data?.message || "Failed to load reports.");
        setReports([]);
    } finally {
        setLoading(false);
    }
};

// Upload report to Azure
export const uploadReportToAzure = async (reportName, patientId, file) => {
    try {
        const { data } = await axios.post(`${API_BASE_URL}/signed-url`, { reportName, patientId });
        const { url, reportPDFLink } = data.data || {};

        if (!url || !reportPDFLink) throw new Error("Missing URL or reportPDFLink");

        await axios.put(url, file, {
            headers: { "Content-Type": "application/pdf", "x-ms-blob-type": "BlockBlob" }
        });

        return reportPDFLink;
    } catch (error) {
        console.error("Error uploading report:", error);
        throw error;
    }
};


// Add report
export const addReport = async (reportName, patientId, file, setReports, setLoading, setError) => {
    try {
        setLoading(true);
        const reportPDFLink = await uploadReportToAzure(reportName, patientId, file);
        if (!reportPDFLink) return;

        const reportData = { reportName, reportDate: new Date(), location: "Online", reportPDFLink, patientId };
        await axios.post(`${API_BASE_URL}/add/${patientId}`, reportData);
        fetchReports(patientId, setReports, setError, setLoading); // Refresh reports
    } catch (error) {
        setError("Error adding report. Please try again.");
    } finally {
        setLoading(false);
    }
};

// Delete report
export const removeReport = async (reportId, patientId, setReports, setLoading, setError) => {
    if (!window.confirm("Are you sure you want to delete this report?")) return;
    try {
        setLoading(true);
        await axios.delete(`${API_BASE_URL}/remove`, { data: { reportId, patientId } });
        setReports(prevReports => prevReports.filter(report => report._id !== reportId));
    } catch (error) {
        setError("Error deleting report.");
    } finally {
        setLoading(false);
    }
};



export  const handleQuery = async (patientId,query,setQuery,messages,setMessages,setLoading,setError) => {
    if (!query.trim()) return;
  
    const userMessage = { text: query, sender: "user" };
    setMessages((prev) => [...prev, userMessage]); // Add user message
  
    setQuery(""); // Clear input
    setLoading(true);
    setError(null);
  
    try {
      const res = await axios.post(`${API_BASE_URL}/query`, {
        patientId: patientId,
        queryText: query,
      });
  
      console.log("Query response:", res.data.response);
  
      const aiResponse = {
        text: res.data.data.response,
        sender: "ai",
        sources: res.data.data.sources || [],
      };
  
      setMessages((prev) => [...prev, aiResponse]); // Add AI response only once
    } catch (err) {
      setError("Failed to fetch response. Try again.");
    } finally {
      setLoading(false);
    }
      };




    export  const handleReportQuery = async (patientId,query,setQuery,messages,setMessages,setLoading,setError) => {
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
    
          setMessages((prev) => [...prev, aiResponse]);
        } catch (error) {
          console.error("Error querying report:", error);
          setError("Failed to fetch response. Please try again.");
        } finally {
          setLoading(false);
        }
      };
