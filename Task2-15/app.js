var btn = document.getElementById('sort-btn');
var list = document.querySelectorAll('#source li');
var values = document.querySelectorAll('#source li b');
var resort = document.getElementById('resort');

// 取得数据，push到数组中
function getData() {

	var data = [];

	for(var i=0; i<list.length; i++) {
		data.push([ list[i].innerHTML.slice(0, 2), parseInt(values[i].innerHTML) ]);
	}

	return data;

}

function sortAqiData(data) {

	// 冒泡排序
	for(var i=0; i<data.length; i++) {

		for(var j=0; j<data.length-1-i; j++) {

			if(data[j][1] > data[j+1][1]) {
				var temp = data[j];
				data[j] = data[j+1];
				data[j+1] = temp;
			}

		}

	}

	return data;

}

// 将排序后的数据 render
function render(data) {
	console.log(data);

	var str = "";

	for(var i=0; i<data.length; i++) {
		str += "<li>第" + (i+1) +"名：" + data[i][0] + "空气质量：" + "<b>" + data[i][1] + "</b></li>"; 
	}

	resort.innerHTML = str;

}

// 处理按钮事件
function btnHandle() {
	var aqiData = getData();
	aqiData = sortAqiData(aqiData);
	render(aqiData);
}

// 注册按钮的点击事件
function init() {
	btn.onclick = btnHandle;
}

init();