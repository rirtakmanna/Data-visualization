import Chart from "chart.js";

var canvas = document.getElementsByTagName("canvas");

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

Array.prototype.forEach.call(canvas, (chart) => {
  var type = `${chart.getAttribute("data-graph")}`;
  var dataJSON = `./${chart.getAttribute("data-JSON")}.json`;

  var option = {
    animation: false,
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      xAxes: [
        {
          stacked: true,
        },
      ],
      yAxes: [
        {
          stacked: true,
        },
      ],
    },
  };

  loadJSON(dataJSON, function (response) {
    var data = JSON.parse(response);
    // console.log(type);
    var graphData = {
      labels: data.label,
      datasets: [
        {
          data: data.data,
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
        labels: data.label,
        datasets: [
          {
            data: data.data,
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
