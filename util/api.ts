import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getQuestion = async (job: string) => {
  const { data } = await API.post("/question", { job });
  return data;
};

export const postAnswer = async (question: string, answer: string) => {
  const { data } = await API.post("/answer", { question, answer });
  return data;
};
