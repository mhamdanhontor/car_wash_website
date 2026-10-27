<template>
  <div class="admin-dashboard-container">
    <!-- Left Sidebar matching mockup -->
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

      <!-- Navigation Items (Exact items from mockup) -->
      <nav class="sidebar-nav">
        <a 
          href="#dash" 
          class="nav-item" 
          :class="{ active: currentTab === 'dashboard' }"
          @click.prevent="currentTab = 'dashboard'"
        >
          <span class="nav-icon">📊</span>
          <span>Dashboard</span>
        </a>

        <a 
          href="#bookings" 
          class="nav-item" 
          :class="{ active: currentTab === 'bookings' }"
          @click.prevent="currentTab = 'bookings'"
        >
          <span class="nav-icon">📅</span>
          <span>Bookings</span>
          <span class="nav-pill-count">{{ store.bookings.length }}</span>
        </a>

        <a 
          href="#calendar" 
          class="nav-item" 
          :class="{ active: currentTab === 'calendar' }"
          @click.prevent="currentTab = 'calendar'"
        >
          <span class="nav-icon">🗓️</span>
          <span>Calendar & Bays</span>
        </a>

        <a 
          href="#checkin" 
          class="nav-item" 
          :class="{ active: currentTab === 'checkin' }"
          @click.prevent="currentTab = 'checkin'"
        >
          <span class="nav-icon">📷</span>
          <span>QR Scanner & Check-in</span>
        </a>

        <a 
          href="#customers" 
          class="nav-item" 
          :class="{ active: currentTab === 'customers' }"
          @click.prevent="currentTab = 'customers'"
        >
          <span class="nav-icon">👥</span>
          <span>Customers</span>
        </a>

        <a 
          href="#staff" 
          class="nav-item" 
          :class="{ active: currentTab === 'staff' }"
          @click.prevent="currentTab = 'staff'"
        >
          <span class="nav-icon">👔</span>
          <span>Staff & Roles</span>
        </a>

        <a 
          href="#services" 
          class="nav-item" 
          :class="{ active: currentTab === 'services' }"
          @click.prevent="currentTab = 'services'"
        >
          <span class="nav-icon">🧼</span>
          <span>Services</span>
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
          <span>Coupons & Promotions</span>
        </a>

        <a 
          href="#loyalty" 
          class="nav-item" 
          :class="{ active: currentTab === 'loyalty' }"
          @click.prevent="currentTab = 'loyalty'"
        >
          <span class="nav-icon">🎁</span>
          <span>Loyalty & Rewards</span>
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

        <a 
          href="#cms" 
          class="nav-item" 
          :class="{ active: currentTab === 'cms' }"
          @click.prevent="currentTab = 'cms'"
        >
          <span class="nav-icon">✏️</span>
          <span>Website Content (CMS)</span>
        </a>

        <a 
          href="#settings" 
          class="nav-item" 
          :class="{ active: currentTab === 'settings' }"
          @click.prevent="currentTab = 'settings'"
        >
          <span class="nav-icon">⚙️</span>
          <span>Settings & Audit Log</span>
        </a>
      </nav>

      <!-- Sidebar Bottom Exit to Public Site -->
      <div class="sidebar-footer">
        <button class="btn btn-gold-outline btn-sm btn-block" @click="$emit('exit-to-site')">
          ← Back to Public Site
        </button>
      </div>
    </aside>

    <!-- Main Admin Content Area -->
    <main class="admin-main">
      <!-- Top Bar: Title, Role Switcher & Live Clock -->
      <header class="admin-topbar">
        <div class="topbar-left">
          <h2 class="admin-page-title">
            {{ pageTitles[currentTab] || 'Admin Dashboard' }}
          </h2>
          <span class="text-muted small">Live Management System • {{ store.business.branches[0].name }}</span>
        </div>

        <div class="topbar-right d-flex align-center gap-3">
          <!-- Role Switcher (SRS Section 3 RBAC Simulator) -->
          <div class="role-selector-box">
            <span class="role-label">Active Role:</span>
            <select v-model="store.auth.userRole" class="role-select">
              <option value="admin">Owner / Administrator (Full Access)</option>
              <option value="manager">Operations Manager</option>
              <option value="receptionist">Receptionist / Front Desk</option>
              <option value="operator">Wash Operator / Detailer</option>
              <option value="finance">Finance & Accounts</option>
            </select>
          </div>

          <!-- Date filter matching mockup -->
          <select class="period-select">
            <option>Last 30 Days</option>
            <option>Today (Oct 28)</option>
            <option>This Week</option>
            <option>This Month</option>
          </select>
        </div>
      </header>

      <div class="admin-content-body">
        <!-- ========================================================
             VIEW 1: DASHBOARD OVERVIEW (Exact matching mockup)
             ======================================================== -->
        <div v-if="currentTab === 'dashboard'" class="tab-pane">
          <!-- 4 KPI Summary Cards matching mockup -->
          <div class="kpi-grid">
            <!-- Card 1: Total Bookings -->
            <div class="kpi-card">
              <div class="kpi-header">
                <span class="kpi-title">Total Bookings</span>
                <span class="kpi-badge positive">+12%</span>
              </div>
              <div class="kpi-value">{{ totalBookingsCount }}</div>
              <div class="kpi-subtext">Across all active branches</div>
            </div>

            <!-- Card 2: Total Revenue -->
            <div class="kpi-card">
              <div class="kpi-header">
                <span class="kpi-title">Total Revenue</span>
                <span class="kpi-badge positive">+19%</span>
              </div>
              <div class="kpi-value text-gold">Rs {{ totalRevenue.toLocaleString() }}</div>
              <div class="kpi-subtext">Verified collections & card settlements</div>
            </div>

            <!-- Card 3: Completed -->
            <div class="kpi-card">
              <div class="kpi-header">
                <span class="kpi-title">Completed</span>
                <span class="kpi-icon-completed">✓</span>
              </div>
              <div class="kpi-value text-success">{{ completedBookingsCount }}</div>
              <div class="kpi-subtext">Quality inspected washes</div>
            </div>

            <!-- Card 4: Cancelled / Refunds -->
            <div class="kpi-card">
              <div class="kpi-header">
                <span class="kpi-title">Cancelled</span>
                <span class="kpi-badge neutral">Policy v2.0</span>
              </div>
              <div class="kpi-value text-danger">{{ cancelledBookingsCount }}</div>
              <div class="kpi-subtext">5% processing fee retained</div>
            </div>
          </div>

          <!-- Main Layout Grid: Bookings Today Table (Left) + Charts (Right) -->
          <div class="dashboard-split-grid mt-4">
            <!-- Left Side: Bookings Today Table (Matching Mockup) -->
            <div class="panel-card bookings-today-card">
              <div class="panel-header d-flex justify-between align-center">
                <h3 class="panel-title">Bookings Today</h3>
                <a href="#all" class="view-all-link" @click.prevent="currentTab = 'bookings'">View All →</a>
              </div>

              <div class="table-responsive">
                <table class="admin-table">
                  <thead>
                    <tr>
                      <th>Time</th>
                      <th>Customer</th>
                      <th>Vehicle</th>
                      <th>Service</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="b in todayBookings" :key="b.id">
                      <td class="font-weight-bold text-white">{{ b.bookingTime }}</td>
                      <td>
                        <div class="cust-name-cell">{{ b.customerName }}</div>
                        <div class="cust-phone-sub">{{ b.customerPhone }}</div>
                      </td>
                      <td>
                        <span class="cat-pill">{{ b.categoryId }}</span>
                        <div class="small text-muted">{{ b.vehicleMake }} {{ b.vehicleModel }}</div>
                      </td>
                      <td class="font-weight-bold text-gold">{{ b.serviceName }}</td>
                      <td>
                        <span class="status-pill" :class="getStatusClass(b.bookingStatus)">
                          {{ b.bookingStatus }}
                        </span>
                      </td>
                      <td>
                        <div class="d-flex gap-1">
                          <!-- Status Advancer button -->
                          <button 
                            v-if="b.bookingStatus === 'Confirmed'"
                            class="btn btn-outline btn-xs"
                            @click="advanceStatus(b.id, 'Checked In')"
                            title="Check in customer"
                          >
                            Check In
                          </button>
                          <button 
                            v-else-if="b.bookingStatus === 'Checked In'"
                            class="btn btn-gold-outline btn-xs"
                            @click="advanceStatus(b.id, 'In Progress')"
                            title="Start wash in Bay"
                          >
                            Start Wash
                          </button>
                          <button 
                            v-else-if="b.bookingStatus === 'In Progress'"
                            class="btn btn-primary btn-xs"
                            @click="advanceStatus(b.id, 'Completed')"
                            title="Mark complete"
                          >
                            Complete ✓
                          </button>
                          <span v-else class="text-muted small">Done</span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Right Side: Visual Analytics (Revenue Bars + Donut) -->
            <div class="analytics-col">
              <!-- Revenue Last 30 Days Bar Chart -->
              <div class="panel-card chart-card mb-3">
                <div class="panel-header">
                  <h4 class="panel-title">Revenue (Last 30 Days)</h4>
                </div>
                <!-- Simulated CSS Bar Chart matching mockup -->
                <div class="bar-chart-container">
                  <div class="chart-y-axis">
                    <span>Rs 300K</span>
                    <span>Rs 200K</span>
                    <span>Rs 100K</span>
                    <span>Rs 0</span>
                  </div>
                  <div class="bars-flex">
                    <div class="chart-bar" style="height: 35%;" title="Week 1: Rs 75,000"></div>
                    <div class="chart-bar" style="height: 48%;" title="Week 2: Rs 115,000"></div>
                    <div class="chart-bar" style="height: 40%;" title="Week 3: Rs 92,000"></div>
                    <div class="chart-bar" style="height: 65%;" title="Week 4: Rs 165,000"></div>
                    <div class="chart-bar" style="height: 55%;" title="Week 5: Rs 140,000"></div>
                    <div class="chart-bar" style="height: 75%;" title="Week 6: Rs 195,000"></div>
                    <div class="chart-bar" style="height: 90%;" title="Week 7: Rs 230,000"></div>
                  </div>
                </div>
              </div>

              <!-- Bookings by Service Donut / Breakdown matching mockup -->
              <div class="panel-card donut-card">
                <div class="panel-header">
                  <h4 class="panel-title">Bookings by Service</h4>
                </div>
                <div class="donut-content">
                  <div class="donut-visual-circle">
                    <div class="donut-hole">
                      <span class="donut-hole-total">{{ store.bookings.length }}</span>
                      <span class="donut-hole-sub">Washes</span>
                    </div>
                  </div>
                  <div class="service-legend-list">
                    <div class="legend-item">
                      <span class="legend-color gold"></span>
                      <span class="legend-name">Full Car Wash</span>
                      <span class="legend-pct">40%</span>
                    </div>
                    <div class="legend-item">
                      <span class="legend-color yellow"></span>
                      <span class="legend-name">Exterior Wash</span>
                      <span class="legend-pct">25%</span>
                    </div>
                    <div class="legend-item">
                      <span class="legend-color amber"></span>
                      <span class="legend-name">Interior Cleaning</span>
                      <span class="legend-pct">20%</span>
                    </div>
                    <div class="legend-item">
                      <span class="legend-color dark-gold"></span>
                      <span class="legend-name">Premium Detailing</span>
                      <span class="legend-pct">15%</span>
                    </div>
                  </div>
                </div>
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
                    <th>Customer</th>
                    <th>Vehicle</th>
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
                    <td class="font-weight-bold text-gold">{{ b.id }}</td>
                    <td>
                      <div>{{ b.customerName }}</div>
                      <div class="small text-muted">{{ b.customerPhone }}</div>
                    </td>
                    <td>
                      <div>{{ b.vehicleMake }} {{ b.vehicleModel }}</div>
                      <span class="plate-badge">{{ b.vehicleReg }}</span>
                    </td>
                    <td>
                      <div>{{ b.serviceName }}</div>
                      <span class="small text-muted">{{ b.bayId || 'Bay 1' }}</span>
                    </td>
                    <td>
                      <div>{{ b.bookingDate }}</div>
                      <span class="small text-white">{{ b.bookingTime }}</span>
                    </td>
                    <td class="font-weight-bold">Rs. {{ b.totalAmount }}</td>
                    <td>
                      <span class="status-pill" :class="b.paymentStatus === 'Paid' ? 'confirmed' : 'pending'">
                        {{ b.paymentStatus }}
                      </span>
                    </td>
                    <td>
                      <span class="status-pill" :class="getStatusClass(b.bookingStatus)">
                        {{ b.bookingStatus }}
                      </span>
                    </td>
                    <td>
                      <div class="d-flex gap-1">
                        <button class="btn btn-outline btn-xs" @click="viewBookingDetails(b)">
                          Details
                        </button>
                        <button 
                          v-if="b.paymentStatus === 'Paid' && b.bookingStatus !== 'Cancelled'" 
                          class="btn btn-outline btn-xs text-danger"
                          @click="openRefundModal(b)"
                        >
                          Refund
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
             VIEW 3: CALENDAR & BAY MANAGEMENT (SRS Section 6.2)
             ======================================================== -->
        <div v-if="currentTab === 'calendar'" class="tab-pane">
          <div class="panel-card mb-4">
            <h3 class="panel-title mb-2">Washing Bays Operational Timeline</h3>
            <p class="text-muted small">Live allocation of physical washing bays at Main Hub Gulberg III:</p>

            <div class="bays-timeline-grid">
              <div v-for="bay in store.bays" :key="bay.id" class="bay-lane glass-panel p-3">
                <div class="bay-header d-flex justify-between align-center mb-3">
                  <h4 class="text-white">{{ bay.name }}</h4>
                  <span class="status-pill confirmed">Active</span>
                </div>

                <!-- Bookings in this bay -->
                <div class="bay-slot-list">
                  <div 
                    v-for="b in getBayBookings(bay.id)" 
                    :key="b.id"
                    class="bay-booking-card"
                    :class="getStatusClass(b.bookingStatus)"
                  >
                    <div class="d-flex justify-between font-weight-bold">
                      <span>{{ b.bookingTime }}</span>
                      <span>{{ b.id }}</span>
                    </div>
                    <div class="text-white small my-1">{{ b.vehicleMake }} {{ b.vehicleModel }} ({{ b.vehicleReg }})</div>
                    <div class="text-muted small">{{ b.serviceName }} • Assigned: Ali Raza</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ========================================================
             VIEW 4: QR SCANNER & ON-SITE CHECK-IN (SRS Section 8)
             ======================================================== -->
        <div v-if="currentTab === 'checkin'" class="tab-pane">
          <div class="scanner-split-grid">
            <div class="panel-card p-4">
              <h3 class="panel-title mb-2">📷 QR Code Pass Scanner</h3>
              <p class="text-muted small mb-4">
                Point reception tablet/camera to customer's mobile digital pass or type reference manually:
              </p>

              <div class="camera-simulation-box mb-3">
                <div class="scan-laser-line"></div>
                <div class="camera-reticle"></div>
                <div class="scanner-status-text">Camera Standby (Auto-focus active)</div>
              </div>

              <div class="manual-search-box">
                <label class="form-label">Manual Booking Reference Lookup:</label>
                <div class="d-flex gap-2">
                  <input type="text" v-model="scanRefInput" placeholder="e.g. HCW-2026-9182" />
                  <button class="btn btn-primary" @click="lookupBookingByRef">Verify & Check-in</button>
                </div>
              </div>
            </div>

            <!-- Lookup Result Box -->
            <div class="panel-card p-4" v-if="activeScannedBooking">
              <div class="d-flex justify-between align-center mb-3">
                <h4 class="text-gold">Verified Booking Pass</h4>
                <span class="status-pill confirmed">Authenticated ✓</span>
              </div>

              <div class="b-details-grid my-3">
                <div>
                  <div class="b-label">Customer</div>
                  <div class="b-val">{{ activeScannedBooking.customerName }}</div>
                </div>
                <div>
                  <div class="b-label">Vehicle Plate</div>
                  <div class="b-val text-white font-weight-bold">{{ activeScannedBooking.vehicleReg }}</div>
                </div>
                <div>
                  <div class="b-label">Package</div>
                  <div class="b-val text-gold">{{ activeScannedBooking.serviceName }}</div>
                </div>
                <div>
                  <div class="b-label">Current Status</div>
                  <div class="b-val">{{ activeScannedBooking.bookingStatus }}</div>
                </div>
              </div>

              <!-- Vehicle Condition Checklist (SRS Section 8) -->
              <div class="checklist-box glass-panel p-3 my-3">
                <h5 class="text-white small mb-2">On-Site Vehicle Condition Checklist:</h5>
                <label class="check-label d-block small mb-1">
                  <input type="checkbox" checked /> No pre-existing windshield cracks or dents noted
                </label>
                <label class="check-label d-block small mb-1">
                  <input type="checkbox" checked /> Customer removed valuables and mobile devices
                </label>
                <label class="check-label d-block small">
                  <input type="checkbox" checked /> Front ceramic bumper inspected
                </label>
              </div>

              <div class="d-flex gap-2">
                <button 
                  class="btn btn-primary btn-block" 
                  @click="completeCheckIn(activeScannedBooking.id)"
                  :disabled="activeScannedBooking.bookingStatus === 'Checked In' || activeScannedBooking.bookingStatus === 'Completed'"
                >
                  Confirm Check-in & Move to Bay 2 →
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- ========================================================
             VIEW 5: STAFF & ROLES (SRS Section 3)
             ======================================================== -->
        <div v-if="currentTab === 'staff'" class="tab-pane">
          <div class="panel-card">
            <h3 class="panel-title mb-2">Staff Members & RBAC Permissions</h3>
            <p class="text-muted small mb-3">Server-side role permissions matrix enforced as per SRS Section 3:</p>

            <table class="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Contact</th>
                  <th>Permissions Granted</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="st in store.staff" :key="st.id">
                  <td class="font-weight-bold text-white">{{ st.name }}</td>
                  <td><span class="role-chip">{{ st.roleName }}</span></td>
                  <td>{{ st.phone }} • {{ st.email }}</td>
                  <td class="small text-secondary">
                    <span v-if="st.role === 'admin'">Full configuration, Pricing, Policy, Refunds, Audit</span>
                    <span v-else-if="st.role === 'manager'">Schedules, bay assignments, operational reports</span>
                    <span v-else-if="st.role === 'receptionist'">Create walk-in, lookup QR, check-in</span>
                    <span v-else-if="st.role === 'operator'">Bay assignments, progress update, inspection</span>
                    <span v-else-if="st.role === 'finance'">Financial reconciliation, ledger, refund approvals</span>
                  </td>
                  <td><span class="status-pill confirmed">Active</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- ========================================================
             VIEW 6: WEBSITE CMS (SRS Section 14.2)
             ======================================================== -->
        <div v-if="currentTab === 'cms'" class="tab-pane">
          <div class="panel-card p-4">
            <h3 class="panel-title mb-2">Website Content Management System (CMS)</h3>
            <p class="text-muted small mb-4">
              Edit public announcement banner, phone numbers, and studio copy without writing any code:
            </p>

            <div class="form-group mb-3">
              <label class="form-label">Top Announcement Bar Text</label>
              <input type="text" v-model="store.business.announcement" />
            </div>

            <div class="form-row mb-3">
              <div class="col-6">
                <label class="form-label">Studio Hotline Phone</label>
                <input type="text" v-model="store.business.phone" />
              </div>
              <div class="col-6">
                <label class="form-label">WhatsApp Number</label>
                <input type="text" v-model="store.business.whatsapp" />
              </div>
            </div>

            <div class="form-group mb-4">
              <label class="form-label">Studio Operating Hours Label</label>
              <input type="text" v-model="store.business.operatingHours" />
            </div>

            <button class="btn btn-primary" @click="saveCmsChanges">
              Save & Publish Changes Live
            </button>
          </div>
        </div>

        <!-- ========================================================
             VIEW 7: SETTINGS & AUDIT LOG (SRS Section 17 & 20)
             ======================================================== -->
        <div v-if="currentTab === 'settings'" class="tab-pane">
          <div class="panel-card p-4 mb-4">
            <div class="d-flex justify-between align-center mb-3">
              <h3 class="panel-title">System & Policy Settings</h3>
              <button class="btn btn-outline btn-sm text-danger" @click="resetAllDemoData">
                ⚠️ Reset All Demo Data
              </button>
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
          </div>

          <div class="panel-card p-4">
            <h3 class="panel-title mb-2">Immutable Security Audit Trail</h3>
            <p class="text-muted small mb-3">System records of status changes, refunds, and administrative actions:</p>

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
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { store, actions, totalRevenue, totalBookingsCount, completedBookingsCount, cancelledBookingsCount, todayBookings } from '../store/carWashStore';

defineEmits(['exit-to-site']);

const currentTab = ref('dashboard');
const bookingSearch = ref('');
const statusFilter = ref('all');
const scanRefInput = ref('HCW-2026-9182');
const activeScannedBooking = ref(null);
const activeDetailBooking = ref(null);

const pageTitles = {
  dashboard: 'Admin Dashboard',
  bookings: 'All Bookings Management',
  calendar: 'Calendar & Bay Scheduling',
  checkin: 'QR Scanner & On-Site Check-in',
  customers: 'Customer Accounts & Profiles',
  staff: 'Staff & Role Permissions (RBAC)',
  services: 'Wash Packages & Durations',
  categories: 'Vehicle Categories & Multipliers',
  coupons: 'Promotional Coupons & Campaigns',
  loyalty: 'Loyalty Program Rules & Ledger',
  payments: 'Financial Ledger & Refund Reversals',
  reports: 'Reports & Revenue Analytics',
  cms: 'Website Content Management (CMS)',
  settings: 'System Settings & Audit Log'
};

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
}

function getBayBookings(bayId) {
  return store.bookings.filter(b => b.bayId === bayId || (!b.bayId && bayId === 'bay_1')).slice(0, 3);
}

function lookupBookingByRef() {
  const found = store.bookings.find(b => b.id.toUpperCase() === scanRefInput.value.trim().toUpperCase());
  if (found) {
    activeScannedBooking.value = found;
  } else {
    alert('Booking reference not found. Please verify the code.');
  }
}

function completeCheckIn(id) {
  actions.updateStatus(id, 'Checked In', 'Front Desk Receptionist');
  alert(`Vehicle checked in! Bay 2 allocated.`);
}

function viewBookingDetails(b) {
  activeDetailBooking.value = b;
}

function openRefundModal(b) {
  const confirmRef = confirm(`Process 95% refund of Rs. ${b.totalAmount - Math.round(b.totalAmount * 0.05)} for booking ${b.id}?`);
  if (confirmRef) {
    actions.processCancellationAndRefund(b.id, 'Manager Approved Refund', store.auth.userRole);
    alert('Refund processed and audit entry logged.');
  }
}

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
}

function openCreateWalkIn() {
  alert('Walk-in booking wizard ready. Staff can enter plate and select bay.');
}

function saveCmsChanges() {
  alert('Website CMS changes published successfully! Visible immediately on the homepage.');
}

function resetAllDemoData() {
  if (confirm('Reset store back to default seed records?')) {
    actions.resetDefaults();
    alert('Store reset successfully.');
  }
}
</script>

<style scoped>
.admin-dashboard-container {
  display: flex;
  min-height: 100vh;
  background: #0d0f13;
  color: #fff;
}

/* Sidebar matching mockup */
.admin-sidebar {
  width: 250px;
  background: #11141a;
  border-right: 1px solid var(--border-light);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
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

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.65rem 0.85rem;
  border-radius: var(--radius-md);
  color: var(--text-muted);
  font-size: 0.85rem;
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

.sidebar-footer {
  padding: 1rem;
  border-top: 1px solid var(--border-light);
}

/* Main Area */
.admin-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
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

.role-selector-box {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.role-label {
  font-size: 0.8rem;
  color: var(--text-muted);
}

.role-select, .period-select {
  width: auto;
  padding: 0.45rem 0.85rem;
  font-size: 0.85rem;
  background: var(--bg-card);
  border: 1px solid var(--border-medium);
}

.admin-content-body {
  padding: 2rem;
  flex: 1;
  overflow-y: auto;
}

/* 4 KPI Cards matching mockup */
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
  grid-template-columns: 1.65fr 1fr;
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

/* Admin Table */
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
  padding: 0.85rem 1.25rem;
  color: var(--text-muted);
  font-weight: 600;
  font-size: 0.75rem;
  text-transform: uppercase;
  border-bottom: 1px solid var(--border-light);
  background: rgba(0, 0, 0, 0.15);
}

.admin-table td {
  padding: 1rem 1.25rem;
  border-bottom: 1px solid var(--border-light);
  color: var(--text-secondary);
}

.cat-pill {
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  font-size: 0.7rem;
  padding: 0.15rem 0.45rem;
  border-radius: 4px;
  text-transform: uppercase;
}

.plate-badge {
  background: #000;
  border: 1px solid var(--border-gold);
  color: var(--primary);
  font-size: 0.72rem;
  padding: 0.1rem 0.35rem;
  border-radius: 3px;
  font-weight: 700;
}

.btn-xs {
  padding: 0.25rem 0.6rem;
  font-size: 0.75rem;
  border-radius: 4px;
}

/* Bar Chart matching mockup */
.bar-chart-container {
  display: flex;
  align-items: flex-end;
  gap: 1rem;
  padding: 1.5rem;
  height: 180px;
}

.chart-y-axis {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  font-size: 0.68rem;
  color: var(--text-muted);
}

.bars-flex {
  display: flex;
  align-items: flex-end;
  gap: 0.85rem;
  flex: 1;
  height: 100%;
  border-bottom: 1px solid var(--border-light);
  padding-bottom: 4px;
}

.chart-bar {
  flex: 1;
  background: var(--primary-gradient);
  border-radius: 4px 4px 0 0;
  transition: height 0.4s ease;
}

.chart-bar:hover {
  background: #fbbf24;
}

/* Donut Breakdown */
.donut-content {
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 2rem;
}

.donut-visual-circle {
  width: 110px;
  height: 110px;
  border-radius: 50%;
  background: conic-gradient(
    #f59e0b 0% 40%,
    #fbbf24 40% 65%,
    #d97706 65% 85%,
    #78350f 85% 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.donut-hole {
  width: 70px;
  height: 70px;
  background: #161a22;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.donut-hole-total {
  font-family: var(--font-heading);
  font-size: 1.25rem;
  font-weight: 800;
  line-height: 1;
}

.donut-hole-sub {
  font-size: 0.65rem;
  color: var(--text-muted);
}

.service-legend-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.8rem;
}

.legend-color {
  width: 10px;
  height: 10px;
  border-radius: 2px;
}

.legend-color.gold { background: #f59e0b; }
.legend-color.yellow { background: #fbbf24; }
.legend-color.amber { background: #d97706; }
.legend-color.dark-gold { background: #78350f; }

.legend-pct {
  margin-left: auto;
  font-weight: 700;
  color: #fff;
}

/* Scanner styles */
.scanner-split-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.camera-simulation-box {
  height: 220px;
  background: #000;
  border: 2px dashed rgba(245, 158, 11, 0.4);
  border-radius: var(--radius-md);
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.scan-laser-line {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: #ef4444;
  box-shadow: 0 0 10px #ef4444;
  animation: scanLaser 2s infinite ease-in-out;
}

@keyframes scanLaser {
  0%, 100% { top: 10%; }
  50% { top: 90%; }
}

.camera-reticle {
  width: 140px;
  height: 140px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 12px;
}

.scanner-status-text {
  font-size: 0.75rem;
  color: var(--text-muted);
  margin-top: 1rem;
}

@media (max-width: 1100px) {
  .admin-dashboard-container {
    flex-direction: column;
  }
  .admin-sidebar {
    width: 100%;
  }
  .sidebar-nav {
    flex-direction: row;
    overflow-x: auto;
  }
  .kpi-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .dashboard-split-grid {
    grid-template-columns: 1fr;
  }
}
</style>
