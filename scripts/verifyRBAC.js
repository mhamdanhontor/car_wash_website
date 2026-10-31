import puppeteer from 'puppeteer-core';
import fs from 'fs';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function verify() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  console.log('Navigating to app...');
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle2' });

  // 1. Enter Admin Portal
  await page.evaluate(() => {
    const adminBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Admin & Ops'));
    if (adminBtn) adminBtn.click();
  });
  await new Promise(r => setTimeout(r, 600));

  // Check initial admin view
  await page.screenshot({ path: 'verification_screenshots/admin_overview.png' });
  console.log('Captured admin_overview.png');

  // 2. Switch role to Washer / Detailer
  await page.select('select.role-select', 'operator');
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: 'verification_screenshots/role_washer.png' });
  console.log('Captured role_washer.png');

  // 3. Try to click restricted Reports tab while in washer role
  await page.evaluate(() => {
    const reportsLink = Array.from(document.querySelectorAll('.sidebar-nav a')).find(a => a.textContent.includes('Reports & Analytics'));
    if (reportsLink) reportsLink.click();
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: 'verification_screenshots/role_washer_restricted.png' });
  console.log('Captured role_washer_restricted.png');

  // 4. Switch role to Manager
  await page.select('select.role-select', 'manager');
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: 'verification_screenshots/role_manager.png' });
  console.log('Captured role_manager.png');

  // 5. Switch role to Receptionist
  await page.select('select.role-select', 'receptionist');
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: 'verification_screenshots/role_receptionist.png' });
  console.log('Captured role_receptionist.png');

  // 6. Switch role to Finance
  await page.select('select.role-select', 'finance');
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: 'verification_screenshots/role_finance.png' });
  console.log('Captured role_finance.png');

  // 7. Switch back to Admin and test Security Firewall
  await page.select('select.role-select', 'admin');
  await new Promise(r => setTimeout(r, 600));

  await page.evaluate(() => {
    const secLink = Array.from(document.querySelectorAll('.sidebar-nav a')).find(a => a.textContent.includes('Security Firewall'));
    if (secLink) secLink.click();
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: 'verification_screenshots/security_firewall.png' });
  console.log('Captured security_firewall.png');

  // 8. Test Employee Onboarding modal
  await page.evaluate(() => {
    const addEmpBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('+ Add Employee'));
    if (addEmpBtn) addEmpBtn.click();
  });
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: 'verification_screenshots/add_employee_modal.png' });
  console.log('Captured add_employee_modal.png');

  await browser.close();
  console.log('Verification complete!');
}

verify().catch(console.error);

