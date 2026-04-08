/* ==============================
CATEGORIES
============================== */

const categories=[
{name:"Softdrinks",profit:12.5},
{name:"Snacks",profit:7.4},
{name:"Sweets",profit:5},
{name:"Frozen Foods",profit:10.3},
{name:"Medicines",profit:8.6},
{name:"Toiletries",profit:4.7},
{name:"Cigarette",profit:9.3},
{name:"Condiments",profit:5.8},
{name:"Instant Meal",profit:9.3},
{name:"Alcoholic Drinks",profit:12.5},
{name:"School Supplies",profit:8.2}
]

/* ==============================
PRODUCT LIST
============================== */

const products = {

Softdrinks: [
["Coca Cola","1.5L",65,80],["Pepsi","1.5L",60,75],["Sprite","500ml",30,35],
["Royal","500ml",30,35],["Mountain Dew","500ml",32,38],["7Up","500ml",32,38],
["RC Cola","1.5L",55,70],["Mirinda","500ml",30,35],["Coke Zero","500ml",30,36],
["Sprite Zero","500ml",30,36],["Dr Pepper","500ml",40,48],["Sarsi","1L",50,65],
["Nestea Lemon","500ml",28,34],["C2 Green Tea","500ml",28,34],
["Lipton Iced Tea","500ml",30,36],["Gatorade","500ml",45,55],
["Pocari Sweat","500ml",45,55],["Red Bull","250ml",60,70],
["Monster Energy","500ml",85,95],["Minute Maid","350ml",35,42]
],

Snacks: [
["Piattos","Large",18,22],["Nova","Regular",15,20],["Vcut","Large",20,25],
["Cheezy","Regular",12,16],["Clover Chips","Regular",15,19],
["Tortillos","Large",20,25],["Chippy","Regular",12,16],
["Boy Bawang","Regular",12,16],["Oishi Prawn","Regular",15,20],
["Mr Chips","Regular",15,20],["Roller Coaster","Regular",18,23],
["Doritos","Large",45,55],["Lay's","Large",50,60],
["Pringles","Can",90,110],["Ridges","Large",40,48],
["Nachos","Large",35,45],["Corn Bits","Regular",15,20],
["Cheese Ring","Regular",12,18],["Potato Fries","Regular",10,15],
["Onion Rings","Regular",10,15]
],

Sweets: [
["Cloud 9","Bar",10,12],["KitKat","Mini",20,25],["Snickers","Bar",25,30],
["M&M's","Pack",30,35],["Toblerone","Mini",35,42],["Mars","Bar",25,30],
["Twix","Bar",25,30],["Ferrero Rocher","Piece",45,55],
["Kinder Joy","Egg",60,70],["Reese's","Pack",40,48],
["Skittles","Pack",35,42],["Mentos","Roll",15,20],
["Chupa Chups","Piece",10,15],["Hershey's","Bar",45,55],
["Milky Way","Bar",25,30],["Cadbury","Bar",40,50],
["Crunch","Bar",30,35],["Butterfinger","Bar",30,35],
["KitKat Chunky","Bar",30,38],["Kinder Bueno","Bar",60,70]
],

"Frozen Foods": [
["Purefoods Hotdog","500g",95,110],["Magnolia Chicken Nuggets","400g",120,140],
["Purefoods Bacon","250g",130,150],["CDO Tocino","500g",105,125],
["CDO Longganisa","500g",110,130],["Magnolia Ice Cream","1L",150,180],
["Selecta Ice Cream","1L",150,180],["Arce Dairy Ice Cream","1L",180,210],
["Purefoods Burger Patty","400g",110,130],["San Miguel Fries","1kg",130,150],
["Tempura","300g",95,115],["Siomai","300g",90,110],
["Fish Fillet","500g",120,140],["Crab Sticks","250g",85,105],
["Spring Rolls","300g",90,110],["Frozen Pizza","Box",180,220],
["Cheese Sticks","300g",100,120],["Chicken Wings","1kg",180,210],
["Squid Balls","500g",85,105],["Fish Balls","500g",80,100]
],

Medicines: [
["Biogesic","Tablet",6,8],["Bioflu","Tablet",8,10],
["Neozep","Tablet",7,9],["Decolgen","Tablet",8,10],
["Alaxan","Tablet",9,11],["Dolfenal","Tablet",10,13],
["Solmux","Capsule",12,15],["Tempra Syrup","Bottle",90,110],
["Vicks Vaporub","Jar",60,75],["Strepsils","Pack",30,40],
["Kremil-S","Tablet",7,9],["Diatabs","Tablet",6,8],
["Imodium","Capsule",12,15],["Salonpas","Pack",40,50],
["Tiger Balm","Jar",50,60],["Ascorbic Acid","Tablet",6,8],
["Cetirizine","Tablet",8,10],["Ibuprofen","Tablet",9,11],
["Antacid Suspension","Bottle",80,100],["Paracetamol","Tablet",5,7]
],

Toiletries: [
["Safeguard Soap","Bar",30,35],["Dove Soap","Bar",45,55],
["Palmolive Shampoo","Sachet",8,10],["Pantene Shampoo","Sachet",9,11],
["Head & Shoulders","Sachet",9,11],["Creamsilk Conditioner","Sachet",9,11],
["Colgate Toothpaste","Tube",45,55],["Closeup Toothpaste","Tube",40,50],
["Oral-B Toothbrush","Piece",50,65],["Listerine Mouthwash","Bottle",120,150],
["Rexona Deodorant","Roll-on",90,110],["Nivea Lotion","Bottle",120,150],
["Johnson's Baby Powder","Bottle",80,100],["Sanitary Pads","Pack",70,90],
["Toilet Paper","Roll",15,20],["Wet Wipes","Pack",50,70],
["Hair Gel","Tube",60,80],["Hair Spray","Can",120,150],
["Hand Soap Liquid","Bottle",80,100],["Lux Soap","Bar",30,40]
],

Cigarette: [
["Marlboro Red","Pack",120,130],["Marlboro Lights","Pack",120,130],
["Fortune Tribal","Pack",100,110],["Fortune Menthol","Pack",100,110],
["Camel Blue","Pack",110,120],["Winston Red","Pack",105,115],
["Philip Morris","Pack",98,108],["Hope","Pack",90,100],
["Mevius","Pack",115,125],["Esse Menthol","Pack",110,120],
["Lucky Strike","Pack",120,135],["Chesterfield","Pack",110,120],
["Mighty","Pack",95,105],["More Menthol","Pack",95,105],
["Marvels","Pack",90,100],["Champion","Pack",85,95],
["Vegas","Pack",85,95],["Union","Pack",80,90],
["Astro","Pack",80,90],["Boss","Pack",90,100]
],

Condiments: [
["UFC Ketchup","Bottle",55,65],["Datu Puti Soy Sauce","Bottle",40,50],
["Datu Puti Vinegar","Bottle",35,45],["Silver Swan Soy Sauce","Bottle",40,50],
["Mang Tomas","Bottle",60,75],["Lady's Choice Mayo","Bottle",60,75],
["Banana Ketchup","Bottle",50,60],["Fish Sauce","Bottle",38,48],
["Oyster Sauce","Bottle",70,85],["Chili Garlic","Bottle",80,95],
["Spaghetti Sauce","Bottle",90,110],["Mustard","Bottle",45,55],
["BBQ Sauce","Bottle",75,90],["Hot Sauce","Bottle",60,75],
["Magic Sarap","Pack",8,10],["Knorr Cubes","Pack",15,20],
["Seasoning Mix","Pack",20,25],["Teriyaki Sauce","Bottle",90,110],
["Gravy Mix","Pack",20,25],["Salad Dressing","Bottle",80,100]
],

"Instant Meal": [
["Lucky Me Pancit Canton","Pack",15,18],["Lucky Me Chicken","Pack",14,17],
["Lucky Me Beef","Pack",15,18],["Cup Noodles","Cup",22,26],
["Payless Noodles","Pack",12,15],["Mi Goreng","Pack",18,22],
["Samyang Spicy","Pack",45,55],["Nissin Ramen","Pack",20,25],
["Quickchow","Pack",15,18],["Instant Lugaw","Cup",25,30],
["Mac & Cheese","Cup",35,45],["Instant Oatmeal","Pack",20,25],
["Instant Soup","Pack",15,20],["Cup Rice Meal","Cup",40,50],
["Instant Champorado","Cup",30,40],["Coffee 3in1","Pack",10,15],
["Chocolate Drink","Pack",12,18],["Milk Drink","Pack",15,20],
["Canned Tuna Meal","Can",35,45],["Ready Adobo","Pack",50,65]
],

"Alcoholic Drinks": [
["Red Horse","1L",120,140],["San Miguel Pale","Can",60,70],
["San Mig Light","Can",60,70],["Emperador","Bottle",150,170],
["Fundador","Bottle",180,210],["Tanduay Rhum","Bottle",120,140],
["Smirnoff Mule","Bottle",70,85],["Smirnoff Vodka","Bottle",200,240],
["Heineken","Can",90,110],["Tiger Beer","Can",80,100],
["Corona","Bottle",100,120],["Jose Cuervo","Bottle",300,350],
["Jack Daniels","Bottle",1200,1400],["Chivas Regal","Bottle",1500,1800],
["Absolut Vodka","Bottle",900,1100],["Bacardi","Bottle",700,850],
["Soju Jinro","Bottle",90,110],["Red Wine","Bottle",300,400],
["White Wine","Bottle",300,400],["Gin Bilog","Bottle",80,100]
],

"School Supplies": [
["Ballpen Blue","Piece",10,15],["Ballpen Black","Piece",10,15],
["Notebook 80 pages","Piece",35,45],["Notebook 100 pages","Piece",45,55],
["Pencil No.2","Piece",8,12],["Eraser","Piece",6,10],
["Sharpener","Piece",10,15],["Marker Black","Piece",18,25],
["Marker Red","Piece",18,25],["Crayons 12s","Box",50,65],
["Crayons 24s","Box",80,100],["Color Pencils","Box",90,110],
["Glue Stick","Piece",20,30],["Ruler 12in","Piece",15,20],
["Scissors","Piece",40,55],["Bond Paper","Ream",220,260],
["Index Cards","Pack",30,40],["Highlighter","Piece",25,35],
["Correction Tape","Piece",35,45],["Folder","Piece",20,30]
]

}

/* ==============================
GENERATE CONSISTENT SALES DATA
============================== */

let storeSales={}

function generateSalesData(){

storeSales={}

Object.keys(products).forEach(cat=>{

storeSales[cat]=[]

products[cat].forEach(p=>{

let sales=Math.floor(Math.random()*6)+2

storeSales[cat].push({
name:p[0],
size:p[1],
srp:p[2],
price:p[3],
sales:sales
})

})

})

}

/* ==============================
DISPLAY CATEGORY CARDS
============================== */

const grid=document.getElementById("grid")

function display(list){

grid.innerHTML=""

list.forEach(c=>{

let total=0

storeSales[c.name].forEach(p=>{
total+=(p.price-p.srp)*p.sales
})

let div=document.createElement("div")
div.className="card"

div.innerHTML=
`<h2>₱${Math.floor(total)}</h2>
<div class="profit">▲ ${c.profit}%</div>
<div>${c.name}</div>`

div.onclick=()=>openCategory(c.name)

grid.appendChild(div)

})

}

let currentCategory=""

/* ==============================
OPEN CATEGORY
============================== */

function openCategory(cat){

currentCategory=cat

document.querySelector(".cards").style.display="none"
document.querySelector(".controls").style.display="none"
document.getElementById("tableView").style.display="block"

document.getElementById("categoryTitle").innerText=cat

reloadTable()

}

/* ==============================
TABLE + CHARTS
============================== */

let chart
let topChart

function reloadTable(){

let mult={
daily:1,
weekly:7,
monthly:30
}[document.getElementById("reportType").value]

let body=document.getElementById("tableBody")
body.innerHTML=""

let labels=[]
let profits=[]
let profitArr=[]

let total=0
let top=0
let topName=""

storeSales[currentCategory].forEach(p=>{

let sales=p.sales*mult
let profit=(p.price-p.srp)*sales

total+=profit

if(profit>top){
top=profit
topName=p.name
}

labels.push(p.name)
profits.push(profit)

profitArr.push({
name:p.name,
val:profit
})

body.innerHTML+=
`<tr>
<td>${p.name}</td>
<td>${p.size}</td>
<td>${p.srp}</td>
<td>${p.price}</td>
<td>${sales}</td>
<td>${profit}</td>
</tr>`

})

document.getElementById("topProduct").innerText="Top Product: "+topName
document.getElementById("summary").innerText="TOTAL PROFIT: ₱"+Math.floor(total)

if(chart) chart.destroy()

chart=new Chart(
document.getElementById("profitChart"),
{
type:"bar",
data:{
labels:labels,
datasets:[{
label:"Profit",
data:profits
}]
}
})

profitArr.sort((a,b)=>b.val-a.val)

let top5=profitArr.slice(0,5)

if(topChart) topChart.destroy()

topChart=new Chart(
document.getElementById("topChart"),
{
type:"bar",
data:{
labels:top5.map(x=>x.name),
datasets:[{
label:"Profit",
data:top5.map(x=>x.val)
}]
}
})

}

/* ==============================
STORE PROFIT + CATEGORY PIE
============================== */

let categoryChart

function updateStoreProfit(){

let range=document.getElementById("profitRange").value

let mult={
daily:1,
weekly:7,
monthly:30
}[range]

let total=0
let labels=[]
let values=[]

Object.keys(storeSales).forEach(cat=>{

let catProfit=0

storeSales[cat].forEach(p=>{
catProfit+=(p.price-p.srp)*p.sales*mult
})

total+=catProfit

labels.push(cat)
values.push(catProfit)

})

document.getElementById("storeProfit").innerText=
range.toUpperCase()+" STORE PROFIT: ₱"+Math.floor(total)

display(categories)

updateCategoryChart(labels,values)

updateTrendChart()

}

/* ==============================
CATEGORY PIE CHART
============================== */

function updateCategoryChart(labels,values){

if(categoryChart) categoryChart.destroy()

categoryChart=new Chart(
document.getElementById("categoryChart"),
{
type:"pie",
data:{
labels:labels,
datasets:[{
data:values
}]
}
})

}

/* ==============================
TREND CHART
============================== */

let trendChart

function updateTrendChart(){

let daily=0
let weekly=0
let monthly=0

Object.keys(storeSales).forEach(cat=>{

storeSales[cat].forEach(p=>{

let base=(p.price-p.srp)*p.sales

daily+=base
weekly+=base*7
monthly+=base*30

})

})

if(trendChart) trendChart.destroy()

trendChart=new Chart(
document.getElementById("trendChart"),
{
type:"line",
data:{
labels:["Daily","Weekly","Monthly"],
datasets:[{
label:"Store Profit",
data:[daily,weekly,monthly],
fill:false
}]
}
})

}

/* ==============================
BACK BUTTON
============================== */

function showCards(){

document.getElementById("tableView").style.display="none"
document.querySelector(".cards").style.display="grid"
document.querySelector(".controls").style.display="block"

}

/* ==============================
FILTER
============================== */

function filterData(){

let f=document.getElementById("filter").value
let s=document.getElementById("search").value.toLowerCase()

let filtered=categories.filter(c=>c.name.toLowerCase().includes(s))

if(f=="low") filtered=filtered.filter(c=>c.profit<5)
if(f=="mid") filtered=filtered.filter(c=>c.profit>=5 && c.profit<=10)
if(f=="high") filtered=filtered.filter(c=>c.profit>10)

display(filtered)

}

document.getElementById("filter").addEventListener("change",filterData)
document.getElementById("search").addEventListener("input",filterData)

/* ==============================
INITIALIZE SYSTEM
============================== */

generateSalesData()
updateStoreProfit()
display(categories)