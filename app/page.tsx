"use client";
import FeedbackCard from "@/components/FeedbackCard";
import { useState } from "react";
import { getQuestion, postAnswer } from "../util/api";

export default function Home() {
  const [job, setJob] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleGetQuestion = async () => {
    if (!job) return alert("직군을 입력해주세요!");
    setLoading(true);
    const res = await getQuestion(job);
    setQuestion(res.question);
    setFeedback(null);
    setAnswer("");
    setLoading(false);
  };

  const handleSubmitAnswer = async () => {
    if (!answer) return alert("답변을 작성해주세요!");
    setLoading(true);
    const res = await postAnswer(question, answer);
    setFeedback(res);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">
        Interview Practice AI with Gemini
      </h1>

      <div className="w-full max-w-xl mb-6 space-y-4">
        <input
          type="text"
          placeholder="직무 입력 (예: 프론트엔드)"
          value={job}
          onChange={(e) => setJob(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <button
          onClick={handleGetQuestion}
          disabled={loading} // ①
          className={`w-full py-3 rounded text-white transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {loading ? "질문 생성 중..." : "질문 생성"}
        </button>
      </div>

      {question && (
        <div className="w-full max-w-xl mb-6 p-4 bg-white border border-gray-200 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">질문:</h2>
          <p>{question}</p>

          <textarea
            placeholder="답변 작성..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="w-full mt-4 p-3 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            rows={5}
          />

          <button
            onClick={handleSubmitAnswer}
            disabled={loading}
            className={`mt-3 w-full py-3 rounded text-white transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading ? "제출 중..." : "답변 제출"}
          </button>
        </div>
      )}

      {feedback && <FeedbackCard feedback={feedback} />}
    </div>
  );
}
