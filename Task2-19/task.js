
var leftIn = document.getElementById('leftIn');
var rightIn = document.getElementById('rightIn');
var leftOut = document.getElementById('leftOut');
var rightOut = document.getElementById('rightOut');
var sortBtn = document.getElementById('sortBtn');
var randomBtn = document.getElementById('randomBtn');
var input = document.getElementById('num');
var container = document.getElementById('container');

var list = [];           // 存储数字队列
var snapshots = [];         // 记录每一次排序后的快照

// 初始化
function init() {
  list = [];
  snapshots = [];
}

// 获取颜色
function getColor(num) {
  var str = '';
  var n = (Math.round(num/10) +2).toString(16);
  if(num >= 70) {
    str = "#" + n + n + '0000';
  }
  else if(num <= 40) {
    str = "#00" + n + n + '00';
  }
  else {
    str = "#0000" + n + n;
  }
  return str;
}

// 渲染 view
function render(list) {
  var str = "";
  var h = '';
  for(var i=0; i<list.length; i++) {
    h = 'height:' + (list[i]*5) +'px;';
    bgColor = 'background:' + getColor(list[i]);
    str += "<span style=" + h + bgColor + "></span>";
    console.log()
  }
  container.innerHTML = str;
}

// 随机按钮绑定事件
randomBtn.onclick = function() {
  init();
  doRandom();
  render(list);
}

// 排序按钮绑定事件
sortBtn.onclick = function() {
  bubbleSort();
  var timer;
  timer = setInterval(function() {
    var snapshot = [];
    if(snapshots.length !== 0) {
      snapshot = snapshots.shift();
      render(snapshot);
    }
    else {
      clearInterval(timer);
      return ;
    }
  }, 50);
}

// 检查 in 是否合法
function checkIn(value) {
  if(list.length >= 60) {
    alert('最多添加60个元素！');
    return false;
  }
  if(value === '') {
    alert('请先输入数字！');
    return false;
  }

  if(parseInt(value).toString() === 'NaN') {
    alert('输入的必须为整数！');
    return false;
  }

  if(value > 100 || value < 10) {
    alert('输入的范围必须在 10 - 100 之内！');
    return false;
  }

  return true;
}

// 检查 out 是否合法
function checkOut(value) {
  if(list.length <= 0) {
    alert('请添加后再移除！');
    return false;
  }
  return true;
}

// 添加数字事件
leftIn.onclick = function() {
  var num = input.value.trim();
  if(checkIn(num)) {
    list.unshift(num);
    render(list);
  }
}
rightIn.onclick = function() {
  var num = input.value.trim();
  if(checkIn(num)) {
    list.push(num);
    render(list);
  }
}

// 移除元素事件
leftOut.onclick = function() {
  var num = input.value.trim();
  if(checkOut(num)) {
    list.shift();
    render(list);
  }
}
rightOut.onclick = function() {
  var num = input.value.trim();
  if(checkOut(num)) {
    list.pop();
    render(list);
  }
}


// 冒泡排序
function bubbleSort() {
  var i, j, temp;

  for(i=0; i<list.length-1; i++) {
    for(j=0; j<list.length-1-i; j++) {
      if(list[j] > list[j+1]) {
        temp = list[j];
        list[j] = list[j+1];
        list[j+1] = temp;
      }
      snapshots.push(list.slice(0));
    }
  }

}

// 随机产生 40 个数字
function doRandom() {
  var number = 0;

  for(var i=0; i<40; i++) {
    number = Math.ceil(Math.random() * 90) + 10;
    list.push(number);
  }

}
