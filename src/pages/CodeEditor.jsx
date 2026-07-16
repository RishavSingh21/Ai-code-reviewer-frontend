import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Layout from "../components/Layout/Layout";
import Toolbar from "../components/editor/Toolbar/Toolbar";
import EditorPanel from "../components/EditorPanel/EditorPanel";
import LanguageSelector from "../components/LanguageSelector/LanguageSelector";
import ReviewProgress from "../components/ReviewProgress/ReviewProgress";

import api from "../services/api";

import languages from "../utils/languages";
import { getDraft, saveDraft } from "../utils/storage";

import "./CodeEditor.css";

const CodeEditor = () => {
  const navigate = useNavigate();

  const draft = getDraft();

  const [language, setLanguage] = useState(draft.language);
  const [code, setCode] = useState(draft.code);
  const [loading, setLoading] = useState(false);

  const [theme, setTheme] = useState("vs-dark");
  const [fontSize, setFontSize] = useState(14);

  const fileRef = useRef(null);
  const handleReviewRef = useRef(null);

  // Auto Save
  useEffect(() => {
    saveDraft(language, code);
  }, [language, code]);

  // AI Review
  const handleReview = useCallback(async () => {
    if (!code.trim()) {
      toast.error("Please enter some code.");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/review", {
        language,
        code,
      });

      sessionStorage.setItem(
        "review",
        JSON.stringify(res.data.data)
      );

      toast.success("Review completed!");
      navigate("/result");
    } catch (error) {
      console.error(error);
      toast.error("Review failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [code, language, navigate]);

  // Keep ref in sync
  useEffect(() => {
    handleReviewRef.current = handleReview;
  }, [handleReview]);

  // Ctrl + Enter Shortcut
  useEffect(() => {
    const handleShortcut = (e) => {
      if (e.ctrlKey && e.key === "Enter") {
        handleReviewRef.current();
      }
    };
    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  // Copy Code
  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    toast.success("Code copied!");
  };

  // Clear Editor
  const handleClear = () => {
    setCode("");
    toast.success("Editor cleared");
  };

  // Upload File
  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setCode(event.target.result);
      toast.success(`${file.name} loaded`);
    };
    reader.readAsText(file);
  };

  // Download File
  const handleDownload = () => {
    const selected = languages.find((item) => item.value === language);
    const extension = selected?.ext || "txt";
    const blob = new Blob([code], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `code.${extension}`;
    link.click();
    URL.revokeObjectURL(link.href);
    toast.success("File downloaded");
  };

  return (
    <Layout>
      <h1 className="page-title">Code Editor</h1>
      <p className="page-subtitle">
        Write or paste your code, then hit Review to get AI-powered feedback
      </p>

      <Toolbar
        languageSelector={
          <LanguageSelector
            language={language}
            setLanguage={setLanguage}
          />
        }
        theme={theme}
        setTheme={setTheme}
        fontSize={fontSize}
        setFontSize={setFontSize}
        onUpload={() => fileRef.current.click()}
        onDownload={handleDownload}
        onCopy={handleCopy}
        onClear={handleClear}
        onReview={handleReview}
        loading={loading}
      />

      <input
        hidden
        ref={fileRef}
        type="file"
        onChange={handleUpload}
      />

      <EditorPanel
        language={language}
        code={code}
        setCode={setCode}
        theme={theme}
        fontSize={fontSize}
      />

      <div className="editor-footer">
        <span>
          Language: <strong>{language}</strong>
        </span>
        <span>
          Lines: <strong>{code ? code.split("\n").length : 0}</strong>
        </span>
        <span>
          Chars: <strong>{code.length}</strong>
        </span>
        <span>
          Words: <strong>{code.trim() ? code.trim().split(/\s+/).length : 0}</strong>
        </span>
        <span style={{ color: "var(--accent-green)" }}>✓ Draft Saved</span>
        <span style={{ color: "var(--text-muted)" }}>Ctrl+Enter → Review</span>
      </div>

      <ReviewProgress isActive={loading} />
    </Layout>
  );
};

export default CodeEditor;