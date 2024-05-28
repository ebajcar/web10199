document.addEventListener("DOMContentLoaded", () => {
    getMenu();
});

function getMenu() {
    
    // fetch the .json file with the menu objects
    fetch("data/menu.json")
        // when the response arrives, parse it as json data
        .then(response => response.json())
        
        // when we get the json data, build the <nav> and 
        // add it to the <header>
        .then(data => {

            let nav = document.createElement("nav");

            // for each object in the collection
            for (const link of data) {

                // make a link
                let a = document.createElement("a");
                a.href = link.file;
                a.textContent = link.name;

                // add link to nav
                nav.append(a)
            }
            // add nav to the header element
            document.body.querySelector("header").append(nav);
        // for debugging
        }).catch(error => {
            console.log(error);
        });
}