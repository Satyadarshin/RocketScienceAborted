export const rowBuilder = (thisWinner, tableContainer, thisIndex) => {
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
}