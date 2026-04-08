// Sample Data - Top Selling Products
let topProducts = [
    { id: 1, name: "Candy Product #1", category: "Sweets", rating: 4.8, sales: 1245 },
    { id: 2, name: "Toy Product #1", category: "Toys", rating: 4.5, sales: 982 },
    { id: 3, name: "Candy Product #3", category: "Candy", rating: 4.9, sales: 876 },
    { id: 4, name: "Candy Product #2", category: "Candy", rating: 4.7, sales: 743 },
    { id: 5, name: "Snack Product #1", category: "Snacks", rating: 4.6, sales: 654 },
    { id: 6, name: "Beverage Product #1", category: "Beverages", rating: 4.4, sales: 521 },
    { id: 7, name: "Toy Product #2", category: "Toys", rating: 4.3, sales: 498 },
    { id: 8, name: "Candy Product #4", category: "Candy", rating: 4.2, sales: 432 },
    { id: 9, name: "Snack Product #2", category: "Snacks", rating: 4.1, sales: 389 },
    { id: 10, name: "Beverage Product #2", category: "Beverages", rating: 4.0, sales: 345 }
];

let salesChart = null;

// Render Top Products (only show top 4 on main page)
function renderTopProducts(searchTerm = '') {
    const container = document.getElementById('topProductsList');
    let filtered = [...topProducts];
    
    if (searchTerm) {
        filtered = filtered.filter(p => 
            p.name.toLowerCase().includes(searchTerm) || 
            p.category.toLowerCase().includes(searchTerm)
        );
    }
    
    // Only show first 4 products on the main page
    const productsToShow = filtered.slice(0, 4);
    
    if (productsToShow.length === 0) {
        container.innerHTML = '<div style="padding: 20px; text-align: center; color: #64748b;">No products found</div>';
        return;
    }
    
    container.innerHTML = productsToShow.map(p => `
        <div class="product-item">
            <div class="product-info">
                <h4>${p.name}</h4>
                <div class="product-category">${p.category}</div>
            </div>
            <div class="product-rating">
                <span class="rating">⭐ ${p.rating}</span>
                <span class="sales-count">${p.sales} sold</span>
            </div>
        </div>
    `).join('');
}

// Open Modal with all products
function openSeeAllModal() {
    const modal = document.getElementById('seeAllModal');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    renderModalProducts();
}

// Close Modal
function closeSeeAllModal() {
    const modal = document.getElementById('seeAllModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Render all products in modal
function renderModalProducts(searchTerm = '') {
    const container = document.getElementById('modalProductsList');
    let filtered = [...topProducts];
    
    if (searchTerm) {
        filtered = filtered.filter(p => 
            p.name.toLowerCase().includes(searchTerm) || 
            p.category.toLowerCase().includes(searchTerm)
        );
    }
    
    if (filtered.length === 0) {
        container.innerHTML = '<div style="padding: 40px; text-align: center; color: #64748b;">No products found</div>';
        return;
    }
    
    container.innerHTML = filtered.map(p => `
        <div class="modal-product-item">
            <div class="modal-product-info">
                <h4>${p.name}</h4>
                <div class="modal-product-category">${p.category}</div>
            </div>
            <div class="modal-product-stats">
                <span class="modal-rating">⭐ ${p.rating}</span>
                <span class="modal-sales">${p.sales} units sold</span>
            </div>
        </div>
    `).join('');
}

// Modal search functionality
function setupModalSearch() {
    const modalSearchInput = document.getElementById('modalSearchInput');
    if (modalSearchInput) {
        modalSearchInput.addEventListener('input', function(e) {
            renderModalProducts(e.target.value.toLowerCase());
        });
    }
}

// Initialize Sales Chart
function initSalesChart() {
    const ctx = document.getElementById('salesChart').getContext('2d');
    if (salesChart) salesChart.destroy();
    
    salesChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [
                {
                    label: 'Revenue (₱)',
                    data: [85000, 92000, 108000, 95000, 112000, 128000, 135000, 142000, 138000, 145000, 152000, 128450],
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.05)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Orders',
                    data: [1240, 1380, 1560, 1420, 1680, 1890, 2010, 2150, 2080, 2230, 2350, 1980],
                    borderColor: '#f97316',
                    backgroundColor: 'rgba(249, 115, 22, 0.05)',
                    tension: 0.4,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    mode: 'index',
                    intersect: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Amount (₱)'
                    }
                }
            }
        }
    });
}

// Search functionality for main page
function handleSearch() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    renderTopProducts(searchTerm);
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('seeAllModal');
    if (event.target === modal) {
        closeSeeAllModal();
    }
}

// Settings and Logout event listeners
document.getElementById('searchInput').addEventListener('input', handleSearch);

document.querySelectorAll('.nav-item').forEach(item => {
    const text = item.innerText || item.textContent;
    if(text.includes('Settings')) {
        item.addEventListener('click', () => alert('Settings panel (demo)'));
    }
    if(text.includes('Logout')) {
        item.addEventListener('click', () => alert('Logged out successfully'));
    }
});

document.querySelector('.help-support').addEventListener('click', () => {
    alert('Help & Support\nEmail: support@example.com\nPhone: (555) 123-4567');
});

// Initialize
renderTopProducts();
initSalesChart();
setupModalSearch();