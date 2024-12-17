import React from 'react';
import { useRouteError } from 'react-router-dom';

const ErrorBoundary = () => {
  const error = useRouteError();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-lg w-full mx-4">
        <h1 className="text-4xl font-bold text-red-600 dark:text-red-400 mb-4">Oops!</h1>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Something went wrong
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {error?.message || 'An unexpected error occurred'}
        </p>
        <button
          onClick={() => window.location.href = '/'}
          className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300"
        >
          Return Home
        </button>
      </div>
    </div>
  );
};

export default ErrorBoundary;
