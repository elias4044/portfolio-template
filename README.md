# Portfolio Template Generator
A modern, customizable portfolio website generator. Instantly create a beautiful, interactive HTML/CSS/JS portfolio with your own projects and contact info—no coding required!

[Live Demo](https://elias4044.vercel.app/) · [NPM Package](https://www.npmjs.com/package/@elias4044/portfolio-template)
<br>
<br>
![Preview Of Website](https://elias4044.vercel.app/assets/preview.png)

## Features
- **Easy CLI:** Answer a few prompts and generate your portfolio in seconds
- **Customizable:** Add your name, role, skills, projects, and contacts
- **Modern Design:** Responsive, animated, and stylish (HTML, CSS, JS)
- **Contact Form:** Optional backend (Node.js/Express) with Discord webhook support
- **Deploy Anywhere:** Works on GitHub Pages, Vercel, Netlify, or any static host

## Quick Start

### 1. Install dependencies
```sh
npm install
```

### 2. Generate your portfolio
```sh
npx create-portfolio
```
_Or, if installed globally:_
```sh
npm install -g .
create-portfolio
```

You’ll be prompted for your name, role, skills, projects, and contact methods. Your site will be generated in the `my-portfolio` folder (or specify a custom output directory).

### 3. Preview your site
Open the generated `index.html` in your browser.

---

## Advanced Usage

### Use in JavaScript
You can use the generator programmatically:
```js
import { createPortfolio } from 'portfolio-template';

await createPortfolio({
  name: 'Jane Doe',
  role: 'Web Developer',
  skills: ['JS', 'CSS', 'React'],
  projects: [
    { name: 'Cool App', description: '...', tech: ['React'], website: '...', github: '...' }
  ],
  contacts: [
    { method: 'Email', label: 'jane@example.com', link: 'mailto:jane@example.com' }
  ]
}, 'output-folder');
```

### Enable Contact Form (Optional)
1. Copy `.env.example` to `.env` and set your Discord webhook URL:
   ```sh
   cp .env.example .env
   # Edit .env and set DISCORD_WEBHOOK_URL
   ```
2. Install dependencies:
  ```sh
  cd my-portfolio
  npm install
  ```

3. Start the backend:
   ```sh
   npm start
   ```
   OR

   ```sh
   vercel dev
   ```
3. The contact form will send messages to your Discord!

---

## Project Structure
```
cli.js                # CLI tool
index.js              # Main API
package.json          # Project config
README.md             # This file
template/             # HTML/CSS/JS template
  index.html          # EJS template
  styles.css          # Styles
  script.js           # JS
  api/                # Backend (optional)
    express-server.js # Express backend
    vercel-function-contact.js # Vercel serverless function
  favicon/            # Icons
```
## Environment Variables
Create a `.env` file in the root:
```
ENABLE_CONTACT_FORM=true
DISCORD_WEBHOOK_URL=your_discord_webhook_url_here
PORT=3000
```

## Contributing
Contributions are welcome! If you have a suggestion or want to fix a bug, please feel free to open an issue or submit a pull request.

Please read the [Contributing Guidelines](https://github.com/elias4044/portfolio-template/blob/main/.github/CONTRIBUTING.md) for details on the code of conduct and the process for submitting pull requests.

## License
MIT

---
Portfolio generator by Elias ([@elias4044](https://github.com/elias4044))
