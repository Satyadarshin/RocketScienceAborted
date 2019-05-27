/* */
function loadHugos(callback) {   
    const xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', './data/hugo_award_novels.json', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
        }
    };
    xobj.send(null);  
}

function init() {
    loadHugos(function(response) {
     // Parse JSON string into object
       const hugos = JSON.parse(response);
    });
   }

const listContainer = document.querySelector('#outcome');
let text = "Dummy string 2";
let listContent = document.createElement('li');
listContent.textContent = text;
listContainer.appendChild(listContent);
console.log(listContainer);
let test = init();
console.log(test);
// .filter()

// .map()

// .find()

// .forEach()

// .some()

// .every()

// .reduce()

// .includes()