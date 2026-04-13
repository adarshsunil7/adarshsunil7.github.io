# Adarsh Sunil - Portfolio Website

A modern, responsive personal portfolio website built with vanilla HTML, CSS, and JavaScript.

## Quick Start

### Option 1: Open Directly
Simply open `index.html` in any modern web browser.

```bash
# macOS
open index.html

# Linux
xdg-open index.html

# Windows
start index.html
```

### Option 2: Local Server (Recommended)

**Using Python:**
```bash
# Python 3
python -m http.server 8000

# Then visit http://localhost:8000
```

**Using Node.js:**
```bash
npx serve
# Then visit http://localhost:3000
```

**Using PHP:**
```bash
php -S localhost:8000
```

**Using VS Code:**
Install the "Live Server" extension and click "Go Live"

## Tech Stack

| Category | Technology |
|----------|------------|
| HTML | HTML5 |
| CSS | Vanilla CSS3 with CSS Variables |
| JavaScript | Vanilla JS (ES6+) |
| Framework | Bootstrap 5 |
| Icons | Boxicons, Bootstrap Icons |
| Animations | AOS, Typed.js |
| Fonts | Google Fonts (Open Sans, Raleway, Poppins) |

## Features

- Fully responsive design
- Smooth scroll navigation
- Animated typing effect
- Skills progress bar animations
- Section reveal on scroll
- Hero parallax effect
- Mobile-friendly navigation
- Contact form ready

## Project Structure

```
├── index.html              # Main HTML file
├── assets/
│   ├── css/
│   │   └── style.css      # Main stylesheet (refactored with CSS variables)
│   ├── js/
│   │   └── main.js        # JavaScript modules
│   └── vendor/            # Third-party libraries
└── README.md
```

## Contact Form Setup

The contact form uses **Formspree** for email delivery (no backend needed).

### Setup Steps:
1. Go to [formspree.io](https://formspree.io) and create a free account
2. Create a new form and copy your form endpoint
3. In `index.html`, replace `YOUR_FORM_ID` with your actual Formspree form ID:
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST" class="contact-form">
   ```
4. Messages will be delivered to your Formspree registered email

## Customization

### Updating Personal Information
Edit `index.html` to update:
- Name, bio, and contact info
- Skills and proficiency percentages
- Education and experience details
- Social media links

### Changing Colors
All colors are defined as CSS variables in `assets/css/style.css`:
```css
:root {
  --color-primary: #149ddd;
  --color-secondary: #0dcaf0;
  --color-accent: #6f42c1;
  /* ... */
}
```

### Changing the Hero Background
Replace `assets/img/adarsh.JPG` with your preferred image, or update the URL in `style.css`:
```css
#hero {
  background: url("../img/your-image.jpg") top center/cover no-repeat;
}
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Deployment

This is a static site perfect for GitHub Pages, Netlify, or Vercel.

### GitHub Pages
1. Push to `main` branch
2. Enable GitHub Pages in repository settings
3. Your site will be live at `https://username.github.io`

## License

Template based on [iPortfolio](https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/) by BootstrapMade.
