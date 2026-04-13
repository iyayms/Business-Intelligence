
// PRODUCT DATA

let products = [

{name:"Coca Cola",category:"Beverages",quantity:60,cost:20},
{name:"Pepsi",category:"Beverages",quantity:50,cost:20},
{name:"San Miguel Light",category:"Beverages",quantity:30,cost:40},
{name:"Mountain Dew",category:"Beverages",quantity:15,cost:25},

{name:"Potato Chips",category:"Snacks",quantity:24,cost:15},
{name:"Chocolate Bar",category:"Snacks",quantity:30,cost:10},
{name:"Biscuits",category:"Snacks",quantity:45,cost:12},
{name:"Pretzels",category:"Snacks",quantity:10,cost:13},

{name:"Shampoo",category:"Hygiene",quantity:18,cost:50},
{name:"Soap",category:"Hygiene",quantity:70,cost:12},
{name:"Toothpaste",category:"Hygiene",quantity:35,cost:25},

{name:"Mighty Blue",category:"Cigarettes",quantity:8,cost:120},
{name:"Marlboro",category:"Cigarettes",quantity:12,cost:140}

]


// SUPPLIERS

let suppliers = [

{name:"ABC Beverages",contact:"Janet Smith",phone:"0917-123-4567"},
{name:"XYZ Snacks",contact:"Anton Cruz",phone:"0978-111-3333"},
{name:"Fresh Goods",contact:"Maria Lopez",phone:"0922-888-4567"},
{name:"Metro Supplies",contact:"James Tan",phone:"0933-777-9999"},
{name:"Prime Distributors",contact:"Anna Reyes",phone:"0916-555-2222"}

]



function loadProducts(){

let table = document.getElementById("productTable")

table.innerHTML=""

products.forEach(p=>{

let stockClass = ""

if(p.quantity <= 10){
stockClass = "lowStock"
}

let row = `
<tr class="${stockClass}">
<td>${p.name}</td>
<td>${p.category}</td>
<td>${p.quantity}</td>
<td>${p.cost}</td>
</tr>
`

table.innerHTML += row

})

}



function loadSuppliers(){

let table = document.getElementById("supplierTable")

table.innerHTML=""

suppliers.forEach(s=>{

let row = `
<tr>
<td>${s.name}</td>
<td>${s.contact}</td>
<td>${s.phone}</td>
</tr>
`

table.innerHTML += row

})

}

const invToggle = document.getElementById("inventoryToggle");
if (invToggle) {
    invToggle.addEventListener("click", function() {
        const submenu = document.getElementById("inventorySubmenu");
        const icon = this.querySelector(".dropdown-icon");
        if (submenu) submenu.classList.toggle("open");
        if (icon) icon.classList.toggle("rotate");
    });
}

document.getElementById("searchProduct").addEventListener("keyup", function() {
    let search = this.value.toLowerCase();
    let rows = document.querySelectorAll("#productTable tr");
    rows.forEach(row => {
        let name = row.children[0].textContent.toLowerCase();
        row.style.display = name.includes(search) ? "" : "none";
    });
});



function openProduct(){

let name = prompt("Product name")
let category = prompt("Category")
let quantity = parseInt(prompt("Quantity"))
let cost = parseInt(prompt("Cost"))

products.push({name,category,quantity,cost})

loadProducts()

updateStats()

}



function addStock(){

let name = prompt("Product name to add stock")
let amount = parseInt(prompt("Stock amount"))

let product = products.find(p=>p.name===name)

if(product){

product.quantity += amount

}

loadProducts()

updateStats()

}



function purchaseProduct(){

alert("Product purchase recorded")

}



function newPO(){

alert("New purchase order created")

}



function updateStats(){

let inventoryValue = 0
let totalStock = 0

products.forEach(p=>{

inventoryValue += p.quantity * p.cost
totalStock += p.quantity

})

document.getElementById("inventoryValue").innerText = inventoryValue
document.getElementById("totalStock").innerText = totalStock

}



loadProducts()
loadSuppliers()
updateStats()