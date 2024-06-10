"use strict";
document.addEventListener("DOMContentLoaded", () => {
    getProvinces;
});

function getProvinces() {
    // fetch the .json file with the option objects
    fetch("data/provinces.json")
        // when the response arrives, parse it as json data
        .then(response => response.json())
        
        // when we get the json data, build the <option> and 
        // add it to the <select id="prov">
        .then(data => {
            let parent = document.getElementById("prov");
            // for each item in the collection
            for (const item of data) {
                let curr = parent.appendChild(document.createElement("option")); 
                curr.setAttribute("value", item.postal);
                curr.setAttribute("title", item.title);
                curr.innerText = item.name + "  ("+ item.postal +")";
            }
        // for debugging
        }).catch(error => {
            console.log(error);
        });
}