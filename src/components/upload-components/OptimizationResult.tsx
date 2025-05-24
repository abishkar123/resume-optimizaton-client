import React from "react";
import { ThumbsUp, Edit, Copy, Download } from "lucide-react";

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
            Streamlined information to focus on relevant skills and experience
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
  );
};
