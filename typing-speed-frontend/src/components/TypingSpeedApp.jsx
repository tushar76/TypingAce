import React, { useState, useEffect } from "react";
import "./TypingSpeedApp.css";

const TypingSpeedApp = () => {
  const [typedText, setTypedText] = useState("");
  const [charactersTyped, setCharactersTyped] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [speedWPM, setSpeedWPM] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [originalText] = useState(`Once upon a time, in a world where technology seamlessly blended with creativity, aspiring developers worked on extraordinary projects. They built platforms that connected people, created systems that measured performance, and used code to tell stories. Their mission was clear: build for the future while embracing innovation, empathy, and precision. With every keystroke, they brought ideas to life, solved problems, and made a difference. As time passed, these creators refined their craft, shared knowledge, and inspired the next wave of visionaries. This typing speed test simulates the real-world environment where clarity, accuracy, and speed are key—just as in the field of software engineering. Now, it's your time to shine. Begin typing and show the world the power of your focus and dedication.`);

  const [speedMessage, setSpeedMessage] = useState("");
  const [isTestActive, setIsTestActive] = useState(true); // To manage test state

  // Handle typing input and calculate speed and accuracy
  const handleTypingChange = (e) => {
    if (!isTestActive) return; // Prevent typing after test stops

    const typed = e.target.value;
    setTypedText(typed);

    const correctChars = typed
      .split("")
      .filter((char, index) => char === originalText[index] && char !== " ").length;
    const totalChars = typed.split("").filter((char) => char !== " ").length;
    const totalTime = Math.max(elapsedSeconds, 1);
    const wpm = (totalChars / 5) / (totalTime / 60);
    const accuracy = totalChars > 0 ? (correctChars / totalChars) * 100 : 0;

    setCharactersTyped(totalChars);
    setSpeedWPM(wpm);
    setAccuracy(accuracy);
  };

  // Timer for tracking typing time
  useEffect(() => {
    if (elapsedSeconds < 60) {
      const timer = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setIsTestActive(false); // Stop the test after 60 seconds
      // Set the speed message after the timer finishes
      if (speedWPM >= 80) {
        setSpeedMessage("Your speed is great!");
      } else if (speedWPM >= 50) {
        setSpeedMessage("Your speed is moderate!");
      } else {
        setSpeedMessage("You can improve your speed.");
      }
    }
  }, [elapsedSeconds, speedWPM]);

  // Reset function to restart typing test
  const resetTest = () => {
    setTypedText("");
    setCharactersTyped(0);
    setElapsedSeconds(0);
    setSpeedWPM(0);
    setAccuracy(0);
    setSpeedMessage(""); // Reset message when test is reset
    setIsTestActive(true); // Activate the test again
  };

  return (
    <div className="typing-speed-container">
      {/* Left Side: Typing Area */}
      <div className="typing-left">
        <h1>Typing Speed Test</h1>
        <textarea
          value={typedText}
          onChange={handleTypingChange}
          placeholder="Start typing here..."
          className="typing-area-large"
          rows={20}
          disabled={!isTestActive} // Disable textarea when test is stopped
        />
        <div className="progress-bar-container">
          <div
            className="progress-bar"
            style={{ width: `${(charactersTyped / originalText.replace(/\s/g, "").length) * 100}%` }}
          />
        </div>
        <button className="reset-btn" onClick={resetTest}>Reset Test</button>
      </div>

      {/* Right Side: Metrics in Big Buttons */}
      <div className="typing-right">
        <button className="big-option-btn">Characters Typed: {charactersTyped}</button>
        <button className="big-option-btn">Time Elapsed: {elapsedSeconds} seconds</button>
        <button className="big-option-btn">Speed: {speedWPM.toFixed(2)} WPM</button>
        <button className="big-option-btn">Accuracy: {accuracy.toFixed(2)}%</button>

        {/* Speed Message */}
        <button className="big-option-btn">{speedMessage}</button>
      </div>
    </div>
  );
};

export default TypingSpeedApp;
