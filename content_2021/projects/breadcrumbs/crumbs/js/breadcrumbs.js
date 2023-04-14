function init() {
    var mtitle = document.title;
    var output = "";
    function breadcrumbs(){
        var sURL; //sURL = new String;
        bits = new Object;  //note no var - global?
        var x = 0;
        var stop = 0;
        output = "<a href=\"/\"><i class='icon icon-home'></i></a>  &#8921;  ";     
        // create home       
        var chunk = document.createElement("li");
        var anchor = document.createElement("a");
        var glyph = document.createElement("i");
        glyph.setAttribute("class", "icon icon-home");
        anchor.setAttribute("href", "/");       
        chunk.appendChild(anchor);
        anchor.appendChild(glyph); 
        document.getElementById("crumbs").appendChild(chunk);
        // process url by slicing (cutting up) and storing the chunks in an object
        sURL = location.href;  // example: file:///C:/public_html/examples10199/examples/breadcrumb2.html
        sURL = sURL.slice(8,sURL.length);  // skip protocol
        var chunkStart = sURL.indexOf("/");
        sURL = sURL.slice(chunkStart+1,sURL.length)
        while(!stop){
            chunkStart = sURL.indexOf("/");
            if (chunkStart != -1){
                bits[x] = sURL.slice(0,chunkStart)
                sURL = sURL.slice(chunkStart+1,sURL.length);
            }else{
                stop = 1;
            }
            x++;
        }
        for( var i in bits ){
            output += "<a href=\""; 
            var tempor = "";
            for( var y=1; y < x-i; y++ ) {
                output += "../"; 
                tempor += "../";
                }
            output += bits[i] + "/\"> " + bits[i] + "</a>  &#8921;  ";            
            // create each sub-directory in the path
            chunk = document.createElement("li");
            anchor = document.createElement("a");
            anchor.setAttribute("href", tempor+bits[i]+"/index.html" ); 
            chunk.appendChild(anchor);
            anchor.innerHTML = bits[i];
            document.getElementById("crumbs").appendChild(chunk);            
        }
    }
    document.getElementById("info").innerHTML = "Current URL is &mdash; " + location.href;
    document.getElementById("titl").innerHTML += "Title of this document is &mdash; " + mtitle;
    breadcrumbs();	
    document.getElementById("panel").innerHTML = "Breadcrumbs for this page &mdash; " + output + mtitle  

    // add current page title
    chunk = document.createElement("li");
    anchor = document.createElement("a");
    anchor.setAttribute("href", "#" ); 
    chunk.appendChild(anchor);
    anchor.innerHTML = mtitle;
    document.getElementById("crumbs").appendChild(chunk);	
}  // end init
document.addEventListener("DOMContentLoaded", init, false);
