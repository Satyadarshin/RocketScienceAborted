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
  console.log(i);
  let winnerRow = document.createElement('tr');
  let winnerYear = document.createElement('td');
  winnerYear.textContent = `${i.year}`;
  let winnerAuthor = document.createElement('td');
  winnerAuthor.textContent = `${i.winner.author}, `;
  let winnerTitle = document.createElement('td');
  winnerTitle.textContent = `"${i.winner.title}"`;
  winnerRow.appendChild(winnerYear);
  winnerRow.appendChild(winnerAuthor);
  winnerRow.appendChild(winnerTitle);
  tableContainer.appendChild(winnerRow);
  setTimeout(()=>{winnerRow.classList.add('test_class');}, 1000)
}

const each = ( hugos ) => { 
  const theContainer = document.querySelector('#outcome');
  for ( const novels in hugos ) {
    let theWinners = hugos[novels];
    for (thisYear in theWinners ) { 
      rowBuilder(theWinners[thisYear], theContainer);
     // (function () {setInterval(rowBuilder, 500, theWinners[thisYear], theContainer);})()
      // setInterval(rowBuilder, 5000, thisYear, theWinners, theContainer);
    }

    // for (var x = 0, ln = list.length; x < ln; x++) {
    //   setTimeout(function(y) {    
    //     console.log("%d => %d", y, list[y] += 10);
    //   }, x * 500, x); // we're passing x
    // // }

   }
}