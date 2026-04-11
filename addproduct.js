const table = document.getElementById("productTable");
const modal = document.getElementById("modal");

let editIndex = null;

let products = [
  {name:"Towel", srp:100, price:150, qty:15, category:"Toiletries", min:5, barcode:"290384"},
  {name:"Sunscreen", srp:50, price:75, qty:3, category:"Hygiene", min:5, barcode:"0348030"},
  {name:"Soap", srp:20, price:30, qty:2, category:"Hygiene", min:5, barcode:"998877"}
];

/* RENDER */
function renderTable(data){

  table.innerHTML = "";

  data.forEach((p,index)=>{

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
  closeModal();
}

/* EDIT */
function editProduct(index){

  let p = products[index];

  document.getElementById("name").value = p.name;
  document.getElementById("srp").value = p.srp;
  document.getElementById("price").value = p.price;
  document.getElementById("qty").value = p.qty;
  document.getElementById("category").value = p.category;
  document.getElementById("min").value = p.min;
  document.getElementById("barcode").value = p.barcode;

  document.querySelector(".modal-content h3").innerText = "Edit Product";

  editIndex = index;
  openModal();
}

/* DELETE */
function removeProduct(index){
  products.splice(index,1);
  renderTable(products);
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
  } else {
    filtered.sort((a,b)=>b.price-a.price);
  }

  renderTable(filtered);
}

/* EVENTS */
searchInput.addEventListener("input", applyFilters);
categoryFilter.addEventListener("change", applyFilters);
sortFilter.addEventListener("change", applyFilters);

/* MODAL */
/* RESET TITLE WHEN ADDING */
function openModal(){
  modal.style.display = "block";
  document.querySelector(".modal-content h3").innerText = "Add Product";
}
function closeModal(){
  modal.style.display="none";

  document.querySelectorAll(".modal input").forEach(input => input.value = "");
}

/* INIT */
renderTable(products);