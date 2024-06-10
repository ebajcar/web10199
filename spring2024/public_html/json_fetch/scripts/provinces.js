"use strict";
document.addEventListener("DOMContentLoaded", () => {
    getMenu();
});

function getMenu() {
    
    // fetch the .json file with the menu objects
    fetch("data/provinces.json")
        // when the response arrives, parse it as json data
        .then(response => response.json())
        
        // when we get the json data, build the <select> and 
        // add it to the <header>
        .then(data => {

            let selectList = document.createElement("select");

            // for each item in the collection
            for (const item of data) {

                // make a link
                let option = document.createElement("option");
                //a.href = link.file;
                option.textContent = item.name;

                // add link to nav
                nav.append(a)
            }
            // add nav to the header element
            document.body.querySelector("prov").append(selectList);
        // for debugging
        }).catch(error => {
            console.log(error);
        });
}