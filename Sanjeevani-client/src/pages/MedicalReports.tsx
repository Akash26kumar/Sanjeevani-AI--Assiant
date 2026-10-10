import React, { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Upload,
  FileText,
  Eye,
  Download,
  Trash2,
  AlertCircle,
  Package,
  StickyNote,
  Send,
  Loader,
  AlertTriangle,
  BotMessageSquareIcon,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  addReport,
  fetchReports,
  handleQuery,
  handleReportQuery,
  removeReport,
} from "@/service/report";
import ReactMarkdown from "react-markdown";
import AIAssistant from "./AIAssistant";

// Mock data for demonstration purposes
// In a real application, this would come from an API or database
// const initialReports = [
//   { id: 1, name: 'Blood Test Report', date: '2023-10-15', type: 'PDF', size: '1.2 MB' },
//   { id: 2, name: 'X-Ray Results', date: '2023-09-22', type: 'JPEG', size: '3.7 MB' },
//   { id: 3, name: 'Annual Health Checkup', date: '2023-08-05', type: 'PDF', size: '2.5 MB' },
// ];

const patientId = "67de81a66e6820d3446eaa22";

const MedicalReports = () => {
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [newReport, setNewReport] = useState({
    name: "",
    file: null as File | null,
  });
  const [previewOpen, setPreviewOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<
    (typeof reports)[0] | null
  >(null);
  const { toast } = useToast();
  const [error, setError] = useState<string | null>(null);

  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([]);
  const [isReportMessage, setIsReportMessage] = useState(false);
  const[isMessage, setIsMessage] = useState(false);
  const [reportMessage, setReportMessage] = useState([]);
  const [reportQuery, setReportQuery] = useState("");

  const handleQueryRes = async () => {
    if (!query.trim()) return;
    await handleQuery(
      patientId,
      query,
      setQuery,
      messages,
      setMessages,
      setIsReportMessage,
      setError
    );
  };


  const handleReportQueryRes= async () => {
    if (!reportQuery.trim()) return;
    await handleReportQuery(
      patientId,
      reportQuery,
      setReportQuery,
      reportMessage,
      setReportMessage,
      setIsMessage,
      setError
    )
  }


  useEffect(() => {
    fetchReports(patientId, setReports, setError, setIsLoading);
    if (error) {
      toast({
        title: "Error Loading reports",
        description: error,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Reports loaded",
        description: "The medical reports have been loaded",
      });
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setNewReport({
        name: file.name.split(".")[0], // Default name from filename
        file,
      });
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewReport({
      ...newReport,
      name: e.target.value,
    });
  };

  const handleUpload = async () => {
    if (!newReport.file) {
      toast({
        title: "No file selected",
        description: "Please select a file to upload",
        variant: "destructive",
      });
      return;
    }

    await addReport(
      newReport.name,
      patientId,
      newReport.file,
      setReports,
      setIsLoading,
      setError
    );
    setNewReport({ name: "", file: null });
    // setOpen(false);
    if (error) {
      toast({
        title: "Error Loading report",
        description: error,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Report uploaded",
        description: "The medical report has been uploaded",
      });
    }
  };

  const handleDelete = async (_id: number) => {
    await removeReport(_id, patientId, setReports, setIsLoading, setError);
    if (error) {
      toast({
        title: "Error deleting report",
        description: error,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Report deleted",
        description: "The medical report has been deleted",
      });
    }
  };

  const handlePreview = (report: (typeof reports)[0]) => {
    setSelectedReport(report);
    console.log(report);
    setPreviewOpen(true);
  };

  const handleDownload = (report: (typeof reports)[0]) => {
    // In a real app, this would download the actual file
    toast({
      title: "Download started",
      description: `Downloading ${report.name}`,
    });
  };

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <Card className="shadow-lg border-health-100">
          <CardHeader className="bg-gradient-to-r from-health-500 to-health-600 text-white rounded-t-lg">
            <CardTitle className="text-2xl">Medical Reports</CardTitle>
            <CardDescription className="text-health-50">
              Upload and manage your medical records
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="mb-8">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="health" className="gap-2">
                    <Upload size={18} />
                    Upload New Report
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Upload Medical Report</DialogTitle>
                    <DialogDescription>
                      Upload your medical reports securely. Supported formats:
                      PDF.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="report-file">Select File</Label>
                      <Input
                        id="report-file"
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleFileChange}
                      />
                    </div>
                    {newReport.file && (
                      <div className="grid gap-2">
                        <Label htmlFor="report-name">Report Name</Label>
                        <Input
                          id="report-name"
                          placeholder="Enter report name"
                          value={newReport.name}
                          onChange={handleNameChange}
                        />
                      </div>
                    )}
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setNewReport({ name: "", file: null })}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="health"
                      onClick={handleUpload}
                      disabled={isLoading || !newReport.file}
                    >
                      {isLoading ? "Loading..." : "Upload"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            {reports.length === 0 ? (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>No reports found</AlertTitle>
                <AlertDescription>
                  You haven't uploaded any medical reports yet. Upload your
                  first report to get started.
                </AlertDescription>
              </Alert>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    {
                      console.log(reports)
                    }
                    <TableRow>
                      <TableHead>Report Name</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Platform</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reports.map((report) => (
                      <TableRow key={report._id}>
                        <TableCell className="font-medium flex items-center gap-2">
                          <FileText size={16} className="text-health-500" />
                          {report.reportName}
                        </TableCell>
                        <TableCell>
                          {new Intl.DateTimeFormat("en-US", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          }).format(new Date(report.reportDate))}
                        </TableCell>
                        <TableCell>PDF</TableCell>
                        {/* <TableCell>{report.size}</TableCell> */}
                        <TableCell>{report.location}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => window.open(report.url, "_blank")}
                              className="h-8 w-8 p-0"
                            >
                              <Eye size={16} />
                              <span className="sr-only">View</span>
                            </Button>

                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handlePreview(report)}
                              className="h-8 w-8 p-0"
                            >
                              <BotMessageSquareIcon size={16} />
                              <span className="sr-only">Download</span>
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDelete(report._id)}
                              className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                            >
                              <Trash2 size={16} />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="bg-white shadow-md rounded-md p-4 border border-gray-200 mt-6">
            <h2 className="text-lg font-semibold mb-3">Chat with Report</h2>

            {/* Messages Container */}
            <div className="h-60 overflow-y-auto border rounded-md p-3 space-y-2 bg-gray-50 mt-4">
              {reportMessage.map((msg, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-md w-fit max-w-[75%] ${
                    msg.sender === "user"
                      ? "bg-blue-100 ml-auto text-right"
                      : "bg-gray-200"
                  }`}
                >
                  <ReactMarkdown>{msg.text}</ReactMarkdown>

                  {/* {msg.sender === "ai" && msg.sources && (
              <p className="text-xs text-gray-500 mt-1">
                Sources: {msg.sources.join(", ")}
              </p>
            )} */}
                </div>
              ))}

              {/* Loading State */}
              {isMessage && (
                <div className="flex items-center justify-center mt-2">
                  <Loader className="animate-spin text-health-500" size={20} />
                  <p className="ml-2 text-gray-600">Fetching response...</p>
                </div>
              )}

              {/* Error State */}
              {error && (
                <div className="flex items-center text-red-600 mt-2">
                  <AlertTriangle size={20} />
                  <p className="ml-2">{error}</p>
                </div>
              )}
            </div>

            {/* Chat Input */}
            <div className="mt-4 flex items-center gap-2">
              <input
                type="text"
                className="border rounded-md p-2 outline-none flex-1 shadow-sm"
                placeholder="Ask a question..."
                value={reportQuery}
                onChange={(e) => setReportQuery(e.target.value)}
                disabled={isMessage}
              />

              <Button
                className=" text-white px-3 py-2 rounded-md flex items-center shadow-md 0 transition"
                onClick={handleReportQueryRes}
                disabled={isMessage}
              >
                {isMessage ? (
                  <Loader className="animate-spin " size={16} />
                ) : (
                  <Send size={16} />
                )}
              </Button>
            </div>
          </div>
      </div>

      {/* Report Preview Dialog */}

      <Dialog open={previewOpen}   onOpenChange={(isOpen) => {
    setPreviewOpen(isOpen);
    if (!isOpen) {
      setMessages([]); // Clear chat when dialog closes
    }
  }}
>
<DialogContent className="sm:max-w-3xl mt-12 w-full max-h-screen overflow-y-auto scrollbar-hide">
          <DialogHeader>
            {/* Report Title */}
            <DialogTitle>{selectedReport?.reportName}</DialogTitle>
          </DialogHeader>

          {/* Report Summary Section */}
          {selectedReport?.reportSummary && (
            <div className="bg-gray-50 p-4 rounded-md border border-gray-200 mt-4 max-h-70 overflow-y-auto">
              <h3 className="text-lg font-semibold mb-2">Summary</h3>
              <div className="prose prose-sm text-gray-700">
                <ReactMarkdown>{selectedReport.reportSummary}</ReactMarkdown>
              </div>
            </div>
          )}

          {/* Chat Section */}
          <div className="bg-white shadow-md rounded-md p-4 border border-gray-200 mt-6">
            <h2 className="text-lg font-semibold mb-3">Chat with Report</h2>

            {/* Messages Container */}
            <div className="h-60 overflow-y-auto border rounded-md p-3 space-y-2 bg-gray-50 mt-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-md w-fit max-w-[75%] ${
                    msg.sender === "user"
                      ? "bg-blue-100 ml-auto text-right"
                      : "bg-gray-200"
                  }`}
                >
                  <ReactMarkdown>{msg.text}</ReactMarkdown>

                  {/* {msg.sender === "ai" && msg.sources && (
              <p className="text-xs text-gray-500 mt-1">
                Sources: {msg.sources.join(", ")}
              </p>
            )} */}
                </div>
              ))}

              {/* Loading State */}
              {isReportMessage && (
                <div className="flex items-center justify-center mt-2">
                  <Loader className="animate-spin text-health-500" size={20} />
                  <p className="ml-2 text-gray-600">Fetching response...</p>
                </div>
              )}

              {/* Error State */}
              {error && (
                <div className="flex items-center text-red-600 mt-2">
                  <AlertTriangle size={20} />
                  <p className="ml-2">{error}</p>
                </div>
              )}
            </div>

            {/* Chat Input */}
            <div className="mt-4 flex items-center gap-2">
              <input
                type="text"
                className="border rounded-md p-2 outline-none flex-1 shadow-sm"
                placeholder="Ask a question..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                disabled={isReportMessage}
              />
              <Button
                className=" text-white px-3 py-2 rounded-md flex items-center shadow-md 0 transition"
                onClick={handleQueryRes}
                disabled={isReportMessage}
              >
                {isReportMessage ? (
                  <Loader className="animate-spin " size={16} />
                ) : (
                  <Send size={16} />
                )}
              </Button>
            </div>
          </div>

          <DialogFooter className="flex justify-between items-center mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPreviewOpen(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* <AIAssistant/> */}
      


    </Layout>
  );
};

export default MedicalReports;
