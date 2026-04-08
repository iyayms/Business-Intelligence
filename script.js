let storedUser="";
let storedPass="";
let OTP="";
let timerInterval;

/* NAVIGATION */
function showPage(id){
document.querySelectorAll(".container").forEach(p=>p.classList.add("hidden"));
document.getElementById(id).classList.remove("hidden");
}

/* TOGGLE PASSWORD */
function togglePass(id){
let input=document.getElementById(id);
input.type=input.type==="password"?"text":"password";
}

/* MESSAGE */
function setMsg(el,msg,type){
el.className="message "+type;
el.innerText=msg;
}

/* PASSWORD STRENGTH */
document.getElementById("suPass").addEventListener("input", ()=>{
let pass=suPass.value;

let strength="Weak";
let color="red";

if(pass.length>=6){
strength="Medium";
color="orange";
}

if(pass.match(/[A-Z]/)&&pass.match(/[0-9]/)&&pass.length>=8){
strength="Strong";
color="green";
}

strengthMsg.innerText="Strength: "+strength;
strengthMsg.style.color=color;
});

function markError(input){
input.classList.add("inputError","shake");

setTimeout(()=>input.classList.remove("shake"),300);
}

function clearErrors(){
document.querySelectorAll("input").forEach(i=>{
i.classList.remove("inputError");
});
}

/* CHECK EMPTY */
function validateRequired(fields, msgEl){

clearErrors();

for(let field of fields){

if(!field.value.trim()){
markError(field);
setMsg(msgEl, field.placeholder || "Field required", "warning");
return false;
}

}

return true;
}

/* SIGNUP */
function signup(){

if(!validateRequired([suUser, suPass, suConfirm], signupMsg)) return;

if(suPass.value !== suConfirm.value){
markError(suPass);
markError(suConfirm);
return setMsg(signupMsg,"Passwords do not match","error");
}

storedUser = suUser.value;
storedPass = suPass.value;

setMsg(signupMsg,"Account created!","success");

setTimeout(()=>showPage("login"),1000);
}

function login(){

if(!validateRequired([loginUser, loginPass], loginMsg)) return;

let user = loginUser.value.trim();
let pass = loginPass.value.trim();

if(user !== storedUser || pass !== storedPass){
markError(loginUser);
markError(loginPass);
return setMsg(loginMsg,"Invalid credentials","error");
}

setMsg(loginMsg,"Login Successful!","success");
}

/* SEND OTP */
function sendOTP(){

if(!validateRequired([fpEmail], emailMsg)) return;

OTP = Math.floor(1000+Math.random()*9000);

setMsg(emailMsg,"Sending OTP...","loading");

setTimeout(()=>{
setMsg(emailMsg,"OTP sent!","success");
showPage("otpPage");
startTimer();
},1500);
}

/* OTP INPUT MOVE */
function move(el,index){
if(el.value.length===1)
document.querySelectorAll(".otpBoxes input")[index].focus();
}

function verifyOTP(){

let boxes = document.querySelectorAll(".otpBoxes input");
let code = "";

for(let b of boxes){
if(!b.value){
markError(b);
return setMsg(otpMsg,"Enter complete OTP","warning");
}
code += b.value;
}

if(code != OTP){
boxes.forEach(b=>markError(b));
return setMsg(otpMsg,"Invalid OTP","error");
}

setMsg(otpMsg,"Verified!","success");

setTimeout(()=>showPage("reset"),1000);
}

/* TIMER */
function startTimer(){
let time=30;

timer.innerText=time;

resendBtn.classList.add("hidden");
resendBox.classList.remove("hidden");

timerInterval=setInterval(()=>{
time--;
timer.innerText=time;

if(time<=0){
clearInterval(timerInterval);
resendBox.classList.add("hidden");
resendBtn.classList.remove("hidden");
}
},1000);
}

/* RESEND OTP */
function resendOTP(){
OTP=Math.floor(1000+Math.random()*9000);
console.log("NEW OTP:",OTP);

setMsg(otpMsg,"New OTP sent!","success");

startTimer();
}

function resetPassword(){

if(!validateRequired([newPass, confirmNewPass], resetMsg)) return;

if(newPass.value !== confirmNewPass.value){
markError(newPass);
markError(confirmNewPass);
return setMsg(resetMsg,"Passwords do not match","error");
}

storedPass = newPass.value;

setMsg(resetMsg,"Password Updated!","success");

setTimeout(()=>showPage("login"),1200);
}

document.querySelectorAll("input").forEach(input=>{
input.addEventListener("input", ()=>{

let form = input.closest(".container");
let btn = form.querySelector(".btn");

let inputs = form.querySelectorAll("input");
let filled = true;

inputs.forEach(i=>{
if(!i.value.trim()) filled = false;
});

btn.disabled = !filled;

});
});