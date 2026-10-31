import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outDir = path.resolve(__dirname, '../verification_screenshots');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function test() {
  console.log('Starting verification test...');
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    defaultViewport: { width: 1920, height: 1080 },
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1920,1080']
  });

  const page = await browser.newPage();
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });

  // 1. Full Homepage screenshot
  await page.screenshot({ path: path.join(outDir, '01_homepage_full_width.png') });
  console.log('Saved 01_homepage_full_width.png');

  // 2. Hover on Explore dropdown
  await page.hover('.nav-dropdown-wrapper');
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(outDir, '02_navbar_dropdown_open.png') });
  console.log('Saved 02_navbar_dropdown_open.png');

  // 3. Click Book Now, step through wizard and place order
  await page.click('.cta-book-btn');
  await new Promise(r => setTimeout(r, 600));

  // Step 1 -> Next
  await page.click('.wizard-footer .btn-primary');
  await new Promise(r => setTimeout(r, 400));

  // Step 2 -> Next
  await page.click('.wizard-footer .btn-primary');
  await new Promise(r => setTimeout(r, 400));

  // Step 3 -> Next
  await page.click('.wizard-footer .btn-primary');
  await new Promise(r => setTimeout(r, 400));

  // Step 4: fill customer details if needed
  await page.evaluate(() => {
    const nameInput = document.querySelector('input[placeholder*="Name"], input[type="text"]');
  });
  const nameInputs = await page.$$('.wizard-body input[type="text"], .wizard-body input[type="tel"]');
  for (const input of nameInputs) {
    const val = await page.evaluate(el => el.value, input);
    if (!val) {
      await input.type('Test Customer');
    }
  }

  // Step 4 -> Next
  await page.click('.wizard-footer .btn-primary');
  await new Promise(r => setTimeout(r, 500));

  // Step 5 -> Confirm & Pay
  const confirmBtn = await page.$('.step-content .btn-primary');
  if (confirmBtn) {
    await confirmBtn.click();
  } else {
    // fallback
    const allBtns = await page.$$('button');
    for (const b of allBtns) {
      const text = await page.evaluate(el => el.innerText, b);
      if (text.includes('Confirm & Pay')) {
        await b.click();
        break;
      }
    }
  }
  console.log('Submitted booking order, awaiting celebration modal...');
  await new Promise(r => setTimeout(r, 2000));

  // Capture celebration modal
  await page.screenshot({ path: path.join(outDir, '03_order_celebration_modal.png') });
  console.log('Saved 03_order_celebration_modal.png');

  // 4. Go to Admin panel
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });
  await page.click('.staff-badge-btn');
  await new Promise(r => setTimeout(r, 600));

  // Click Services tab
  await page.click('a[href="#services"]');
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(outDir, '04_admin_services_working.png') });
  console.log('Saved 04_admin_services_working.png');

  // Click Categories tab
  await page.click('a[href="#categories"]');
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(outDir, '05_admin_categories_working.png') });
  console.log('Saved 05_admin_categories_working.png');

  // Click Coupons tab
  await page.click('a[href="#coupons"]');
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(outDir, '06_admin_coupons_working.png') });
  console.log('Saved 06_admin_coupons_working.png');

  // Click Loyalty tab
  await page.click('a[href="#loyalty"]');
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(outDir, '07_admin_loyalty_working.png') });
  console.log('Saved 07_admin_loyalty_working.png');

  // Click Payments tab
  await page.click('a[href="#payments"]');
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(outDir, '08_admin_payments_working.png') });
  console.log('Saved 08_admin_payments_working.png');

  // Click Reports tab
  await page.click('a[href="#reports"]');
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(outDir, '09_admin_reports_working.png') });
  console.log('Saved 09_admin_reports_working.png');

  await browser.close();
  console.log('All verification screenshots captured successfully!');
}

test().catch(err => {
  console.error('Test error:', err);
  process.exit(1);
});
