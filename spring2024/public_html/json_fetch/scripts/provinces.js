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
        
        // when we get the json data, build the <select> and 
        // add it to the <header>
        .then(data => {
            //console.log("attempting to get data");
            //let list = [];
            //let selectList = document.createElement("select");
            let parent = document.getElementById("prov");
            //console.log(parent);
            //let index = 0;
            // for each item in the collection
            for (const item of data) {
                let curr = parent.appendChild(document.createElement("option")); 
                curr.setAttribute("value", item.postal);
                curr.setAttribute("title", item.title);
                curr.innerHTML = item.name + "  ("+ item.postal +")";
                //list[index] = item.name;
                //console.log(index);
                //index++;
            }
        // for debugging
        }).catch(error => {
            console.log(error);
        });
}