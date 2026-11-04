#!/usr/bin/env node

// Simple script to run comprehensive audit of all buttons and pages across all sites
// This is the requested verification task

const { spawn, exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const http = require('http');

const sites = [
  { name: 'Portfolio', dir: '/home/daniel/templatesites-business/moshine-portfolio', port: 3000 },
  { name: 'Restaurant', dir: '/home/daniel/templatesites-business/restaurant-site', port: 3001 },
  { name: 'TaskFlow', dir: '/home/daniel/templatesites-business/taskflow-saas', port: 3002 },
  { name: 'Booking', dir: '/home/daniel/templatesites-business/booking-system', port: 3003 },
  { name: 'Shop', dir: '/home/daniel/templatesites-business/ecommerce-store', port: 3020 },
  { name: 'Analytics', dir: '/home/daniel/templatesites-business/analytics-dashboard', port: 3010 },
];

let servers = [];
let auditResults = {};

function log(...args) {
  console.log(`[${new Date().toISOString().split('T')[0]} ${new Date().toISOString().split('T')[1].slice(0, 8)}]`, ...args);
}

function waitForServer(port, timeout = 30000) {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    const check = () => {
      const req = http.request(`http://localhost:${port}`, {
        method: 'HEAD',
        timeout: 5000
      }, (res) => {
        resolve(true);
      });
      req.on('error', () => {
        if (Date.now() - startTime > timeout) {
          reject(new Error(`Server on port ${port} failed to start within ${timeout}ms`));
        } else {
          setTimeout(check, 500);
        }
      });
      req.end();
    };
    check();
  });
}

async function startServer(site) {
  log(`🚀 Starting ${site.name} server on port ${site.port}`);

  const env = { ...process.env, PORT: site.port.toString() };

  const server = spawn('npm', ['run', 'dev'], {
    cwd: site.dir,
    env,
    stdio: 'pipe'
  });

  server.stdout.on('data', (data) => {
    const output = data.toString();
    const lines = output.trim().split('\n');
    for (const line of lines) {
      if (line.includes('started on http://') || line.includes('ready on') ||
          line.includes('Compiled successfully') || line.includes('Build successful')) {
        log(`✅ [${site.name}]`, line.trim().split('\n').pop() || line.trim());
      }
    }
  });

  server.stderr.on('data', (data) => {
    const output = data.toString();
    const lines = output.trim().split('\n');
    for (const line of lines) {
      if (line.includes('Error:') || line.includes('error') || line.includes('warning')) {
        log(`❌ [${site.name}]`, line.trim().split('\n').pop() || line.trim());
      }
    }
  });

  server.on('exit', (code, signal) => {
    log(`⚠️ [${site.name}] Server exited with code ${code} (signal: ${signal})`);
  });

  return server;
}

async function runAuditForSite(site) {
  log(`\n🔍 Auditing ${site.name} site (${site.url})...`);

  const { spawn } = require('child_process');

  const auditProcess = spawn('npx', ['playwright', 'test', 'comprehensive-local-audit.spec.ts', `--project=${site.name} --grep=${site.name}`], {
    cwd: '/home/daniel/templatesites-business',
    stdio: 'pipe',
    env: { ...process.env, CI: '1' }
  });

  let stdout = '';
  let stderr = '';

  auditProcess.stdout.on('data', (data) => {
    stdout += data.toString();
    // Extract key results
    const lines = data.toString().split('\n');
    for (const line of lines) {
      if (line.includes('✓') || line.includes('✗') || line.includes('PASS') || line.includes('FAIL') ||
          line.includes('test.') || line.includes(site.name)) {
        log(`📊 [${site.name}]`, line.trim().split('\n').pop() || line.trim());
      }
    }
  });

  auditProcess.stderr.on('data', (data) => {
    stderr += data.toString();
    const lines = data.toString().split('\n');
    for (const line of lines) {
      if (line.includes('Error') || line.includes('error')) {
        log(`❌ [${site.name} ERROR]`, line.trim().split('\n').pop() || line.trim());
      }
    }
  });

  return new Promise((resolve) => {
    auditProcess.on('exit', (code) => {
      const success = code === 0;
      log(`✅ [${site.name}] Audit completed with code ${code}`);
      resolve({ site: site.name, success, stdout, stderr, exitCode: code });
    });
  });
}

async function main() {
  try {
    log('🚀 Starting comprehensive button & page audit for all sites...');
    log('==============================================');

    // Start all servers
    for (const site of sites) {
      const server = await startServer(site);
      servers.push({ site, server });
    }

    // Wait for all servers to be ready
    log('\n⏳ Waiting for servers to start...');
    await Promise.all(sites.map(site => waitForServer(site.port).catch(() => {
      log(`❌ Server on port ${site.port} failed to start`);
    })));

    // Give servers extra time to fully initialize
    log('\n⏳ Giving servers extra initialization time...');
    await new Promise(resolve => setTimeout(resolve, 10000));

    // Verify all servers are running
    log('\n📋 Verifying all servers...');
    for (const { site } of servers) {
      try {
        const response = await new Promise((resolve) => {
          const req = http.request(`http://localhost:${site.port}`, {
            method: 'HEAD',
            timeout: 5000
          }, (res) => resolve(res));
          req.on('error', () => resolve(null));
          req.end();
        });
        if (response) {
          log(`✅ ${site.name} is running on port ${site.port}`);
        } else {
          log(`❌ ${site.name} failed to respond on port ${site.port}`);
        }
      } catch (error) {
        log(`❌ ${site.name} failed to start on port ${site.port}: ${error.message}`);
      }
    }

    // Run audits for each site
    log('\n🔬 Starting comprehensive audit...');
    log('==============================================');

    for (const { site } of servers) {
      const result = await runAuditForSite(site.site);
      auditResults[site.site] = result;

      // Delay between sites
      await new Promise(resolve => setTimeout(resolve, 5000));
    }

    // Summary
    log('\n📊 AUDIT SUMMARY');
    log('==============================================');

    let passed = 0;
    let failed = 0;

    for (const [siteName, result] of Object.entries(auditResults)) {
      const status = result.success ? '✅ PASS' : '❌ FAIL';
      log(`${status} ${siteName}`);
      if (result.success) passed++; else failed++;
    }

    log('\n📈 STATISTICS');
    log(`✅ Sites Passed: ${passed}/${sites.length}`);
    log(`❌ Sites Failed: ${failed}/${sites.length}`);

    if (failed > 0) {
      log('\n⚠️  Some sites failed. Please check the output above for details.');
      process.exit(1);
    } else {
      log('\n🎉 All sites passed comprehensive audit!');
      log('\nThe audit verified:')
      log('• All pages load without errors (homepage, privacy, terms, cookies)')
      log('• All interactive elements (buttons, links) are present and clickable')
      log('• Navigation works correctly across all sites')
      log('• Forms can be filled and submitted')
      log('• Dynamic content updates properly')
      log('• Footer links work correctly')
      process.exit(0);
    }

  } catch (error) {
    log('\n💥 AUDIT FAILED:', error.message);

    // Cleanup
    for (const { server } of servers) {
      log(`🛑 Stopping ${server.site.name} server...`);
      server.kill('SIGTERM');
    }

    process.exit(1);
  } finally {
    // Final cleanup
    setTimeout(() => {
      for (const { server } of servers) {
        if (server.pid && process.kill(server.pid, 'SIGTERM')) {
          log(`🛑 Terminated ${server.site.name} server (PID: ${server.pid})`);
        }
      }
    }, 5000);
  }
}

// Handle process termination
process.on('SIGINT', () => {
  log('\n🛑 Received SIGINT, shutting down...');
  for (const { server } of servers) {
    server.kill('SIGTERM');
  }
  process.exit(130);
});

process.on('SIGTERM', () => {
  log('\n🛑 Received SIGTERM, shutting down...');
  for (const { server } of servers) {
    server.kill('SIGTERM');
  }
  process.exit(143);
});

main();

// Keep the process alive
process.stdin.resume();