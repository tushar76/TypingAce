import React, { useState, useEffect } from "react";
import "./TypingSpeedApp.css";

const TypingSpeedApp = () => {
  const [typedText, setTypedText] = useState("");
  const [charactersTyped, setCharactersTyped] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [speedWPM, setSpeedWPM] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [speedMessage, setSpeedMessage] = useState("");
  const [isTestActive, setIsTestActive] = useState(true);

  const [originalText] = useState(
    `Once upon a time, in a world where technology seamlessly blended with creativity, aspiring developers worked on extraordinary projects. They built platforms that connected people, created systems that measured performance, and used code to tell stories. Their mission was clear: build for the future while embracing innovation, empathy, and precision. With every keystroke, they brought ideas to life, solved problems, and made a difference. As time passed, these creators refined their craft, shared knowledge, and inspired the next wave of visionaries. This typing speed test simulates the real-world environment where clarity, accuracy, and speed are key—just as in the field of software engineering. Now, it's your time to shine. Begin typing and show the world the power of your focus and dedication.`
  );

  const handleTypingChange = (e) => {
    if (!isTestActive) return;

    const typed = e.target.value;
    setTypedText(typed);

    const typedWords = typed.trim().split(/\s+/).filter(word => word.length > 0);
    const wordCount = typedWords.length;

    const correctWords = typedWords.filter((word, index) => {
      const originalWords = originalText.trim().split(/\s+/);
      return word === originalWords[index];
    }).length;

    const totalTime = Math.max(elapsedSeconds, 1); // Avoid division by 0
    const wpm = (wordCount / totalTime) * 60;
    const accuracy = wordCount > 0 ? (correctWords / wordCount) * 100 : 0;

    setCharactersTyped(typed.replace(/\s/g, "").length);
    setWordCount(wordCount);
    setSpeedWPM(wpm);
    setAccuracy(accuracy);
  };

  useEffect(() => {
    if (elapsedSeconds < 60) {
      const timer = setInterval(() => setElapsedSeconds((prev) => prev + 1), 1000);
      return () => clearInterval(timer);
    } else {
      setIsTestActive(false);
      if (speedWPM >= 90) {
        setSpeedMessage("Your speed is great!");
      } else if (speedWPM >= 60) {
        setSpeedMessage("Your speed is moderate.");
      } else {
        setSpeedMessage("You can improve your speed.");
      }
    }
  }, [elapsedSeconds, speedWPM]);

  const resetTest = () => {
    setTypedText("");
    setCharactersTyped(0);
    setWordCount(0);
    setElapsedSeconds(0);
    setSpeedWPM(0);
    setAccuracy(0);
    setSpeedMessage("");
    setIsTestActive(true);
  };

  return (
    <div className="typing-speed-container">
      <div className="typing-left">
        <h1>Typing Speed Test</h1>
        <textarea
          value={typedText}
          onChange={handleTypingChange}
          placeholder="Start typing here..."
          className="typing-area-large"
          rows={20}
          disabled={!isTestActive}
        />
        <div className="progress-bar-container">
          <div
            className="progress-bar"
            style={{
              width: `${(charactersTyped / originalText.replace(/\s/g, "").length) * 100}%`,
            }}
          />
        </div>
        <button className="reset-btn" onClick={resetTest}>Reset Test</button>
      </div>

      <div className="typing-right">
        <button className="big-option-btn">Characters Typed: {charactersTyped}</button>
        <button className="big-option-btn">Words Typed: {wordCount}</button>
        <button className="big-option-btn">Time Elapsed: {elapsedSeconds}s</button>
        <button className="big-option-btn">Speed: {speedWPM.toFixed(2)} WPM</button>
        <button className="big-option-btn">Accuracy: {accuracy.toFixed(2)}%</button>
        <button className="big-option-btn">{speedMessage}</button>
      </div>
    </div>
  );
};

export default TypingSpeedApp;
