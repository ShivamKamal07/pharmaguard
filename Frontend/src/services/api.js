import axios from "axios";

const API = axios.create({
  baseURL: "https://pharmaguard-ks5i.onrender.com",
});

// Attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

// REGISTER
export const registerUser = async (data) => {
  const res = await API.post("/auth/register", data);
  return res.data;
};

// LOGIN
export const loginUser = async (data) => {
  const res = await API.post("/auth/login", data);
  return res.data;
};

// ANALYZE VCF
export const analyzeVCF = async (formData) => {
  const res = await API.post("/analyze", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

//chat with Ai
export const chatWithAI = async (data) => {
  const res = await API.post("/chat", data);
  return res.data;
};

// GET REPORTS
export const getReports = async () => {
  const res = await API.get("/reports");
  return res.data;
};

// DELETE REPORT
export const deleteReport = async (id) => {
  await API.delete(`/reports/${id}`);
};

export default API;