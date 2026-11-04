// Silent server script to start all sites
// This script starts Next.js dev servers on their respective ports in the background
// and then runs the Playwright tests

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const sites = [
  { name: 'Portfolio', dir: '/home/daniel/templatesites-business/moshine-portfolio', port: 3000 },
  { name: 'Restaurant', dir: '/home/daniel/templatesites-business/restaurant-site', port: 3001 },
  { name: 'TaskFlow', dir: '/home/daniel/templatesites-business/taskflow-saas', port: 3002 },
  { name: 'Booking', dir: '/home/daniel/templatesites-business/booking-system', port: 3003 },
  { name: 'Shop', dir: '/home/daniel/templatesites-business/ecommerce-store', port: 3020 },
  { name: 'Analytics', dir: '/home/daniel/templatesites-business/analytics-dashboard', port: 3010 },
];

let servers = [];
let testProcess = null;

function log(...args) {
  console.log(`[${new Date().toISOString()}]`, ...args);
}

async function runTest() {
  // Wait for servers to be ready
  await new Promise(resolve => setTimeout(resolve, 5000));

  log('All servers started. Running Playwright tests...');

  // Run the test
  const { spawn } = require('child_process');

  const playwrightProcess = spawn('npx', ['playwright', 'test', 'comprehensive-audit.spec.ts'], {
    cwd: '/home/daniel/templatesites-business',
    stdio: 'pipe',
    env: { ...process.env, CI: '1' }
  });

  playwrightProcess.stdout.on('data', data => {
    process.stdout.write(data);
  });

  playwrightProcess.stderr.on('data', data => {
    process.stderr.write(data);
  });

  await new Promise((resolve) => {
    playwrightProcess.on('exit', (code) => {
      log(`Playwright tests finished with code ${code}`);
      resolve(code);
    });
  });

  return playwrightProcess.exitCode;
}

async function startServer(site) {
  log(`Starting ${site.name} server on port ${site.port}`);

  const server = spawn('npm', ['run', 'dev'], {
    cwd: site.dir,
    stdio: 'pipe',
    env: { ...process.env, PORT: site.port.toString() }
  });

  server.stdout.on('data', (data) => {
    const output = data.toString();
    // Only output important startup messages
    if (output.includes('started on http://') || output.includes('ready') ||
        output.includes('Compiled') || output.includes('built')) {
      log(`[${site.name}]`, output.trim().split('\n').pop() || output.trim());
    }
  });

  server.stderr.on('data', (data) => {
    const output = data.toString();
    // Only output errors, not normal output
    if (output.includes('Error:') || output.includes('error') || output.includes('warning')) {
      log(`[${site.name} ERROR]`, output.trim().split('\n').pop() || output.trim());
    }
  });

  return server;
}

async function main() {
  try {
    // Start all servers
    for (const site of sites) {
      const server = await startServer(site);
      servers.push({ site, server });
    }

    // Wait for all servers to be ready
    await new Promise(resolve => setTimeout(resolve, 8000));

    // Verify all servers are running
    log('\nVerifying servers...');
    for (const { site, server } of servers) {
      const response = await fetch(`http://localhost:${site.port}`, {
        method: 'HEAD',
        timeout: 5000
      }).catch(() => null);

      if (response && response.ok) {
        log(`✓ ${site.name} is running on port ${site.port}`);
      } else {
        log(`✗ ${site.name} failed to start on port ${site.port}`);
      }
    }

    // Run tests
    const exitCode = await runTest();

    // Cleanup
    log('\nStopping servers...');
    for (const { server } of servers) {
      server.kill('SIGTERM');
    }

    process.exit(exitCode);

  } catch (error) {
    log('Error:', error);

    // Cleanup
    for (const { server } of servers) {
      server.kill('SIGTERM');
    }

    process.exit(1);
  }
}

// Handle process termination
process.on('SIGINT', () => {
  log('\nReceived SIGINT, shutting down...');
  for (const { server } of servers) {
    server.kill('SIGTERM');
  }
  process.exit(130);
});

process.on('SIGTERM', () => {
  log('\nReceived SIGTERM, shutting down...');
  for (const { server } of servers) {
    server.kill('SIGTERM');
  }
  process.exit(143);
});

main();

// Keep the process alive
process.stdin.resume();