import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaCopy, FaCheck, FaKey, FaSave, FaTrash } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AIModel = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [selectedModel, setSelectedModel] = useState("gemini");
  const [apiKey, setApiKey] = useState("");
  const [showApiInput, setShowApiInput] = useState(false);
  const [savedKeys, setSavedKeys] = useState(() => {
    const saved = localStorage.getItem('aiModelApiKeys');
    return saved ? JSON.parse(saved) : {};
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Load saved API keys from localStorage
    const loadedKeys = localStorage.getItem('aiModelApiKeys');
    if (loadedKeys) {
      setSavedKeys(JSON.parse(loadedKeys));
    }
  }, []);

  useEffect(() => {
    // Load saved API key for selected model
    if (savedKeys[selectedModel]) {
      setApiKey(savedKeys[selectedModel]);
    } else {
      setApiKey('');
    }
  }, [selectedModel, savedKeys]);

  const models = {
    gemini: {
      name: "Google Gemini",
      endpoint: "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent",
      placeholder: "Enter your Gemini API key",
    },
    gpt: {
      name: "OpenAI GPT",
      endpoint: "https://api.openai.com/v1/chat/completions",
      placeholder: "Enter your OpenAI API key (Requires paid plan)",
    },
    claude: {
      name: "Anthropic Claude",
      endpoint: "https://api.anthropic.com/v1/messages",
      placeholder: "Enter your Claude API key",
    }
  };

  const saveApiKey = () => {
    if (!apiKey.trim()) {
      toast.error("Please enter an API key first!");
      return;
    }

    const updatedKeys = {
      ...savedKeys,
      [selectedModel]: apiKey
    };
    localStorage.setItem('aiModelApiKeys', JSON.stringify(updatedKeys));
    setSavedKeys(updatedKeys);
    toast.success(`API key saved for ${models[selectedModel].name}`);
  };

  const deleteApiKey = () => {
    const updatedKeys = { ...savedKeys };
    delete updatedKeys[selectedModel];
    localStorage.setItem('aiModelApiKeys', JSON.stringify(updatedKeys));
    setSavedKeys(updatedKeys);
    setApiKey('');
    toast.success(`API key removed for ${models[selectedModel].name}`);
  };

  const handleModelSelect = (model) => {
    setSelectedModel(model);
    if (model === "gpt") {
      toast.warning(
        <div>
          <p className="font-medium">⚠️ OpenAI API Notice:</p>
          <ul className="list-disc pl-4 mt-2 text-sm">
            <li>Requires a paid API plan</li>
            <li>Free tier has very limited quota</li>
            <li>Consider using Gemini for better free limits</li>
          </ul>
        </div>,
        {
          autoClose: 8000,
          closeButton: true,
        }
      );
    }
  };

  const handleGenerate = async () => {
    if (!input.trim()) return;
    if (!apiKey.trim()) {
      toast.error("Please enter an API key first!");
      return;
    }

    setLoading(true);
    setOutput("");

    try {
      let response;
      let result;
      const headers = {
        "Content-Type": "application/json",
      };

      switch (selectedModel) {
        case "gemini":
          // For Gemini, the API key goes in the URL as a query parameter
          response = await fetch(`${models.gemini.endpoint}?key=${apiKey}`, {
            method: "POST",
            headers,
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    {
                      text: input
                    }
                  ]
                }
              ],
              generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 200,
                topP: 0.8,
                topK: 40
              }
            }),
          });
          
          if (!response.ok) {
            const errorData = await response.json();
            if (errorData.error?.status === 'UNAUTHENTICATED') {
              throw new Error(
                "Invalid API key. Please check your Google AI Studio API key at https://makersuite.google.com/app/apikey"
              );
            } else if (errorData.error?.message) {
              throw new Error(errorData.error.message);
            } else {
              throw new Error(`API request failed with status ${response.status}`);
            }
          }
          
          result = await response.json();
          if (result.candidates?.[0]?.content?.parts?.[0]?.text) {
            setOutput(result.candidates[0].content.parts[0].text);
          } else {
            throw new Error("Unexpected response format from Gemini API");
          }
          break;

        case "gpt":
          response = await fetch(models.gpt.endpoint, {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${apiKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model: "gpt-3.5-turbo",
              messages: [
                {
                  role: "system",
                  content: "You are a helpful but very concise assistant. Keep responses brief and efficient."
                },
                {
                  role: "user",
                  content: input
                }
              ],
              temperature: 0.5,
              max_tokens: 100,
              top_p: 0.9,
              frequency_penalty: 0.5,
              presence_penalty: 0.5
            }),
          });

          if (!response.ok) {
            const errorData = await response.json();
            if (response.status === 429 || errorData.error?.code === 'insufficient_quota') {
              throw new Error(
                "OpenAI API quota exceeded. Please:\n" +
                "1. Check your account billing at https://platform.openai.com/account/billing\n" +
                "2. Upgrade your plan if needed\n" +
                "3. Try again later or switch to another model"
              );
            } else if (errorData.error?.message) {
              throw new Error(errorData.error.message);
            } else {
              throw new Error(`API request failed with status ${response.status}`);
            }
          }

          result = await response.json();
          if (result.choices?.[0]?.message?.content) {
            setOutput(result.choices[0].message.content.trim());
          } else {
            throw new Error("Unexpected response format from OpenAI API");
          }
          break;

        case "claude":
          headers["x-api-key"] = apiKey;
          headers["anthropic-version"] = "2023-06-01";
          response = await fetch(models.claude.endpoint, {
            method: "POST",
            headers,
            body: JSON.stringify({
              model: "claude-2",
              messages: [{ role: "user", content: input }],
            }),
          });
          result = await response.json();
          if (result.content?.[0]?.text) {
            setOutput(result.content[0].text);
          }
          break;
      }

      if (!response.ok) {
        const errorMessage = result?.error?.message || `API request failed with status ${response.status}`;
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.message.includes("quota")) {
        toast.error(
          <div>
            <p>API quota exceeded. Please:</p>
            <ul className="list-disc pl-4 mt-2">
              <li>Check your OpenAI account billing</li>
              <li>Upgrade your plan if needed</li>
              <li>Try again later</li>
            </ul>
          </div>,
          {
            autoClose: 10000, // Show for 10 seconds
            closeButton: true,
            closeOnClick: false
          }
        );
      } else {
        toast.error(error.message || "Error generating text. Please check your API key and try again.", {
          autoClose: 5000
        });
      }
      setOutput("");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success('Text copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy text');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 relative">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      {/* Background Image */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center opacity-30 mix-blend-overlay"
        style={{ 
          backgroundImage: 'url("/ai.png")',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center top',
          backgroundSize: '100% auto',
          filter: 'blur(3px) brightness(1.2)',
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 50%)'
        }}
      />

      {/* Content Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 pointer-events-none" />

      {/* Back Button */}
      <motion.button
        onClick={() => navigate('/')}
        className="fixed top-4 left-4 z-50 flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-gray-700 hover:text-gray-900"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <FaArrowLeft className="w-4 h-4" />
        <span>Back to Home</span>
      </motion.button>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <h1 className="text-4xl font-bold text-[#0088cc] mb-2">AI Text Generation</h1>
            <p className="text-gray-600 mb-8">
              Select your preferred AI model and enter your API key to get started.
            </p>

            {/* Model Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select AI Model
              </label>
              <div className="grid grid-cols-3 gap-4">
                {Object.entries(models).map(([key, model]) => (
                  <button
                    key={key}
                    onClick={() => handleModelSelect(key)}
                    className={`p-4 rounded-xl transition-all duration-300 relative ${
                      selectedModel === key
                        ? 'border-2 border-[#0088cc] bg-blue-50 text-[#0088cc]'
                        : 'border border-gray-200 hover:border-[#0088cc] hover:bg-blue-50/30'
                    } ${key === 'gpt' ? 'relative' : ''}`}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <span className="font-medium">{model.name}</span>
                      {savedKeys[key] && (
                        <span className="text-xs text-green-500 font-medium">API Key Saved</span>
                      )}
                      {key === 'gemini' && (
                        <span className="absolute top-1 right-1 text-xs text-green-600 bg-green-100 px-1.5 py-0.5 rounded-full">
                          Free
                        </span>
                      )}
                      {key === 'gpt' && (
                        <span className="absolute top-1 right-1 text-xs text-amber-600 bg-amber-100 px-1.5 py-0.5 rounded-full">
                          Paid
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {selectedModel === 'gpt' && (
              <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                <div className="flex items-start gap-3">
                  <div className="text-amber-500 mt-1">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-amber-800">OpenAI API Notice:</h3>
                    <ul className="mt-2 text-sm text-amber-700 space-y-1">
                      <li>• Requires a paid API plan</li>
                      <li>• Free tier has very limited quota</li>
                      <li>• Consider using Gemini for better free limits</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* API Key Input */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <FaKey className="text-gray-500" />
                  <label className="text-sm font-medium text-gray-700">
                    API Key
                  </label>
                </div>
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={saveApiKey}
                    className="flex items-center gap-1.5 px-4 py-2 text-sm bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                  >
                    <FaSave className="w-4 h-4" />
                    Save
                  </motion.button>
                  {savedKeys[selectedModel] && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={deleteApiKey}
                      className="flex items-center gap-1.5 px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                      <FaTrash className="w-4 h-4" />
                      Delete
                    </motion.button>
                  )}
                </div>
              </div>
              <div className="relative">
                <input
                  type={showApiInput ? "text" : "password"}
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder={models[selectedModel].placeholder}
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0088cc] focus:border-[#0088cc] bg-gray-50"
                />
                <button
                  onClick={() => setShowApiInput(!showApiInput)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-1 text-sm text-gray-500 hover:text-gray-700"
                >
                  {showApiInput ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Prompt Input */}
            <div className="mb-6">
              <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-2">
                Your Prompt
              </label>
              <textarea
                id="prompt"
                className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0088cc] focus:border-[#0088cc] min-h-[120px] text-gray-800 bg-gray-50"
                placeholder="Enter your text prompt here..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full bg-[#0088cc] text-white py-3 px-6 rounded-xl hover:bg-[#0077b3] transition-colors duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleGenerate}
              disabled={loading || !input.trim() || !apiKey.trim()}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating...
                </span>
              ) : (
                "Generate Text"
              )}
            </motion.button>

            {output && (
              <div className="mt-8">
                <div className="relative">
                  <div className="absolute top-4 right-4">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleCopy(output)}
                      className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
                    >
                      {copied ? (
                        <FaCheck className="w-5 h-5 text-green-500" />
                      ) : (
                        <FaCopy className="w-5 h-5 text-gray-500" />
                      )}
                    </motion.button>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                    <pre className="whitespace-pre-wrap font-mono text-sm text-gray-800">
                      {output}
                    </pre>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIModel;
