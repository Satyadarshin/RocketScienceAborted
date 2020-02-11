"use strict";
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
// import { generateTableHead } from './modules/tableHeadGenerator';
const chooseAward = (selectedAward) => {
    const caption = document.querySelector('#outcome caption span'); //  TODO check that this is not null  or throw an error  }
    caption.setAttribute('class', 'swoosh');
    //  The set timeout operation is to slow the transition down.
    setTimeout(() => {
        // Pull out the award name from the JSON data property.
        // Strip out the underscore separators.
        // Capitalise the first letter of each word.
        // Present as a table caption.
        const awardCaption = selectedAward.replace(/_/g, ' ');
        const capitaliseCaption = [];
        awardCaption.split(' ').forEach((element) => {
            capitaliseCaption.push(element.charAt(0).toUpperCase() + element.slice(1));
        });
        caption.textContent = capitaliseCaption.join(' ');
    }, 800);
    const dataSource = `data/${selectedAward}`;
    //  XMLHttpRequest doesn't seem to refactor as ES6, hence the combo syntax.
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            const response = JSON.parse(xhttp.responseText);
            each(response);
        }
    };
    xhttp.open('GET', `${dataSource}.json`, true);
    xhttp.send();
};
// TODO same as above: this is a quick is a quick way to get the variable to validate
const theNebulas = document.querySelector('.nebula_best_novel').addEventListener('click', () => { chooseAward('nebula_award_novels'); });
const theHugos = document.querySelector('.hugo_best_novel').addEventListener('click', () => { chooseAward('hugo_award_novels'); });
//  const capitaliseMe = (startsLowerCase) => {
//    startsLowerCase.split(' ').forEach((element) => {
//      capitaliseThis.push(element.charAt(0).toUpperCase() +  element.slice(1));
//      capitalise.join(' ');
//    });
//  }
const rowBuilder = (thisWinner, tableContainer, thisIndex) => {
    // The data- values are added so that we can pull out a row separately by array index.
    const myIndex = String(thisIndex);
    // Sets up a control so that the Previous button can't call a value < 0 (i.e. an award that doesn't exist).
    // let pastIndex: number =  thisIndex <= 0  ? 0 : thisIndex - 1;
    let lowerIndex = 0;
    if (thisIndex <= 0) {
        lowerIndex = 0;
    }
    else if (thisIndex >= 0) {
        lowerIndex = thisIndex - 1;
    }
    else if (thisIndex === undefined) {
        console.log('number is undefined');
    }
    const pastIndex = String(lowerIndex);
    const previousWinner = `<button class="previous_row" data-previous="${pastIndex}"><i class="fas fa-step-backward"></i></button>`;
    let upperIndex = 0;
    if (thisIndex <= 0) {
        upperIndex = 0;
    }
    else if (thisIndex >= 0) {
        upperIndex = thisIndex + 1;
    }
    else if (thisIndex === undefined) {
        console.log('number is undefined');
    }
    const futureIndex = String(upperIndex);
    const nextWinner = `<button class="next_row" data-next="${futureIndex}"><i class="fas fa-step-forward"></i></button>`;
    // TODO set up a control so the next value can't be greater than the total number of winner.
    const pauseButton = '<button class="pause_row"><i class="fas fa-pause"></i></button>';
    const winnerRow = document.createElement('tr');
    winnerRow.setAttribute('data-index', `${myIndex}`);
    const winnerCells = `<td>${thisWinner.year}</td>\n
  <td>${thisWinner.winner.author}</td>\n
  <td>${thisWinner.winner.title}</td>\n
  <td class="actions">${previousWinner} ${pauseButton} ${nextWinner}</td>`;
    winnerRow.innerHTML = winnerCells;
    tableContainer.appendChild(winnerRow);
    setTimeout(() => {
        winnerRow.classList.add('swoosh');
        setTimeout(() => {
            tableContainer.removeChild(winnerRow);
        }, 1000);
    }, 1000);
};
// Dynamically build a table header.
const generateTableHead = (theContainer, Winners) => {
    const tableHead = '';
    // It's necessary to be very specific about the type of Element in order to make certain property's available.
    // .createTHead is only available on HTMLTableElemnt types, not on the more general HTMLElement and Element.
    tableHead = theContainer.createTHead();
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
const delay = (rowsToBuild, Winners, theContainer, nextHugo) => {
    if (typeof nextHugo === 'undefined') {
        nextHugo = 0;
        generateTableHead(theContainer, Winners);
    }
    if (rowsToBuild === 0) {
        console.log('End of row building.');
    }
    else {
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
const each = (hugos) => {
    // todo: hoist this variable out because it's searched for twice
    const theContainer = document.querySelector('#outcome');
    Object.keys(hugos).forEach((novel) => {
        // console.log(typeof novels);
        const theWinners = hugos[novel];
        const rowsToBuild = Object.keys(theWinners).length;
        delay(rowsToBuild, theWinners, theContainer);
    });
};
System.register("modules/tableHeadGenerator", [], function (exports_1, context_1) {
    "use strict";
    var generateTableHead;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            // test 
            //Dynamically build a table header.
            exports_1("generateTableHead", generateTableHead = (theContainer, Winners) => {
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
            });
        }
    };
});
