const table = document.getElementById("productTable");
const updateModal = document.getElementById("updateStockModal");
const manualModal = document.getElementById("manualStockModal");

let selectedIndex = null;
let currentActiveIndex = null;

// Expanded dataset with different examples
let products = [
  {name:"Coca Cola 1.5L", srp:45, price:55, qty:24, category:"Beverages", min:10, barcode:"50001126"},
  {name:"Potato Chips (Large)", srp:30, price:42, qty:5, category:"Snacks", min:15, barcode:"71607311"},
  {name:"Bath Soap (White)", srp:20, price:32, qty:50, category:"Hygiene", min:20, barcode:"99887711"},
  {name:"Instant Noodles", srp:12, price:18, qty:100, category:"Snacks", min:30, barcode:"48000123"},
  {name:"Dishwashing Liquid", srp:55, price:75, qty:8, category:"Hygiene", min:10, barcode:"33445566"},
  {name:"Bottled Water 500ml", srp:10, price:15, qty:12, category:"Beverages", min:24, barcode:"22110099"},
  {name:"Chocolate Bar", srp:25, price:35, qty:45, category:"Snacks", min:10, barcode:"11223344"},
  {name:"Toothpaste 150g", srp:85, price:110, qty:15, category:"Hygiene", min:5, barcode:"88776655"},
  {name:"Orange Juice Can", srp:28, price:38, qty:3, category:"Beverages", min:12, barcode:"66554433"},
  {name:"Laundry Detergent", srp:110, price:145, qty:20, category:"Hygiene", min:5, barcode:"44332211"}
];

/* RENDER TABLE */
function renderTable(data){
  table.innerHTML = "";
  data.forEach((p, index) => {
    // Check if stock is low to apply the blinking effect
    let low = p.qty <= p.min ? "lowStock" : "";

    table.innerHTML += `
      <tr>
        <td>${p.name}</td>
        <td>${p.srp}</td>
        <td>${p.price}</td>
        <td class="${low}">${p.qty}</td>
        <td>${p.category}</td>
        <td>${p.min}</td>
        <td>${p.barcode}</td>
        <td>
          <button class="action-btn edit" onclick="openStockModal(${index})">+ Add Stock</button>
        </td>
      </tr>
    `;
  });
}

/* OPEN THE QUICK UPDATE MODAL */
function openStockModal(index) {
    currentActiveIndex = index;
    const product = products[index];

    // Pre-fill the read-only information
    document.getElementById("updateProductName").value = product.name;
    document.getElementById("updateCategory").value = product.category;
    document.getElementById("updateCurrentQty").value = product.qty;
    
    // Reset the inputs
    document.getElementById("updateQtyAdded").value = "";
    document.getElementById("updateSRP").value = product.srp; // Default to current SRP
    document.getElementById("updateSupplier").value = "";

    updateModal.style.display = "flex";
}

function closeUpdateModal(){
  updateModal.style.display = "none";
}

/* SAVE THE UPDATE */
function confirmQuickUpdate() {
    const qtyToAdd = parseInt(document.getElementById("updateQtyAdded").value);
    const newSRP = document.getElementById("updateSRP").value;
    const supplier = document.getElementById("updateSupplier").value;

    if (isNaN(qtyToAdd) || qtyToAdd <= 0) {
        alert("Please enter a valid quantity to add.");
        return;
    }

    if (!supplier) {
        alert("Please select a supplier.");
        return;
    }

    // Apply the update to the array
    products[currentActiveIndex].qty += qtyToAdd;
    if (newSRP) products[currentActiveIndex].srp = Number(newSRP);

    // Refresh and close
    renderTable(products);
    closeUpdateModal();
    
    // Optional feedback
    console.log(`Stock updated for ${products[currentActiveIndex].name}. Added ${qtyToAdd} units.`);
}

// Open Modal
function openManualModal() {
    manualModal.style.display = "flex";
}

// Close Modal
function closeManualModal() {
    manualModal.style.display = "none";
}

// Dynamic Dropdown: Show products based on Category
function filterProductOptions() {
    const category = document.getElementById("manualCategory").value;
    const productDropdown = document.getElementById("manualProduct");
    
    productDropdown.innerHTML = '<option value="">Select Product</option>';

    const filtered = products.filter(p => p.category === category);

    filtered.forEach(p => {
        const option = document.createElement("option");
        option.value = p.name;
        option.textContent = p.name;
        productDropdown.appendChild(option);
    });
}

// Update the Stock Table
function saveManualEntry() {
    const productName = document.getElementById("manualProduct").value;
    const qtyToAdd = parseInt(document.getElementById("manualQty").value);
    const newSRP = document.getElementById("manualSRP").value;

    if (!productName || isNaN(qtyToAdd) || qtyToAdd <= 0) {
        alert("Please select a product and enter a valid quantity.");
        return;
    }

    // Find product in our data array
    const productIndex = products.findIndex(p => p.name === productName);
    
    if (productIndex !== -1) {
        products[productIndex].qty += qtyToAdd; // Update Quantity
        if(newSRP) products[productIndex].srp = Number(newSRP); // Update SRP
        
        renderTable(products); // Refresh the UI
        closeManualModal();   // Close Pop-up
        alert("Stock updated successfully!");
    }
}

/* SEARCH & FILTERS */
document.getElementById("searchInput").addEventListener("input", function(e){
  const term = e.target.value.toLowerCase();
  const filtered = products.filter(p => 
    p.name.toLowerCase().includes(term) || 
    p.barcode.includes(term)
  );
  renderTable(filtered);
});

// Category Filter Logic
document.getElementById("categoryFilter").addEventListener("change", function(e){
  const category = e.target.value;
  if(category === "all"){
    renderTable(products);
  } else {
    const filtered = products.filter(p => p.category === category);
    renderTable(filtered);
  }
});

/* INIT */
renderTable(products);