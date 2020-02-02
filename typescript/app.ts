/*
look at the fetch api instead of xmlHttprequest: look at promises: look at aysnc await
Break down into seperate files
es6 template syntax
when we fist load the page request the data sources ans store in memory (a variable).
*/

/*
 * Questions for Will:
 * Line length limit of 100 characters?
*/

const chooseAward = (selectedAward: string) => {
  const caption = (document.querySelector('#outcome caption span') as Element); //  TODO check that this is not null  or throw an error  }
  caption.setAttribute('class', 'swoosh');
  //  The set timeout operation is to slow the transition down.
  setTimeout(() => {
    // Pull out the award name from the JSON data property.
    // Strip out the underscore separators.
    // Capitalise the first letter of each word.
    // Present as a table caption.
    const awardCaption: string = selectedAward.replace(/_/g, ' ');
    const capitaliseCaption: Array<string> = [];
    awardCaption.split(' ').forEach((element) => {
      capitaliseCaption.push(element.charAt(0).toUpperCase() + element.slice(1));
    });
    caption.textContent = capitaliseCaption.join(' ');
  }, 800);
  const dataSource: string = `data/${selectedAward}`;
  //  XMLHttpRequest doesn't seem to refactor as ES6, hence the combo syntax.
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const response = JSON.parse(xhttp.responseText);
      each(response);
    }
  };
  xhttp.open('GET', `${dataSource}.json`, true);
  xhttp.send();
};
// TODO same as above: this is a quick is a quick way to get the variable to validate
const theNebulas = (document.querySelector('.nebula_best_novel') as Element).addEventListener('click', () => { chooseAward('nebula_award_novels'); });
const theHugos = (document.querySelector('.hugo_best_novel') as Element).addEventListener('click', () => { chooseAward('hugo_award_novels'); });
//  const capitaliseMe = (startsLowerCase) => {
//    startsLowerCase.split(' ').forEach((element) => {
//      capitaliseThis.push(element.charAt(0).toUpperCase() +  element.slice(1));
//      capitalise.join(' ');
//    });
//  }
const rowBuilder = (thisWinner: {year: number, winner: {author: string, title: string}}, tableContainer: Element, thisIndex: number) => {
  // TODO thisIndex was set to be optionally undefined, throwing errors down the line.
  // Why did I think it might have been an error?
  const paused: Boolean = false;
  // this data- value added so that we can pull out this row separately by array index
  const myIndex = String(thisIndex);
  
  const winnerYear: string = `<td>${thisWinner.year}</td>`;
  // const winnerAuthor: string = `<td>${thisWinner.winner.author}</td>`;
  const winnerRow: string = `<tr data-index="${myIndex}">\n + 
  <td>${thisWinner.year}</td>\n +
  <td>${thisWinner.winner.author}</td>\n +  
  </tr>`;
  const winnerTitle: HTMLTableCellElement = document.createElement('td');
  const controls: HTMLTableCellElement = document.createElement('td');
  const previousWinner = (document.createElement('button') as HTMLElement);
  previousWinner.setAttribute('class', 'previous_row');
  // Sets up a control so that the previous button can't call a value < 0 (i.e. an award that doesn't exist)
  // let pastIndex: number =  thisIndex <= 0  ? 0 : thisIndex - 1;
  let lowerIndex: number = 0;
  if (thisIndex <= 0) {
    lowerIndex = 0;
  } else if (thisIndex >= 0) {
    lowerIndex = thisIndex - 1;
  } else if (thisIndex === undefined) {
    return alert('number is undefined');
  }
  const pastIndex = String(lowerIndex);
  previousWinner.setAttribute('data-previous', pastIndex);
  previousWinner.textContent = 'Previous';


  let upperIndex: number = 0;
  if (thisIndex <= 0) {
    upperIndex = 0;
  } else if (thisIndex >= 0) {
    upperIndex = thisIndex + 1;
  } else if (thisIndex === undefined) {
    return alert('number is undefined');
  }
  const futureIndex = String(upperIndex);
  const nextWinner = (document.createElement('button') as HTMLElement);
  nextWinner.setAttribute('class', 'next_row');
  // TODO set up a control so the next value can't be greater than the total number of winners
  nextWinner.setAttribute('data-next', futureIndex);
  nextWinner.textContent = 'next';

  const pauseButton = (document.createElement('button') as HTMLElement);
  pauseButton.setAttribute('class', 'pause_row');
  if (paused) {
    pauseButton.setAttribute('class', 'paused');
  }
  pauseButton.textContent = 'Pause';
  controls.appendChild(previousWinner);
  controls.appendChild(pauseButton);
  controls.appendChild(nextWinner);

  winnerTitle.textContent = `${thisWinner.winner.title}`;

  // winnerRow.appendChild(winnerYear);
  // winnerRow.appendChild(winnerAuthor);
  winnerRow.appendChild(winnerTitle);
  winnerRow.appendChild(controls);
  tableContainer.appendChild(winnerRow);
  setTimeout(() => {
    winnerRow.classList.add('swoosh');
    setTimeout(() => {
      tableContainer.removeChild(winnerRow);
    }, 1000);
  }, 1000);
};
// Dynamically build a table header.
const generateTableHead = (theContainer: HTMLTableElement, Winners: Object) => {
  // It's necessary to be very specific about the type of Element in order to make certain property's available.
  // .createTHead is only available on HTMLTableElemnt types, not on the more general HTMLElement and Element.
  const tableHead = theContainer.createTHead();
  const columnTitle = Object.keys(Winners[0]);
  for (const theColumn in columnTitle) {
    const columnIndex = parseInt(theColumn, 10); // Always parse as a decimal.
    if (columnIndex < 2) {
      const headerElement = document.createElement('th');
      if (columnIndex == 1) {
        headerElement.setAttribute('colspan', '3');
      }
      const awardTitleText = columnTitle[theColumn];
      const tidyTitleText = awardTitleText.replace(/_/g, '&nbsp;');
      const headerText = document.createTextNode(tidyTitleText);
      headerElement.appendChild(headerText);
      tableHead.appendChild(headerElement);
    }
  }
};
// This function should manage the delay in building each row.
const delay = (rowsToBuild: number, Winners: Object, theContainer: HTMLTableElement, nextHugo?: number) => {
  if (typeof nextHugo === 'undefined') {
    nextHugo = 0;
    generateTableHead(theContainer, Winners);
  }
  if (rowsToBuild === 0) {
    console.log('End of row building.');
  } else {
    setTimeout(() => {
      console.log(typeof theContainer);
      rowBuilder(Winners[nextHugo], theContainer, nextHugo);
      rowsToBuild--;
      nextHugo++;
      // console.log(`the next index is ${nextHugo}`);
      delay(rowsToBuild, Winners, theContainer, nextHugo);
    }, 1000);
  }
};
const each = (hugos: Object) => {
  // todo: hoist this variable out because it's searched for twice
  const theContainer = (document.querySelector('#outcome') as HTMLTableElement);
  Object.keys(hugos).forEach((novel) => {
    // console.log(typeof novels);
    const theWinners: Object = hugos[novel];
    const rowsToBuild: number = Object.keys(theWinners).length;
    delay(rowsToBuild, theWinners, theContainer);
  });
};
