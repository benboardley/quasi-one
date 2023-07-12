# Project Name

## Table of Contents
- [Introduction](#introduction)
- [Flow Calculation](#flow-calculation)
  - [User Input](#user-input)
  - [Unit Conversion](#unit-conversion)
  - [Interface and Calculation](#interface-and-calculation)
  - [Output Graph](#output-graph)
- [Example Flows](#example-flows)
- [How to Add an Input](#how-to-add-an-input)
- [How to Add an Output](#how-to-add-an-output)
- [Changing Python Code](#changing-python-code)

## Introduction
Web Calculator for Andrew A Oliva and Scott C Morris's Quasi Steady, quasi-one-dimensional, internal compressible flow with area change, heat addition and friction

## Flow Calculation

![Flow Diagram](flow-charts\calculate-flow.jpg)
```
calculateFlow
|
| assignInputs
  |
  |convertToSI
|
|interfaceUNI
  |
  |calculateRootsWithUnits 
  |convertFromSI
  |
  | assign Outputs

outputGraph Do this for 300 data points
|
| assignInputs
  |
  |convertToSI
|
|interfaceUNI
  |
  | convertFromSI
  |
  | assign Outputs
```

### Unit Conversion
** action user changes output unit **
```
userChangedOutputUnit 
|
|convertFromSI
|
|assignOutputs
```
** user changes input unit **
```
calcualteFlow
|
|assignInputs
|
|convertToSI
```
### User Input
The javacript command `data.po1 = parseFloat(document.getElementById("Po1").value)` can grab the value stored in this element. (You would want the html input to have this id e.g. `<input type="text" id="Po1">`).


#### python to javascript
The Interface with the python code occurs in InterfaceUNI.
JavaScript Integrates with python through:
   ```
    uniflow = pyscript.interpreter.globals.get('main');
    uniflow();
    js_args = pyscript.interpreter.globals.get('args');
  ```
pyscript.interpreter.globals.get can grab any global variable, global function, or global class in python and import it to javascript.
To get the variables  `output.M2 = js_args.M2.toJs();` -- TOJS() converts python arrays into javascript ones. If it is not an array you can just use somethign like this: output.Lambda = js_args.Lambda;
Notice how I grab the objects with the .VariableName. This is because it matches the varaible names in the args python class. For example here are some, but not all of the names. The args class is equivalent to the args class in your original python code.
```
class Args:
        def __init__(self, AR=1.0, Ad=0.0, cd=0.0, cf=0.0, Af=0.0, M1=0.0, xi=0.5, nu=0.0,
                    qr=0.0, k=1.4, twr=1.0, isentropic=False, b1=1.0, b2=1.0, a1=1.0, a2=1.0, N=1, debug=False):
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
            self.debug = True
            self.N = N
            self.error = None
```

#### javascript to python
Java Script to python is a little simpler. In this the data object from javascript is imported. Again this has to be a global variable. The data object is the inputs from the web calculator.
```
    def main():
      global args
      from js import data
```

#### Pyscript
Pyscript is used to bring python to the front end of the application. That way we do not have to have a backend server. This is used in two componenets.
1. 
 ```
   <py-config>
    packages = ["numpy", "scipy", "tqdm"] 
  </py-config>
  ```
  py-config labels the packages that will be imported that are not apart of the default python library (e.g. sys )
2. 
  ```
  <py-script>
    **insert python code**
  </py-script>
  ```
  This is the python code that will be ran when it is interfaced with the javascript.

Note:
  Pyscript is still under development so there may be small changes that have to be made to the tags or structure as it progresses. These should be small. One example of a recent change was this html code:
  ```
    <py-config>
      packages = ["numpy", "scipy", "tqdm"] 
    </py-config>
  ```
  used to be this:
  ```
    <py-env>
      - numpy
      - scipy
      - tqdm
    </py-env>
  ```

### Output Graph

This grabs where the charts will be located: 
  ```
  var ctx = document.getElementById('outputChart').getContext('2d');
  var ctx2 = document.getElementById('outputChart2').getContext('2d');
  ```
based upon the selected values also make sure to note that the selection values. `vale="M2"` is the same as the variable name in output or data `output.M2`.
```
<h4>Output Charts</h4>
<select class="selection-component" id="chart-y" onchange="outputGraph()">
<option value="M2">M&#8322; <!-- M subscript 2 --></option>
<option value="P2P1">P&#8322;/P&#8321; <!-- P subscript 2 divided by P subscript 1 --></option>
<option value="T2T1">T&#8322;/T&#8321; <!-- T subscript 2 divided by T subscript 1 --></option>
<option value="TR">To&#8322;/To&#8321; <!-- To subscript 2 divided by To subscript 1 --></option>
<option value="PR">Po&#8322;/Po&#8321; <!-- Po subscript 2 divided by Po subscript 1 --></option>
<option value="dsR">&Delta;s/R</option>
<option value="M2M1">M&#8322;/M&#8321; <!-- M subscript 2 divided by M subscript 1 --></option>
<option value="dsRKE">(ds/R)/(k/2*M&#8321;&sup2;) <!-- (delta s divided by R) divided by (k divided by 2 times M subscript 1 squared) --></option>
<option value="wloss">(Po&#8321;-Po&#8322;)/(Po&#8321;-P&#8321;) <!-- (Po subscript 1 minus Po subscript 2) divided by (Po subscript 1 minus P subscript 1) --></option>
<option value="cp">(P&#8322;-P&#8321;)/(Po&#8321;-P&#8321;) <!-- (P subscript 2 minus P subscript 1) divided by (Po subscript 1 minus P subscript 1) --></option>
<option value="T2">T&#8322; <!-- T subscript 2 --></option>
<option value="P2">P&#8322; <!-- P subscript 2 --></option>
<option value="to2">To&#8322; <!-- T subscript 2 o subscript 2 --></option>
<option value="po2">Po&#8322; <!-- P subscript 2 o subscript 2 --></option>
<option value="ds">&Delta;s</option>
</select>

<h4 style="margin-top: 0px;">vs</h4>

<select class="selection-component" id="chart-x" onchange="outputGraph()">
<option value="M1">M&#8321; <!-- M subscript 1 --></option>
<option value="A1">A&#8321; <!-- A subscript 1 --></option>
<option value="gamma">&#947; <!-- Gamma --></option>
<option value="cd">c&#8322;d <!-- c subscript d --></option>
<option value="cf">c&#8322;f <!-- c subscript f --></option>
<option value="twr">TWR</option>
<option value="alpha1">&#945;&#8321; <!-- Alpha subscript 1 --></option>
<option value="beta1">&#946;&#8321; <!-- Beta subscript 1 --></option>
<option value="qr">q&#8322;r <!-- q subscript r --></option>
<option value="Af">A&#8322;f <!-- A subscript f --></option>
<option value="Ad">A&#8322;d <!-- A subscript d --></option>
<option value="A2">A&#8322; <!-- A subscript 2 --></option>
<option value="xi">&xi; <!-- Xi --></option>
<option value="nu">&nu; <!-- Nu --></option>
<option value="alpha2">&alpha;&#8322; <!-- Alpha subscript 2 --></option>
<option value="beta2">&beta;&#8322; <!-- Beta subscript 2 --></option>
</select>
```
The selected value is then incremented and y value updated accordingly:
```
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
        interfaceUNI();
        convertFromSI();
        if(js_args.error){
          document.getElementById("graph-error").text = js_args.error
        }

        var dataPoint1 = {
            x: data[X],
            y: output[Y][0]
        };
        var dataPoint2 = {
          x: data[X],
          y: output[Y][1]
      };
      root1.push(dataPoint1);
      root2.push(dataPoint2);
      if(data.N >= 10){
        // Keep the webpage from crashing updated prgroess meter
        updateProgress(data[X],delta)
        await delay(1);
      }
    }
```
## Example Flows
Provide Details about the Output Graph

## How to Add an Input
1. add to HTML section in either inlet, parameters or outlet:

  ```
                    <!-- Input -->
                    <div class="label-output-row" title="Inlet Stagnation Temperature">
                        <label for="To1">T<sub>o<sub>1</sub></sub>=</label>
                        <input type="text" id="To1">
                        <select id="input-temp-unit">
                            <option value="kelvin">K&deg;</option>
                            <option value="celsius">C&deg;</option>
                            <option value="rankine">R&deg;</option>
                            <option value="farenheit">F&deg;</option>
                        </select>
                    </div>
  ```
2. add to assignInputs:
'''
  data.to1 = parseFloat(document.getElementById("To1").value) || 0;
'''
3. add to python code:
    implement it into args so that it can be pulled from your uniflow code.
    ```
        class Args:
        def __init__(self, AR=1.0, Ad=0.0, cd=0.0, cf=0.0, Af=0.0, M1=0.0, xi=0.5, nu=0.0,
                    qr=0.0, k=1.4, twr=1.0, isentropic=False, b1=1.0, b2=1.0, a1=1.0, a2=1.0, N=1, debug=False):
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
            self.debug = True
            self.N = N
            self.error = None

        args = Args(AR=data.A2/data.A1, Ad = data.Ad/data.A1, Af = data.Af/data.A1, qr = data.qr, cd = data.cd, cf = data.cf, M1=data.M1, xi = data.xi, nu = data.nu, k = data.gamma, b1 = data.beta1, b2 = data.beta2, a1 = data.alpha1, a2 = data.alpha2 , N = data.N, isentropic=(data.isent == 'True'))
    ```

## How to Add an Output
1. Add to output section in HTML into either traditional-output or additional-output and then non-dimensional or dimensional:
```
                    <!-- Output for P2P1 -->
                    <div class="label-output-row" title="Pressure ratio">
                        <label for="P2P1">P<sub>2</sub>/P<sub>1</sub>=</label>
                        <input type="text" id="P2P1">
                        <input type="text" id="P2P1Second">
                        <select><option>-</option></select>
                    </div>
```
2. add to interfaceUNI or calculateRootsWithUnits:

    interfaceUNI if array:
    ```
        output.P2P1 = js_args.P2P1.toJs();
    ```
    if not array:
       ```
        output.P2P1 = js_args.P2P1;
        ```
    if units add to calculateRootsWithUnits:
    ```
    output.P2 = []
    output.P2[0] = output.P1 * output.P2P1[0]
    output.P2[1] = output.P1 * output.P2P1[1]
    ```

3. Add to assignOutputs:
    ```
    document.getElementById("P2P1").value = output.P2P1[0].toFixed(5);
    document.getElementById("P2P1Second").value = output.P2P1[1].toFixed(5);
    ```
4. If you want it to be graphed add it into this selection 

make sure value = "" is the same as either the variable name in data or output example `data.M2 and <option value="M2">M<sub>2</sub></option>`:

```
<select class="selection-component" id="chart-y" onchange="outputGraph()">
                <option value="M2">M<sub>2</sub></option>
                <option value="P2P1">P<sub>2</sub>/P<sub>1</sub></option>
                <option value="T2T1">T<sub>2</sub>/T<sub>1</sub></option>
                <option value="TR">To<sub>2</sub>/To<sub>1</sub></option>
                <option value="PR">Po<sub>2</sub>/Po<sub>1</sub></option>
                <option value="dsR">&Delta;s/R</option>
                <option value="M2M1">M<sub>2</sub>/M<sub>1</sub></option>
                <option value="dsRKE">(ds/R)/(k/2*M<sub>12</sub>)</option>
                <option value="wloss">(Po<sub>1</sub>-Po<sub>2</sub>)/(Po<sub>1</sub>-P<sub>1</sub>)</option>
                <option value="cp">(P<sub>2</sub>-P<sub>1</sub>)/(Po<sub>1</sub>-P<sub>1</sub>)</option>
                <option value="T2">T<sub>2</sub></option>
                <option value="P2">P<sub>2</sub></option>
                <option value="to2">T<sub>o<sub>2</sub></sub></option>
                <option value="po2">P<sub>o<sub>2</sub></sub></option>
                <option value="ds">&Delta;s</option>
            </select>
            <h4 style="margin-top: 0px;">vs</h4>
            <select class="selection-component" id="chart-x" onchange="outputGraph()">
                <option value="M1">M<sub>1</sub></option>
                <option value="A1">A<sub>1</sub></option>
                <option value="gamma">&gamma;</option>
                <option value="cd">C<sub>d</sub></option>
                <option value="cf">C<sub>f</sub></option>
                <option value="twr">TWR</option>
                <option value="alpha1">&alpha;<sub>1</sub></option>
                <option value="beta1">&beta;<sub>1</sub></option>
                <option value="qr">Q<sub>r</sub></option>
                <option value="Af">A<sub>f</sub></option>
                <option value="Ad">A<sub>d</sub></option>
                <option value="A2">A<sub>2</sub></option>
                <option value="xi">&xi;</option>
                <option value="nu">&nu;</option>
                <option value="alpha2">&alpha;<sub>2</sub></option>
                <option value="beta2">&beta;<sub>2</sub></option>
            </select>
```
## Changing Python Code
Can copy and past everything from python into the pyscript tags (tqdm does not work). However, I would not copy and paste the main.py or the Args class
these I would recommend changing manually because the args class and main function are the only things that differ from uniflow.py. 
e.g. differences between mains:
```
pyscript:
    def main():
      global args
      from js import data
      ver = str('v2.2')
      date = str('06/21/23')
      
      args = Args(AR=data.A2/data.A1, Ad = data.Ad/data.A1, Af = data.Af/data.A1, qr = data.qr, cd = data.cd, cf = data.cf, M1=data.M1, xi = data.xi, nu = data.nu, k = data.gamma, b1 = data.beta1, b2 = data.beta2, a1 = data.alpha1, a2 = data.alpha2 , N = data.N, isentropic=(data.isent == 'True'))
      try:
        if( args.isentropic ):
            args = isentropic(args)
            args = coefsBiquadratic(args)

        else:
            if( args.N  == 1 ):
                args = coefsBiquadratic(args)
                args = solveBiquadratic(args)
            else:
                args = subelements(args)

        args = postProcess(args)
      except Exception as e:
        args.error = e
      return()
```
```
uniflow:
def main():
    ver = str('v2.2')
    date = str('06/21/23')
    intro('UNIfied steady quasi-1d compressible FLOW',ver,date)

    args = getArgs()
    regurgitate(args)

    if( args.isentropic ):
        args = isentropic(args)
        args = coefsBiquadratic(args)

    else:
        args = subelements(args)

    args = postProcess(args)

    printOutput(args)

    return()
```
## Also NOTE tqdm does not work in pyscript!
