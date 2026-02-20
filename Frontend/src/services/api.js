import axios from "axios";

export const analyzeVCF = async (formData) => {
  const response = await axios.post(
    "https://pharmaguard-alpha.vercel.app/api/analyze",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};
