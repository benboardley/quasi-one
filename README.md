# Project Name

## Table of Contents
- [Introduction](#introduction)
- [Flow Calculation](#flow-calculation)
  - [User Input](#user-input)
  - [Unit Conversion](#unit-conversion)
  - [Interface and Calculation](#interface-and-calculation)
  - [Output Conversion](#output-conversion)
  - [Output Graph](#output-graph)
- [Changing Units](#changing-units)
- [Inlet to Outlet GUI](#inlet-to-outlet-gui)
- [How to Add an Input](#how-to-add-an-input)
- [How to Add an Output](#how-to-add-an-output)
- [Changing Python Code](#changing-python-code)

## Introduction
Web Calculator for Andrew Oliva and Scott C Morris's Quasi Steady, quasi-one-dimensional, internal compressible flow with area change, heat addition and friction

## Flow Calculation
calculateFlow -> assignInputs -> convertToSI -> interfaceUNI -> calculateRootsWithUnits -> convertFromSI -> assignOutputs
-> (outputGraph -> interfaceUNI -> calculateRootsWithUnits -> convertFromSI ... over 300 data points)

**Output Graph is relativley complicated due to making sure the site doesn't crash during excessive computation e.g. 300 data points and 1000 subelements**

### User Input

### Unit Conversion
userChangedOutputUnit -> convertFromSI -> assignOutputs

### Interface and Calculation
Describe the interface and calculation process for determining the flow.

### Output Conversion
Explain how the output values are converted to the desired units.

### Output Graph
Provide details about the output graph and the considerations taken to prevent performance issues.

## Changing Units
Explain the process for changing units and updating the output accordingly.

## Inlet to Outlet GUI
Describe the GUI for the inlet to outlet section and how it functions.

## How to Add an Input
1. add to HTML section in either inlet, parameters or outlet:


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

2. add to assignInputs:
  data.to1 = parseFloat(document.getElementById("To1").value) || 0;

3. add to python code:
    Args

## How to Add an Output
1. Add to output section in HTML into either traditional-output or additional-output and then non-dimensional or dimensional:
                    <!-- Output for P2P1 -->
                    <div class="label-output-row" title="Pressure ratio">
                        <label for="P2P1">P<sub>2</sub>/P<sub>1</sub>=</label>
                        <input type="text" id="P2P1">
                        <input type="text" id="P2P1Second">
                        <select><option>-</option></select>
                    </div>

2. dd to interfaceUNI or calculateRootsWithUnits:

    interfaceUNI if array:
        output.P2P1 = js_args.P2P1.toJs();
    if not array:
        output.P2P1 = js_args.P2P1;

    if units add to calculateRootsWithUnits:
    output.P2 = []
    output.P2[0] = output.P1 * output.P2P1[0]
    output.P2[1] = output.P1 * output.P2P1[1]


3. Add to assignOutputs:
    document.getElementById("P2P1").value = output.P2P1[0].toFixed(5);
    document.getElementById("P2P1Second").value = output.P2P1[1].toFixed(5);

4. If you want it to be graphed add it into this selection 
make sure value = "" is the same as either the variable name in data or output example data.M2 and <option value="M2">M<sub>2</sub></option>:

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

## Changing Python Code
Can copy and past everything from python into the pyscript tags. Do Not Change Mainpy or Args class
Unless adding a Function Call or adding a value to args. also NOTE tqdm does not work!
