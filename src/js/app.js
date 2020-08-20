import Chart from "chart.js";

// funtion for load JSON
function loadJSON(url, callback) {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open("GET", url, true);
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
      // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
      callback(xobj.responseText);
    }
  };
  xobj.send(null);
}

// Each graph doing
var canvas = document.getElementsByTagName("canvas");
Array.prototype.forEach.call(canvas, (chart) => {
  var type = `${chart.getAttribute("data-graph")}`;
  // Varify the path for json
  var dataJSON = `./${chart.getAttribute("data-JSON")}.json`;
  var lebel = `${chart.getAttribute("data-label")}`;
  lebel = lebel.split(",");

  var option, bcColor;

  if (chart.getAttribute("data-graph") == "line") {
    option = {
      maintainAspectRatio: false,
      animation: false,
      responsive: true,
      legend: {
        display: false,
      },
      scales: {
        xAxes: [
          {
            gridLines: {
              display: false,
            },
          },
        ],
        yAxes: [
          {
            gridLines: {
              display: false,
            },
          },
        ],
      },
    };

    bcColor = "rgba(60,141,188,0.9)";
  } else if (chart.getAttribute("data-graph") == "doughnut") {
    option = {
      maintainAspectRatio: false,
      responsive: true,
      animation: false,
    };
    bcColor = [
      "#f56954",
      "#00a65a",
      "#f39c12",
      "#00c0ef",
      "#3c8dbc",
      "#d2d6de",
    ];
  }

  loadJSON(dataJSON, function (response) {
    var data = JSON.parse(response);
    // console.log(type);
    var graphData = {
      labels: lebel,
      datasets: [
        {
          data: data.data,
          backgroundColor: bcColor,
        },
      ],
    };
    var graph = new Chart(chart, {
      type: type,
      data: graphData,
      options: option,
    });
  });

  setInterval(function () {
    loadJSON(dataJSON, function (response) {
      var data = JSON.parse(response);
      var graphData = {
        labels: lebel,
        datasets: [
          {
            data: data.data,
            backgroundColor: bcColor,
          },
        ],
      };
      var graph = new Chart(chart, {
        type: type,
        data: graphData,
        options: option,
      });
    });
  }, 20000);
});

var show = document.getElementsByClassName("show");
Array.prototype.forEach.call(show, (e) => {
  e.addEventListener("click", (event) => {
    var cardElement = event.target.parentElement.parentElement.parentElement;

    var cardBody = cardElement.getElementsByClassName("card__body")[0];

    if (cardBody.style.display === "none") {
      cardBody.style.display = "block";
    } else {
      cardBody.style.display = "none";
    }
  });
});

var close = document.getElementsByClassName("close");
Array.prototype.forEach.call(close, (e) => {
  e.addEventListener("click", (event) => {
    var cardElement = event.target.parentElement.parentElement.parentElement;
    cardElement.style.display = "none";
  });
});
