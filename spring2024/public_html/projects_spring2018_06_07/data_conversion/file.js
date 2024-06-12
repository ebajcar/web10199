var y;
console.log("var y; ", y);
console.log("var y; ", typeof(y));
// 0 false false
var x = false;
console.log("var x = false ", typeof(x));
document.write("<p>Converting <strong>var x = false;</strong> to:</p>",
"Number : " + Number(x) + "<br>" +
"String : " + String(x) + "<br>" +
"Boolean: " + Boolean(x));

// 0 0 false
var x = 0;
console.log("var x = 0 ", typeof(x));
document.write("<p>Converting <strong>var x = 0;</strong> to:</p>",
"Number : " + Number(x) + "<br>" +
"String : " + String(x) + "<br>" +
"Boolean: " + Boolean(x));

// NaN twenty true
var x = "twenty";
console.log('var x = "twenty"; ', typeof(x));
document.write("<p>Converting <strong>var x = &quot;twenty&quot;;</strong> to:</p>",
"Number : " + Number(x) + "<br>" +
"String : " + String(x) + "<br>" +
"Boolean: " + Boolean(x));

// NaN twenty true
var x = ["twenty"];
console.log('var x = ["twenty"]; ', typeof(x));
document.write("<p>Converting <strong>var x = [&quot;twenty&quot;];</strong> to:</p>",
"Number : " + Number(x) + "<br>" +
"String : " + String(x) + "<br>" +
"Boolean: " + Boolean(x));