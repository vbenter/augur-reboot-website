import { atom } from 'nanostores';

// Simple UI state - what should the user see right now?
export enum UIState {
  BOOT_SEQUENCE = 'boot-sequence',  // Terminal intro visible
  MAIN_CONTENT = 'main-content'     // Hero banner visible
}

// Core state interface
export interface AppState {
  uiState: UIState;
  gridFrameCount: number;
  gridAnimationFrameId: number | null;
}

// Initialize state based on URL parameters
const getInitialState = (): AppState => {
  let initialUIState = UIState.BOOT_SEQUENCE;
  
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    if (params.get('intro') === 'false') {
      initialUIState = UIState.MAIN_CONTENT;
    }
  }
  
  return {
    uiState: initialUIState,
    gridFrameCount: 0,
    gridAnimationFrameId: null,
  };
};

// Non-persistent store - always fresh based on URL
export const $appStore = atom<AppState>(getInitialState());

// Helper to get current state snapshot
export const getAppState = (): AppState => $appStore.get();

// Helper to check if intro should be skipped based on URL
export const shouldSkipFromURL = (): boolean => {
  if (typeof window === 'undefined') return false;
  const params = new URLSearchParams(window.location.search);
  return params.get('intro') === 'false';
};

// Action functions for state management
export const appActions = {
  // Reinitialize state based on current URL (for navigation)
  initializeFromURL(): void {
    const newState = getInitialState();
    $appStore.set(newState);
  },

  // Transition from boot sequence to main content
  completeBootSequence(): void {
    $appStore.set({
      ...$appStore.get(),
      uiState: UIState.MAIN_CONTENT
    });
  },

  // Skip boot sequence and go straight to main content
  skipToMainContent(): void {
    const params = new URLSearchParams(window.location.search);
    params.set('intro', 'false');
    window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`);
    
    $appStore.set({
      ...$appStore.get(),
      uiState: UIState.MAIN_CONTENT
    });
  },

  // Update grid animation frame data
  updateGridFrame(frameCount: number, animationFrameId: number | null): void {
    $appStore.set({
      ...$appStore.get(),
      gridFrameCount: frameCount,
      gridAnimationFrameId: animationFrameId
    });
  },

  // Handle navigation events - preserve current state
  handleNavigation(): void {
    // Re-evaluate state based on current URL after navigation
    this.initializeFromURL();
  }
};