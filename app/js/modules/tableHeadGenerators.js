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
    }
  }
}
// export { generateTableHead as default };