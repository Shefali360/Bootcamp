function startTime() {
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    hrs = setFormat(hours);
    hrs = checkTime(hours);
    mins = checkTime(minutes);
    secs = checkTime(seconds);
    unit = setUnit();
    hour = setFormat(hours);
    hrs=  checkTime(hour);
    document.getElementById("greeting").innerHTML= greeting(hours);
    document.getElementById("demo").innerHTML =
      hrs +
      ":" +
      mins +
      ":" +
      secs +
      " " +
      setUnit(hours);
     
    var t = setTimeout(startTime, 1000);
    showDate();
  }

  function checkTime(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

  function setFormat(j) {
    if (j - 12 > 0) {
      j = j - 12;
    } else {
      j = j;
    }
    return j;
  }

function setUnit(hr) 
  {
    if (hr - 12 >= 0) {
      unit = "PM";
    } else {
      unit = "AM";
    }
    return unit;
  }

  function greeting(hr) {
    if (hr - 12 < 0) {
      greet = "Good Morning";
    } else if (hr - 12 >= 0 && hr - 12 < 5) {
      greet = "Good Afternoon";
    } else if (hr - 12 >=5 && hr - 12 <= 9) {
      greet = "Good Evening";
    } else {
      greet = "Good Night";
    }
    return greet;
  }
  var montharray = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  function showDate() {
    var date = new Date();
    var d = date.getDate();
    var day= checkTime(d);
    var month = date.getMonth();
    var year = date.getFullYear();
    document.getElementById("date").innerHTML =
      day + " " + montharray[month] + " " + year;
  }
  









