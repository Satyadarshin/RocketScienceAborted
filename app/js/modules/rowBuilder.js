/* eslint-disable import/prefer-default-export */
import { controlers } from './controlers.js';

export const rowBuilder = (
  thisWinner,
  tableContainer,
  thisIndex,
) => {
  // The data- values are added so that we can pull out a row separately by array index.
  // const currentWinnerIndex = ;
  // Sets up a control so that the Previous button can't call a value < 0 (i.e. an award that doesn't exist).
  // let pastIndex: number =  thisIndex <= 0  ? 0 : thisIndex - 1;
  // const buildStepBackward = (thisIndex <= 0) ? 0 : thisIndex - 1;
  // const stepBackward = buildStepBackward.toString();
  // const buildStepForward = (thisIndex <= 0) ? 1 : thisIndex + 1;
  // const stepForward = buildStepForward.toString();
  // TODO set up a control so the next value can't be greater than the total number of winners.
  controlers(thisIndex.toString());
  const winnerRow = document.createElement('tr');
  winnerRow.setAttribute('data-index', `${thisIndex.toString()}`);
  const winnerCells = `
  <td>${thisWinner.year}</td>
  <td>${thisWinner.winner.author}</td>
  <td colspan="2">${thisWinner.winner.title}</td>
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