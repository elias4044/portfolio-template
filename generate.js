
// generate.js
// Example usage of the portfolio generator for Node.js projects.
// Run this script to generate a portfolio with the data below.

import { createPortfolio } from './index.js';

// Call the generator with your custom data
createPortfolio({
  name: 'Elias 2.0', // Your name
  role: 'Roblox Developer', // Your role or title
  description: 'Turning ideas into reality through code.', // Short description
  about: 'Building cool stuff with style and efficiency!', // About you
  skills: ['Lua', 'Java', 'C++', 'Firebase', 'Game Dev'], // List your skills
  projects: [
    {
      name: 'The ...',
      description: 'My first ever game — simple but addictive.',
      tech: ['JS', 'HTML5'],
      website: 'https://the-button.vercel.app',
      github: ''
    },
    {
      name: 'Schoolsoft-',
      description: 'A worse version of Schoolsoft with improved UI.',
      tech: ['Node.jssss', 'Node.js'],
      website: 'https://schoolsoftplus.vercel.app',
      github: 'https://github.com/repulsord/Schoolsoft-plus'
    }
  ],
  contacts: [
    { method: 'Email', label: 'elis321yt@gmail.com', link: 'mailto:elis321yt@gmail.com' },
    { method: 'GitHub', label: 'repulsord', link: 'https://github.com/repulsord' },
    { method: 'Discord', label: '@repulsord', link: 'https://discord.com/users/yourid' },
    { method: 'Signal', label: '@elias40.44', link: 'https://signal.me/#eu/EnaIZ...' }
  ]
});
