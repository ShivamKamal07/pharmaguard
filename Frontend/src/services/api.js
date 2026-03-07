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

export const getReports = async () => {
  const response = await axios.get(
    "http://localhost:5000/api/reports"
  );
  return response.data;
};

export const deleteReport = async (id) => {
  await axios.delete(
    `http://localhost:5000/api/reports/${id}`
  );
};
