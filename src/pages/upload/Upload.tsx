import React, { useState } from "react";
import { Document, Packer, Paragraph, TextRun } from "docx";

import { Header } from "../../components/custom-layout/Header";
import { Footer } from "../../components/custom-layout/Footer";
import { UploadForm } from "../../components/upload-components/UploadFrom";
import { UploadSuccess } from "../../components/upload-components/UploadSuccess";
import { OptimizationResult } from "../../components/upload-components/OptimizationResult";
import { FeaturesSection } from "../../components/upload-components/FeaturesSection";

import { uploadResume, optimizeResume } from "../../helper/axios";

const UploadPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadedFileUrl, setUploadedFileUrl] = useState("");
  const [activeTab, setActiveTab] = useState("optimized");
  const [copySuccess, setCopySuccess] = useState(false);
  const [optimizationResult, setOptimizationResult] = useState<{
    originalResume: string;
    optimizedResume: string;
  } | null>(null);

  const user = JSON.parse(localStorage.getItem("userInfo") || "{}");

  const handleFileChange = (selectedFile: File) => {
    setError("");
    setUploadSuccess(false);
    setUploadedFileUrl("");
    setOptimizationResult(null);

    if (!selectedFile) return;

    const validTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!validTypes.includes(selectedFile.type)) {
      setError("Please upload a PDF or Word document (.pdf, .doc, .docx)");
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      setError("File is too large. Maximum size is 5MB.");
      return;
    }

    setFile(selectedFile);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length) {
      handleFileChange(files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file to upload");
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("fullname", user.displayName);
    formData.append("email", user.email);

    try {
      const data = await uploadResume(formData, (progressEvent) => {
        if (progressEvent.total) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percentCompleted);
        }
      });

      setUploadSuccess(true);
      setUploadedFileUrl(data.fileUrl);

      setTimeout(() => {
        setUploadProgress(0);
        setIsUploading(false);
      }, 500);
    } catch (err: any) {
      setIsUploading(false);
      if (err.response) {
        setError(`Upload failed: ${err.response.data.message || err.message}`);
      } else if (err.request) {
        setError(
          "Upload failed: No response from server. Please check your network."
        );
      } else {
        setError("Upload failed. Please try again later.");
      }
      console.error("Error uploading file:", err);
    }
  };

  const handleOnOptimize = async () => {
    try {
      setIsOptimizing(true);
      setError("");

      const data = await optimizeResume(user.email, uploadedFileUrl);

      setOptimizationResult({
        originalResume: data.originalResume,
        optimizedResume: data.optimizedResume,
      });

      setIsOptimizing(false);
    } catch (err: any) {
      setIsOptimizing(false);
      if (err.response) {
        setError(
          `Optimization failed: ${err.response.data.message || err.message}`
        );
      } else if (err.request) {
        setError(
          "Optimization failed: No response from server. Please check your network."
        );
      } else {
        setError("Resume optimization failed. Please try again later.");
      }
      console.error("Error optimizing resume:", err);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const downloadAsWord = (content: string, filename: string) => {
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              children: [new TextRun(content)],
            }),
          ],
        },
      ],
    });

    if (!filename.toLowerCase().endsWith(".docx")) {
      filename = filename.replace(/\.[^/.]+$/, "") + ".docx";
    }

    Packer.toBlob(doc).then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const element = document.createElement("a");
      element.href = url;
      element.download = filename;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);

      setTimeout(() => {
        window.URL.revokeObjectURL(url);
      }, 100);
    });
  };

  const getFileIcon = () => {
    if (!file) return null;

    if (file.type === "application/pdf") {
      return "PDF";
    } else {
      return "DOC";
    }
  };

  const resetForm = () => {
    setFile(null);
    setError("");
    setUploadSuccess(false);
    setUploadedFileUrl("");
    setOptimizationResult(null);
    setActiveTab("optimized");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="max-w-3xl w-full space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Upload Your Resume
            </h2>
            <p className="mt-2 text-lg text-gray-600">
              We'll analyze your resume and provide optimization suggestions by
              AI to help you land your dream job
            </p>
          </div>

          {optimizationResult ? (
            <OptimizationResult
              optimizationResult={optimizationResult}
              activeTab={activeTab}
              copySuccess={copySuccess}
              setActiveTab={setActiveTab}
              copyToClipboard={copyToClipboard}
              downloadAsWord={downloadAsWord}
              resetForm={resetForm}
            />
          ) : uploadSuccess ? (
            <UploadSuccess
              uploadedFileUrl={uploadedFileUrl}
              isOptimizing={isOptimizing}
              handleOnOptimize={handleOnOptimize}
            />
          ) : (
            <UploadForm
              file={file}
              error={error}
              isUploading={isUploading}
              uploadProgress={uploadProgress}
              isDragging={isDragging}
              handleFileChange={handleFileChange}
              handleDragOver={handleDragOver}
              handleDragLeave={handleDragLeave}
              handleDrop={handleDrop}
              handleUpload={handleUpload}
              resetForm={resetForm}
              getFileIcon={getFileIcon}
            />
          )}

          <FeaturesSection />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default UploadPage;
