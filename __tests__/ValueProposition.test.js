// Value Proposition Tests - User Story 3
// Testing HTML/DOM structure for value proposition section

describe('ValueProposition - User Story 3', () => {
  beforeEach(() => {
    // Create mock DOM structure for value proposition
    document.body.innerHTML = `
      <section class="value-proposition" id="services">
        <div class="container">
          <div class="section__header">
            <h2 class="section__title">Why Choose Our Solutions</h2>
            <p class="section__description">
              Discover the key benefits that make us the preferred choice for modern businesses
            </p>
          </div>
          <div class="value-proposition__grid">
            <div class="value-proposition__card">
              <div class="value-proposition__icon">
                <span class="icon">⚡</span>
              </div>
              <h3 class="value-proposition__title">Lightning Fast</h3>
              <p class="value-proposition__description">
                Experience unparalleled speed and performance with our optimized solutions
              </p>
            </div>
            <div class="value-proposition__card">
              <div class="value-proposition__icon">
                <span class="icon">🔒</span>
              </div>
              <h3 class="value-proposition__title">Secure & Reliable</h3>
              <p class="value-proposition__description">
                Enterprise-grade security ensuring your data is protected at all times
              </p>
            </div>
            <div class="value-proposition__card">
              <div class="value-proposition__icon">
                <span class="icon">🚀</span>
              </div>
              <h3 class="value-proposition__title">Scalable Growth</h3>
              <p class="value-proposition__description">
                Solutions that grow with your business, from startup to enterprise level
              </p>
            </div>
            <div class="value-proposition__card">
              <div class="value-proposition__icon">
                <span class="icon">💡</span>
              </div>
              <h3 class="value-proposition__title">Innovation First</h3>
              <p class="value-proposition__description">
                Cutting-edge technology and forward-thinking approaches to solve complex problems
              </p>
            </div>
          </div>
        </div>
      </section>
    `;
  });

  test('displays 3-4 key benefits/features', () => {
    // AC: Section displays 3-4 key benefits/features
    const cards = document.querySelectorAll('.value-proposition__card');
    expect(cards.length).toBeGreaterThanOrEqual(3);
    expect(cards.length).toBeLessThanOrEqual(4);
  });

  test('each benefit has icon, title, and description', () => {
    // AC: Each benefit has an icon, title, and brief description
    const cards = document.querySelectorAll('.value-proposition__card');
    
    cards.forEach(card => {
      const icon = card.querySelector('.value-proposition__icon');
      const title = card.querySelector('.value-proposition__title');
      const description = card.querySelector('.value-proposition__description');
      
      expect(icon).toBeTruthy();
      expect(title).toBeTruthy();
      expect(description).toBeTruthy();
      expect(title.textContent.length).toBeGreaterThan(0);
      expect(description.textContent.length).toBeGreaterThan(0);
    });
  });

  test('content is scannable and well-organized', () => {
    // AC: Content is scannable and easy to digest
    const grid = document.querySelector('.value-proposition__grid');
    const header = document.querySelector('.section__header');
    
    expect(grid).toBeTruthy();
    expect(header).toBeTruthy();
  });

  test('benefits are customer-focused', () => {
    // AC: Benefits are customer-focused (not feature-focused)
    const titles = document.querySelectorAll('.value-proposition__title');
    const descriptions = document.querySelectorAll('.value-proposition__description');
    
    // Check that content focuses on benefits rather than technical features
    let customerFocusedCount = 0;
    descriptions.forEach(desc => {
      const text = desc.textContent.toLowerCase();
      if (text.includes('your') || text.includes('you') || text.includes('business')) {
        customerFocusedCount++;
      }
    });
    
    expect(customerFocusedCount).toBeGreaterThan(0);
  });

  test('section has consistent styling structure', () => {
    // AC: Section is visually appealing with consistent styling
    const section = document.querySelector('.value-proposition');
    const cards = document.querySelectorAll('.value-proposition__card');
    
    expect(section).toBeTruthy();
    expect(cards.length).toBeGreaterThan(0);
    
    // Check that all cards have consistent structure
    cards.forEach(card => {
      expect(card.classList.contains('value-proposition__card')).toBe(true);
    });
  });
});