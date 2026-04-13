/**
 * DATABASE & STATE
 */
const productDatabase = {
    "RED HORSE 30g": { size: "30g", price: 30.00, category: "Liquor", barcode: "12345678" },
    "Towel Large": { size: "Large", price: 100.00, category: "Toiletery", barcode: "88889999" },
    "Tissue 1 roll": { size: "1 roll", price: 35.00, category: "Toiletery", barcode: "11112222" }
};

let purchaseItems = [
    { no: 1, product: 'Towel Large', size: 'Large', category: 'Toiletery', qty: 3, price: 100 },
    { no: 2, product: 'Tissue 1 roll', size: '1 roll', category: 'Toiletery', qty: 5, price: 35 }
];

let editIndex = null;
let pendingDeleteIndex = null;

function setupInventorySidebar() {
    const inventoryToggle = document.getElementById('inventoryToggle');
    const submenu = document.getElementById('inventorySubmenu');
    const caret = inventoryToggle.querySelector('.dropdown-icon');

    // Toggle submenu on click
    inventoryToggle.onclick = function() {
        submenu.classList.toggle('open');
        caret.classList.toggle('rotate');
    };

    // Optional: Keep it open by default if we are on the Purchase Product page
    // submenu.classList.add('open');
    // caret.classList.add('rotate');
}

// Call this inside your DOMContentLoaded or setupEventListeners
setupInventorySidebar();

/**
 * INITIALIZATION
 */
document.addEventListener('DOMContentLoaded', () => {
    updateDateTime();
    renderTable();
    setupEventListeners();
});

function updateDateTime() {
    const timeElement = document.getElementById('current-time');
    if (timeElement) {
        const now = new Date();
        timeElement.innerText = now.toLocaleString();
    }
}

/**
 * TABLE RENDERING
 */
function renderTable() {
    const tbody = document.getElementById('purchase-list');
    const totalDisplay = document.getElementById('total-amount');
    let grandTotal = 0;
    
    tbody.innerHTML = '';

    purchaseItems.forEach((item, index) => {
        const amount = item.qty * item.price;
        grandTotal += amount;

        const row = `
            <tr>
                <td>${index + 1}</td>
                <td>${item.product}</td>
                <td>${item.size}</td>
                <td>${item.category}</td>
                <td>${item.qty}</td>
                <td>${item.price.toFixed(2)}</td>
                <td>${amount.toFixed(2)}</td>
                <td class="action-cell">
                    <button class="row-btn" onclick="openEditModal(${index})">
                        <span style="font-size:16px">+</span> EDIT DETAILS
                    </button>
                    <button class="row-btn" onclick="openRemoveModal(${index})">
                        <span style="font-size:16px">−</span> REMOVE
                    </button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });

    if (totalDisplay) totalDisplay.innerText = grandTotal.toFixed(2);
}

/**
 * REMOVE MODAL LOGIC
 */
function openRemoveModal(index) {
    pendingDeleteIndex = index;
    document.getElementById('confirmModal').style.display = 'flex';
}

function closeRemoveModal() {
    pendingDeleteIndex = null;
    document.getElementById('confirmModal').style.display = 'none';
}

/**
 * EVENT LISTENERS
 */
function setupEventListeners() {
    const productModal = document.getElementById("productModal");
    const productNameInput = document.getElementById('modalProductName');
    const qtyInput = document.getElementById('modalQty');
    const proceedModal = document.getElementById("proceedModal");
    const checkoutBtn = document.querySelector(".checkout-btn");
    if (checkoutBtn) {
        checkoutBtn.onclick = openCheckoutModal;
    }

    // 2. CHECKOUT MODAL: Trigger Receipt (The "PROCEED" Button)
    const proceedBtn = document.getElementById("proceedToReceipt");
    if (proceedBtn) {
        proceedBtn.onclick = proceedToReceipt; // <--- THIS FIXES THE BUG
    }

    // 3. RECEIPT MODAL: Finalize (The "DONE" Button)
    const doneBtn = document.getElementById("finalizeOrder");
    if (doneBtn) {
        doneBtn.onclick = finalizeOrder;
    }

    // Close Success Modal
    const successBtn = document.getElementById("closeSuccess");
    if (successBtn) {
        successBtn.onclick = function() {
            document.getElementById('successModal').style.display = 'none';
        };
    }
}

    document.getElementById('cancelRemove').onclick = closeRemoveModal;

    // Add Product Button
    document.querySelector(".add-btn").onclick = () => {
        editIndex = null;
        document.getElementById('modalTitle').innerText = "ADD PRODUCT";
        document.getElementById('applyProduct').innerText = "APPLY";
        resetModalFields();
        productModal.style.display = "flex";
    };

    document.getElementById('cancelCheckout').onclick = closeCheckoutModal;
    document.getElementById('proceedToReceipt').onclick = proceedToReceipt;
    document.getElementById('finalizeOrder').onclick = finalizeOrder;
    

    let currentTotalForCheckout = 0;

function openCheckoutModal() {
    const totalDisplay = document.getElementById('total-amount');
    const totalAmount = parseFloat(totalDisplay.innerText) || 0;

    if (totalAmount <= 0) {
        alert("Please add items to the list first.");
        return;
    }

    // Set the total in the popup
    document.getElementById('checkoutTotal').innerText = totalAmount.toFixed(2);
    document.getElementById('paymentInput').value = ""; // Clear input
    document.getElementById('checkOutModal').style.display = 'flex';
}

function closeCheckoutModal() {
    document.getElementById('checkOutModal').style.display = 'none';
}

function proceedToReceipt() {
    const totalAmount = parseFloat(document.getElementById('checkoutTotal').innerText);
    const paymentValue = document.getElementById('paymentInput').value;
    const paymentAmount = parseFloat(paymentValue);

    // Validation: Payment must be a number and enough to cover the total
    if (!paymentValue || isNaN(paymentAmount) || paymentAmount < totalAmount) {
        alert("Please enter a valid payment amount equal to or greater than the Total.");
        return;
    }

    // Calculate Change
    const change = paymentAmount - totalAmount;

    // Map values to the Receipt Modal
    document.getElementById('receiptTotal').innerText = totalAmount.toFixed(2);
    document.getElementById('receiptPayment').innerText = paymentAmount.toFixed(2);
    document.getElementById('receiptChange').innerText = change.toFixed(2);

    // SWAP MODALS: Hide current, show receipt
    document.getElementById('checkOutModal').style.display = 'none';
    document.getElementById('proceedModal').style.display = 'flex';
}

function closeProceedModal() {
    document.getElementById('proceedModal').style.display = 'none';
}

function finalizeOrder() {
    // 1. Clear the data
    purchaseItems = []; 
    renderTable();
    
    // 2. Hide the Receipt Modal
    document.getElementById('proceedModal').style.display = 'none';
    
    // 3. Show the Success Modal Container
    document.getElementById('successModal').style.display = 'flex';
}

    // Auto-suggest logic
    productNameInput.addEventListener('input', (e) => {
        const val = e.target.value;
        const data = productDatabase[val];
        if (data) {
            document.getElementById('modalPrice').innerText = data.price.toFixed(2);
            document.getElementById('modalCategory').innerText = data.category;
            document.getElementById('modalBarCode').innerText = data.barcode;
            calculateModalTotal();
        } else {
            document.getElementById('modalPrice').innerText = "--";
            document.getElementById('modalCategory').innerText = "--";
            document.getElementById('modalBarCode').innerText = "--";
        }
    });

    qtyInput.addEventListener('input', calculateModalTotal);

    // Apply / Save Changes Logic
    document.getElementById('applyProduct').onclick = () => {
        const name = productNameInput.value;
        const qty = parseInt(qtyInput.value);
        const data = productDatabase[name];

        if (name && qty > 0 && data) {
            const itemData = {
                product: name,
                size: data.size,
                category: data.category,
                qty: qty,
                price: data.price
            };

            if (editIndex !== null) {
                purchaseItems[editIndex] = itemData;
            } else {
                purchaseItems.push(itemData);
            }
            
            renderTable();
            closeProductModal();
        } else {
            alert("Please select a valid product and enter a quantity.");
        }
    };

/**
 * EDIT MODAL LOGIC
 */
function openEditModal(index) {
    const item = purchaseItems[index];
    const data = productDatabase[item.product];
    editIndex = index;
    
    document.getElementById('modalTitle').innerText = "EDIT DETAILS";
    document.getElementById('applyProduct').innerText = "SAVE CHANGES";
    document.getElementById('modalProductName').value = item.product;
    document.getElementById('modalQty').value = item.qty;
    
    if (data) {
        document.getElementById('modalPrice').innerText = data.price.toFixed(2);
        document.getElementById('modalCategory').innerText = data.category;
        document.getElementById('modalBarCode').innerText = data.barcode;
    }

    calculateModalTotal();
    document.getElementById("productModal").style.display = "flex";
}

function calculateModalTotal() {
    const qty = parseFloat(document.getElementById('modalQty').value) || 0;
    const priceText = document.getElementById('modalPrice').innerText;
    const price = priceText === "--" ? 0 : parseFloat(priceText);
    document.getElementById('modalTotal').innerText = (qty * price).toFixed(2);
}

function closeProductModal() {
    document.getElementById("productModal").style.display = "none";
}

function resetModalFields() {
    document.getElementById('modalProductName').value = "";
    document.getElementById('modalQty').value = "";
    document.getElementById('modalPrice').innerText = "--";
    document.getElementById('modalCategory').innerText = "--";
    document.getElementById('modalBarCode').innerText = "--";
    document.getElementById('modalTotal').innerText = "0.00";
}

function proceedToReceipt() {
    const totalAmount = parseFloat(document.getElementById('checkoutTotal').innerText);
    const paymentValue = document.getElementById('paymentInput').value;
    const paymentAmount = parseFloat(paymentValue);

    if (!paymentValue || isNaN(paymentAmount) || paymentAmount < totalAmount) {
        // You might want to turn this alert into a formal error container later too!
        alert("Please enter a valid payment amount.");
        return;
    }

    const change = paymentAmount - totalAmount;

    document.getElementById('receiptTotal').innerText = totalAmount.toFixed(2);
    document.getElementById('receiptPayment').innerText = paymentAmount.toFixed(2);
    document.getElementById('receiptChange').innerText = change.toFixed(2);

    // Swap Modals
    document.getElementById('checkOutModal').style.display = 'none';
    document.getElementById('proceedModal').style.display = 'flex';
}

// Global click handler to close modals when clicking backdrop
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        closeProductModal();
        closeRemoveModal();
        closeCheckoutModal(); // Handle new modal backdrop
        closeProceedModal();  // Handle new modal backdrop
    }
}