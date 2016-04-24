var root = document.getElementById('root');
var btnDF = document.getElementById('btnDF');
var btnBF = document.getElementById('btnBF');
var btnDFS = document.getElementById('btnDFS');
var btnBFS = document.getElementById('btnBFS');
var valueS = document.getElementById('valueS');

var nodeList = [];
var indexBF;
var active = false;

// 初始化
function init() {
  if(nodeList.length) {
    for(var i=0; i<nodeList.length; i++) {
      if(nodeList[i].style.background !== 'blue') {
        nodeList[i].style.background = 'blue';
      }
    }
  }
  nodeList = [];
  indexBF = 0;
}

console.log(active);
// 深度优先遍历按钮事件
btnDF.onclick = function() {
  if(active) {
    alert('正在遍历！！！')
    return ;
  }
  init();
  traverseDF(root, nodeList);
  render();
}
// 广度优先遍历按钮事件
btnBF.onclick = function() {
  if(active) {
    alert('正在遍历！！！')
    return ;
  }
  init();
  traverseBF(root, nodeList);
  render();
}

// 深度优先搜索按钮事件
btnDFS.onclick = function() {
  if(active) {
    alert('正在遍历！！！')
    return ;
  }
  init();
  traverseDF(root, nodeList);
  render(true);
}
// 广度优先搜索按钮事件
btnBFS.onclick = function() {
  if(active) {
    alert('正在遍历！！！')
    return ;
  }
  init();
  traverseBF(root, nodeList);
  render(true);
}

// 深度优先遍历
function traverseDF(node, nodeList) {
  if(node) {
    nodeList.push(node);
    for(var i=0; i<node.children.length; i++) {
      traverseDF(node.children[i], nodeList);
    }
  }
}

// 广度优先遍历
function traverseBF(node, nodeList) {
  if(node) {
    nodeList.push(node);
    if(node.nextElementSibling && node.nextElementSibling.tagName === 'DIV') {
      traverseBF(node.nextElementSibling, nodeList);
    }
    node = nodeList[indexBF ++];
    if(node.firstElementChild) {
      traverseBF(node.firstElementChild, nodeList);
    }
  }
}

// 渲染动画
function render(isSearch) {
  active = true;
  var isOk = false;
  var i = 1;
  nodeList[0].style.background = "red";
  var interval = setInterval(function() {
    if(i < nodeList.length) {
      nodeList[i-1].style.background = "blue";
      nodeList[i].style.background = "red";
      if(isSearch && nodeList[i].firstChild.nodeValue.trim() === valueS.value.trim()) {
        clearInterval(interval);
        active = false;
        isOk = true;
        alert('找到了');
      }
      i ++;
    } else {
      clearInterval(interval);
      active = false;
      nodeList[i-1].style.background = "blue";
      if(isSearch && !isOk) {
        alert('找不到！！！');
      }
    }
  }, 500);
}
