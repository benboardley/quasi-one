function calculate(event){
    event.preventDefault();
    try {console.log("Here")
    var P = parseFloat(document.getElementById("P").value);
    var T = parseFloat(document.getElementById("T").value);
    var M1 = parseFloat(document.getElementById("M1").value);
    var A1 = parseFloat(document.getElementById("A1").value);
    var gamma = parseFloat(document.getElementById("gamma").value);
    var alpha1 = parseFloat(document.getElementById("alpha1").value);
    var beta1 = parseFloat(document.getElementById("beta1").value);
    var w = parseFloat(document.getElementById("w").value);
    var Fx = parseFloat(document.getElementById("Fx").value);
    var m2 = parseFloat(document.getElementById("m2").value);
    var A2 = parseFloat(document.getElementById("A2").value);
    var Q = parseFloat(document.getElementById("Q").value);
    var psi = parseFloat(document.getElementById("psi").value);
    var nu = parseFloat(document.getElementById("nu").value);
    var f = parseFloat(document.getElementById("f").value);
    var alpha2 = parseFloat(document.getElementById("alpha2").value);
    var beta2 = parseFloat(document.getElementById("beta2").value);
    var N = parseFloat(document.getElementById("subelements").value);

    var sum = P + T + M1 + A1 + gamma + alpha1 + beta1 + w + Fx + m2 + A2 + Q + psi + nu + f + alpha2 + beta2 + N;
    console.log(sum)
    var M2 = sum;
    var PT2 = sum;
    var TT2 = sum;
    var P2 = sum;
    var T2 = sum;
    var deltaS = sum;

    document.getElementById("M2").value = M2;
    document.getElementById("PT2").value = PT2;
    document.getElementById("TT2").value = TT2;
    document.getElementById("P2").value = P2;
    document.getElementById("T2").value = T2;
    document.getElementById("deltaS").value = deltaS;}

    catch(error){
        console.log(error);
        debugger;
    }
}