import React, { useState } from "react";
import { Upload, ThumbsUp, Edit, Copy, Download } from "lucide-react";
import { Header } from "../../components/custom-layout/Header";
import { Footer } from "../../components/custom-layout/Footer";
import axios from "axios";
import { Document, Packer, Paragraph, TextRun } from "docx";

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

  const rootUrl =
    import.meta.env.MODE === "production"
      ? import.meta.env.VITE_ROOT_API
      : "http://localhost:8000/api/v1/resumes";

  const uploadapi = `${rootUrl}/upload`;
  const optimizeapi = `${rootUrl}/optimize-resume`;

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

    // Check file size (5MB limit)
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
      const response = await axios.post(`${uploadapi}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted);
          }
        },
      });

      setUploadSuccess(true);
      setUploadedFileUrl(response.data.fileUrl);

      setTimeout(() => {
        setUploadProgress(0);
        setIsUploading(false);
      }, 500);
    } catch (err) {
      setIsUploading(false);
      if (axios.isAxiosError(err) && err.response) {
        setError(`Upload failed: ${err.response.data.message || err.message}`);
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

      const response = await axios.post(`${optimizeapi}`, {
        email: user.email,
        fileUrl: uploadedFileUrl,
      });

      setOptimizationResult({
        originalResume: response.data.originalResume,
        optimizedResume: response.data.optimizedResume,
      });

      setIsOptimizing(false);
    } catch (err) {
      setIsOptimizing(false);
      if (axios.isAxiosError(err) && err.response) {
        setError(
          `Optimization failed: ${err.response.data.message || err.message}`
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

      // Clean up
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
            <div className="bg-white shadow rounded-lg p-6">
              <div className="text-center py-4 mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-4">
                  <ThumbsUp className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Resume Optimization Complete!
                </h3>
                <p className="text-gray-600">
                  Your resume has been optimized for better visibility with
                  hiring managers and ATS systems.
                </p>
              </div>

              <div className="mb-8">
                <div className="flex border-b border-gray-200 mb-4">
                  <button
                    className={`px-4 py-2 font-medium text-sm ${
                      activeTab === "optimized"
                        ? "text-blue-600 border-b-2 border-blue-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                    onClick={() => setActiveTab("optimized")}
                  >
                    Optimized Resume
                  </button>
                  <button
                    className={`px-4 py-2 font-medium text-sm ${
                      activeTab === "original"
                        ? "text-blue-600 border-b-2 border-blue-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                    onClick={() => setActiveTab("original")}
                  >
                    Original Resume
                  </button>
                  <button
                    className={`px-4 py-2 font-medium text-sm ${
                      activeTab === "compare"
                        ? "text-blue-600 border-b-2 border-blue-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                    onClick={() => setActiveTab("compare")}
                  >
                    Compare
                  </button>
                </div>

                {activeTab === "optimized" && (
                  <div className="relative">
                    <div className="absolute top-2 right-2 flex space-x-2">
                      <button
                        onClick={() =>
                          copyToClipboard(optimizationResult.optimizedResume)
                        }
                        className="p-1 rounded-md hover:bg-gray-100"
                        title="Copy to clipboard"
                      >
                        <Copy className="h-5 w-5 text-gray-500" />
                      </button>
                      <button
                        onClick={() =>
                          downloadAsWord(
                            optimizationResult.optimizedResume,
                            "optimized-resume"
                          )
                        }
                        className="p-1 rounded-md hover:bg-gray-100"
                        title="Download as Word"
                      >
                        <Download className="h-5 w-5 text-gray-500" />
                      </button>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-6 whitespace-pre-wrap text-sm max-h-96 overflow-y-auto border border-gray-200">
                      {optimizationResult.optimizedResume}
                    </div>
                    {copySuccess && (
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white px-4 py-2 rounded-md text-sm">
                        Copied to clipboard!
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "original" && (
                  <div className="bg-gray-50 rounded-lg p-6 whitespace-pre-wrap text-sm max-h-96 overflow-y-auto border border-gray-200">
                    {optimizationResult.originalResume}
                  </div>
                )}

                {activeTab === "compare" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="font-medium text-gray-700 mb-2 flex items-center">
                        <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded text-xs mr-2">
                          ORIGINAL
                        </span>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4 whitespace-pre-wrap text-sm h-80 overflow-y-auto border border-gray-200">
                        {optimizationResult.originalResume}
                      </div>
                    </div>
                    <div>
                      <div className="font-medium text-gray-700 mb-2 flex items-center">
                        <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs mr-2">
                          OPTIMIZED
                        </span>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-4 whitespace-pre-wrap text-sm h-80 overflow-y-auto border border-blue-200">
                        {optimizationResult.optimizedResume}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-200">
                <h4 className="font-medium text-gray-800 mb-3 flex items-center">
                  <Edit className="h-5 w-5 mr-2 text-blue-600" />
                  Key Improvements:
                </h4>
                <ul className="text-sm text-gray-600 space-y-2 pl-8 list-disc">
                  <li>Enhanced keywords for better ATS visibility</li>
                  <li>Improved action verbs to highlight accomplishments</li>
                  <li>Restructured content for better readability</li>
                  <li>
                    Streamlined information to focus on relevant skills and
                    experience
                  </li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
                <button
                  type="button"
                  className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={resetForm}
                >
                  Upload Another Resume
                </button>
                <button
                  type="button"
                  className="bg-blue-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={() =>
                    downloadAsWord(
                      optimizationResult.optimizedResume,
                      "optimized-resume"
                    )
                  }
                >
                  Download Optimized Resume
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white shadow rounded-lg p-8">
              {uploadSuccess ? (
                <div className="text-center py-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-4">
                    <svg
                      className="h-10 w-10 text-green-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Resume Successfully Uploaded!
                  </h3>
                  <p className="text-sm text-gray-500 mb-6">
                    Your file has been successfully uploaded and is ready for
                    analysis.
                  </p>
                  {uploadedFileUrl && (
                    <div className="mb-6">
                      <a
                        href={uploadedFileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 underline"
                      >
                        View Uploaded File
                      </a>
                    </div>
                  )}
                  <div className="flex justify-center">
                    <button
                      type="button"
                      className="bg-blue-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      onClick={handleOnOptimize}
                      disabled={isOptimizing}
                    >
                      {isOptimizing ? (
                        <span className="flex items-center">
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Optimizing Resume...
                        </span>
                      ) : (
                        "Optimize My Resume"
                      )}
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div
                    className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
                      ${
                        isDragging
                          ? "border-blue-500 bg-blue-50"
                          : file
                          ? "border-green-300 bg-green-50"
                          : "border-gray-300 hover:border-gray-400"
                      }
                    `}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() =>
                      document.getElementById("file-input")?.click()
                    }
                  >
                    <input
                      type="file"
                      id="file-input"
                      className="hidden"
                      accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          handleFileChange(e.target.files[0]);
                        }
                      }}
                    />

                    {file ? (
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                          <span className="text-green-600 font-bold">
                            {getFileIcon()}
                          </span>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {file.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                          <Upload className="h-8 w-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">
                          Drag and drop your resume here
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          or click to browse files
                        </p>
                        <p className="text-xs text-gray-400 mt-2">
                          Supported formats: PDF, Word (.doc, .docx) • Max size:
                          5MB
                        </p>
                      </div>
                    )}
                  </div>

                  {error && (
                    <div className="mt-4 bg-red-50 border border-red-200 rounded-md p-4">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <svg
                            className="h-5 w-5 text-red-400"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm text-red-600">{error}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {isUploading && (
                    <div className="mt-6">
                      <div className="relative pt-1">
                        <div className="flex mb-2 items-center justify-between">
                          <div>
                            <span className="text-xs font-semibold inline-block text-blue-600">
                              Uploading to server...
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="text-xs font-semibold inline-block text-blue-600">
                              {uploadProgress}%
                            </span>
                          </div>
                        </div>
                        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-100">
                          <div
                            style={{ width: `${uploadProgress}%` }}
                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 transition-all duration-300"
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="mt-6 flex justify-end">
                    <button
                      type="button"
                      className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-3"
                      onClick={resetForm}
                    >
                      Clear
                    </button>
                    <button
                      type="button"
                      className="bg-blue-700 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={!file || isUploading}
                      onClick={handleUpload}
                    >
                      {isUploading ? "Uploading..." : "Upload My Resume"}
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="h-6 w-6 text-blue-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">
                ATS Optimization
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Get your resume past Applicant Tracking Systems with our keyword
                analysis and formatting suggestions.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="h-6 w-6 text-blue-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">
                Action Words
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Enhance your resume with powerful action verbs that showcase
                your achievements and capabilities.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="h-6 w-6 text-blue-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">
                Expert Suggestions
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Get personalized suggestions based on industry standards and
                recruiter preferences.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default UploadPage;
