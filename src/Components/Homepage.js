import axios from 'axios';
import { useState } from "react";
function SentimentAnalysis()
{
const[text,setText]=useState("")
const[result,setResult]=useState(null)
const Analyse=async()=>{
const response= await axios.post(' https://sentiment-analysis-8b18.onrender.com',{text});
setResult(response.data);}
    return(
        <div className="p-4 max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4"> Sentiment Analysis</h1>
            <input type="text"  placeholder="Enter text" value={text} onChange={(e)=>setText(e.target.value)}/>
            <br/>
            <br/>
            <button onClick={Analyse} >Analyse</button>
            {result && (
       <p
  style={{
    backgroundColor:
      result.sentiment === 'positive'
        ? '#d1fae5' // Corresponds to bg-green-200
        : result.sentiment === 'negative'
        ? '#fee2e2' // Corresponds to bg-red-200
        : '#f3f4f6', // Corresponds to bg-gray-200
    // Add other styles here
  }}
>
  Sentiment: {result.sentiment} (Confidence: {(result.confidence * 100).toFixed(2)}%)
</p>
      )}
        </div>

    )
}

export default SentimentAnalysis;