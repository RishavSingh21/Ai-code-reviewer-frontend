import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Layout from "../components/Layout/Layout";
import SkeletonLoader from "../components/SkeletonLoader/SkeletonLoader";
import api from "../services/api";
import "./History.css";

const History = () => {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [language, setLanguage] = useState("All");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    fetchReviews();
  }, [page]);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/review/history?page=${page}&limit=15`);
      setReviews(res.data.data);
      setTotalPages(res.data.totalPages || 1);
    } catch {
      toast.error("Unable to fetch history.");
    } finally {
      setLoading(false);
    }
  };

  const filtered = reviews.filter((item) => {
    const matchLang = language === "All" || item.language === language;
    const matchSearch = !search || item.language.toLowerCase().includes(search.toLowerCase());
    return matchLang && matchSearch;
  });

  const deleteReview = async (id) => {
    try {
      await api.delete(`/review/${id}`);
      toast.success("Deleted");
      fetchReviews();
    } catch {
      toast.error("Delete failed");
    }
  };

  const bulkDelete = async () => {
    if (selected.length === 0) return;
    try {
      await api.delete("/review/bulk", { data: { ids: selected } });
      toast.success(`${selected.length} reviews deleted`);
      setSelected([]);
      fetchReviews();
    } catch {
      toast.error("Bulk delete failed");
    }
  };

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selected.length === filtered.length) {
      setSelected([]);
    } else {
      setSelected(filtered.map((r) => r._id));
    }
  };

  const openReview = (review) => {
    sessionStorage.setItem("review", JSON.stringify(review));
    navigate("/result");
  };

  const languages = ["All", ...new Set(reviews.map((r) => r.language))];

  const getScoreColor = (score) => {
    if (!score) return "var(--text-muted)";
    if (score >= 80) return "var(--accent-green)";
    if (score >= 60) return "var(--accent-yellow)";
    return "var(--accent-red)";
  };

  if (loading) {
    return (
      <Layout>
        <h1 className="page-title">Review History</h1>
        <SkeletonLoader type="history" />
      </Layout>
    );
  }

  return (
    <Layout>
      <h1 className="page-title">Review History</h1>
      <p className="page-subtitle">
        Browse and manage your past code reviews
      </p>

      <div className="history-toolbar">
        <div className="toolbar-left">
          <input
            className="search-input"
            placeholder="🔍 Search by language..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="filter-select"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            {languages.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>

        <div className="toolbar-right">
          {selected.length > 0 && (
            <button className="bulk-delete-btn" onClick={bulkDelete}>
              🗑 Delete ({selected.length})
            </button>
          )}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">📋</span>
          <h2>No Reviews Found</h2>
          <p>No reviews match your filters.</p>
        </div>
      ) : (
        <>
          <div className="history-table-header">
            <label className="checkbox-cell">
              <input
                type="checkbox"
                checked={selected.length === filtered.length && filtered.length > 0}
                onChange={toggleSelectAll}
              />
            </label>
            <span className="col-lang">Language</span>
            <span className="col-score">Score</span>
            <span className="col-issues">Issues</span>
            <span className="col-date">Date</span>
            <span className="col-actions">Actions</span>
          </div>

          <div className="history-list">
            {filtered.map((review) => (
              <div
                key={review._id}
                className={`history-row glass-card ${selected.includes(review._id) ? "selected" : ""}`}
              >
                <label className="checkbox-cell">
                  <input
                    type="checkbox"
                    checked={selected.includes(review._id)}
                    onChange={() => toggleSelect(review._id)}
                  />
                </label>

                <span className="col-lang">
                  <strong>{review.language}</strong>
                </span>

                <span className="col-score">
                  <span
                    className="score-pill"
                    style={{ color: getScoreColor(review.aiFeedback?.score) }}
                  >
                    {review.aiFeedback?.score ?? "—"}%
                  </span>
                </span>

                <span className="col-issues">
                  {review.aiFeedback?.annotations?.length || 0}
                </span>

                <span className="col-date">
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>

                <span className="col-actions">
                  <button className="action-btn view" onClick={() => openReview(review)}>
                    View
                  </button>
                  <button className="action-btn delete" onClick={() => deleteReview(review._id)}>
                    Delete
                  </button>
                </span>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination">
              <button
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
              >
                ← Previous
              </button>

              <span className="page-info">
                Page {page} of {totalPages}
              </span>

              <button
                disabled={page >= totalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                Next →
              </button>
            </div>
          )}
        </>
      )}
    </Layout>
  );
};

export default History;