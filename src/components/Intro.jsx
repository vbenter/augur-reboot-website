import { useState, useEffect } from 'react';
import CrtDisplay from './CrtDisplay.tsx';
import TypewriterSequence from './TypewriterSequence.jsx';

const bootSentences = [
  "", // Start with a blank line for the "warm-up"
  "BOOT SEQUENCE INITIATED",
  "PERFORMING SYSTEM CHECKS... UPDATE REQUIRED",
  " UPDATES...",
  "SYSTEM REBOOT INITIALIZED"
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
    <CrtDisplay isPoweredUp={isPoweredOn}>
      <button
        onClick={handleSkip}
        className="fixed top-8 right-10 z-50 font-console text-green-500 hover:text-foreground transition-colors duration-300 cursor-pointer"
      >
        &gt; SKIP
      </button>
      <div className="flex items-center justify-center h-screen font-console uppercase text-green-500">
        <TypewriterSequence
          sentences={bootSentences}
          defaultTypingSpeed={40}
          onSequenceComplete={handleSequenceComplete}
        />
      </div>
    </CrtDisplay>
  );
};

export default Intro;
