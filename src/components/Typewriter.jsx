
import React, { useState, useEffect } from 'react';

const Typewriter = ({ text, typingSpeed = 100, blinkSpeed = 500 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const typingTimer = setTimeout(() => {
        setDisplayedText(text.substring(0, currentIndex + 1));
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, typingSpeed);
      return () => clearTimeout(typingTimer);
    } else {
      // Once typing is complete, start cursor blinking
      const cursorTimer = setInterval(() => {
        setShowCursor(prev => !prev);
      }, blinkSpeed);
      return () => clearInterval(cursorTimer);
    }
  }, [currentIndex, text, typingSpeed, blinkSpeed]);

  return (
    <span className="typewriter-text font-console">
      {displayedText}
      <span className={`cursor ${showCursor ? 'visible' : 'hidden'}`}>
        |
      </span>
    </span>
  );
};

export default Typewriter;
