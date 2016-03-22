// 格式{"北京": 90, "上海": 88}
var addBtn = document.getElementById('add-btn');
var cityInput = document.getElementById('aqi-city-input');
var valueInput = document.getElementById('aqi-value-input');
var table = document.getElementById('aqi-table');

var aqiData = {};

// 获取用户输入的信息，并添加到aqiData中
function addAqiData() {
	var city = cityInput.value.trim();
	var value = valueInput.value.trim();

	// 验证城市名称是否合法
	var cityReg = /^[a-zA-z\u0391-\uFFE5]+$/ig;
	if(!cityReg.test(city)) {
		alert("输入的城市名称必须是中英文字符！");
		return ;
	}

	// 验证空气质量指数是否合法
	var valueReg = /^[0-9]+$/g;
	if(!valueReg.test(value)) {
		alert("输入的空气质量指数不能必须为大于0的整数！");
		return ;
	}

	aqiData[city] = value;

}

// 渲染aqi-table表格
function renderAqiList() {

	var str = "<tr> <td>城市</td> <td>空气质量</td> <td>操作</td> </tr>";
	
	for(var city in aqiData) {
		str += "<tr><td>" + city + "</td><td>" + aqiData[city] + "</td><td>" + "<button class='del'>删除</button>" + "</td></tr>"; 
	}

	table.innerHTML = str;

	// 点击删除按钮的处理逻辑
	var delBtns = document.getElementsByClassName('del');
	var keys = Object.keys(aqiData);

	for(var i=0; i<keys.length; i++) {

		(function(i) {

			delBtns[i].onclick = function() {

				delete aqiData[keys[i]];
				renderAqiList();
				
			}

		})(i);
		
	}

}

// 点击add-btn时的处理逻辑
function addBtnHandle() {
	addAqiData();
	renderAqiList();
}

//添加点击事件 
function init() {
	addBtn.onclick = addBtnHandle;
}

init();


