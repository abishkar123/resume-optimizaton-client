import React from "react";

interface UploadSuccessProps {
  uploadedFileUrl: string;
  isOptimizing: boolean;
  handleOnOptimize: () => void;
}

export const UploadSuccess: React.FC<UploadSuccessProps> = ({
  uploadedFileUrl,
  isOptimizing,
  handleOnOptimize,
}) => {
  return (
    <div className="bg-white shadow rounded-lg p-8">
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
          Your file has been successfully uploaded and is ready for analysis.
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
    </div>
  );
};
