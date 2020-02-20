export const rowBuilder = (
  thisWinner,
  tableContainer,
  thisIndex,
) => {
  // The data- values are added so that we can pull out a row separately by array index.
  const currentWinnerIndex = thisIndex.toString();
  // Sets up a control so that the Previous button can't call a value < 0 (i.e. an award that doesn't exist).
  // let pastIndex: number =  thisIndex <= 0  ? 0 : thisIndex - 1;
  const buildStepBackward = (thisIndex <= 0) ? 0 : thisIndex - 1;
  const stepBackward = buildStepBackward.toString();
  const buildStepForward = (thisIndex <= 0) ? 1 : thisIndex + 1;
  const stepForward = buildStepForward.toString();
  // TODO set up a control so the next value can't be greater than the total number of winners.

  const winnerRow = document.createElement('tr');
  winnerRow.setAttribute('data-index', `${currentWinnerIndex}`);
  const winnerCells = `
  <td>${thisWinner.year}</td>
  <td>${thisWinner.winner.author}</td>
  <td>${thisWinner.winner.title}</td>
  <td class="actions">
    <button class="previous_row" data-previous="${stepBackward}"><i class="fas fa-step-backward"></i></button>
    <button class="pause_row"><i class="fas fa-pause"></i></button>
    <button class="next_row" data-next="${stepForward}"><i class="fas fa-step-forward"></i></button>
  </td>
  `;
  winnerRow.innerHTML = winnerCells;
  tableContainer.appendChild(winnerRow);
  setInterval(() => {
    winnerRow.classList.add('swoosh');
    setInterval(() => {
      tableContainer.removeChild(winnerRow);
    }, 1000);
  }, 1000);
};
// export { rowBuilder as default };
