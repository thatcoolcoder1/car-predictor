import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CarForm = () => {
  const fields = [
    { name: "engine", label: "Engine" },
    { name: "mileage", label: "Mileage" },
    { name: "horsepower", label: "Horsepower" },
    { name: "owners", label: "Owners" },
  ];
  const navigate = useNavigate();

  const [values, setValues] = useState({
    engine: "",
    mileage: "",
    horsepower: "",
    owners: "",
  });
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;
    if (value !== "" && !/^\d*\.?\d*$/.test(value)) {
      setErrors((prev) => ({ ...prev, [name]: "Numbers only" }));
      return;
    }

    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newErrors = {};
    fields.forEach(({ name, label }) => {
      const value = values[name].trim();
      if (value === "") {
        newErrors[name] = `${label} is required`;
      } else if (isNaN(Number(value))) {
        newErrors[name] = "Enter a valid number";
      }
    });

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    navigate("/predict", {
      state: {
        Mileage: Number(values.mileage),
        Engine_CC: Number(values.engine),
        Horsepower: Number(values.horsepower),
        Owners: Number(values.owners),
      },
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="w-full max-w-md flex flex-col gap-4 rounded-2xl bg-white/15 backdrop-blur-lg border border-white/30 shadow-2xl p-8"
    >
      <h2 className="text-2xl font-bold text-center text-white">Car Details</h2>

      {fields.map(({ name, label }) => (
        <div key={name} className="flex flex-col gap-1">
          <label htmlFor={name} className="text-sm font-medium text-white">
            {label}
          </label>
          <input
            id={name}
            name={name}
            value={values[name]}
            onChange={handleChange}
            inputMode="decimal"
            placeholder={label}
            className={`h-11 rounded-lg bg-white/20 border px-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 ${
              errors[name]
                ? "border-red-400 focus:ring-red-400/60"
                : "border-white/30 focus:ring-white/50"
            }`}
          />
          {errors[name] && (
            <p className="text-xs text-red-300">{errors[name]}</p>
          )}
        </div>
      ))}

      <button
        type="submit"
        className="h-11 rounded-lg bg-white/90 hover:bg-white text-slate-900 font-semibold transition"
      >
        Submit
      </button>
    </form>
  );
};

export default CarForm;
