var radioBtn = document.getElementById('radioBtn');
var city = document.getElementById('city');
var inSchool = document.getElementById('inSchool');
var outSchool = document.getElementById('outSchool');
var school = document.getElementById('school');

var data = {
    bj: ["北京大学", "清华大学", "北京理工大学"],
    sh: ["复旦大学", "上海交通大学", "同济大学"],
    hz: ["浙江大学", "杭州电子科技大学", "浙江工业大学"]
};

city.addEventListener('change', function() {
  var str = '';
  for(var i=0; i<data[city.value].length; i++) {
    str += '<option>'+ data[city.value][i] +'</option>';
  }
  school.innerHTML = str;
})

radioBtn.addEventListener('click', function(e) {
  if(e.target.tagName === 'INPUT') {
    if(e.target.value === 'in') {
      inSchool.className = 'show';
      outSchool.className = 'hide';
    }
    if(e.target.value === 'out') {
      inSchool.className = 'hide';
      outSchool.className = 'show';
    }
  }
})
