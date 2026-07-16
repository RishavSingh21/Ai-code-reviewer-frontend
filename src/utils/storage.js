const STORAGE_KEY = "ai-code-reviewer-draft";

export const saveDraft = (language, code) => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      language,
      code,
    })
  );
};

export const getDraft = () => {
  try {
    const draft = localStorage.getItem(STORAGE_KEY);

    if (!draft) {
      return {
        language: "javascript",
        code: "",
      };
    }

    return JSON.parse(draft);
  } catch {
    return {
      language: "javascript",
      code: "",
    };
  }
};

export const clearDraft = () => {
  localStorage.removeItem(STORAGE_KEY);
};