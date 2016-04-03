var nameInput = document.getElementById("name");
var passwordInput = document.getElementById("password");
var repeatPasswordInput = document.getElementById("repeat-password");
var emailInput = document.getElementById("email");
var mobileInput = document.getElementById("mobile");

var warnName = document.getElementById("warn-name");
var warnPassword = document.getElementById("warn-password");
var warnRepeatPassword = document.getElementById("warn-repeat-password");
var warnEmail = document.getElementById("warn-email");
var warnMobile = document.getElementById("warn-mobile");

var btn = document.getElementById("btn");

// 验证 name
function checkName() {
  var value = nameInput.value.trim().replace(/[\u4E00-\uFA29]/g, 'aa');
  if(value === "") {
    warnName.innerHTML = "不能为空";
    warnName.style.color = "red";
    nameInput.style.border = "1px solid red";
  }
  else if(!/^.{4,16}$/g.test(value)) {
    warnName.innerHTML = "长度不对 “长度为4~16个字符”";
    warnName.style.color = "red";
    nameInput.style.border = "1px solid red";
  }
  else {
    warnName.innerHTML = "格式正确";
    warnName.style.color = "green";
    nameInput.style.border = "1px solid green";
    return true;
  }
}

// 验证 password
function checkPassword() {
  var value = passwordInput.value.trim().replace(/[\u4E00-\uFA29]/g, 'aa');
  if(value === "") {
    warnPassword.innerHTML = "不能为空";
    warnPassword.style.color = "red";
    passwordInput.style.border = "1px solid red";
  }
  else if(!/^.{8,32}$/g.test(value)) {
    warnPassword.innerHTML = "长度不对 “长度为8~32个字符”";
    warnPassword.style.color = "red";
    passwordInput.style.border = "1px solid red";
  }
  else {
    warnPassword.innerHTML = "格式正确";
    warnPassword.style.color = "green";
    passwordInput.style.border = "1px solid green";
    return true;
  }
}

// 验证 repeat-password
function checkRepeatPassword() {
  var value = repeatPasswordInput.value.trim().replace(/[\u4E00-\uFA29]/g, 'aa');
  if(value === "") {
    warnRepeatPassword.innerHTML = "不能为空";
    warnRepeatPassword.style.color = "red";
    repeatPasswordInput.style.border = "1px solid red";
  }
  else if(!/^.{8,32}$/g.test(value)) {
    warnRepeatPassword.innerHTML = "长度不对 “长度为8~32个字符”";
    warnRepeatPassword.style.color = "red";
    repeatPasswordInput.style.border = "1px solid red";
  }
  else if(passwordInput.value.trim() !== repeatPasswordInput.value.trim()) {
    warnRepeatPassword.innerHTML = "两次输入的密码不相同";
    warnRepeatPassword.style.color = "red";
    repeatPasswordInput.style.border = "1px solid red";
  }
  else {
    warnRepeatPassword.innerHTML = "格式正确";
    warnRepeatPassword.style.color = "green";
    repeatPasswordInput.style.border = "1px solid green";
    return true;
  }
}

// 检查email
function checkEmail() {
  var value = emailInput.value.trim();
  if(value === "") {
    warnEmail.innerHTML = "不能为空";
    warnEmail.style.color = "red";
    emailInput.style.border = "1px solid red";
  }
  else if(!/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(value)) {
    warnEmail.innerHTML = "邮箱格式不正确";
    warnEmail.style.color = "red";
    emailInput.style.border = "1px solid red";
  }
  else {
    warnEmail.innerHTML = "格式正确";
    warnEmail.style.color = "green";
    emailInput.style.border = "1px solid green";
    return true;
  }
}

// 检查mobile
function checkMobile() {
  var value = mobileInput.value.trim();

  if(/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(mobileInput.value)) {
    warnMobile.innerHTML = "格式正确";
    warnMobile.style.color = "green";
    mobileInput.style.border = "1px solid green";
    return true;
  }
  else if(value === '') {
    warnMobile.innerHTML = "不能为空";
    warnMobile.style.color = "red";
    mobileInput.style.border = "1px solid red";
  }
  else {
    warnMobile.innerHTML = "手机号格式不正确";
    warnMobile.style.color = "red";
    mobileInput.style.border = "1px solid red";
  }
}

function init() {

  // name事件
  nameInput.onfocus = function() {
    warnName.innerHTML = "长度为4~16个字符";
    warnName.style.color = "#A9A9A9";
    nameInput.style.border = "1px solid #A9A9A9";
  }
  nameInput.onblur = function() {
    checkName()
  }

  // password事件
  passwordInput.onfocus = function() {
    warnPassword.innerHTML = "长度为8~32个字符";
    warnPassword.style.color = "#A9A9A9";
    passwordInput.style.border = "1px solid #A9A9A9";
  }
  passwordInput.onblur = function() {
    checkPassword();
  }

  // password-repeat事件
  repeatPasswordInput.onfocus = function() {
    warnRepeatPassword.innerHTML = "长度为8~32个字符";
    warnRepeatPassword.style.color = "#A9A9A9";
    repeatPasswordInput.style.border = "1px solid #A9A9A9";
  }
  repeatPasswordInput.onblur = function() {
    checkRepeatPassword();
  }

  // email事件
  emailInput.onfocus = function() {
    warnEmail.innerHTML = "常用邮箱格式";
    warnEmail.style.color = "#A9A9A9";
    emailInput.style.border = "1px solid #A9A9A9";
  }
  emailInput.onblur = function() {
    checkEmail();
  }

  // mobile事件
  mobileInput.onfocus = function() {
    warnMobile.innerHTML = "常用手机号格式";
    warnMobile.style.color = "#A9A9A9";
    mobileInput.style.border = "1px solid #A9A9A9";
  }
  mobileInput.onblur = function() {
    checkMobile();
  }

  // 定义验证按钮事件
  btn.onclick = function() {
    if(checkName() & checkPassword() & checkRepeatPassword() & checkEmail() & checkMobile()) {
      alert("输入正确！");
    }
    else {
      alert("输入有误！");
    }
  }
}

init();
