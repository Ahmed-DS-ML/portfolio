import React, { useState } from 'react';
import Navbar from './Navbar';
import { motion } from 'framer-motion';

const AIModelPage = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Here you would integrate with your AI model API
      // For now, we'll simulate a response
      const simulatedResponse = `Analysis of your query:

Problem: ${prompt}

Steps to solve:
1. Data Collection
2. Data Preprocessing
3. Model Selection
4. Implementation
5. Evaluation

Sample Python code:
\`\`\`python
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split

# Load and preprocess data
data = pd.read_csv('your_data.csv')
X = data.drop('target', axis=1)
y = data['target']

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)
\`\`\`

Key considerations:
- Data quality and preprocessing
- Model selection criteria
- Performance metrics
- Optimization techniques

Would you like to explore any specific aspect in more detail?`;

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setResponse(simulatedResponse);
    } catch (error) {
      setResponse('Error: Unable to process your request. Please try again.');
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
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="prompt" className="block text-lg font-medium text-gray-700 mb-2">
                  Ask me anything about data science and machine learning
                </label>
                <textarea
                  id="prompt"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Example: How do I implement a neural network for image classification?"
                />
              </div>
              <button
                type="submit"
                disabled={loading || !prompt.trim()}
                className={`w-full py-3 px-6 rounded-lg text-white font-medium transition-colors duration-300 ${
                  loading || !prompt.trim()
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-primary-600 hover:bg-primary-700'
                }`}
              >
                {loading ? 'Processing...' : 'Get AI Response'}
              </button>
            </form>
          </div>

          {response && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Response</h2>
              <div className="prose max-w-none">
                <pre className="whitespace-pre-wrap font-sans text-gray-700">
                  {response}
                </pre>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AIModelPage;
