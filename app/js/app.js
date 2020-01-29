"use strict";
const chooseAward = (selectedAward) => {
    const caption = document.querySelector("#outcome caption span"); //TODO check that this is not null  or throw an error
    if (!caption) {
        console.log(`Can't find the DOM element to attach the output table. Check the ID value.`);
        alert('There as an error outputting the result table. Please contact Technical support');
    }
    caption.setAttribute("class", "swoosh");
    setTimeout(() => {
        //Pull out the award name from the JSON data property.
        //Strip out the underscore separators.
        //Capitalise the first letter of each word.
        //Present as a table caption.
        const awardCaption = selectedAward.replace(/_/g, " ");
        const capitaliseCaption = [];
        awardCaption.split(" ").forEach((element) => {
            capitaliseCaption.push(element.charAt(0).toUpperCase() + element.slice(1));
        });
        caption.textContent = capitaliseCaption.join(" ");
    }, 800);
    let dataSource = "data/" + selectedAward;
    // XMLHttpRequest doesn't seem to refactor as ES6, hence the combo syntax.
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const response = JSON.parse(xhttp.responseText);
            each(response);
        }
    };
    xhttp.open("GET", dataSource + ".json", true);
    xhttp.send();
};
//TODO same as above: this is a quick is a quick way to get the variable to validate
const theNebulas = document.querySelector(".nebula_best_novel").addEventListener('click', () => { chooseAward("nebula_award_novels"); });
const theHugos = document.querySelector(".hugo_best_novel").addEventListener('click', () => { chooseAward("hugo_award_novels"); });
// const capitaliseMe = ( startsLowerCase ) => {
//   startsLowerCase.split( " " ).forEach((element) => {
//     capitaliseThis.push( element.charAt(0).toUpperCase() +  element.slice(1) );
//     capitalise.join( " " );
//   });
// }
const rowBuilder = (thisWinner, tableContainer, thisIndex) => {
    //TODO thisIndex was set to be optionally undefined, throwing errors down the line.
    //Why did I think it might have been an error?
    const paused = false;
    let winnerRow = document.createElement('tr');
    //this data- value added so that we can pull out this row separately by array index
    const myIndex = String(thisIndex);
    winnerRow.setAttribute('data-index', myIndex);
    let winnerYear = document.createElement('td');
    winnerYear.textContent = `${thisWinner.year}`;
    let winnerAuthor = document.createElement('td');
    winnerAuthor.textContent = `${thisWinner.winner.author}`;
    let winnerTitle = document.createElement('td');
    let controls = document.createElement('td');
    const previousWinner = document.createElement('button');
    previousWinner.setAttribute('class', 'previous_row');
    //Sets up a control so that the previous button can't call a value < 0 (i.e. an award that doesn't exist) 
    // let pastIndex: number =  thisIndex <= 0  ? 0 : thisIndex - 1;
    let lowerIndex = 0;
    if (thisIndex <= 0) {
        lowerIndex = 0;
    }
    else if (thisIndex >= 0) {
        lowerIndex = thisIndex - 1;
    }
    else if (thisIndex === undefined) {
        return alert("number is undefined");
    }
    let pastIndex = String(lowerIndex);
    previousWinner.setAttribute('data-previous', pastIndex);
    previousWinner.textContent = 'Previous';
    let upperIndex = 0;
    if (thisIndex <= 0) {
        upperIndex = 0;
    }
    else if (thisIndex >= 0) {
        upperIndex = thisIndex + 1;
    }
    else if (thisIndex === undefined) {
        return alert("number is undefined");
    }
    let futureIndex = String(upperIndex);
    const nextWinner = document.createElement('button');
    nextWinner.setAttribute('class', 'next_row');
    //TODO set up a control so the next value can't be greater than the total number of winners
    nextWinner.setAttribute('data-next', futureIndex);
    nextWinner.textContent = 'next';
    let pauseButton = document.createElement('button');
    pauseButton.setAttribute('class', 'pause_row');
    if (paused) {
        pauseButton.setAttribute('class', 'paused');
    }
    pauseButton.textContent = 'Pause';
    controls.appendChild(previousWinner);
    controls.appendChild(pauseButton);
    controls.appendChild(nextWinner);
    winnerTitle.textContent = `${thisWinner.winner.title}`;
    winnerRow.appendChild(winnerYear);
    winnerRow.appendChild(winnerAuthor);
    winnerRow.appendChild(winnerTitle);
    winnerRow.appendChild(controls);
    tableContainer.appendChild(winnerRow);
    setTimeout(() => {
        winnerRow.classList.add("swoosh");
        setTimeout(() => {
            tableContainer.removeChild(winnerRow);
        }, 1000);
    }, 1000);
};
//Dynamically build a table header.
const generateTableHead = (theContainer, Winners) => {
    //It's necessary to be very specific about the type of Element in order to make certain property's available.
    //.createTHead is only available on HTMLTableElemnt types, not on the more general HTMLElement and Element. 
    let tableHead = theContainer.createTHead();
    let columnTitle = Object.keys(Winners[0]);
    for (const theColumn in columnTitle) {
        const columnIndex = parseInt(theColumn, 10); //Always parse as a decimal.
        if (columnIndex < 2) {
            let headerElement = document.createElement("th");
            if (columnIndex == 1) {
                headerElement.setAttribute("colspan", "3");
            }
            let awardTitleText = columnTitle[theColumn];
            let tidyTitleText = awardTitleText.replace(/_/g, '&nbsp;');
            let headerText = document.createTextNode(tidyTitleText);
            headerElement.appendChild(headerText);
            tableHead.appendChild(headerElement);
        }
    }
};
//This function should manage the delay in building each row. 
const delay = (rowsToBuild, Winners, theContainer, nextHugo) => {
    if (typeof nextHugo === "undefined") {
        nextHugo = 0;
        generateTableHead(theContainer, Winners);
    }
    if (rowsToBuild === 0) {
        console.log("End of row building.");
    }
    else {
        setTimeout(() => {
            console.log(typeof theContainer);
            rowBuilder(Winners[nextHugo], theContainer, nextHugo);
            rowsToBuild--;
            nextHugo++;
            //console.log(`the next index is ${nextHugo}`);
            delay(rowsToBuild, Winners, theContainer, nextHugo);
        }, 1000);
    }
};
const each = (hugos) => {
    //todo: hoist this variable out because it's searched for twice
    let theContainer = document.querySelector("#outcome");
    Object.keys(hugos).forEach(novel => {
        //console.log(typeof novels);
        const theWinners = hugos[novel];
        let rowsToBuild = Object.keys(theWinners).length;
        delay(rowsToBuild, theWinners, theContainer);
    });
};
