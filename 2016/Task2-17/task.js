/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-04": 10
  }
};
*/

var formGraTime = document.getElementById('form-gra-time');
var select = document.getElementById('city-select');
var aqiChartWrap = document.getElementsByClassName('aqi-chart-wrap')[0];

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}

function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: "北京",
  nowGraTime: "day"
}

/**
 * 获得随机颜色
 */
var getRandomColor = function(){
  return '#'+Math.floor(Math.random()*16777215).toString(16);
}

/**
 * 渲染图表
 */
function renderChart() {
  var chartDataSize = Object.keys(chartData).length;
  var str = "";
  var width = '10px';
  for(var t in chartData) {
    if(chartDataSize === 12) {
      width = "20px"
    }
    if(chartDataSize === 3) {
      width = "40px";
    }
    var styles = 'height: ' + chartData[t] + 'px; background: ' + getRandomColor() + '; width: ' + width;
    // console.log(style);
    var title = t + '\n' + '[AQI]: ' + chartData[t];
    str += "<span style='" + styles + "' title='" + title + "'></span>";
  }
  aqiChartWrap.innerHTML = str;
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(graTime) {

  // 确定是否选项发生了变化
  if(graTime.value === pageState.nowGraTime) {
    return ;
  }

  // 设置对应数据
  pageState.nowGraTime = graTime.value;
  // 调用图表渲染函数
  initAqiChartData();
  renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {

  // 使用事件代理为radio添加事件
  formGraTime.onclick = function(e) {

    if (e.target.tagName === "INPUT") {
      graTimeChange.call(e.target, e.target);
    }

  }

}


/**
 * select发生变化时的处理函数
 */
function citySelectChange() {

  // 确定是否选项发生了变化
  if(select.value === pageState.nowSelectCity) {
    return ;
  }

  // 设置对应数据
  pageState.nowSelectCity = select.value;
  // 调用图表渲染函数
  initAqiChartData();
  renderChart();
}


/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {

  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  var str = "";
  for(var city in aqiSourceData) {
    str += "<option>" + city + "</option>";
  }
  select.innerHTML = str;

  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  select.addEventListener('change', citySelectChange);
}


/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // chartData
  var type = pageState.nowGraTime;
  var city = pageState.nowSelectCity;
  switch (type) {

    case 'month' :
      chartData = [];
      var currentMonth = 0;
      var total = 0;
      var count = 0;
      var tempMonth = 0;
      for(var date in aqiSourceData[city]) {
        currentMonth = new Date(date).getMonth() + 1;
        if(tempMonth === 0) {
          tempMonth = currentMonth;
        }
        if(tempMonth !== currentMonth) {
          chartData[tempMonth + "月"] = Math.round(total/count);
          tempMonth = currentMonth;
          count = 0;
          total = 0;
        }
        count ++;
        total += aqiSourceData[city][date];
      }
      chartData[tempMonth + "月"] = Math.round(total/count);
      break;

    case 'week' :
      chartData = [];
      var currentWeek = 0;
      var total = 0;
      var count = 0;
      var week = 1;
      for(var date in aqiSourceData[city]) {
        var d = new Date(date);
        currentWeek = d.getDay() + 1;
        currentMonth = d.getMonth() + 1;
        if(currentWeek === 7) {
          count ++;
          total += aqiSourceData[city][date];
          week = (week === 5) ? 1 : week;
          chartData[currentMonth + '月 第' + week + "周"] = Math.round(total/count);
          count = 0;
          total = 0;
          week ++;
        }

        else {
          count ++;
          total += aqiSourceData[city][date];
        }
      }
      chartData[currentMonth + '月 第' + week + "周"] = Math.round(total/count);
      break;

    case 'day' :
      chartData = [];
      chartData=aqiSourceData[city];
      break;

  }
  // 处理好的数据存到 chartData 中
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
  renderChart();
}

init();
