var P = 0;
var T = 0;
var M1 = 0;
var A1 = 0;
var gamma = 0;
var alpha1 = 0;
var beta1 = 0;
var w = 0;
var Fx = 0;
var m2 = 0;
var A2 = 0;
var Q = 0;
var xi = 0;
var nu = 0;
var f = 0;
var alpha2 = 0;
var beta2 = 0;
var N = 0;
var Af = 1;
var qr = 0;
var f1 = 1;
var TR = 1;
var cf = 0;
var cd = 0;
var Ad = 1;
var M2 = 0;
var PT2 = 0;
var TT2 = 0;
var P2 = 0;
var T2 = 0;
var deltaS = 0;
var a = 0;
var b = 0;
var c = 0;
var det = 0;
var Lambda = 0;
var TwTo1 = 1;
var isent = false;
var M2;
var PR;
var TR;
var P2P1;
var T2T1;
var dsR;
var dsRKE;
var wloss;
var M2M1;
var cp;

var data = {
  cd: null,
  cf: null,
  twr: null,
  qr: null,
  Af: null,
  Ad: null,
  M1: null,
  A1: null,
  gamma: null,
  alpha1: null,
  beta1: null,
  A2: null,
  xi: null,
  nu: null,
  alpha2: null,
  beta2: null,
  N: null,
  isent: null
};

window.onload = function() {
    // Call the function to create the chart
    imageGUI();
    exampleFlow();
   // outputGraph();
  };

  // -----------------------------CALCULATIONS USING PYSCRIPT FOR NOW IGNORE THIS-------------------------------------------------
/*--------------Available Values--------------------
            self.AR = AR
            self.Ad = Ad
            self.cd = cd
            self.cf = cf
            self.Af = Af
            self.M1 = M1
            self.xi = xi
            self.nu = nu
            self.qr = qr
            self.k = k
            self.twr = twr
            self.isentropic = isentropic
            self.b1 = b1
            self.b2 = b2
            self.a1 = a1
            self.a2 = a2
            self.debug = debug

            # Add result properties here allows for easy access in the javascript
            self.M2 = [0.0, 0.0]
            self.dsR = [0.0, 0.0]
            self.dsRKE = [0.0, 0.0]
            self.wloss = [0.0, 0.0]
            self.PR = [0.0, 0.0]
            self.P2P1 = [0.0, 0.0]
            self.CP = [0.0, 0.0]
            self.TR = [0.0, 0.0]
            self.T2T1 = [0.0, 0.0]
            self.iter = [0, 0]
            self.nfev = [0, 0]
            self.initialM2 = [0.0, 0.0]
            self.infinatomicM2 = [0.0, 0.0]
            self.diatomicM2 = [0.0, 0.0]
            self.monatomicM2 = [0.0, 0.0]
            self.V2V1 = [0.0, 0.0]
            self.v2v1 = [0.0, 0.0]
            self.p2p1 = [0.0, 0.0]
            self.wpv = [0.0, 0.0]
            self.ek = [0.0, 0.0]
            self.Iq = [0.0, 0.0]
            self.we = [0.0, 0.0]
            self.wrev = [0.0, 0.0]
            self.I = [0.0, 0.0]
            self.Theta = [0.0, 0.0]
            self.dsRKE2 = [0.0, 0.0]
            self.zloss = [0.0, 0.0]
            self.CPinc = [0.0, 0.0]
            self.P3P1 = [0.0, 0.0]
            self.f1 = [0.0, 0.0]
            self.Lambda = [0.0, 0.0]
            self.b = [0.0, 0.0]
            self.c = [0.0, 0.0]
            self.det = [0.0, 0.0]
*/
  //-------------Filler While creating Calculation Code------------------------------------
function calcSum(){
  //  var sum = P + T + M1 + A1 + gamma + alpha1 + beta1 + w + Fx + m2 + A2 + Q + xi + nu + f + alpha2 + beta2 + N;
    js_test = pyscript.interpreter.globals.get('main');
    js_test();
    js_args = pyscript.interpreter.globals.get('args')
    console.log("STUFF")
    let jsArray = js_args.M2.toJs();
    console.log(jsArray[0]);
    console.log(js_args.M2)
    M2 = js_args.M2.toJs();
    PR = js_args.PR.toJs();
    TR = js_args.TR.toJs();
    P2P1 = js_args.P2P1.toJs();
    T2T1 = js_args.T2T1.toJs();
    dsR = js_args.dsR.toJs();
    dsRKE = js_args.dsRKE.toJs();
    wloss = js_args.wloss.toJs();
    M2M1 = [M2[0]/data.M1, M2[1]/data.M1]
    cp = js_args.CP.toJs();
  //  return sum;
  }

//Variables missing: Af, AD, CD, Cf, TWR, qr
function coefsBiquadratic(P , T , M1 , A1 , gamma , alpha1 , beta1 , w , Fx , m2 , A2 , Q , xi , nu , f , alpha2 , beta2 , N){
    TR = (gamma-1) ? (1 + qr) : 1;
    G = (gamma-1)/2;
    f1 = 1 + G * M1*M1;
    AR = A2/A1
    try {
      Lambda = math.complex(((1 + beta1*gamma*(1-cf/4*Af - cd/2*Ad)*M1**2 + (1-xi+nu*(Math.pow(f1, gamma/(gamma-1))-1))*(AR-1)) 
                /(alpha1/alpha2*M1*Math.sqrt(f1*TR))));
      Lambda = math.multiply(Lambda, Lambda);
    } catch(e) {
      Lambda = math.complex(((1 + beta1*gamma*(1-cf/4*Af - cd/2*Ad)*M1**2 + (1-xi+nu*(Math.exp(-(M1**2))-1))*(AR-1)) 
                /(alpha1/alpha2*M1*Math.sqrt(f1*TR))));
      Lambda = math.multiply(Lambda, Lambda);
    }
  
    b = (Lambda - 2*gamma*beta2*(1+xi*(1/AR-1))*(1+cf/4*Af/AR)) //Af????
        /(Lambda * G  -(Math.pow(gamma*beta2*(1+cf/4*Af/AR), 2)));
  
    c = -(Math.pow((1+xi*(1/AR-1)), 2))
        /(Lambda * G  -(Math.pow(gamma*beta2*(1+cf/4*Af/AR), 2))); ///Af????? k -> gamma
  
    det = Math.pow(b/2, 2) - c;
    console.log(det);
    Lambda = math.re(Lambda);
  
    solveBiquadratic();
  }

function solveBiquadratic(args) {
    // Solution to mass, momentum, and energy balance equations.
    // Mass balance is simple inlet nad outlet balance
    // Momentum balance as 1 friction force and 1 drag force
    // Energy balance has 1 heat addition term
    // Gravity and other sources of Potential Energy have been ignored.
    // Uses calorically perfect ideal gas assumption.

    b;
    c;
    det;

    let roots = [-b/2+math.sqrt(det), -b/2-math.sqrt(det)];

    // reject non-physical roots and replace with NaNs
    M2 = math.sqrt(rejectNonphysicalRoots(roots,true));
    postProcess()
}

function rejectNonphysicalRoots(roots, keepNans=false) {
  // set any roots with negative real part to NaN
  roots = roots.map(root => (math.re(root) < 0) ? NaN : root);

  // set any roots with non-zero imaginary part to NaN 
  roots = roots.map(root => (!math.isZero(math.im(root), 1e-6)) ? NaN : root);

  // sort values from lowest to highest
  roots.sort((a, b) => a - b);

  // remove any NaNs from roots, cast as real, and return
  if(!keepNans) {
      roots = roots.filter(root => !Number.isNaN(root));
  }

  return roots.map(root => math.re(root));
}

function postProcess(args) {
  // standard post-processing routine for all solutions

  let G = (k-1)/2;
  let f1 = 1 + G * M1*M1;
  let f2 = 1 + G * M2*M2;

  let TR = (k-1) ? (1 + qr) : 1;

  try {
      let PR = alpha1/alpha2 * Math.sqrt(TR) * M1/M2 * 1./AR * Math.pow(f1/f2, -(k+1)/(2*(k-1)));
      let dsR  = k/(k-1) * Math.log(TR) - Math.log(PR);
      let P2P1  = alpha1/alpha2 * Math.sqrt(TR) * M1/M2 * 1./AR * Math.sqrt(f1/f2);
      let P3P1 = ((1 - xi - nu) + xi * P2P1 + nu * Math.pow(f1, k/(k-1)))*onesLike(M2);

      let T2T1 = TR*(f1/f2);
      let p2p1 = P2P1/T2T1;
      let v2v1 = 1/p2p1;
      let M2M1 = M2/M1;
      let V2V1 = M2M1 * Math.sqrt(T2T1);

      args.V2V1 = V2V1;
      args.v2v1 = v2v1;
      args.p2p1 = p2p1;
      args.PR = PR;
      args.TR = onesLike(M2).map(i => i * TR);
      args.P2P1 = P2P1;
      args.T2T1 = TR * (f1/f2);
      args.dsR = dsR;
      args.dsRKE = dsR/(k/2*Math.pow(M1, 2));
      args.dsRKE2= dsR/(k/2*Math.pow(M2, 2));
      args.P3P1 = P3P1;
      args.wpv = -Math.log(P2P1*V2V1*AR);
      args.wrev = -Math.log(V2V1*AR);

      // Additional calculations ...
  } catch(e) {
      // Handle exception...
  }

  function onesLike(arr) {
      return Array(arr.length).fill(1);
  }

  // Further calculations go here...
}


  //--------------------------WORKFLOW-------------------------------------------------------
  function assignValues() {
    data.cd = parseFloat(document.getElementById("cd").value) || 0;
    data.cf = parseFloat(document.getElementById("cf").value) || 0;
    data.twr = parseFloat(document.getElementById("twr").value) || 0;
    data.qr = parseFloat(document.getElementById("qr").value) || 0;
    data.Af = parseFloat(document.getElementById("Af").value) || 0;
    data.Ad = parseFloat(document.getElementById("Ad").value) || 0;
    data.M1 = parseFloat(document.getElementById("M1").value) || 0;
    data.A1 = parseFloat(document.getElementById("A1").value) || 0;
    data.gamma = parseFloat(document.getElementById("gamma").value) || 0;
    data.alpha1 = parseFloat(document.getElementById("alpha1").value) || 0;
    data.beta1 = parseFloat(document.getElementById("beta1").value) || 0;
    data.A2 = parseFloat(document.getElementById("A2").value) || 0;
    data.xi = parseFloat(document.getElementById("xi").value) || 0;
    data.nu = parseFloat(document.getElementById("nu").value) || 0;
    data.alpha2 = parseFloat(document.getElementById("alpha2").value) || 0;
    data.beta2 = parseFloat(document.getElementById("beta2").value) || 0;
    data.N = parseFloat(document.getElementById("subelements").value) || 0;
    data.isent = document.getElementById("isentropic").value;
}

  function calculateFlow(event) {
    try {
        event.preventDefault();
        assignValues();
      //var P = parseFloat(document.getElementById("P").value) || 0;
      //var T = parseFloat(document.getElementById("T").value) || 0;
      //var M1 = parseFloat(document.getElementById("M1").value) || 0;
      //var A1 = parseFloat(document.getElementById("A1").value) || 0;
      //var gamma = parseFloat(document.getElementById("gamma").value) || 0;
      //var alpha1 = parseFloat(document.getElementById("alpha1").value) || 0;
      //var beta1 = parseFloat(document.getElementById("beta1").value) || 0;
      //var w = parseFloat(document.getElementById("w").value) || 0;
      //var Fx = parseFloat(document.getElementById("Fx").value) || 0;
      //var m2 = parseFloat(document.getElementById("m2").value) || 0;
      //var A2 = parseFloat(document.getElementById("A2").value) || 0;
      ///var Q = parseFloat(document.getElementById("Q").value) || 0;
      //var xi = parseFloat(document.getElementById("xi").value) || 0;
      //var nu = parseFloat(document.getElementById("nu").value) || 0;
      //var f = parseFloat(document.getElementById("f").value) || 0;
      //var alpha2 = parseFloat(document.getElementById("alpha2").value) || 0;
      //var beta2 = parseFloat(document.getElementById("beta2").value) || 0;
      //var N = parseFloat(document.getElementById("subelements").value) || 0;


     // P = parseFloat(document.getElementById("P").value) || 0;
     // T = parseFloat(document.getElementById("T").value) || 0;
      calcSum();

      for(var i = 1; i < N; i++){
        var sum = calcSum();
        console.log(i);
      }
      //console.log(pyscript.interpreter.globals.get('M2'));
      document.getElementById("M2").value = M2[0];
      document.getElementById("M2Second").value = M2[1];
      document.getElementById("P2P1").value = P2P1[0];
      document.getElementById("P2P1Second").value = P2P1[1];
      document.getElementById("T2T1").value = T2T1[0];
      document.getElementById("T2T1Second").value = T2T1[1];
      document.getElementById("PR").value = PR[0];
      document.getElementById("PRSecond").value = PR[1];
      document.getElementById("TR").value = TR[0];
      document.getElementById("TRSecond").value = TR[1];
      document.getElementById("deltaSR").value = dsR[0];
      document.getElementById("deltaSRSecond").value = dsR[1];
      document.getElementById("dsRKE").value = dsRKE[0];
      document.getElementById("dsRKESecond").value = dsRKE[1];
      document.getElementById("wloss").value = wloss[0];
      document.getElementById("wlossSecond").value = wloss[1];
      document.getElementById("cp").value = cp[0];
      document.getElementById("cpSecond").value = cp[1];
      document.getElementById("M2M1").value = M2M1[0];
      document.getElementById("M2M1Second").value = M2M1[1];
    } catch (error) {
      console.log(error);
    }
    outputGraph();
  }

  //--------------------------------------Inlet->Outlet Graphic ----------------------------------
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
  
    myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: [1, 2, 3],
          datasets: [
            {
              data: line2,
              borderColor: 'black',
              backgroundColor: A1<A2?'white':'gray',
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
  
//----------------------------------------------Example Flow fill in Values------------------------------------
function exampleFlow(){
    var selectElement = document.querySelector('.selectFlow');
    var selectedOption = selectElement.value;
  
    // Perform actions based on the selected option
    if (selectedOption === 'Default') {
      // Call a function for Isentropic flow with area change

        document.getElementById("cd").value = 0;
        document.getElementById("cf").value = 0;
        document.getElementById("Ad").value = 0;
        document.getElementById("Af").value = 0;
        document.getElementById("qr").value = 0;
        document.getElementById("twr").value = 1;
        //document.getElementById("P").value = 1;
        //document.getElementById("T").value = 1;
        document.getElementById("M1").value = 1;
        document.getElementById("A1").value = 1;
        document.getElementById("gamma").value = 1.4;
        document.getElementById("alpha1").value = 1;
        document.getElementById("beta1").value = 1;
        //document.getElementById("w").value = 1;
        //document.getElementById("Fx").value = 1;
        //document.getElementById("m2").value = 1;
        document.getElementById("A2").value = 2;
        //document.getElementById("Q").value = 1;
        document.getElementById("xi").value = 0.5;
        document.getElementById("nu").value = 0;
        //document.getElementById("f").value = 1;
        document.getElementById("alpha2").value = 1;
        document.getElementById("beta2").value = 1;
        document.getElementById("subelements").value = 1;
    } 
    if (selectedOption === 'Isentropic flow with area change') {
      // Call a function for Isentropic flow with area change

        document.getElementById("cd").value = 5;
        document.getElementById("cf").value = 5;
        document.getElementById("Ad").value = 5;
        document.getElementById("Af").value = 5;
        document.getElementById("qr").value = 5;
        document.getElementById("twr").value = 5;
        //document.getElementById("P").value = 1;
        //document.getElementById("T").value = 1;
        document.getElementById("M1").value = 1;
        document.getElementById("A1").value = 1;
        document.getElementById("gamma").value = 1;
        document.getElementById("alpha1").value = 1;
        document.getElementById("beta1").value = 1;
        //document.getElementById("w").value = 1;
        //document.getElementById("Fx").value = 1;
        //document.getElementById("m2").value = 1;
        document.getElementById("A2").value = 3;
        //document.getElementById("Q").value = 1;
        document.getElementById("xi").value = 1;
        document.getElementById("nu").value = 1;
        //document.getElementById("f").value = 1;
        document.getElementById("alpha2").value = 1;
        document.getElementById("beta2").value = 1;
        document.getElementById("subelements").value = 1;
    } 
    
    else if (selectedOption === 'Flow across a normal shock') {
      // Call a function for Flow across a normal shock
      //document.getElementById("P").value = 2;
      //document.getElementById("T").value = 2;
      document.getElementById("M1").value = 2;
      document.getElementById("A1").value = 2;
      document.getElementById("gamma").value = 2;
      document.getElementById("alpha1").value = 2;
      document.getElementById("beta1").value = 2;
      //document.getElementById("w").value = 2;
      //document.getElementById("Fx").value = 2;
      //document.getElementById("m2").value = 2;
      document.getElementById("A2").value = 2;
      //document.getElementById("Q").value = 2;
      document.getElementById("xi").value = 2;
      document.getElementById("nu").value = 2;
      //document.getElementById("f").value = 2;
      document.getElementById("alpha2").value = 2;
      document.getElementById("beta2").value = 2;
      document.getElementById("subelements").value = 2;
    } 
    
    else if (selectedOption === 'Fanno flow') {
      // Call a function for Fanno flow
      //document.getElementById("P").value = 3;
      //document.getElementById("T").value = 3;
      document.getElementById("M1").value = 3;
      document.getElementById("A1").value = 3;
      document.getElementById("gamma").value = 3;
      document.getElementById("alpha1").value = 3;
      document.getElementById("beta1").value = 3;
      //document.getElementById("w").value = 3;
      //document.getElementById("Fx").value = 3;
      //document.getElementById("m2").value = 3;
      document.getElementById("A2").value = 3;
      //document.getElementById("Q").value = 3;
      document.getElementById("xi").value = 3;
      document.getElementById("nu").value = 3;
      //document.getElementById("f").value = 3;
      document.getElementById("alpha2").value = 3;
      document.getElementById("beta2").value = 3;
      document.getElementById("subelements").value = 3;
    } 
    
    else if (selectedOption === 'Rayleigh flow') {
      // Call a function for Rayleigh flow
      document.getElementById("cd").value = 6;
      document.getElementById("cf").value = 6;
      document.getElementById("Ad").value = 6;
      document.getElementById("Af").value = 6;
      document.getElementById("qr").value = 6;
      document.getElementById("twr").value = 6;



      //document.getElementById("P").value = 4;
      //document.getElementById("T").value = 4;
      document.getElementById("M1").value = 4;
      document.getElementById("A1").value = 4;
      document.getElementById("gamma").value = 4;
      document.getElementById("alpha1").value = 4;
      document.getElementById("beta1").value = 4;
      //document.getElementById("w").value = 4;
      //document.getElementById("Fx").value = 4;
      //document.getElementById("m2").value = 4;
      document.getElementById("A2").value = 4;
      //document.getElementById("Q").value = 4;
      document.getElementById("xi").value = 4;
      document.getElementById("nu").value = 4;
      //document.getElementById("f").value = 4;
      document.getElementById("alpha2").value = 4;
      document.getElementById("beta2").value = 4;
      document.getElementById("subelements").value = 4;
    } 
    
    else if (selectedOption === 'Sudden expansion') {
      // Call a function for Sudden expansion
      document.getElementById("cd").value = 5;
      document.getElementById("cf").value = 5;
      document.getElementById("Ad").value = 5;
      document.getElementById("Af").value = 5;
      document.getElementById("qr").value = 5;
      document.getElementById("twr").value = 5;



      //document.getElementById("P").value = 5;
      //document.getElementById("T").value = 5;
      document.getElementById("M1").value = 5;
      document.getElementById("A1").value = 5;
      document.getElementById("gamma").value = 5;
      document.getElementById("alpha1").value = 5;
      document.getElementById("beta1").value = 5;
      //document.getElementById("w").value = 5;
      //document.getElementById("Fx").value = 5;
      //document.getElementById("m2").value = 5;
      document.getElementById("A2").value = 5;
      //document.getElementById("Q").value = 5;
      document.getElementById("xi").value = 5;
      document.getElementById("nu").value = 5;
      //document.getElementById("f").value = 5;
      document.getElementById("alpha2").value = 5;
      document.getElementById("beta2").value = 5;
      document.getElementById("subelements").value = 5;
    } 
    
    else if (selectedOption === 'Sudden Contraction') {
      // Call a function for Sudden Contraction
      document.getElementById("cd").value = 6;
      document.getElementById("cf").value = 6;
      document.getElementById("Ad").value = 6;
      document.getElementById("Af").value = 6;
      document.getElementById("qr").value = 6;
      document.getElementById("twr").value = 6;


     // document.getElementById("P").value = 6;
     // document.getElementById("T").value = 6;
      document.getElementById("M1").value = 6;
      document.getElementById("A1").value = 6;
      document.getElementById("gamma").value = 6;
      document.getElementById("alpha1").value = 6;
      document.getElementById("beta1").value = 6;
     // document.getElementById("w").value = 6;
      //document.getElementById("Fx").value = 6;
    //  document.getElementById("m2").value = 6;
      document.getElementById("A2").value = 6;
    //  document.getElementById("Q").value = 6;
      document.getElementById("xi").value = 6;
      document.getElementById("nu").value = 6;
    //  document.getElementById("f").value = 6;
      document.getElementById("alpha2").value = 6;
      document.getElementById("beta2").value = 6;
      document.getElementById("subelements").value = 6;
    } 
    
    else if (selectedOption === 'Two-stream mixing layer') {
      // Call a function for Two-stream mixing layer
      //document.getElementById("P").value = 7;
      //document.getElementById("T").value = 7;
      document.getElementById("M1").value = 7;
      document.getElementById("A1").value = 7;
      document.getElementById("gamma").value = 7;
      document.getElementById("alpha1").value = 7;
      document.getElementById("beta1").value = 7;
      //document.getElementById("w").value = 7;
      //document.getElementById("Fx").value = 7;
      //document.getElementById("m2").value = 7;
      document.getElementById("A2").value = 7;
      //document.getElementById("Q").value = 7;
      document.getElementById("xi").value = 7;
      document.getElementById("nu").value = 7;
      //document.getElementById("f").value = 7;
      document.getElementById("alpha2").value = 7;
      document.getElementById("beta2").value = 7;
      document.getElementById("subelements").value = 7;
    } 
    
    else if (selectedOption === 'Simultaneous friction and heat transfer') {
      // Call a function for Simultaneous friction and heat transfer
      //document.getElementById("P").value = 8;
      //document.getElementById("T").value = 8;
      document.getElementById("M1").value = 8;
      document.getElementById("A1").value = 8;
      document.getElementById("gamma").value = 8;
      document.getElementById("alpha1").value = 8;
      document.getElementById("beta1").value = 8;
      //document.getElementById("w").value = 8;
      //document.getElementById("Fx").value = 8;
      //document.getElementById("m2").value = 8;
      document.getElementById("A2").value = 8;
      //document.getElementById("Q").value = 8;
      document.getElementById("xi").value = 8;
      document.getElementById("nu").value = 8;
      //document.getElementById("f").value = 8;
      document.getElementById("alpha2").value = 8;
      document.getElementById("beta2").value = 8;
      document.getElementById("subelements").value = 8;
    } 
    
    else if (selectedOption === 'Simultaneous area change and friction') {
        //document.getElementById("P").value = 9;
        //document.getElementById("T").value = 9;
        document.getElementById("M1").value = 9;
        document.getElementById("A1").value = 9;
        document.getElementById("gamma").value = 9;
        document.getElementById("alpha1").value = 9;
        document.getElementById("beta1").value = 9;
        //document.getElementById("w").value = 9;
        //document.getElementById("Fx").value = 9;
        //document.getElementById("m2").value = 9;
        document.getElementById("A2").value = 9;
        //document.getElementById("Q").value = 9;
        document.getElementById("xi").value = 9;
        document.getElementById("nu").value = 9;
        //document.getElementById("f").value = 9;
        document.getElementById("alpha2").value = 9;
        document.getElementById("beta2").value = 9;
        document.getElementById("subelements").value = 9;
    }
    imageGUI();
}

var myChart2;
var myChart3;
//-----------------------------Graph for a input vs output---------------------------------------------
function outputGraph(){
    var ctx = document.getElementById('outputChart').getContext('2d');
    var ctx2 = document.getElementById('outputChart2').getContext('2d');
  // Get the values of M1 and M2
    assignValues();
    js_test = pyscript.interpreter.globals.get('main');


    var X = document.getElementById("chart-x").value;
    var Y = document.getElementById("chart-y").value;


    if (typeof myChart2 !== 'undefined') {
      myChart2.destroy();
    }
    if (typeof myChart3 !== 'undefined') {
      myChart3.destroy();
    }
    var root1 = [];
    var root2 = [];
    var delta = 0.1;
    for(data[X] = delta; data[X] < 3; data[X]+=delta){
        js_test();
        js_args = pyscript.interpreter.globals.get('args')
        M2 = js_args[Y].toJs();
        var dataPoint1 = {
            x: data[X],
            y: M2[0]
        };
        var dataPoint2 = {
          x: data[X],
          y: M2[1]
      };
        root1.push(dataPoint1);
        root2.push(dataPoint2)
    }

  // Create the chart
  myChart2 = new Chart(ctx, {
    type: 'line',
    data: {
      datasets: [{
        label: 'root1',
        data: root1,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        pointRadius: 0,
        pointHoverRadius: 8
      }],
    },
    
    options: {
      responsive: true,
      scales: {
        x: {
          type: 'linear',
          position: 'bottom',
          title: {
            display: true,
            text: X
          }
        },
        y: {
          type: 'linear',
          position: 'left',
          title: {
            display: true,
            text: Y
          }
        }
      },
      plugins: {
      }
    }
  });
  myChart3 = new Chart(ctx2, {
    type: 'line',
    data: {
      datasets: [
      {
        label: 'root2',
        data: root2,
        backgroundColor: 'red',
        borderColor: 'red',
        borderWidth: 1,
        pointRadius: 0,
        pointHoverRadius: 8
      }],
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
      }
    }
  });
}