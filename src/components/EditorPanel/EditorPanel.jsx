import Editor from "@monaco-editor/react";

const EditorPanel = ({
  language,
  code,
  setCode,
  theme,
  fontSize,
}) => {
  return (
    <Editor
      height="75vh"
      language={language}
      value={code}
      theme={theme}
      onChange={(value) => setCode(value || "")}
      options={{
        fontSize,
        minimap: {
          enabled: false,
        },
        automaticLayout: true,
        scrollBeyondLastLine: false,
        wordWrap: "on",
        roundedSelection: true,
        cursorBlinking: "smooth",
      }}
    />
  );
};

export default EditorPanel;