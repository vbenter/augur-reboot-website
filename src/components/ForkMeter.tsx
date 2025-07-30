import React, { useMemo, useState, useEffect } from 'react';
import ForkMeterUI, { type ForkMeterMetadata, ForkMeterState } from './ForkMeterUI.tsx';
import { $animationStore, AnimationPhase } from '../stores/animationStore';

interface ForkMeterProps {
  value?: number; // 0-100 for pointer position
  animated?: boolean;
  // Future: could add props for data source, refresh interval, etc.
}

const ForkMeter: React.FC<ForkMeterProps> = ({
  value = 75,
  animated = true,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(animated);
  
  // Subscribe to animation state
  useEffect(() => {
    const unsubscribe = $animationStore.subscribe((state) => {
      const shouldShow = state.phase === AnimationPhase.ANIMATIONS_ACTIVE || 
                        state.phase === AnimationPhase.INTRO_SKIPPED;
      
      setIsVisible(shouldShow);
      
      // If intro was skipped, disable gauge animation for immediate display
      if (state.phase === AnimationPhase.INTRO_SKIPPED) {
        setShouldAnimate(false);
      } else {
        setShouldAnimate(animated);
      }
    });

    // Initialize with current state
    const currentState = $animationStore.get();
    const shouldShow = currentState.phase === AnimationPhase.ANIMATIONS_ACTIVE || 
                      currentState.phase === AnimationPhase.INTRO_SKIPPED;
    setIsVisible(shouldShow);
    
    if (currentState.phase === AnimationPhase.INTRO_SKIPPED) {
      setShouldAnimate(false);
    }

    return unsubscribe;
  }, [animated]);

  // Generate stable timestamp once
  const timestamp = useMemo(() => new Date().toISOString(), []);
  
  // Generate metadata based on component props and state
  const metadata: ForkMeterMetadata = useMemo(() => {
    // For values > 60%, we need prediction data
    if (value > 60) {
      return {
        value,
        animated: shouldAnimate,
        last_updated: timestamp,
        prediction: "ETH WILL BE ABOVE $4,000 BY JULY, 2026",
        round: "RD 2",
        remaining_time: "120 HRS",
        staked: "REP 4,000,000",
      };
    }
    
    // For low values, just basic metadata
    return {
      value,
      animated: shouldAnimate,
      last_updated: timestamp,
    };
  }, [value, shouldAnimate, timestamp]);

  // Don't render anything until animation state allows it
  if (!isVisible) {
    return null;
  }

  return <ForkMeterUI metadata={metadata} />;
};

export default ForkMeter;