import { ProjectTemplate } from './types';

export const PROJECT_TEMPLATES: ProjectTemplate[] = [
  {
    id: 'blank-html',
    name: 'Blank HTML',
    description: 'Minimal single-file HTML starter.',
    files: [
      {
        filename: 'index.html',
        content: `<!DOCTYPE html>\n<html>\n<head>\n  <title>Zey Labs Deployment Instance</title>\n</head>\n<body>\n  <h1>Deployment engine operational!</h1>\n</body>\n</html>`,
      },
    ],
  },
  {
    id: 'html-css-js',
    name: 'HTML + CSS + JS',
    description: 'Multi-file starter with separated stylesheet and script.',
    files: [
      {
        filename: 'index.html',
        content: `<!DOCTYPE html>\n<html>\n<head>\n  <title>Zey Labs Project</title>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <h1>Hello from Zey Labs</h1>\n  <script src="script.js"></script>\n</body>\n</html>`,
      },
      { filename: 'style.css', content: `body {\n  background: #000;\n  color: #0f0;\n  font-family: monospace;\n}` },
      { filename: 'script.js', content: `console.log("Zey Labs runtime initialized.");` },
    ],
  },
  {
    id: 'landing-page',
    name: 'Landing Page',
    description: 'Single-file marketing landing page starter.',
    files: [
      {
        filename: 'index.html',
        content: `<!DOCTYPE html>\n<html>\n<head>\n  <title>Landing Page</title>\n</head>\n<body style="font-family: sans-serif; text-align: center; padding: 80px;">\n  <h1>Your Product</h1>\n  <p>Ship it with Zey Labs.</p>\n</body>\n</html>`,
      },
    ],
  },
];
