  
  window.onload = function() {
    // Call the function to create the chart
    imageGUI();
    exampleFlow();
    outputGraph();
  };

  function calcSum(P , T , M1 , A1 , gamma , alpha1 , beta1 , w , Fx , m2 , A2 , Q , xi , nu , f , alpha2 , beta2 , N){
    var sum = P + T + M1 + A1 + gamma + alpha1 + beta1 + w + Fx + m2 + A2 + Q + xi + nu + f + alpha2 + beta2 + N;
    return sum;
  }

  function calculateFlow(event) {
    try {
        event.preventDefault();
      var P = parseFloat(document.getElementById("P").value) || 0;
      var T = parseFloat(document.getElementById("T").value) || 0;
      var M1 = parseFloat(document.getElementById("M1").value) || 0;
      var A1 = parseFloat(document.getElementById("A1").value) || 0;
      var gamma = parseFloat(document.getElementById("gamma").value) || 0;
      var alpha1 = parseFloat(document.getElementById("alpha1").value) || 0;
      var beta1 = parseFloat(document.getElementById("beta1").value) || 0;
      var w = parseFloat(document.getElementById("w").value) || 0;
      var Fx = parseFloat(document.getElementById("Fx").value) || 0;
      var m2 = parseFloat(document.getElementById("m2").value) || 0;
      var A2 = parseFloat(document.getElementById("A2").value) || 0;
      var Q = parseFloat(document.getElementById("Q").value) || 0;
      var xi = parseFloat(document.getElementById("xi").value) || 0;
      var nu = parseFloat(document.getElementById("nu").value) || 0;
      var f = parseFloat(document.getElementById("f").value) || 0;
      var alpha2 = parseFloat(document.getElementById("alpha2").value) || 0;
      var beta2 = parseFloat(document.getElementById("beta2").value) || 0;
      var N = parseFloat(document.getElementById("subelements").value) || 0;
    
      var sum = calcSum(P , T , M1 , A1 , gamma , alpha1 , beta1 , w , Fx , m2 , A2 , Q , xi , nu , f , alpha2 , beta2 , N);
      var M2 = sum;
      var PT2 = sum;
      var TT2 = sum;
      var P2 = sum;
      var T2 = sum;
      var deltaS = sum;

      for(var i = 1; i < N; i++){
        var sum = calcSum(P2 , T2 , M2 , A1 , gamma , alpha1 , beta1 , w , Fx , m2 , A2 , Q , xi , nu , f , alpha2 , beta2 , N);
        var M2 = sum;
        var PT2 = sum;
        var TT2 = sum;
        var P2 = sum;
        var T2 = sum;
        var deltaS = sum;
        console.log(i);
      }
  
      document.getElementById("M2").value = M2;
      document.getElementById("PT2").value = PT2;
      document.getElementById("TT2").value = TT2;
      document.getElementById("P2").value = P2;
      document.getElementById("T2").value = T2;
      document.getElementById("deltaS").value = deltaS;
    } catch (error) {
      console.log(error);
    }
  }
  var myChart;

  function imageGUI() {
    var ctx = document.getElementById('myChart').getContext('2d');
    var A1 = parseFloat(document.getElementById("A1").value) || 1;
    var A2 = parseFloat(document.getElementById("A2").value) || 4;
    
    var center = A2 / 2;
    var top = center + A1 / 2;
    var bottom = center - A1 / 2;
  
    var line1 = [];
    var line2 = [];
    var dottedLine = [];  // Dotted line dataset
    heights = [A1, A2]
    for (var i = 0; i <= 2; i++) {
      line1[i] = top + ((A2 - top) / 2) * i;
      line2[i] = (bottom / 2) * (2 - i);
      dottedLine[i - 1] = (line1[i - 1] + line2[i - 1]) / 2;  // Calculate dotted line as average of line1 and line2
    }
    
    var verticalLines = []; // Array to store all vertical lines
    for (var i = 0; i < 3; i++) {
      verticalLines[i] = [
        { x: i + 1, y: top + ((bottom - top) / 6) * heights[i] }
      ];
    }
  
    if (typeof myChart !== 'undefined') {
      myChart.destroy();
    }
  
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: [1, 2, 3],
          datasets: [
            {
              data: line2,
              borderColor: 'black',
              backgroundColor: 'white',
              fill: true,
              borderWidth: 1,
              pointRadius: 0,
              pointHoverRadius: 0
            },
            {
              data: line1,
              borderColor: 'black',
              backgroundColor: 'gray',
              fill: true,
              borderWidth: 1,
              pointRadius: 0,
              pointHoverRadius: 0
            },
          ]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              display: false
            },
            x: {
              display: false
            }
          },
          animation: {
            duration: 0 // general animation time
          },
          plugins: {
            legend: {
              display: false
            },
            annotation: {
              annotations: [
                {
                  type: 'line',
                  mode: 'vertical',
                  scaleID: 'x',
                  value: 0,
                  borderColor: 'transparent',
                  borderWidth: 0,
                  yMin: bottom,
                  yMax: top,
                  label: {
                    enabled: true,
                    content: 'Inlet',
                    position: 'top'
                  }
                },
                {
                  type: 'line',
                  mode: 'vertical',
                  scaleID: 'x',
                  value: 2,
                  borderColor: 'transparent',
                  borderWidth: 0,
                  label: {
                    enabled: true,
                    content: 'Outlet',
                    position: 'top'
                  }
                },
                {
                  type: 'line',
                  mode: 'vertical',
                  scaleID: 'x',
                  value: 1,
                  borderColor: 'transparent',
                  borderWidth: 0,
                  label: {
                    enabled: true,
                    content: 'Flow ->',
                    position: 'top'
                  }
                },
              ]
            }
          }
        }
      });
      
  }
  

function exampleFlow(){
    var selectElement = document.querySelector('.selectFlow');
    var selectedOption = selectElement.value;
  
    // Perform actions based on the selected option
    if (selectedOption === 'Isentropic flow with area change') {
      // Call a function for Isentropic flow with area change
        document.getElementById("P").value = 1;
        document.getElementById("T").value = 1;
        document.getElementById("M1").value = 1;
        document.getElementById("A1").value = 1;
        document.getElementById("gamma").value = 1;
        document.getElementById("alpha1").value = 1;
        document.getElementById("beta1").value = 1;
        document.getElementById("w").value = 1;
        document.getElementById("Fx").value = 1;
        document.getElementById("m2").value = 1;
        document.getElementById("A2").value = 1;
        document.getElementById("Q").value = 1;
        document.getElementById("xi").value = 1;
        document.getElementById("nu").value = 1;
        document.getElementById("f").value = 1;
        document.getElementById("alpha2").value = 1;
        document.getElementById("beta2").value = 1;
        document.getElementById("subelements").value = 1;
    } 
    
    else if (selectedOption === 'Flow across a normal shock') {
      // Call a function for Flow across a normal shock
      document.getElementById("P").value = 2;
      document.getElementById("T").value = 2;
      document.getElementById("M1").value = 2;
      document.getElementById("A1").value = 2;
      document.getElementById("gamma").value = 2;
      document.getElementById("alpha1").value = 2;
      document.getElementById("beta1").value = 2;
      document.getElementById("w").value = 2;
      document.getElementById("Fx").value = 2;
      document.getElementById("m2").value = 2;
      document.getElementById("A2").value = 2;
      document.getElementById("Q").value = 2;
      document.getElementById("xi").value = 2;
      document.getElementById("nu").value = 2;
      document.getElementById("f").value = 2;
      document.getElementById("alpha2").value = 2;
      document.getElementById("beta2").value = 2;
      document.getElementById("subelements").value = 2;
    } 
    
    else if (selectedOption === 'Fanno flow') {
      // Call a function for Fanno flow
      document.getElementById("P").value = 3;
      document.getElementById("T").value = 3;
      document.getElementById("M1").value = 3;
      document.getElementById("A1").value = 3;
      document.getElementById("gamma").value = 3;
      document.getElementById("alpha1").value = 3;
      document.getElementById("beta1").value = 3;
      document.getElementById("w").value = 3;
      document.getElementById("Fx").value = 3;
      document.getElementById("m2").value = 3;
      document.getElementById("A2").value = 3;
      document.getElementById("Q").value = 3;
      document.getElementById("xi").value = 3;
      document.getElementById("nu").value = 3;
      document.getElementById("f").value = 3;
      document.getElementById("alpha2").value = 3;
      document.getElementById("beta2").value = 3;
      document.getElementById("subelements").value = 3;
    } 
    
    else if (selectedOption === 'Rayleigh flow') {
      // Call a function for Rayleigh flow
      document.getElementById("P").value = 4;
      document.getElementById("T").value = 4;
      document.getElementById("M1").value = 4;
      document.getElementById("A1").value = 4;
      document.getElementById("gamma").value = 4;
      document.getElementById("alpha1").value = 4;
      document.getElementById("beta1").value = 4;
      document.getElementById("w").value = 4;
      document.getElementById("Fx").value = 4;
      document.getElementById("m2").value = 4;
      document.getElementById("A2").value = 4;
      document.getElementById("Q").value = 4;
      document.getElementById("xi").value = 4;
      document.getElementById("nu").value = 4;
      document.getElementById("f").value = 4;
      document.getElementById("alpha2").value = 4;
      document.getElementById("beta2").value = 4;
      document.getElementById("subelements").value = 4;
    } 
    
    else if (selectedOption === 'Sudden expansion') {
      // Call a function for Sudden expansion
      document.getElementById("P").value = 5;
      document.getElementById("T").value = 5;
      document.getElementById("M1").value = 5;
      document.getElementById("A1").value = 5;
      document.getElementById("gamma").value = 5;
      document.getElementById("alpha1").value = 5;
      document.getElementById("beta1").value = 5;
      document.getElementById("w").value = 5;
      document.getElementById("Fx").value = 5;
      document.getElementById("m2").value = 5;
      document.getElementById("A2").value = 5;
      document.getElementById("Q").value = 5;
      document.getElementById("xi").value = 5;
      document.getElementById("nu").value = 5;
      document.getElementById("f").value = 5;
      document.getElementById("alpha2").value = 5;
      document.getElementById("beta2").value = 5;
      document.getElementById("subelements").value = 5;
    } 
    
    else if (selectedOption === 'Sudden Contraction') {
      // Call a function for Sudden Contraction
      document.getElementById("P").value = 6;
      document.getElementById("T").value = 6;
      document.getElementById("M1").value = 6;
      document.getElementById("A1").value = 6;
      document.getElementById("gamma").value = 6;
      document.getElementById("alpha1").value = 6;
      document.getElementById("beta1").value = 6;
      document.getElementById("w").value = 6;
      document.getElementById("Fx").value = 6;
      document.getElementById("m2").value = 6;
      document.getElementById("A2").value = 6;
      document.getElementById("Q").value = 6;
      document.getElementById("xi").value = 6;
      document.getElementById("nu").value = 6;
      document.getElementById("f").value = 6;
      document.getElementById("alpha2").value = 6;
      document.getElementById("beta2").value = 6;
      document.getElementById("subelements").value = 6;
    } 
    
    else if (selectedOption === 'Two-stream mixing layer') {
      // Call a function for Two-stream mixing layer
      document.getElementById("P").value = 7;
      document.getElementById("T").value = 7;
      document.getElementById("M1").value = 7;
      document.getElementById("A1").value = 7;
      document.getElementById("gamma").value = 7;
      document.getElementById("alpha1").value = 7;
      document.getElementById("beta1").value = 7;
      document.getElementById("w").value = 7;
      document.getElementById("Fx").value = 7;
      document.getElementById("m2").value = 7;
      document.getElementById("A2").value = 7;
      document.getElementById("Q").value = 7;
      document.getElementById("xi").value = 7;
      document.getElementById("nu").value = 7;
      document.getElementById("f").value = 7;
      document.getElementById("alpha2").value = 7;
      document.getElementById("beta2").value = 7;
      document.getElementById("subelements").value = 7;
    } 
    
    else if (selectedOption === 'Simultaneous friction and heat transfer') {
      // Call a function for Simultaneous friction and heat transfer
      document.getElementById("P").value = 8;
      document.getElementById("T").value = 8;
      document.getElementById("M1").value = 8;
      document.getElementById("A1").value = 8;
      document.getElementById("gamma").value = 8;
      document.getElementById("alpha1").value = 8;
      document.getElementById("beta1").value = 8;
      document.getElementById("w").value = 8;
      document.getElementById("Fx").value = 8;
      document.getElementById("m2").value = 8;
      document.getElementById("A2").value = 8;
      document.getElementById("Q").value = 8;
      document.getElementById("xi").value = 8;
      document.getElementById("nu").value = 8;
      document.getElementById("f").value = 8;
      document.getElementById("alpha2").value = 8;
      document.getElementById("beta2").value = 8;
      document.getElementById("subelements").value = 8;
    } 
    
    else if (selectedOption === 'Simultaneous area change and friction') {
        document.getElementById("P").value = 9;
        document.getElementById("T").value = 9;
        document.getElementById("M1").value = 9;
        document.getElementById("A1").value = 9;
        document.getElementById("gamma").value = 9;
        document.getElementById("alpha1").value = 9;
        document.getElementById("beta1").value = 9;
        document.getElementById("w").value = 9;
        document.getElementById("Fx").value = 9;
        document.getElementById("m2").value = 9;
        document.getElementById("A2").value = 9;
        document.getElementById("Q").value = 9;
        document.getElementById("xi").value = 9;
        document.getElementById("nu").value = 9;
        document.getElementById("f").value = 9;
        document.getElementById("alpha2").value = 9;
        document.getElementById("beta2").value = 9;
        document.getElementById("subelements").value = 9;
    }  
}

function outputGraph(){
var ctx = document.getElementById('outputChart').getContext('2d');

  // Get the values of M1 and M2
    var P = parseFloat(document.getElementById("P").value) || 1;
    var T = parseFloat(document.getElementById("T").value) || 1;
    var M1 = parseFloat(document.getElementById("M1").value) || 0;
    var A1 = parseFloat(document.getElementById("A1").value) || 0;
    var gamma = parseFloat(document.getElementById("gamma").value) || 0;
    var alpha1 = parseFloat(document.getElementById("alpha1").value) || 0;
    var beta1 = parseFloat(document.getElementById("beta1").value) || 0;
    var w = parseFloat(document.getElementById("w").value) || 0;
    var Fx = parseFloat(document.getElementById("Fx").value) || 0;
    var m2 = parseFloat(document.getElementById("m2").value) || 0;
    var A2 = parseFloat(document.getElementById("A2").value) || 0;
    var Q = parseFloat(document.getElementById("Q").value) || 0;
    var xi = parseFloat(document.getElementById("xi").value) || 0;
    var nu = parseFloat(document.getElementById("nu").value) || 0;
    var f = parseFloat(document.getElementById("f").value) || 0;
    var alpha2 = parseFloat(document.getElementById("alpha2").value) || 0;
    var beta2 = parseFloat(document.getElementById("beta2").value) || 0;
    var N = parseFloat(document.getElementById("subelements").value) || 0;
    X = []
    Y = []
    for(var i = 0; i < 100; i++){
        var sum = calcSum(P , T , M1 , A1 , gamma , alpha1 , beta1 , w , Fx , m2 , A2 , Q , xi , nu , f , alpha2 , beta2 , N);
        X.push(i);
        Y.push(sum)
    }

  // Generate the scatter plot data
  var dataPoints = [{
    x: X,
    y: Y
  }];

  // Create the chart
  var myChart = new Chart(ctx, {
    type: 'scatter',
    data: {
      datasets: [{
        label: 'M1 vs M2',
        data: dataPoints,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        pointRadius: 6,
        pointHoverRadius: 8
      }]
    },
    options: {
      responsive: true,
      scales: {
        x: {
          type: 'linear',
          position: 'bottom',
          title: {
            display: true,
            text: 'M1'
          }
        },
        y: {
          type: 'linear',
          position: 'left',
          title: {
            display: true,
            text: 'M2'
          }
        }
      },
      plugins: {
        legend: {
          display: false
        }
      }
    }
  });
}