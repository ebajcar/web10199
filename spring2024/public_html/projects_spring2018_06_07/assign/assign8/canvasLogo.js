/*
Author: 	Ellen Bajcar et al
Program: 	canvasLogo.js
Date: 		Summer 2017
Update: 		 
Version: 	a7.s2017.27.07
Purpose: 	template for Assignment 7 SYST10199 Web Development
Source: 	various
Copyright: 
    This work is the intellectual property of Sheridan College. 
    Any further copying and distribution outside of class must be within 
    the copyright law. Posting to commercial sites for profit is prohibited.
Dependencies:
	bg3.jpg canvasLogo.js games.css loginForm.html template.html anyGame.html
Description:
    see instructions.html
*/	

function drawTextAlongArc(context, str, centerX, centerY, radius, angle) {
	var len = str.length, s;
	context.save();
	context.translate(centerX, centerY);
	context.rotate(-1 * angle / 2);
	context.rotate(-1 * (angle / len) / 2);
	for(var n = 0; n < len; n++) {
		context.rotate(angle / len);
		context.save();
		context.translate(0, -1 * radius);
		s = str[n];
		context.fillText(s, 0, 0);
		context.restore();
	}
	context.restore();
}

var canvas = document.getElementById('myCanvas'), 
context = canvas.getContext('2d'),
centerX = canvas.width / 2 - 20,
centerY = canvas.height - 30,
angle = Math.PI * 1.2,
radius = 80;

context.font = '16pt Calibri';
context.textAlign = 'center';
context.fillStyle = 'orange';;
context.strokeStyle = 'rgb(204, 122, 0)';
context.shadowColor = 'rgba(10,10,10,0.8)';
context.shadowOffsetX = 3;
context.shadowOffsetY = 3;
context.shadowBlur = 6;
context.lineWidth = 9;
drawTextAlongArc(context, 'S Y S T 1 0 1 9 9   W E B   P R O G R A M M I N G', centerX, centerY, radius, angle);

// draw circle underneath text
context.arc(centerX, centerY, radius - 6, 0, 2 * Math.PI, false);
context.stroke();
var x = canvas.width / 2 - 20;
var y = canvas.height - 20;
var text = 'GAMES';

context.font = 'bold 40pt Calibri';
context.textAlign = 'center';
context.lineWidth = 0.3;
context.fillStyle = 'white';
context.strokeStyle = 'orange';
//context.fillStyle = 'rgb(25, 51, 102)';
//context.strokeStyle = 'rgb(204, 122, 0)';

context.shadowColor = 'rgba(10,10,10,0.8)';
context.shadowOffsetX = 5;
context.shadowOffsetY = 5;
context.shadowBlur = 10;
context.fillText(text, x, y);	
context.strokeText(text, x, y);	

var text = '& OTHER WEB APPS';
var y = canvas.height - 3;

context.font = 'bold 12pt Calibri';
context.textAlign = 'center';
context.lineWidth = 0.1;
context.fillStyle = 'white';
context.strokeStyle = 'black';
//context.fillStyle = 'rgb(25, 51, 102)';
//context.strokeStyle = 'rgb(204, 122, 0)';

context.shadowColor = 'rgba(210,210,210,0.8)';
context.shadowOffsetX = 2;
context.shadowOffsetY = 2;
context.shadowBlur = 2;
context.fillText(text, x, y);	
context.strokeText(text, x, y);	



