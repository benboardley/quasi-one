#!/bin/bash

read -p "Enter label: " label
read -p "Enter title: " title
read -p "Enter input id: " inputId

# Generate HTML code for new input with a new line
newInput='
<!-- New Input -->
<div class="label-output-row" title="'$title'">
    <label for="'$inputId'">'$label'</label>
    <input type="text" id="'$inputId'">
    <select>
        <option>-</option>
    </select>
</div>
'

# Append new input to inputFields div in index.html
sed -i '/<div class="inputFields">/a\'$'\n'"$newInput" index.html
sed -i '/function assignValues() {/a\
    data.'$inputId' = parseFloat(document.getElementById("'$inputId'").value) || 0;' your_javascript_file.js

echo "Input added successfully!"

echo "Input added successfully!"

read -p "Enter output label: " outputLabel
read -p "Enter output value: " outputValue

# Generate HTML code for new output with a new line
newOutput='
<!-- New Output -->
<div class="label-output-row" title="'$outputLabel'">
    <label for="'$outputLabel'">'$outputLabel'</label>
    <input type="text" id="'$outputLabel'" value="'$outputValue'" readonly>
    <input type="text" id="'$outputLabel'Second" value="'$outputValue'" readonly>
    <select><option>-</option></select>
</div>
'

# Append new output to additional-data div in index.html
sed -i '/<div id="additional-data">/a\'$'\n'"$newOutput" index.html

echo "Output added successfully!"