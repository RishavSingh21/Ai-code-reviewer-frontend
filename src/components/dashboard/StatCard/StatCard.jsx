import { motion } from "framer-motion";

import AnimatedNumber from "../../common/AnimatedNumber/AnimatedNumber";

import "./StatCard.css";

const StatCard = ({
  title,
  value,
  icon,
  color,
  suffix = "",
}) => {
  return (
    <motion.div
      className="stat-card"
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
      }}
    >
      <div
        className="icon-box"
        style={{
          background: color,
        }}
      >
        {icon}
      </div>

      <div>
        <h2>
          <AnimatedNumber
            value={value}
            suffix={suffix}
          />
        </h2>

        <p>{title}</p>
      </div>
    </motion.div>
  );
};

export default StatCard;