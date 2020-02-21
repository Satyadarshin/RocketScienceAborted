/* eslint-disable no-restricted-syntax */
/* eslint-disable import/prefer-default-export */
//Dynamically build a table header.
export const generateTableHead = (
  theContainer,
  Winners,
) => {
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
      const controlers = `
        <th class="actions">
          <button class="previous_row" data-previous="#"><i class="fas fa-step-backward"></i></button>
          <button class="pause_row"><i class="fas fa-pause"></i></button>
          <button class="next_row" data-next="#"><i class="fas fa-step-forward"></i></button>
        </th>
      `;
      // const controlers = `
      //   <th class="actions">
      //     <button class="previous_row" data-previous="${stepBackward}"><i class="fas fa-step-backward"></i></button>
      //     <button class="pause_row"><i class="fas fa-pause"></i></button>
      //     <button class="next_row" data-next="${stepForward}"><i class="fas fa-step-forward"></i></button>
      //   </th>
      // `;
    }
  }
}
// export { generateTableHead as default };