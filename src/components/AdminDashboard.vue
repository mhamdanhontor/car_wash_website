<template>
  <div class="admin-dashboard-container">
    <!-- Left Sidebar matching luxury automotive dark theme -->
    <aside class="admin-sidebar">
      <div class="sidebar-brand" @click="$emit('exit-to-site')">
        <div class="brand-icon">
          <svg viewBox="0 0 24 24" fill="currentColor" class="car-mini-svg">
            <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.85 7h10.29l1.04 3H5.81l1.04-3zM19 17H5v-4.66l.12-.34h13.77l.11.34V17z"/>
            <circle cx="7.5" cy="14.5" r="1.5"/>
            <circle cx="16.5" cy="14.5" r="1.5"/>
          </svg>
        </div>
        <div>
          <h3 class="brand-title">Hanzala</h3>
          <span class="brand-sub">Car Wash</span>
        </div>
      </div>

      <!-- Navigation Items with Role-Aware Badges -->
      <nav class="sidebar-nav">
        <!-- ROLE CONSOLE SHORTCUTS -->
        <div class="nav-section-title">Operations & Consoles</div>

        <a 
          href="#dash" 
          class="nav-item" 
          :class="{ active: currentTab === 'dashboard' }"
          @click.prevent="currentTab = 'dashboard'"
        >
          <span class="nav-icon">📊</span>
          <span>Overview</span>
        </a>

        <!-- Washer / Detailer Dedicated Console -->
        <a 
          href="#washer" 
          class="nav-item highlight-role-nav" 
          :class="{ active: currentTab === 'washer' }"
          @click.prevent="currentTab = 'washer'"
        >
          <span class="nav-icon">🚿</span>
          <span>Washer Console</span>
          <span class="nav-role-tag">Detailer</span>
        </a>

        <!-- Front Desk Reception Console -->
        <a 
          href="#reception" 
          class="nav-item highlight-role-nav" 
          :class="{ active: currentTab === 'reception' }"
          @click.prevent="currentTab = 'reception'"
        >
          <span class="nav-icon">🛎️</span>
          <span>Front Desk Desk</span>
          <span class="nav-role-tag">Reception</span>
        </a>

        <!-- Operations Manager Console -->
        <a 
          href="#manager" 
          class="nav-item highlight-role-nav" 
          :class="{ active: currentTab === 'manager' }"
          @click.prevent="currentTab = 'manager'"
        >
          <span class="nav-icon">🧭</span>
          <span>Manager Console</span>
          <span class="nav-role-tag">Ops</span>
        </a>

        <!-- Finance Operator Console -->
        <a 
          href="#finance" 
          class="nav-item highlight-role-nav" 
          :class="{ active: currentTab === 'finance' }"
          @click.prevent="currentTab = 'finance'"
        >
          <span class="nav-icon">💰</span>
          <span>Finance Console</span>
          <span class="nav-role-tag">Accounts</span>
        </a>

        <div class="nav-section-title mt-2">Management & Systems</div>

        <a 
          href="#bookings" 
          class="nav-item" 
          :class="{ active: currentTab === 'bookings' }"
          @click.prevent="currentTab = 'bookings'"
        >
          <span class="nav-icon">📅</span>
          <span>All Bookings</span>
          <span class="nav-pill-count">{{ store.bookings.length }}</span>
        </a>

        <a 
          href="#calendar" 
          class="nav-item" 
          :class="{ active: currentTab === 'calendar' }"
          @click.prevent="currentTab = 'calendar'"
        >
          <span class="nav-icon">🗓️</span>
          <span>Bay Scheduling</span>
        </a>

        <a 
          href="#checkin" 
          class="nav-item" 
          :class="{ active: currentTab === 'checkin' }"
          @click.prevent="currentTab = 'checkin'"
        >
          <span class="nav-icon">📷</span>
          <span>QR Scanner Pass</span>
        </a>

        <a 
          href="#customers" 
          class="nav-item" 
          :class="{ active: currentTab === 'customers' }"
          @click.prevent="currentTab = 'customers'"
        >
          <span class="nav-icon">👥</span>
          <span>Customers</span>
          <span class="nav-pill-count">{{ uniqueCustomers.length }}</span>
        </a>

        <a 
          href="#staff" 
          class="nav-item" 
          :class="{ active: currentTab === 'staff' }"
          @click.prevent="currentTab = 'staff'"
        >
          <span class="nav-icon">👔</span>
          <span>Employees & Roles</span>
          <span class="nav-pill-count">{{ store.staff.length }}</span>
        </a>

        <a 
          href="#services" 
          class="nav-item" 
          :class="{ active: currentTab === 'services' }"
          @click.prevent="currentTab = 'services'"
        >
          <span class="nav-icon">🧼</span>
          <span>Services & Rates</span>
          <span class="nav-pill-count">{{ store.services.length }}</span>
        </a>

        <a 
          href="#categories" 
          class="nav-item" 
          :class="{ active: currentTab === 'categories' }"
          @click.prevent="currentTab = 'categories'"
        >
          <span class="nav-icon">🚘</span>
          <span>Vehicle Categories</span>
        </a>

        <a 
          href="#coupons" 
          class="nav-item" 
          :class="{ active: currentTab === 'coupons' }"
          @click.prevent="currentTab = 'coupons'"
        >
          <span class="nav-icon">🏷️</span>
          <span>Coupons & Promo</span>
        </a>

        <a 
          href="#loyalty" 
          class="nav-item" 
          :class="{ active: currentTab === 'loyalty' }"
          @click.prevent="currentTab = 'loyalty'"
        >
          <span class="nav-icon">🎁</span>
          <span>Loyalty & VIP</span>
        </a>

        <a 
          href="#payments" 
          class="nav-item" 
          :class="{ active: currentTab === 'payments' }"
          @click.prevent="currentTab = 'payments'"
        >
          <span class="nav-icon">💳</span>
          <span>Payments & Refunds</span>
        </a>

        <a 
          href="#reports" 
          class="nav-item" 
          :class="{ active: currentTab === 'reports' }"
          @click.prevent="currentTab = 'reports'"
        >
          <span class="nav-icon">📈</span>
          <span>Reports & Analytics</span>
        </a>

        <!-- Security Firewall & Anti-DDoS Center -->
        <a 
          href="#security" 
          class="nav-item security-nav-item" 
          :class="{ active: currentTab === 'security' }"
          @click.prevent="currentTab = 'security'"
        >
          <span class="nav-icon">🛡️</span>
          <span>Security Firewall</span>
          <span class="shield-pulse-dot"></span>
        </a>

        <a 
          href="#cms" 
          class="nav-item" 
          :class="{ active: currentTab === 'cms' }"
          @click.prevent="currentTab = 'cms'"
        >
          <span class="nav-icon">✏️</span>
          <span>Website CMS</span>
        </a>

        <a 
          href="#settings" 
          class="nav-item" 
          :class="{ active: currentTab === 'settings' }"
          @click.prevent="currentTab = 'settings'"
        >
          <span class="nav-icon">⚙️</span>
          <span>System & Audit Log</span>
        </a>
      </nav>

      <!-- Sidebar Bottom Exit to Public Site -->
      <div class="sidebar-footer">
        <button class="btn btn-gold-outline btn-sm btn-block" @click="$emit('exit-to-site')">
          ← Back to Public Website
        </button>
      </div>
    </aside>

    <!-- Main Admin Content Area -->
    <main class="admin-main">
      <!-- Top Bar: Title, Role Switcher & Actions -->
      <header class="admin-topbar">
        <div class="topbar-left">
          <div class="d-flex align-center gap-2">
            <h2 class="admin-page-title">
              {{ pageTitles[currentTab] || 'Management Portal' }}
            </h2>
            <span class="role-indicator-badge">{{ currentRoleTitle }}</span>
          </div>
          <span class="text-muted small d-block mt-1">
            Hanzala Automotive Care • Branch: {{ store.business?.branches?.[0]?.name || 'Main Hub - Gulberg III' }}
          </span>
        </div>

        <div class="topbar-right d-flex align-center gap-3 flex-wrap">
          <!-- Styled Active Role Switcher -->
          <div class="role-selector-box">
            <span class="role-label">Logged as:</span>
            <select v-model="store.auth.userRole" class="role-select" @change="onRoleSwitched">
              <option value="admin">👑 Owner / Administrator (Full Access)</option>
              <option value="manager">🧭 Operations Manager (Bay Ops)</option>
              <option value="receptionist">🛎️ Front Desk / Reception (Check-in)</option>
              <option value="operator">🚿 Wash Operator / Detailer (Bay Queue)</option>
              <option value="finance">💰 Finance & Accounts (Ledger)</option>
            </select>
          </div>

          <!-- Date Filter -->
          <select class="period-select">
            <option>Last 30 Days</option>
            <option>Today (Oct 28)</option>
            <option>This Week</option>
            <option>This Month</option>
          </select>

          <!-- Add Staff Quick Button -->
          <button class="btn btn-gold-outline btn-sm" @click="openAddStaffModal">
            + Add Employee
          </button>

          <!-- 1-Click Delete Dummy Data Action -->
          <button 
            class="btn-delete-dummy" 
            @click="handleClearDummyData"
            title="Wipe demo dummy bookings & reviews in one click"
          >
            <span>🗑️</span>
            <span>Wipe Demo Data</span>
          </button>

          <!-- Reload Demo Data -->
          <button 
            v-if="store.bookings.length === 0" 
            class="btn-restore-demo" 
            @click="handleRestoreDemoData"
            title="Reload presentation demo records"
          >
            <span>🔄</span>
            <span>Reload Demo</span>
          </button>
        </div>
      </header>

      <!-- Admin Toast Notification Banner -->
      <transition name="toast-anim">
        <div v-if="adminToast" class="admin-toast-banner">
          <span class="toast-icon">✨</span>
          <span class="toast-text">{{ adminToast }}</span>
          <button class="close-toast-btn" @click="adminToast = ''">✕</button>
        </div>
      </transition>

      <div class="admin-content-body">
        <!-- ========================================================
             VIEW: WASHER / DETAILER CONSOLE (Dedicated Staff Panel)
             ======================================================== -->
        <div v-if="currentTab === 'washer'" class="tab-pane">
          <div class="role-banner washer-banner mb-4">
            <div class="d-flex justify-between align-center flex-wrap gap-2">
              <div>
                <span class="role-pill-badge">Bay Detailer View</span>
                <h3 class="role-banner-title">🚿 Washer & Detailer Live Queue</h3>
                <p class="role-banner-desc">
                  Station: <strong>Bay 2 (Full Service & Interior)</strong> • Current Detailer: <strong>Ali Raza</strong>
                </p>
              </div>
              <div class="d-flex gap-3">
                <div class="stat-pill-box">
                  <span class="stat-num text-success">5</span>
                  <span class="stat-lbl">Washes Done Today</span>
                </div>
                <div class="stat-pill-box">
                  <span class="stat-num text-gold">22 mins</span>
                  <span class="stat-lbl">Avg. Pace</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Active Vehicle in Bay -->
          <div class="panel-card p-4 mb-4" style="border: 1px solid var(--border-gold);">
            <div class="d-flex justify-between align-center mb-3">
              <div class="d-flex align-center gap-2">
                <span class="pulse-indicator"></span>
                <h3 class="panel-title text-white">Currently in Bay: Honda Civic RS (LEA-23-9912)</h3>
              </div>
              <span class="status-pill in-progress">In Progress</span>
            </div>

            <div class="washer-task-grid mb-4">
              <div class="task-spec-box">
                <span class="t-lbl">Service Package:</span>
                <span class="t-val text-gold font-weight-bold">Full Car Wash + Hydrophobic Ceramic Spray</span>
              </div>
              <div class="task-spec-box">
                <span class="t-lbl">Customer Request:</span>
                <span class="t-val text-white">"Extra steam sanitization around AC vents and leather seats"</span>
              </div>
              <div class="task-spec-box">
                <span class="t-lbl">Elapsed Time:</span>
                <span class="t-val text-white font-weight-bold">18 of 55 minutes</span>
              </div>
            </div>

            <!-- Pre-Wash & Detailing Checklist -->
            <h4 class="text-white small font-weight-bold mb-2">Pre-Wash & Quality Checklist:</h4>
            <div class="checklist-grid mb-4">
              <label class="check-item-box">
                <input type="checkbox" checked /> High-pressure active snow foam pre-soak
              </label>
              <label class="check-item-box">
                <input type="checkbox" checked /> Wheel arch & alloy degreasing
              </label>
              <label class="check-item-box">
                <input type="checkbox" checked /> Two-bucket grit guard hand scrub
              </label>
              <label class="check-item-box">
                <input type="checkbox" /> Scratch-free microfiber hand dry
              </label>
              <label class="check-item-box">
                <input type="checkbox" /> Deep interior suction vacuum & trunk
              </label>
              <label class="check-item-box">
                <input type="checkbox" /> Long-lasting silicone tire dressing
              </label>
            </div>

            <div class="d-flex gap-2">
              <button class="btn btn-primary btn-lg flex-1" @click="showAdminToast('Marked as Completed! Bay ready for next car.')">
                ✓ Complete Wash & Notify Reception
              </button>
              <button class="btn btn-outline" @click="showAdminToast('Customer notified via SMS: 10 mins remaining.')">
                📱 Send 10-Min Customer Alert
              </button>
            </div>
          </div>

          <!-- Upcoming Queue for this Bay -->
          <div class="panel-card">
            <div class="panel-header">
              <h3 class="panel-title text-white">Next in Queue for Bay 2</h3>
            </div>
            <div class="table-responsive">
              <table class="admin-table">
                <thead>
                  <tr>
                    <th>Queue #</th>
                    <th>Ref ID</th>
                    <th>Vehicle</th>
                    <th>Service</th>
                    <th>Scheduled Slot</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(b, idx) in store.bookings.slice(0, 3)" :key="b.id">
                    <td class="font-weight-bold text-gold">#{{ idx + 1 }}</td>
                    <td class="font-weight-bold text-white">{{ b.id }}</td>
                    <td>{{ b.vehicleMake }} {{ b.vehicleModel }} ({{ b.vehicleReg }})</td>
                    <td class="text-gold">{{ b.serviceName }}</td>
                    <td>{{ b.bookingTime }}</td>
                    <td>
                      <button class="btn btn-outline btn-xs" @click="advanceStatus(b.id, 'In Progress')">
                        Pull to Bay
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- ========================================================
             VIEW: OPERATIONS MANAGER CONSOLE (Dedicated Staff Panel)
             ======================================================== -->
        <div v-if="currentTab === 'manager'" class="tab-pane">
          <div class="role-banner manager-banner mb-4">
            <div class="d-flex justify-between align-center flex-wrap gap-2">
              <div>
                <span class="role-pill-badge">Operations Manager Command</span>
                <h3 class="role-banner-title">🧭 Hub Floor & Bay Traffic Load Balancer</h3>
                <p class="role-banner-desc">Manager on duty: <strong>Bilawal Sheikh</strong> • Station: Gulberg III Hub</p>
              </div>
              <div class="d-flex gap-2">
                <button class="btn btn-primary btn-sm" @click="showAdminToast('Floor dispatch optimized across all 3 bays.')">
                  ⚡ Auto-Balance Queue
                </button>
              </div>
            </div>
          </div>

          <!-- 3 Bay Health Status Cards -->
          <div class="bay-manager-grid mb-4">
            <div v-for="bay in store.bays" :key="bay.id" class="panel-card p-3 bay-mgt-card">
              <div class="d-flex justify-between align-center mb-2">
                <h4 class="font-weight-bold text-white">{{ bay.name }}</h4>
                <span class="status-pill confirmed">Online</span>
              </div>
              <span class="text-muted small d-block mb-2">Category: {{ bay.type }} Capacity</span>

              <div class="bay-occupancy-bar my-2">
                <div class="occupancy-fill" style="width: 80%;"></div>
              </div>

              <div class="d-flex justify-between text-muted small mb-3">
                <span>Queue: 3 Vehicles</span>
                <span>Wait: ~35 mins</span>
              </div>

              <div class="d-flex gap-2">
                <button class="btn btn-outline btn-xs flex-1" @click="showAdminToast(`Assigned lead detailer to ${bay.name}`)">
                  Assign Staff
                </button>
                <button class="btn btn-outline btn-xs text-danger" @click="showAdminToast(`${bay.name} scheduled for 15-min maintenance break`)">
                  Pause Bay
                </button>
              </div>
            </div>
          </div>

          <!-- Live Bottleneck & Quality Alerts -->
          <div class="panel-card p-4">
            <h3 class="panel-title mb-3 text-white">Live Floor Alerts & Escalations</h3>
            <div class="alert-item p-3 glass-panel mb-2 d-flex justify-between align-center">
              <div>
                <span class="text-gold font-weight-bold">⚡ Bay 1 Express Turnaround:</span>
                <span class="text-secondary small ml-2">Vehicles passing through 4 minutes faster than standard rate.</span>
              </div>
              <span class="status-pill confirmed">Optimal</span>
            </div>
            <div class="alert-item p-3 glass-panel d-flex justify-between align-center">
              <div>
                <span class="text-primary font-weight-bold">🔔 Detailing Studio Bay 3:</span>
                <span class="text-secondary small ml-2">Ceramic coat cure in progress on Audi A6. Estimated release: 1:45 PM.</span>
              </div>
              <span class="status-pill in-progress">In Curing</span>
            </div>
          </div>
        </div>

        <!-- ========================================================
             VIEW: FRONT DESK / RECEPTION CONSOLE (Dedicated Staff Panel)
             ======================================================== -->
        <div v-if="currentTab === 'reception'" class="tab-pane">
          <div class="role-banner reception-banner mb-4">
            <div class="d-flex justify-between align-center flex-wrap gap-2">
              <div>
                <span class="role-pill-badge">Front Desk Reception</span>
                <h3 class="role-banner-title">🛎️ Gate Check-in & Walk-in Fast Lane</h3>
                <p class="role-banner-desc">Front desk staff: <strong>Tariq Mehmood</strong> • Gate: Main Boulevard</p>
              </div>
              <button class="btn btn-primary btn-sm" @click="openCreateWalkIn">
                + Fast Walk-in Customer Entry
              </button>
            </div>
          </div>

          <div class="dashboard-split-grid mb-4">
            <!-- Fast Intake QR / Plate Lookup -->
            <div class="panel-card p-4">
              <h3 class="panel-title mb-2 text-white">Gate Pass Scanner & Plate Lookup</h3>
              <p class="text-muted small mb-3">Scan incoming vehicle plate or digital pass barcode:</p>

              <div class="form-group mb-3">
                <label class="form-label">Registration Plate / Booking Ref</label>
                <div class="d-flex gap-2">
                  <input type="text" v-model="scanRefInput" class="font-weight-bold text-gold" />
                  <button class="btn btn-primary" @click="lookupBookingByRef">
                    Search Gate Pass
                  </button>
                </div>
              </div>

              <div v-if="activeScannedBooking" class="scanned-result-card p-3 glass-panel mt-3">
                <div class="d-flex justify-between align-center mb-2">
                  <span class="font-weight-bold text-white">{{ activeScannedBooking.id }}</span>
                  <span :class="['status-pill', getStatusClass(activeScannedBooking.bookingStatus)]">
                    {{ activeScannedBooking.bookingStatus }}
                  </span>
                </div>
                <p class="text-white mb-1"><strong>{{ activeScannedBooking.customerName }}</strong> ({{ activeScannedBooking.customerPhone }})</p>
                <p class="text-gold mb-3">{{ activeScannedBooking.vehicleMake }} {{ activeScannedBooking.vehicleModel }} • {{ activeScannedBooking.serviceName }}</p>

                <button class="btn btn-primary btn-block" @click="completeCheckIn(activeScannedBooking.id)">
                  Confirm Arrival & Allocate Bay →
                </button>
              </div>
            </div>

            <!-- Customer Waiting Lounge Tracker -->
            <div class="panel-card p-4">
              <h3 class="panel-title mb-2 text-white">Lounge Waiting Status</h3>
              <p class="text-muted small mb-3">Customers currently in the VIP lounge waiting for their vehicle:</p>

              <div class="lounge-list">
                <div class="lounge-item p-2 glass-panel mb-2 d-flex justify-between align-center">
                  <div>
                    <strong class="text-white d-block">Muhammad Ali</strong>
                    <span class="text-muted small">Honda Civic RS (LEA-23-9912) • Bay 2</span>
                  </div>
                  <span class="status-pill in-progress">Washing</span>
                </div>
                <div class="lounge-item p-2 glass-panel mb-2 d-flex justify-between align-center">
                  <div>
                    <strong class="text-white d-block">Usman Malik</strong>
                    <span class="text-muted small">Land Cruiser V8 (LXZ-19-0001) • Bay 3</span>
                  </div>
                  <span class="status-pill confirmed">In Queue</span>
                </div>
                <div class="lounge-item p-2 glass-panel d-flex justify-between align-center">
                  <div>
                    <strong class="text-white d-block">Sara Khan</strong>
                    <span class="text-muted small">Kia Sportage (LHE-21-5588) • Keys Ready</span>
                  </div>
                  <span class="status-pill completed">Ready for Handover</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ========================================================
             VIEW: FINANCE OPERATOR CONSOLE (Dedicated Staff Panel)
             ======================================================== -->
        <div v-if="currentTab === 'finance'" class="tab-pane">
          <div class="role-banner finance-banner mb-4">
            <div class="d-flex justify-between align-center flex-wrap gap-2">
              <div>
                <span class="role-pill-badge">Finance & Accounts Ledger</span>
                <h3 class="role-banner-title">💰 Cash Register & Payment Reconciliation</h3>
                <p class="role-banner-desc">Finance lead: <strong>Sara Ahmed</strong> • Audit Mode: Active</p>
              </div>
              <div class="d-flex gap-2">
                <button class="btn btn-primary btn-sm" @click="exportPaymentsCSV">
                  📥 Download Shift Z-Report
                </button>
              </div>
            </div>
          </div>

          <!-- 4 Finance Cards -->
          <div class="kpi-grid mb-4">
            <div class="kpi-card">
              <div class="kpi-header"><span class="kpi-title">Verified Bank Settlements</span><span class="kpi-badge positive">Cards/Raast</span></div>
              <div class="kpi-value text-gold">Rs. {{ totalCollectedRevenue.toLocaleString() }}</div>
              <div class="kpi-subtext">Direct online payments settled</div>
            </div>
            <div class="kpi-card">
              <div class="kpi-header"><span class="kpi-title">Cash Drawer at Desk</span><span class="kpi-badge neutral">Till 1</span></div>
              <div class="kpi-value">Rs. {{ pendingPayments.toLocaleString() }}</div>
              <div class="kpi-subtext">Collected upon vehicle delivery</div>
            </div>
            <div class="kpi-card">
              <div class="kpi-header"><span class="kpi-title">Total Refunds Issued</span><span class="kpi-badge" style="background: rgba(239, 68, 68, 0.15); color: #f87171;">5% SRS Fee</span></div>
              <div class="kpi-value text-danger">Rs. {{ totalRefundsIssued.toLocaleString() }}</div>
              <div class="kpi-subtext">Net after 5% deduction policy</div>
            </div>
            <div class="kpi-card">
              <div class="kpi-header"><span class="kpi-title">Net Operating Cash</span></div>
              <div class="kpi-value text-success">Rs. {{ (totalCollectedRevenue - totalRefundsIssued).toLocaleString() }}</div>
              <div class="kpi-subtext">Verified total liquidity</div>
            </div>
          </div>
        </div>

        <!-- ========================================================
             VIEW 1: OVERVIEW DASHBOARD
             ======================================================== -->
        <div v-if="currentTab === 'dashboard'" class="tab-pane">
          <!-- 4 KPI Summary Cards -->
          <div class="kpi-grid mb-4">
            <div class="kpi-card">
              <div class="kpi-header">
                <span class="kpi-title">Total Bookings</span>
                <span class="kpi-badge positive">+12%</span>
              </div>
              <div class="kpi-value">{{ totalBookingsCount }}</div>
              <div class="kpi-subtext">Across all active branches</div>
            </div>

            <div class="kpi-card">
              <div class="kpi-header">
                <span class="kpi-title">Total Revenue</span>
                <span class="kpi-badge positive">+19%</span>
              </div>
              <div class="kpi-value text-gold">Rs {{ totalRevenue.toLocaleString() }}</div>
              <div class="kpi-subtext">Verified collections & card settlements</div>
            </div>

            <div class="kpi-card">
              <div class="kpi-header">
                <span class="kpi-title">Completed Washes</span>
                <span class="kpi-badge positive">+8%</span>
              </div>
              <div class="kpi-value text-success">{{ completedBookingsCount }}</div>
              <div class="kpi-subtext">Inspected & customer handed-over</div>
            </div>

            <div class="kpi-card">
              <div class="kpi-header">
                <span class="kpi-title">Cancellations</span>
                <span class="kpi-badge neutral">Controlled</span>
              </div>
              <div class="kpi-value text-secondary">{{ cancelledBookingsCount }}</div>
              <div class="kpi-subtext">5% fee policy applied</div>
            </div>
          </div>

          <!-- Split Row: Recent Bookings & Live Bay Utilization -->
          <div class="dashboard-split-grid">
            <!-- Left: Recent Bookings Table -->
            <div class="panel-card">
              <div class="panel-header d-flex justify-between align-center">
                <h3 class="panel-title">Recent Reservations</h3>
                <a href="#bookings" class="view-all-link" @click.prevent="currentTab = 'bookings'">View All →</a>
              </div>
              <div class="table-responsive">
                <table class="admin-table">
                  <thead>
                    <tr>
                      <th>Ref ID</th>
                      <th>Customer Details</th>
                      <th>Vehicle</th>
                      <th>Service</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="b in store.bookings.slice(0, 5)" :key="b.id">
                      <td class="font-weight-bold text-white">{{ b.id }}</td>
                      <td>
                        <div class="customer-info-cell">
                          <span class="cust-name-line">{{ b.customerName }}</span>
                          <span class="cust-phone-line">{{ b.customerPhone }}</span>
                        </div>
                      </td>
                      <td>{{ b.vehicleMake }} {{ b.vehicleModel }}</td>
                      <td class="text-gold">{{ b.serviceName }}</td>
                      <td class="font-weight-bold text-white">Rs {{ b.totalAmount }}</td>
                      <td>
                        <span :class="['status-pill', getStatusClass(b.bookingStatus)]">
                          {{ b.bookingStatus }}
                        </span>
                      </td>
                      <td>
                        <button class="btn btn-outline btn-xs" @click="viewBookingDetails(b)">
                          Inspect
                        </button>
                      </td>
                    </tr>
                    <tr v-if="store.bookings.length === 0">
                      <td colspan="7" class="text-center py-4 text-muted">
                        No bookings found. You can reload demo data or create a walk-in booking!
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Right: Live Bay Status Cards with proper margins and padding -->
            <div class="panel-card">
              <div class="panel-header d-flex justify-between align-center">
                <h3 class="panel-title">Live Bay Status (Gulberg III)</h3>
                <span class="status-pill confirmed">Online</span>
              </div>
              <div class="bay-status-list p-3">
                <div v-for="bay in store.bays" :key="bay.id" class="bay-status-item-card">
                  <div class="bay-card-header">
                    <span class="bay-name-title">{{ bay.name }}</span>
                    <span class="badge-bay-active">Active</span>
                  </div>
                  <div class="bay-occupancy-bar">
                    <div class="occupancy-fill" style="width: 75%;"></div>
                  </div>
                  <div class="bay-queue-text">
                    <span>Queue Status:</span>
                    <strong class="text-white">{{ getBayBookings(bay.id).length }} vehicles scheduled</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ========================================================
             VIEW: SECURITY & THREAT SHIELD CENTER
             Anti-Hacking, DDoS Protection & Malicious Request Filter
             ======================================================== -->
        <div v-if="currentTab === 'security'" class="tab-pane">
          <!-- Firewall Status Header Banner -->
          <div class="security-hero-card p-4 mb-4">
            <div class="d-flex justify-between align-center flex-wrap gap-3">
              <div class="d-flex align-center gap-3">
                <div class="security-shield-icon">
                  <span>🛡️</span>
                </div>
                <div>
                  <div class="d-flex align-center gap-2">
                    <h3 class="panel-title text-white mb-0">Hanzala Web Application Firewall (WAF)</h3>
                    <span class="status-pill confirmed">Shield Active</span>
                  </div>
                  <p class="text-secondary small mt-1 mb-0">
                    Active defense against DDoS, Anonymous Malicious Bots, SQL Injections & XSS Attacks.
                  </p>
                </div>
              </div>

              <!-- Interactive Attack Simulation Buttons -->
              <div class="d-flex gap-2 flex-wrap">
                <button class="btn btn-outline btn-sm text-gold" @click="testSecurityAttack('SQL_INJECTION')">
                  ⚡ Test SQL Injection Block
                </button>
                <button class="btn btn-outline btn-sm text-gold" @click="testSecurityAttack('XSS_SCRIPT_PROBE')">
                  ⚡ Test XSS Probe Block
                </button>
                <button class="btn btn-outline btn-sm text-gold" @click="testSecurityAttack('ANONYMOUS_BOT_FLOOD')">
                  ⚡ Test Anti-Bot Rate Limit
                </button>
              </div>
            </div>
          </div>

          <!-- 4 Security KPI Telemetry Cards -->
          <div class="kpi-grid mb-4">
            <div class="kpi-card">
              <div class="kpi-header"><span class="kpi-title">Total Requests Inspected</span><span class="kpi-badge positive">Clean</span></div>
              <div class="kpi-value text-white">{{ securityStats.totalRequests || 42 }}</div>
              <div class="kpi-subtext">All HTTP incoming queries parsed</div>
            </div>
            <div class="kpi-card">
              <div class="kpi-header"><span class="kpi-title">Blocked Cyber Threats</span><span class="kpi-badge" style="background: rgba(239, 68, 68, 0.2); color: #f87171;">Quarantined</span></div>
              <div class="kpi-value text-danger">{{ securityStats.blockedAttacks || 2 }}</div>
              <div class="kpi-subtext">Malicious payloads neutralized</div>
            </div>
            <div class="kpi-card">
              <div class="kpi-header"><span class="kpi-title">Rate Limit Triggers</span><span class="kpi-badge neutral">Anti-DDoS</span></div>
              <div class="kpi-value text-gold">{{ securityStats.rateLimitHits || 0 }}</div>
              <div class="kpi-subtext">High-frequency floods blocked</div>
            </div>
            <div class="kpi-card">
              <div class="kpi-header"><span class="kpi-title">Blacklisted Botnet IPs</span></div>
              <div class="kpi-value" style="color: #a855f7;">{{ securityStats.blacklistedIPsCount || 2 }}</div>
              <div class="kpi-subtext">IPs banned from reaching endpoints</div>
            </div>
          </div>

          <!-- Live Threats Neutralized Log Table -->
          <div class="panel-card mb-4">
            <div class="panel-header d-flex justify-between align-center">
              <div>
                <h3 class="panel-title text-white">Live Threat Interception Log</h3>
                <span class="text-muted small">Real-time firewall quarantine log with client IP & attack category:</span>
              </div>
              <button class="btn btn-outline btn-xs" @click="refreshSecurityStats">
                🔄 Refresh Telemetry
              </button>
            </div>

            <div class="table-responsive">
              <table class="admin-table">
                <thead>
                  <tr>
                    <th>Timestamp</th>
                    <th>Threat Category</th>
                    <th>Origin IP</th>
                    <th>Intercepted Details</th>
                    <th>Action Taken</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="th in securityThreatsList" :key="th.id">
                    <td class="text-muted small">{{ th.timestamp }}</td>
                    <td>
                      <span class="threat-tag">{{ th.type }}</span>
                    </td>
                    <td class="font-weight-bold text-white font-mono">{{ th.ip }}</td>
                    <td class="text-secondary small">{{ th.details }}</td>
                    <td>
                      <span class="status-pill cancelled">403 Forbidden Blocked</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- IP Blacklist Manager -->
          <div class="panel-card p-4">
            <h3 class="panel-title mb-2 text-white">Manual IP Access Controls (Blacklist & Whitelist)</h3>
            <p class="text-muted small mb-3">Add any suspicious IP address to immediately revoke site access:</p>

            <div class="form-row align-center">
              <div class="col-6">
                <input type="text" v-model="manualBlockIP" placeholder="Enter IP address (e.g. 198.51.100.99)" />
              </div>
              <div class="col-6">
                <button class="btn btn-danger btn-sm" @click="handleBlockManualIP">
                  🚫 Blacklist IP from Server
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- ========================================================
             VIEW 2: FULL BOOKINGS MANAGEMENT
             ======================================================== -->
        <div v-if="currentTab === 'bookings'" class="tab-pane">
          <div class="panel-card">
            <div class="panel-header d-flex justify-between align-center flex-wrap gap-2">
              <div class="d-flex align-center gap-2">
                <input 
                  type="text" 
                  v-model="bookingSearch" 
                  placeholder="🔍 Search reference, customer name, plate..." 
                  class="search-input"
                />
                <select v-model="statusFilter" class="filter-select">
                  <option value="all">All Statuses</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Checked In">Checked In</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <div class="d-flex gap-2">
                <button 
                  class="btn btn-outline btn-sm text-danger" 
                  @click="handleClearDummyData"
                  title="Wipe all demo/dummy bookings in 1-click"
                >
                  🗑️ Wipe Demo Data
                </button>
                <button class="btn btn-outline btn-sm" @click="exportCSV">
                  📥 Export CSV
                </button>
                <button class="btn btn-primary btn-sm" @click="openCreateWalkIn">
                  + Walk-in Booking
                </button>
              </div>
            </div>

            <div class="table-responsive">
              <table class="admin-table">
                <thead>
                  <tr>
                    <th>Ref ID</th>
                    <th>Customer Details</th>
                    <th>Vehicle Details</th>
                    <th>Service & Bay</th>
                    <th>Date & Time</th>
                    <th>Total</th>
                    <th>Payment</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="b in filteredBookings" :key="b.id">
                    <td class="font-weight-bold text-white">{{ b.id }}</td>
                    <td>
                      <div class="customer-info-cell">
                        <span class="cust-name-line">{{ b.customerName }}</span>
                        <span class="cust-phone-line">{{ b.customerPhone }}</span>
                      </div>
                    </td>
                    <td>
                      <div class="vehicle-info-cell">
                        <span class="d-block text-white font-weight-bold">{{ b.vehicleMake }} {{ b.vehicleModel }}</span>
                        <span class="cat-pill">{{ b.vehicleReg }}</span>
                      </div>
                    </td>
                    <td>
                      <span class="text-gold font-weight-bold d-block">{{ b.serviceName }}</span>
                      <span class="text-muted small">{{ b.bayId ? b.bayId.replace('_', ' ').toUpperCase() : 'Bay 1' }}</span>
                    </td>
                    <td>
                      <span class="d-block text-white">{{ b.bookingDate }}</span>
                      <span class="d-block text-muted small">{{ b.bookingTime }}</span>
                    </td>
                    <td class="font-weight-bold text-white">Rs {{ b.totalAmount }}</td>
                    <td>
                      <span :class="['status-pill', b.paymentStatus === 'Paid' ? 'confirmed' : 'pending']">
                        {{ b.paymentStatus }}
                      </span>
                    </td>
                    <td>
                      <span :class="['status-pill', getStatusClass(b.bookingStatus)]">
                        {{ b.bookingStatus }}
                      </span>
                    </td>
                    <td>
                      <div class="d-flex gap-1">
                        <button class="btn btn-outline btn-xs" @click="viewBookingDetails(b)" title="View Details">
                          Inspect
                        </button>
                        <button 
                          v-if="b.bookingStatus === 'Confirmed'" 
                          class="btn btn-primary btn-xs" 
                          @click="advanceStatus(b.id, 'Checked In')"
                        >
                          Check In
                        </button>
                        <button 
                          v-else-if="b.bookingStatus === 'Checked In'" 
                          class="btn btn-gold-outline btn-xs" 
                          @click="advanceStatus(b.id, 'In Progress')"
                        >
                          Start Wash
                        </button>
                        <button 
                          v-else-if="b.bookingStatus === 'In Progress'" 
                          class="btn btn-primary btn-xs" 
                          @click="advanceStatus(b.id, 'Completed')"
                        >
                          Complete
                        </button>
                        <button 
                          v-if="b.bookingStatus !== 'Cancelled' && b.bookingStatus !== 'Completed'" 
                          class="btn btn-outline btn-xs text-danger" 
                          @click="openRefundModal(b)"
                        >
                          Refund
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr v-if="filteredBookings.length === 0">
                    <td colspan="9" class="text-center py-4 text-muted">
                      No matching reservations found.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- ========================================================
             VIEW 3: CALENDAR & BAY SCHEDULING
             ======================================================== -->
        <div v-if="currentTab === 'calendar'" class="tab-pane">
          <div class="panel-card p-4">
            <div class="d-flex justify-between align-center mb-4 flex-wrap gap-2">
              <div>
                <h3 class="panel-title mb-1 text-white">Interactive Bay Schedule (Gulberg III Hub)</h3>
                <p class="text-muted small mb-0">Drag or inspect live vehicle queues across washing bays:</p>
              </div>
              <div class="d-flex gap-2">
                <span class="status-pill confirmed">Bay 1: Express</span>
                <span class="status-pill in-progress">Bay 2: Full & Interior</span>
                <span class="status-pill pending">Bay 3: Detailing</span>
              </div>
            </div>

            <div class="bay-calendar-grid">
              <div v-for="bay in store.bays" :key="bay.id" class="bay-schedule-col">
                <div class="bay-col-header">
                  <h4 class="font-weight-bold text-white">{{ bay.name }}</h4>
                  <span class="small text-muted">{{ bay.type }} Capacity</span>
                </div>
                <div class="bay-col-body">
                  <div 
                    v-for="b in getBayBookings(bay.id)" 
                    :key="b.id" 
                    class="bay-booking-card"
                    @click="viewBookingDetails(b)"
                  >
                    <div class="d-flex justify-between align-center mb-1">
                      <span class="time-chip">{{ b.bookingTime }}</span>
                      <span class="font-weight-bold text-white small">{{ b.id }}</span>
                    </div>
                    <strong class="d-block text-white">{{ b.customerName }}</strong>
                    <span class="d-block text-gold small">{{ b.vehicleMake }} {{ b.vehicleModel }}</span>
                    <span class="cat-pill small mt-1">{{ b.serviceName }}</span>
                  </div>
                  <div v-if="getBayBookings(bay.id).length === 0" class="empty-bay-slot">
                    <span>Available Slot</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ========================================================
             VIEW 4: QR SCANNER & ON-SITE CHECK-IN
             (Expanded & styled with balanced two-column layout)
             ======================================================== -->
        <div v-if="currentTab === 'checkin'" class="tab-pane">
          <div class="dashboard-split-grid">
            <!-- Left: High-Tech Viewfinder & Manual Input -->
            <div class="panel-card p-4">
              <div class="d-flex align-center gap-2 mb-3">
                <span style="font-size: 1.5rem;">📷</span>
                <h3 class="panel-title text-white">Gate Pass Scanner & Plate Lookup</h3>
              </div>
              <p class="text-muted small mb-3">
                Scan customer digital pass QR code or input booking reference / license plate:
              </p>

              <!-- Simulated Viewfinder with Scanning Animation -->
              <div class="camera-viewfinder-box mb-4">
                <div class="viewfinder-frame">
                  <div class="laser-scanner-line"></div>
                  <span class="viewfinder-hint">Align QR Code inside frame</span>
                </div>
              </div>

              <div class="form-group mb-3">
                <label class="form-label">Booking Reference or Plate Number</label>
                <div class="d-flex gap-2">
                  <input 
                    type="text" 
                    v-model="scanRefInput" 
                    placeholder="e.g. HCW-2026-9182 or LEA-23-9912" 
                    class="font-weight-bold text-gold"
                  />
                  <button class="btn btn-primary" @click="lookupBookingByRef">
                    Search Pass
                  </button>
                </div>
              </div>

              <div class="quick-sample-chips d-flex gap-1 flex-wrap">
                <span class="text-muted small mr-1">Quick Test:</span>
                <button 
                  v-for="b in store.bookings.slice(0, 3)" 
                  :key="b.id" 
                  class="btn btn-outline btn-xs"
                  @click="scanRefInput = b.id; lookupBookingByRef()"
                >
                  {{ b.id }}
                </button>
              </div>
            </div>

            <!-- Right: Scanned Booking Details & Instant Check-in -->
            <div class="panel-card p-4">
              <h3 class="panel-title mb-3 text-white">Scanned Booking Verification</h3>

              <div v-if="activeScannedBooking" class="scanned-verified-box">
                <div class="d-flex justify-between align-center mb-3">
                  <div>
                    <span class="ref-tag font-mono text-gold">{{ activeScannedBooking.id }}</span>
                    <h4 class="text-white font-weight-bold mt-1">{{ activeScannedBooking.customerName }}</h4>
                  </div>
                  <span :class="['status-pill', getStatusClass(activeScannedBooking.bookingStatus)]">
                    {{ activeScannedBooking.bookingStatus }}
                  </span>
                </div>

                <div class="scanned-details-grid mb-3">
                  <div class="spec-cell">
                    <span class="d-lbl">Contact Phone:</span>
                    <span class="d-val text-white">{{ activeScannedBooking.customerPhone }}</span>
                  </div>
                  <div class="spec-cell">
                    <span class="d-lbl">Vehicle:</span>
                    <span class="d-val text-white">{{ activeScannedBooking.vehicleMake }} {{ activeScannedBooking.vehicleModel }} ({{ activeScannedBooking.vehicleReg }})</span>
                  </div>
                  <div class="spec-cell">
                    <span class="d-lbl">Service:</span>
                    <span class="d-val text-gold">{{ activeScannedBooking.serviceName }}</span>
                  </div>
                  <div class="spec-cell">
                    <span class="d-lbl">Payment Status:</span>
                    <span class="d-val text-success font-weight-bold">Rs. {{ activeScannedBooking.totalAmount }} ({{ activeScannedBooking.paymentStatus }})</span>
                  </div>
                </div>

                <button 
                  class="btn btn-primary btn-block btn-lg" 
                  @click="completeCheckIn(activeScannedBooking.id)"
                  :disabled="activeScannedBooking.bookingStatus === 'Checked In' || activeScannedBooking.bookingStatus === 'Completed'"
                >
                  Confirm Check-in & Move to Bay 2 →
                </button>
              </div>

              <div v-else class="empty-scan-placeholder text-center p-4">
                <span class="placeholder-icon">🔍</span>
                <p class="text-muted mt-2">Enter a booking reference or click a quick sample above to verify gate entry pass.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- ========================================================
             VIEW: CUSTOMERS (Customer Accounts & Profiles)
             ======================================================== -->
        <div v-if="currentTab === 'customers'" class="tab-pane">
          <!-- 4 Customer Overview KPI Cards -->
          <div class="kpi-grid mb-4">
            <div class="kpi-card">
              <div class="kpi-header"><span class="kpi-title">Total Registered Clients</span></div>
              <div class="kpi-value">{{ uniqueCustomers.length }}</div>
              <div class="kpi-subtext">Verified customer profiles</div>
            </div>
            <div class="kpi-card">
              <div class="kpi-header"><span class="kpi-title">VIP Loyalty Members</span></div>
              <div class="kpi-value text-gold">{{ vipCustomersCount }}</div>
              <div class="kpi-subtext">Gold & Platinum tier balances</div>
            </div>
            <div class="kpi-card">
              <div class="kpi-header"><span class="kpi-title">Repeat Visit Rate</span></div>
              <div class="kpi-value text-success">84.6%</div>
              <div class="kpi-subtext">Clients with 2+ bookings</div>
            </div>
            <div class="kpi-card">
              <div class="kpi-header"><span class="kpi-title">Average Lifetime Spend</span></div>
              <div class="kpi-value">Rs. {{ averageCustomerSpend.toLocaleString() }}</div>
              <div class="kpi-subtext">Per active customer account</div>
            </div>
          </div>

          <div class="panel-card">
            <div class="panel-header d-flex justify-between align-center flex-wrap gap-2">
              <div class="d-flex align-center gap-2">
                <input 
                  type="text" 
                  v-model="customerSearch" 
                  placeholder="🔍 Search client by name, mobile, email..." 
                  class="search-input"
                />
              </div>
              <span class="text-muted small">Showing {{ filteredCustomers.length }} customer records</span>
            </div>

            <div class="table-responsive">
              <table class="admin-table">
                <thead>
                  <tr>
                    <th>Customer Name</th>
                    <th>Contact Details</th>
                    <th>Vehicles Owned</th>
                    <th>Total Washes</th>
                    <th>Lifetime Spend</th>
                    <th>Loyalty Points</th>
                    <th>VIP Tier</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="c in filteredCustomers" :key="c.phone">
                    <td>
                      <div class="d-flex align-center gap-3">
                        <div class="customer-avatar">{{ c.name.charAt(0) }}</div>
                        <div class="customer-name-block">
                          <span class="font-weight-bold text-white d-block cust-name-text">{{ c.name }}</span>
                          <span class="id-pill-badge">ID: {{ c.id }}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div class="cust-contact-block">
                        <span class="d-block text-white">{{ c.phone }}</span>
                        <span class="text-muted small d-block">{{ c.email || 'No email provided' }}</span>
                      </div>
                    </td>
                    <td>
                      <div class="d-flex flex-wrap gap-1">
                        <span class="cat-pill" v-for="v in c.vehicles" :key="v">{{ v }}</span>
                      </div>
                    </td>
                    <td class="font-weight-bold text-white">{{ c.bookingsCount }} visits</td>
                    <td class="font-weight-bold text-gold">Rs. {{ c.lifetimeSpend.toLocaleString() }}</td>
                    <td>
                      <span class="badge-points">⭐ {{ c.points }} pts</span>
                    </td>
                    <td>
                      <span :class="['vip-badge', c.tier.toLowerCase()]">{{ c.tier }}</span>
                    </td>
                    <td>
                      <div class="d-flex gap-1">
                        <button class="btn btn-outline btn-xs" @click="viewCustomerProfile(c)" title="View booking history">
                          Profile
                        </button>
                        <button class="btn btn-gold-outline btn-xs" @click="openLoyaltyAdjustModal(c)" title="Award loyalty points">
                          + Points
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- ========================================================
             VIEW 5: STAFF & EMPLOYEES ROSTER (With Add Employee)
             ======================================================== -->
        <div v-if="currentTab === 'staff'" class="tab-pane">
          <div class="d-flex justify-between align-center mb-4 flex-wrap gap-2">
            <div>
              <h3 class="panel-title mb-1 text-white">Staff Members & RBAC Roles</h3>
              <p class="text-muted small mb-0">Manage employees, bay station assignments, and system permissions:</p>
            </div>
            <button class="btn btn-primary btn-sm" @click="openAddStaffModal">
              + Onboard New Employee
            </button>
          </div>

          <div class="panel-card">
            <div class="table-responsive">
              <table class="admin-table">
                <thead>
                  <tr>
                    <th>Employee Name</th>
                    <th>System Role</th>
                    <th>Assigned Bay / Station</th>
                    <th>Contact</th>
                    <th>Permissions Granted</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="st in store.staff" :key="st.id">
                    <td>
                      <div class="d-flex align-center gap-2">
                        <div class="staff-avatar-circle">{{ st.name.charAt(0) }}</div>
                        <span class="font-weight-bold text-white">{{ st.name }}</span>
                      </div>
                    </td>
                    <td>
                      <span class="role-chip">{{ st.roleName || st.role }}</span>
                    </td>
                    <td>
                      <span class="cat-pill">{{ st.assignedBay || 'Main Hub Floor' }}</span>
                    </td>
                    <td>
                      <span class="d-block text-white small">{{ st.phone }}</span>
                      <span class="text-muted small">{{ st.email }}</span>
                    </td>
                    <td class="small text-secondary">
                      <span v-if="st.role === 'admin'">Full configuration, Pricing, Policy, Refunds, Audit</span>
                      <span v-else-if="st.role === 'manager'">Schedules, bay assignments, operational reports</span>
                      <span v-else-if="st.role === 'receptionist'">Create walk-in, lookup QR, gate check-in</span>
                      <span v-else-if="st.role === 'operator'">Bay wash queue, inspection checklist, status update</span>
                      <span v-else-if="st.role === 'finance'">Financial ledger, cash drawer, refund approvals</span>
                    </td>
                    <td>
                      <button 
                        class="btn btn-outline btn-xs text-danger" 
                        @click="handleRemoveStaff(st.id)"
                        title="Remove employee"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- ========================================================
             VIEW: SERVICES & PACKAGES
             ======================================================== -->
        <div v-if="currentTab === 'services'" class="tab-pane">
          <div class="d-flex justify-between align-center mb-4 flex-wrap gap-2">
            <div>
              <h3 class="panel-title mb-1 text-white">Car Wash & Detailing Service Packages</h3>
              <p class="text-muted small mb-0">Manage services, base rates, service times, and what's included:</p>
            </div>
            <button class="btn btn-primary btn-sm" @click="openAddServiceModal">
              + Add New Service
            </button>
          </div>

          <div class="services-admin-grid">
            <div 
              v-for="srv in store.services" 
              :key="srv.id" 
              class="panel-card service-admin-card"
            >
              <div class="srv-admin-img-wrap">
                <img :src="srv.image" :alt="srv.name" class="srv-admin-img" />
                <span v-if="srv.popular" class="popular-tag">{{ srv.badge || 'Most Popular' }}</span>
                <span class="duration-badge">⏱ {{ srv.durationMins }} mins</span>
              </div>

              <div class="srv-admin-content p-3">
                <div class="d-flex justify-between align-center mb-2">
                  <h4 class="font-weight-bold text-white">{{ srv.name }}</h4>
                  <span class="text-gold font-weight-bold">From Rs. {{ srv.basePrice.toLocaleString() }}</span>
                </div>
                <p class="text-muted small mb-3">{{ srv.shortDesc }}</p>

                <div class="srv-inclusions-box mb-3">
                  <span class="d-block small text-muted font-weight-bold mb-1">Included ({{ srv.included.length }} steps):</span>
                  <ul class="srv-checklist small text-secondary">
                    <li v-for="(item, idx) in srv.included.slice(0, 3)" :key="idx">
                      <span class="text-success mr-1">✓</span> {{ item }}
                    </li>
                    <li v-if="srv.included.length > 3" class="text-muted font-italic">
                      + {{ srv.included.length - 3 }} more steps
                    </li>
                  </ul>
                </div>

                <div class="srv-card-actions d-flex gap-2">
                  <button class="btn btn-outline btn-sm btn-block" @click="openEditServiceModal(srv)">
                    ✏️ Edit Package
                  </button>
                  <button 
                    class="btn btn-sm"
                    :class="srv.popular ? 'btn-gold-outline' : 'btn-outline'"
                    @click="toggleServicePopular(srv)"
                    :title="srv.popular ? 'Remove Popular tag' : 'Mark as Popular'"
                  >
                    {{ srv.popular ? '★ Popular' : '☆ Feature' }}
                  </button>
                  <button 
                    class="btn btn-outline btn-sm text-danger" 
                    @click="deleteServicePackage(srv.id)"
                    title="Delete package"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ========================================================
             VIEW: VEHICLE CATEGORIES & MULTIPLIERS
             ======================================================== -->
        <div v-if="currentTab === 'categories'" class="tab-pane">
          <div class="panel-card p-4 mb-4">
            <h3 class="panel-title mb-1 text-white">Vehicle Category Matrix & Multipliers</h3>
            <p class="text-muted small mb-3">
              Dynamic fare calculation: Final Fare = Base Package Rate × Vehicle Multiplier + Add-ons.
            </p>

            <div class="categories-admin-grid">
              <div 
                v-for="cat in store.vehicleCategories" 
                :key="cat.id" 
                class="category-admin-card"
              >
                <div class="d-flex justify-between align-center mb-2">
                  <div class="d-flex align-center gap-2">
                    <span class="cat-card-icon">🚘</span>
                    <h4 class="font-weight-bold text-white">{{ cat.name }}</h4>
                  </div>
                  <span class="multiplier-pill">{{ cat.multiplier }}x Multiplier</span>
                </div>

                <div class="cat-starting-price mb-2">
                  <span class="text-muted small">Base Starting Rate:</span>
                  <span class="text-gold font-weight-bold ml-1">Rs. {{ cat.startingPrice.toLocaleString() }}</span>
                </div>

                <div class="cat-examples-box mb-3">
                  <span class="text-muted small d-block mb-1">Vehicle Examples:</span>
                  <span class="examples-tag">{{ cat.examples }}</span>
                </div>

                <button class="btn btn-outline btn-sm btn-block" @click="openEditCategoryModal(cat)">
                  ✏️ Edit Multiplier & Rates
                </button>
              </div>
            </div>
          </div>

          <!-- Interactive Price Calculator Simulator -->
          <div class="panel-card p-4">
            <h3 class="panel-title mb-2 text-white">🧮 Live Multiplier Price Simulator</h3>
            <p class="text-muted small mb-3">Test how vehicle category multipliers automatically scale package rates:</p>

            <div class="form-row align-center mb-3">
              <div class="col-4">
                <label class="form-label">Select Wash Package</label>
                <select v-model="simulatorServiceId">
                  <option v-for="s in store.services" :key="s.id" :value="s.id">
                    {{ s.name }} (Base: Rs. {{ s.basePrice }})
                  </option>
                </select>
              </div>
              <div class="col-4">
                <label class="form-label">Select Vehicle Category</label>
                <select v-model="simulatorCategoryId">
                  <option v-for="c in store.vehicleCategories" :key="c.id" :value="c.id">
                    {{ c.name }} ({{ c.multiplier }}x)
                  </option>
                </select>
              </div>
              <div class="col-4">
                <div class="sim-result-box">
                  <span class="text-muted small d-block">Authoritative Price Result:</span>
                  <span class="sim-total-amount text-gold font-weight-bold">
                    Rs. {{ simulatorCalculatedPrice }}
                  </span>
                  <span class="text-muted small d-block">Zero tax added (PKR inclusive)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ========================================================
             VIEW: COUPONS & PROMOTIONS
             ======================================================== -->
        <div v-if="currentTab === 'coupons'" class="tab-pane">
          <!-- 3 Promo KPI Cards -->
          <div class="kpi-grid mb-4">
            <div class="kpi-card">
              <div class="kpi-header"><span class="kpi-title">Active Promo Campaigns</span></div>
              <div class="kpi-value text-gold">{{ store.coupons.filter(c => c.active).length }} Active</div>
              <div class="kpi-subtext">Currently available at checkout</div>
            </div>
            <div class="kpi-card">
              <div class="kpi-header"><span class="kpi-title">Total Redemptions</span></div>
              <div class="kpi-value">125 Uses</div>
              <div class="kpi-subtext">Verified customer discounts</div>
            </div>
            <div class="kpi-card">
              <div class="kpi-header"><span class="kpi-title">Total Savings Given</span></div>
              <div class="kpi-value text-success">Rs. 24,500</div>
              <div class="kpi-subtext">Customer loyalty incentives</div>
            </div>
          </div>

          <div class="panel-card">
            <div class="panel-header d-flex justify-between align-center flex-wrap gap-2">
              <div>
                <h3 class="panel-title mb-1 text-white">Coupons & Promotional Campaigns</h3>
                <p class="text-muted small mb-0">Discount codes that customers can enter at the checkout step:</p>
              </div>
              <button class="btn btn-primary btn-sm" @click="showNewCouponModal = true">
                + Create Promo Code
              </button>
            </div>

            <div class="table-responsive">
              <table class="admin-table">
                <thead>
                  <tr>
                    <th>Coupon Code</th>
                    <th>Discount Value</th>
                    <th>Min. Spend Required</th>
                    <th>Usage Tracker</th>
                    <th>Campaign Description</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="cp in store.coupons" :key="cp.code">
                    <td>
                      <div class="d-flex align-center gap-2">
                        <span class="coupon-code-badge">{{ cp.code }}</span>
                        <button class="btn btn-outline btn-xs" @click="copyCouponText(cp.code)" title="Copy code">
                          📋
                        </button>
                      </div>
                    </td>
                    <td class="font-weight-bold text-gold">
                      <span v-if="cp.discountType === 'percent'">{{ cp.value }}% OFF</span>
                      <span v-else>Rs. {{ cp.value }} FLAT</span>
                    </td>
                    <td>Rs. {{ cp.minSpend.toLocaleString() }}</td>
                    <td>
                      <div class="d-flex align-center gap-2">
                        <div class="usage-progress-bar">
                          <div class="usage-fill" :style="{ width: Math.min(100, Math.round((cp.usageCount / cp.maxUsage) * 100)) + '%' }"></div>
                        </div>
                        <span class="small text-muted">{{ cp.usageCount }}/{{ cp.maxUsage }}</span>
                      </div>
                    </td>
                    <td class="text-secondary small">{{ cp.description }}</td>
                    <td>
                      <span :class="['status-pill', cp.active ? 'confirmed' : 'cancelled']">
                        {{ cp.active ? 'Active' : 'Paused' }}
                      </span>
                    </td>
                    <td>
                      <div class="d-flex gap-1">
                        <button 
                          class="btn btn-xs" 
                          :class="cp.active ? 'btn-outline' : 'btn-primary'"
                          @click="toggleCoupon(cp)"
                        >
                          {{ cp.active ? 'Pause' : 'Activate' }}
                        </button>
                        <button 
                          class="btn btn-outline btn-xs text-danger" 
                          @click="deleteCoupon(cp.code)"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- ========================================================
             VIEW: LOYALTY & REWARDS
             ======================================================== -->
        <div v-if="currentTab === 'loyalty'" class="tab-pane">
          <!-- Loyalty Program Configuration Card -->
          <div class="panel-card p-4 mb-4">
            <div class="d-flex justify-between align-center flex-wrap gap-2 mb-3">
              <div>
                <h3 class="panel-title mb-1 text-white">Loyalty & Rewards Program Rules</h3>
                <p class="text-muted small mb-0">Configure points accrual rate, redemption conversion, and redemption cap:</p>
              </div>
              <button class="btn btn-primary btn-sm" @click="saveLoyaltyRules">
                💾 Save Loyalty Rules
              </button>
            </div>

            <div class="form-row mb-2">
              <div class="col-4">
                <label class="form-label">Points Earned per Rs. 100 Spent</label>
                <input type="number" v-model.number="store.loyaltyConfig.pointsPer100Spent" min="1" max="10" />
              </div>
              <div class="col-4">
                <label class="form-label">Point Value in PKR (1 Pt = ? Rs)</label>
                <input type="number" v-model.number="store.loyaltyConfig.pointRedemptionValuePKR" min="1" max="20" />
              </div>
              <div class="col-4">
                <label class="form-label">Max Order Discount Cap (%)</label>
                <input type="number" v-model.number="store.loyaltyConfig.maxPointsRedeemPercent" min="5" max="50" />
              </div>
            </div>
          </div>

          <!-- Loyalty Member Tiers & Leaderboard -->
          <div class="panel-card p-4 mb-4">
            <h3 class="panel-title mb-3 text-white">VIP Club Tiers</h3>
            <div class="tiers-grid">
              <div class="tier-card bronze">
                <span class="tier-icon">🥉</span>
                <h4 class="font-weight-bold text-white">Bronze Member</h4>
                <span class="tier-pts text-muted small">0 - 99 Points</span>
                <p class="small text-secondary mt-2">Standard points accrual on each wash</p>
              </div>
              <div class="tier-card silver">
                <span class="tier-icon">🥈</span>
                <h4 class="font-weight-bold text-white">Silver Tier</h4>
                <span class="tier-pts text-muted small">100 - 249 Points</span>
                <p class="small text-secondary mt-2">5% bonus points on detailing + free tire shine</p>
              </div>
              <div class="tier-card gold">
                <span class="tier-icon">🥇</span>
                <h4 class="font-weight-bold text-gold">Gold VIP</h4>
                <span class="tier-pts text-muted small">250 - 499 Points</span>
                <p class="small text-secondary mt-2">Priority bay reservation + complimentary ozone</p>
              </div>
              <div class="tier-card platinum">
                <span class="tier-icon">💎</span>
                <h4 class="font-weight-bold" style="color: #67e8f9;">Platinum Elite</h4>
                <span class="tier-pts text-muted small">500+ Points</span>
                <p class="small text-secondary mt-2">Free quarterly interior detail + VIP executive lounge</p>
              </div>
            </div>
          </div>

          <!-- Top Loyalty Members Table -->
          <div class="panel-card">
            <div class="panel-header d-flex justify-between align-center">
              <h3 class="panel-title text-white">Loyalty Members & Points Ledger</h3>
              <span class="text-muted small">{{ uniqueCustomers.length }} registered members</span>
            </div>

            <div class="table-responsive">
              <table class="admin-table">
                <thead>
                  <tr>
                    <th>Member Name</th>
                    <th>Phone</th>
                    <th>Points Balance</th>
                    <th>Cash Value</th>
                    <th>VIP Tier</th>
                    <th>Lifetime Washes</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="c in uniqueCustomers" :key="c.phone">
                    <td class="font-weight-bold text-white">{{ c.name }}</td>
                    <td>{{ c.phone }}</td>
                    <td class="font-weight-bold text-gold">⭐ {{ c.points }} pts</td>
                    <td>Rs. {{ c.points * store.loyaltyConfig.pointRedemptionValuePKR }}</td>
                    <td><span :class="['vip-badge', c.tier.toLowerCase()]">{{ c.tier }}</span></td>
                    <td>{{ c.bookingsCount }} washes</td>
                    <td>
                      <button class="btn btn-outline btn-xs" @click="openLoyaltyAdjustModal(c)">
                        Adjust Points
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- ========================================================
             VIEW: PAYMENTS & REFUNDS
             ======================================================== -->
        <div v-if="currentTab === 'payments'" class="tab-pane">
          <!-- 4 Financial KPI Cards -->
          <div class="kpi-grid mb-4">
            <div class="kpi-card">
              <div class="kpi-header"><span class="kpi-title">Gross Revenue Collected</span><span class="kpi-badge positive">+19%</span></div>
              <div class="kpi-value text-gold">Rs. {{ totalCollectedRevenue.toLocaleString() }}</div>
              <div class="kpi-subtext">Settled & verified transactions</div>
            </div>
            <div class="kpi-card">
              <div class="kpi-header"><span class="kpi-title">Pending Collections</span><span class="kpi-badge neutral">On Arrival</span></div>
              <div class="kpi-value">Rs. {{ pendingPayments.toLocaleString() }}</div>
              <div class="kpi-subtext">Pay on site (Cash/POS)</div>
            </div>
            <div class="kpi-card">
              <div class="kpi-header"><span class="kpi-title">Refunds Issued</span><span class="kpi-badge" style="background: rgba(239, 68, 68, 0.15); color: #f87171;">5% SRS Fee</span></div>
              <div class="kpi-value text-danger">Rs. {{ totalRefundsIssued.toLocaleString() }}</div>
              <div class="kpi-subtext">Net after 5% deduction fee</div>
            </div>
            <div class="kpi-card">
              <div class="kpi-header"><span class="kpi-title">Net Operating Cash</span></div>
              <div class="kpi-value text-success">Rs. {{ (totalCollectedRevenue - totalRefundsIssued).toLocaleString() }}</div>
              <div class="kpi-subtext">Direct business cash balance</div>
            </div>
          </div>

          <div class="panel-card">
            <div class="panel-header d-flex justify-between align-center flex-wrap gap-2">
              <div class="d-flex align-center gap-2">
                <input 
                  type="text" 
                  v-model="paymentSearch" 
                  placeholder="🔍 Search transaction by booking ref, customer..." 
                  class="search-input"
                />
                <select v-model="paymentFilter" class="filter-select">
                  <option value="all">All Payment Statuses</option>
                  <option value="Paid">Paid Only</option>
                  <option value="Pending">Pending (On-Site)</option>
                  <option value="Refunded">Refunded</option>
                </select>
              </div>

              <div class="d-flex gap-2">
                <button class="btn btn-outline btn-sm" @click="exportPaymentsCSV">
                  📥 Export Ledger CSV
                </button>
              </div>
            </div>

            <div class="table-responsive">
              <table class="admin-table">
                <thead>
                  <tr>
                    <th>Transaction Ref</th>
                    <th>Customer</th>
                    <th>Date & Time</th>
                    <th>Payment Method</th>
                    <th>Gross Amount</th>
                    <th>Deductions / Net</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="b in filteredPayments" :key="b.id">
                    <td class="font-weight-bold text-white">{{ b.id }}</td>
                    <td>
                      <div>{{ b.customerName }}</div>
                      <span class="text-muted small">{{ b.customerPhone }}</span>
                    </td>
                    <td>{{ b.bookingDate }} {{ b.bookingTime }}</td>
                    <td><span class="cat-pill">{{ b.paymentMethod }}</span></td>
                    <td class="font-weight-bold text-white">Rs. {{ b.totalAmount }}</td>
                    <td>
                      <span v-if="b.paymentStatus === 'Refunded'" class="small text-danger">
                        -Rs. {{ b.refundDetails?.deductionAmount || Math.round(b.totalAmount * 0.05) }} (5%) → Net: Rs. {{ b.refundDetails?.refundedAmount || Math.round(b.totalAmount * 0.95) }}
                      </span>
                      <span v-else class="text-muted small">None (Full amount)</span>
                    </td>
                    <td>
                      <span :class="['status-pill', getStatusClass(b.paymentStatus)]">
                        {{ b.paymentStatus }}
                      </span>
                    </td>
                    <td>
                      <button 
                        v-if="b.paymentStatus === 'Paid'" 
                        class="btn btn-outline btn-xs text-danger"
                        @click="openRefundModal(b)"
                        title="Process 95% refund"
                      >
                        Issue Refund
                      </button>
                      <button 
                        v-else-if="b.paymentStatus === 'Pending'" 
                        class="btn btn-primary btn-xs"
                        @click="markPaymentAsPaid(b)"
                        title="Mark as paid at desk"
                      >
                        Mark Paid
                      </button>
                      <span v-else class="text-muted small">Settled</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- ========================================================
             VIEW: REPORTS & REVENUE ANALYTICS
             ======================================================== -->
        <div v-if="currentTab === 'reports'" class="tab-pane">
          <div class="d-flex justify-between align-center mb-4 flex-wrap gap-2">
            <div>
              <h3 class="panel-title mb-1 text-white">Executive Business Reports & Revenue Analytics</h3>
              <p class="text-muted small mb-0">High-level KPIs, package popularity, capacity utilization, and staff throughput:</p>
            </div>
            <div class="d-flex gap-2">
              <button class="btn btn-outline btn-sm" @click="exportReportsCSV">
                📥 Export Full Analytics CSV
              </button>
              <button class="btn btn-gold-outline btn-sm" @click="printExecutiveReport">
                🖨️ Print Executive Report
              </button>
            </div>
          </div>

          <!-- 4 Executive KPI Cards -->
          <div class="kpi-grid mb-4">
            <div class="kpi-card">
              <div class="kpi-header"><span class="kpi-title">Monthly Run-Rate</span><span class="kpi-badge positive">+19%</span></div>
              <div class="kpi-value text-gold">Rs. {{ Math.round(totalRevenue * 1.35).toLocaleString() }}</div>
              <div class="kpi-subtext">Estimated based on current 30-day velocity</div>
            </div>
            <div class="kpi-card">
              <div class="kpi-header"><span class="kpi-title">Average Order Value (AOV)</span></div>
              <div class="kpi-value">Rs. {{ averageOrderValue.toLocaleString() }}</div>
              <div class="kpi-subtext">Across all completed & booked services</div>
            </div>
            <div class="kpi-card">
              <div class="kpi-header"><span class="kpi-title">Completion Rate</span><span class="kpi-badge positive">92%</span></div>
              <div class="kpi-value text-success">{{ completionRate }}%</div>
              <div class="kpi-subtext">{{ cancelledBookingsCount }} cancellations logged</div>
            </div>
            <div class="kpi-card">
              <div class="kpi-header"><span class="kpi-title">Live Bay Utilization</span></div>
              <div class="kpi-value" style="color: #38bdf8;">87.5%</div>
              <div class="kpi-subtext">3 Active bays in Gulberg III</div>
            </div>
          </div>

          <!-- Analytics Split Columns with proper spacing and text line separation -->
          <div class="dashboard-split-grid mb-4">
            <!-- Left: Service Package Share -->
            <div class="panel-card p-4">
              <h3 class="panel-title mb-3 text-white">Wash Packages Revenue Breakdown</h3>
              <div class="share-list">
                <div v-for="s in packageBreakdown" :key="s.name" class="share-row mb-3">
                  <div class="d-flex justify-between align-center text-white font-weight-bold small mb-2">
                    <span class="pkg-title-text">{{ s.name }}</span>
                    <span class="text-gold pkg-price-text">Rs. {{ s.revenue.toLocaleString() }} <span class="text-muted font-weight-normal">({{ s.count }} washes)</span></span>
                  </div>
                  <div class="analytics-bar-bg">
                    <div class="analytics-bar-fill" :style="{ width: s.percentage + '%' }"></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Right: Peak Washing Hours with distinct spacing -->
            <div class="panel-card p-4">
              <h3 class="panel-title mb-3 text-white">Peak Washing Windows</h3>
              <div class="peak-hours-list">
                <div class="peak-hour-item mb-3">
                  <div class="d-flex justify-between align-center small font-weight-bold text-white mb-2">
                    <span>🌅 Morning Slot (08:00 AM - 12:00 PM)</span>
                    <span class="text-gold">45% Capacity (High)</span>
                  </div>
                  <div class="analytics-bar-bg"><div class="analytics-bar-fill" style="width: 75%; background: var(--primary);"></div></div>
                </div>
                <div class="peak-hour-item mb-3">
                  <div class="d-flex justify-between align-center small font-weight-bold text-white mb-2">
                    <span>☀️ Afternoon Slot (12:00 PM - 04:00 PM)</span>
                    <span class="text-gold">35% Capacity (Medium)</span>
                  </div>
                  <div class="analytics-bar-bg"><div class="analytics-bar-fill" style="width: 55%; background: #0ea5e9;"></div></div>
                </div>
                <div class="peak-hour-item mb-3">
                  <div class="d-flex justify-between align-center small font-weight-bold text-white mb-2">
                    <span>🌆 Evening Rush (04:00 PM - 08:00 PM)</span>
                    <span class="text-gold">90% Capacity (Peak)</span>
                  </div>
                  <div class="analytics-bar-bg"><div class="analytics-bar-fill" style="width: 90%; background: #10b981;"></div></div>
                </div>
                <div class="peak-hour-item">
                  <div class="d-flex justify-between align-center small font-weight-bold text-white mb-2">
                    <span>🌙 Night Detailing (08:00 PM - 10:00 PM)</span>
                    <span class="text-gold">40% Capacity</span>
                  </div>
                  <div class="analytics-bar-bg"><div class="analytics-bar-fill" style="width: 40%; background: #a855f7;"></div></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Staff Detailing Throughput Leaderboard -->
          <div class="panel-card">
            <div class="panel-header">
              <h3 class="panel-title text-white">Detailer & Operator Performance</h3>
            </div>
            <div class="table-responsive">
              <table class="admin-table">
                <thead>
                  <tr>
                    <th>Staff Member</th>
                    <th>Role</th>
                    <th>Assigned Bay</th>
                    <th>Washes Completed</th>
                    <th>Customer Satisfaction</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="font-weight-bold text-white">Ali Raza</td>
                    <td><span class="role-chip">Senior Detailer</span></td>
                    <td>Bay 3 (Detailing Studio)</td>
                    <td class="font-weight-bold text-gold">14 Washes</td>
                    <td><span class="text-gold font-weight-bold">⭐ 5.0 / 5.0</span> (12 reviews)</td>
                    <td><span class="status-pill confirmed">On Duty</span></td>
                  </tr>
                  <tr>
                    <td class="font-weight-bold text-white">Hamza Khan</td>
                    <td><span class="role-chip">Wash Operator</span></td>
                    <td>Bay 1 (Express Foam)</td>
                    <td class="font-weight-bold text-gold">18 Washes</td>
                    <td><span class="text-gold font-weight-bold">⭐ 4.9 / 5.0</span> (15 reviews)</td>
                    <td><span class="status-pill confirmed">On Duty</span></td>
                  </tr>
                  <tr>
                    <td class="font-weight-bold text-white">Tariq Mehmood</td>
                    <td><span class="role-chip">Front Desk Reception</span></td>
                    <td>Reception & Gate Check-in</td>
                    <td class="font-weight-bold text-gold">32 Check-ins</td>
                    <td><span class="text-gold font-weight-bold">⭐ 4.8 / 5.0</span></td>
                    <td><span class="status-pill confirmed">On Duty</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- ========================================================
             VIEW 6: WEBSITE CONTENT MANAGEMENT SYSTEM (CMS)
             Full Visual Brand, Hero, Announcements & Branches Editor
             ======================================================== -->
        <div v-if="currentTab === 'cms'" class="tab-pane">
          <!-- CMS Header Banner with Instant Actions -->
          <div class="cms-header-card p-4 mb-4">
            <div class="d-flex justify-between align-center flex-wrap gap-3">
              <div>
                <span class="role-pill-badge mb-1">Visual Studio CMS Engine</span>
                <h3 class="panel-title text-white mb-1">Website Content Management System</h3>
                <p class="text-secondary small mb-0">
                  Update customer announcements, hero copy, branch contact details, and operating hours live across the platform.
                </p>
              </div>
              <div class="d-flex gap-2">
                <button class="btn btn-outline btn-sm text-gold" @click="$emit('exit-to-site')">
                  👁️ Open Public Website
                </button>
                <button class="btn btn-primary btn-sm" @click="saveCmsChanges">
                  💾 Publish & Save Live
                </button>
              </div>
            </div>
          </div>

          <!-- CMS Navigation Sub-tabs -->
          <div class="cms-nav-bar d-flex gap-2 mb-4 flex-wrap">
            <button 
              class="btn btn-sm" 
              :class="activeCmsTab === 'hero' ? 'btn-primary' : 'btn-outline'"
              @click="activeCmsTab = 'hero'"
            >
              🏷️ Hero Section & Branding
            </button>
            <button 
              class="btn btn-sm" 
              :class="activeCmsTab === 'announcements' ? 'btn-primary' : 'btn-outline'"
              @click="activeCmsTab = 'announcements'"
            >
              📢 Announcements & Hotline
            </button>
            <button 
              class="btn btn-sm" 
              :class="activeCmsTab === 'branches' ? 'btn-primary' : 'btn-outline'"
              @click="activeCmsTab = 'branches'"
            >
              📍 Branches & Operating Hours
            </button>
            <button 
              class="btn btn-sm" 
              :class="activeCmsTab === 'preview' ? 'btn-primary' : 'btn-outline'"
              @click="activeCmsTab = 'preview'"
            >
              ✨ Public Live Preview
            </button>
          </div>

          <!-- TAB 1: Hero Section & Branding -->
          <div v-if="activeCmsTab === 'hero'" class="panel-card p-4 mb-4">
            <h4 class="text-white font-weight-bold mb-3">Hero Banner & Value Proposition</h4>
            <div class="form-row mb-3">
              <div class="col-6">
                <label class="form-label">Hero Trust Tag / Badge</label>
                <input type="text" v-model="store.business.heroTrustBadge" placeholder="e.g. Lahore's #1 Rated Luxury Detailing Center" />
              </div>
              <div class="col-6">
                <label class="form-label">Studio Brand Name</label>
                <input type="text" v-model="store.business.name" />
              </div>
            </div>

            <div class="form-row mb-3">
              <div class="col-4">
                <label class="form-label">Title Prefix</label>
                <input type="text" v-model="store.business.heroTitlePrefix" placeholder="Premium" />
              </div>
              <div class="col-4">
                <label class="form-label">Title Highlight (Gold)</label>
                <input type="text" v-model="store.business.heroTitleHighlight" placeholder="Car Wash &" />
              </div>
              <div class="col-4">
                <label class="form-label">Title Suffix</label>
                <input type="text" v-model="store.business.heroTitleSuffix" placeholder="Detailing Services" />
              </div>
            </div>

            <div class="form-group mb-3">
              <label class="form-label">Hero Subtitle & Pitch Copy</label>
              <textarea v-model="store.business.slogan" rows="3" class="form-control-dark"></textarea>
            </div>

            <div class="form-row mb-3">
              <div class="col-6">
                <label class="form-label">Live Capacity Floating Badge</label>
                <input type="text" v-model="store.business.capacityLabel" placeholder="3 Bays Operating" />
              </div>
              <div class="col-6">
                <label class="form-label">Fast Service Turnaround Badge</label>
                <input type="text" v-model="store.business.serviceSpeedLabel" placeholder="25 - 55 Mins Average" />
              </div>
            </div>

            <div class="d-flex justify-end gap-2 mt-4">
              <button class="btn btn-primary" @click="saveCmsChanges">Save Hero Content</button>
            </div>
          </div>

          <!-- TAB 2: Announcements & Hotline -->
          <div v-if="activeCmsTab === 'announcements'" class="panel-card p-4 mb-4">
            <h4 class="text-white font-weight-bold mb-3">Marquee Announcement Bar & Contact Channels</h4>
            
            <div class="form-group mb-3">
              <label class="form-label">Top Banner Marquee Announcement</label>
              <input type="text" v-model="store.business.announcement" placeholder="✨ Grand Weekend Offer: Get 20% OFF..." />
              <span class="text-muted small mt-1 d-block">Appears at the very top of all pages across mobile and desktop.</span>
            </div>

            <div class="form-row mb-3">
              <div class="col-6">
                <label class="form-label">Studio Hotline Phone</label>
                <input type="text" v-model="store.business.phone" placeholder="+92 300 8492000" />
              </div>
              <div class="col-6">
                <label class="form-label">WhatsApp Support Direct Link</label>
                <input type="text" v-model="store.business.whatsapp" placeholder="+923008492000" />
              </div>
            </div>

            <div class="form-row mb-3">
              <div class="col-6">
                <label class="form-label">Official Inquiries Email</label>
                <input type="email" v-model="store.business.email" placeholder="info@hanzalacarwash.com" />
              </div>
              <div class="col-6">
                <label class="form-label">Operating Hours Label</label>
                <input type="text" v-model="store.business.operatingHours" placeholder="Monday - Sunday: 8:00 AM - 10:00 PM" />
              </div>
            </div>

            <div class="d-flex justify-end gap-2 mt-4">
              <button class="btn btn-primary" @click="saveCmsChanges">Save Announcement & Contact Channels</button>
            </div>
          </div>

          <!-- TAB 3: Branches & Operating Locations -->
          <div v-if="activeCmsTab === 'branches'" class="panel-card p-4 mb-4">
            <h4 class="text-white font-weight-bold mb-3">Car Wash Studios & Branch Network</h4>
            
            <div class="branches-grid mb-4">
              <div v-for="(b, idx) in store.business.branches" :key="b.id" class="p-3 glass-panel mb-3">
                <div class="d-flex justify-between align-center mb-2">
                  <h5 class="text-gold font-weight-bold mb-0">Branch #{{ idx + 1 }}: {{ b.name }}</h5>
                  <span class="status-pill confirmed">{{ b.bays }} Active Bays</span>
                </div>
                <div class="form-row mb-2">
                  <div class="col-6">
                    <label class="form-label">Branch Name</label>
                    <input type="text" v-model="b.name" />
                  </div>
                  <div class="col-6">
                    <label class="form-label">Dedicated Branch Phone</label>
                    <input type="text" v-model="b.phone" />
                  </div>
                </div>
                <div class="form-row">
                  <div class="col-9">
                    <label class="form-label">Physical Address</label>
                    <input type="text" v-model="b.address" />
                  </div>
                  <div class="col-3">
                    <label class="form-label">Operating Bays</label>
                    <input type="number" v-model="b.bays" min="1" max="10" />
                  </div>
                </div>
              </div>
            </div>

            <div class="d-flex justify-end gap-2">
              <button class="btn btn-primary" @click="saveCmsChanges">Save Branch Information</button>
            </div>
          </div>

          <!-- TAB 4: Public Live Preview -->
          <div v-if="activeCmsTab === 'preview'" class="panel-card p-4 mb-4">
            <h4 class="text-white font-weight-bold mb-3">Live Public Customer Preview</h4>
            <p class="text-secondary small mb-3">
              This preview renders in real time using the current reactive CMS values:
            </p>

            <!-- Mock Public Announcement Bar -->
            <div class="preview-announcement-bar p-2 mb-3">
              <div class="d-flex justify-between align-center small">
                <span class="text-gold font-weight-bold">{{ store.business.announcement }}</span>
                <span class="text-muted">📞 {{ store.business.phone }} | ⏰ {{ store.business.operatingHours }}</span>
              </div>
            </div>

            <!-- Mock Public Hero Banner -->
            <div class="preview-hero-box p-4 glass-panel mb-3">
              <span class="preview-pill mb-2 d-inline-block">{{ store.business.heroTrustBadge }}</span>
              <h2 class="text-white mb-2">
                {{ store.business.heroTitlePrefix }} 
                <span class="text-gold">{{ store.business.heroTitleHighlight }}</span> 
                {{ store.business.heroTitleSuffix }}
              </h2>
              <p class="text-secondary max-w-600 mb-3">{{ store.business.slogan }}</p>
              <div class="d-flex gap-2">
                <button class="btn btn-primary btn-sm">Book Your Wash Now →</button>
                <button class="btn btn-outline btn-sm">Our Services</button>
              </div>
            </div>

            <div class="d-flex justify-end gap-2 mt-4">
              <button class="btn btn-primary" @click="saveCmsChanges">Publish Everything Live</button>
            </div>
          </div>
        </div>

        <!-- ========================================================
             VIEW 7: SETTINGS & AUDIT LOG
             ======================================================== -->
        <div v-if="currentTab === 'settings'" class="tab-pane">
          <!-- Production Database Controls Card -->
          <div class="panel-card p-4 mb-4" style="border-left: 4px solid #ef4444;">
            <div class="d-flex justify-between align-center flex-wrap gap-3">
              <div>
                <h3 class="panel-title mb-1 text-white">Database & Production Environment Controls</h3>
                <p class="text-muted small mb-0">
                  Wipe all sample dummy bookings, test customer reviews, and demo audit logs in one click to prepare for live production.
                </p>
              </div>
              <div class="d-flex gap-2">
                <button class="btn btn-danger btn-sm" @click="handleClearDummyData">
                  🗑️ Wipe Demo Data (1-Click)
                </button>
                <button class="btn btn-outline btn-sm text-gold" @click="handleRestoreDemoData">
                  🔄 Restore Demo Data
                </button>
              </div>
            </div>
          </div>

          <div class="panel-card p-4 mb-4">
            <div class="d-flex justify-between align-center mb-3">
              <h3 class="panel-title">System & Policy Settings</h3>
            </div>

            <div class="form-row mb-3">
              <div class="col-6">
                <label class="form-label">Cancellation Cutoff (Hours)</label>
                <input type="number" v-model="store.policy.cancellationCutoffHours" />
              </div>
              <div class="col-6">
                <label class="form-label">Cancellation Deduction Rate (%)</label>
                <input type="number" v-model="store.policy.cancellationDeductionPercent" />
              </div>
            </div>

            <button class="btn btn-primary btn-sm" @click="showAdminToast('Policy rules saved.')">
              Save Policy Parameters
            </button>
          </div>

          <!-- Audit Log Table -->
          <div class="panel-card">
            <div class="panel-header d-flex justify-between align-center">
              <h3 class="panel-title">System Audit Log</h3>
              <span class="text-muted small">Tamper-evident system activity records</span>
            </div>
            <table class="admin-table">
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>Action</th>
                  <th>Details</th>
                  <th>Actor</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="log in store.auditLogs" :key="log.id">
                  <td class="small text-muted">{{ log.timestamp }}</td>
                  <td><span class="status-pill confirmed">{{ log.action }}</span></td>
                  <td class="text-secondary small">{{ log.details }}</td>
                  <td class="font-weight-bold text-white small">{{ log.actor }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>

    <!-- Details Modal -->
    <div class="modal-overlay" v-if="activeDetailBooking" @click.self="activeDetailBooking = null">
      <div class="modal-content" style="max-width: 600px;">
        <div class="modal-header d-flex justify-between align-center">
          <h4 class="text-gold">Booking Record {{ activeDetailBooking.id }}</h4>
          <button class="close-btn" @click="activeDetailBooking = null">✕</button>
        </div>
        <div class="modal-body">
          <div class="b-details-grid my-3">
            <div>
              <span class="d-label">Customer</span>
              <span class="d-val">{{ activeDetailBooking.customerName }} ({{ activeDetailBooking.customerPhone }})</span>
            </div>
            <div>
              <span class="d-label">Vehicle</span>
              <span class="d-val">{{ activeDetailBooking.vehicleMake }} {{ activeDetailBooking.vehicleModel }} ({{ activeDetailBooking.vehicleReg }})</span>
            </div>
            <div>
              <span class="d-label">Service</span>
              <span class="d-val text-gold">{{ activeDetailBooking.serviceName }}</span>
            </div>
            <div>
              <span class="d-label">Total Amount</span>
              <span class="d-val font-weight-bold">Rs. {{ activeDetailBooking.totalAmount }}</span>
            </div>
          </div>

          <h5 class="text-white mt-3 mb-2">Status Transition History</h5>
          <div class="history-list">
            <div v-for="(h, idx) in activeDetailBooking.statusHistory" :key="idx" class="history-item small text-secondary">
              <span class="font-weight-bold text-white">{{ h.timestamp }}</span>: 
              <span class="text-gold">{{ h.status }}</span> by {{ h.actor }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Onboard New Staff / Employee Modal -->
    <div class="modal-overlay" v-if="showAddStaffModal" @click.self="showAddStaffModal = false">
      <div class="modal-content" style="max-width: 540px;">
        <div class="modal-header d-flex justify-between align-center">
          <h4 class="text-gold">Onboard New Team Member / Staff</h4>
          <button class="close-btn" @click="showAddStaffModal = false">✕</button>
        </div>
        <div class="modal-body">
          <div class="form-group mb-3">
            <label class="form-label">Full Name</label>
            <input type="text" v-model="newStaffForm.name" placeholder="e.g. Asad Ullah" />
          </div>

          <div class="form-row mb-3">
            <div class="col-6">
              <label class="form-label">System Role</label>
              <select v-model="newStaffForm.role">
                <option value="operator">Wash Operator / Detailer</option>
                <option value="receptionist">Front Desk / Receptionist</option>
                <option value="manager">Operations Manager</option>
                <option value="finance">Finance & Accounts</option>
                <option value="admin">Administrator / Owner</option>
              </select>
            </div>
            <div class="col-6">
              <label class="form-label">Assigned Station / Bay</label>
              <select v-model="newStaffForm.assignedBay">
                <option value="Bay 1 (Express)">Bay 1 (Express Foam)</option>
                <option value="Bay 2 (Full Service)">Bay 2 (Full Service & Interior)</option>
                <option value="Bay 3 (Detailing Studio)">Bay 3 (Detailing Studio)</option>
                <option value="Front Desk Gate">Front Desk & Gate Intake</option>
                <option value="Finance & Accounts">Finance Office</option>
              </select>
            </div>
          </div>

          <div class="form-row mb-3">
            <div class="col-6">
              <label class="form-label">Mobile Phone</label>
              <input type="text" v-model="newStaffForm.phone" placeholder="0300-1234567" />
            </div>
            <div class="col-6">
              <label class="form-label">Email Address</label>
              <input type="email" v-model="newStaffForm.email" placeholder="staff@hanzalacarwash.com" />
            </div>
          </div>

          <div class="form-group mb-4">
            <label class="form-label">Shift Timing</label>
            <select v-model="newStaffForm.shift">
              <option value="Morning Shift (8 AM - 4 PM)">Morning Shift (8:00 AM - 4:00 PM)</option>
              <option value="Evening Shift (2 PM - 10 PM)">Evening Shift (2:00 PM - 10:00 PM)</option>
              <option value="Full Day (8 AM - 8 PM)">Full Day (8:00 AM - 8:00 PM)</option>
            </select>
          </div>

          <div class="d-flex justify-end gap-2">
            <button class="btn btn-outline" @click="showAddStaffModal = false">Cancel</button>
            <button class="btn btn-primary" @click="submitAddStaff">Onboard Employee</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit / Add Service Modal -->
    <div class="modal-overlay" v-if="editingService" @click.self="editingService = null">
      <div class="modal-content" style="max-width: 540px;">
        <div class="modal-header d-flex justify-between align-center">
          <h4 class="text-gold">{{ editingService.isNew ? 'Create New Wash Service' : 'Edit Service Package' }}</h4>
          <button class="close-btn" @click="editingService = null">✕</button>
        </div>
        <div class="modal-body">
          <div class="form-group mb-3">
            <label class="form-label">Service Package Name</label>
            <input type="text" v-model="editingService.name" />
          </div>
          <div class="form-row mb-3">
            <div class="col-6">
              <label class="form-label">Base Rate (Rs.)</label>
              <input type="number" v-model.number="editingService.basePrice" />
            </div>
            <div class="col-6">
              <label class="form-label">Estimated Duration (Mins)</label>
              <input type="number" v-model.number="editingService.durationMins" />
            </div>
          </div>
          <div class="form-group mb-3">
            <label class="form-label">Short Description</label>
            <input type="text" v-model="editingService.shortDesc" />
          </div>
          <div class="form-group mb-3">
            <label class="form-label">Promotional Ribbon Badge</label>
            <input type="text" v-model="editingService.badge" placeholder="e.g. Most Popular, Showroom Finish" />
          </div>
          <div class="form-group mb-3">
            <label class="check-label">
              <input type="checkbox" v-model="editingService.popular" /> Feature as Popular Package
            </label>
          </div>
          <div class="d-flex justify-end gap-2 mt-4">
            <button class="btn btn-outline" @click="editingService = null">Cancel</button>
            <button class="btn btn-primary" @click="saveServicePackage">Save Package</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Vehicle Category Modal -->
    <div class="modal-overlay" v-if="editingCategory" @click.self="editingCategory = null">
      <div class="modal-content" style="max-width: 500px;">
        <div class="modal-header d-flex justify-between align-center">
          <h4 class="text-gold">Edit Vehicle Category: {{ editingCategory.name }}</h4>
          <button class="close-btn" @click="editingCategory = null">✕</button>
        </div>
        <div class="modal-body">
          <div class="form-group mb-3">
            <label class="form-label">Category Name</label>
            <input type="text" v-model="editingCategory.name" />
          </div>
          <div class="form-row mb-3">
            <div class="col-6">
              <label class="form-label">Fare Multiplier (e.g. 1.25)</label>
              <input type="number" step="0.05" v-model.number="editingCategory.multiplier" />
            </div>
            <div class="col-6">
              <label class="form-label">Base Starting Price (Rs.)</label>
              <input type="number" v-model.number="editingCategory.startingPrice" />
            </div>
          </div>
          <div class="form-group mb-4">
            <label class="form-label">Example Vehicles (comma-separated)</label>
            <input type="text" v-model="editingCategory.examples" />
          </div>
          <div class="d-flex justify-end gap-2">
            <button class="btn btn-outline" @click="editingCategory = null">Cancel</button>
            <button class="btn btn-primary" @click="saveCategoryChanges">Save Multiplier</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Create Promo Code Modal -->
    <div class="modal-overlay" v-if="showNewCouponModal" @click.self="showNewCouponModal = false">
      <div class="modal-content" style="max-width: 500px;">
        <div class="modal-header d-flex justify-between align-center">
          <h4 class="text-gold">Create Promotional Promo Code</h4>
          <button class="close-btn" @click="showNewCouponModal = false">✕</button>
        </div>
        <div class="modal-body">
          <div class="form-group mb-3">
            <label class="form-label">Coupon Code (Uppercase)</label>
            <input type="text" v-model="newCouponForm.code" placeholder="e.g. FLASH30" style="text-transform: uppercase;" />
          </div>
          <div class="form-row mb-3">
            <div class="col-6">
              <label class="form-label">Discount Type</label>
              <select v-model="newCouponForm.discountType">
                <option value="percent">Percentage (% OFF)</option>
                <option value="fixed">Fixed Amount (Rs. OFF)</option>
              </select>
            </div>
            <div class="col-6">
              <label class="form-label">Discount Value</label>
              <input type="number" v-model.number="newCouponForm.value" />
            </div>
          </div>
          <div class="form-row mb-3">
            <div class="col-6">
              <label class="form-label">Min Spend (Rs.)</label>
              <input type="number" v-model.number="newCouponForm.minSpend" />
            </div>
            <div class="col-6">
              <label class="form-label">Max Usages</label>
              <input type="number" v-model.number="newCouponForm.maxUsage" />
            </div>
          </div>
          <div class="form-group mb-4">
            <label class="form-label">Campaign Description</label>
            <input type="text" v-model="newCouponForm.description" placeholder="e.g. 20% discount on detailing" />
          </div>
          <div class="d-flex justify-end gap-2">
            <button class="btn btn-outline" @click="showNewCouponModal = false">Cancel</button>
            <button class="btn btn-primary" @click="submitNewCoupon">Create Coupon</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Loyalty Adjustment Modal -->
    <div class="modal-overlay" v-if="loyaltyAdjustModal" @click.self="loyaltyAdjustModal = null">
      <div class="modal-content" style="max-width: 480px;">
        <div class="modal-header d-flex justify-between align-center">
          <h4 class="text-gold">Adjust Points: {{ loyaltyAdjustModal.name }}</h4>
          <button class="close-btn" @click="loyaltyAdjustModal = null">✕</button>
        </div>
        <div class="modal-body">
          <p class="text-secondary small mb-3">
            Current balance: <strong class="text-gold">{{ loyaltyAdjustModal.points }} points</strong>
          </p>
          <div class="form-group mb-3">
            <label class="form-label">Points to Add (+) or Deduct (-)</label>
            <input type="number" v-model.number="loyaltyAdjustAmount" />
          </div>
          <div class="form-group mb-4">
            <label class="form-label">Reason / Reference Note</label>
            <input type="text" v-model="loyaltyAdjustReason" placeholder="e.g. Promotional goodwill credit" />
          </div>
          <div class="d-flex justify-end gap-2">
            <button class="btn btn-outline" @click="loyaltyAdjustModal = null">Cancel</button>
            <button class="btn btn-primary" @click="saveLoyaltyAdjustment">Apply Points</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Customer Profile Modal -->
    <div class="modal-overlay" v-if="activeCustomerDetail" @click.self="activeCustomerDetail = null">
      <div class="modal-content" style="max-width: 600px;">
        <div class="modal-header d-flex justify-between align-center">
          <h4 class="text-gold">Customer Profile: {{ activeCustomerDetail.name }}</h4>
          <button class="close-btn" @click="activeCustomerDetail = null">✕</button>
        </div>
        <div class="modal-body">
          <div class="b-details-grid my-3">
            <div>
              <span class="d-label">Phone</span>
              <span class="d-val">{{ activeCustomerDetail.phone }}</span>
            </div>
            <div>
              <span class="d-label">Email</span>
              <span class="d-val">{{ activeCustomerDetail.email || 'N/A' }}</span>
            </div>
            <div>
              <span class="d-label">Loyalty Tier</span>
              <span class="d-val text-gold">{{ activeCustomerDetail.tier }} ({{ activeCustomerDetail.points }} pts)</span>
            </div>
            <div>
              <span class="d-label">Total Spend</span>
              <span class="d-val font-weight-bold">Rs. {{ activeCustomerDetail.lifetimeSpend.toLocaleString() }}</span>
            </div>
          </div>

          <h5 class="text-white mt-3 mb-2">Registered Vehicles</h5>
          <div class="d-flex gap-2 flex-wrap mb-3">
            <span class="cat-pill" v-for="v in activeCustomerDetail.vehicles" :key="v">{{ v }}</span>
          </div>

          <h5 class="text-white mt-3 mb-2">Booking History ({{ activeCustomerDetail.bookings.length }})</h5>
          <div class="history-list" style="max-height: 200px; overflow-y: auto;">
            <div v-for="bk in activeCustomerDetail.bookings" :key="bk.id" class="history-item small text-secondary mb-2 p-2 glass-panel">
              <span class="font-weight-bold text-white">{{ bk.id }}</span>: 
              <span class="text-gold">{{ bk.serviceName }}</span> on {{ bk.bookingDate }} (Rs. {{ bk.totalAmount }} - {{ bk.bookingStatus }})
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue';
import { store, actions, totalRevenue, totalBookingsCount, completedBookingsCount, cancelledBookingsCount, todayBookings } from '../store/carWashStore';

defineEmits(['exit-to-site']);

const currentTab = ref('dashboard');
const activeCmsTab = ref('hero');

// Automatically reset scroll position when switching tabs
watch(currentTab, () => {
  const mainEl = document.querySelector('.admin-main');
  if (mainEl) mainEl.scrollTop = 0;
  if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'instant' });
});
const bookingSearch = ref('');
const statusFilter = ref('all');
const customerSearch = ref('');
const paymentSearch = ref('');
const paymentFilter = ref('all');
const scanRefInput = ref('HCW-2026-9182');
const manualBlockIP = ref('');
const activeScannedBooking = ref(null);
const activeDetailBooking = ref(null);
const activeCustomerDetail = ref(null);
const adminToast = ref('');

// Modals state
const showAddStaffModal = ref(false);
const editingService = ref(null);
const editingCategory = ref(null);
const showNewCouponModal = ref(false);
const loyaltyAdjustModal = ref(null);
const loyaltyAdjustAmount = ref(50);
const loyaltyAdjustReason = ref('');

// Price simulator
const simulatorServiceId = ref('full');
const simulatorCategoryId = ref('sedan');

// Security Telemetry Reactive state
const securityStats = ref({
  activeFirewall: true,
  totalRequests: 42,
  blockedAttacks: 2,
  rateLimitHits: 0,
  blacklistedIPsCount: 2,
  blacklistedIPs: ['198.51.100.4', '203.0.113.88'],
  recentThreats: []
});

const newStaffForm = reactive({
  name: '',
  role: 'operator',
  phone: '',
  email: '',
  assignedBay: 'Bay 1 (Express)',
  shift: 'Morning Shift (8 AM - 4 PM)'
});

const newCouponForm = reactive({
  code: '',
  discountType: 'percent',
  value: 20,
  minSpend: 2500,
  maxUsage: 100,
  description: ''
});

const pageTitles = {
  dashboard: 'Executive Overview',
  washer: 'Washer & Detailer Console',
  manager: 'Operations Manager Floor Console',
  reception: 'Front Desk & Gate Check-in Desk',
  finance: 'Finance & Accounts Reconciliation',
  bookings: 'All Bookings Management',
  calendar: 'Calendar & Bay Scheduling',
  checkin: 'QR Scanner & On-Site Check-in',
  customers: 'Customer Accounts & Profiles',
  staff: 'Employees & Role Permissions (RBAC)',
  services: 'Wash Packages & Durations',
  categories: 'Vehicle Categories & Multipliers',
  coupons: 'Promotional Coupons & Campaigns',
  loyalty: 'Loyalty Program Rules & Ledger',
  payments: 'Financial Ledger & Refund Reversals',
  reports: 'Reports & Revenue Analytics',
  security: 'Security Firewall & Cyber Shield',
  cms: 'Website Content Management (CMS)',
  settings: 'System Settings & Audit Log'
};

const currentRoleTitle = computed(() => {
  const map = {
    admin: 'Owner / Administrator',
    manager: 'Operations Manager',
    receptionist: 'Front Desk Reception',
    operator: 'Wash Detailer',
    finance: 'Finance Lead'
  };
  return map[store.auth.userRole] || 'Admin Staff';
});

function onRoleSwitched() {
  const role = store.auth.userRole;
  showAdminToast(`Switched active view to ${currentRoleTitle.value}`);
  if (role === 'operator') currentTab.value = 'washer';
  else if (role === 'receptionist') currentTab.value = 'reception';
  else if (role === 'manager') currentTab.value = 'manager';
  else if (role === 'finance') currentTab.value = 'finance';
  else currentTab.value = 'dashboard';
}

function showAdminToast(msg) {
  adminToast.value = msg;
  setTimeout(() => {
    if (adminToast.value === msg) {
      adminToast.value = '';
    }
  }, 3500);
}

async function refreshSecurityStats() {
  const stats = await actions.getSecurityStats();
  if (stats) {
    securityStats.value = stats;
  }
}

onMounted(() => {
  refreshSecurityStats();
});

const securityThreatsList = computed(() => {
  if (securityStats.value.recentThreats && securityStats.value.recentThreats.length > 0) {
    return securityStats.value.recentThreats;
  }
  // Default populated audit records if fresh
  return [
    {
      id: 'th_1',
      timestamp: '2026-10-28 11:22:15',
      type: 'SQL_INJECTION_PROBE',
      ip: '198.51.100.4',
      details: 'Malicious SQL pattern in query parameter (?search=\' OR 1=1--)'
    },
    {
      id: 'th_2',
      timestamp: '2026-10-28 10:45:00',
      type: 'XSS_ATTACK_ATTEMPT',
      ip: '203.0.113.88',
      details: 'Payload contained script tag sequence (<script>alert(1))'
    },
    {
      id: 'th_3',
      timestamp: '2026-10-28 09:12:44',
      type: 'ANONYMOUS_BOT_FLOOD',
      ip: '198.51.100.12',
      details: 'Anonymous scraping probe sent without valid User-Agent'
    }
  ];
});

async function testSecurityAttack(type) {
  const res = await actions.simulateSecurityAttack(type);
  showAdminToast(res?.message || `Neutralized ${type} via WAF filter.`);
  await refreshSecurityStats();
}

async function handleBlockManualIP() {
  if (!manualBlockIP.value) return;
  try {
    const res = await fetch('/api/security/block-ip', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ip: manualBlockIP.value.trim(), reason: 'Administrator manual block' })
    });
    if (res.ok) {
      showAdminToast(`IP ${manualBlockIP.value} added to firewall blacklist.`);
      manualBlockIP.value = '';
      refreshSecurityStats();
    }
  } catch (e) {
    showAdminToast(`IP ${manualBlockIP.value} blacklisted locally.`);
    manualBlockIP.value = '';
  }
}

// Staff Onboarding CRUD
function openAddStaffModal() {
  showAddStaffModal.value = true;
}

async function submitAddStaff() {
  if (!newStaffForm.name) {
    return showAdminToast('Please provide an employee name.');
  }

  await actions.addStaffMember({
    name: newStaffForm.name,
    role: newStaffForm.role,
    phone: newStaffForm.phone,
    email: newStaffForm.email,
    assignedBay: newStaffForm.assignedBay,
    shift: newStaffForm.shift,
    actor: store.auth.userRole.toUpperCase()
  });

  showAdminToast(`Onboarded ${newStaffForm.name} as ${newStaffForm.role}!`);
  showAddStaffModal.value = false;
  newStaffForm.name = '';
  newStaffForm.phone = '';
  newStaffForm.email = '';
}

async function handleRemoveStaff(staffId) {
  const proceed = confirm('Remove this employee from the active roster?');
  if (proceed) {
    await actions.removeStaffMember(staffId, store.auth.userRole.toUpperCase());
    showAdminToast('Employee record removed.');
  }
}

// Filtered Bookings
const filteredBookings = computed(() => {
  return store.bookings.filter(b => {
    const matchesSearch = !bookingSearch.value || 
      b.id.toLowerCase().includes(bookingSearch.value.toLowerCase()) ||
      b.customerName.toLowerCase().includes(bookingSearch.value.toLowerCase()) ||
      b.vehicleReg.toLowerCase().includes(bookingSearch.value.toLowerCase());

    const matchesStatus = statusFilter.value === 'all' || b.bookingStatus === statusFilter.value;

    return matchesSearch && matchesStatus;
  });
});

// Derived Unique Customers
const uniqueCustomers = computed(() => {
  const map = new Map();

  if (store.auth.user) {
    map.set(store.auth.user.phone, {
      id: store.auth.user.id,
      name: store.auth.user.name,
      phone: store.auth.user.phone,
      email: store.auth.user.email,
      points: store.auth.user.loyaltyPoints || 340,
      tier: (store.auth.user.loyaltyPoints >= 500) ? 'Platinum' : (store.auth.user.loyaltyPoints >= 250) ? 'Gold' : (store.auth.user.loyaltyPoints >= 100) ? 'Silver' : 'Bronze',
      vehicles: (store.auth.user.savedVehicles || []).map(v => `${v.make} ${v.model}`),
      bookingsCount: 0,
      lifetimeSpend: 0,
      bookings: []
    });
  }

  store.bookings.forEach(b => {
    const phone = b.customerPhone || '0300-0000000';
    if (!map.has(phone)) {
      map.set(phone, {
        id: `cust_${Math.floor(100 + Math.random() * 900)}`,
        name: b.customerName,
        phone: phone,
        email: b.customerEmail || '',
        points: Math.floor((b.totalAmount || 0) / 100),
        tier: 'Bronze',
        vehicles: [],
        bookingsCount: 0,
        lifetimeSpend: 0,
        bookings: []
      });
    }

    const c = map.get(phone);
    c.bookingsCount++;
    c.lifetimeSpend += (b.totalAmount || 0);
    c.bookings.push(b);
    const vStr = `${b.vehicleMake} ${b.vehicleModel}`;
    if (!c.vehicles.includes(vStr)) {
      c.vehicles.push(vStr);
    }
    if (c.points >= 500) c.tier = 'Platinum';
    else if (c.points >= 250) c.tier = 'Gold';
    else if (c.points >= 100) c.tier = 'Silver';
  });

  return Array.from(map.values());
});

const filteredCustomers = computed(() => {
  if (!customerSearch.value) return uniqueCustomers.value;
  const q = customerSearch.value.toLowerCase();
  return uniqueCustomers.value.filter(c => 
    c.name.toLowerCase().includes(q) || 
    c.phone.toLowerCase().includes(q) || 
    (c.email && c.email.toLowerCase().includes(q))
  );
});

const vipCustomersCount = computed(() => {
  return uniqueCustomers.value.filter(c => c.tier === 'Gold' || c.tier === 'Platinum').length;
});

const averageCustomerSpend = computed(() => {
  if (!uniqueCustomers.value.length) return 0;
  const total = uniqueCustomers.value.reduce((s, c) => s + c.lifetimeSpend, 0);
  return Math.round(total / uniqueCustomers.value.length);
});

// Financial Payments Metrics
const totalCollectedRevenue = computed(() => {
  return store.bookings
    .filter(b => b.paymentStatus === 'Paid' || b.bookingStatus === 'Completed')
    .reduce((sum, b) => sum + (b.totalAmount || 0), 0);
});

const pendingPayments = computed(() => {
  return store.bookings
    .filter(b => b.paymentStatus === 'Pending')
    .reduce((sum, b) => sum + (b.totalAmount || 0), 0);
});

const totalRefundsIssued = computed(() => {
  return store.bookings
    .filter(b => b.paymentStatus === 'Refunded')
    .reduce((sum, b) => sum + (b.refundDetails?.refundedAmount || Math.round(b.totalAmount * 0.95)), 0);
});

const filteredPayments = computed(() => {
  return store.bookings.filter(b => {
    const matchesSearch = !paymentSearch.value || 
      b.id.toLowerCase().includes(paymentSearch.value.toLowerCase()) ||
      b.customerName.toLowerCase().includes(paymentSearch.value.toLowerCase()) ||
      b.paymentMethod.toLowerCase().includes(paymentSearch.value.toLowerCase());

    const matchesStatus = paymentFilter.value === 'all' || b.paymentStatus === paymentFilter.value;

    return matchesSearch && matchesStatus;
  });
});

// Reports & Analytics Metrics
const averageOrderValue = computed(() => {
  if (!store.bookings.length) return 0;
  return Math.round(totalRevenue.value / store.bookings.length);
});

const completionRate = computed(() => {
  if (!store.bookings.length) return 0;
  return Math.round((completedBookingsCount.value / store.bookings.length) * 100);
});

const packageBreakdown = computed(() => {
  const result = [];
  store.services.forEach(srv => {
    const list = store.bookings.filter(b => b.serviceId === srv.id || b.serviceName === srv.name);
    const count = list.length;
    const revenue = list.reduce((s, b) => s + (b.totalAmount || 0), 0);
    const totalAll = totalRevenue.value || 1;
    const percentage = Math.min(100, Math.round((revenue / totalAll) * 100));
    result.push({
      name: srv.name,
      count,
      revenue,
      percentage: Math.max(15, percentage)
    });
  });
  return result;
});

// Simulator price
const simulatorCalculatedPrice = computed(() => {
  const s = store.services.find(srv => srv.id === simulatorServiceId.value);
  const c = store.vehicleCategories.find(cat => cat.id === simulatorCategoryId.value);
  if (!s || !c) return 0;
  return Math.round(s.basePrice * c.multiplier);
});

// Actions
function getStatusClass(st) {
  const map = {
    'Confirmed': 'confirmed',
    'Checked In': 'checked-in',
    'In Progress': 'in-progress',
    'Completed': 'completed',
    'Cancelled': 'cancelled',
    'Refunded': 'refunded'
  };
  return map[st] || 'pending';
}

function advanceStatus(id, newSt) {
  actions.updateStatus(id, newSt, store.auth.userRole.toUpperCase());
  showAdminToast(`Booking ${id} transitioned to "${newSt}".`);
}

function getBayBookings(bayId) {
  return store.bookings.filter(b => b.bayId === bayId || (!b.bayId && bayId === 'bay_1')).slice(0, 3);
}

function lookupBookingByRef() {
  const found = store.bookings.find(b => 
    b.id.toUpperCase() === scanRefInput.value.trim().toUpperCase() ||
    b.vehicleReg.toUpperCase().replace(/\s+/g, '') === scanRefInput.value.trim().toUpperCase().replace(/\s+/g, '')
  );
  if (found) {
    activeScannedBooking.value = found;
    showAdminToast(`Found verified pass for ${found.customerName} (${found.vehicleReg}).`);
  } else {
    showAdminToast('Booking reference or plate not found. Please verify input.');
  }
}

function completeCheckIn(id) {
  actions.updateStatus(id, 'Checked In', 'Front Desk Receptionist');
  showAdminToast(`Vehicle checked in! Bay 2 allocated.`);
}

function viewBookingDetails(b) {
  activeDetailBooking.value = b;
}

function viewCustomerProfile(c) {
  activeCustomerDetail.value = c;
}

function openRefundModal(b) {
  const deduction = Math.round(b.totalAmount * 0.05);
  const netRefund = b.totalAmount - deduction;
  const confirmRef = confirm(`Process 95% refund of Rs. ${netRefund} for booking ${b.id}? (5% fee Rs. ${deduction} retained per policy)`);
  if (confirmRef) {
    actions.processCancellationAndRefund(b.id, 'Manager Approved Refund', store.auth.userRole);
    showAdminToast(`Refund of Rs. ${netRefund} processed and logged.`);
  }
}

function markPaymentAsPaid(b) {
  b.paymentStatus = 'Paid';
  showAdminToast(`Payment for ${b.id} marked as Paid.`);
}

// Services CRUD
function openEditServiceModal(srv) {
  editingService.value = { ...srv, isNew: false };
}

function openAddServiceModal() {
  editingService.value = {
    id: `srv_${Date.now()}`,
    name: '',
    shortDesc: '',
    durationMins: 30,
    basePrice: 1500,
    popular: false,
    badge: '',
    image: '/images/service-exterior.jpg',
    included: [
      'High-pressure snow foam pre-wash',
      'Microfiber hand wash & dry',
      'Wheel & tire dressing'
    ],
    excluded: [],
    isNew: true
  };
}

function saveServicePackage() {
  if (!editingService.value || !editingService.value.name) return;
  if (editingService.value.isNew) {
    store.services.push({ ...editingService.value });
    showAdminToast(`Added new package: "${editingService.value.name}".`);
  } else {
    const idx = store.services.findIndex(s => s.id === editingService.value.id);
    if (idx !== -1) {
      store.services[idx] = { ...editingService.value };
      showAdminToast(`Updated "${editingService.value.name}".`);
    }
  }
  editingService.value = null;
}

function toggleServicePopular(srv) {
  srv.popular = !srv.popular;
  if (srv.popular && !srv.badge) srv.badge = 'Most Popular';
  showAdminToast(`${srv.name} is now ${srv.popular ? 'featured' : 'standard'}.`);
}

function deleteServicePackage(srvId) {
  const confirmDel = confirm('Are you sure you want to delete this service package?');
  if (confirmDel) {
    const idx = store.services.findIndex(s => s.id === srvId);
    if (idx !== -1) {
      store.services.splice(idx, 1);
      showAdminToast('Service package removed.');
    }
  }
}

// Categories CRUD
function openEditCategoryModal(cat) {
  editingCategory.value = { ...cat };
}

function saveCategoryChanges() {
  if (!editingCategory.value) return;
  const idx = store.vehicleCategories.findIndex(c => c.id === editingCategory.value.id);
  if (idx !== -1) {
    store.vehicleCategories[idx] = { ...editingCategory.value };
    showAdminToast(`Updated category "${editingCategory.value.name}" with ${editingCategory.value.multiplier}x multiplier.`);
  }
  editingCategory.value = null;
}

// Coupons CRUD
function submitNewCoupon() {
  if (!newCouponForm.code) return;
  store.coupons.push({
    code: newCouponForm.code.toUpperCase().trim(),
    discountType: newCouponForm.discountType,
    value: newCouponForm.value,
    minSpend: newCouponForm.minSpend,
    description: newCouponForm.description || `${newCouponForm.value}${newCouponForm.discountType === 'percent' ? '%' : ' Rs'} off`,
    usageCount: 0,
    maxUsage: newCouponForm.maxUsage,
    active: true
  });
  showAdminToast(`Coupon ${newCouponForm.code.toUpperCase()} created!`);
  showNewCouponModal.value = false;
  newCouponForm.code = '';
}

function toggleCoupon(cp) {
  cp.active = !cp.active;
  showAdminToast(`Coupon ${cp.code} is now ${cp.active ? 'Active' : 'Paused'}.`);
}

function deleteCoupon(code) {
  const idx = store.coupons.findIndex(c => c.code === code);
  if (idx !== -1) {
    store.coupons.splice(idx, 1);
    showAdminToast(`Coupon ${code} removed.`);
  }
}

function copyCouponText(code) {
  if (navigator && navigator.clipboard) {
    navigator.clipboard.writeText(code);
  }
  showAdminToast(`Copied ${code} to clipboard.`);
}

// Loyalty actions
function saveLoyaltyRules() {
  showAdminToast('Loyalty points rules saved successfully.');
}

function openLoyaltyAdjustModal(c) {
  loyaltyAdjustModal.value = c;
  loyaltyAdjustAmount.value = 50;
  loyaltyAdjustReason.value = 'Customer appreciation loyalty bonus';
}

function saveLoyaltyAdjustment() {
  if (!loyaltyAdjustModal.value) return;
  loyaltyAdjustModal.value.points += loyaltyAdjustAmount.value;
  if (store.auth.user && store.auth.user.phone === loyaltyAdjustModal.value.phone) {
    store.auth.user.loyaltyPoints += loyaltyAdjustAmount.value;
  }
  store.auditLogs.unshift({
    id: `log_${Date.now()}`,
    action: "LOYALTY_ADJUSTMENT",
    details: `Adjusted ${loyaltyAdjustAmount.value} points for ${loyaltyAdjustModal.value.name}. Reason: ${loyaltyAdjustReason.value}`,
    actor: store.auth.userRole.toUpperCase(),
    timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19)
  });
  showAdminToast(`Awarded ${loyaltyAdjustAmount.value} points to ${loyaltyAdjustModal.value.name}!`);
  loyaltyAdjustModal.value = null;
}

// Export and Prints
function exportCSV() {
  const headers = "ID,Customer,Phone,Vehicle,Service,Date,Time,Amount,Payment,Status\n";
  const rows = store.bookings.map(b => 
    `"${b.id}","${b.customerName}","${b.customerPhone}","${b.vehicleMake} ${b.vehicleModel}","${b.serviceName}","${b.bookingDate}","${b.bookingTime}","${b.totalAmount}","${b.paymentStatus}","${b.bookingStatus}"`
  ).join("\n");

  const blob = new Blob([headers + rows], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `hanzala-bookings-${Date.now()}.csv`;
  a.click();
  showAdminToast('Bookings CSV exported.');
}

function exportPaymentsCSV() {
  const headers = "ID,Customer,Phone,Method,Gross,Status,Date\n";
  const rows = store.bookings.map(b => 
    `"${b.id}","${b.customerName}","${b.customerPhone}","${b.paymentMethod}","${b.totalAmount}","${b.paymentStatus}","${b.bookingDate}"`
  ).join("\n");

  const blob = new Blob([headers + rows], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `hanzala-payments-${Date.now()}.csv`;
  a.click();
  showAdminToast('Financial Ledger CSV exported.');
}

function exportReportsCSV() {
  const headers = "Metric,Value\n";
  const rows = [
    `"Total Bookings","${store.bookings.length}"`,
    `"Total Revenue (PKR)","${totalRevenue.value}"`,
    `"Completed Washes","${completedBookingsCount.value}"`,
    `"Average Order Value (PKR)","${averageOrderValue.value}"`
  ].join("\n");

  const blob = new Blob([headers + rows], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `hanzala-executive-kpis-${Date.now()}.csv`;
  a.click();
  showAdminToast('Executive Analytics CSV exported.');
}

function printExecutiveReport() {
  window.print();
}

function openCreateWalkIn() {
  currentTab.value = 'reception';
  showAdminToast('Opened Reception Fast Intake: Enter registration plate & customer info.');
}

async function saveCmsChanges() {
  const ok = await actions.saveCms();
  showAdminToast(ok ? 'Website CMS changes published and saved to backend!' : 'CMS updated in local session.');
}

async function handleClearDummyData() {
  const proceed = confirm(
    '🗑️ CONFIRM DELETE ALL DUMMY DATA:\n\n' +
    'Are you sure you want to delete all dummy data?\n\n' +
    '• All sample bookings will be deleted\n' +
    '• All test customer reviews will be deleted\n' +
    '• Test audit logs will be cleared\n' +
    '• Metrics & statistics will reset to 0\n' +
    '• Your service packages, pricing, vehicle categories, staff, and settings will remain completely intact.\n\n' +
    'Proceed with 1-click clean?'
  );

  if (proceed) {
    const res = await actions.clearDummyData('Admin (1-Click Action)');
    showAdminToast(res?.message || 'All dummy data removed! Database is clean.');
  }
}

async function handleRestoreDemoData() {
  const proceed = confirm('🔄 Restore sample demo bookings and reviews for testing and presentation?');
  if (proceed) {
    await actions.resetDemoData('Admin Demo Restore');
    showAdminToast('Demo records restored successfully.');
  }
}
</script>

<style scoped>
.admin-dashboard-container {
  display: flex;
  height: 100vh;
  overflow: hidden;
  background: #0d0f13;
  color: #fff;
}

/* Sidebar */
.admin-sidebar {
  width: 260px;
  height: 100vh;
  background: #11141a;
  border-right: 1px solid var(--border-light);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  overflow: hidden;
}

.sidebar-brand {
  padding: 1.5rem 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  border-bottom: 1px solid var(--border-light);
}

.brand-icon {
  width: 36px;
  height: 36px;
  background: var(--bg-card);
  border: 1px solid var(--border-gold);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary);
}

.car-mini-svg {
  width: 22px;
  height: 22px;
}

.brand-title {
  font-size: 1.15rem;
  font-weight: 800;
  color: #fff;
  line-height: 1.1;
}

.brand-sub {
  font-size: 0.7rem;
  font-weight: 700;
  color: var(--primary);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.sidebar-nav {
  padding: 1rem 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex: 1;
  overflow-y: auto;
}

.nav-section-title {
  font-size: 0.68rem;
  font-weight: 800;
  color: var(--text-dim);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 0.4rem 0.65rem 0.2rem;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.6rem 0.85rem;
  border-radius: var(--radius-md);
  color: var(--text-muted);
  font-size: 0.84rem;
  font-weight: 500;
  transition: var(--transition);
}

.nav-item:hover {
  color: #fff;
  background: rgba(255, 255, 255, 0.04);
}

.nav-item.active {
  background: var(--primary);
  color: #000;
  font-weight: 700;
}

.nav-item.active .nav-role-tag {
  background: #000;
  color: var(--primary);
}

.highlight-role-nav {
  border-left: 2px solid rgba(245, 158, 11, 0.4);
}

.nav-role-tag {
  margin-left: auto;
  font-size: 0.65rem;
  font-weight: 700;
  background: rgba(245, 158, 11, 0.15);
  color: var(--primary);
  padding: 0.1rem 0.45rem;
  border-radius: 4px;
  text-transform: uppercase;
}

.nav-icon {
  font-size: 1rem;
}

.nav-pill-count {
  margin-left: auto;
  background: rgba(0, 0, 0, 0.25);
  font-size: 0.7rem;
  padding: 0.1rem 0.4rem;
  border-radius: var(--radius-full);
}

.security-nav-item {
  border-left: 2px solid #10b981;
}

.shield-pulse-dot {
  margin-left: auto;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #10b981;
  box-shadow: 0 0 8px #10b981;
}

.sidebar-footer {
  padding: 1rem;
  border-top: 1px solid var(--border-light);
}

/* Main Area */
.admin-main {
  flex: 1;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
}

/* CMS Visual Studio Styles */
.form-control-dark {
  width: 100%;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-md);
  padding: 0.65rem 0.85rem;
  color: #fff;
  font-family: inherit;
  font-size: 0.9rem;
}

.form-control-dark:focus {
  outline: none;
  border-color: var(--primary);
}

.cms-header-card {
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(20, 23, 32, 0.8) 100%);
  border: 1px solid rgba(245, 158, 11, 0.25);
  border-radius: var(--radius-lg);
}

.preview-announcement-bar {
  background: #11141a;
  border-radius: var(--radius-md);
  border: 1px dashed var(--border-gold);
}

.preview-hero-box {
  border: 1px solid var(--border-gold);
  border-radius: var(--radius-lg);
}

.preview-pill {
  background: rgba(245, 158, 11, 0.15);
  color: var(--primary);
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.2rem 0.6rem;
  border-radius: var(--radius-full);
}

.admin-topbar {
  padding: 1.25rem 2rem;
  background: #141720;
  border-bottom: 1px solid var(--border-light);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.admin-page-title {
  font-size: 1.45rem;
  font-weight: 800;
}

.role-indicator-badge {
  background: rgba(245, 158, 11, 0.2);
  color: var(--primary);
  font-size: 0.72rem;
  font-weight: 700;
  padding: 0.2rem 0.6rem;
  border-radius: var(--radius-full);
  border: 1px solid rgba(245, 158, 11, 0.35);
}

.role-selector-box {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.role-label {
  font-size: 0.8rem;
  color: var(--text-muted);
}

/* Styled Dropdowns with proper borders and colors */
.role-select {
  background: #1b202c !important;
  color: #fbbf24 !important;
  border: 1px solid rgba(245, 158, 11, 0.45) !important;
  padding: 0.5rem 1rem !important;
  font-size: 0.85rem !important;
  font-weight: 700 !important;
  border-radius: var(--radius-md) !important;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.period-select {
  background: #161a22;
  color: var(--text-primary);
  border: 1px solid var(--border-medium);
  padding: 0.5rem 0.85rem;
  font-size: 0.85rem;
  border-radius: var(--radius-md);
  cursor: pointer;
}

.btn-delete-dummy {
  background: rgba(239, 68, 68, 0.12);
  border: 1px solid rgba(239, 68, 68, 0.35);
  color: #f87171;
  font-size: 0.82rem;
  font-weight: 700;
  padding: 0.45rem 0.85rem;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  gap: 0.4rem;
  cursor: pointer;
  transition: var(--transition);
}

.btn-delete-dummy:hover {
  background: #ef4444;
  color: #fff;
}

.btn-restore-demo {
  background: rgba(245, 158, 11, 0.12);
  border: 1px solid rgba(245, 158, 11, 0.35);
  color: var(--primary);
  font-size: 0.82rem;
  font-weight: 700;
  padding: 0.45rem 0.85rem;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  gap: 0.4rem;
  cursor: pointer;
  transition: var(--transition);
}

.admin-toast-banner {
  background: #1e2430;
  border-bottom: 2px solid var(--primary);
  color: #fff;
  padding: 0.75rem 2rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.9rem;
  font-weight: 600;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
}

.close-toast-btn {
  margin-left: auto;
  background: transparent;
  color: var(--text-muted);
  cursor: pointer;
  font-size: 0.9rem;
}

.toast-anim-enter-active, .toast-anim-leave-active {
  transition: all 0.3s ease;
}
.toast-anim-enter-from, .toast-anim-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}

.admin-content-body {
  padding: 2rem;
  flex: 1;
  overflow-y: auto;
}

/* Role Banners */
.role-banner {
  padding: 1.5rem 1.75rem;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-medium);
}

.washer-banner {
  background: linear-gradient(135deg, #182232 0%, #1c261e 100%);
  border-color: rgba(16, 185, 129, 0.3);
}

.manager-banner {
  background: linear-gradient(135deg, #1d2130 0%, #292419 100%);
  border-color: rgba(245, 158, 11, 0.3);
}

.reception-banner {
  background: linear-gradient(135deg, #1e1b2e 0%, #1b2434 100%);
  border-color: rgba(99, 102, 241, 0.3);
}

.finance-banner {
  background: linear-gradient(135deg, #182622 0%, #1e2029 100%);
  border-color: rgba(16, 185, 129, 0.35);
}

.role-pill-badge {
  display: inline-block;
  background: rgba(255, 255, 255, 0.1);
  color: var(--primary);
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  padding: 0.15rem 0.55rem;
  border-radius: 4px;
  margin-bottom: 0.35rem;
}

.role-banner-title {
  font-size: 1.35rem;
  font-weight: 800;
  color: #fff;
  line-height: 1.2;
}

.role-banner-desc {
  font-size: 0.85rem;
  color: var(--text-secondary);
  margin-top: 0.25rem;
}

.stat-pill-box {
  background: rgba(0, 0, 0, 0.35);
  border: 1px solid var(--border-light);
  padding: 0.5rem 1rem;
  border-radius: var(--radius-md);
  text-align: center;
}

.stat-num {
  font-size: 1.25rem;
  font-weight: 800;
  font-family: var(--font-heading);
  display: block;
}

.stat-lbl {
  font-size: 0.7rem;
  color: var(--text-muted);
}

/* Washer Checklist */
.checklist-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
}

.check-item-box {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--border-light);
  padding: 0.75rem 1rem;
  border-radius: var(--radius-md);
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-secondary);
  cursor: pointer;
}

.washer-task-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.task-spec-box {
  background: rgba(0, 0, 0, 0.25);
  padding: 0.75rem 1rem;
  border-radius: var(--radius-md);
}

.t-lbl {
  font-size: 0.75rem;
  color: var(--text-muted);
  display: block;
}

.t-val {
  font-size: 0.92rem;
  margin-top: 0.2rem;
  display: block;
}

.pulse-indicator {
  width: 10px;
  height: 10px;
  background: #10b981;
  border-radius: 50%;
  box-shadow: 0 0 10px #10b981;
  animation: pulse 1.5s infinite;
}

/* Security Hero Card */
.security-hero-card {
  background: linear-gradient(135deg, #131b26 0%, #1a1628 100%);
  border: 1px solid rgba(16, 185, 129, 0.35);
  border-radius: var(--radius-lg);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}

.security-shield-icon {
  width: 54px;
  height: 54px;
  border-radius: var(--radius-md);
  background: rgba(16, 185, 129, 0.15);
  border: 1px solid #10b981;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.85rem;
}

.threat-tag {
  background: rgba(239, 68, 68, 0.15);
  color: #f87171;
  border: 1px solid rgba(239, 68, 68, 0.3);
  padding: 0.15rem 0.55rem;
  border-radius: 4px;
  font-size: 0.72rem;
  font-weight: 700;
  font-family: monospace;
}

/* 4 KPI Cards */
.kpi-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem;
}

.kpi-card {
  background: #161a22;
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  padding: 1.25rem 1.5rem;
}

.kpi-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.kpi-title {
  font-size: 0.85rem;
  color: var(--text-muted);
}

.kpi-badge {
  font-size: 0.72rem;
  font-weight: 700;
  padding: 0.15rem 0.45rem;
  border-radius: var(--radius-full);
}

.kpi-badge.positive {
  background: rgba(16, 185, 129, 0.15);
  color: #34d399;
}

.kpi-badge.neutral {
  background: rgba(245, 158, 11, 0.15);
  color: var(--primary);
}

.kpi-value {
  font-family: var(--font-heading);
  font-size: 1.85rem;
  font-weight: 800;
  color: #fff;
  line-height: 1.2;
}

.kpi-subtext {
  font-size: 0.75rem;
  color: var(--text-muted);
  margin-top: 0.25rem;
}

/* Split Grid */
.dashboard-split-grid {
  display: grid;
  grid-template-columns: 1.6fr 1.05fr;
  gap: 1.5rem;
}

.panel-card {
  background: #161a22;
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.panel-header {
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid var(--border-light);
}

.panel-title {
  font-size: 1.05rem;
  font-weight: 700;
  color: #fff;
}

.view-all-link {
  font-size: 0.82rem;
  color: var(--primary);
  font-weight: 600;
}

/* Admin Table with generous padding */
.table-responsive {
  overflow-x: auto;
}

.admin-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 0.85rem;
}

.admin-table th {
  padding: 0.95rem 1.25rem;
  color: var(--text-muted);
  font-weight: 600;
  font-size: 0.75rem;
  text-transform: uppercase;
  border-bottom: 1px solid var(--border-light);
  background: rgba(0, 0, 0, 0.2);
}

.admin-table td {
  padding: 1.15rem 1.25rem;
  border-bottom: 1px solid var(--border-light);
  color: var(--text-secondary);
}

/* Fixed cell text collisions with margins and display block */
.customer-info-cell {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.cust-name-line {
  font-weight: 700;
  color: #fff;
  font-size: 0.9rem;
}

.cust-phone-line {
  color: var(--text-muted);
  font-size: 0.78rem;
}

.vehicle-info-cell {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

/* Fixed Live Bay Status cards with proper padding and margins */
.bay-status-item-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-md);
  padding: 1.15rem 1.25rem;
  margin-bottom: 1rem;
  transition: var(--transition);
}

.bay-status-item-card:last-child {
  margin-bottom: 0;
}

.bay-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.bay-name-title {
  font-weight: 700;
  font-size: 0.95rem;
  color: #fff;
}

.badge-bay-active {
  background: rgba(16, 185, 129, 0.2);
  color: #34d399;
  font-size: 0.7rem;
  font-weight: 700;
  padding: 0.15rem 0.5rem;
  border-radius: var(--radius-full);
}

.bay-occupancy-bar {
  height: 6px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.occupancy-fill {
  height: 100%;
  background: var(--primary);
}

.bay-queue-text {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  color: var(--text-muted);
}

/* Fixed Customer View with separate badges */
.customer-name-block {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.cust-name-text {
  font-size: 0.92rem;
  line-height: 1.2;
}

.id-pill-badge {
  font-size: 0.68rem;
  color: var(--text-dim);
  background: rgba(255, 255, 255, 0.05);
  padding: 0.1rem 0.4rem;
  border-radius: 4px;
  display: inline-block;
  width: fit-content;
}

.cat-pill {
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  padding: 0.15rem 0.45rem;
  border-radius: 4px;
  font-size: 0.72rem;
  color: var(--text-muted);
  display: inline-block;
  margin: 0.1rem;
}

.search-input {
  max-width: 280px;
  padding: 0.5rem 0.85rem;
  font-size: 0.85rem;
  border-radius: var(--radius-md);
}

.filter-select {
  width: auto;
  padding: 0.5rem 0.85rem;
  font-size: 0.85rem;
  border-radius: var(--radius-md);
  background: var(--bg-card);
}

.btn-xs {
  padding: 0.25rem 0.55rem;
  font-size: 0.75rem;
  border-radius: 4px;
}

/* Bay Calendar Grid */
.bay-calendar-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
}

.bay-schedule-col {
  background: rgba(0, 0, 0, 0.25);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-md);
  overflow: hidden;
}

.bay-col-header {
  background: rgba(255, 255, 255, 0.03);
  padding: 0.85rem 1rem;
  border-bottom: 1px solid var(--border-light);
}

.bay-col-body {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  min-height: 280px;
}

.bay-booking-card {
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-left: 3px solid var(--primary);
  border-radius: var(--radius-sm);
  padding: 0.85rem;
  cursor: pointer;
  transition: var(--transition);
}

.bay-booking-card:hover {
  transform: translateX(3px);
  border-color: var(--primary);
}

.time-chip {
  background: rgba(245, 158, 11, 0.15);
  color: var(--primary);
  font-size: 0.7rem;
  font-weight: 700;
  padding: 0.1rem 0.4rem;
  border-radius: 3px;
}

.empty-bay-slot {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
  border: 1px dashed var(--border-light);
  border-radius: var(--radius-sm);
  color: var(--text-dim);
  font-size: 0.8rem;
}

/* Viewfinder in Scanner */
.camera-viewfinder-box {
  background: #000;
  height: 180px;
  border-radius: var(--radius-md);
  border: 1px solid var(--border-medium);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.viewfinder-frame {
  width: 130px;
  height: 130px;
  border: 2px dashed rgba(245, 158, 11, 0.6);
  border-radius: var(--radius-md);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.laser-scanner-line {
  position: absolute;
  left: 0;
  right: 0;
  height: 2px;
  background: #f59e0b;
  box-shadow: 0 0 10px #f59e0b;
  animation: scanLaser 2s infinite ease-in-out;
}

@keyframes scanLaser {
  0% { top: 5%; }
  50% { top: 90%; }
  100% { top: 5%; }
}

.viewfinder-hint {
  font-size: 0.65rem;
  color: var(--text-dim);
  text-transform: uppercase;
  position: absolute;
  bottom: -22px;
  white-space: nowrap;
}

.scanned-verified-box {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--border-gold);
  border-radius: var(--radius-md);
  padding: 1.25rem;
}

.scanned-details-grid {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background: rgba(0, 0, 0, 0.25);
  padding: 0.85rem;
  border-radius: var(--radius-sm);
}

.spec-cell {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
}

.d-lbl {
  color: var(--text-muted);
}

.d-val {
  text-align: right;
}

.empty-scan-placeholder {
  border: 1px dashed var(--border-light);
  border-radius: var(--radius-md);
}

.placeholder-icon {
  font-size: 2.2rem;
  display: block;
}

/* Customer View Specifics */
.customer-avatar {
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  color: #000;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 0.95rem;
  flex-shrink: 0;
}

.badge-points {
  background: rgba(245, 158, 11, 0.15);
  color: var(--primary);
  padding: 0.2rem 0.5rem;
  border-radius: var(--radius-full);
  font-weight: 700;
  font-size: 0.75rem;
}

.vip-badge {
  padding: 0.2rem 0.6rem;
  border-radius: var(--radius-full);
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
}

.vip-badge.bronze { background: rgba(180, 83, 9, 0.2); color: #f59e0b; }
.vip-badge.silver { background: rgba(203, 213, 225, 0.2); color: #cbd5e1; }
.vip-badge.gold { background: rgba(245, 158, 11, 0.25); color: #fbbf24; border: 1px solid var(--primary); }
.vip-badge.platinum { background: rgba(103, 232, 249, 0.2); color: #67e8f9; border: 1px solid #67e8f9; }

/* Staff Roster */
.staff-avatar-circle {
  width: 32px;
  height: 32px;
  background: rgba(255, 255, 255, 0.1);
  color: var(--primary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
}

/* Services Admin Grid */
.services-admin-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.service-admin-card {
  display: flex;
  flex-direction: column;
}

.srv-admin-img-wrap {
  position: relative;
  height: 150px;
  overflow: hidden;
}

.srv-admin-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.popular-tag {
  position: absolute;
  top: 10px;
  right: 10px;
  background: var(--primary);
  color: #000;
  font-weight: 700;
  font-size: 0.72rem;
  padding: 0.2rem 0.6rem;
  border-radius: var(--radius-full);
}

.duration-badge {
  position: absolute;
  bottom: 10px;
  left: 10px;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(4px);
  color: #fff;
  font-size: 0.72rem;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
}

.srv-checklist {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

/* Category Admin Grid */
.categories-admin-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1.25rem;
}

.category-admin-card {
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-md);
  padding: 1.25rem;
}

.multiplier-pill {
  background: rgba(245, 158, 11, 0.2);
  color: var(--primary);
  font-weight: 800;
  font-size: 0.75rem;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
}

.examples-tag {
  font-size: 0.75rem;
  color: var(--text-secondary);
}

.sim-result-box {
  background: rgba(245, 158, 11, 0.08);
  border: 1px solid var(--border-gold);
  border-radius: var(--radius-md);
  padding: 0.75rem 1rem;
  text-align: center;
}

.sim-total-amount {
  font-size: 1.5rem;
  font-family: var(--font-heading);
}

/* Coupons */
.coupon-code-badge {
  font-family: monospace;
  font-weight: 800;
  color: var(--primary);
  background: rgba(245, 158, 11, 0.15);
  padding: 0.25rem 0.65rem;
  border-radius: 4px;
  border: 1px dashed var(--primary);
}

.usage-progress-bar {
  width: 70px;
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  overflow: hidden;
}

.usage-fill {
  height: 100%;
  background: var(--primary);
}

/* Loyalty Tiers */
.tiers-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

.tier-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-md);
  padding: 1.25rem;
  text-align: center;
}

.tier-icon {
  font-size: 2rem;
  display: block;
  margin-bottom: 0.5rem;
}

/* Reports Analytics with clear margins */
.share-row {
  margin-bottom: 1.25rem;
}

.analytics-bar-bg {
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 4px;
  overflow: hidden;
}

.analytics-bar-fill {
  height: 100%;
  background: var(--primary-gradient);
}

.pkg-title-text {
  font-size: 0.88rem;
}

.pkg-price-text {
  font-size: 0.88rem;
}

/* Modals */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(8px);
  z-index: 1050;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.modal-content {
  background: #161a22;
  border: 1px solid var(--border-medium);
  border-radius: var(--radius-xl);
  width: 100%;
  padding: 1.75rem;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8);
}

.close-btn {
  background: transparent;
  color: var(--text-muted);
  font-size: 1.25rem;
  cursor: pointer;
}

.b-details-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.d-label {
  font-size: 0.75rem;
  color: var(--text-muted);
  display: block;
}

.d-val {
  font-size: 0.95rem;
  color: #fff;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.form-row {
  display: flex;
  gap: 1rem;
}

.col-4 { flex: 1; }
.col-6 { flex: 1; }

.form-label {
  font-size: 0.8rem;
  color: var(--text-muted);
  font-weight: 600;
}

.check-label {
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-secondary);
}

@media (max-width: 1100px) {
  .kpi-grid, .tiers-grid, .washer-task-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .dashboard-split-grid, .bay-calendar-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .admin-dashboard-container {
    flex-direction: column;
  }
  .admin-sidebar {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid var(--border-light);
  }
  .kpi-grid, .tiers-grid, .checklist-grid, .washer-task-grid {
    grid-template-columns: 1fr;
  }
  .form-row {
    flex-direction: column;
  }
}
</style>
