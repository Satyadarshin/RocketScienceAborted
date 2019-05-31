/* */
const xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      const response = JSON.parse(xhttp.responseText);
      // console.log( response );
      each( response );
    }
};
xhttp.open("GET", "data/hugo_award_novels.json", true);
xhttp.send();

const listContainer = document.querySelector('#outcome');
let text = "test data 2";
let listContent = document.createElement('li');
listContent.textContent = text;
listContainer.appendChild(listContent);
console.log(listContainer);
// .filter()

// .map()

// .find()

// .forEach()

// const each = ( hugos ) => {  console.log( hugos[0].year )  };
const each = ( hugos ) => console.log(typeof hugos);
//const each = ( hugos ) => {   hugos.forEach( hugo => console.log( hugo ) ) };
// const each = ( hugos ) => { 
//   for ( i=0; i < hugos.bestNovel.length; i++ ) {
//     // console.log(hugos.bestNovel[i].year)
//   console.log(`Winner,${hugos.bestNovel[i].year}: ${hugos.bestNovel[i].winner.author}, "${hugos.bestNovel[i].winner.title}".`)
//   }
// };

// .some()

// .every()

// .reduce()

// .includes()