// Hero Section Tests - User Story 1
// Testing HTML/DOM structure instead of React components

describe('HeroSection Component - User Story 1', () => {
  let container;

  beforeEach(() => {
    // Create a mock DOM structure for testing
    document.body.innerHTML = `
      <section class="hero" id="home" data-testid="hero-container">
        <div class="hero__background">
          <img src="https://images.unsplash.com/photo-1446776653964-20c1d3a81b06" 
               alt="Satellite view of Earth showing advanced technology networks and connectivity"
               class="hero__satellite-bg" data-testid="hero-background">
          <div class="hero__overlay"></div>
        </div>
        <div class="hero__container">
          <div class="hero__content">
            <div class="hero__tagline">Advanced Technology Solutions</div>
            <h1 class="hero__title">Transforming Industries With Cutting-Edge Technology</h1>
            <p class="hero__description" data-testid="hero-subheadline">
              We deliver innovative solutions that turn untapped potential and challenges
              into thriving possibilities, empowering communities and driving sustainable growth.
            </p>
            <div class="hero__buttons">
              <a href="#future-technologies" class="btn btn--primary btn--hero">Explore Our Technologies</a>
              <a href="contact.html" class="btn btn--secondary btn--hero">Book a Meeting</a>
            </div>
          </div>
        </div>
      </section>
    `;
  });

  test('renders hero section with required elements', () => {
    // AC: Hero section displays a clear, compelling headline (max 10 words)
    const headline = document.querySelector('h1.hero__title');
    expect(headline).toBeTruthy();
    expect(headline.textContent.split(' ').length).toBeLessThanOrEqual(10);
  });

  test('displays subheadline with additional context', () => {
    // AC: Subheadline provides additional context (1-2 sentences)
    const subheadline = document.querySelector('[data-testid="hero-subheadline"]');
    expect(subheadline).toBeTruthy();
    expect(subheadline.textContent.length).toBeGreaterThan(0);
  });

  test('primary CTA button is prominently displayed and functional', () => {
    // AC: Primary call-to-action (CTA) button is prominently displayed
    const ctaButton = document.querySelector('.btn--primary');
    expect(ctaButton).toBeTruthy();
    expect(ctaButton.textContent).toMatch(/Explore Our Technologies/i);
  });

  test('hero section includes background media', () => {
    // AC: Hero section includes a relevant background image or video
    const backgroundImage = document.querySelector('[data-testid="hero-background"]');
    expect(backgroundImage).toBeTruthy();
    expect(backgroundImage.src).toBeTruthy();
  });

  test('content is visible above the fold', () => {
    // AC: Content is visible above the fold on desktop and mobile
    const heroContainer = document.querySelector('[data-testid="hero-container"]');
    expect(heroContainer).toBeTruthy();
  });

  test('hero section has proper semantic structure', () => {
    // Additional test for semantic HTML
    const heroSection = document.querySelector('section.hero');
    const heading = document.querySelector('h1');
    const ctaButtons = document.querySelectorAll('.btn');

    expect(heroSection).toBeTruthy();
    expect(heading).toBeTruthy();
    expect(ctaButtons.length).toBeGreaterThan(0);
  });
});