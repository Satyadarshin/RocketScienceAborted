/* eslint-disable import/prefer-default-export */
export const chooseAward = (selectedAward) => {
  const caption = document.querySelector('#outcome caption span'); //  TODO check that this is not null  or throw an error  }
  caption.setAttribute('class', 'swoosh');
  // The set timeout operation is to slow the transition down.
  setTimeout(() => {
  // Pull out the award name from the JSON data property.
  // Strip out the underscore separators.
  // Capitalise the first letter of each word.
  // Present as a table caption.
    const awardCaption = selectedAward.replace(/_/g, ' ');
    const capitaliseCaption = [];
    awardCaption.split(' ').forEach(element => {
      capitaliseCaption.push(
        element.charAt(0).toUpperCase() + element.slice(1)
      );
    });
    caption.textContent = capitaliseCaption.join(' ');
  }, 800);
  const dataSource = `data/${selectedAward}`;
  //  XMLHttpRequest doesn't seem to refactor as ES6, hence the combo syntax.
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      const response = JSON.parse(xhttp.responseText);
      each(response);
    }
  };
  xhttp.open('GET', `${dataSource}.json`, true);
  xhttp.send();
};
