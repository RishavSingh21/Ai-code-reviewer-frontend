import "./StatusBar.css";

const StatusBar = ({
  language,
  code,
}) => {

  const words =
    code.trim().length === 0
      ? 0
      : code.trim().split(/\s+/).length;

  return (
    <div className="status-bar">

      <span>{language}</span>

      <span>

        Lines :

        {code.split("\n").length}

      </span>

      <span>

        Characters :

        {code.length}

      </span>

      <span>

        Words :

        {words}

      </span>

      <span>

        ✓ Draft Saved

      </span>

    </div>
  );
};

export default StatusBar;