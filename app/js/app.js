/* */
const xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      const response = JSON.parse(xhttp.responseText);
      each( response );
    }
};
xhttp.open("GET", "data/hugo_award_novels.json", true);
xhttp.send();

const rowBuilder = (i, tableContainer) => {
  let winnerRow = document.createElement('tr');
  let winnerYear = document.createElement('td');
  winnerYear.textContent = `${i.year}`;
  let winnerAuthor = document.createElement('td');
  winnerAuthor.textContent = `${i.winner.author}`;
  let winnerTitle = document.createElement('td');
  winnerTitle.textContent = `${i.winner.title}`;
  winnerRow.appendChild(winnerYear);
  winnerRow.appendChild(winnerAuthor);
  winnerRow.appendChild(winnerTitle);
  tableContainer.appendChild(winnerRow);
  winnerRow.classList.add('test_class');
  setTimeout(()=>{ tableContainer.removeChild(winnerRow)}, 1000)
  // tableContainer.removeChild(winnerRow);
}

//This function is on the backburner. 
//It should be called once, before the function to chug over the rows 
const generateTableHead = (table, data) => {
  let thead = table.createTHead();
  let row = thead.insertRow();
  for (key of data) {
    let th = document.createElement("th");
    let text = document.createTextNode(key);
    th.appendChild(text);
    row.appendChild(th);
  }
}

/*
This function should manage the delay in building each row. 

*/
const delay = (rowsToBuild, Winners, theContainer, nextHugo) => {
  if (typeof nextHugo === "undefined") {
     var nextHugo = 0;
    }
    if (rowsToBuild === 0) {
      console.log("end");
    } else {
      setTimeout( ()=>{

        
        rowBuilder(Winners[nextHugo], theContainer);
        rowsToBuild--;
        nextHugo++;
        delay(rowsToBuild, Winners, theContainer, nextHugo)
      }, 1000)
  }
}

const each = ( hugos ) => { 
  let theContainer = document.querySelector('#outcome');
  for ( const novels in hugos ) {
    const theWinners = hugos[novels];
    let rowsToBuild = theWinners.length;
    delay(rowsToBuild, theWinners, theContainer)
   }
}