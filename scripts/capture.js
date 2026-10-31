import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputDir = path.resolve(__dirname, '../linkedin_showcase');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function capture() {
  console.log('Launching Chrome from:', chromePath);
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    defaultViewport: {
      width: 1920,
      height: 1080,
      deviceScaleFactor: 2 // High-DPI crisp screenshots
    },
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1920,1080']
  });

  const page = await browser.newPage();
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0', timeout: 30000 });

  // 1. Hero Homepage (Viewport)
  console.log('1. Capturing Hero Homepage...');
  await page.screenshot({
    path: path.join(outputDir, '01_hero_homepage.png'),
    clip: { x: 0, y: 0, width: 1920, height: 1080 }
  });

  // 2. Services Section
  console.log('2. Capturing Services & Packages...');
  const servicesEl = await page.$('#services');
  if (servicesEl) {
    await servicesEl.scrollIntoView();
    await new Promise(r => setTimeout(r, 600));
    await servicesEl.screenshot({ path: path.join(outputDir, '02_services_and_packages.png') });
  }

  // 3. Vehicle Selector
  console.log('3. Capturing Vehicle Selector...');
  const vehiclesEl = await page.$('.vehicles-section');
  if (vehiclesEl) {
    await vehiclesEl.scrollIntoView();
    await new Promise(r => setTimeout(r, 600));
    await vehiclesEl.screenshot({ path: path.join(outputDir, '03_vehicle_selector.png') });
  }

  // 4. Before & After Gallery
  console.log('4. Capturing Before & After Gallery...');
  const galleryEl = await page.$('#gallery');
  if (galleryEl) {
    await galleryEl.scrollIntoView();
    await new Promise(r => setTimeout(r, 600));
    await galleryEl.screenshot({ path: path.join(outputDir, '04_before_after_gallery.png') });
  }

  // 5. Loyalty & Why Choose Us
  console.log('5. Capturing Loyalty Banner & Core Pillars...');
  const loyaltyEl = await page.$('.loyalty-banner-section');
  if (loyaltyEl) {
    await loyaltyEl.scrollIntoView();
    await new Promise(r => setTimeout(r, 600));
    await loyaltyEl.screenshot({ path: path.join(outputDir, '05_loyalty_and_why_choose_us.png') });
  }

  // 6. Reviews & Locations
  console.log('6. Capturing Reviews & Locations...');
  const reviewsEl = await page.$('#reviews');
  if (reviewsEl) {
    await reviewsEl.scrollIntoView();
    await new Promise(r => setTimeout(r, 600));
    await reviewsEl.screenshot({ path: path.join(outputDir, '06_reviews_and_feedback.png') });
  }

  // 7. Full Landing Page
  console.log('7. Capturing Full Landing Page...');
  await page.screenshot({
    path: path.join(outputDir, '07_full_landing_page.png'),
    fullPage: true
  });

  // 8. Open Booking Wizard Modal
  console.log('8. Capturing Booking Wizard Modal...');
  await page.evaluate(() => {
    // Click any book appointment button
    const bookBtn = document.querySelector('a[href="#book"]') || document.querySelector('.btn-primary');
    if (bookBtn) bookBtn.click();
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({
    path: path.join(outputDir, '08_online_booking_wizard.png'),
    clip: { x: 0, y: 0, width: 1920, height: 1080 }
  });

  // Close booking modal
  await page.keyboard.press('Escape');
  await new Promise(r => setTimeout(r, 500));

  // 9. Open Customer Portal Modal
  console.log('9. Capturing Customer Self-Service Portal Modal...');
  await page.evaluate(() => {
    const accBtn = document.querySelector('.btn-gold-outline') || Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('My Account'));
    if (accBtn) accBtn.click();
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({
    path: path.join(outputDir, '09_customer_portal_modal.png'),
    clip: { x: 0, y: 0, width: 1920, height: 1080 }
  });

  // Close customer portal modal
  await page.keyboard.press('Escape');
  await new Promise(r => setTimeout(r, 500));

  // 10. Switch to Admin Dashboard
  console.log('10. Capturing Staff Admin Dashboard...');
  await page.evaluate(() => {
    const adminBtn = document.querySelector('.staff-badge-btn') || Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Staff'));
    if (adminBtn) adminBtn.click();
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({
    path: path.join(outputDir, '10_admin_operations_dashboard.png'),
    clip: { x: 0, y: 0, width: 1920, height: 1080 }
  });

  // 11. Switch to Admin Calendar & Bays Tab
  console.log('11. Capturing Admin Calendar & Bays View...');
  await page.evaluate(() => {
    const calTab = document.querySelector('a[href="#calendar"]') || Array.from(document.querySelectorAll('.nav-item')).find(el => el.textContent.includes('Calendar'));
    if (calTab) calTab.click();
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({
    path: path.join(outputDir, '11_admin_calendar_and_bays.png'),
    clip: { x: 0, y: 0, width: 1920, height: 1080 }
  });

  // 12. Switch to Admin Bookings Table
  console.log('12. Capturing Admin Bookings Management View...');
  await page.evaluate(() => {
    const bTab = document.querySelector('a[href="#bookings"]') || Array.from(document.querySelectorAll('.nav-item')).find(el => el.textContent.includes('Bookings'));
    if (bTab) bTab.click();
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({
    path: path.join(outputDir, '12_admin_bookings_management.png'),
    clip: { x: 0, y: 0, width: 1920, height: 1080 }
  });

  await browser.close();
  console.log('All screenshots captured successfully in:', outputDir);
}

capture().catch(err => {
  console.error('Error capturing screenshots:', err);
  process.exit(1);
});
