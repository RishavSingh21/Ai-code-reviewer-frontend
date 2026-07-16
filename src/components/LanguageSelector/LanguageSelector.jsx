import "./LanguageSelector.css";
import languages from "../../utils/languages";

const LanguageSelector = ({ language, setLanguage }) => {
  return (
    <select
      className="language-select"
      value={language}
      onChange={(e) => setLanguage(e.target.value)}
    >
      {languages.map((lang) => (
        <option key={lang.value} value={lang.value}>
          {lang.label}
        </option>
      ))}
    </select>
  );
};

export default LanguageSelector;