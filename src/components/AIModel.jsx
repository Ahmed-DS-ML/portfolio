import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from './Navbar';

const AIModel = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const GOOGLE_GEMINI_API_KEY = "AIzaSyBJ8K9d8QkT49xcbkPDCP1mrl0V2e0u5Tw";
  const GOOGLE_GEMINI_ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

  const handleGenerate = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setOutput(""); // Clear previous output
    try {
      const response = await fetch(`${GOOGLE_GEMINI_ENDPOINT}?key=${GOOGLE_GEMINI_API_KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{ 
            parts: [{ 
              text: `You are an AI assistant for data scientists and ML engineers. Your task is to solve complex problems in data analysis and machine learning.
                     When responding to queries:
                     - Identify the main problem
                     - Break it into steps
                     - Provide clear solutions for each step
                     - Include Python or R code snippets when relevant
                     - Explain technical terms
                     - Highlight potential challenges
                     - Suggest optimization techniques
                     - Recommend learning resources

                     User Query: ${input}` 
            }] 
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2048,
          },
        }),
      });

      const result = await response.json();

      if (result.candidates && result.candidates[0]?.content?.parts?.[0]?.text) {
        setOutput(result.candidates[0].content.parts[0].text);
      } else if (result.promptFeedback?.blockReason) {
        setOutput(`Request blocked: ${result.promptFeedback.blockReason}`);
      } else {
        setOutput("No output generated. Please try again with a different prompt.");
      }
    } catch (error) {
      console.error("Error:", error);
      setOutput("Error generating response. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-8">AI Assistant for Data Science</h1>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="space-y-4">
              <div>
                <label htmlFor="prompt" className="block text-lg font-medium text-gray-700 mb-2">
                  Ask me anything about data science and machine learning
                </label>
                <textarea
                  id="prompt"
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  rows="4"
                  placeholder="Example: How do I implement a neural network for image classification?"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleGenerate}
                disabled={loading || !input.trim()}
                className={`w-full py-3 px-6 rounded-lg text-white font-medium transition-colors duration-300 ${
                  loading || !input.trim()
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-primary-600 hover:bg-primary-700'
                }`}
              >
                {loading ? "Generating Response..." : "Get AI Response"}
              </motion.button>
            </div>
          </div>

          {output && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Response</h2>
              <div className="prose max-w-none">
                <pre className="whitespace-pre-wrap font-sans text-gray-700 bg-gray-50 p-4 rounded-lg">
                  {output}
                </pre>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AIModel;
