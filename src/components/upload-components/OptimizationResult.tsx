import React from "react";
import { ThumbsUp, Edit, Copy, Download, Bot } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface OptimizationResultProps {
  optimizationResult: {
    originalResume: string;
    optimizedResume: string;
  };
  activeTab: string;
  copySuccess: boolean;
  setActiveTab: (tab: string) => void;
  copyToClipboard: (text: string) => void;
  downloadAsWord: (content: string, filename: string) => void;
  resetForm: () => void;
}

export const OptimizationResult: React.FC<OptimizationResultProps> = ({
  optimizationResult,
  activeTab,
  copySuccess,
  setActiveTab,
  copyToClipboard,
  downloadAsWord,
  resetForm,
}) => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="text-center py-4 mb-6">
        <div className="w-16 h-16 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-4">
          <ThumbsUp className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Resume Optimization Complete!
        </h3>
        <p className="text-gray-600">
          Your resume has been optimized for better visibility with hiring
          managers and ATS systems.
        </p>
      </div>

      <div className="mb-8">
        <div className="flex border-b border-gray-200 mb-4">
          <button
            className={`px-4 py-2 font-medium text-sm ${activeTab === "optimized"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700"
              }`}
            onClick={() => setActiveTab("optimized")}
          >
            Optimized Resume
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm ${activeTab === "original"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700"
              }`}
            onClick={() => setActiveTab("original")}
          >
            Original Resume
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm ${activeTab === "compare"
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
            <div className="absolute top-2 right-2 flex space-x-2 z-10">
              <button
                onClick={() =>
                  copyToClipboard(optimizationResult.optimizedResume)
                }
                className="p-2 rounded-md bg-white border border-gray-200 hover:bg-gray-50 shadow-sm transition-colors"
                title="Copy to clipboard"
              >
                <Copy className="h-4 w-4 text-gray-500" />
              </button>
              <button
                onClick={() =>
                  downloadAsWord(
                    optimizationResult.optimizedResume,
                    "optimized-resume"
                  )
                }
                className="p-2 rounded-md bg-white border border-gray-200 hover:bg-gray-50 shadow-sm transition-colors"
                title="Download as Word"
              >
                <Download className="h-4 w-4 text-gray-500" />
              </button>
            </div>

            {/* Chat-like Interface for Optimized View */}
            <div className="bg-gray-50/50 rounded-xl p-6 border border-gray-200 h-[600px] overflow-y-auto custom-scrollbar">
              <div className="flex flex-col space-y-6">
                {/* AI Message Bubble */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <Bot className="w-5 h-5 text-blue-600" />
                    </div>
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-900 text-sm">AI Assistant</span>
                      <span className="text-xs text-gray-500">Just now</span>
                    </div>
                    <div className="prose prose-blue prose-sm max-w-none bg-white p-6 rounded-2xl rounded-tl-none shadow-sm border border-gray-100">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {optimizationResult.optimizedResume}
                      </ReactMarkdown>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {copySuccess && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-4 py-2 rounded-md text-sm shadow-lg animate-fade-in-up">
                Copied to clipboard!
              </div>
            )}
          </div>
        )}

        {activeTab === "original" && (
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 h-[600px] overflow-y-auto">
            <div className="prose prose-sm max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {optimizationResult.originalResume}
              </ReactMarkdown>
            </div>
          </div>
        )}

        {activeTab === "compare" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[600px]">
            <div className="flex flex-col h-full">
              <div className="font-medium text-gray-700 mb-2 flex items-center sticky top-0 bg-white py-2 z-10">
                <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded text-xs mr-2 border border-gray-300">
                  ORIGINAL
                </span>
                <span className="text-xs text-gray-500">Before optimization</span>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 overflow-y-auto flex-1">
                <div className="prose prose-sm max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {optimizationResult.originalResume}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
            <div className="flex flex-col h-full">
              <div className="font-medium text-gray-700 mb-2 flex items-center sticky top-0 bg-white py-2 z-10">
                <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs mr-2 border border-blue-200">
                  OPTIMIZED
                </span>
                <span className="text-xs text-gray-500">After optimization</span>
              </div>
              <div className="bg-blue-50/30 rounded-lg p-4 border border-blue-100 overflow-y-auto flex-1">
                <div className="prose prose-blue prose-sm max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {optimizationResult.optimizedResume}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-blue-50/50 rounded-lg p-4 mb-6 border border-blue-100">
        <h4 className="font-medium text-gray-800 mb-3 flex items-center">
          <Edit className="h-5 w-5 mr-2 text-blue-600" />
          Key Improvements:
        </h4>
        <ul className="text-sm text-gray-600 space-y-2 pl-8 list-disc marker:text-blue-500">
          <li>Enhanced keywords for better ATS visibility</li>
          <li>Improved action verbs to highlight accomplishments</li>
          <li>Restructured content for better readability</li>
          <li>
            Streamlined information to focus on relevant skills and experience
          </li>
        </ul>
      </div>

      <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4 pt-4 border-t border-gray-100">
        <button
          type="button"
          className="bg-white py-2.5 px-5 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
          onClick={resetForm}
        >
          Upload Another Resume
        </button>
        <button
          type="button"
          className="bg-blue-600 py-2.5 px-5 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 flex items-center justify-center"
          onClick={() =>
            downloadAsWord(
              optimizationResult.optimizedResume,
              "optimized-resume"
            )
          }
        >
          <Download className="w-4 h-4 mr-2" />
          Download Optimized Resume
        </button>
      </div>
    </div>
  );
};
