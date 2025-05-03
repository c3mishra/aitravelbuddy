import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { userApi } from '@/lib/api';

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Mock API
vi.mock('@/lib/api', () => ({
  userApi: {
    login: vi.fn(),
  },
}));

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <AuthProvider>{children}</AuthProvider>
);

describe('AuthContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
  });

  it('provides initial state correctly', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    
    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user).toBe(null);
    expect(typeof result.current.login).toBe('function');
    expect(typeof result.current.logout).toBe('function');
  });

  it('loads user from localStorage on init if available', () => {
    const mockUser = { _id: '123', name: 'Test User' };
    localStorageMock.getItem.mockReturnValue(JSON.stringify(mockUser));
    
    const { result } = renderHook(() => useAuth(), { wrapper });
    
    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.user).toEqual(mockUser);
  });

  it('handles login success correctly', async () => {
    const mockUser = { _id: '123', name: 'Test User', email: 'test@example.com' };
    vi.mocked(userApi.login).mockResolvedValueOnce(mockUser);
    
    const { result } = renderHook(() => useAuth(), { wrapper });
    
    await act(async () => {
      await result.current.login('test@example.com', 'password123');
    });
    
    expect(userApi.login).toHaveBeenCalledWith('test@example.com', 'password123');
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'user',
      JSON.stringify(mockUser)
    );
    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.user).toEqual(mockUser);
  });

  it('handles login failure correctly', async () => {
    const error = new Error('Invalid credentials');
    vi.mocked(userApi.login).mockRejectedValueOnce(error);
    
    const { result } = renderHook(() => useAuth(), { wrapper });
    
    let caughtError;
    await act(async () => {
      try {
        await result.current.login('test@example.com', 'wrongpassword');
      } catch (err) {
        caughtError = err;
      }
    });
    
    expect(caughtError).toEqual(error);
    expect(userApi.login).toHaveBeenCalledWith('test@example.com', 'wrongpassword');
    expect(localStorageMock.setItem).not.toHaveBeenCalled();
    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user).toBe(null);
  });

  it('handles logout correctly', async () => {
    // Setup authenticated state first
    const mockUser = { _id: '123', name: 'Test User' };
    localStorageMock.getItem.mockReturnValue(JSON.stringify(mockUser));
    
    const { result } = renderHook(() => useAuth(), { wrapper });
    expect(result.current.isAuthenticated).toBe(true); // Initially authenticated
    
    // Logout
    act(() => {
      result.current.logout();
    });
    
    expect(localStorageMock.removeItem).toHaveBeenCalledWith('user');
    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user).toBe(null);
  });
});
