import { NextResponse } from 'next/server'

export async function GET() {
  const html = `
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
            display: none !important;
        }

        .btn {
            padding: 8px 16px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
            margin: 0 4px;
            transition: background-color 0.2s;
        }

        .btn-primary {
            background-color: #3b82f6;
            color: white;
        }

        .btn-primary:hover {
            background-color: #2563eb;
        }

        .btn-success {
            background-color: #10b981;
            color: white;
        }

        .btn-success:hover {
            background-color: #059669;
        }

        .btn-danger {
            background-color: #ef4444;
            color: white;
        }

        .btn-danger:hover {
            background-color: #dc2626;
        }

        .btn-secondary {
            background-color: #6b7280;
            color: white;
        }

        .btn-secondary:hover {
            background-color: #4b5563;
        }

        .form-group {
            margin-bottom: 15px;
        }

        .form-group label {
            display: block;
            margin-bottom: 5px;
            font-weight: 500;
            color: #374151;
        }

        .form-group input,
        .form-group textarea,
        .form-group select {
            width: 100%;
            padding: 8px 12px;
            border: 1px solid #d1d5db;
            border-radius: 4px;
            font-size: 14px;
        }

        .form-group textarea {
            height: 150px;
            resize: vertical;
            white-space: pre-wrap;
            line-height: 1.5;
        }

        .form-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
        }

        .modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
        }

        .modal-content {
            background: white;
            padding: 30px;
            border-radius: 8px;
            max-width: 600px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
        }

        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }

        .modal-header h3 {
            margin: 0;
            color: #1f2937;
        }

        .close-btn {
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: #6b7280;
        }

        .close-btn:hover {
            color: #374151;
        }

        .section-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }

        .section-header h2 {
            margin: 0;
        }

        /* Drag and Drop Styles */
        .image-preview-item {
            user-select: none;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
        }

        .image-preview-item:hover {
            border-color: #9ca3af !important;
        }

        .image-preview-item:active {
            cursor: grabbing !important;
        }

        #image-preview {
            min-height: 50px;
            padding: 10px;
            border: 2px dashed #e5e7eb;
            border-radius: 8px;
            background: #f9fafb;
        }

        #image-preview:empty::after {
            content: 'No images uploaded yet. Upload images to see them here.';
            display: block;
            text-align: center;
            color: #9ca3af;
            padding: 20px;
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
            <div class="section-header">
                <h2>Cabins Management</h2>
                <button class="btn btn-primary" onclick="showCabinForm()">Add New Cabin</button>
            </div>
            <table id="cabins-table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Location</th>
                        <th>Price/Night</th>
                        <th>Max Guests</th>
                        <th>Status</th>
                        <th>Host</th>
                        <th>Actions</th>
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

    <!-- Cabin Form Modal -->
    <div id="cabin-modal" class="modal hidden">
        <div class="modal-content">
            <div class="modal-header">
                <h3 id="cabin-modal-title">Add New Cabin</h3>
                <button class="close-btn" onclick="hideCabinForm()">&times;</button>
            </div>
            <form id="cabin-form" onsubmit="saveCabin(event)">
                <input type="hidden" id="cabin-id" name="id">

                <div class="form-group">
                    <label for="cabin-title">Title *</label>
                    <input type="text" id="cabin-title" name="title" required>
                </div>

                <div class="form-group">
                    <label for="cabin-description">Description *</label>
                    <textarea id="cabin-description" name="description" required></textarea>
                </div>

                <div class="form-group">
                    <label for="cabin-location">Location *</label>
                    <input type="text" id="cabin-location" name="location" required>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label for="cabin-price">Price per Night ($) *</label>
                        <input type="number" id="cabin-price" name="price_per_night" step="0.01" min="0" required>
                    </div>
                    <div class="form-group">
                        <label for="cabin-max-guests">Max Guests *</label>
                        <input type="number" id="cabin-max-guests" name="max_guests" min="1" required>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label for="cabin-bedrooms">Bedrooms *</label>
                        <input type="number" id="cabin-bedrooms" name="bedrooms" min="1" required>
                    </div>
                    <div class="form-group">
                        <label for="cabin-bathrooms">Bathrooms *</label>
                        <input type="number" id="cabin-bathrooms" name="bathrooms" min="1" required>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label for="cabin-host">Host *</label>
                        <select id="cabin-host" name="host_id" required>
                            <option value="">Select Host</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="cabin-status">Status</label>
                        <select id="cabin-status" name="status">
                            <option value="pending">Pending</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>
                </div>

                <div class="form-group">
                    <label for="cabin-amenities">Amenities (comma-separated)</label>
                    <input type="text" id="cabin-amenities" name="amenities" placeholder="WiFi, Pool, Kitchen, etc.">
                </div>

                <div class="form-group">
                    <label for="cabin-images">Cabin Images</label>
                    <input type="file" id="cabin-image-upload" accept="image/jpeg,image/png,image/webp" multiple style="margin-bottom: 10px;">
                    <button type="button" id="upload-images-btn" style="margin-bottom: 10px; padding: 8px 16px; background: #10b981; color: white; border: none; border-radius: 6px; cursor: pointer;">Upload Images</button>
                    <div id="upload-progress" style="display: none; margin-bottom: 10px; padding: 8px; background: #dbeafe; border-radius: 6px; color: #1e40af;"></div>
                    <div id="image-preview" style="display: flex; flex-wrap: wrap; gap: 10px; margin-top: 10px;"></div>
                    <input type="hidden" id="cabin-images" name="images">
                </div>

                <div class="form-group">
                    <label>
                        <input type="checkbox" id="cabin-featured" name="is_featured">
                        Featured Cabin
                    </label>
                </div>

                <div style="text-align: right; margin-top: 20px;">
                    <button type="button" class="btn btn-secondary" onclick="hideCabinForm()">Cancel</button>
                    <button type="submit" class="btn btn-primary">Save Cabin</button>
                </div>
            </form>
        </div>
    </div>

    <script>
        // Check authentication on page load
        const auth = localStorage.getItem('adminAuth');
        if (!auth) {
            window.location.href = '/api/admin-app';
        }
        
        let users = [];
        let cabins = [];
        let bookings = [];
        
        function logout() {
            localStorage.removeItem('adminAuth');
            window.location.href = '/api/admin-app';
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
            tbody.innerHTML = '';

            cabins.forEach((cabin, index) => {
                const row = document.createElement('tr');
                row.innerHTML =
                    '<td>' + cabin.title + '</td>' +
                    '<td>' + cabin.location + '</td>' +
                    '<td>$' + cabin.price_per_night + '</td>' +
                    '<td>' + cabin.max_guests + '</td>' +
                    '<td><span class="badge ' + cabin.status + '">' + cabin.status + '</span></td>' +
                    '<td>' + (cabin.host && cabin.host.name ? cabin.host.name : 'Unknown Host') + '</td>' +
                    '<td>' +
                        '<button class="btn btn-primary">Edit</button> ' +
                        '<button class="btn btn-danger">Delete</button>' +
                    '</td>';

                // Add event listeners to avoid string escaping issues
                const editBtn = row.querySelector('.btn-primary');
                const deleteBtn = row.querySelector('.btn-danger');

                editBtn.addEventListener('click', function() {
                    editCabin(index);
                });

                deleteBtn.addEventListener('click', function() {
                    deleteCabin(cabin.id, cabin.title);
                });

                tbody.appendChild(row);
            });
        }
        
        async function loadBookings() {
            bookings = await fetchData('bookings');
            document.getElementById('bookings-count').textContent = bookings.length;

            const tbody = document.getElementById('bookings-tbody');
            tbody.innerHTML = bookings.map(booking =>
                '<tr>' +
                '<td>' + (booking.cabin && booking.cabin.title ? booking.cabin.title : 'Unknown Cabin') + '</td>' +
                '<td>' + (booking.guest && booking.guest.name ? booking.guest.name : 'Unknown Guest') + '</td>' +
                '<td>' + booking.check_in + '</td>' +
                '<td>' + booking.check_out + '</td>' +
                '<td>$' + booking.total_price + '</td>' +
                '<td><span class="badge ' + booking.status + '">' + booking.status + '</span></td>' +
                '</tr>'
            ).join('');
        }

        // Cabin Management Functions
        function editCabin(index) {
            const cabin = cabins[index];
            showCabinForm(cabin);
        }

        function showCabinForm(cabin = null) {
            const modal = document.getElementById('cabin-modal');
            const form = document.getElementById('cabin-form');
            const title = document.getElementById('cabin-modal-title');

            // Populate host dropdown
            const hostSelect = document.getElementById('cabin-host');
            hostSelect.innerHTML = '<option value="">Select Host</option>';
            users.forEach(user => {
                const option = document.createElement('option');
                option.value = user.id;
                option.textContent = user.name + ' (' + user.email + ')';
                hostSelect.appendChild(option);
            });

            if (cabin) {
                // Edit mode
                title.textContent = 'Edit Cabin';
                document.getElementById('cabin-id').value = cabin.id;
                document.getElementById('cabin-title').value = cabin.title;
                document.getElementById('cabin-description').value = cabin.description;
                document.getElementById('cabin-location').value = cabin.location;
                document.getElementById('cabin-price').value = cabin.price_per_night;
                document.getElementById('cabin-max-guests').value = cabin.max_guests;
                document.getElementById('cabin-bedrooms').value = cabin.bedrooms;
                document.getElementById('cabin-bathrooms').value = cabin.bathrooms;
                document.getElementById('cabin-host').value = cabin.host_id;
                document.getElementById('cabin-status').value = cabin.status;
                document.getElementById('cabin-amenities').value = cabin.amenities ? cabin.amenities.join(', ') : '';
                document.getElementById('cabin-images').value = cabin.images ? cabin.images.join(', ') : '';
                document.getElementById('cabin-featured').checked = cabin.is_featured;
                displayImagePreviews();
            } else {
                // Add mode
                title.textContent = 'Add New Cabin';
                form.reset();
                document.getElementById('cabin-id').value = '';
                document.getElementById('image-preview').innerHTML = '';
            }

            modal.classList.remove('hidden');
        }

        function hideCabinForm(skipConfirmation = false) {
            const modal = document.getElementById('cabin-modal');

            // Check if form has data and confirm before closing
            if (!skipConfirmation) {
                const titleInput = document.getElementById('cabin-title');
                const hasData = titleInput && titleInput.value.trim() !== '';

                if (hasData) {
                    if (!confirm('Are you sure you want to close? Any unsaved changes will be lost.')) {
                        return; // Don't close if user cancels
                    }
                }
            }

            modal.classList.add('hidden');

            // Reset form
            const form = document.getElementById('cabin-form');
            form.reset();
            document.getElementById('cabin-id').value = '';
            document.getElementById('image-preview').innerHTML = '';
            document.getElementById('cabin-images').value = '';
        }

        // Image upload functionality
        let uploadedImageUrls = [];

        function displayImagePreviews() {
            const previewContainer = document.getElementById('image-preview');
            const imagesInput = document.getElementById('cabin-images');
            const currentImages = imagesInput.value ? imagesInput.value.split(',').map(s => s.trim()).filter(s => s) : [];

            previewContainer.innerHTML = currentImages.map((url, index) =>
                '<div class="image-preview-item" draggable="true" data-index="' + index + '" style="position: relative; width: 100px; height: 100px; border: 2px solid #e5e7eb; border-radius: 8px; overflow: hidden; cursor: move; transition: all 0.2s;">' +
                    '<img src="' + url + '" style="width: 100%; height: 100%; object-fit: cover; pointer-events: none;">' +
                    '<button type="button" onclick="removeImage(' + index + ')" style="position: absolute; top: 4px; right: 4px; background: #ef4444; color: white; border: none; border-radius: 50%; width: 24px; height: 24px; cursor: pointer; font-size: 12px; z-index: 10;">×</button>' +
                    '<div style="position: absolute; bottom: 4px; left: 4px; background: rgba(0,0,0,0.7); color: white; padding: 2px 6px; border-radius: 4px; font-size: 10px; font-weight: bold;">' + (index + 1) + '</div>' +
                '</div>'
            ).join('');

            // Add drag and drop event listeners
            initializeDragAndDrop();
        }

        function initializeDragAndDrop() {
            const items = document.querySelectorAll('.image-preview-item');
            let draggedItem = null;
            let draggedIndex = null;

            items.forEach(item => {
                item.addEventListener('dragstart', function(e) {
                    draggedItem = this;
                    draggedIndex = parseInt(this.getAttribute('data-index'));
                    this.style.opacity = '0.5';
                    e.dataTransfer.effectAllowed = 'move';
                });

                item.addEventListener('dragend', function(e) {
                    this.style.opacity = '1';
                    this.style.border = '2px solid #e5e7eb';
                });

                item.addEventListener('dragover', function(e) {
                    e.preventDefault();
                    e.dataTransfer.dropEffect = 'move';

                    if (this !== draggedItem) {
                        this.style.border = '2px solid #3b82f6';
                        this.style.transform = 'scale(1.05)';
                    }
                });

                item.addEventListener('dragleave', function(e) {
                    this.style.border = '2px solid #e5e7eb';
                    this.style.transform = 'scale(1)';
                });

                item.addEventListener('drop', function(e) {
                    e.preventDefault();
                    this.style.border = '2px solid #e5e7eb';
                    this.style.transform = 'scale(1)';

                    if (this !== draggedItem) {
                        const dropIndex = parseInt(this.getAttribute('data-index'));
                        reorderImages(draggedIndex, dropIndex);
                    }
                });
            });
        }

        function reorderImages(fromIndex, toIndex) {
            const imagesInput = document.getElementById('cabin-images');
            const currentImages = imagesInput.value.split(',').map(s => s.trim()).filter(s => s);

            // Remove the item from the old position
            const [movedImage] = currentImages.splice(fromIndex, 1);

            // Insert it at the new position
            currentImages.splice(toIndex, 0, movedImage);

            // Update the hidden input
            imagesInput.value = currentImages.join(', ');

            // Refresh the preview
            displayImagePreviews();
        }

        function removeImage(index) {
            const imagesInput = document.getElementById('cabin-images');
            const currentImages = imagesInput.value.split(',').map(s => s.trim()).filter(s => s);
            currentImages.splice(index, 1);
            imagesInput.value = currentImages.join(', ');
            displayImagePreviews();
        }

        async function uploadImages() {
            const fileInput = document.getElementById('cabin-image-upload');
            const files = fileInput.files;
            const cabinId = document.getElementById('cabin-id').value;

            if (!files || files.length === 0) {
                alert('Please select images to upload');
                return;
            }

            // For new cabins, allow uploading images before saving
            // They will be saved when the cabin is created
            const isNewCabin = !cabinId || cabinId === '';

            const progressDiv = document.getElementById('upload-progress');
            progressDiv.style.display = 'block';
            progressDiv.textContent = 'Uploading images...';

            try {
                const formData = new FormData();
                if (!isNewCabin) {
                    formData.append('cabinId', cabinId);
                }

                for (let i = 0; i < files.length; i++) {
                    formData.append('files', files[i]);
                }

                const response = await fetch('/api/admin/upload-images', {
                    method: 'POST',
                    body: formData
                });

                if (!response.ok) {
                    const error = await response.json();
                    throw new Error(error.error || 'Failed to upload images');
                }

                const result = await response.json();

                // Add new URLs to existing images
                const imagesInput = document.getElementById('cabin-images');
                const currentImages = imagesInput.value ? imagesInput.value.split(',').map(s => s.trim()).filter(s => s) : [];
                const newImages = [...currentImages, ...result.imageUrls];
                imagesInput.value = newImages.join(', ');

                // Update the cabin with new images (only if editing existing cabin)
                if (!isNewCabin) {
                    await updateCabinImages(cabinId, newImages);
                    progressDiv.textContent = 'Images uploaded and cabin updated!';
                } else {
                    progressDiv.textContent = 'Images uploaded! Click "Save Cabin" to complete.';
                }

                displayImagePreviews();
                fileInput.value = '';

                setTimeout(() => {
                    progressDiv.style.display = 'none';
                }, 3000);

            } catch (error) {
                progressDiv.style.display = 'none';
                alert('Error uploading images: ' + error.message);
            }
        }

        async function updateCabinImages(cabinId, images) {
            const response = await fetch('/api/admin/cabins/' + cabinId, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ images: images })
            });

            if (!response.ok) {
                throw new Error('Failed to update cabin images');
            }
        }

        async function saveCabin(event) {
            event.preventDefault();

            try {
                showLoading();
                hideError();

                const formData = new FormData(event.target);
                const cabinData = {
                    title: formData.get('title'),
                    description: formData.get('description'),
                    location: formData.get('location'),
                    price_per_night: parseFloat(formData.get('price_per_night')),
                    max_guests: parseInt(formData.get('max_guests')),
                    bedrooms: parseInt(formData.get('bedrooms')),
                    bathrooms: parseInt(formData.get('bathrooms')),
                    host_id: formData.get('host_id'),
                    status: formData.get('status'),
                    is_featured: formData.get('is_featured') === 'on',
                    amenities: formData.get('amenities') ? formData.get('amenities').split(',').map(s => s.trim()).filter(s => s) : [],
                    images: formData.get('images') ? formData.get('images').split(',').map(s => s.trim()).filter(s => s) : []
                };

                const cabinId = formData.get('id');
                const isEdit = cabinId && cabinId !== '';

                const url = isEdit ? '/api/admin/cabins/' + cabinId : '/api/admin/cabins';
                const method = isEdit ? 'PUT' : 'POST';

                const response = await fetch(url, {
                    method: method,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(cabinData)
                });

                if (!response.ok) {
                    const error = await response.json();
                    throw new Error(error.error || 'Failed to save cabin');
                }

                hideCabinForm();
                await loadCabins();

            } catch (error) {
                showError('Error saving cabin: ' + error.message);
            } finally {
                hideLoading();
            }
        }

        async function deleteCabin(cabinId, cabinTitle) {
            if (!confirm('Are you sure you want to delete "' + cabinTitle + '"? This action cannot be undone.')) {
                return;
            }

            try {
                showLoading();
                hideError();

                const response = await fetch('/api/admin/cabins/' + cabinId, {
                    method: 'DELETE'
                });

                if (!response.ok) {
                    const error = await response.json();
                    throw new Error(error.error || 'Failed to delete cabin');
                }

                await loadCabins();

            } catch (error) {
                showError('Error deleting cabin: ' + error.message);
            } finally {
                hideLoading();
            }
        }

        // Initialize modal functionality
        function initializeModal() {
            const modal = document.getElementById('cabin-modal');

            // Ensure modal is hidden on page load
            modal.classList.add('hidden');

            // REMOVED: Click-outside to close (prevents accidental data loss)
            // REMOVED: Escape key to close (prevents accidental data loss)
            // Users must use the X button or Cancel button to close the modal
        }

        // Initialize upload button
        document.getElementById('upload-images-btn').addEventListener('click', uploadImages);

        // Load initial data
        initializeModal();
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
