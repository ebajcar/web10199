console.log("start");
document.addEventListener("DOMContentLoaded", () => {
    getProvinces();
});

function getProvinces() {
    //console.log("entered getProvinces");
    // fetch the .json file with the menu objects
    fetch("data/provinces.json")
        // when the response arrives, parse it as json data
        .then(response => response.json())
        
        // when we get the json data, build the OPTIONs and 
        // add it to the SELECT
        .then(data => {
            let parent = document.getElementById("prov");
            //console.log(parent);
            // for each item in the collection
            for (const item of data) {
                let curr = parent.appendChild(document.createElement("option")); 
                curr.setAttribute("value", item.postal);
                curr.setAttribute("title", item.title);
                curr.innerHTML = item.name + "  ("+ item.postal +")";
            }
        // for debugging
        }).catch(error => {
            console.log(error);
        });
}