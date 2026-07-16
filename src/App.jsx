import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import CodeEditor from "./pages/CodeEditor";
import Result from "./pages/Result";
import History from "./pages/History";
import BatchReview from "./pages/BatchReview";
import Analytics from "./pages/Analytics";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/editor" element={<CodeEditor />} />
      <Route path="/result" element={<Result />} />
      <Route path="/history" element={<History />} />
      <Route path="/batch" element={<BatchReview />} />
      <Route path="/analytics" element={<Analytics />} />
    </Routes>
  );
}

export default App;