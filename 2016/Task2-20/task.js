
var insertBtn = document.getElementById('insertBtn')
var searchBtn = document.getElementById('searchBtn')
var insertVal = document.getElementById('insertVal');
var searchVal = document.getElementById('searchVal');
var container = document.getElementById('container');
var deleteBtn = document.getElementById('deleteBtn');
var clearBtn = document.getElementById('clearBtn');

var list = [];           // 存储插入元素队列

// 渲染 view
function render(list, searchVal) {
  var str = '';
  for(var i=0; i<list.length; i++) {
    list[i] = searchVal ? list[i].replace(new RegExp(searchVal, 'g'), '<em>' + searchVal + '</em>') : list[i];  
    str += "<span>" + list[i] + "</span>";
  }
  container.innerHTML = str;
}

// 插入按钮绑定事件
insertBtn.onclick = function() {
  var val = insertVal.value.trim();
  var arr = val.split(/[^a-zA-Z\d\u4E00-\u9FA5]+/g).filter(function(item) {
    return item;
  });
  list = list.concat(arr);
  render(list);
  insertVal.value = '';
}

// 删除一个元素
deleteBtn.onclick = function() {
  if(list.length) {
    list.pop();
    render(list);
  }
}

// 清空队列
clearBtn.onclick = function() {
  if(list.length) {
    list = [];
    render(list);
  }
}

// 查询按钮绑定事件
searchBtn.onclick = function() {
  var val = searchVal.value.trim();
  render(list, val);
  searchVal.value = '';
}