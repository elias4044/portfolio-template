
// index.js
// Main API for generating a portfolio site from data.

import fs from 'fs-extra';
import path from 'path';
import ejs from 'ejs';
import { fileURLToPath } from 'url';

// Fix __dirname for ESModules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Generates a portfolio website from the provided data.
 * @param {Object} data - Portfolio data (name, role, skills, projects, etc.)
 * @param {string} outputDir - Output directory for the generated site
 */
export async function createPortfolio(data = {}, outputDir = 'my-portfolio') {
  // Path to the template and output
  const templateDir = path.join(__dirname, 'template');
  const targetDir = path.resolve(outputDir);

  // Ensure output directory exists
  await fs.ensureDir(targetDir);

  // Load the HTML EJS template
  const htmlTemplatePath = path.join(templateDir, 'index.html');
  const htmlTemplate = await fs.readFile(htmlTemplatePath, 'utf8');

  // Default fallback data for all fields
  const defaults = {
    name: 'Your Name',
    role: 'Web Developer',
    description: 'Crafting digital experiences with passion and precision.',
    about: 'I’m a passionate developer who loves creating digital experiences.',
    skills: ['Frontend Development', 'Backend Development', 'UI/UX Design'],
    projects: [],
    contacts: [
      { method: 'GitHub', label: 'yourusername', link: 'https://github.com/yourusername' },
      { method: 'Email', label: 'you@example.com', link: 'mailto:you@example.com' }
    ],
    collaborateText: "I'm always excited to work on new projects and collaborate!",
    collaborateFeatures: ['Open Source Contributions', 'Freelance Projects', 'Team Collaborations'],
    stats: [
      { number: "10+", label: "Projects Completed" },
      { number: "2+", label: "Years Experience" },
      { number: "0.1$", label: "Money Earned Total" }
    ]
  };

  // Merge defaults, then user data, but ensure stats and enableContactForm are always present
  const mergedData = { ...defaults, ...data };
  if (!mergedData.stats) {
    mergedData.stats = defaults.stats;
  }
  // Always provide enableContactForm to the template (default: false)
  if (typeof mergedData.enableContactForm === 'undefined') {
    mergedData.enableContactForm = false;
  }

  // Render the HTML using EJS and the merged data
  const renderedHtml = ejs.render(htmlTemplate, mergedData);

  // Copy all static files (CSS, JS, images, etc.) except the EJS template
  await fs.copy(templateDir, targetDir, {
    filter: file => !file.endsWith('index.html') // avoid copying unrendered template
  });

  // Write the rendered HTML to the output directory
  await fs.writeFile(path.join(targetDir, 'index.html'), renderedHtml, 'utf8');

  // Success message
  console.log(`✅ Portfolio created successfully at ${targetDir}`);
}
