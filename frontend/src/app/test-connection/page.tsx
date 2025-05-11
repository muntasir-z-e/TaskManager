"use client";

import { useState, useEffect } from "react";

export default function TestConnection() {
  const [status, setStatus] = useState<string>("Checking connection...");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const testConnection = async () => {
      try {
        // Test basic connectivity to backend
        const apiUrl =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

        // Try different endpoints with detailed logging
        const endpoints = ["/", "/api", "/api/docs", "/api/auth/login"];

        for (const endpoint of endpoints) {
          try {
            setStatus(`Testing ${apiUrl}${endpoint}...`);

            const response = await fetch(`${apiUrl}${endpoint}`, {
              method: endpoint === "/api/auth/login" ? "OPTIONS" : "GET", // Use OPTIONS for auth endpoints
              cache: "no-store",
            });

            // Check response status
            if (response.ok) {
              const successMessage = `Connected to ${apiUrl}${endpoint} - Status: ${response.status}`;
              setStatus(successMessage);

              // If we got this far, at least one endpoint is reachable
              return;
            }
          } catch {
            // Continue to next endpoint
          }
        }

        setStatus("Failed to connect to any endpoint");
        setError("Could not establish connection to the backend server");
      } catch (err) {
        setStatus("Connection test failed");
        setError(err instanceof Error ? err.message : "Unknown error");
      }
    };

    testConnection();
  }, []);

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">API Connection Test</h1>

      <div className="p-4 bg-gray-100 rounded-lg mb-6">
        <p className="mb-2">
          <strong>Status:</strong> {status}
        </p>
        {error && (
          <p className="text-red-600 mt-3">
            <strong>Error:</strong> {error}
          </p>
        )}
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-3">Environment Information</h2>
        <pre className="bg-gray-800 text-white p-3 rounded overflow-x-auto">
          {`API URL: ${
            process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
          }
Next.js Environment: ${process.env.NODE_ENV}
          `}
        </pre>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-3">Debugging Tips</h2>
        <div className="bg-blue-50 p-4 rounded-lg">
          <ul className="list-disc ml-6 space-y-2">
            <li>
              Verify the backend server is running on correct port (check
              console)
            </li>
            <li>
              Check that CORS is properly configured in your NestJS app:
              <pre className="bg-gray-100 p-2 mt-1 rounded text-sm">
                {`app.enableCors({
  origin: 'http://localhost:3001', // Your frontend URL
  credentials: true,
});`}
              </pre>
            </li>
            <li>Make sure local network is not blocking connections</li>
            <li>Try a different browser to rule out browser extensions</li>
            <li>Check browser console (F12) for detailed error messages</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
