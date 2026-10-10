import {
  BlobServiceClient,
  StorageSharedKeyCredential,
  generateBlobSASQueryParameters,
  BlobSASPermissions,
} from "@azure/storage-blob";
import { AzureKeyCredential, DocumentAnalysisClient } from "@azure/ai-form-recognizer";
import dotenv from "dotenv";

dotenv.config();

// Validate required environment variables
const requiredEnvVars = [
  "AZURE_STORAGE_ACCOUNT_NAME",
  "AZURE_STORAGE_ACCOUNT_KEY",
  "AZURE_FORM_RECOGNIZER_ENDPOINT",
  "AZURE_FORM_RECOGNIZER_KEY",
  "AZURE_BLOB_CONTAINER_NAME",
  "AZURE_BLOB_SERVICE_URL"
];

requiredEnvVars.forEach((varName) => {
  if (!process.env[varName]) {
    console.error(`❌ Missing environment variable: ${varName}`);
    process.exit(1);
  }
});

// Create clients
const blobServiceClient = new BlobServiceClient(
  `https://${process.env.AZURE_STORAGE_ACCOUNT_NAME}.blob.core.windows.net`,
  new StorageSharedKeyCredential(process.env.AZURE_STORAGE_ACCOUNT_NAME, process.env.AZURE_STORAGE_ACCOUNT_KEY)
);

const formRecognizerClient = new DocumentAnalysisClient(
  process.env.AZURE_FORM_RECOGNIZER_ENDPOINT,
  new AzureKeyCredential(process.env.AZURE_FORM_RECOGNIZER_KEY)
);

// Generate SAS token for reading a blob
const generateBlobSasToken = (containerName, blobName, expirySeconds = 3600, permissions = "r") => {
  const sharedKeyCredential = new StorageSharedKeyCredential(
    process.env.AZURE_STORAGE_ACCOUNT_NAME,
    process.env.AZURE_STORAGE_ACCOUNT_KEY
  );

  const now = new Date();
  const expiry = new Date(now.getTime() + expirySeconds * 1000);

  const sasOptions = {
    containerName,
    blobName,
    permissions: BlobSASPermissions.parse(permissions),
    startsOn: new Date(now.getTime() - 5 * 60 * 1000), // 5 min ago
    expiresOn: expiry,
    protocol: "https",
  };

  return generateBlobSASQueryParameters(sasOptions, sharedKeyCredential).toString();
};

// Construct the full blob SAS URL
// permissions: "r" = read, "cw" = create + write (used for client uploads)
const getUploadURL = async (blobName, expiryTime = 3600, permissions = "cw") => {
  try {
    const containerName = process.env.AZURE_BLOB_CONTAINER_NAME;
    const blobServiceUrl = process.env.AZURE_BLOB_SERVICE_URL;

    const sasToken = generateBlobSasToken(containerName, blobName, expiryTime, permissions);

    const fullUrl = `${blobServiceUrl}/${containerName}/${blobName}?${sasToken}`;

    return fullUrl;
  } catch (error) {
    console.error("❌ Error generating SAS upload URL:", error);
    throw error;
  }
};

// Extract text from a blob using Form Recognizer
const extractTextFromPDF = async (blobName) => {
  try {
    console.log(`📄 Extracting text from PDF: ${blobName}`);
    const blobURL = await getUploadURL(blobName, 600, "r");

    const poller = await formRecognizerClient.beginAnalyzeDocumentFromUrl("prebuilt-document", blobURL);
    const result = await poller.pollUntilDone();

    if (!result || !result.pages) {
      throw new Error("❌ No text extracted. Check the document format.");
    }

    const extractedText = result.pages
      .map((page) => page.lines.map((line) => line.content).join("\n"))
      .join("\n");

    console.log("✅ Text extraction successful.");
    return extractedText;
  } catch (error) {
    console.error("❌ Error extracting text from PDF:", error);
    throw error;
  }
};

// Get direct blob URL (without SAS)
async function getBlobURL(blobName) {
  const containerName = process.env.AZURE_BLOB_CONTAINER_NAME;
  
  if (!process.env.AZURE_STORAGE_CONNECTION_STRING) {
    throw new Error("AZURE_STORAGE_CONNECTION_STRING is missing.");
  }

  const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING);
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blobClient = containerClient.getBlobClient(blobName);

  return blobClient.url;
}

// Delete blob from container
const deleteBlob = async (blobName) => {
  try {
    const containerName = process.env.AZURE_BLOB_CONTAINER_NAME;
    console.log(`🗑️ Deleting blob: ${blobName}`);
    const blobClient = blobServiceClient.getContainerClient(containerName).getBlobClient(blobName);

    await blobClient.deleteIfExists();
    console.log(`✅ Blob deleted: ${blobName}`);
  } catch (error) {
    console.error("❌ Error deleting blob:", error);
    throw new Error("Failed to delete blob from Azure.");
  }
};

// Export all methods
export {
  getUploadURL,
  getBlobURL,
  extractTextFromPDF,
  deleteBlob,
};
