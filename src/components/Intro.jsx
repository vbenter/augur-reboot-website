import React, { useState, useEffect } from 'react';
import CrtDisplay from './CrtDisplay.tsx';
import TypewriterSequence from './TypewriterSequence.jsx';

const bootSentences = [
  "BOOT SEQUENCE INITIATED...",
  "UPDATE REQUIRED...",
  "INSTALLING...",
  "SYSTEM REBOOT REQUIRED"
];

const Intro = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isPoweredOn, setIsPoweredOn] = useState(true);

  const handleSequenceComplete = () => {
    setTimeout(() => {
      setIsPoweredOn(false);
      setTimeout(() => {
        setIsPoweredOn(true);
        setTimeout(() => {
          setIsVisible(false);
        }, 500);
      }, 200);
    }, 1000);
  };

  const handleSkip = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    if (!isVisible) {
      document.dispatchEvent(new CustomEvent('introFinished'));
    }
  }, [isVisible]);

  if (!isVisible) {
    return null;
  }

  return (
    <>
      <button
        onClick={handleSkip}
        className="fixed top-4 right-4 z-50 px-3 py-1 font-console text-primary bg-black bg-opacity-50 border border-primary/50 rounded hover:bg-primary hover:text-black transition-colors duration-300"
      >
        SKIP
      </button>
      <CrtDisplay isPoweredUp={isPoweredOn}>
        <div className="flex items-center justify-center h-screen">
          <TypewriterSequence
            sentences={bootSentences}
            defaultTypingSpeed={40}
            holdDuration={1000}
            delayBetweenSentences={500}
            onSequenceComplete={handleSequenceComplete}
          />
        </div>
      </CrtDisplay>
    </>
  );
};

export default Intro;
