"use strict";
document.addEventListener("DOMContentLoaded", () => {
    getProvinces();
});

function getProvinces() {
    
    // fetch the .json file with the menu objects
    fetch("data/provinces.json")
        // when the response arrives, parse it as json data
        .then(response => response.json())
        
        // when we get the json data, build the <select> and 
        // add it to the <header>
        .then(data => {
            
            let list = [];
            //let selectList = document.createElement("select");
            let curr = document.getElementById("prov")

            // for each item in the collection
            for (const item of data) {

			curr.appendChild(document.createElement("option")); 
			curr.setAttribute("value", item.postal);
            curr.setAttribute("title", item.title);
			curr.innerHTML = item.name + "  ("+ item.postal +")";
			list[index] = item.name;
            
            
                // make a link
                //let option = document.createElement("option");
                //a.href = link.file;
                //option.textContent = item.name;

                // add link to nav
                //nav.append(a)
            }
            // add nav to the header element
            document.body.querySelector("prov").append(list);
        // for debugging
        }).catch(error => {
            console.log(error);
        });
}