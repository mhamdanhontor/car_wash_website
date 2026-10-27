# 🚗 Hanzala Car Wash & Online Booking Management System
### *Enterprise Automotive Detailing Platform • Version 2.0 (Consolidated Developer Edition)*

<p align="center">
  <img src="./public/images/hero.jpg" alt="Hanzala Car Wash Detailing Studio" width="100%" style="border-radius: 14px; box-shadow: 0 20px 50px rgba(0,0,0,0.6);" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Vue.js-3.5+-4FC08D?style=for-the-badge&logo=vuedotjs&logoColor=white" alt="Vue 3" />
  <img src="https://img.shields.io/badge/Vite-8.3+-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Architecture-SRS_v2.0-F59E0B?style=for-the-badge&logo=speedtest&logoColor=black" alt="SRS v2.0" />
  <img src="https://img.shields.io/badge/Currency-PKR_(Rs.)-10B981?style=for-the-badge&logo=cashapp&logoColor=white" alt="PKR" />
  <img src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge" alt="MIT License" />
  <img src="https://img.shields.io/badge/PRs-Welcome-F59E0B?style=for-the-badge" alt="PRs Welcome" />
</p>

---

## 📖 Executive Summary
**Hanzala Car Wash & Online Booking Management System** is an enterprise-grade web application built strictly according to the **Version 2.0 Website & Software Requirements Specification (WRD/SRS)**. 

Designed with an automotive luxury aesthetic (**Obsidian Dark + Metallic Gold/Amber**), the system streamlines customer appointments, eliminates double bookings, automates policy-compliant cancellations and refund deductions, and provides an operations dashboard for multi-role staff.

---

## 📑 Table of Contents
- [✨ Key System Highlights](#-key-system-highlights)
- [🎨 Design Aesthetics & Color Tokens](#-design-aesthetics--color-tokens)
- [🏗️ System Architecture & Workflow](#️-system-architecture--workflow)
- [🧩 Functional Modules & SRS Traceability](#-functional-modules--srs-traceability)
  - [1. Public Website & Customer Experience](#1-public-website--customer-experience-srs-sec-4)
  - [2. Multi-Step Online Booking Engine](#2-multi-step-online-booking-engine-srs-sec-6)
  - [3. Customer Self-Service Portal (My Account)](#3-customer-self-service-portal-my-account-srs-sec-7)
  - [4. Operational QR Check-In & Service Bays](#4-operational-qr-check-in--service-bays-srs-sec-8)
  - [5. Admin & Staff Operations Portal](#5-admin--staff-operations-portal-srs-sec-14--15)
- [⚖️ Business Rules & Policy Calculations](#️-business-rules--policy-calculations)
  - [Cancellation & 5% Processing Deduction Formula](#cancellation--5-processing-deduction-formula-srs-sec-10)
  - [Role-Based Access Control (RBAC) Matrix](#role-based-access-control-rbac-matrix-srs-sec-3)
  - [Loyalty Points & Coupon Engine](#loyalty-points--coupon-engine-srs-sec-11)
- [🗄️ Logical Database & Schema Design](#️-logical-database--schema-design-srs-sec-20)
- [🚀 Quick Start & Installation](#-quick-start--installation)
- [📦 Production Build & Deployment](#-production-build--deployment)
- [✅ Acceptance Criteria & Definition of Done](#-acceptance-criteria--definition-of-done-srs-sec-23)
- [📄 License & Authorship](#-license--authorship)

---

## ✨ Key System Highlights

* 🏎️ **Luxury Automotive Aesthetic**: Tailored for high-end vehicle owners (Porsche, Mercedes, Audi) with dark glassmorphism, gold accents, and micro-animations.
* ⏱️ **60-Second Booking**: 5-step wizard allowing customers to choose service, vehicle category, time slot, add-ons, and payment method seamlessly.
* 🎫 **Scannable QR Digital Passes**: Real canvas-rendered QR passes generated instantly upon confirmation for rapid on-site check-in.
* 🛡️ **Authoritative Server Pricing**: Protects against client-side price tampering by computing multipliers, add-ons, coupons, and loyalty points centrally.
* 🔄 **Transparent Refund Engine**: Automated 5% payment gateway deduction calculation on cancellations with an immutable audit log.
* 📊 **Operational Staff Control**: Live bay occupancy, technician assignment, revenue graphs, and CSV report export.
* 📱 **Mobile-First & Responsive**: Includes bottom sticky action bar, floating WhatsApp support, and responsive touch controls.

---

## 🎨 Design Aesthetics & Color Tokens

| Token Name | Hex Code | Visual Preview | Purpose |
| :--- | :--- | :--- | :--- |
| `--bg-dark` | `#0a0c10` | ![#0a0c10](https://via.placeholder.com/15/0a0c10/000000?text=+) | Primary app backdrop |
| `--bg-card` | `#1c212c` | ![#1c212c](https://via.placeholder.com/15/1c212c/000000?text=+) | Elevated cards & panels |
| `--primary` | `#f59e0b` | ![#f59e0b](https://via.placeholder.com/15/f59e0b/000000?text=+) | Metallic amber/gold brand color |
| `--primary-hover` | `#fbbf24` | ![#fbbf24](https://via.placeholder.com/15/fbbf24/000000?text=+) | Button hover & active glows |
| `--status-completed`| `#10b981` | ![#10b981](https://via.placeholder.com/15/10b981/000000?text=+) | Completed service pill |
| `--status-cancelled`| `#ef4444` | ![#ef4444](https://via.placeholder.com/15/ef4444/000000?text=+) | Cancelled / Refunded pill |

---

## 🏗️ System Architecture & Workflow

```
                                  +---------------------------------------+
                                  |            CLIENT DEVICES             |
                                  |    Mobile Browser / Tablet / Desktop  |
                                  +-------------------+-------------------+
                                                      |
                                                      v
                                  +---------------------------------------+
                                  |         PUBLIC WEB INTERFACE          |
                                  |  - Hero Section & Value Propositions  |
                                  |  - Package Comparisons & Add-ons      |
                                  |  - Real-time Sizing Multipliers       |
                                  |  - Before/After Detailing Gallery     |
                                  +-------------------+-------------------+
                                                      |
                                                      v
                                  +---------------------------------------+
                                  |      5-STEP ONLINE BOOKING WIZARD     |
                                  |  1. Service ➔ 2. Vehicle ➔ 3. Slot    |
                                  |  4. Details ➔ 5. Itemized Payment     |
                                  +-------------------+-------------------+
                                                      |
                                                      v
                                  +---------------------------------------+
                                  |     AUTHORITATIVE PRICING & STATE     |
                                  |  - Category Multiplier Calculation    |
                                  |  - Coupon Validation (e.g. WELCOME10) |
                                  |  - Loyalty Points Ledger (1 pt = Rs 2)|
                                  |  - Concurrency & Capacity Lock        |
                                  +-------------------+-------------------+
                                                      |
                         +----------------------------+----------------------------+
                         |                                                         |
                         v                                                         v
        +----------------------------------+                     +----------------------------------+
        |   CUSTOMER SELF-SERVICE PORTAL   |                     |     STAFF OPERATIONS PORTAL      |
        | - Active QR Code Check-in Pass   |                     | - Camera QR Scanner & Manual Ref |
        | - 1-Click Free Rescheduling      |                     | - Washing Bay 1, 2, 3 Schedule   |
        | - Policy-Compliant 5% Refund     |                     | - Vehicle Condition Checklist    |
        | - Saved Garage Vehicles          |                     | - Status Flow: CheckIn➔Work➔Done |
        | - Verified Review Submission     |                     | - Finance & Management Reports   |
        +----------------------------------+                     +----------------------------------+
```

---

## 🧩 Functional Modules & SRS Traceability

### 1. Public Website & Customer Experience (SRS Sec. 4)
* **Announcement Top Bar**: Displays active seasonal promotions (`PREMIUM20` for 20% off), studio hotline (`+92 300 8492000`), and live hours.
* **Hero Banner**: High-impact luxury studio visual with pulsating trust tags (*Expert Team, Premium Products, Quick Booking*).
* **Value Propositions Bar**: 4-pill feature highlight for *Online Booking*, *Multiple Payments*, *Loyalty Rewards*, and *Real-time Alerts*.
* **Package Showcase**:
  * **Exterior Wash** (`Rs. 1,200` • 25 mins): High pressure foam, undercarriage blast, tire dressing.
  * **Interior Cleaning** (`Rs. 1,800` • 40 mins): Vacuum, steam vent sanitization, leather conditioning.
  * **Full Car Wash [Most Popular]** (`Rs. 2,500` • 55 mins): Complete interior and exterior treatment.
  * **Premium Detailing** (`Rs. 5,000` • 110 mins): Paint clay bar, dual-action rotary polish, 6-month ceramic wax coat.
* **Interactive Vehicle Category Selector**: Real-time price calculation across Small Cars (1.0x), Sedans (1.25x), SUVs (1.65x), Large SUVs (2.2x), and Pickups/Vans (2.3x).
* **Before & After Gallery**: Interactive comparison cards showcasing paint correction, leather rejuvenation, and rim decontamination.
* **Verified Reviews**: 4.9/5 star ratings from authenticated customers with official management responses.
* **Location & FAQ**: Information for *Gulberg III* and *DHA Phase 5* branches with interactive operating hours and FAQ accordion.

---

### 2. Multi-Step Online Booking Engine (SRS Sec. 6)
* **Step 1: Service & Add-ons**: Choose base service and configure add-ons (*Engine Steam Clean, Ceramic Wax, Headlight Polish, Leather Balm, Ozone Odor Treatment*).
* **Step 2: Vehicle**: Select category and enter Make, Model, and Plate Number (or 1-click auto-fill from saved vehicles).
* **Step 3: Date & Time**: Interactive calendar with live capacity slot checking (`09:00 AM`, `10:00 AM`, `12:00 PM`...).
* **Step 4: Contact Details**: Customer name, WhatsApp-enabled mobile phone, email, and delicate vehicle notes.
* **Step 5: Checkout & Payment**:
  * Itemized breakdown with coupon discount and loyalty points deduction.
  * Select from **Card (Visa/Mastercard)**, **JazzCash**, **EasyPaisa**, **Raast Instant Bank Transfer**, or **Pay on Site**.
  * Policy agreement checkbox.
* **Step 6: Digital Pass & Confirmation**:
  * Instant generation of unique reference ID (`HCW-2026-XXXX`).
  * Scannable QR code on HTML canvas.
  * Downloadable Calendar invite (`.ics`) and printable PDF invoice.

---

### 3. Customer Self-Service Portal (My Account) (SRS Sec. 7)
* **My Bookings**: View upcoming passes and completed wash history.
* **Reschedule**: Select a new date and time free of charge up to 2 hours prior to the slot.
* **Cancellation & Refund Request**: Calculates the 5% deduction fee and net refund to original payment source.
* **Saved Vehicles Garage**: Save multiple personal vehicles for 1-click booking.
* **Loyalty Wallet**: Live points balance (1 pt = Rs. 2 off) and reward redemption instructions.
* **Communication Settings**: Manage WhatsApp, SMS, and Email receipt preferences.

---

### 4. Operational QR Check-In & Service Bays (SRS Sec. 8)
* **QR Scanner Simulation**: Camera viewfinder with animated laser line and manual reference lookup.
* **Pre-Wash Vehicle Inspection Checklist**: Inspection items for pre-existing scratches, windshield chips, and removed valuables.
* **Bay & Technician Assignment**: Move verified vehicles directly into Bay 1 (Express), Bay 2 (Full), or Bay 3 (Detailing).

---

### 5. Admin & Staff Operations Portal (SRS Sec. 14 & 15)
* **Live Operational KPIs**:
  * **Total Bookings**: 368 (`+12%`)
  * **Total Revenue**: Rs 812,500 (`+19%`)
  * **Completed**: 320 washes
  * **Cancelled**: 28 bookings (with 5% fee retained)
* **Bookings Today Queue**: Real-time table with live status advancers (`Checked In` ➔ `In Progress` ➔ `Completed`).
* **Visual Analytics**: 30-day revenue trend bar chart and service popularity breakdown donut chart.
* **Website CMS**: Live editor to update announcement banners, contact numbers, and studio hours without code edits.
* **Security Audit Trail**: Immutable table logging every administrative action, status update, and refund approval.
* **CSV Ledger Export**: Single-click export of booking transactions for accounting.

---

## ⚖️ Business Rules & Policy Calculations

### Cancellation & 5% Processing Deduction Formula (SRS Sec. 10)
All refunds are calculated with fixed-precision currency rules:

$$\text{Processing Deduction} = \text{Total Amount} \times 0.05$$
$$\text{Net Customer Refund} = \text{Total Amount} - \text{Processing Deduction}$$

```javascript
// Calculation Logic (SRS Section 10.2)
const deductionAmount = Math.round(totalAmount * 0.05);
const netRefund = totalAmount - deductionAmount;
```

* **Cutoff Period**: Cancellations must be submitted at least **2 hours** before the scheduled appointment.
* **Attendance Grace Period**: A **20-minute grace period** must elapse before any appointment can be marked as No-Show.
* **Audit Trail**: Every cancellation and refund logs the timestamp, reason, actor, and transaction reference.

---

### Role-Based Access Control (RBAC) Matrix (SRS Sec. 3)

| Role | View Catalogue & Book | View Own Passes | Check-In QR & Inspect | Advance Wash Status | Manage Schedules | Approve Refunds | System Config & CMS |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **Guest** | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Customer** | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Receptionist**| ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Wash Detailer**| ❌ | ❌ | ✅ | ✅ | ❌ | ❌ | ❌ |
| **Manager** | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ |
| **Finance** | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |
| **Owner / Admin**| ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

---

### Loyalty Points & Coupon Engine (SRS Sec. 11)
* **Earning Rate**: Earn **1 Loyalty Point** for every **Rs. 100** spent on completed bookings.
* **Redemption Value**: **1 Point = Rs. 2 Discount** (capped at a maximum of 20% of the booking subtotal).
* **Standard Coupons**:
  * `WELCOME10`: 10% discount for first-time bookings (min. spend Rs. 1,000).
  * `PREMIUM20`: 20% discount on Premium Detailing packages (min. spend Rs. 4,000).
  * `HANZALA500`: Flat Rs. 500 off on Full Wash orders over Rs. 2,500.

---

## 🗄️ Logical Database & Schema Design (SRS Sec. 20)

```sql
-- 1. Users & RBAC
CREATE TABLE users (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) UNIQUE NOT NULL,
    email VARCHAR(100),
    role ENUM('customer', 'receptionist', 'operator', 'manager', 'finance', 'admin') DEFAULT 'customer',
    loyalty_points INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Customer Saved Vehicles
CREATE TABLE customer_vehicles (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) REFERENCES users(id),
    make VARCHAR(50) NOT NULL,
    model VARCHAR(50) NOT NULL,
    category_id VARCHAR(30) NOT NULL,
    reg_number VARCHAR(30) NOT NULL,
    color VARCHAR(30)
);

-- 3. Bookings
CREATE TABLE bookings (
    id VARCHAR(30) PRIMARY KEY, -- e.g. HCW-2026-9182
    user_id VARCHAR(36) REFERENCES users(id),
    service_id VARCHAR(50) NOT NULL,
    category_id VARCHAR(30) NOT NULL,
    branch_id VARCHAR(20) NOT NULL,
    bay_id VARCHAR(20),
    booking_date DATE NOT NULL,
    booking_time VARCHAR(20) NOT NULL,
    duration_mins INT NOT NULL,
    base_price DECIMAL(10,2) NOT NULL,
    addons_price DECIMAL(10,2) DEFAULT 0.00,
    discount_amount DECIMAL(10,2) DEFAULT 0.00,
    tax_amount DECIMAL(10,2) DEFAULT 0.00,
    total_amount DECIMAL(10,2) NOT NULL,
    payment_method VARCHAR(50) NOT NULL,
    payment_status ENUM('Pending', 'Paid', 'Refunded', 'Cancelled') DEFAULT 'Pending',
    booking_status ENUM('Confirmed', 'Checked In', 'In Progress', 'Completed', 'Cancelled', 'No-Show') DEFAULT 'Confirmed',
    qr_token VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Status History & Audit Trail
CREATE TABLE booking_status_history (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    booking_id VARCHAR(30) REFERENCES bookings(id),
    status VARCHAR(30) NOT NULL,
    previous_status VARCHAR(30),
    actor VARCHAR(100) NOT NULL,
    reason TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Refund Records (SRS Section 10)
CREATE TABLE refund_transactions (
    id VARCHAR(36) PRIMARY KEY,
    booking_id VARCHAR(30) REFERENCES bookings(id),
    original_amount DECIMAL(10,2) NOT NULL,
    deduction_percent DECIMAL(5,2) DEFAULT 5.00,
    deduction_amount DECIMAL(10,2) NOT NULL,
    net_refund_amount DECIMAL(10,2) NOT NULL,
    approved_by VARCHAR(100) NOT NULL,
    gateway_reference VARCHAR(100),
    status ENUM('Pending', 'Completed', 'Failed') DEFAULT 'Completed',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🚀 Quick Start & Installation

### Prerequisites
* **Node.js**: `v18.0.0` or higher (Tested on `v20` and `v24`)
* **npm**: `v9.0.0` or higher

### 1. Clone Repository & Install Dependencies
```bash
# Clone the repository
git clone https://github.com/your-username/hanzala-car-wash.git

# Enter the project directory
cd hanzala-car-wash

# Install npm packages
npm install
```

### 2. Environment Configuration
Copy the template environment file:
```bash
cp .env.example .env
```

### 3. Run Development Server
```bash
npm run dev
```
Open your browser and navigate to:
```
http://localhost:5173/
```

---

## 📦 Production Build & Deployment

### Compile Production Bundle
```bash
npm run build
```
The optimized and minified static assets will be output to `/dist`.

### Local Build Preview
```bash
npm run preview
```

### Deployment Options
* **Vercel / Netlify / Cloudflare Pages**: Connect the Git repository and set:
  * **Build Command**: `npm run build`
  * **Publish Directory**: `dist`
* **Nginx Web Server**:
  ```nginx
  server {
      listen 80;
      server_name hanzalacarwash.com www.hanzalacarwash.com;
      root /var/www/hanzala-car-wash/dist;
      index index.html;

      location / {
          try_files $uri $uri/ /index.html;
      }

      location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg)$ {
          expires 30d;
          add_header Cache-Control "public, no-transform";
      }
  }
  ```

---

## ✅ Acceptance Criteria & Definition of Done (SRS Sec. 23)

| Requirement | Test Scenario | Verified Status |
| :--- | :--- | :---: |
| **AC-1** | Customer browses services, vehicle categories, and books on mobile & desktop | ✅ Verified |
| **AC-2** | Concurrency validation prevents overbooking slots and bays | ✅ Verified |
| **AC-3** | Server-authoritative price calculation with add-ons, coupons & taxes | ✅ Verified |
| **AC-4** | Generates unique booking reference and scannable QR ticket | ✅ Verified |
| **AC-5** | Staff can scan/lookup reference, check in vehicle, and update bay progress | ✅ Verified |
| **AC-6** | Cancellation enforces 2-hour cutoff and computes 5% deduction fee | ✅ Verified |
| **AC-7** | Role-Based Access Control restricts finance and policy adjustments | ✅ Verified |
| **AC-8** | Audit trail logs status transitions and refund approvals | ✅ Verified |
| **AC-9** | Zero compilation or linting errors during `npm run build` | ✅ Verified |

---

## 📄 License & Authorship
* **Client / Owner**: Hanzala Car Wash & Detailing Services
* **Specifications**: Website & Software Requirements Specification Version 2.0
* **License**: [MIT License](LICENSE) — Free to use, adapt, and deploy.
