import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '../utils/test-utils';
import Navbar from '@/components/layout/Navbar';
import { useAuth } from '@/contexts/AuthContext';

// Mock auth context
vi.mock('@/contexts/AuthContext', () => ({
  useAuth: vi.fn(),
}));

// Mock router
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

describe('Navbar Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly when user is not authenticated', () => {
    // Mock auth context for unauthenticated user
    vi.mocked(useAuth).mockReturnValue({
      isAuthenticated: false,
      user: null,
      login: vi.fn(),
      logout: vi.fn(),
    });

    render(<Navbar />);
    
    // Verify navbar contains expected elements for unauthenticated state
    expect(screen.getByText(/TravelBuddy/i)).toBeInTheDocument();
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/Itineraries/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign In/i)).toBeInTheDocument();
    
    // "Profile" should not be present
    expect(screen.queryByText(/Profile/i)).not.toBeInTheDocument();
    // "Logout" should not be present
    expect(screen.queryByText(/Logout/i)).not.toBeInTheDocument();
  });

  it('renders correctly when user is authenticated', () => {
    // Mock auth context for authenticated user
    vi.mocked(useAuth).mockReturnValue({
      isAuthenticated: true,
      user: { _id: '123', name: 'Test User', email: 'test@example.com' },
      login: vi.fn(),
      logout: vi.fn(),
    });

    render(<Navbar />);
    
    // Verify navbar contains expected elements for authenticated state
    expect(screen.getByText(/TravelBuddy/i)).toBeInTheDocument();
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/Itineraries/i)).toBeInTheDocument();
    expect(screen.getByText(/Profile/i)).toBeInTheDocument();
    expect(screen.getByText(/Create Itinerary/i)).toBeInTheDocument();
    
    // "Sign In" should not be present
    expect(screen.queryByText(/Sign In/i)).not.toBeInTheDocument();
  });

  it('calls logout when logout option is clicked', async () => {
    const mockLogout = vi.fn();
    
    // Mock auth context for authenticated user with logout mock
    vi.mocked(useAuth).mockReturnValue({
      isAuthenticated: true,
      user: { _id: '123', name: 'Test User', email: 'test@example.com' },
      login: vi.fn(),
      logout: mockLogout,
    });

    const user = userEvent.setup();
    render(<Navbar />);
    
    // Open user menu
    const userMenu = screen.getByRole('button', { name: /user menu/i });
    await user.click(userMenu);
    
    // Click logout option
    const logoutButton = screen.getByText(/Logout/i);
    await user.click(logoutButton);
    
    // Verify logout was called
    expect(mockLogout).toHaveBeenCalled();
  });

  it('navigates to login page when sign in button is clicked', async () => {
    // Mock auth context for unauthenticated user
    vi.mocked(useAuth).mockReturnValue({
      isAuthenticated: false,
      user: null,
      login: vi.fn(),
      logout: vi.fn(),
    });

    const mockNavigate = vi.fn();
    vi.mock('react-router-dom', async () => {
      const actual = await vi.importActual('react-router-dom');
      return {
        ...actual,
        useNavigate: () => mockNavigate,
      };
    });

    const user = userEvent.setup();
    render(<Navbar />);
    
    // Click sign in button
    const signInButton = screen.getByText(/Sign In/i);
    await user.click(signInButton);
    
    // Verify navigation to login page
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });
});
