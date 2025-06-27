import React, { useState } from 'react';
import TypewriterSequence from './TypewriterSequence.jsx';
import PerspectiveGridTunnel from './PerspectiveGridTunnel.jsx';
import { HeroBanner } from './HeroBanner.jsx';

const sentences = [
  "system booting up",
  "fetching updates... done!",
  "initializing updates"
];

const InteractiveBackground = () => {
  const [gridAnimationStarted, setGridAnimationStarted] = useState(false);

  const handleTypewriterComplete = () => {
    setGridAnimationStarted(true);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <TypewriterSequence
          sentences={sentences}
          defaultTypingSpeed={60}
          delayBetweenSentences={500}
          holdDuration={1500}
          onSequenceComplete={handleTypewriterComplete}
        />
      </div>
      <HeroBanner />
      <PerspectiveGridTunnel client:load animationStarted={gridAnimationStarted} numLines={12} animationSpeed={0.25} maxOpacity={0.1} lineColor="#2AE7A8" />
    </>
  );
};

export default InteractiveBackground;
