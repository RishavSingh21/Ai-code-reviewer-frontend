import "./HistoryCard.css";

const HistoryCard = ({
  review,
  onView,
  onDelete,
}) => {
  return (
    <div className="history-card">

      <div>

        <h3>{review.language}</h3>

        <p>

          {new Date(review.createdAt).toLocaleDateString()}

        </p>

      </div>

      <div className="history-buttons">

        <button onClick={() => onView(review)}>
          View
        </button>

        <button
          className="delete-btn"
          onClick={() => onDelete(review._id)}
        >
          Delete
        </button>

      </div>

    </div>
  );
};

export default HistoryCard;