const table = document.getElementById("productTable");
const modal = document.getElementById("modal");

let editIndex = null;
let deleteIndex = null;

// Updated data array with 'size'
let products = [
  {name:"Towel", size: "Large", srp:100, price:150, qty:15, category:"Toiletries", min:5, barcode:"290384"},
  {name:"Sunscreen", size: "100ml", srp:50, price:75, qty:3, category:"Hygiene", min:5, barcode:"0348030"},
  {name:"Soap", size: "90g", srp:20, price:30, qty:2, category:"Hygiene", min:5, barcode:"998877"}
];

/* RENDER */
function renderTable(data){
  table.innerHTML = "";

  data.forEach((p, index)=>{
    let low = p.qty <= p.min ? "lowStock" : "";

    table.innerHTML += `
      <tr>
        <td>${p.name}</td>
        <td>${p.size || '-'}</td> <td>${p.srp}</td>
        <td>${p.price}</td>
        <td class="${low}">${p.qty}</td>
        <td>${p.category}</td>
        <td>${p.min}</td>
        <td>${p.barcode}</td>
        <td>
          <button class="action-btn edit" onclick="editProduct(${index})">Edit</button>
          <button class="action-btn delete" onclick="removeProduct(${index})">Remove</button>
        </td>
      </tr>
    `;
  });
}

/* ADD OR UPDATE */
function addProduct(){
  let newProduct = {
    name: document.getElementById("name").value,
    size: document.getElementById("size").value, // Added Size Input
    srp: Number(document.getElementById("srp").value),
    price: Number(document.getElementById("price").value),
    qty: Number(document.getElementById("qty").value),
    category: document.getElementById("category").value,
    min: Number(document.getElementById("min").value),
    barcode: document.getElementById("barcode").value
  };

  if(editIndex === null){
    products.push(newProduct);
  } else {
    products[editIndex] = newProduct;
    editIndex = null;
  }

  renderTable(products);
  closeAllModals();
}

/* EDIT */
function editProduct(index){
  let p = products[index];

  document.getElementById("name").value = p.name;
  document.getElementById("size").value = p.size || ""; // Added Size Fill
  document.getElementById("srp").value = p.srp;
  document.getElementById("price").value = p.price;
  document.getElementById("qty").value = p.qty;
  document.getElementById("category").value = p.category;
  document.getElementById("min").value = p.min;
  document.getElementById("barcode").value = p.barcode;

  document.querySelector("#modal h3").innerText = "Edit Product"; 

  editIndex = index;
  document.getElementById("modal").style.display = "flex";
}

/* DELETE */
function removeProduct(index){
  deleteIndex = index;
  document.getElementById("deleteModal").style.display = "flex";
  document.getElementById("modal").style.display = "none";
}

function confirmDelete(){
  if(deleteIndex !== null){
    products.splice(deleteIndex,1);
    renderTable(products);
    deleteIndex = null;
  }
  closeDeleteModal();
}

function closeDeleteModal(){
  document.getElementById("deleteModal").style.display = "none";
}

/* FILTERS */
function applyFilters(){
  let search = searchInput.value.toLowerCase();
  let categoryVal = categoryFilter.value;
  let sort = sortFilter.value;

  let filtered = products.filter(p =>
    p.name.toLowerCase().includes(search)
  );

  if(categoryVal !== "all"){
    filtered = filtered.filter(p => p.category === categoryVal);
  }

  if(sort === "low"){
    filtered.sort((a,b)=>a.price-b.price);
  } else if(sort === "high") {
    filtered.sort((a,b)=>b.price-a.price);
  }

  renderTable(filtered);
}

/* EVENTS */
searchInput.addEventListener("input", applyFilters);
categoryFilter.addEventListener("change", applyFilters);
sortFilter.addEventListener("change", applyFilters);

/* MODAL RESET */
function openModal(){
  editIndex = null;
  document.querySelector("#modal h3").innerText = "Add Product"; 
  
  document.getElementById("name").value = "";
  document.getElementById("size").value = ""; // Clear Size
  document.getElementById("srp").value = "";
  document.getElementById("price").value = "";
  document.getElementById("qty").value = "";
  document.getElementById("category").value = "";
  document.getElementById("min").value = "";
  document.getElementById("barcode").value = "";

  document.getElementById("modal").style.display = "flex";
}

function closeAllModals(){
  document.getElementById("modal").style.display = "none";
  document.getElementById("deleteModal").style.display = "none";
}

renderTable(products);