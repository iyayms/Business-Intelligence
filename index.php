<?php
session_start();
$conn = new mysqli("localhost", "root", "", "auth_system");

$msg = "";
$page = "login";
$otp = "1234";

// SIGN UP
if(isset($_POST['signup'])){
    $u = $_POST['username'];
    $p = $_POST['password'];
    $c = $_POST['confirm'];

    if($p != $c){
        $msg = "Passwords do not match!";
        $page = "signup";
    } else {
        $p = password_hash($p, PASSWORD_DEFAULT);
        $conn->query("INSERT INTO users(username,password) VALUES('$u','$p')");
        $_SESSION['user'] = $u;
        $msg = "Account successfully created!";
        $page = "verify";
    }
}

// VERIFY
if(isset($_POST['verify'])){
    $phone = $_POST['phone'];
    $code = $_POST['code'];

    if($code == $otp){
        $user = $_SESSION['user'];
        $conn->query("UPDATE users SET phone='$phone', verified=1 WHERE username='$user'");
        $msg = "Account verified successfully!";
        $page = "login";
    } else {
        $msg = "Code is invalid. Please try again.";
        $page = "verify";
    }
}

// LOGIN
if(isset($_POST['login'])){
    $u = $_POST['username'];
    $p = $_POST['password'];

    $res = $conn->query("SELECT * FROM users WHERE username='$u'");
    $row = $res->fetch_assoc();

    if($row && password_verify($p, $row['password'])){
        if($row['verified']){
            $msg = "Login successful!";
        } else {
            $msg = "Please verify your account first.";
        }
    } else {
        $msg = "Invalid username or password.";
    }
}
?>

<!DOCTYPE html>
<html>
<head>
<title>Auth System</title>
<style>
body {
    background:#c8ab7c;
    font-family:Arial;
    text-align:center;
}
h1 { margin-top:40px; }

.container {
    width:300px;
    margin:40px auto;
    padding:20px;
    background:#c5c45f;
    border:2px solid black;
}

input {
    width:90%;
    padding:10px;
    margin:10px 0;
    border-radius:6px;
    border:1px solid black;
    background:#59c3a5;
    text-align:center;
}

button {
    padding:8px 20px;
    margin:10px 5px;
    border-radius:20px;
    background:#ff6b6b;
    border:1px solid black;
    cursor:pointer;
}

.msg {
    font-size:13px;
    margin:5px;
}
</style>
</head>

<body>

<!-- LOGIN -->
<?php if($page=="login"): ?>
<h1>LOG IN</h1>
<div class="container">
<form method="POST">
<input name="username" placeholder="USERNAME">
<input type="password" name="password" placeholder="PASSWORD">

<div class="msg"><?php echo $msg; ?></div>

<button name="login">LOG IN</button>
<button type="submit" name="goto_signup">SIGN UP</button>
</form>
</div>
<?php endif; ?>

<!-- SIGNUP -->
<?php if($page=="signup" || isset($_POST['goto_signup'])): ?>
<h1>Sign up</h1>
<div class="container">
<form method="POST">
<input name="username" placeholder="USERNAME">
<input type="password" name="password" placeholder="PASSWORD">
<input type="password" name="confirm" placeholder="CONFIRM PASSWORD">

<div class="msg"><?php echo $msg; ?></div>

<button name="signup">Register</button>
</form>
</div>
<?php endif; ?>

<!-- VERIFY -->
<?php if($page=="verify"): ?>
<h1>VERIFICATION CODE</h1>
<div class="container">
<form method="POST">
<input name="phone" placeholder="PHONE NUMBER">
<input name="code" placeholder="CODE">

<div class="msg"><?php echo $msg; ?></div>

<button name="verify">VERIFY</button>
</form>
</div>
<?php endif; ?>

</body>
</html>