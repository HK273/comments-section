import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';

/**
 * Jest Setup File
 *
 * This file handles global mocking and testing setup required for all tests.
 * It's run once before all test files are executed.
 *
 * Setup includes:
 * 1. Global imports (@testing-library/jest-dom)
 * 2. Mock cleanup and lifecycle management
 * 3. Next.js specific mocks
 * 4. Database mocks
 * 5. Browser API mocks (ResizeObserver, matchMedia)
 * 6. Theme provider mocks
 * 7. Global fetch mock
 */

// ============================================================================
// LIFECYCLE MANAGEMENT
// ============================================================================

// Automatically cleanup after each test
afterEach(() => {
  cleanup();
});

// Note: clearMocks is handled by jest.config.ts, no need for beforeEach here

// ============================================================================
// NEXT.JS MOCKS
// ============================================================================

const mockJson = jest.fn().mockImplementation((body, init) => ({
  status: init?.status || 200,
  json: async () => body,
}));

jest.mock('next/server', () => ({
  NextResponse: {
    json: mockJson,
  },
  NextRequest: jest.fn(),
}));

// ============================================================================
// DATABASE MOCKS
// ============================================================================

// Note: Add database mocks here when needed for specific tests
// jest.mock('@/db/db', () => ({
//   getDb: jest.fn(),
// }));

// ============================================================================
// AUTH MOCKS
// ============================================================================

jest.mock('@/lib/auth/auth-client', () => ({
  authClient: {
    signOut: jest.fn(),
  },
}));

// ============================================================================
// THEME PROVIDER MOCKS
// ============================================================================

// ============================================================================
// BROWSER API MOCKS
// ============================================================================

/**
 * Mock ResizeObserver API for Jest testing.
 * Prevents ReferenceError when testing components that use browser-only APIs.
 */
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

/**
 * Mock window.matchMedia for responsive design testing.
 * Allows simulation of different viewport conditions.
 */
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
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

// ============================================================================
// GLOBAL MOCKS
// ============================================================================

// Mock fetch globally for all tests
global.fetch = jest.fn(); // Make mockJson available globally for tests
(global as { mockJson?: jest.Mock }).mockJson = mockJson;
