import { animate } from "framer-motion";
import { useEffect, useState } from "react";

const AnimatedNumber = ({
  value,
  suffix = "",
}) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const controls = animate(0, value, {
      duration: 1.5,
      onUpdate(latest) {
        setDisplayValue(Math.round(latest));
      },
    });

    return () => controls.stop();
  }, [value]);

  return (
    <span>
      {displayValue}
      {suffix}
    </span>
  );
};

export default AnimatedNumber;