//------------------------Objects-----------------------------

//------------------------Input Data--------------------------
var data = {
  po1: null,
  to1: null,
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
  isent: null,
  root: null,
  error: null
};
//----------------------Output Data---------------------------
var output = {
  M2: [],
  PR: [],
  TR: [],
  P2P1: [],
  T2T1: [],
  dsR: [],
  dsRKE: [],
  wloss: [],
  M2M1: [],
  cp: [],
  V2V1: [],
  v2v1: [],
  p2p1: [],
  wpv: [],
  ek: [],
  Iq: [],
  we: [],
  wrev: [],
  I: [],
  Theta: [],
  dsRKE2: [],
  zloss: [],
  CPinc: [],
  P3P1: [],
  P3Po1: [],
  Lambda: null,
  b: null,
  c: null,
  det: null
};
window.onload = function() {
    // Call the function to create the chart
    imageGUI();
    exampleFlow();
    emptyGraph();
  };

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

  /* ------------------------------------------------------------------------------------------------------------------------
  -
  -
  -
  -                                 Calculation Code
  -
  -
  -------------------------------------------------------------------------------------------------------------------------*/

//Interfaces with Uniflow.py (which is in the py-script tags in index.html)
function interfaceUNI(){
    uniflow = pyscript.interpreter.globals.get('main');
    uniflow();
    js_args = pyscript.interpreter.globals.get('args');
    output.f1 = js_args.f1
    output.M2 = js_args.M2.toJs();
    output.PR = js_args.PR.toJs();
    output.TR = js_args.TR.toJs();
    output.P2P1 = js_args.P2P1.toJs();
    output.T2T1 = js_args.T2T1.toJs();
    output.dsR = js_args.dsR.toJs();
    output.dsRKE = js_args.dsRKE.toJs();
    output.wloss = js_args.wloss.toJs();
    output.M2M1 = [output.M2[0] / data.M1, output.M2[1] / data.M1];
    output.cp = js_args.CP.toJs();
    output.V2V1 = js_args.V2V1.toJs();
    output.v2v1 = js_args.v2v1.toJs();
    output.p2p1 = js_args.p2p1.toJs();
    output.dsRKE2 = js_args.dsRKE2.toJs();
    output.zloss = js_args.zloss.toJs();
    output.CPinc = js_args.CPinc.toJs();
    output.P3P1 = js_args.P3P1.toJs();
    output.P3Po1 = [output.P3P1[0]/(output.f1 ** (data.gamma/(data.gamma-1))), output.P3P1[1]/(output.f1 ** (data.gamma/(data.gamma-1)))]
    output.Lambda = js_args.Lambda; 
    output.b = js_args.b; 
    output.c = js_args.c;
    output.det = js_args.discriminant;
    data.error = js_args.error;
    calculateRootsWithUnits();
}

//Calculate Dimensional Values
function calculateRootsWithUnits(){
  output.T2 = []
  output.P2 = []
  output.po2 = []
  output.to2 = []
  output.ds = []
  output.V2 = []
  output.p2 = []
  output.P3 = []
  output.specificMassFlowRateOutlet = []
  output.f1 = 1 + ((data.gamma - 1)/2) * data.M1 ** 2 
  output.P1 = data.po1 * output.f1 ** (-data.gamma/(data.gamma-1))
  output.T1 = data.to1 * output.f1
  output.P2[0] = output.P1 * output.P2P1[0]
  output.P2[1] = output.P1 * output.P2P1[1]
  output.T2[0] = output.T1 * output.T2T1[0]
  output.T2[1] = output.T1 * output.T2T1[1]
  output.po2[0] = data.po1 * output.PR[0]
  output.po2[1] = data.po1 * output.PR[1]
  output.to2[0] = data.to1 * output.TR[0]
  output.to2[1] = data.to1 * output.TR[1]
  output.ds[0] = output.dsR[0] * data.R
  output.ds[1] = output.dsR[1] * data.R
  output.p1 = output.P1 / (data.R*output.T1)
  output.V1 = data.M1 * Math.sqrt(data.gamma*data.R*output.T1)
  output.V2[0] = output.V2V1[0] * output.V1
  output.V2[1] = output.V2V1[1] * output.V1
  output.p2[0] = output.p2p1[0] * output.p1
  output.p2[1] = output.p2p1[1] * output.p1
  output.P3[0] = output.P3Po1[0] * data.po1
  output.P3[1] = output.P3Po1[1] * data.po1
  output.massFlowRate = data.po1 / Math.sqrt(data.to1) * Math.sqrt(data.gamma / data.R) * data.A1 * data.M1 * (1 + (data.gamma-1)/2 * data.M1 ** 2) ** (-(data.gamma+1)/(2*(data.gamma-1)))
  output.specificFlowRate = output.massFlowRate / data.A1
  output.specificMassFlowRateInlet = Math.sqrt(data.gamma) * data.M1 * (1 + (data.gamma - 1) / 2 * data.M1 ** 2) ** (-(data.gamma+1)/(2*(data.gamma-1)))
  output.specificMassFlowRateOutlet[0] = Math.sqrt(data.gamma) * output.M2[0] * (1 + (data.gamma - 1) / 2 * output.M2[0] ** 2) ** (-(data.gamma+1)/(2*(data.gamma-1)))
  output.specificMassFlowRateOutlet[1] = Math.sqrt(data.gamma) * output.M2[1] * (1 + (data.gamma - 1) / 2 * output.M2[1] ** 2) ** (-(data.gamma+1)/(2*(data.gamma-1)))
}

function assignInputs() {
  data.po1 = parseFloat(document.getElementById("Po1").value) || 0;
  data.R = parseFloat(document.getElementById("R").value) || 0;
  data.to1 = parseFloat(document.getElementById("To1").value) || 0;
  data.cd = parseFloat(document.getElementById("cd").value) || 0;
  data.cf = parseFloat(document.getElementById("cf").value) || 0;
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
  convertToSI();
}

function assignOutputs(){
document.getElementById("M2").value = output.M2[0].toFixed(5);
document.getElementById("M2Second").value = output.M2[1].toFixed(5);
document.getElementById("P2P1").value = output.P2P1[0].toFixed(5);
document.getElementById("P2P1Second").value = output.P2P1[1].toFixed(5);
document.getElementById("T2T1").value = output.T2T1[0].toFixed(5);
document.getElementById("T2T1Second").value = output.T2T1[1].toFixed(5);
document.getElementById("PR").value = output.PR[0].toFixed(5);
document.getElementById("PRSecond").value = output.PR[1].toFixed(5);
document.getElementById("TR").value = output.TR[0].toFixed(5);
document.getElementById("TRSecond").value = output.TR[1].toFixed(5);
document.getElementById("deltaSR").value = output.dsR[0].toFixed(5);
document.getElementById("deltaSRSecond").value = output.dsR[1].toFixed(5);
document.getElementById("dsRKE").value = output.dsRKE[0].toFixed(5);
document.getElementById("dsRKESecond").value = output.dsRKE[1].toFixed(5);
document.getElementById("wloss").value = output.wloss[0].toFixed(5);
document.getElementById("wlossSecond").value = output.wloss[1].toFixed(5);
document.getElementById("cp").value = output.cp[0].toFixed(5);
document.getElementById("cpSecond").value = output.cp[1].toFixed(5);
document.getElementById("M2M1").value = output.M2M1[0].toFixed(5);
document.getElementById("M2M1Second").value = output.M2M1[1].toFixed(5);

document.getElementById("V2V1").value = output.V2V1[0].toFixed(5);
document.getElementById("V2V1Second").value = output.V2V1[1].toFixed(5);

document.getElementById("v2v1").value = output.v2v1[0].toFixed(5);
document.getElementById("v2v1Second").value = output.v2v1[1].toFixed(5);

document.getElementById("p2p1").value = output.p2p1[0].toFixed(5);
document.getElementById("p2p1Second").value = output.p2p1[1].toFixed(5);


document.getElementById("dsRKE2").value = output.dsRKE2[0].toFixed(5);
document.getElementById("dsRKE2Second").value = output.dsRKE2[1].toFixed(5);

document.getElementById("zloss").value = output.zloss[0].toFixed(5);
document.getElementById("zlossSecond").value = output.zloss[1].toFixed(5);

document.getElementById("CPinc").value = output.CPinc[0].toFixed(5);
document.getElementById("CPincSecond").value = output.CPinc[1].toFixed(5);

document.getElementById("P3P1").value = output.P3P1[0].toFixed(5);
document.getElementById("P3P1Second").value = output.P3P1[1].toFixed(5);

document.getElementById("P3P2").value = (output.P3P1[0] / output.P2P1[0]).toFixed(5);
document.getElementById("P3P2Second").value = (output.P3P1[1] / output.P2P1[1]).toFixed(5);

console.log(output.P3Po1)
document.getElementById("P3Po1").value = (output.P3Po1[0] /*/ f1*/).toFixed(5);
document.getElementById("P3Po1Second").value = (output.P3Po1[1]/* / f1*/).toFixed(5);

document.getElementById("P1").value = output.P1.toFixed(5);

document.getElementById("P2").value = output.P2[0].toFixed(5);
document.getElementById("P2Second").value = output.P2[1].toFixed(5);

document.getElementById("T1").value = output.T1.toFixed(5);
document.getElementById("V1").value = output.V1.toFixed(5);

document.getElementById("T2").value = output.T2[0].toFixed(5);
document.getElementById("T2Second").value = output.T2[1].toFixed(5);

document.getElementById("To2").value = output.to2[0].toFixed(5);
document.getElementById("To2Second").value = output.to2[1].toFixed(5);

document.getElementById("Po2").value = output.po2[0].toFixed(5);
document.getElementById("Po2Second").value = output.po2[1].toFixed(5);

document.getElementById("deltaS").value = output.ds[0].toFixed(5);
document.getElementById("deltaSSecond").value = output.ds[1].toFixed(5);

document.getElementById("p1").value = output.p1.toFixed(5);

document.getElementById("V2").value = output.V2[0].toFixed(5);
document.getElementById("V2Second").value = output.V2[1].toFixed(5);

document.getElementById("p2").value = output.p2[0].toFixed(5);
document.getElementById("p2Second").value = output.p2[1].toFixed(5);

document.getElementById("P3").value = output.P3[0].toFixed(5);
document.getElementById("P3Second").value = output.P3[1].toFixed(5);

document.getElementById("mfr").value = output.massFlowRate.toFixed(5);
document.getElementById("SFRInlet").value = output.specificMassFlowRateInlet.toFixed(5);
document.getElementById("SFROutlet").value = output.specificMassFlowRateOutlet[0].toFixed(5);
document.getElementById("SFROutletSecond").value = output.specificMassFlowRateOutlet[1].toFixed(5);

if (data.error) {
  document.getElementById("input-error").textContent = output.data.error;
}

// Don't include these if subelements > 1
if (data.N === 1) {
  document.getElementById("Lambda").value = output.Lambda.toFixed(5);
  document.getElementById("b").value = output.b.toFixed(5);
  document.getElementById("c").value = output.c.toFixed(5);
  document.getElementById("det").value = output.det.toFixed(5);
}
else{
  document.getElementById("Lambda").value = '';
    
  document.getElementById("b").value = '';
    
  document.getElementById("c").value = '';
  document.getElementById("det").value = '';
}
}

//Parent Function Controls the Flow of calculation
function calculateFlow(event) {
  try {
    event.preventDefault(); // Prevents Inputs from Clearing
    assignInputs();
    if(data.N > 1000){
      alert("Please limit your subelemenets to be less than 1000.")
      return;
    }
    try{
    interfaceUNI();
    }
    catch{
      alert("There was an error calculating with this input")
    }
    convertFromSI();
    assignOutputs();
  } catch (error) {
    console.log(error);
    document.getElementById("input-error").text = error
  }
  try{
   setTimeout(outputGraph, 0);
  }
  catch(error){
    console.log(error)
    document.getElementById("graph-error").text = error
    document.getElementById("graph-error").text = "There was an error graphing with this input"
  }
}

/* --------------------------------------------------------------------------------------------------------------------
-
-
-
-
-                                    Conversions for inputs and outputs
-
-
-
----------------------------------------------------------------------------------------------------------------------*/
function kpascalsToPascals(value) {
  return (value * 1000);
}

function psiToPascals(value) {
  return (value * 6894.7572931783);
}

function psfToPascals(value) {
  return (value * 47.880258);
}

// Temperature conversion functions
function celsiusToKelvin(value) {
  return (value + 273.15);
}

function rankineToKelvin(value) {
  return (value * 5/9);
}

function fahrenheitToKelvin(value) {
  return ((value + 459.67) * 5/9);
}

// Area conversion functions
function centimetersToMeters(value) {
  return (value * 0.0001);
}

function feetToMeters(value) {
  return (value * 0.092903);
}

function inchesToMeters(value) {
  return (value * 0.00064516);
}

// Conversion function
function convertToSI() {
  var P1 = parseFloat(document.getElementById("Po1").value) || 0;
  var pressureUnit = document.getElementById("pressure-unit").value;

  var T1 = parseFloat(document.getElementById("To1").value) || 0;
  var tempUnit = document.getElementById("input-temp-unit").value;

  var A1 = parseFloat(document.getElementById("A1").value) || 0;
  var inletAreaUnit = document.getElementById("inlet-area-unit").value;

  var A2 = parseFloat(document.getElementById("A2").value) || 0;
  var outletAreaUnit = document.getElementById("outlet-area-unit").value;
  
  var Af = parseFloat(document.getElementById("Af").value) || 0;
  var frictionAreaUnit = document.getElementById("friction-area-unit").value;
  
  var Ad = parseFloat(document.getElementById("Ad").value) || 0;
  var dragAreaUnit = document.getElementById("drag-area-unit").value;


  switch(pressureUnit) {
      case 'kpascals':
          data.po1 = kpascalsToPascals(P1);
          break;
      case 'psi':
        data.po1 = psiToPascals(P1);
          break;
      case 'psf':
        data.po1 = psfToPascals(P1);
          break;
  }

  switch(tempUnit) {
      case 'celsius':
          data.to1 = celsiusToKelvin(T1);
          break;
      case 'rankine':
          data.to1 = rankineToKelvin(T1);
          break;
      case 'fahrenheit':
          data.to1 = fahrenheitToKelvin(T1);
          break;
  }

  switch(inletAreaUnit) {
      case 'centimeters':
          data.A1 = centimetersToMeters(A1);
          break;
      case 'feet':
          data.A1 = feetToMeters(A1);
          break;
      case 'inches':
          data.A1 = inchesToMeters(A1);
          break;
  }

  switch(outletAreaUnit) {
    case 'centimeters':
        data.A2 = centimetersToMeters(A2);
        break;
    case 'feet':
        data.A2 = feetToMeters(A2);
        break;
    case 'inches':
        data.A2 = inchesToMeters(A2);
        break;
}

  switch(frictionAreaUnit) {
    case 'centimeters':
      data.Af = centimetersToMeters(Af);
        break;
    case 'feet':
      data.Af = feetToMeters(Af);
        break;
    case 'inches':
      data.Af = inchesToMeters(Af);
        break;
}

// Convert Ad to meters
switch(dragAreaUnit) {
    case 'centimeters':
      data.Ad = centimetersToMeters(Ad);
        break;
    case 'feet':
      data.Ad = feetToMeters(Ad);
        break;
    case 'inches':
      data.Ad = inchesToMeters(Ad);
        break;
}
}

// Velocity conversion functions
function pascalsToKpascals(value) {
  return value / 1000;
}

function pascalsToPsi(value) {
  return value / 6894.7572931783;
}

function pascalsToPsf(value) {
  return value / 47.880258;
}

// Temperature conversion functions
function kelvinToCelsius(value) {
  return value - 273.15;
}

function kelvinToRankine(value) {
  return value * 9/5;
}

function kelvinToFahrenheit(value) {
  return (value * 9/5) - 459.67;
}

// Area conversion functions
function metersToCentimeters(value) {
  return value * 10000;
}

function metersToFeet(value) {
  return value / 0.092903;
}

function metersToInches(value) {
  return value / 0.00064516;
}
function metersPerSecondToFeetPerSecond(value) {
  return value * 3.28084;
}

function metersPerMillisecondToFeetPerSecond(value) {
  return value * 3280.84;
}

// Density conversion functions
function kilogramsPerCubicMeterToGramsPerCubicMeter(value) {
  return value * 1000;
}

function kilogramsPerCubicMeterToGramsPerCubicCentimeter(value) {
  return value * 0.001;
}

function kilogramsPerCubicMeterToMilligramsPerCubicCentimeter(value) {
  return value;
}

function kilogramsPerCubicMeterToSlugsPerCubicFoot(value) {
  return value * 0.00194032;
}

function kilogramsPerCubicMeterToSlugsPerCubicInch(value) {
  return value * 0.000112832;
}

function joulesPerKelvinToCaloriesPerKelvin(joulesPerKelvin) {
  // 1 J/K = 0.2388458966275 cal/K
  return joulesPerKelvin * 0.2388458966275;
}

// Conversion function: J/K to BTU
function joulesPerKelvinToBTU(joulesPerKelvin) {
  // 1 J/K = 0.00094781712 BTU
  return joulesPerKelvin * 0.00094781712;
}
// Conversion function
function convertFromSI() {
  calculateRootsWithUnits();
  var pressureUnit = document.getElementById("static-pressure1-unit").value;
  var tempUnit = document.getElementById("static-temp1-unit").value;
  var velocity1Unit = document.getElementById("velocity1-unit").value;
  var velocity2Unit = document.getElementById("velocity2-unit").value;
  var density1Unit = document.getElementById("density1-unit").value;
  var density2Unit = document.getElementById("density2-unit").value;
  var pressureUnit2 = document.getElementById("static-pressure2-unit").value;
  var pressureUnit3 = document.getElementById("static-pressure3-unit").value;
  var tempUnit2 = document.getElementById("static-temp2-unit").value;
  var stagnationtempUnit = document.getElementById("stagnation-temp2-unit").value;
  var stagnationpressureUnit = document.getElementById("stagnation-pressure2-unit").value;
  var deltaSunit = document.getElementById("entropy-unit").value;
  
  switch (pressureUnit) {
    case 'kpascals':
      output.P1 = pascalsToKpascals(output.P1);
      break;
    case 'psi':
      output.P1 = pascalsToPsi(output.P1);
      break;
    case 'psf':
      output.P1 = pascalsToPsf(output.P1);
      break;
  }

  switch (tempUnit) {
    case 'celsius':
      output.T1 = kelvinToCelsius(output.T1);
      break;
    case 'rankine':
      output.T1 = kelvinToRankine(output.T1);
      break;
    case 'fahrenheit':
      output.T1 = kelvinToFahrenheit(output.T1);
      break;
  }

  switch (velocity1Unit) {
    case 'ft/s':
      output.V1 = metersPerSecondToFeetPerSecond(output.V1);
      break;
    case 'm/ms':
      output.V1 = metersPerMillisecondToFeetPerSecond(output.V1);
      break;
  }
  switch (velocity2Unit) {
    case 'ft/s':
      output.V2[0] = metersPerSecondToFeetPerSecond(output.V2[0]);
      output.V2[1] = metersPerSecondToFeetPerSecond(output.V2[1]);
      break;
    case 'm/ms':
      output.V2[0] = metersPerMillisecondToFeetPerSecond(output.V2[0]);
      output.V2[1] = metersPerMillisecondToFeetPerSecond(output.V2[1]);
      break;
  }
  
  switch (density1Unit) {
    case 'g/m^3':
      output.p1 = kilogramsPerCubicMeterToGramsPerCubicMeter(output.p1);
      break;
    case 'g/cm^3':
      output.p1 = kilogramsPerCubicMeterToGramsPerCubicCentimeter(output.p1);
      break;
    case 'mg/cm^3':
      output.p1 = kilogramsPerCubicMeterToMilligramsPerCubicCentimeter(output.p1);
      break;
    case 'slug/ft^3':
      output.p1 = kilogramsPerCubicMeterToSlugsPerCubicFoot(output.p1);
      break;
    case 'slug/in^3':
      output.p1 = kilogramsPerCubicMeterToSlugsPerCubicInch(output.p1);
      break;
  }
  
  switch (density2Unit) {
    case 'g/m^3':
      output.p2[0] = kilogramsPerCubicMeterToGramsPerCubicMeter(output.p2[0]);
      output.p2[1] = kilogramsPerCubicMeterToGramsPerCubicMeter(output.p2[1]);
      break;
    case 'g/cm^3':
      output.p2[0] = kilogramsPerCubicMeterToGramsPerCubicCentimeter(output.p2[0]);
      output.p2[1] = kilogramsPerCubicMeterToGramsPerCubicCentimeter(output.p2[1]);
      break;
    case 'mg/cm^3':
      output.p2[0] = kilogramsPerCubicMeterToMilligramsPerCubicCentimeter(output.p2[0]);
      output.p2[1] = kilogramsPerCubicMeterToMilligramsPerCubicCentimeter(output.p2[1]);
      break;
    case 'slug/ft^3':
      output.p2[0] = kilogramsPerCubicMeterToSlugsPerCubicFoot(output.p2[0]);
      output.p2[1] = kilogramsPerCubicMeterToSlugsPerCubicFoot(output.p2[1]);
      break;
    case 'slug/in^3':
      output.p2[0] = kilogramsPerCubicMeterToSlugsPerCubicInch(output.p2[0]);
      output.p2[1] = kilogramsPerCubicMeterToSlugsPerCubicInch(output.p2[1]);
      break;
  }
  
  switch (pressureUnit2) {
    case 'kpascals':
      output.P2[0] = pascalsToKpascals(output.P2[0]);
      output.P2[1] = pascalsToKpascals(output.P2[1]);
      break;
    case 'psi':
      output.P2[0] = pascalsToPsi(output.P2[0]);
      output.P2[1] = pascalsToPsi(output.P2[1]);
      break;
    case 'psf':
      output.P2[0] = pascalsToPsf(output.P2[0]);
      output.P2[1] = pascalsToPsf(output.P2[1]);
      break;
  }
  
  switch (pressureUnit3) {
    case 'kpascals':
      output.P3[0] = pascalsToKpascals(output.P3[0]);
      output.P3[1] = pascalsToKpascals(output.P3[1]);
      break;
    case 'psi':
      output.P3[0] = pascalsToPsi(output.P3[0]);
      output.P3[1] = pascalsToPsi(output.P3[1]);
      break;
    case 'psf':
      output.P3Second = pascalsToPsf(output.P3Second);
      break;
  }
  
  switch (tempUnit2) {
    case 'celsius':
      output.T2[0] = kelvinToCelsius(output.T2[0]);
      output.T2[1] = kelvinToCelsius(output.T2[1]);
      break;
    case 'rankine':
      output.T2[0] = kelvinToRankine(output.T2[0]);
      output.T2[1] = kelvinToRankine(output.T2[1]);
      break;
    case 'fahrenheit':
      output.T2[0] = kelvinToFahrenheit(output.T2[0]);
      output.T2[1] = kelvinToFahrenheit(output.T2[1]);
      break;
  }
  
  switch (stagnationtempUnit) {
    case 'celsius':
      output.to2[0] = kelvinToCelsius(output.to2[0]);
      output.to2[1] = kelvinToCelsius(output.to2[1]);
      break;
    case 'rankine':
      output.to2[0] = kelvinToRankine(output.to2[0]);
      output.to2[1] = kelvinToRankine(output.to2[1]);
      break;
    case 'fahrenheit':
      output.to2[0] = kelvinToFahrenheit(output.to2[0]);
      output.To2[1] = kelvinToFahrenheit(output.To2[1]);
      break;
  }
  
  switch (stagnationpressureUnit) {
    case 'kpascals':
      output.po2[0] = pascalsToKpascals(output.po2[0]);
      output.po2[1] = pascalsToKpascals(output.po2[1]);
      break;
    case 'psi':
      output.po2[0] = pascalsToPsi(output.po2[0]);
      output.po2[1] = pascalsToPsi(output.po2[1]);
      break;
    case 'psf':
      output.po2[0] = pascalsToPsf(output.po2[0]);
      output.po2[1] = pascalsToPsf(output.po2[1]);
      break;
  }
  
  switch (deltaSunit) {
    case 'J/K':
      // No conversion needed for J/K
      break;
    case 'cal/K':
      output.ds[0] = joulesPerKelvinToCaloriesPerKelvin(output.ds[0]);
      output.ds[1] = joulesPerKelvinToCaloriesPerKelvin(output.ds[1]);
      break;
    case 'BTU/R':
      output.ds[0] = joulesPerKelvinToBTU(output.ds[0]);
      output.ds[1] = joulesPerKelvinToBTU(output.ds[1]);
      break;
  }
  // Return the converted values
}

function userChangedOutputUnit(){
  convertFromSI();
  assignOutputs();
}



/* ------------------------------------------------------------------------------------------------------------------------
  
  
  
                                   User Interface Code
  
  
    
-------------------------------------------------------------------------------------------------------------------------*/


//-----------------------------------------Check Boxes--------------------------------------------
function toggleData(){
  var x = document.getElementById("additional-data");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}
function toggleDimension(){
  var x = document.getElementById("dimensional");
  if (x.style.display === "none") {
    x.style.display = "block";
    document.getElementById("dimensional-additional").style.display = "block";
  } else {
    x.style.display = "none";
    document.getElementById("dimensional-additional").style.display = "none";
  }
  x = document.getElementById("non-dimensional");
  if (x.style.display === "none") {
    x.style.display = "block";
    document.getElementById("non-dimensional-additional").style.display = "block";
  } else {
    x.style.display = "none";
    document.getElementById("non-dimensional-additional").style.display = "none";
  }
}
function toggleAbstract(){
  var x = document.getElementById("abstract");
  var y = document.getElementById("up-arrow");
  var z = document.getElementById("down-arrow");
  if (x.style.display === "none") {
    x.style.display = "flex";
    y.style.display = "block";
    z.style.display = "none";
  } else {
    x.style.display = "none";
    y.style.display = "none";
    z.style.display = "block";
  }
}
//--------------------------------------Inlet->Outlet Graphic This is not used anymore----------------------------------
var myChart;
function imageGUI() {
    var ctx = document.getElementById('gui').getContext('2d');
    assignInputs();
    var A1 = data.A1 || 1;
    var A2 = data.A2 || 2;
    
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
              backgroundColor: A1<A2?'#fff':'gray',
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
  
//---------------------------------------Example Flow fill in Values------------------------------
function exampleFlow(){
    var selectElement = document.querySelector('.selectFlow');
    var selectedOption = selectElement.value;
  
    // Perform actions based on the selected option
    flow_img = document.getElementById("flow-image")
    document.getElementById("Po1").value = 101325;
    document.getElementById("To1").value = 288.15;
    document.getElementById("R").value = 287;
    document.getElementById("cd").value = 0;
    document.getElementById("cd").value = 0;
    document.getElementById("cf").value = 0;
    document.getElementById("Ad").value = 1;
    document.getElementById("Af").value = 1;
    document.getElementById("qr").value = 0;
    document.getElementById("M1").value = 1;
    document.getElementById("A1").value = 1;
    document.getElementById("gamma").value = 1.4;
    document.getElementById("alpha1").value = 1;
    document.getElementById("beta1").value = 1;
    document.getElementById("A2").value = 2;
    document.getElementById("xi").value = 0.5;
    document.getElementById("nu").value = 0;
    document.getElementById("alpha2").value = 1;
    document.getElementById("beta2").value = 1;
    document.getElementById("subelements").value = 1;
    document.getElementById("isentropic").value = "False";
     
    if (selectedOption === 'Default') {
      // Call a function for Isentropic flow with area change
      flow_img.src = "./images/default.jpg"
    }
    if (selectedOption === 'Isentropic flow with area change') {
      // Call a function for Isentropic flow with area change

        document.getElementById("isentropic").value = "True";
        flow_img.src = "./images/default.jpg"
    } 
    
    else if (selectedOption === 'Flow across a normal shock') {
      // Call a function for Flow across a normal shock
      document.getElementById("M1").value = 2;
      document.getElementById("A1").value = 1;
      document.getElementById("A2").value = 1;
      //document.getElementById("A2").setAttribute('readonly', true);
      //document.getElementById("A2").style = "background-color: gray;";
      flow_img.src = "./images/normal-shock.jpg"

    } 
    
    else if (selectedOption === 'Fanno flow') {
      // Call a function for Fanno flow
      document.getElementById("M1").value = 0.5;
      document.getElementById("A1").value = 1;
      document.getElementById("A2").value = 1;
      document.getElementById("Af").value = 100;
      document.getElementById("cf").value = 0.005;
      document.getElementById("subelements").value = 10;
      flow_img.src = "./images/fanno-flow.jpg"
    } 
    
    else if (selectedOption === 'Rayleigh flow') {
      document.getElementById("M1").value = 0.5;
      document.getElementById("A1").value = 1;
      document.getElementById("A2").value = 1;
      document.getElementById("qr").value = 0.4;
      document.getElementById("subelements").value = 10;
      flow_img.src = "./images/rayleigh-flow.jpg"
    } 
    
    else if (selectedOption === 'Sudden expansion') {
      // Call a function for Sudden expansion
      document.getElementById("xi").value = 0;
      flow_img.src = "./images/sudden-expansion.jpg"
    } 
    
    else if (selectedOption === 'Sudden Contraction') {
      // Call a function for Sudden Contraction
      document.getElementById("M1").value = 0.5;
      document.getElementById("A1").value = 1;
      document.getElementById("A2").value = 0.9;
      document.getElementById("xi").value = 0;
      document.getElementById("nu").value = 1;
      flow_img.src = "./images/sudden-contraction.jpg"
    } 
    
    else if (selectedOption === 'Two-stream mixing layer') {
      // Call a function for Two-stream mixing layer
      document.getElementById("M1").value = 2.064;
      document.getElementById("alpha1").value = 0.909;
      document.getElementById("beta1").value = 0.889;
      document.getElementById("A2").value = 1;
      document.getElementById("Af").value = 40;
      document.getElementById("cf").value = 0.005;
      document.getElementById("subelements").value = 1;
      flow_img.src = "./images/non-uniform-inlet-area-mixing.jpg"
    } 
    
    else if (selectedOption === 'Ferrari 1 (Simultaneous friction and heat transfer)') {
      // Call a function for Simultaneous friction and heat transfer
      document.getElementById("M1").value = 0.4;
      document.getElementById("alpha1").value = 0.909;
      document.getElementById("beta1").value = 0.889;
      document.getElementById("A2").value = 1;
      document.getElementById("qr").value = 0.288;
      document.getElementById("Af").value = 160;
      document.getElementById("cf").value = 0.005;
      document.getElementById("subelements").value = 10;
      flow_img.src = "./images/simultaneous-friction-heat.jpg"
    } 
    
    else if (selectedOption === 'Ferrari 2 (Simultaneous area change and friction)') {
      document.getElementById("A1").value = 1;
      document.getElementById("A2").value = 2;
      document.getElementById("Af").value = 100;
      document.getElementById("cf").value = 0.005;
      document.getElementById("subelements").value = 10;
      flow_img.src = "./images/simultaneous-area-friction.jpg"
    }
    imageGUI();
}

//--------------------------------------Graph for a input vs output------------------------------
var myChart2;
var myChart3;
function emptyGraph(){
  var ctx = document.getElementById('outputChart').getContext('2d');
  var ctx2 = document.getElementById('outputChart2').getContext('2d');
// Get the values of M1 and M2


  if (typeof myChart2 !== 'undefined') {
    myChart2.destroy();
  }
  if (typeof myChart3 !== 'undefined') {
    myChart3.destroy();
  }
  var root1 = [];
  var root2 = [];
  var delta = 0.05;
  for(var X = delta; data[X] < 3; data[X]+=delta){
      var dataPoint1 = {
          x: X,
          y: 10 * X
      };
      var dataPoint2 = {
        x: X,
        y: 10 * X
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
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      borderWidth: 1,
      pointRadius: 0.5,
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
          text: ''
        }
      },
      y: {
        type: 'linear',
        position: 'left',
        title: {
          display: true,
          text: ''
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
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      borderWidth: 1,
      pointRadius: 0.5,
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
          text: ''
        }
      },
      y: {
        type: 'linear',
        position: 'left',
        title: {
          display: true,
          text: ''
        }
      }
    },
    plugins: {
    }
  }
});
}

//--------------Allows user to cancel Graphing------------------
let shouldCancel = false;
function delay(duration) {
  return new Promise(resolve => setTimeout(resolve, duration));
}
function cancel(){
  shouldCancel = true;
}

//-----------------------graphs outputs-----------------------------------------------
async function outputGraph(){
    var ctx = document.getElementById('outputChart').getContext('2d');
    var ctx2 = document.getElementById('outputChart2').getContext('2d');
    var wasCancelled = false;

    //Get inputs
    assignInputs();


    var X = document.getElementById("chart-x").value;
    var Y = document.getElementById("chart-y").value;

    // If there is already a chart destroy it
    if (typeof myChart2 !== 'undefined') {
      myChart2.destroy();
    }
    if (typeof myChart3 !== 'undefined') {
      myChart3.destroy();
    }
    var root1 = [];
    var root2 = [];
    var delta = 0.01;
    //Set the Input so it gets progressivley larger
    for(data[X] = delta; data[X] < 3; data[X]+=delta){
        if(shouldCancel) {
          shouldCancel = false;
          break;
        }
        //Calculate Flow
        try{
          interfaceUNI();
          convertFromSI();
          if(js_args.error){
            document.getElementById("graph-error").text = js_args.error
          }
          if(output[Y] instanceof Float64Array || Array.isArray(output[Y])){
            var dataPoint1 = {
                x: data[X],
                y: output[Y][0].toFixed(5)
            };
            var dataPoint2 = {
              x: data[X],
              y: output[Y][1].toFixed(5)
          };
        }
        else{
          console.log(output[Y])
          var dataPoint1 = {
            x: data[X],
            y: output[Y].toFixed(5)
        };
        }
        }
        catch{
          var dataPoint1 = {
              x: data[X],
              y: NaN
          };
          var dataPoint2 = {
            x: data[X],
            y: NaN
          };
        }
      root1.push(dataPoint1);
      root2.push(dataPoint2);
      if(data.N >= 10){
        // Keep the webpage from crashing updated prgroess meter
        updateProgress(data[X],delta)
        await delay(1);
      }
    }
    //RESET output values to the original values
    assignInputs();
    interfaceUNI();
    convertFromSI();
  // Create the chart
  myChart2 = new Chart(ctx, {
    type: 'line',
    data: {
      datasets: [{
        label: 'Solution 1',
        data: root1,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        pointRadius: 0.5,
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
        label: 'Solution 2',
        data: root2,
        backgroundColor: 'red',
        borderColor: 'red',
        borderWidth: 1,
        pointRadius: 0.5,
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
}


function updateProgress(point,delta){
  var progress = Math.ceil(point/0.01)
  number_points= 3/delta
  document.getElementById('progress').textContent = `${progress} / ${number_points}`;
}