import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";

const JupyterCodeDisplay = ({ code }) => {
  return (
    <div className="jupyter-code-display">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold text-primary-600 mb-4">Code Implementation</h3>
        <SyntaxHighlighter 
          language="python" 
          style={tomorrow}
          className="rounded-md"
          customStyle={{
            padding: "1.5rem",
            fontSize: "0.9rem",
            lineHeight: "1.5"
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default JupyterCodeDisplay;
