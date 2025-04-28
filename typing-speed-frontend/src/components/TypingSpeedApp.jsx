// import React, { useState, useEffect, useCallback } from "react";
// import "./TypingSpeedApp.css";

// const TypingSpeedApp = () => {
//   const [typedText, setTypedText] = useState("");
//   const [charactersTyped, setCharactersTyped] = useState(0);
//   const [wordCount, setWordCount] = useState(0);
//   const [elapsedSeconds, setElapsedSeconds] = useState(0);
//   const [speedWPM, setSpeedWPM] = useState(0);
//   const [speedMessage, setSpeedMessage] = useState("");
//   const [isTestActive, setIsTestActive] = useState(true);
//   const [isLoading, setIsLoading] = useState(false);

//   // --- Typing Handler ---
//   const handleTypingChange = (e) => {
//     if (!isTestActive) return;

//     const typed = e.target.value;
//     setTypedText(typed);

//     const typedWords = typed.trim().split(/\s+/);
//     const totalCharacters = typed.replace(/\s/g, "").length;

//     const wordEquivalent = totalCharacters / 5; // 5 characters = 1 word
//     const totalTime = Math.max(elapsedSeconds, 1); // Avoid division by zero
//     const wpm = (wordEquivalent / totalTime) * 60;

//     setCharactersTyped(totalCharacters);
//     setWordCount(typedWords.filter(word => word.length > 0).length);
//     setSpeedWPM(wpm);
//   };

//   // --- Send result to backend ---
//   const sendResultToBackend = useCallback(async () => {
//     const payload = {
//       typedText,
//       elapsedSeconds,
//     };

//     setIsLoading(true); // Show loader

//     try {
//       const response = await fetch("http://localhost:8080/api/calculateSpeed", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       const data = await response.json();
//       setSpeedWPM(data.speedWPM);
//     } catch (error) {
//       console.error("Failed to send result to backend:", error);
//     } finally {
//       setIsLoading(false); // Hide loader
//     }
//   }, [typedText, elapsedSeconds]);

//   // --- Timer and Completion Handler ---
//   useEffect(() => {
//     if (elapsedSeconds < 60) {
//       const timer = setInterval(() => setElapsedSeconds((prev) => prev + 1), 1000);
//       return () => clearInterval(timer);
//     } else {
//       setIsTestActive(false);
//       sendResultToBackend();
//     }
//   }, [elapsedSeconds, sendResultToBackend]);

//   // --- Update Speed Message Automatically ---
//   useEffect(() => {
//     if (!isTestActive) {
//       if (speedWPM >= 90) {
//         setSpeedMessage("Your speed is great!");
//       } else if (speedWPM >= 60) {
//         setSpeedMessage("Your speed is moderate.");
//       } else {
//         setSpeedMessage("You can improve your speed.");
//       }
//     }
//   }, [speedWPM, isTestActive]);

//   // --- Reset Handler ---
//   const resetTest = () => {
//     setTypedText("");
//     setCharactersTyped(0);
//     setWordCount(0);
//     setElapsedSeconds(0);
//     setSpeedWPM(0);
//     setSpeedMessage("");
//     setIsTestActive(true);
//   };

//   return (
//     <div className="typing-speed-container">
//       <div className="typing-left">
//         <h1>Typing Speed Test</h1>
//         <textarea
//           value={typedText}
//           onChange={handleTypingChange}
//           placeholder="Start typing here..."
//           className={`typing-area-large ${!isTestActive ? "disabled" : ""}`}
//           rows={20}
//           disabled={!isTestActive}
//         />
//         <div className="progress-bar-container">
//           <div
//             className="progress-bar"
//             style={{
//               width: `${(charactersTyped / 300) * 100}%`, // Example: assuming 300 chars expected
//             }}
//           />
//         </div>
//         <button className="reset-btn" onClick={resetTest}>Reset Test</button>
//       </div>

//       <div className="typing-right">
//         <button className="big-option-btn">Characters Typed: {charactersTyped}</button>
//         <button className="big-option-btn">Words Typed: {wordCount}</button>
//         <button className="big-option-btn">Time Elapsed: {elapsedSeconds}s</button>
//         <button className="big-option-btn">Speed: {speedWPM ? speedWPM.toFixed(2) : "0.00"} WPM</button>
//         {isTestActive ? (
//           <button className="big-option-btn">Test in progress...</button>
//         ) : (
//           <>
//             {isLoading ? (
//               <button className="big-option-btn">Sending result...</button>
//             ) : (
//               <button className="big-option-btn">{speedMessage}</button>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TypingSpeedApp;
import React, { useState, useEffect, useCallback } from "react";
import "./TypingSpeedApp.css";

const TypingSpeedApp = () => {
  const [typedText, setTypedText] = useState("");
  const [charactersTyped, setCharactersTyped] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [speedWPM, setSpeedWPM] = useState(0);
  const [speedMessage, setSpeedMessage] = useState("");
  const [isTestActive, setIsTestActive] = useState(true);
  const [isLoading, setIsLoading] = useState(false); // Loading state

  // --- Typing Handler ---
  const handleTypingChange = (e) => {
    if (!isTestActive) return;

    const typed = e.target.value;
    setTypedText(typed);

    const typedWords = typed.trim().split(/\s+/);
    const totalCharacters = typed.replace(/\s/g, "").length;

    const wordEquivalent = totalCharacters / 5; // 5 characters = 1 word
    const totalTime = Math.max(elapsedSeconds, 1); // Avoid division by zero
    const wpm = (wordEquivalent / totalTime) * 60;

    setCharactersTyped(totalCharacters);
    setWordCount(typedWords.filter(word => word.length > 0).length);
    setSpeedWPM(wpm);
  };

  // --- Send result to backend ---
  const sendResultToBackend = useCallback(async () => {
    const payload = {
      typedText,
      elapsedSeconds,
    };

    setIsLoading(true); // Show loader

    try {
      const response = await fetch("http://localhost:8080/api/calculateSpeed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      setSpeedWPM(data.speedWPM);
    } catch (error) {
      console.error("Failed to send result to backend:", error);
    } finally {
      setIsLoading(false); // Hide loader
    }
  }, [typedText, elapsedSeconds]);

  // --- Timer and Completion Handler ---
  useEffect(() => {
    if (elapsedSeconds < 60) {
      const timer = setInterval(() => setElapsedSeconds((prev) => prev + 1), 1000);
      return () => clearInterval(timer);
    } else {
      setIsTestActive(false);
      sendResultToBackend();
    }
  }, [elapsedSeconds, sendResultToBackend]);

  // --- Update Speed Message Automatically ---
  useEffect(() => {
    if (!isTestActive) {
      if (speedWPM >= 90) {
        setSpeedMessage("Your speed is great!");
      } else if (speedWPM >= 60) {
        setSpeedMessage("Your speed is moderate.");
      } else {
        setSpeedMessage("You can improve your speed.");
      }
    }
  }, [speedWPM, isTestActive]);

  // --- Reset Handler ---
  const resetTest = () => {
    setTypedText("");
    setCharactersTyped(0);
    setWordCount(0);
    setElapsedSeconds(0);
    setSpeedWPM(0);
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
          className={`typing-area-large ${!isTestActive ? "disabled" : ""}`}
          rows={20}
          disabled={!isTestActive}
        />
        <div className="progress-bar-container">
          <div
            className="progress-bar"
            style={{
              width: `${(charactersTyped / 300) * 100}%`, // Example: assuming 300 chars expected
            }}
          />
        </div>
        <button className="reset-btn" onClick={resetTest}>Reset Test</button>
      </div>

      <div className="typing-right">
        <button className="big-option-btn">Characters Typed: {charactersTyped}</button>
        <button className="big-option-btn">Words Typed: {wordCount}</button>
        <button className="big-option-btn">Time Elapsed: {elapsedSeconds}s</button>
        <button className="big-option-btn">Speed: {speedWPM ? speedWPM.toFixed(2) : "0.00"} WPM</button>
        {isTestActive ? (
          <button className="big-option-btn">Test in progress...</button>
        ) : (
          <>
            {isLoading ? (
              
              <div className="loader"></div> 
            ) : (
              <button className="big-option-btn">{speedMessage}</button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default TypingSpeedApp;
