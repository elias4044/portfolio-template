#!/usr/bin/env node

// cli.js
// Interactive CLI for generating a portfolio site.
// Prompts the user for all customizable fields and generates the site.

import { createPortfolio } from './index.js';
import prompts from 'prompts';

async function main() {
  // Prompt for main info
  const response = await prompts([
    { type: 'text', name: 'name', message: 'Your name:' },
    { type: 'text', name: 'role', message: 'Your role:' },
    { type: 'text', name: 'description', message: 'Short description:' },
    { type: 'text', name: 'about', message: 'About you:' },
    { type: 'list', name: 'skills', message: 'Skills (comma separated):', separator: ',' },
    { type: 'toggle', name: 'enableContactForm', message: 'Enable contact form backend (Discord integration)?', initial: false, active: 'yes', inactive: 'no' },
    { type: 'text', name: 'collaborateText', message: 'Collaboration section text:', initial: "I'm always excited to work on new projects and collaborate!" },
    { type: 'list', name: 'collaborateFeatures', message: 'Collaboration features (comma separated):', separator: ',', initial: 'Open Source Contributions,Freelance Projects,Team Collaborations' },
    { type: 'number', name: 'numStats', message: 'How many stats to show? (e.g. Projects Completed, Years Experience, Money Earned)', initial: 3 },
  ]);

  // Prompt for stats
  const stats = [];
  for (let i = 0; i < (response.numStats || 0); i++) {
    const stat = await prompts([
      { type: 'text', name: 'number', message: `Stat #${i+1} value (e.g. 10+):` },
      { type: 'text', name: 'label', message: `Stat #${i+1} label (e.g. Projects Completed):` },
    ]);
    stats.push(stat);
  }

  // Prompt for projects
  const projects = [];
  const numProjectsPrompt = await prompts({ type: 'number', name: 'numProjects', message: 'How many projects to add?', initial: 1 });
  for (let i = 0; i < (numProjectsPrompt.numProjects || 0); i++) {
    const proj = await prompts([
      { type: 'text', name: 'name', message: `Project #${i+1} name:` },
      { type: 'text', name: 'description', message: `Project #${i+1} description:` },
      { type: 'list', name: 'tech', message: `Project #${i+1} tech (comma separated):`, separator: ',' },
      { type: 'text', name: 'website', message: `Project #${i+1} website (optional):` },
      { type: 'text', name: 'github', message: `Project #${i+1} GitHub (optional):` },
    ]);
    projects.push(proj);
  }

  // Prompt for contacts
  const contacts = [];
  const addContacts = await prompts({ type: 'number', name: 'numContacts', message: 'How many contact methods?', initial: 2 });
  for (let i = 0; i < (addContacts.numContacts || 0); i++) {
    const c = await prompts([
      { type: 'text', name: 'method', message: `Contact #${i+1} method (e.g. Email, GitHub):` },
      { type: 'text', name: 'label', message: `Contact #${i+1} label (e.g. your@email.com):` },
      { type: 'text', name: 'link', message: `Contact #${i+1} link (e.g. mailto:you@x.com):` },
    ]);
    contacts.push(c);
  }

  // Generate the portfolio
  await createPortfolio({
    ...response,
    stats,
    projects,
    contacts
  });
  console.log('✅ Done! Open the generated folder to view your portfolio. If backend is enabled, copy the .env.example to .env and fill in your Discord webhook URL.');
}

main();