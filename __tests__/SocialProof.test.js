import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import SocialProof from '../components/SocialProof';

describe('SocialProof Component - User Story 4', () => {
  test('displays customer testimonials', () => {
    render(<SocialProof />);

    // AC: Displays customer testimonials or reviews (3-5)
    const testimonials = screen.getAllByTestId(/testimonial/);
    expect(testimonials.length).toBeGreaterThanOrEqual(3);
    expect(testimonials.length).toBeLessThanOrEqual(5);
  });

  test('shows client logos or trusted by section', () => {
    render(<SocialProof />);

    // AC: Shows client logos or "trusted by" section
    const clientLogos = screen.queryAllByTestId(/client-logo/);
    const trustedBySection = screen.queryByTestId('trusted-by-section');

    expect(clientLogos.length > 0 || trustedBySection).toBeTruthy();
  });

  test('includes specific metrics or achievements', () => {
    render(<SocialProof />);

    // AC: Includes specific metrics or achievements if available
    const metrics = screen.queryAllByTestId(/metric|achievement/);
    if (metrics.length > 0) {
      metrics.forEach((metric) => {
        expect(metric.textContent).toMatch(/\d+/); // Contains numbers
      });
    }
  });

  test('testimonials include customer names and companies', () => {
    render(<SocialProof />);

    // AC: Testimonials include customer names and companies (when possible)
    const testimonials = screen.getAllByTestId(/testimonial/);

    testimonials.forEach((testimonial) => {
      const customerName = testimonial.querySelector('[data-testid*="customer-name"]');
      const customerCompany = testimonial.querySelector('[data-testid*="customer-company"]');

      expect(customerName || customerCompany).toBeInTheDocument();
    });
  });

  test('content appears authentic and credible', () => {
    render(<SocialProof />);

    // AC: Content is authentic and credible
    const testimonials = screen.getAllByTestId(/testimonial/);

    testimonials.forEach((testimonial) => {
      const testimonialText = testimonial.querySelector('p, blockquote');
      expect(testimonialText.textContent.length).toBeGreaterThan(20);
      expect(testimonialText.textContent.length).toBeLessThan(300);
    });
  });
});