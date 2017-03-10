var table = document.getElementById('table');
var inputValue = document.getElementById('inputValue');
var btn = document.getElementById('btn');
var box = document.getElementById('box');

var direction = ['top', 'right', 'bottom', 'left'];     // 方向的枚举

// box 的状态
var state = {
  x: 0,
  y: 0,
  header: 0
};

// 执行按钮事件
btn.onclick = function() {
  var directive = inputValue.value;
  if(directive === 'GO') {
    go();
  }
  else {
    rotate(directive);
  }
  render();
}

init();

// 初始化函数
function init() {
  box.style.display = 'flex';
  state.x = 5;
  state.y = 5;
  state.header = 0;
  render();
}

// 渲染函数
function render() {
  // console.log(state);

  var leftV = state.x * 47;
  var topV = state.y * 47;

  box.style.left = leftV + 'px';
  box.style.top = topV + 'px';

  switch(state.header) {
    case 0 :
      box.className = 'top';
      break;
    case 1 :
      box.className = 'right';
      break;
    case 2 :
      box.className = 'bottom';
      break;
    case 3 :
      box.className = 'left';
      break;
  }

}

// 控制方向
function rotate(directive) {
  switch(directive) {
    case 'TUN LEF' :
      state.header --;
      state.header = state.header < 0 ? 3 : state.header;
      state.header = state.header % 4;
      break;
    case 'TUN RIG' :
      state.header ++;
      state.header = state.header % 4;
      break;
    case 'TUN BAC' :
      state.header = (state.header + 2) % 4;
      break;
  }
}

// 前进
function go() {
  switch (state.header) {
    case 0 :
      state.y = state.y > 0 ? --state.y : 0;
      break;
    case 1 :
      state.x = state.x < 9 ? ++state.x : 9;
      break;
    case 2 :
      state.y = state.y < 9 ? ++state.y : 9;
      break;
    case 3 :
      state.x = state.x > 0 ? --state.x : 0;
      break;
  }
}
