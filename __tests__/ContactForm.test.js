import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import ContactForm from '../components/ContactForm';

describe('ContactForm Component - User Story 6', () => {
  test('contact form has essential fields', () => {
    render(<ContactForm />);

    // AC: Contact form with essential fields (name, email, message)
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
  });

  test('displays multiple contact options', () => {
    render(<ContactForm />);

    // AC: Multiple contact options (email, phone, social media)
    const emailContact = screen.getByText(/email|contact@/i);
    const phoneContact = screen.queryByText(/phone|\+\d+/);
    const socialLinks = screen.queryAllByTestId(/social-link/);

    expect(emailContact).toBeInTheDocument();
    expect(phoneContact || socialLinks.length > 0).toBeTruthy();
  });

  test('privacy policy link is present', () => {
    render(<ContactForm />);

    // AC: Clear privacy policy link near form
    const privacyLink = screen.getByRole('link', { name: /privacy policy/i });
    expect(privacyLink).toBeInTheDocument();
  });

  test('form validation with helpful error messages', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    // AC: Form validation with helpful error messages
    const submitButton = screen.getByRole('button', { name: /submit|send/i });

    // Try to submit empty form
    await user.click(submitButton);

    expect(screen.getByText(/name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/message is required/i)).toBeInTheDocument();
  });

  test('success message after form submission', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    // AC: Success message after form submission
    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const messageInput = screen.getByLabelText(/message/i);
    const submitButton = screen.getByRole('button', { name: /submit|send/i });

    await user.type(nameInput, 'John Doe');
    await user.type(emailInput, 'john@example.com');
    await user.type(messageInput, 'Test message');
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/thank you|success|sent/i)).toBeInTheDocument();
    });
  });

  test('response time expectations communicated', () => {
    render(<ContactForm />);

    // AC: Response time expectations communicated
    const responseTimeText = screen.queryByText(/24 hours|business day|response time/i);
    expect(responseTimeText).toBeInTheDocument();
  });
});