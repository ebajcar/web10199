// Concentration Memory Game with Images - Head Script
// copyright Stephen Chapman, 28th February 2006, 24th December 2009
// you may copy this script provided that you retain the copyright notice
// http://www.codeproject.com/Articles/368188/AI-Sliding-Puzzle-Solution-Analyzer#_Toc322129746

var back = 'back.gif';
var tile = ['img0.gif','img1.gif','img2.gif','img3.gif','img4.gif','img5.gif',
'img6.gif','img7.gif','img8.gif','img9.gif','img10.gif','img11.gif',
'img12.gif','img13.gif','img14.gif'];

function randOrd(a, b){
	return (Math.round(Math.random())-0.5);
} 
var im = []; 

for (var i = 0; i < 15; i++) {
	im[i] = new Image(); 
	im[i].src = tile[i];
	tile[i] = '<img src="'+tile[i]+'" width="60" height="60" alt="tile" \/>';
	tile[i+15] = tile[i];
} 
 
function displayBack(i) {
	document.getElementById('t'+i).innerHTML = '<div onclick="disp('+i+');return false;"><img src="'+back+'" width="60" height="60" alt="back" \/><\/div>';
} 
 
 var ch1, ch2, tmr, tno, tid, cid, cnt; 
 
 window.onload=start; 
 
 function start() {
	for (var i = 0; i <= 29 ;i++) 
		displayBack(i);
	clearInterval(tid);
	tmr = tno = cnt = 0;
	tile.sort( randOrd );
	cntr(); tid = setInterval('cntr()', 1000);
} 
 
 function cntr() {
	var min = Math.floor(tmr/60);
	var sec = tmr%60;
	document.getElementById('cnt').value = min+':'+ (sec<10 ? '0' : '') + sec;
	tmr++;
} 
 
 function disp(sel) {
	if (tno>1) {
		clearTimeout(cid); conceal();
	}
	document.getElementById('t'+sel).innerHTML = tile[sel];
	if (tno==0) ch1 = sel;else {
			ch2 = sel;
	cid = setTimeout('conceal()', 900);
	}
	tno++;
 } 
 
 function conceal() {
 tno = 0; 
 if (tile[ch1] != tile[ch2]) {
	displayBack(ch1);
	displayBack(ch2);
	} else 
	cnt++; 
	if (cnt >= 15) 
	clearInterval(tid);}
                    