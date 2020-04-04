// alert('heyyyyyyy')



function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('txt').innerHTML =
    "Current Time" + " " + h + ":" + m + ":" + s;
    var t = setTimeout(startTime, 500);
  }
  function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
  }
  



window.history.forward(); 
function noBack() { 
    window.history.forward(); 
} 

setTimeout(function(){ 

    // location.href = "http://127.0.0.1:8000/login"
}, 3000);