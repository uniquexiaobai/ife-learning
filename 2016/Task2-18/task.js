
var leftIn = document.getElementById('leftIn');
var rightIn = document.getElementById('rightIn');
var leftOut = document.getElementById('leftOut');
var rightOut = document.getElementById('rightOut');
var input = document.getElementById('num');
var container = document.getElementById('container');

// 创造一个新的按钮
function createItem() {
  var item = document.createElement("span");
  item.innerHTML = input.value;
  return item;
}

// 左侧插入
leftIn.onclick = function () {
  var item = createItem();
  if(/^[0-9]+$/.test(input.value.trim())) {
    if(container.hasChildNodes) {
      container.insertBefore(item, container.firstChild);
    }
  }
  input.value = "";
}

// 右侧插入
rightIn.onclick = function () {
  var item = createItem();
  if(/^[0-9]+$/.test(input.value.trim())) {
    container.appendChild(item);
  }
  input.value = "";
}

// 左侧删除
leftOut.onclick = function(e) {
  if(container.hasChildNodes()) {
    var num = container.firstChild.firstChild.nodeValue;
    container.removeChild(container.firstChild)
    alert(num);
  }
}

// 右侧删除
rightOut.onclick = function(e) {
  if(container.hasChildNodes()) {
    var num = container.lastChild.firstChild.nodeValue;
    container.removeChild(container.lastChild)
    alert(num);
  }
}

// 删除节点的事件
function delButton(btn) {
  btn.parentNode.removeChild(btn);
}


function init() {
  // 使用事件代理为按钮添加点击事件
  container.onclick = function(e) {
    if(e.target.tagName === "SPAN") {
      delButton.call(e.target, e.target);
    }
  }
}
init();
