# Personal Portfolio Website

A beautiful, responsive personal portfolio website that automatically showcases your GitHub projects using the GitHub API. Built with modern web technologies and featuring a clean, professional design.

## 🌟 Features

- **Responsive Design**: Looks great on all devices (desktop, tablet, mobile)
- **GitHub Integration**: Automatically fetches and displays your GitHub repositories
- **Modern UI/UX**: Clean design with smooth animations and transitions
- **Project Filtering**: Filter projects by programming language
- **About Me Section**: Customizable section to showcase your skills and background
- **Contact Form**: Interactive contact form for potential clients/employers
- **Performance Optimized**: Fast loading with optimized assets
- **SEO Friendly**: Semantic HTML structure for better search engine visibility

## 🚀 Quick Start

### 1. Customize Your Information

Edit the following files to personalize your website:

#### `index.html`
- Replace "Your Name" with your actual name (lines 7, 36, 174)
- Update the hero subtitle and description
- Modify the About Me section content
- Update contact links with your social media profiles
- Replace placeholder email and usernames

#### `script.js`
- **IMPORTANT**: Change `GITHUB_USERNAME` on line 2 to your actual GitHub username:
```javascript
const GITHUB_USERNAME = 'your-actual-github-username';
```

### 2. Run the Website

Simply open `index.html` in your web browser, or use a local server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (if you have live-server installed)
npx live-server

# Using PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

## 📝 Customization Guide

### Personal Information

1. **Profile Photo**: Replace the placeholder icon in the hero section by updating the `.image-placeholder` in `index.html`
2. **About Me**: Edit the content in the about section to reflect your background and experience
3. **Skills**: Update the skill tags in the skills section with your technologies
4. **Contact Information**: Update all social media links and contact information

### Styling

The website uses CSS custom properties (variables) that you can easily modify in `styles.css`:

- **Primary Colors**: Look for gradient definitions to change the color scheme
- **Fonts**: The website uses Inter font from Google Fonts
- **Spacing**: Modify padding and margin values for different layouts

### GitHub Integration

The website automatically:
- Fetches your public repositories
- Displays repository statistics (stars, forks, last updated)
- Shows the primary programming language
- Filters out forked repositories
- Sorts projects by stars and recent activity

### Adding Custom Projects

If you want to showcase specific projects or add projects not on GitHub, you can modify the `displayProjects()` function in `script.js` to include custom project data.

## 🛠️ Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with Flexbox and CSS Grid
- **JavaScript (ES6+)**: Interactive functionality and API integration
- **GitHub API**: For fetching repository data
- **Font Awesome**: For icons
- **Google Fonts**: For typography

## 📱 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔧 Advanced Customization

### Adding Analytics

To add Google Analytics, include the tracking code in the `<head>` section of `index.html`:

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Contact Form Backend

The contact form currently shows an alert. To make it functional, you can:

1. Use a service like Formspree, Netlify Forms, or EmailJS
2. Create your own backend API
3. Use serverless functions (Vercel, Netlify Functions)

Example with Formspree:
```html
<form action="https://formspree.io/f/your-form-id" method="POST">
```

### Custom Domain Deployment

You can deploy this website to:

- **GitHub Pages**: Push to a repository and enable GitHub Pages
- **Netlify**: Drag and drop the folder or connect your GitHub repository
- **Vercel**: Connect your GitHub repository for automatic deployments
- **Traditional Web Hosting**: Upload files via FTP

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Feel free to fork this project and submit pull requests for improvements!

## 📞 Support

If you need help customizing your portfolio or encounter any issues, feel free to open an issue or reach out!

---

**Happy coding! 🚀** 