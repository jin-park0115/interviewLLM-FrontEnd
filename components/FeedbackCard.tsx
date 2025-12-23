interface Scores {
  concept: number;
  logic: number;
  practice: number;
  communication: number;
}

interface Feedback {
  scores: Scores;
  total: number;
  strengths: string;
  weaknesses: string;
  improvement: string;
}

interface Props {
  feedback: Feedback;
}

const FeedbackCard: React.FC<Props> = ({ feedback }) => {
  const { scores, total, strengths, weaknesses, improvement } = feedback;

  const renderScoreBar = (score: number) => (
    <div className="score-bar-container">
      <div
        className="score-bar-fill"
        style={{ width: `${(score / 5) * 100}%` }}
      ></div>
    </div>
  );

  return (
    <div className="feedback-card">
      <h2>점수</h2>
      <div className="scores">
        {Object.entries(scores).map(([key, value]) => (
          <div key={key} className="score-item">
            <span className="score-label">
              {key.charAt(0).toUpperCase() + key.slice(1)}:
            </span>
            {renderScoreBar(value)}
            <span className="score-number">{value}/5</span>
          </div>
        ))}
        <p className="total-score">Total: {total}/20</p>
      </div>

      <div className="feedback-text">
        <h3>강점</h3>
        <p>{strengths}</p>
        <h3>약점</h3>
        <p>{weaknesses}</p>
        <h3>개선점</h3>
        <p>{improvement}</p>
      </div>

      <style jsx>{`
        .feedback-card {
          background: #fff;
          padding: 24px;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          max-width: 700px;
          margin: 24px auto;
        }
        .scores {
          margin-bottom: 24px;
        }
        .score-item {
          display: flex;
          align-items: center;
          margin-bottom: 8px;
        }
        .score-label {
          width: 120px;
          font-weight: 600;
        }
        .score-bar-container {
          flex: 1;
          background: #eee;
          height: 10px;
          border-radius: 5px;
          margin: 0 12px;
        }
        .score-bar-fill {
          height: 10px;
          background: #4ade80; /* 연두색 */
          border-radius: 5px;
        }
        .score-number {
          width: 40px;
          text-align: right;
          font-weight: 600;
        }
        .total-score {
          margin-top: 12px;
          font-weight: 700;
        }
        .feedback-text h3 {
          margin-top: 16px;
          font-size: 16px;
        }
        .feedback-text p {
          margin: 4px 0 12px 0;
        }
      `}</style>
    </div>
  );
};

export default FeedbackCard;
