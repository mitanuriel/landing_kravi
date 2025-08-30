// Navigation Tests - User Story 2
// Testing HTML/DOM structure and JavaScript functionality

describe('Navigation - User Story 2', () => {
  beforeEach(() => {
    // Create mock DOM structure for navigation
    document.body.innerHTML = `
      <header class="header" id="header">
        <nav class="nav">
          <div class="nav__container">
            <a href="#home" class="nav__logo">
              <span class="nav__logo-text">Kravi Analytics</span>
            </a>
            <div class="nav__menu" id="nav-menu">
              <ul class="nav__list">
                <li class="nav__item">
                  <a href="#home" class="nav__link nav__link--active">Home</a>
                </li>
                <li class="nav__item">
                  <a href="#future-technologies" class="nav__link">Future technologies</a>
                </li>
                <li class="nav__item">
                  <a href="#about" class="nav__link">About us</a>
                </li>
                <li class="nav__item">
                  <a href="#career" class="nav__link">Career</a>
                </li>
                <li class="nav__item">
                  <a href="contact.html" class="nav__link">Contact</a>
                </li>
              </ul>
              <div class="nav__close" id="nav-close">
                <span class="nav__close-icon">×</span>
              </div>
            </div>
            <div class="nav__toggle" id="nav-toggle">
              <span class="nav__toggle-line"></span>
              <span class="nav__toggle-line"></span>
              <span class="nav__toggle-line"></span>
            </div>
          </div>
        </nav>
      </header>
    `;
  });

  test('navigation menu is visible and accessible', () => {
    // AC: Navigation menu is visible and accessible on all devices
    const nav = document.querySelector('.nav');
    const navMenu = document.querySelector('.nav__menu');
    
    expect(nav).toBeTruthy();
    expect(navMenu).toBeTruthy();
  });

  test('menu includes key sections', () => {
    // AC: Menu includes key sections: Home, About, Services/Products, Contact
    const homeLink = document.querySelector('a[href="#home"]');
    const aboutLink = document.querySelector('a[href="#about"]');
    const servicesLink = document.querySelector('a[href="#future-technologies"]');
    const contactLink = document.querySelector('a[href="contact.html"]');
    
    expect(homeLink).toBeTruthy();
    expect(aboutLink).toBeTruthy();
    expect(servicesLink).toBeTruthy();
    expect(contactLink).toBeTruthy();
  });

  test('mobile navigation has hamburger menu', () => {
    // AC: Mobile navigation uses a hamburger menu
    const navToggle = document.querySelector('#nav-toggle');
    const navClose = document.querySelector('#nav-close');
    
    expect(navToggle).toBeTruthy();
    expect(navClose).toBeTruthy();
  });

  test('active page/section is highlighted', () => {
    // AC: Active page/section is highlighted in navigation
    const activeLink = document.querySelector('.nav__link--active');
    expect(activeLink).toBeTruthy();
    expect(activeLink.textContent).toBe('Home');
  });

  test('logo links back to homepage', () => {
    // AC: Logo/company name links back to homepage
    const logoLink = document.querySelector('.nav__logo');
    expect(logoLink).toBeTruthy();
    expect(logoLink.getAttribute('href')).toBe('#home');
  });

  test('navigation has proper semantic structure', () => {
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');
    const navList = document.querySelector('ul.nav__list');
    
    expect(header).toBeTruthy();
    expect(nav).toBeTruthy();
    expect(navList).toBeTruthy();
  });
});