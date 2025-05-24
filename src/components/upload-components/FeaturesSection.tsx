import React from 'react';

export const FeaturesSection: React.FC = () => {
  return (
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
  );
};