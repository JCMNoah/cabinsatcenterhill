import { NextResponse } from 'next/server'

export async function GET() {
  // Redirect to the isolated admin system
  return NextResponse.redirect(new URL('/api/admin-dashboard', 'http://localhost:3000'))
}
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cabins Admin Dashboard</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background-color: #f9fafb;
            color: #111827;
        }
        
        .header {
            background-color: #1f2937;
            color: white;
            padding: 20px;
            border-bottom: 1px solid #374151;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        
        .logout-btn {
            background: #ef4444;
            color: white;
            padding: 8px 16px;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
        }
        
        .logout-btn:hover {
            background: #dc2626;
        }
        
        .nav {
            padding: 20px;
            border-bottom: 1px solid #e5e7eb;
            background-color: #ffffff;
        }
        
        .nav button {
            padding: 12px 24px;
            margin: 0 4px;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 500;
            transition: all 0.2s;
        }
        
        .nav button.active {
            background-color: #3b82f6;
            color: white;
        }
        
        .nav button:not(.active) {
            background-color: #f3f4f6;
            color: #374151;
        }
        
        .nav button:hover:not(.active) {
            background-color: #e5e7eb;
        }
        
        .content {
            padding: 20px;
            max-width: 1200px;
            margin: 0 auto;
        }
        
        .error {
            background-color: #fef2f2;
            border: 1px solid #fecaca;
            color: #dc2626;
            padding: 12px;
            border-radius: 8px;
            margin-bottom: 20px;
        }
        
        .loading {
            text-align: center;
            padding: 40px;
        }
        
        .spinner {
            border: 3px solid #f3f4f6;
            border-top: 3px solid #3b82f6;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
            margin: 0 auto 20px;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        .dashboard-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-top: 20px;
        }
        
        .dashboard-card {
            padding: 20px;
            border-radius: 8px;
            border: 1px solid;
        }
        
        .dashboard-card.users {
            background: #dbeafe;
            border-color: #3b82f6;
            color: #1e40af;
        }
        
        .dashboard-card.cabins {
            background: #dcfce7;
            border-color: #22c55e;
            color: #15803d;
        }
        
        .dashboard-card.bookings {
            background: #fef3c7;
            border-color: #f59e0b;
            color: #d97706;
        }
        
        .dashboard-card h3 {
            margin: 0 0 10px 0;
            font-size: 18px;
        }
        
        .dashboard-card .count {
            font-size: 24px;
            font-weight: bold;
        }
        
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
            background: white;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
        
        th, td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #e5e7eb;
        }
        
        th {
            background-color: #f9fafb;
            font-weight: 600;
            color: #374151;
        }
        
        .badge {
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: 500;
        }
        
        .badge.admin {
            background-color: #dbeafe;
            color: #1e40af;
        }
        
        .badge.guest {
            background-color: #f3f4f6;
            color: #374151;
        }
        
        .badge.host {
            background-color: #fef3c7;
            color: #d97706;
        }
        
        .badge.active {
            background-color: #dcfce7;
            color: #15803d;
        }
        
        .badge.confirmed {
            background-color: #dcfce7;
            color: #15803d;
        }
        
        .badge.pending {
            background-color: #fef3c7;
            color: #d97706;
        }
        
        .badge.completed {
            background-color: #e0e7ff;
            color: #3730a3;
        }
        
        .hidden {
            display: none;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>🏠 Cabins Admin Dashboard</h1>
        <button class="logout-btn" onclick="logout()">Logout</button>
    </div>
    
    <div class="nav">
        <button id="dashboard-btn" class="active" onclick="showTab('dashboard')">Dashboard</button>
        <button id="users-btn" onclick="showTab('users')">Users</button>
        <button id="cabins-btn" onclick="showTab('cabins')">Cabins</button>
        <button id="bookings-btn" onclick="showTab('bookings')">Bookings</button>
    </div>
    
    <div class="content">
        <div id="error" class="error hidden"></div>
        <div id="loading" class="loading hidden">
            <div class="spinner"></div>
            Loading...
        </div>
        
        <!-- Dashboard Tab -->
        <div id="dashboard-tab">
            <h2>Welcome to Cabins Admin!</h2>
            <div class="dashboard-grid">
                <div class="dashboard-card users">
                    <h3>Users</h3>
                    <div class="count" id="users-count">0</div>
                </div>
                <div class="dashboard-card cabins">
                    <h3>Cabins</h3>
                    <div class="count" id="cabins-count">0</div>
                </div>
                <div class="dashboard-card bookings">
                    <h3>Bookings</h3>
                    <div class="count" id="bookings-count">0</div>
                </div>
            </div>
        </div>
        
        <!-- Users Tab -->
        <div id="users-tab" class="hidden">
            <h2>Users Management</h2>
            <table id="users-table">
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Phone</th>
                        <th>Created</th>
                    </tr>
                </thead>
                <tbody id="users-tbody">
                </tbody>
            </table>
        </div>
        
        <!-- Cabins Tab -->
        <div id="cabins-tab" class="hidden">
            <h2>Cabins Management</h2>
            <table id="cabins-table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Location</th>
                        <th>Price/Night</th>
                        <th>Max Guests</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody id="cabins-tbody">
                </tbody>
            </table>
        </div>
        
        <!-- Bookings Tab -->
        <div id="bookings-tab" class="hidden">
            <h2>Bookings Management</h2>
            <table id="bookings-table">
                <thead>
                    <tr>
                        <th>Cabin</th>
                        <th>Guest</th>
                        <th>Check In</th>
                        <th>Check Out</th>
                        <th>Total</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody id="bookings-tbody">
                </tbody>
            </table>
        </div>
    </div>
    
    <script>
        // Check authentication on page load
        const auth = localStorage.getItem('adminAuth');
        if (!auth) {
            window.location.href = '/admin';
        }
        
        let users = [];
        let cabins = [];
        let bookings = [];
        
        function logout() {
            localStorage.removeItem('adminAuth');
            window.location.href = '/admin';
        }
        
        function showError(message) {
            const errorDiv = document.getElementById('error');
            errorDiv.textContent = message;
            errorDiv.classList.remove('hidden');
        }
        
        function hideError() {
            document.getElementById('error').classList.add('hidden');
        }
        
        function showLoading() {
            document.getElementById('loading').classList.remove('hidden');
        }
        
        function hideLoading() {
            document.getElementById('loading').classList.add('hidden');
        }
        
        function showTab(tabName) {
            // Hide all tabs
            document.querySelectorAll('[id$="-tab"]').forEach(tab => {
                tab.classList.add('hidden');
            });
            
            // Remove active class from all buttons
            document.querySelectorAll('.nav button').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Show selected tab
            document.getElementById(tabName + '-tab').classList.remove('hidden');
            document.getElementById(tabName + '-btn').classList.add('active');
            
            // Load data if needed
            if (tabName === 'users' && users.length === 0) {
                loadUsers();
            } else if (tabName === 'cabins' && cabins.length === 0) {
                loadCabins();
            } else if (tabName === 'bookings' && bookings.length === 0) {
                loadBookings();
            }
        }
        
        async function fetchData(resource) {
            try {
                showLoading();
                hideError();
                
                const response = await fetch('/api/admin/' + resource);
                if (!response.ok) {
                    throw new Error('Failed to fetch ' + resource + ': ' + response.status);
                }
                
                const result = await response.json();
                return result.data || [];
            } catch (error) {
                showError('Error loading ' + resource + ': ' + error.message);
                return [];
            } finally {
                hideLoading();
            }
        }
        
        async function loadUsers() {
            users = await fetchData('users');
            document.getElementById('users-count').textContent = users.length;
            
            const tbody = document.getElementById('users-tbody');
            tbody.innerHTML = users.map(user => 
                '<tr>' +
                '<td>' + user.email + '</td>' +
                '<td>' + user.name + '</td>' +
                '<td><span class="badge ' + user.role + '">' + user.role + '</span></td>' +
                '<td>' + (user.phone || '-') + '</td>' +
                '<td>' + new Date(user.created_at).toLocaleDateString() + '</td>' +
                '</tr>'
            ).join('');
        }
        
        async function loadCabins() {
            cabins = await fetchData('cabins');
            document.getElementById('cabins-count').textContent = cabins.length;
            
            const tbody = document.getElementById('cabins-tbody');
            tbody.innerHTML = cabins.map(cabin => 
                '<tr>' +
                '<td>' + cabin.title + '</td>' +
                '<td>' + cabin.location + '</td>' +
                '<td>$' + cabin.price_per_night + '</td>' +
                '<td>' + cabin.max_guests + '</td>' +
                '<td><span class="badge ' + cabin.status + '">' + cabin.status + '</span></td>' +
                '</tr>'
            ).join('');
        }
        
        async function loadBookings() {
            bookings = await fetchData('bookings');
            document.getElementById('bookings-count').textContent = bookings.length;
            
            const tbody = document.getElementById('bookings-tbody');
            tbody.innerHTML = bookings.map(booking => 
                '<tr>' +
                '<td>' + booking.cabin_id.substring(0, 8) + '...</td>' +
                '<td>' + booking.guest_id.substring(0, 8) + '...</td>' +
                '<td>' + booking.check_in + '</td>' +
                '<td>' + booking.check_out + '</td>' +
                '<td>$' + booking.total_price + '</td>' +
                '<td><span class="badge ' + booking.status + '">' + booking.status + '</span></td>' +
                '</tr>'
            ).join('');
        }
        
        // Load initial data
        loadUsers();
        loadCabins();
        loadBookings();
    </script>
</body>
</html>
  `

  return new NextResponse(html, {
    headers: {
      'Content-Type': 'text/html',
    },
  })
}
