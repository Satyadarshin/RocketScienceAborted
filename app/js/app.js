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

const each = ( hugos ) => { 
  const tableContainer = document.querySelector('#outcome');
  for ( const novels in hugos ) {
    let theString = hugos[novels];
    for ( text in theString ) { 
      let winnerRow = document.createElement('tr');
      let winnerYear = document.createElement('td');
      winnerYear.textContent =`${theString[text].year}`;
      let winnerAuthor = document.createElement('td');
      winnerAuthor.textContent = `${theString[text].winner.author}, `;
      let winnerTitle = document.createElement('td');
      winnerTitle.textContent =  `"${theString[text].winner.title}"`;
      winnerRow.appendChild(winnerYear);
      winnerRow.appendChild(winnerAuthor);
      winnerRow.appendChild(winnerTitle);
      tableContainer.appendChild(winnerRow);
    }
    // for ( text in theString ) { 
    //   let listContent = document.createElement('li');
    //   listContent.textContent =`Winner, ${theString[text].year}: ${theString[text].winner.author}, "${theString[text].winner.title}".`;
    //   listContainer.appendChild(listContent);
    // }
  }
};
// .filter()

// .map()

// .find()

// .forEach()



// .some()

// .every()

// .reduce()

// .includes()