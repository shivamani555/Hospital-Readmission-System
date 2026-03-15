import { useState } from "react";
import axios from "axios";

function PredictionForm() {
  const [age, setAge] = useState("");
  const [procedures, setProcedures] = useState("");
  const [medications, setMedications] = useState("");
  const [stay, setStay] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResult("");
    setLoading(true);

    try {
      const response = await axios.post(
        "https://hospital-api-659w.onrender.com/",
        {
          age: Number(age),
          num_procedures: Number(procedures),
          num_medications: Number(medications),
          time_in_hospital: Number(stay),
        }
      );

      setResult(response.data.prediction);
    } catch (err) {
      console.error(err);
      setError("Backend is not responding. Please check your Render API.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Hospital Readmission Predictor</h1>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "300px",
          margin: "auto",
          gap: "10px",
        }}
      >
        <input
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <input
          placeholder="Number of Procedures"
          value={procedures}
          onChange={(e) => setProcedures(e.target.value)}
        />
        <input
          placeholder="Number of Medications"
          value={medications}
          onChange={(e) => setMedications(e.target.value)}
        />
        <input
          placeholder="Hospital Stay Days"
          value={stay}
          onChange={(e) => setStay(e.target.value)}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Predicting..." : "Predict Risk"}
        </button>
      </form>

      {result !== "" && (
        <h2 style={{ marginTop: "20px" }}>
          {result === 1 ? (
            <span style={{ color: "red" }}>High Readmission Risk</span>
          ) : (
            <span style={{ color: "green" }}>Low Readmission Risk</span>
          )}
        </h2>
      )}

      {error && <p style={{ color: "orange", marginTop: "20px" }}>{error}</p>}
    </div>
  );
}

export default PredictionForm;
