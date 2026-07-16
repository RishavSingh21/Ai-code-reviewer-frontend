import { useState, useRef, useEffect } from "react";
import { exportAsMarkdown, exportAsJSON, exportAsPDF } from "../../utils/exportReport";
import "./ExportMenu.css";

const ExportMenu = ({ review }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!review) return null;

  return (
    <div className="export-menu" ref={menuRef}>
      <button className="export-trigger" onClick={() => setOpen(!open)}>
        📄 Export Report ▾
      </button>

      {open && (
        <div className="export-dropdown">
          <button
            onClick={() => { exportAsMarkdown(review); setOpen(false); }}
          >
            <span className="export-icon">📝</span>
            <div>
              <strong>Markdown</strong>
              <span>Formatted .md file</span>
            </div>
          </button>

          <button
            onClick={() => { exportAsPDF(review); setOpen(false); }}
          >
            <span className="export-icon">📕</span>
            <div>
              <strong>PDF Report</strong>
              <span>Professional styled PDF</span>
            </div>
          </button>

          <button
            onClick={() => { exportAsJSON(review); setOpen(false); }}
          >
            <span className="export-icon">🔧</span>
            <div>
              <strong>JSON</strong>
              <span>Raw data for automation</span>
            </div>
          </button>
        </div>
      )}
    </div>
  );
};

export default ExportMenu;
