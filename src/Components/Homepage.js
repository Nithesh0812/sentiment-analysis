import axios from 'axios';
import { useState } from "react";

function SentimentAnalysis() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const Analyse = async () => {
    try {
      const response = await axios.post("https://sentiment-analysis-8b18.onrender.com", { text });
      setResult(response.data);
      setError("");
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error); 
      } else {
        setError("Something went wrong. Please try again.");
      }
      setResult(null);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Sentiment Analysis</h1>

      <input
        type="text"
        placeholder="Enter text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full p-2 border rounded mb-2"
      />

      {error && <p className="text-red-600 mb-2">{error}</p>}
      <br/>
      <br/>
      <button
        onClick={Analyse}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Analyse
      </button>

      {result && (
        <p
          className="mt-4 p-2 rounded"
          style={{
            backgroundColor:
              result.sentiment === "positive"
                ? "#d1fae5"
                : result.sentiment === "negative"
                ? "#fee2e2"
                : "#f3f4f6",
          }}
        >
          Sentiment: {result.sentiment} (Confidence:{" "}
          {(result.confidence * 100).toFixed(2)}%)
        </p>
      )}
    </div>
  );
}

export default SentimentAnalysis;
