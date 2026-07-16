import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./ReviewProgress.css";

const steps = [
  { id: 1, label: "Analyzing Code", icon: "🔍", duration: 2000 },
  { id: 2, label: "Finding Issues", icon: "🐛", duration: 3000 },
  { id: 3, label: "Generating Suggestions", icon: "💡", duration: 3000 },
  { id: 4, label: "Building Report", icon: "📊", duration: 2000 },
];

const ReviewProgress = ({ isActive }) => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (!isActive) {
      setCurrentStep(0);
      return;
    }

    let stepIndex = 0;
    const advance = () => {
      if (stepIndex < steps.length - 1) {
        stepIndex++;
        setCurrentStep(stepIndex);
      }
    };

    const timers = steps.slice(0, -1).map((step, i) => {
      const totalDelay = steps
        .slice(0, i + 1)
        .reduce((sum, s) => sum + s.duration, 0);
      return setTimeout(advance, totalDelay);
    });

    return () => timers.forEach(clearTimeout);
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div className="review-progress-overlay">
      <motion.div
        className="review-progress-card glass-card"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
      >
        <div className="progress-spinner" />

        <div className="progress-steps">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`progress-step ${
                index < currentStep
                  ? "completed"
                  : index === currentStep
                  ? "active"
                  : "pending"
              }`}
            >
              <div className="step-indicator">
                {index < currentStep ? (
                  <span>✓</span>
                ) : index === currentStep ? (
                  <span className="step-spinner" />
                ) : (
                  <span className="step-dot" />
                )}
              </div>

              <div className="step-content">
                <span className="step-icon">{step.icon}</span>
                <span className="step-label">{step.label}</span>
              </div>
            </div>
          ))}
        </div>

        <p className="progress-hint">
          AI is reviewing your code — this may take a few seconds
        </p>
      </motion.div>
    </div>
  );
};

export default ReviewProgress;
