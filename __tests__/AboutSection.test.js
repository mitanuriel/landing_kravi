// About Section Tests - User Story 5
// Testing HTML/DOM structure for about/team section

describe('AboutSection - User Story 5', () => {
  beforeEach(() => {
    // Create mock DOM structure for about section
    document.body.innerHTML = `
      <section class="about" id="about" data-testid="about-section">
        <div class="container">
          <div class="about__content">
            <div class="about__text">
              <h2 class="section__title">About Our Company</h2>
              <p class="about__description">
                Founded with a vision to revolutionize technology solutions, our team brings together
                decades of experience in software development, artificial intelligence, and business innovation.
              </p>
              <p class="about__description">
                We believe in the power of technology to transform businesses and create meaningful
                impact in the world. Our mission is to make advanced technology accessible and
                practical for businesses of all sizes.
              </p>
            </div>
            <div class="about__team">
              <h3 class="about__team-title">Meet Our Team</h3>
              <div class="team__grid">
                <div class="team__member">
                  <div class="team__member-image">
                    <span class="team__member-placeholder">JD</span>
                  </div>
                  <h4 class="team__member-name">John Doe</h4>
                  <span class="team__member-role">CEO & Founder</span>
                </div>
                <div class="team__member">
                  <div class="team__member-image">
                    <span class="team__member-placeholder">JS</span>
                  </div>
                  <h4 class="team__member-name">Jane Smith</h4>
                  <span class="team__member-role">CTO</span>
                </div>
                <div class="team__member">
                  <div class="team__member-image">
                    <span class="team__member-placeholder">MB</span>
                  </div>
                  <h4 class="team__member-name">Mike Brown</h4>
                  <span class="team__member-role">Lead Developer</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  });

  test('displays company story or mission statement', () => {
    // AC: Brief company story or mission statement
    const aboutText = document.querySelector('.about__text');
    const descriptions = document.querySelectorAll('.about__description');
    
    expect(aboutText).toBeTruthy();
    expect(descriptions.length).toBeGreaterThan(0);
    
    // Check for mission-related content
    const textContent = aboutText.textContent.toLowerCase();
    expect(textContent).toMatch(/mission|vision|believe|founded/);
  });

  test('shows key team member photos and titles', () => {
    // AC: Key team member photos and titles
    const teamMembers = document.querySelectorAll('.team__member');
    
    expect(teamMembers.length).toBeGreaterThan(0);
    
    teamMembers.forEach(member => {
      const image = member.querySelector('.team__member-image, .team__member-placeholder');
      const name = member.querySelector('.team__member-name');
      const role = member.querySelector('.team__member-role');
      
      expect(image).toBeTruthy();
      expect(name).toBeTruthy();
      expect(role).toBeTruthy();
    });
  });

  test('conveys professionalism and expertise', () => {
    // AC: Section conveys professionalism and expertise
    const aboutSection = document.querySelector('.about');
    const teamTitle = document.querySelector('.about__team-title');
    const sectionTitle = document.querySelector('.section__title');
    
    expect(aboutSection).toBeTruthy();
    expect(teamTitle).toBeTruthy();
    expect(sectionTitle).toBeTruthy();
    
    // Check for professional language
    const content = aboutSection.textContent.toLowerCase();
    expect(content).toMatch(/experience|expertise|professional|team|innovation/);
  });

  test('builds trust and credibility', () => {
    // AC: Content builds trust and credibility
    const descriptions = document.querySelectorAll('.about__description');
    let credibilityIndicators = 0;
    
    descriptions.forEach(desc => {
      const text = desc.textContent.toLowerCase();
      if (text.includes('experience') || text.includes('decades') || text.includes('founded')) {
        credibilityIndicators++;
      }
    });
    
    expect(credibilityIndicators).toBeGreaterThan(0);
  });

  test('has proper semantic structure', () => {
    const aboutSection = document.querySelector('section.about');
    const headings = document.querySelectorAll('h2, h3, h4');
    const teamGrid = document.querySelector('.team__grid');
    
    expect(aboutSection).toBeTruthy();
    expect(headings.length).toBeGreaterThan(0);
    expect(teamGrid).toBeTruthy();
  });
});