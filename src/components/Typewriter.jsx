
import React, { useState, useEffect, useRef } from 'react';

const Typewriter = ({ text, typingSpeed = 60 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const cursorRef = useRef(null);

  useEffect(() => {
    if (currentIndex < text.length) {
      const typingTimer = setTimeout(() => {
        setDisplayedText(text.substring(0, currentIndex + 1));
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, typingSpeed);
      return () => clearTimeout(typingTimer);
    } else {
      // Typing is complete, activate blinking
      if (cursorRef.current) {
        cursorRef.current.classList.add('blink-active');
      }
    }
  }, [currentIndex, text, typingSpeed]);

  return (
    <span className="typewriter-text font-press-start">
      {displayedText}
      <span ref={cursorRef} className="cursor">
        █
      </span>
    </span>
  );
};

export default Typewriter;
