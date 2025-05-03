import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '../utils/test-utils';
import Register from '@/pages/Register';
import { userApi } from '@/lib/api';

// Mock the API and navigation
vi.mock('@/lib/api', () => ({
  userApi: {
    register: vi.fn(),
  },
}));

vi.mock('@/contexts/AuthContext', async () => {
  const actual = await vi.importActual('@/contexts/AuthContext');
  return {
    ...actual,
    useAuth: () => ({
      login: vi.fn().mockResolvedValue({}),
      isAuthenticated: false,
      user: null,
      logout: vi.fn(),
    }),
  };
});

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

describe('Register Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the registration form correctly', () => {
    render(<Register />);
    
    expect(screen.getByText('Create an Account')).toBeInTheDocument();
    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText('Password*')).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirm Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Bio/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Create Account/i })).toBeInTheDocument();
    expect(screen.getByText(/Already have an account/i)).toBeInTheDocument();
  });

  it('validates required fields', async () => {
    const user = userEvent.setup();
    render(<Register />);
    
    // Try to submit without filling in the fields
    await user.click(screen.getByRole('button', { name: /Create Account/i }));
    
    // Check for validation error messages
    await waitFor(() => {
      expect(screen.getByText(/Please fill in all required fields/i)).toBeInTheDocument();
    });
  });

  it('validates password confirmation', async () => {
    const user = userEvent.setup();
    render(<Register />);
    
    // Fill in form fields with non-matching passwords
    await user.type(screen.getByLabelText(/Full Name/i), 'Test User');
    await user.type(screen.getByLabelText(/Email/i), 'test@example.com');
    await user.type(screen.getByLabelText('Password*'), 'password123');
    await user.type(screen.getByLabelText(/Confirm Password/i), 'password456');
    
    // Submit the form
    await user.click(screen.getByRole('button', { name: /Create Account/i }));
    
    // Check for validation error message
    await waitFor(() => {
      expect(screen.getByText(/Passwords do not match/i)).toBeInTheDocument();
    });
  });

  it('handles registration success correctly', async () => {
    const user = userEvent.setup();
    const mockUser = { _id: '123', name: 'Test User', email: 'test@example.com' };
    
    // Mock successful registration
    vi.mocked(userApi.register).mockResolvedValueOnce(mockUser);
    
    render(<Register />);
    
    // Fill in form fields
    await user.type(screen.getByLabelText(/Full Name/i), 'Test User');
    await user.type(screen.getByLabelText(/Email/i), 'test@example.com');
    await user.type(screen.getByLabelText('Password*'), 'password123');
    await user.type(screen.getByLabelText(/Confirm Password/i), 'password123');
    await user.type(screen.getByLabelText(/Bio/i), 'Test bio');
    
    // Submit the form
    await user.click(screen.getByRole('button', { name: /Create Account/i }));
    
    // Check if API was called with correct params
    await waitFor(() => {
      expect(userApi.register).toHaveBeenCalledWith({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        bio: 'Test bio'
      });
    });
  });

  it('handles registration failure correctly', async () => {
    const user = userEvent.setup();
    
    // Mock failed registration
    vi.mocked(userApi.register).mockRejectedValueOnce(new Error('Email already exists'));
    
    render(<Register />);
    
    // Fill in form fields
    await user.type(screen.getByLabelText(/Full Name/i), 'Test User');
    await user.type(screen.getByLabelText(/Email/i), 'test@example.com');
    await user.type(screen.getByLabelText('Password*'), 'password123');
    await user.type(screen.getByLabelText(/Confirm Password/i), 'password123');
    
    // Submit the form
    await user.click(screen.getByRole('button', { name: /Create Account/i }));
    
    // Check for error message
    await waitFor(() => {
      expect(screen.getByText(/Email already exists/i)).toBeInTheDocument();
    });
  });

  it('shows loading state during submission', async () => {
    const user = userEvent.setup();
    
    // Mock delayed registration response
    vi.mocked(userApi.register).mockImplementationOnce(() => 
      new Promise(resolve => setTimeout(() => resolve({ _id: '123' }), 100))
    );
    
    render(<Register />);
    
    // Fill in form fields
    await user.type(screen.getByLabelText(/Full Name/i), 'Test User');
    await user.type(screen.getByLabelText(/Email/i), 'test@example.com');
    await user.type(screen.getByLabelText('Password*'), 'password123');
    await user.type(screen.getByLabelText(/Confirm Password/i), 'password123');
    
    // Submit the form
    await user.click(screen.getByRole('button', { name: /Create Account/i }));
    
    // Check for loading state
    expect(screen.getByText(/Creating Account/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Creating Account/i })).toBeDisabled();
  });
});
