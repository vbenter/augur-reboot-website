
import { useState, useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { $shouldShowIntro, animationActions } from '../stores/animationStore';
import CrtDisplay from './CrtDisplay';
import TypewriterSequence from './TypewriterSequence';
import Button from './Button';
import Pointer from './Pointer';

const bootSentences: string[] = [
  "", // Start with a blank line for the "warm-up"
  "AUGUR BOOT SEQUENCE INITIATED",
  "PERFORMING SYSTEM CHECKS... UPDATE REQUIRED",
  "AUGUR REBOOT INITIATED"
];

const Intro: React.FC = () => {
  // Use nanostores to determine visibility instead of local state
  const shouldShowIntro = useStore($shouldShowIntro);
  const [isPoweredOn, setIsPoweredOn] = useState(true);

  const handleSequenceComplete = () => {
    setTimeout(() => {
      setIsPoweredOn(false);
      setTimeout(() => {
        setIsPoweredOn(true);
        setTimeout(() => {
          // Use store action instead of local state
          animationActions.startAnimations();
        }, 500);
      }, 200);
    }, 1000);
  };

  const handleSkipClick = () => {
    const params = new URLSearchParams(window.location.search);
    params.set('intro', 'false');
    window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`);
    // Use store action instead of local state and events
    animationActions.skipAnimations();
  };

  // Remove the old URL parameter checking - now handled by the store
  // Remove the old event dispatching - now handled by store actions

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleSkipClick(); // Use the same skip logic as clicking skip button
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  if (!shouldShowIntro) {
    return null;
  }

  return (
    <CrtDisplay isPoweredUp={isPoweredOn}>
      <Button
        onClick={handleSkipClick}
        variant="link"
        size="lg"
        className="fixed top-8 right-10 z-50 text-muted-foreground hover:no-underline"
      >
        <Pointer animated="auto" direction="right" />
        SKIP INTRO (ESC)
      </Button>
      <div className="flex items-center justify-center h-screen uppercase text-foreground text-2xl">
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
