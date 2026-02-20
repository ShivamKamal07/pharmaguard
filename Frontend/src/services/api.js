import axios from "axios";

export const analyzeVCF = async (formData) => {
  const response = await axios.post(
    "http://localhost:5000/api/analyze",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};
