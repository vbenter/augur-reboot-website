import { atom } from 'nanostores';

// Simple UI state - what should the user see right now?
export enum UIState {
  BOOT_SEQUENCE = 'boot-sequence',  // Terminal intro visible
  MAIN_CONTENT = 'main-content'     // Hero banner visible
}

// Core state interface
export interface AppState {
  uiState: UIState;
}

// Initialize state based on URL parameters and current page
const getInitialState = (): AppState => {
  let initialUIState = UIState.BOOT_SEQUENCE;
  
  if (typeof window !== 'undefined') {
    const isHomepage = window.location.pathname === '/' || window.location.pathname === '';
    const hasSkipParam = new URLSearchParams(window.location.search).get('intro') === 'false';
    
    // Non-homepage pages should always show main content
    if (!isHomepage) {
      initialUIState = UIState.MAIN_CONTENT;
    }
    // Homepage with skip parameter
    else if (hasSkipParam) {
      initialUIState = UIState.MAIN_CONTENT;
    }
    // Fresh homepage visit - show intro
    else {
      initialUIState = UIState.BOOT_SEQUENCE;
    }
  }
  
  return {
    uiState: initialUIState,
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
      uiState: UIState.MAIN_CONTENT
    });
  },

  // Skip boot sequence and go straight to main content (adds URL parameter for manual skip)
  skipToMainContent(): void {
    const params = new URLSearchParams(window.location.search);
    params.set('intro', 'false');
    window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`);
    
    $appStore.set({
      uiState: UIState.MAIN_CONTENT
    });
  },

  // Handle navigation events - preserve current state
  handleNavigation(): void {
    // Re-evaluate state based on current URL after navigation
    this.initializeFromURL();
  }
};