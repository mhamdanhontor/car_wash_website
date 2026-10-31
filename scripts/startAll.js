import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('🚀 Starting Hanzala Car Wash Full-Stack (Node.js Backend + Vite Frontend)...');

// 1. Start Node.js Backend Server
const serverProc = spawn('node', ['server/server.js'], {
  cwd: rootDir,
  stdio: 'inherit',
  shell: true
});

// 2. Start Vite Dev Server
const viteProc = spawn('npm', ['run', 'dev'], {
  cwd: rootDir,
  stdio: 'inherit',
  shell: true
});

process.on('SIGINT', () => {
  serverProc.kill();
  viteProc.kill();
  process.exit();
});
