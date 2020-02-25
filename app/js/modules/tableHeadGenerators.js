/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/prefer-default-export */
// Dynamically build a table header.
export const generateTableHead = (
  theContainer,
  Winners,
) => {
  // It's necessary to be very specific about the type of Element in order to make certain property's available.
  // .createTHead is only available on HTMLTableElemnt types, not on the more general HTMLElement and Element.
  const tableHead = theContainer.createTHead();
  const columnTitle = Object.keys(Winners[0]);
  for (const theColumn in columnTitle) {
    // Always parse as a decimal.
    const columnIndex = parseInt(theColumn, 10);
    let theColspan = '';
    if (columnIndex < 2) {
      if (columnIndex === 1) {
        // headerElement.setAttribute('colspan', '3');
        theColspan = ' colspan="2"';
      }
      else {
        theColspan = '';
      }
      // const headerElement = document.createElement('th');
      // Create the table header
      const awardTitleText = columnTitle[theColumn];
      const tidyTitleText = awardTitleText.replace(/_/g, '&nbsp;');
      tableHead.innerHTML = `
      <th>Year</th>
      <th${theColspan}>${tidyTitleText}</th>
    `;
    }
  }
};
