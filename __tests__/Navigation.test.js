import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Navigation from '../components/Navigation';

describe('Navigation Component - User Story 2', () => {
  test('navigation menu is visible and accessible', () => {
    render(<Navigation />);

    // AC: Navigation menu is visible and accessible on all devices
    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
    expect(nav).toBeVisible();
  });

  test('includes all required menu sections', () => {
    render(<Navigation />);

    // AC: Menu includes key sections: Home, About, Services/Products, Contact
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /services|products/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /contact/i })).toBeInTheDocument();
  });

  test('mobile hamburger menu functionality', async () => {
    const user = userEvent.setup();

    // Mock mobile viewport
    Object.defineProperty(window, 'innerWidth', { value: 768 });
    render(<Navigation />);

    // AC: Mobile navigation uses a hamburger menu that opens/closes smoothly
    const hamburgerButton = screen.getByRole('button', { name: /menu|toggle/i });
    expect(hamburgerButton).toBeInTheDocument();

    // Test opening menu
    await user.click(hamburgerButton);
    const mobileMenu = screen.getByTestId('mobile-menu');
    expect(mobileMenu).toHaveClass('open');

    // Test closing menu
    await user.click(hamburgerButton);
    expect(mobileMenu).not.toHaveClass('open');
  });

  test('active page section is highlighted', () => {
    render(<Navigation currentPage="about" />);

    // AC: Active page/section is highlighted in navigation
    const aboutLink = screen.getByRole('link', { name: /about/i });
    expect(aboutLink).toHaveClass('active');
  });

  test('logo links back to homepage', async () => {
    const user = userEvent.setup();
    const mockNavigate = jest.fn();

    render(<Navigation onNavigate={mockNavigate} />);

    // AC: Logo/company name links back to homepage
    const logo = screen.getByRole('link', { name: /logo|home/i });
    expect(logo).toBeInTheDocument();

    await user.click(logo);
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  test('navigation is sticky on scroll', () => {
    render(<Navigation />);

    // AC: Navigation is sticky/fixed on scroll
    const nav = screen.getByRole('navigation');
    const styles = window.getComputedStyle(nav);
    expect(styles.position).toBe('fixed' || 'sticky');
  });
});