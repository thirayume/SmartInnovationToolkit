import { screen, render, fireEvent, waitFor } from '../../../utils/test-utils';
import RegisterForm from '../RegisterForm';
import { authApi } from '../../../services/api';

jest.mock('../../../services/api');

describe('RegisterForm', () => {
  it('renders registration form', () => {
    render(<RegisterForm />);
    expect(screen.getByText(/register/i)).toBeInTheDocument();
  });

  it('shows validation errors for empty fields', async () => {
    render(<RegisterForm />);
    fireEvent.click(screen.getByText(/submit/i));
    
    await waitFor(() => {
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    });
  });

  it('successfully submits form with valid data', async () => {
    const mockRegister = authApi.register as jest.Mock;
    mockRegister.mockResolvedValueOnce({ data: { message: 'Success' } });

    render(<RegisterForm />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' }
    });
    // ... fill other fields

    fireEvent.click(screen.getByText(/submit/i));

    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalledWith(expect.objectContaining({
        email: 'test@example.com'
      }));
    });
  });
});