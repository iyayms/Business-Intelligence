/* INITIAL DATA WITH SIZE */
let products = [
    {name: "Towel", size: "Large", srp: 100, price: 150, qty: 15, category: "Toiletries", min: 5, barcode: "290384"},
    {name: "Sunscreen", size: "100ml", srp: 50, price: 75, qty: 3, category: "Hygiene", min: 5, barcode: "0348030"},
    {name: "Soap", size: "90g", srp: 20, price: 30, qty: 2, category: "Hygiene", min: 5, barcode: "998877"},
    {name: "Coca Cola", size: "1.5L", srp: 45, price: 55, qty: 24, category: "Beverages", min: 10, barcode: "500011"},
    {name: "Potato Chips", size: "Family", srp: 30, price: 42, qty: 8, category: "Snacks", min: 15, barcode: "716073"}
];

const tableBody = document.getElementById("productTable");
const manualModal = document.getElementById("manualStockModal");
const updateModal = document.getElementById("updateStockModal");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const sortFilter = document.getElementById("sortFilter");

let selectedIndex = null;

/* TABLE RENDERING */
function renderTable(data) {
    tableBody.innerHTML = "";
    data.forEach((p) => {
        const actualIndex = products.findIndex(item => item.name === p.name);
        let lowClass = p.qty <= p.min ? "lowStock" : "";
        
        const row = `
            <tr>
                <td>${p.name}</td>
                <td>${p.size}</td> <td>${p.srp}</td>
                <td>${p.price}</td>
                <td class="${lowClass}">${p.qty}</td>
                <td>${p.category}</td>
                <td>${p.min}</td>
                <td>${p.barcode}</td>
                <td>
                    <button class="action-btn" onclick="openStockModal(${actualIndex})">+ Add Stock</button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

/* MANUAL ADD MODAL LOGIC */
function openManualModal() {
    manualModal.style.display = "flex";
}

function closeManualModal() {
    manualModal.style.display = "none";
}

function filterProductOptions() {
    const category = document.getElementById("manualCategory").value;
    const productDrop = document.getElementById("manualProduct");
    productDrop.innerHTML = '<option value="">Select Product</option>';
    
    products.filter(p => p.category === category).forEach(p => {
        const opt = document.createElement("option");
        opt.value = p.name;
        opt.textContent = `${p.name} (${p.size})`; // Show size in dropdown
        productDrop.appendChild(opt);
    });
}

function saveManualEntry() {
    const name = document.getElementById("manualProduct").value;
    const qty = parseInt(document.getElementById("manualQty").value);
    const size = document.getElementById("manualSize").value;
    const srp = document.getElementById("manualSRP").value;
    
    if (name && !isNaN(qty) && qty > 0) {
        const idx = products.findIndex(p => p.name === name);
        products[idx].qty += qty;
        if (size) products[idx].size = size; // Update size if provided
        if (srp) products[idx].srp = Number(srp);
        
        renderTable(products);
        closeManualModal();
    } else {
        alert("Please select a product and enter a valid quantity.");
    }
}

/* QUICK UPDATE MODAL LOGIC */
function openStockModal(index) {
    selectedIndex = index;
    const p = products[index];
    
    document.getElementById("updateProductName").value = p.name;
    document.getElementById("updateCategory").value = p.category;
    document.getElementById("updateCurrentQty").value = p.qty;
    document.getElementById("updateSize").value = p.size; // Pre-fill size
    
    document.getElementById("updateQtyAdded").value = "";
    document.getElementById("updateSRP").value = p.srp;
    document.getElementById("updateSupplier").value = "";

    updateModal.style.display = "flex";
}

function closeUpdateModal() {
    updateModal.style.display = "none";
}

function confirmQuickUpdate() {
    const qty = parseInt(document.getElementById("updateQtyAdded").value);
    const size = document.getElementById("updateSize").value;
    const supplier = document.getElementById("updateSupplier").value;
    
    if (!isNaN(qty) && qty > 0 && supplier) {
        products[selectedIndex].qty += qty;
        if (size) products[selectedIndex].size = size; // Update size
        products[selectedIndex].srp = Number(document.getElementById("updateSRP").value);
        
        renderTable(products);
        closeUpdateModal();
    } else {
        alert("Please enter a quantity and choose a supplier.");
    }
}

/* SEARCH */
searchInput.addEventListener("input", function(e) {
    const term = e.target.value.toLowerCase();
    const filtered = products.filter(p => p.name.toLowerCase().includes(term));
    renderTable(filtered);
});

function applyAllFilters() {
    let searchTerm = searchInput.value.toLowerCase();
    let selectedCategory = categoryFilter.value;
    let sortValue = sortFilter.value;

    // 1. Start with the full list
    let filteredData = products.filter(p => {
        // 2. Filter by Search Term (Name or Barcode)
        const matchesSearch = p.name.toLowerCase().includes(searchTerm) || 
                             p.barcode.includes(searchTerm);
        
        // 3. Filter by Category
        const matchesCategory = (selectedCategory === "all") || 
                                (p.category === selectedCategory);

        return matchesSearch && matchesCategory;
    });

    // 4. Apply Sorting
    if (sortValue === "low") {
        // Sort by Price: Low to High
        filteredData.sort((a, b) => a.price - b.price);
    } else if (sortValue === "high") {
        // Sort by Price: High to Low
        filteredData.sort((a, b) => b.price - a.price);
    }

    // 5. Render the result
    renderTable(filteredData);
}

/* --- EVENT LISTENERS --- */

// Listen for typing in search
searchInput.addEventListener("input", applyAllFilters);

// Listen for Category selection changes
categoryFilter.addEventListener("change", applyAllFilters);

// Listen for Sort selection changes
sortFilter.addEventListener("change", applyAllFilters);

/* INIT */
renderTable(products);

window.onclick = function(event) {
    if (event.target == manualModal) closeManualModal();
    if (event.target == updateModal) closeUpdateModal();
};