import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import AboutSection from '../components/AboutSection';

describe('AboutSection Component - User Story 5', () => {
  test('displays brief company story or mission statement', () => {
    render(<AboutSection />);

    // AC: Brief company story or mission statement
    const missionText = screen.getByTestId('company-mission');
    expect(missionText).toBeInTheDocument();
    expect(missionText.textContent.length).toBeGreaterThan(50);
  });

  test('shows key team member photos and titles', () => {
    render(<AboutSection />);

    // AC: Key team member photos and titles
    const teamMembers = screen.getAllByTestId(/team-member/);
    expect(teamMembers.length).toBeGreaterThanOrEqual(2);

    teamMembers.forEach((member) => {
      expect(member.querySelector('img')).toBeInTheDocument();
      expect(member.querySelector('[data-testid*="name"]')).toBeInTheDocument();
      expect(member.querySelector('[data-testid*="title"]')).toBeInTheDocument();
    });
  });

  test('includes company founding date or experience highlights', () => {
    render(<AboutSection />);

    // AC: Company founding date or experience highlights
    const foundingInfo = screen.queryByText(/founded|since|years|experience/i);
    expect(foundingInfo).toBeInTheDocument();
  });

  test('conveys professionalism and expertise', () => {
    render(<AboutSection />);

    // AC: Section conveys professionalism and expertise
    const aboutContainer = screen.getByTestId('about-section');
    expect(aboutContainer).toHaveClass(/about|team|professional/);

    const professionalWords = /expert|professional|experience|leader|innovative|solution/i;
    const sectionText = aboutContainer.textContent;
    expect(sectionText).toMatch(professionalWords);
  });

  test('builds trust and credibility', () => {
    render(<AboutSection />);

    // AC: Content builds trust and credibility
    const credibilityIndicators = screen.queryAllByTestId(/award|certification|achievement/);
    const teamExperience = screen.queryAllByText(/years|expert|lead|senior/i);

    expect(credibilityIndicators.length > 0 || teamExperience.length > 0).toBeTruthy();
  });
});

describe('Footer Component - User Story 7', () => {
  test('displays company contact information', () => {
    render(<Footer />);

    // AC: Company contact information
    const email = screen.getByText(/contact@|info@|\w+@\w+\.\w+/);
    const address = screen.queryByTestId('company-address');
    const phone = screen.queryByText(/\+?\d+[-\s]?\d+/);

    expect(email).toBeInTheDocument();
    expect(address || phone).toBeTruthy();
  });

  test('includes links to privacy policy and terms of service', () => {
    render(<Footer />);

    // AC: Links to privacy policy and terms of service
    expect(screen.getByRole('link', { name: /privacy policy/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /terms of service|terms/i })).toBeInTheDocument();
  });

  test('has social media links', () => {
    render(<Footer />);

    // AC: Social media links
    const socialLinks = screen.getAllByTestId(/social-link/);
    expect(socialLinks.length).toBeGreaterThanOrEqual(2);
  });

  test('displays copyright notice', () => {
    render(<Footer />);

    // AC: Copyright notice
    const copyright = screen.getByText(/©|copyright/i);
    expect(copyright).toBeInTheDocument();
    expect(copyright.textContent).toMatch(/2025/);
  });
});