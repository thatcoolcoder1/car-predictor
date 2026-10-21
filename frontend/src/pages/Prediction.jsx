
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/predict";

export default function Prediction() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!state) {
      setError("No car details received. Please submit the form again.");
      setLoading(false);
      return;
    }

    async function getPrediction() {
      try {
        const { data } = await axios.post(API_URL, state);
        setPrice(data.predicted_price);
      } catch (err) {
        setError(
          err.response?.data?.detail ||
            "Prediction failed. Check that FastAPI is running."
        );
      } finally {
        setLoading(false);
      }
    }

    getPrediction();
  }, [state]);

  if (loading) {
    return <div className="p-8 text-white">Predicting car price...</div>;
  }

  if (error) {
    return (
      <div className="p-8 text-white">
        <p>{error}</p>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-white">
      <h1 className="text-3xl font-bold">Predicted Car Price</h1>
      <p className="text-2xl">
        ₹{Number(price).toLocaleString("en-IN")}
      </p>
      <button
        onClick={() => navigate(-1)}
        className="rounded-lg bg-white px-4 py-2 text-black"
      >
        Go Back
      </button>
    </div>
  );
}
