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
  
  setTimeout( ()=>{ 
    winnerRow.classList.add('test_class');
    setTimeout( ()=>{ 
      tableContainer.removeChild(winnerRow)
    }, 1000) }, 1000)
  // tableContainer.removeChild(winnerRow);
}

//This function is on the backburner. 
//It should be called once, before the function to chug over the rows 
const generateTableHead = ( theContainer, Winners ) => {
  let thead = theContainer.createTHead();
  let columnTitle = Object.keys(Winners[0]);
  for (title in columnTitle) {
    if (title < 2) {
     // console.log (columnTitle[title])
      let th = document.createElement("th");
      if ( title == 1 ) { 
        th.setAttribute("colspan", "2");
      }
      let text = document.createTextNode(columnTitle[title]);
      th.appendChild(text);
      thead.appendChild(th);
    }
  }
}

/*
This function should manage the delay in building each row. 

*/
const delay = (rowsToBuild, Winners, theContainer, nextHugo) => {
  if (typeof nextHugo === "undefined") {
    var nextHugo = 0;
    generateTableHead(theContainer, Winners)
  }
  if (rowsToBuild === 0) {
    console.log("End of row building.");
  } else {
    setTimeout( ()=> {
      rowBuilder(Winners[nextHugo], theContainer);
      rowsToBuild--;
      nextHugo++;
      delay(rowsToBuild, Winners, theContainer, nextHugo)
    }, 1000);
  }
}

const each = ( hugos ) => { 
  let theContainer = document.querySelector('#outcome');
  for ( const novels in hugos ) {
    const theWinners = hugos[novels];
    let rowsToBuild = theWinners.length;
    delay(rowsToBuild, theWinners, theContainer);
   }
}