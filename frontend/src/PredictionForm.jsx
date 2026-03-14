import { useState } from "react";
import axios from "axios";

function PredictionForm() {

  const [age,setAge] = useState("");
  const [procedures,setProcedures] = useState("");
  const [medications,setMedications] = useState("");
  const [stay,setStay] = useState("");
  const [result,setResult] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = axios.post("https://hospital-readmission-api.onrender.com/predict",{
      age:Number(age),
      num_procedures:Number(procedures),
      num_medications:Number(medications),
      time_in_hospital:Number(stay)
    });

    setResult(response.data.prediction);
  };

 return (
  <div style={{textAlign:"center",marginTop:"50px"}}>

    <h1>Hospital Readmission Predictor</h1>

    <form onSubmit={handleSubmit} style={{display:"flex",flexDirection:"column",width:"300px",margin:"auto",gap:"10px"}}>

      <input placeholder="Age" onChange={(e)=>setAge(e.target.value)} />

      <input placeholder="Number of Procedures" onChange={(e)=>setProcedures(e.target.value)} />

      <input placeholder="Number of Medications" onChange={(e)=>setMedications(e.target.value)} />

      <input placeholder="Hospital Stay Days" onChange={(e)=>setStay(e.target.value)} />

      <button type="submit">Predict Risk</button>

    </form>

    <h2 style={{marginTop:"20px"}}>
      {result === 1 && <span style={{color:"red"}}>High Readmission Risk</span>}
      {result === 0 && <span style={{color:"green"}}>Low Readmission Risk</span>}
    </h2>

  </div>
);
}

export default PredictionForm;
