/**
 * FreelanceFlow — Freelancer Management Dashboard
 * Vanilla JavaScript: navigation, charts, drag-drop, modals, themes
 */

(function () {
  'use strict';

  /* ==========================================================================
     State & Dummy Data
     ========================================================================== */
  const STORAGE_KEYS = {
    theme: 'ff_theme',
    accent: 'ff_accent',
    onboarding: 'ff_onboarding_done',
    sidebar: 'ff_sidebar_collapsed'
  };

  let state = {
    clients: [
      { id: '1', name: 'Sarah Chen', company: 'TechStart Inc', email: 'sarah@techstart.io', phone: '+1 555-0101', status: 'active', projects: 3, payment: 'paid', revenue: 12400 },
      { id: '2', name: 'Marcus Webb', company: 'Bloom Agency', email: 'marcus@bloom.co', phone: '+1 555-0102', status: 'active', projects: 2, payment: 'pending', revenue: 8200 },
      { id: '3', name: 'Elena Rodriguez', company: 'Nova Retail', email: 'elena@novaretail.com', phone: '+1 555-0103', status: 'active', projects: 1, payment: 'paid', revenue: 5600 },
      { id: '4', name: 'James Park', company: 'Pixel Labs', email: 'james@pixellabs.dev', phone: '+1 555-0104', status: 'inactive', projects: 0, payment: 'overdue', revenue: 2100 },
      { id: '5', name: 'Amira Hassan', company: 'CloudNine SaaS', email: 'amira@cloudnine.io', phone: '+1 555-0105', status: 'active', projects: 4, payment: 'paid', revenue: 18900 },
      { id: '6', name: 'David Kim', company: 'Fresh Foods Co', email: 'david@freshfoods.com', phone: '+1 555-0106', status: 'active', projects: 2, payment: 'pending', revenue: 7400 }
    ],
    projects: [
      { id: 'p1', name: 'Brand Identity Redesign', client: 'TechStart Inc', deadline: '2026-06-15', progress: 72, priority: 'high', team: ['Alex', 'Sam', 'Jordan'] },
      { id: 'p2', name: 'E-commerce UI Kit', client: 'Nova Retail', deadline: '2026-05-30', progress: 45, priority: 'medium', team: ['Alex', 'Mia'] },
      { id: 'p3', name: 'Mobile App Wireframes', client: 'CloudNine SaaS', deadline: '2026-06-22', progress: 88, priority: 'high', team: ['Alex', 'Sam', 'Lee', 'Jordan'] },
      { id: 'p4', name: 'Marketing Landing Pages', client: 'Bloom Agency', deadline: '2026-05-18', progress: 30, priority: 'low', team: ['Alex'] }
    ],
    kanbanTasks: [
      { id: 'k1', title: 'Review client feedback', status: 'todo', project: 'Brand Identity' },
      { id: 'k2', title: 'Update design system tokens', status: 'todo', project: 'E-commerce UI' },
      { id: 'k3', title: 'Create hero section mockups', status: 'progress', project: 'Landing Pages' },
      { id: 'k4', title: 'Export assets for dev handoff', status: 'progress', project: 'Mobile App' },
      { id: 'k5', title: 'Client presentation prep', status: 'review', project: 'Brand Identity' },
      { id: 'k6', title: 'Finalize logo variations', status: 'done', project: 'Brand Identity' }
    ],
    invoices: [
      { id: 'INV-2041', client: 'TechStart Inc', amount: 4200, date: '2026-05-01', status: 'paid' },
      { id: 'INV-2042', client: 'Bloom Agency', amount: 2800, date: '2026-05-08', status: 'pending' },
      { id: 'INV-2043', client: 'Nova Retail', amount: 1500, date: '2026-05-10', status: 'paid' },
      { id: 'INV-2044', client: 'CloudNine SaaS', amount: 5600, date: '2026-05-12', status: 'pending' },
      { id: 'INV-2045', client: 'Fresh Foods Co', amount: 1480, date: '2026-05-14', status: 'unpaid' },
      { id: 'INV-2046', client: 'Pixel Labs', amount: 2100, date: '2026-04-28', status: 'unpaid' }
    ],
    todos: [
      { id: 't1', text: 'Send invoice reminder to Bloom Agency', priority: 'high', completed: false },
      { id: 't2', text: 'Prepare wireframes for client review', priority: 'medium', completed: false },
      { id: 't3', text: 'Update portfolio case study', priority: 'low', completed: true },
      { id: 't4', text: 'Schedule Q2 planning call', priority: 'medium', completed: false },
      { id: 't5', text: 'Backup project files to cloud', priority: 'low', completed: false }
    ],
    notifications: [
      { id: 'n1', title: 'Payment received', message: 'TechStart Inc paid $4,200', time: '2h ago', read: false },
      { id: 'n2', title: 'Deadline approaching', message: 'Marketing Landing Pages due in 3 days', time: '5h ago', read: false },
      { id: 'n3', title: 'New message', message: 'Marcus Webb sent a project update', time: '1d ago', read: false },
      { id: 'n4', title: 'Invoice overdue', message: 'INV-2046 from Pixel Labs is overdue', time: '2d ago', read: true }
    ],
    meetings: [
      { time: '10:00 AM', title: 'Design Review', client: 'TechStart Inc', date: 'Today' },
      { time: '2:30 PM', title: 'Kickoff Call', client: 'CloudNine SaaS', date: 'Today' },
      { time: '11:00 AM', title: 'Sprint Planning', client: 'Bloom Agency', date: 'Tomorrow' }
    ],
    activities: [
      { type: 'payment', text: 'Received payment from TechStart Inc', time: '2 hours ago' },
      { type: 'project', text: 'Updated Mobile App Wireframes to 88%', time: '4 hours ago' },
      { type: 'client', text: 'Added new client: Fresh Foods Co', time: 'Yesterday' },
      { type: 'invoice', text: 'Generated invoice INV-2046', time: '2 days ago' }
    ],
    timeline: [
      { time: '09:00', title: 'Started design review session', desc: 'TechStart Inc brand project' },
      { time: '11:30', title: 'Submitted wireframes v2', desc: 'CloudNine SaaS mobile app' },
      { time: '14:00', title: 'Invoice INV-2041 marked paid', desc: '$4,200 received' },
      { time: '16:45', title: 'Team sync completed', desc: '4 action items created' }
    ],
    paymentHistory: [
      { client: 'TechStart Inc', amount: 4200, date: 'May 1, 2026', method: 'Bank Transfer' },
      { client: 'Nova Retail', amount: 1500, date: 'May 10, 2026', method: 'PayPal' },
      { client: 'CloudNine SaaS', amount: 3200, date: 'Apr 22, 2026', method: 'Stripe' },
      { client: 'Amira Hassan', amount: 2800, date: 'Apr 15, 2026', method: 'Bank Transfer' }
    ],
    calendarEvents: {
      '2026-05-25': ['Design Review 10:00 AM', 'Kickoff Call 2:30 PM'],
      '2026-05-26': ['Sprint Planning 11:00 AM'],
      '2026-05-28': ['Invoice due - Bloom Agency'],
      '2026-05-30': ['Project deadline - E-commerce UI']
    },
    files: [
      { name: 'brand-guidelines-v3.pdf', size: '2.4 MB' },
      { name: 'wireframes-mobile.fig', size: '8.1 MB' }
    ],
    clientView: 'grid',
    calendarMonth: new Date(2026, 4, 1)
  };

  /* ==========================================================================
     DOM Helpers
     ========================================================================== */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  function generateId(prefix = 'id') {
    return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
  }

  function getInitials(name) {
    return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  }

  function formatCurrency(n) {
    return '$' + Number(n).toLocaleString('en-US', { maximumFractionDigits: 0 });
  }

  /* ==========================================================================
     Toast Notifications
     ========================================================================== */
  function showToast(message, type = 'info') {
    const container = $('#toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  /* ==========================================================================
     Modal System
     ========================================================================== */
  const modalOverlay = $('#modal-overlay');

  function openModal(id) {
    const modal = $(`#${id}`);
    if (!modal) return;
    modalOverlay.hidden = false;
    modal.hidden = false;
    requestAnimationFrame(() => modal.classList.add('open'));
    document.body.style.overflow = 'hidden';
  }

  function closeAllModals() {
    $$('.modal.open, .modal').forEach(m => {
      m.classList.remove('open');
      m.hidden = true;
    });
    modalOverlay.hidden = true;
    document.body.style.overflow = '';
  }

  function initModals() {
    $$('[data-close]').forEach(btn => btn.addEventListener('click', closeAllModals));
    modalOverlay?.addEventListener('click', closeAllModals);
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeAllModals();
    });
  }

  /* ==========================================================================
     Theme & Settings
     ========================================================================== */
  function applyTheme(theme) {
    const resolved = theme === 'auto'
      ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : theme;
    document.documentElement.setAttribute('data-theme', resolved);
    localStorage.setItem(STORAGE_KEYS.theme, theme);
    $$('.theme-option').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.themeSet === theme);
    });
  }

  function applyAccent(accent) {
    document.documentElement.setAttribute('data-accent', accent);
    localStorage.setItem(STORAGE_KEYS.accent, accent);
    $$('.accent-swatch').forEach(s => s.classList.toggle('active', s.dataset.accent === accent));
  }

  function initTheme() {
    const saved = localStorage.getItem(STORAGE_KEYS.theme) || 'dark';
    const accent = localStorage.getItem(STORAGE_KEYS.accent) || 'indigo';
    applyTheme(saved);
    applyAccent(accent);

    $('#theme-toggle')?.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      showToast(`Switched to ${next} mode`, 'info');
    });

    $$('[data-theme-set]').forEach(btn => {
      btn.addEventListener('click', () => {
        applyTheme(btn.dataset.themeSet);
        showToast('Theme updated', 'success');
      });
    });

    $$('.accent-swatch').forEach(s => {
      s.addEventListener('click', () => {
        applyAccent(s.dataset.accent);
        redrawCharts();
        showToast('Accent color updated', 'success');
      });
    });

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      if (localStorage.getItem(STORAGE_KEYS.theme) === 'auto') applyTheme('auto');
    });
  }

  /* ==========================================================================
     Loader & Onboarding
     ========================================================================== */
  function initLoader() {
    const loader = $('#loader');
    setTimeout(() => {
      loader.classList.add('hidden');
      initCounters();
      animateProgressBars();
    }, 1400);
  }

  function initOnboarding() {
    const onboarding = $('#onboarding');
    const done = localStorage.getItem(STORAGE_KEYS.onboarding);

    if (done) {
      onboarding.classList.add('hidden');
      return;
    }

    const finish = () => {
      onboarding.classList.add('hidden');
      localStorage.setItem(STORAGE_KEYS.onboarding, '1');
    };

    $('#onboarding-start')?.addEventListener('click', finish);
    $('#onboarding-skip')?.addEventListener('click', finish);
  }

  /* ==========================================================================
     Navigation & Sidebar
     ========================================================================== */
  function navigateTo(pageId) {
    $$('.page').forEach(p => p.classList.remove('active'));
    const page = $(`#page-${pageId}`);
    if (page) page.classList.add('active');

    $$('.nav-link').forEach(link => {
      link.classList.toggle('active', link.dataset.nav === pageId);
    });

    if (pageId === 'dashboard') redrawCharts();
    if (pageId === 'clients') renderClients();
    if (pageId === 'projects') { renderProjects(); renderKanban(); }
    if (pageId === 'payments') { renderInvoices(); renderPaymentHistory(); redrawCharts(); }
    if (pageId === 'tasks') { renderTodos(); renderCalendar(); }

    const sidebar = $('#sidebar');
    sidebar?.classList.remove('mobile-open');
  }

  function initNavigation() {
    $$('[data-nav]').forEach(el => {
      el.addEventListener('click', e => {
        e.preventDefault();
        const page = el.dataset.nav;
        if (page) navigateTo(page);
      });
    });

    const sidebar = $('#sidebar');
    $('#sidebar-toggle')?.addEventListener('click', () => {
      sidebar.classList.toggle('collapsed');
      $('#app')?.classList.toggle('sidebar-collapsed', sidebar.classList.contains('collapsed'));
      localStorage.setItem(STORAGE_KEYS.sidebar, sidebar.classList.contains('collapsed'));
    });

    if (localStorage.getItem(STORAGE_KEYS.sidebar) === 'true') {
      sidebar?.classList.add('collapsed');
      $('#app')?.classList.add('sidebar-collapsed');
    }

    $('#mobile-menu')?.addEventListener('click', () => {
      sidebar?.classList.toggle('mobile-open');
    });

    $$('.nav-group-toggle').forEach(btn => {
      btn.addEventListener('click', () => {
        btn.closest('.nav-group')?.classList.toggle('open');
        btn.setAttribute('aria-expanded', btn.closest('.nav-group')?.classList.contains('open'));
      });
    });

    $$('.quick-action').forEach(btn => {
      btn.addEventListener('click', () => {
        const action = btn.dataset.action;
        if (action === 'client') openModal('modal-client');
        else if (action === 'invoice') openModal('modal-invoice');
        else if (action === 'task') navigateTo('tasks');
        else if (action === 'meeting') showToast('Meeting scheduler opened', 'info');
      });
    });
  }

  /* ==========================================================================
     Animated Counters
     ========================================================================== */
  function animateCounter(el, target, options = {}) {
    const { prefix = '', suffix = '', duration = 1200, format } = options;
    const start = performance.now();
    const from = 0;

    function frame(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.floor(from + (target - from) * eased);
      el.textContent = format === 'currency'
        ? formatCurrency(value)
        : `${prefix}${value.toLocaleString()}${suffix}`;
      if (progress < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  function initCounters() {
    $$('[data-animate="counter"]').forEach(card => {
      const target = parseInt(card.dataset.target, 10);
      const counter = card.querySelector('.counter');
      const format = card.dataset.format;
      const prefix = card.dataset.prefix || '';
      if (counter) animateCounter(counter, target, { prefix, format });
    });

    $$('[data-counter]').forEach(el => {
      const target = parseInt(el.dataset.counter, 10);
      const format = el.dataset.format;
      animateCounter(el, target, { format });
    });
  }

  function animateProgressBars() {
    setTimeout(() => {
      $$('.progress-fill').forEach(bar => {
        const w = bar.dataset.width || bar.style.width;
        if (w) bar.style.width = w;
      });
    }, 300);
  }

  /* ==========================================================================
     Charts (Canvas)
     ========================================================================== */
  function getChartColors() {
    const style = getComputedStyle(document.documentElement);
    const accent = style.getPropertyValue('--accent').trim() || '#6366f1';
    const muted = style.getPropertyValue('--text-muted').trim() || '#71717a';
    const border = style.getPropertyValue('--border').trim() || 'rgba(255,255,255,0.08)';
    return { accent, muted, border, grid: border };
  }

  function drawLineChart(canvasId, labels, datasets, options = {}) {
    const canvas = $(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.parentElement.getBoundingClientRect();
    const w = rect.width - 48;
    const h = options.height || 220;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx.scale(dpr, dpr);

    const colors = getChartColors();
    const pad = { top: 20, right: 20, bottom: 36, left: 48 };
    const chartW = w - pad.left - pad.right;
    const chartH = h - pad.top - pad.bottom;

    const allValues = datasets.flatMap(d => d.data);
    const max = Math.max(...allValues, 1) * 1.1;
    const min = 0;

    ctx.clearRect(0, 0, w, h);

    // Grid
    ctx.strokeStyle = colors.grid;
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = pad.top + (chartH / 4) * i;
      ctx.beginPath();
      ctx.moveTo(pad.left, y);
      ctx.lineTo(pad.left + chartW, y);
      ctx.stroke();
    }

    // Labels
    ctx.fillStyle = colors.muted;
    ctx.font = '11px Inter, sans-serif';
    ctx.textAlign = 'center';
    labels.forEach((lbl, i) => {
      const x = pad.left + (chartW / (labels.length - 1)) * i;
      ctx.fillText(lbl, x, h - 12);
    });

    datasets.forEach((ds, di) => {
      const color = ds.color || colors.accent;
      const points = ds.data.map((v, i) => ({
        x: pad.left + (chartW / (labels.length - 1)) * i,
        y: pad.top + chartH - ((v - min) / (max - min)) * chartH
      }));

      // Gradient fill under line
      const grad = ctx.createLinearGradient(0, pad.top, 0, pad.top + chartH);
      if (color.startsWith('#')) {
        const r = parseInt(color.slice(1, 3), 16);
        const g = parseInt(color.slice(3, 5), 16);
        const b = parseInt(color.slice(5, 7), 16);
        grad.addColorStop(0, `rgba(${r},${g},${b},0.25)`);
        grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
      } else {
        grad.addColorStop(0, color);
        grad.addColorStop(1, 'transparent');
      }

      ctx.beginPath();
      points.forEach((p, i) => (i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)));
      ctx.lineTo(points[points.length - 1].x, pad.top + chartH);
      ctx.lineTo(points[0].x, pad.top + chartH);
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();

      ctx.beginPath();
      points.forEach((p, i) => (i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)));
      ctx.strokeStyle = color;
      ctx.lineWidth = 2.5;
      ctx.lineJoin = 'round';
      ctx.stroke();

      points.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.stroke();
      });
    });

    if (options.legendId) {
      const legend = $(options.legendId);
      if (legend) {
        legend.innerHTML = datasets.map(ds =>
          `<span style="--c:${ds.color || colors.accent}"><span style="background:${ds.color || colors.accent}"></span>${ds.label}</span>`
        ).join('');
      }
    }
  }

  function drawBarChart(canvasId, labels, data) {
    const canvas = $(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.parentElement.getBoundingClientRect();
    const w = rect.width - 48;
    const h = 220;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx.scale(dpr, dpr);

    const colors = getChartColors();
    const pad = { top: 20, right: 20, bottom: 36, left: 48 };
    const chartW = w - pad.left - pad.right;
    const chartH = h - pad.top - pad.bottom;
    const max = Math.max(...data) * 1.15;
    const barW = chartW / data.length * 0.55;
    const gap = chartW / data.length;

    ctx.clearRect(0, 0, w, h);

    data.forEach((v, i) => {
      const x = pad.left + gap * i + (gap - barW) / 2;
      const barH = (v / max) * chartH;
      const y = pad.top + chartH - barH;
      const grad = ctx.createLinearGradient(x, y, x, pad.top + chartH);
      const accent = colors.accent;
      if (accent.startsWith('#')) {
        const r = parseInt(accent.slice(1, 3), 16);
        const g = parseInt(accent.slice(3, 5), 16);
        const b = parseInt(accent.slice(5, 7), 16);
        grad.addColorStop(0, `rgb(${r},${g},${b})`);
        grad.addColorStop(1, `rgba(${r},${g},${b},0.4)`);
      }
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.roundRect(x, y, barW, barH, [6, 6, 0, 0]);
      ctx.fill();

      ctx.fillStyle = colors.muted;
      ctx.font = '10px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(labels[i], x + barW / 2, h - 12);
    });
  }

  function drawDonutChart(canvasId, segments) {
    const canvas = $(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const size = 160;
    const cx = size / 2;
    const cy = size / 2;
    const radius = 60;
    const inner = 40;
    let start = -Math.PI / 2;
    const total = segments.reduce((s, x) => s + x.value, 0);

    ctx.clearRect(0, 0, size, size);
    segments.forEach(seg => {
      const slice = (seg.value / total) * Math.PI * 2;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, start, start + slice);
      ctx.arc(cx, cy, inner, start + slice, start, true);
      ctx.closePath();
      ctx.fillStyle = seg.color;
      ctx.fill();
      start += slice;
    });

    ctx.fillStyle = getChartColors().muted;
    ctx.font = 'bold 14px Inter';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(total, cx, cy - 6);
    ctx.font = '10px Inter';
    ctx.fillText('invoices', cx, cy + 10);

    const legend = $('#payment-legend');
    if (legend) {
      legend.innerHTML = segments.map(s =>
        `<li><span class="dot" style="background:${s.color}"></span>${s.label} (${s.value})</li>`
      ).join('');
    }
  }

  function redrawCharts() {
    const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();

    drawLineChart('#productivity-chart',
      ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      [
        { label: 'Tasks Completed', data: [4, 6, 5, 8, 7, 3, 5], color: accent },
        { label: 'Hours Logged', data: [6, 7, 6, 9, 8, 4, 6], color: '#10b981' }
      ],
      { legendId: '#productivity-legend' }
    );

    drawBarChart('#earnings-chart',
      ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
      [8200, 9400, 10200, 11500, 12840]
    );

    drawBarChart('#revenue-chart',
      ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      [7200, 8400, 9100, 10800, 12840, 14200]
    );

    drawBarChart('#project-analytics-chart',
      ['W1', 'W2', 'W3', 'W4'],
      [12, 18, 15, 22]
    );

    drawDonutChart('#payment-status-chart', [
      { label: 'Paid', value: 8, color: '#10b981' },
      { label: 'Pending', value: 4, color: '#f59e0b' },
      { label: 'Unpaid', value: 2, color: '#ef4444' }
    ]);
  }

  /* ==========================================================================
     Dashboard Renderers
     ========================================================================== */
  function renderDashboardWidgets() {
    const completion = $('#completion-stats');
    if (completion) {
      const items = [
        { name: 'Brand Identity', pct: 72 },
        { name: 'E-commerce UI', pct: 45 },
        { name: 'Mobile App', pct: 88 }
      ];
      completion.innerHTML = items.map(i => `
        <div class="completion-item">
          <div class="comp-header"><span>${i.name}</span><span>${i.pct}%</span></div>
          <div class="progress-bar"><div class="progress-fill" data-width="${i.pct}%"></div></div>
        </div>
      `).join('');
      animateProgressBars();
    }

    const meetings = $('#meetings-list');
    if (meetings) {
      meetings.innerHTML = state.meetings.map(m => `
        <li>
          <span class="meeting-time">${m.time}</span>
          <div class="meeting-info">
            <h4>${m.title}</h4>
            <p>${m.client} · ${m.date}</p>
          </div>
        </li>
      `).join('');
    }

    const activity = $('#activity-list');
    if (activity) {
      activity.innerHTML = state.activities.map(a => `
        <li>
          <span class="activity-icon ${a.type}">${a.type === 'payment' ? '$' : a.type === 'project' ? '📁' : a.type === 'client' ? '👤' : '📄'}</span>
          <div>
            <p style="font-size:0.9rem;font-weight:500">${a.text}</p>
            <p class="text-muted">${a.time}</p>
          </div>
        </li>
      `).join('');
    }

    const timeline = $('#activity-timeline');
    if (timeline) {
      timeline.innerHTML = state.timeline.map(t => `
        <div class="timeline-item">
          <time>${t.time}</time>
          <h4>${t.title}</h4>
          <p>${t.desc}</p>
        </div>
      `).join('');
    }

    renderNotifications();
  }

  function renderNotifications() {
    const list = $('#notif-list');
    if (!list) return;
    list.innerHTML = state.notifications.map(n => `
      <li class="notif-item ${n.read ? 'read' : 'unread'}" data-id="${n.id}">
        ${!n.read ? '<span class="notif-dot"></span>' : '<span style="width:8px"></span>'}
        <div>
          <strong style="font-size:0.875rem">${n.title}</strong>
          <p style="font-size:0.8rem;color:var(--text-muted)">${n.message}</p>
          <span class="text-muted" style="font-size:0.75rem">${n.time}</span>
        </div>
      </li>
    `).join('');

    list.querySelectorAll('.notif-item').forEach(item => {
      item.addEventListener('click', () => {
        const n = state.notifications.find(x => x.id === item.dataset.id);
        if (n) n.read = true;
        renderNotifications();
        updateNotifBadge();
      });
    });
    updateNotifBadge();
  }

  function updateNotifBadge() {
    const badge = $('.notif-badge');
    const unread = state.notifications.filter(n => !n.read).length;
    if (badge) {
      badge.textContent = unread;
      badge.style.display = unread ? 'flex' : 'none';
    }
  }

  /* ==========================================================================
     Clients
     ========================================================================== */
  function getFilteredClients() {
    const search = ($('#client-search')?.value || '').toLowerCase();
    const status = $('#client-filter-status')?.value || 'all';
    const sort = $('#client-sort')?.value || 'name';

    let list = [...state.clients];
    if (search) list = list.filter(c =>
      c.name.toLowerCase().includes(search) ||
      c.company.toLowerCase().includes(search) ||
      c.email.toLowerCase().includes(search)
    );
    if (status !== 'all') list = list.filter(c => c.status === status);

    list.sort((a, b) => {
      if (sort === 'projects') return b.projects - a.projects;
      if (sort === 'revenue') return b.revenue - a.revenue;
      return a.name.localeCompare(b.name);
    });
    return list;
  }

  function renderClientCard(c) {
    const payClass = c.payment === 'paid' ? 'paid' : c.payment === 'pending' ? 'pending' : 'overdue';
    return `
      <article class="client-card glass" data-id="${c.id}">
        <div class="client-card-header">
          <div class="client-avatar">${getInitials(c.name)}</div>
          <span class="client-status ${c.status}">${c.status}</span>
        </div>
        <h3>${c.name}</h3>
        <p class="company">${c.company}</p>
        <div class="client-meta">
          <span>✉ ${c.email}</span>
          <span>📞 ${c.phone}</span>
          <span>📁 ${c.projects} active projects</span>
        </div>
        <span class="payment-indicator ${payClass}">● ${c.payment}</span>
        <div class="client-actions">
          <button type="button" class="btn btn-ghost btn-sm edit-client" data-id="${c.id}">Edit</button>
          <button type="button" class="btn btn-secondary btn-sm">View</button>
        </div>
      </article>
    `;
  }

  function renderClients() {
    const clients = getFilteredClients();
    const grid = $('#clients-container');
    const tableWrap = $('#clients-table-wrap');
    const tbody = $('#clients-table-body');

    if (state.clientView === 'grid') {
      grid?.classList.remove('hidden');
      tableWrap?.classList.add('hidden');
      if (grid) grid.innerHTML = clients.map(renderClientCard).join('');
    } else {
      grid?.classList.add('hidden');
      tableWrap?.classList.remove('hidden');
      if (tbody) {
        tbody.innerHTML = clients.map(c => `
          <tr data-id="${c.id}">
            <td><strong>${c.name}</strong><br><small class="text-muted">${c.company}</small></td>
            <td>${c.email}</td>
            <td>${c.projects}</td>
            <td><span class="client-status ${c.status}">${c.status}</span></td>
            <td><span class="payment-indicator ${c.payment}">● ${c.payment}</span></td>
            <td><button type="button" class="btn btn-ghost btn-sm edit-client" data-id="${c.id}">Edit</button></td>
          </tr>
        `).join('');
      }
    }

    bindClientActions();
  }

  function bindClientActions() {
    $$('.edit-client').forEach(btn => {
      btn.addEventListener('click', () => openEditClient(btn.dataset.id));
    });
  }

  function openEditClient(id) {
    const c = state.clients.find(x => x.id === id);
    if (!c) return;
    $('#modal-client-title').textContent = 'Edit Client';
    $('#client-edit-id').value = c.id;
    $('#client-name').value = c.name;
    $('#client-email').value = c.email;
    $('#client-company').value = c.company;
    $('#client-phone').value = c.phone;
    $('#client-status').value = c.status;
    openModal('modal-client');
  }

  function initClients() {
    $('#add-client-btn')?.addEventListener('click', () => {
      $('#modal-client-title').textContent = 'Add Client';
      $('#client-form').reset();
      $('#client-edit-id').value = '';
      openModal('modal-client');
    });

    $('#client-form')?.addEventListener('submit', e => {
      e.preventDefault();
      const id = $('#client-edit-id').value;
      const data = {
        name: $('#client-name').value,
        email: $('#client-email').value,
        company: $('#client-company').value || '—',
        phone: $('#client-phone').value || '—',
        status: $('#client-status').value,
        projects: 0,
        payment: 'pending',
        revenue: 0
      };
      if (id) {
        const idx = state.clients.findIndex(c => c.id === id);
        if (idx >= 0) state.clients[idx] = { ...state.clients[idx], ...data };
        showToast('Client updated successfully', 'success');
      } else {
        state.clients.push({ id: generateId('c'), ...data });
        showToast('Client added successfully', 'success');
      }
      closeAllModals();
      renderClients();
    });

    $('#client-search')?.addEventListener('input', renderClients);
    $('#client-filter-status')?.addEventListener('change', renderClients);
    $('#client-sort')?.addEventListener('change', renderClients);

    $$('.view-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        $$('.view-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.clientView = btn.dataset.view;
        renderClients();
      });
    });
  }

  /* ==========================================================================
     Projects & Kanban
     ========================================================================== */
  function renderProjects() {
    const container = $('#projects-cards');
    if (!container) return;
    container.innerHTML = state.projects.map(p => `
      <article class="project-card glass">
        <div class="project-card-header">
          <span class="priority ${p.priority}">${p.priority}</span>
          <span class="text-muted" style="font-size:0.8rem">${p.deadline}</span>
        </div>
        <h3>${p.name}</h3>
        <p class="project-deadline">Client: ${p.client}</p>
        <div class="project-progress">
          <div class="progress-header"><span>Progress</span><span>${p.progress}%</span></div>
          <div class="progress-bar"><div class="progress-fill" data-width="${p.progress}%"></div></div>
        </div>
        <div class="team-avatars">
          ${p.team.map((m, i) => `<img src="https://api.dicebear.com/7.x/avataaars/svg?seed=${m}" alt="${m}" title="${m}">`).join('')}
        </div>
      </article>
    `).join('');
    animateProgressBars();
  }

  function renderKanban() {
    const statuses = ['todo', 'progress', 'review', 'done'];
    statuses.forEach(status => {
      const col = $(`.kanban-tasks[data-drop="${status}"]`);
      const tasks = state.kanbanTasks.filter(t => t.status === status);
      const countEl = col?.closest('.kanban-column')?.querySelector('.count');
      if (countEl) countEl.textContent = tasks.length;
      if (col) {
        col.innerHTML = tasks.map(t => `
          <div class="kanban-task" draggable="true" data-id="${t.id}">
            <strong>${t.title}</strong>
            <p class="text-muted" style="font-size:0.75rem;margin-top:6px">${t.project}</p>
          </div>
        `).join('');
      }
    });
    initKanbanDragDrop();
  }

  function initKanbanDragDrop() {
    let dragged = null;

    $$('.kanban-task').forEach(task => {
      task.addEventListener('dragstart', e => {
        dragged = task;
        task.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
      });
      task.addEventListener('dragend', () => {
        task.classList.remove('dragging');
        dragged = null;
        $$('.kanban-tasks').forEach(z => z.classList.remove('drag-over'));
      });
    });

    $$('.kanban-tasks').forEach(zone => {
      zone.addEventListener('dragover', e => {
        e.preventDefault();
        zone.classList.add('drag-over');
      });
      zone.addEventListener('dragleave', () => zone.classList.remove('drag-over'));
      zone.addEventListener('drop', e => {
        e.preventDefault();
        zone.classList.remove('drag-over');
        if (!dragged) return;
        const newStatus = zone.dataset.drop;
        const id = dragged.dataset.id;
        const t = state.kanbanTasks.find(x => x.id === id);
        if (t) t.status = newStatus;
        zone.appendChild(dragged);
        renderKanban();
        showToast('Task moved', 'info');
      });
    });
  }

  function initKanbanActions() {
    $('#add-kanban-task')?.addEventListener('click', () => {
      const title = prompt('Task title:');
      if (title) {
        state.kanbanTasks.push({ id: generateId('k'), title, status: 'todo', project: 'General' });
        renderKanban();
        showToast('Task added to board', 'success');
      }
    });
  }

  function initFileUpload() {
    const zone = $('#upload-zone');
    const input = $('#file-input');
    const list = $('#file-list');

    function renderFiles() {
      if (list) {
        list.innerHTML = state.files.map(f =>
          `<li>📄 ${f.name} <span class="text-muted">${f.size}</span></li>`
        ).join('');
      }
    }
    renderFiles();

    zone?.addEventListener('click', () => input?.click());
    zone?.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('dragover'); });
    zone?.addEventListener('dragleave', () => zone.classList.remove('dragover'));
    zone?.addEventListener('drop', e => {
      e.preventDefault();
      zone.classList.remove('dragover');
      handleFiles(e.dataTransfer.files);
    });
    input?.addEventListener('change', () => handleFiles(input.files));

    function handleFiles(files) {
      [...files].forEach(f => {
        state.files.push({ name: f.name, size: (f.size / 1024 / 1024).toFixed(1) + ' MB' });
      });
      renderFiles();
      showToast(`${files.length} file(s) added`, 'success');
    }
  }

  /* ==========================================================================
     Invoices & Payments
     ========================================================================== */
  function renderInvoices() {
    const search = ($('#invoice-search')?.value || '').toLowerCase();
    const filter = $('#invoice-filter')?.value || 'all';
    let list = [...state.invoices];

    if (search) list = list.filter(i => i.client.toLowerCase().includes(search) || i.id.toLowerCase().includes(search));
    if (filter !== 'all') list = list.filter(i => i.status === filter);

    const tbody = $('#invoices-body');
    if (!tbody) return;
    tbody.innerHTML = list.map(inv => `
      <tr>
        <td><strong>${inv.id}</strong></td>
        <td>${inv.client}</td>
        <td>${formatCurrency(inv.amount)}</td>
        <td>${inv.date}</td>
        <td><span class="status-pill ${inv.status}">${inv.status}</span></td>
        <td>
          <button type="button" class="btn btn-ghost btn-sm download-inv" data-id="${inv.id}">Download</button>
        </td>
      </tr>
    `).join('');

    $$('.download-inv').forEach(btn => {
      btn.addEventListener('click', () => {
        showToast(`Downloading ${btn.dataset.id}...`, 'info');
        setTimeout(() => showToast('Invoice downloaded', 'success'), 800);
      });
    });
  }

  function renderPaymentHistory() {
    const el = $('#payment-history');
    if (!el) return;
    el.innerHTML = state.paymentHistory.map(p => `
      <li>
        <div>
          <strong>${p.client}</strong>
          <p class="text-muted">${p.date} · ${p.method}</p>
        </div>
        <span style="font-weight:600;color:#10b981">${formatCurrency(p.amount)}</span>
      </li>
    `).join('');
  }

  function initPayments() {
    $('#generate-invoice-btn')?.addEventListener('click', () => {
      const select = $('#invoice-client');
      if (select) {
        select.innerHTML = state.clients.filter(c => c.status === 'active')
          .map(c => `<option value="${c.id}">${c.name} — ${c.company}</option>`).join('');
      }
      const due = new Date();
      due.setDate(due.getDate() + 14);
      $('#invoice-due').value = due.toISOString().split('T')[0];
      openModal('modal-invoice');
    });

    $('#invoice-form')?.addEventListener('submit', e => {
      e.preventDefault();
      const client = state.clients.find(c => c.id === $('#invoice-client').value);
      const amount = parseFloat($('#invoice-amount').value);
      const id = `INV-${2047 + state.invoices.length}`;
      state.invoices.unshift({
        id,
        client: client?.company || 'Client',
        amount,
        date: new Date().toISOString().split('T')[0],
        status: 'pending'
      });
      closeAllModals();
      renderInvoices();
      showToast(`Invoice ${id} generated`, 'success');
    });

    $('#invoice-search')?.addEventListener('input', renderInvoices);
    $('#invoice-filter')?.addEventListener('change', renderInvoices);
  }

  /* ==========================================================================
     Tasks & Calendar
     ========================================================================== */
  function renderTodos() {
    const filter = $('#todo-filter')?.value || 'all';
    let list = [...state.todos];
    if (filter === 'active') list = list.filter(t => !t.completed);
    if (filter === 'completed') list = list.filter(t => t.completed);

    const ul = $('#todo-list');
    if (!ul) return;
    ul.innerHTML = list.map(t => `
      <li class="todo-item ${t.completed ? 'completed' : ''}" draggable="true" data-id="${t.id}">
        <span class="todo-priority ${t.priority}"></span>
        <button type="button" class="todo-checkbox" aria-label="Toggle complete">${t.completed ? '✓' : ''}</button>
        <span class="todo-text">${t.text}</span>
        <button type="button" class="btn btn-ghost btn-sm delete-todo" data-id="${t.id}">×</button>
      </li>
    `).join('');

    ul.querySelectorAll('.todo-checkbox').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = btn.closest('.todo-item');
        const t = state.todos.find(x => x.id === item.dataset.id);
        if (!t) return;
        t.completed = !t.completed;
        if (t.completed) {
          item.classList.add('completing');
          setTimeout(() => renderTodos(), 500);
        } else renderTodos();
        showToast(t.completed ? 'Task completed!' : 'Task reopened', 'success');
      });
    });

    $$('.delete-todo').forEach(btn => {
      btn.addEventListener('click', () => {
        state.todos = state.todos.filter(t => t.id !== btn.dataset.id);
        renderTodos();
        showToast('Task removed', 'info');
      });
    });

    initTodoDragDrop();
  }

  function initTodoDragDrop() {
    const list = $('#todo-list');
    if (!list) return;
    let dragged = null;

    list.querySelectorAll('.todo-item').forEach(item => {
      item.addEventListener('dragstart', () => {
        dragged = item;
        item.classList.add('dragging');
      });
      item.addEventListener('dragend', () => item.classList.remove('dragging'));
    });

    list.addEventListener('dragover', e => {
      e.preventDefault();
      const after = getDragAfterElement(list, e.clientY);
      if (after == null) list.appendChild(dragged);
      else list.insertBefore(dragged, after);
    });
  }

  function getDragAfterElement(container, y) {
    const elements = [...container.querySelectorAll('.todo-item:not(.dragging)')];
    return elements.reduce((closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) return { offset, element: child };
      return closest;
    }, { offset: Number.NEGATIVE_INFINITY }).element;
  }

  function renderCalendar() {
    const cal = $('#calendar');
    const label = $('#cal-month-label');
    const eventsList = $('#cal-events-list');
    if (!cal) return;

    const year = state.calendarMonth.getFullYear();
    const month = state.calendarMonth.getMonth();
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    if (label) label.textContent = `${monthNames[month]} ${year}`;

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    let html = dayNames.map(d => `<div class="cal-day-name">${d}</div>`).join('');

    for (let i = 0; i < firstDay; i++) html += `<div class="cal-day other"></div>`;

    for (let d = 1; d <= daysInMonth; d++) {
      const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const isToday = today.getFullYear() === year && today.getMonth() === month && today.getDate() === d;
      const hasEvent = state.calendarEvents[dateKey];
      html += `<div class="cal-day ${isToday ? 'today' : ''} ${hasEvent ? 'has-event' : ''}" data-date="${dateKey}">${d}</div>`;
    }

    cal.innerHTML = html;

    const todayKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    const events = state.calendarEvents[todayKey] || ['No events scheduled'];
    if (eventsList) {
      eventsList.innerHTML = events.map(e => `<li>${e}</li>`).join('');
    }

    cal.querySelectorAll('.cal-day[data-date]').forEach(day => {
      day.addEventListener('click', () => {
        const ev = state.calendarEvents[day.dataset.date] || ['No events'];
        if (eventsList) eventsList.innerHTML = ev.map(e => `<li>${e}</li>`).join('');
      });
    });
  }

  function initTasks() {
    $('#todo-add-form')?.addEventListener('submit', e => {
      e.preventDefault();
      const text = $('#todo-input').value.trim();
      if (!text) return;
      state.todos.unshift({
        id: generateId('t'),
        text,
        priority: $('#todo-priority').value,
        completed: false
      });
      $('#todo-input').value = '';
      renderTodos();
      showToast('Task added', 'success');
    });

    $('#todo-filter')?.addEventListener('change', renderTodos);
    $('#add-todo-btn')?.addEventListener('click', () => $('#todo-input')?.focus());

    $('#cal-prev')?.addEventListener('click', () => {
      state.calendarMonth.setMonth(state.calendarMonth.getMonth() - 1);
      renderCalendar();
    });
    $('#cal-next')?.addEventListener('click', () => {
      state.calendarMonth.setMonth(state.calendarMonth.getMonth() + 1);
      renderCalendar();
    });
  }

  /* ==========================================================================
     Settings Tabs
     ========================================================================== */
  function initSettings() {
    $$('.settings-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        $$('.settings-tab').forEach(t => t.classList.remove('active'));
        $$('.settings-panel').forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        $(`#settings-${tab.dataset.tab}`)?.classList.add('active');
      });
    });

    $('#profile-form')?.addEventListener('submit', e => {
      e.preventDefault();
      showToast('Profile saved successfully', 'success');
    });
  }

  /* ==========================================================================
     Notifications Panel
     ========================================================================== */
  function initNotifications() {
    const panel = $('#notif-panel');
    $('#notif-toggle')?.addEventListener('click', e => {
      e.stopPropagation();
      panel.hidden = !panel.hidden;
    });
    document.addEventListener('click', e => {
      if (!panel?.contains(e.target) && !$('#notif-toggle')?.contains(e.target)) {
        panel.hidden = true;
      }
    });
    $('#mark-all-read')?.addEventListener('click', () => {
      state.notifications.forEach(n => n.read = true);
      renderNotifications();
      showToast('All notifications marked read', 'info');
    });
  }

  /* ==========================================================================
     Global Search, Quick Add, FAB, AI Chat
     ========================================================================== */
  function initGlobalSearch() {
    $('#global-search')?.addEventListener('keydown', e => {
      if (e.key === 'k' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        e.target.focus();
      }
      if (e.key === 'Enter') {
        const q = e.target.value.toLowerCase();
        if (!q) return;
        const client = state.clients.find(c => c.name.toLowerCase().includes(q));
        if (client) { navigateTo('clients'); showToast(`Found client: ${client.name}`, 'info'); return; }
        const project = state.projects.find(p => p.name.toLowerCase().includes(q));
        if (project) { navigateTo('projects'); showToast(`Found project: ${project.name}`, 'info'); return; }
        showToast('No results found', 'error');
      }
    });
  }

  function initQuickAdd() {
    $('#quick-add-btn')?.addEventListener('click', () => openModal('modal-quick'));
    $$('[data-quick]').forEach(btn => {
      btn.addEventListener('click', () => {
        closeAllModals();
        const type = btn.dataset.quick;
        if (type === 'client') openModal('modal-client');
        else if (type === 'invoice') { initPayments(); openModal('modal-invoice'); }
        else if (type === 'task') navigateTo('tasks');
        else if (type === 'project') navigateTo('projects');
      });
    });
    $('#fab')?.addEventListener('click', () => openModal('modal-quick'));
  }

  function initAIChat() {
    const panel = $('#ai-panel');
    const messages = $('#ai-messages');

    $('#ai-toggle')?.addEventListener('click', () => {
      panel.hidden = !panel.hidden;
    });
    $('#ai-close')?.addEventListener('click', () => { panel.hidden = true; });

    $('#ai-form')?.addEventListener('submit', e => {
      e.preventDefault();
      const input = $('#ai-input');
      const text = input.value.trim();
      if (!text) return;

      const userMsg = document.createElement('div');
      userMsg.className = 'ai-msg user';
      userMsg.textContent = text;
      messages.appendChild(userMsg);
      input.value = '';
      messages.scrollTop = messages.scrollHeight;

      setTimeout(() => {
        const replies = [
          'Based on your dashboard, you have 7 pending invoices totaling $4,280. Would you like me to draft reminder emails?',
          'Your productivity score is 87 this week — great work! I suggest blocking 2 hours tomorrow for the Brand Identity deadline.',
          'You have 3 meetings today. I can help you prepare an agenda for the TechStart design review.',
          'I\'ve analyzed your earnings trend — May is up 18% from April. Consider raising rates for repeat clients.'
        ];
        const botMsg = document.createElement('div');
        botMsg.className = 'ai-msg bot';
        botMsg.textContent = replies[Math.floor(Math.random() * replies.length)];
        messages.appendChild(botMsg);
        messages.scrollTop = messages.scrollHeight;
      }, 600);
    });
  }

  /* ==========================================================================
     Simulated Real-time Updates
     ========================================================================== */
  function initRealtimeSimulation() {
    setInterval(() => {
      const card = state.projects[Math.floor(Math.random() * state.projects.length)];
      if (card && card.progress < 100) {
        card.progress = Math.min(100, card.progress + Math.floor(Math.random() * 3));
        if ($('#page-projects')?.classList.contains('active')) renderProjects();
      }
    }, 8000);

    setInterval(() => {
      const scoreEl = $('.score-value');
      const ring = $('.score-fill');
      if (!scoreEl) return;
      let score = parseInt(scoreEl.textContent, 10);
      score = Math.min(99, Math.max(70, score + (Math.random() > 0.5 ? 1 : -1)));
      scoreEl.textContent = score;
      if (ring) ring.setAttribute('stroke-dasharray', `${score}, 100`);
    }, 12000);
  }

  /* ==========================================================================
     Table Sorting
     ========================================================================== */
  function initTableSort() {
    $$('#clients-table th[data-sort]').forEach(th => {
      th.addEventListener('click', () => {
        const key = th.dataset.sort;
        const map = { name: 'name', email: 'email', projects: 'projects', status: 'status', payment: 'payment' };
        $('#client-sort').value = key === 'payment' ? 'revenue' : map[key] === 'name' ? 'name' : map[key];
        if (key === 'payment') $('#client-sort').value = 'revenue';
        else if (key === 'projects') $('#client-sort').value = 'projects';
        else $('#client-sort').value = 'name';
        renderClients();
      });
    });
  }

  /* ==========================================================================
     Init
     ========================================================================== */
  function init() {
    initLoader();
    initOnboarding();
    initTheme();
    initModals();
    initNavigation();
    initClients();
    initPayments();
    initTasks();
    initSettings();
    initNotifications();
    initGlobalSearch();
    initQuickAdd();
    initAIChat();
    initFileUpload();
    initKanbanActions();
    initTableSort();
    initRealtimeSimulation();

    $('#export-report')?.addEventListener('click', () => {
      showToast('Generating report...', 'info');
      setTimeout(() => showToast('Report exported successfully', 'success'), 1200);
    });

    renderDashboardWidgets();
    renderClients();
    renderProjects();
    renderKanban();
    renderInvoices();
    renderPaymentHistory();
    renderTodos();
    renderCalendar();

    window.addEventListener('resize', () => {
      if ($('#page-dashboard')?.classList.contains('active')) redrawCharts();
    });

    setTimeout(redrawCharts, 1500);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

aler("Website is AI Generated Developer's contribution is just a Prompt which was generated by AI ")