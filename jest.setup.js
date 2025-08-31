// Jest setup file for DOM testing
// Add custom matchers and global setup

// Mock DOM APIs that might not be available in Jest environment
Object.defineProperty(window, 'getComputedStyle', {
  value: () => ({
    height: '48px',
    minHeight: '44px',
    fontSize: '16px'
  })
});

// Mock performance API for performance tests
Object.defineProperty(window, 'performance', {
  value: {
    now: () => Date.now()
  }
});

// Mock scrollTo for smooth scrolling tests
Object.defineProperty(window, 'scrollTo', {
  value: jest.fn()
});

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() { }
  observe() { }
  unobserve() { }
  disconnect() { }
};

// Mock matchMedia for responsive design tests
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

console.log('Jest setup complete - DOM testing environment ready');