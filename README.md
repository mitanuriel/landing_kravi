# Kravi Analytics Landing Page

A modern, responsive landing page for Kravi Analytics - showcasing advanced satellite technology solutions with cutting-edge design and functionality.

![Kravi Analytics](https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80)

## 📁 Folder Structure

```
/
├── index.html              # Main landing page
├── careers.html            # Careers page
├── contact.html            # Contact page
├── styles.css              # Main stylesheet
├── app.js                  # Main JavaScript file
├── send_email.php          # PHP email handler
├── package.json            # Node.js dependencies for testing
├── jest.setup.js           # Jest testing configuration
├── test-runner.html        # HTML test runner
├── README.md               # This file
├── COMPLIANCE_REPORT.md    # Accessibility compliance report
├── TEST_PLAN.md            # Testing documentation
├── USER_STORIES.md         # User stories and requirements
├── todo-002.md             # Development tasks
├── __tests__/              # Test files directory
│   ├── AboutSection.test.js
│   ├── ContactForm.test.js
│   ├── HeroSection.test.js
│   ├── Integration.test.js
│   ├── Navigation.test.js
│   ├── SocialProof.test.js
│   └── ValueProposition.test.js
├── icons/                  # SVG icons and logos
│   ├── Logo-Kravi-2.png
│   ├── ai-analytics.svg
│   ├── edge-computing.svg
│   ├── innovation-first.svg
│   ├── lightning-fast.svg
│   ├── ocean-monitoring.svg
│   ├── satellite-network.svg
│   ├── scalable-growth.svg
│   └── secure-reliable.svg
└── images/                 # Team photos and assets
    ├── Erik.jpg
    ├── Erik.png
    ├── Hassan.png
    ├── Jenna2.png
    ├── Maggie.png
    ├── Theo.png
    ├── Ulla.png
    ├── Zhankun2.png
    ├── ESA BIC.png
    ├── meina-yin-KUE9Tm7fal0-unsplash.jpg  # Photo by Meina Yin on Unsplash
    ├── patrick-perkins-76aKbIguu9U-unsplash.jpg  # Photo by Patrick Perkins on Unsplash
    └── sustainability.jpg      # Photo by Unma Desai on Unsplash
```

## 🛠️ Technology Stack

- HTML5: Semantic markup structure
- CSS: Custom properties, flexbox, grid, and modern styling
- JavaScript (ES6+): Interactive components and form validation
- PHP: Server-side email handling
- Jest: JavaScript testing framework


## 🚀 Getting Started

### Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads)
- VS Code - [Download VS Code](https://code.visualstudio.com/) (recommended)
- Live Server Extension - For local development server
- Node.js - For running tests (optional)

### 🔧 Local Development Setup

#### Option 1: Using VS Code (Recommended)

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/kravi-analytics-landing.git
   cd kravi-analytics-landing
   ```

2. **Open in VS Code**
   ```bash
   code .
   ```

3. **Install Live Server Extension**
   - Open VS Code Extensions panel (`Ctrl+Shift+X` / `Cmd+Shift+X`)
   - Search for "Live Server" by Ritwick Dey
   - Click "Install"

4. **Launch the Development Server**
   - Right-click on `index.html` in VS Code
   - Select "Open with Live Server"
   - Your browser will automatically open to `http://localhost:5500`

#### Option 2: Command Line Setup

1. **Clone and navigate**
   ```bash
   git clone https://github.com/your-username/kravi-analytics-landing.git
   cd kravi-analytics-landing
   ```

2. **Install dependencies (for testing)**
   ```bash
   npm install
   ```

3. **Start local server**
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```

## 🔄 How to Update the Site

### 1. Content Updates

#### Text Content
- **Hero Section**: Edit content in `index.html` around line 60-80
- **Technologies**: Update cards in the "Future Technologies" section
- **Team Members**: Modify team grid in the "About" section
- **Contact Info**: Update footer contact details

#### Images
- **Team Photos**: Replace files in `/images/` directory
- **Icons**: Update SVG files in `/icons/` directory
- **Hero Background**: Change Unsplash URL in hero section

#### Adding New Pages
1. Create new HTML file (e.g., `services.html`)
2. Copy structure from existing pages
3. Update navigation links in all pages
4. Add corresponding styles in `styles.css`

### 2. Styling Updates

#### Colors & Branding
- **CSS Variables**: Update custom properties at top of `styles.css`
- **Brand Colors**: Modify color scheme in `:root` section
- **Typography**: Change font families or sizes

#### Layout Changes
- **Responsive Breakpoints**: Adjust media queries in `styles.css`
- **Grid Layouts**: Modify CSS Grid or Flexbox properties
- **Spacing**: Update margin/padding using CSS custom properties

### 3. Functionality Updates

#### JavaScript Features
- **Interactive Elements**: Edit `app.js`
- **Form Validation**: Modify contact form handlers
- **Navigation**: Update mobile menu functionality

#### Email Integration
- **PHP Backend**: Configure `send_email.php` with your email settings
- **SMTP Setup**: Update email server configuration
- **Form Fields**: Add/remove form inputs as needed

### 4. Deployment

#### GitHub Pages
1. Push changes to main branch
2. Enable GitHub Pages in repository settings
3. Select source branch (main)
4. Site will be available at `https://username.github.io/repository-name`

#### Custom Domain
1. Add `CNAME` file with your domain
2. Configure DNS settings
3. Enable HTTPS in GitHub Pages settings

## 🧪 Testing

### Running Tests

#### Jest Unit Tests
```bash
# Install dependencies first
npm install

# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

#### HTML Test Runner
1. Open `test-runner.html` in browser
2. View test results in browser console
3. Tests cover:
   - Navigation functionality
   - Form validation
   - Responsive design
   - Contact form submission

### Test Coverage
- **Unit Tests**: Component functionality
- **Integration Tests**: Page interactions
- **Accessibility Tests**: WCAG compliance
- **Responsive Tests**: Mobile/desktop layouts

## 📱 Testing Responsiveness

### Browser Testing
1. **Chrome DevTools**
   - Right-click → "Inspect" → Toggle device toolbar
   - Test breakpoints: 320px, 768px, 1024px, 1440px

2. **Real Device Testing**
   - Use local network IP (e.g., `192.168.1.100:5500`)
   - Test on iOS and Android devices

### Cross-Browser Compatibility
- Chrome (Latest)
- Firefox (Latest)  
- Safari (Latest)
- Edge (Latest)

## 📋 Development Workflow

### 1. Making Changes
```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Make your changes
# ... edit files ...

# Test changes
npm test

# Commit changes
git add .
git commit -m "Add: your descriptive commit message"

# Push to repository
git push origin feature/your-feature-name
```

### 2. Code Quality
- Follow semantic HTML structure
- Use CSS BEM methodology for class naming
- Write descriptive commit messages
- Test on multiple browsers and devices
- Validate HTML and CSS

### 3. Performance Optimization
- Optimize images (compress, use appropriate formats)
- Minimize CSS and JavaScript for production
- Use CDN for external resources
- Enable browser caching

## 🔧 Configuration Files

- **`package.json`**: Node.js dependencies and test scripts
- **`jest.setup.js`**: Jest testing configuration
- **`.gitignore`**: Files to exclude from version control
- **`CNAME`**: Custom domain configuration (if using)

## 📖 Documentation

- **`COMPLIANCE_REPORT.md`**: Accessibility compliance details
- **`TEST_PLAN.md`**: Comprehensive testing strategy
- **`USER_STORIES.md`**: User requirements and acceptance criteria
- **`todo-002.md`**: Development tasks and improvements

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and ensure they pass
5. Submit a pull request with detailed description

## 📞 Support

For questions or support:
- **Email**: info@kravianalytics.com
- **LinkedIn**: [Kravi Analytics](https://www.linkedin.com/company/kravi-analytics)
- **Issues**: Create an issue in the GitHub repository

---

© 2025 Kravi Analytics. All rights reserved.

