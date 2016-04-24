var root = document.getElementById('root');
var preOrderBtn = document.getElementById('preOrderBtn');
var inOrderBtn = document.getElementById('inOrderBtn');
var postOrderBtn = document.getElementById('postOrderBtn');

// 定义按钮的事件
preOrderBtn.onclick = function() {
	init();
	preOrder(root);
	render();
}
inOrderBtn.onclick = function() {
	init();
	inOrder(root);
	render();
}
postOrderBtn.onclick = function() {
	init();
	postOrder(root);
	render();
}

// 储存遍历的结果
var nodeList;		

// 初始化
function init() {
	nodeList = [];
}

// 先序遍历
function preOrder(root) {
	nodeList.push(root);
	if(root.firstElementChild) {
		preOrder(root.firstElementChild);
	}
	if(root.lastElementChild) {
		preOrder(root.lastElementChild);
	}
}

// 中序遍历
function inOrder(root) {
	if(root.firstElementChild) {
		inOrder(root.firstElementChild);
	}
	nodeList.push(root);
	if(root.lastElementChild) {
		inOrder(root.lastElementChild);
	}
}

// 后序遍历
function postOrder(root) {
	if(root.firstElementChild) {
		postOrder(root.firstElementChild);
	}
	if(root.lastElementChild) {
		postOrder(root.lastElementChild);
	}
	nodeList.push(root);
}

// 渲染视图的方法
function render() {
	var i = 1;
	nodeList[0].style.backgroundColor = "red";
	var interval = setInterval(function() {
		if(i < nodeList.length) {
				nodeList[i-1].style.backgroundColor = "blue";
				nodeList[i].style.backgroundColor = "red";
				i ++;
		}
		else {
			nodeList[i-1].style.backgroundColor = "blue";
			clearInterval(interval);
		}
	}, 500);
}