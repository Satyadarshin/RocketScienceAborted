/*
look at the fetch api instead of xmlHttprequest: look at promises: look at aysnc await
Break down into seperate files
Yeoman.io > generator vinatge frontend
consider npm install http-server -g
*/

import { each } from './modules/each.js';

const acquireDataFallback = (dataSource) => {
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

const chooseAward = (selectedAward) => {
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
    awardCaption.split(' ').forEach((element) => {
      capitaliseCaption.push(
        element.charAt(0).toUpperCase() + element.slice(1),
      );
    });
    caption.textContent = capitaliseCaption.join(' ');
  }, 800);
  const dataSource = `./data/${selectedAward}.json`;
  fetch(dataSource)
    .then(
      (response) => {
        if (response.status !== 200) {
          console.log(`Looks like there was a problem. Status Code: ${response.status}`);
          return;
        }
        response.json().then((data) => {
          each(data);
        });
      },
    )
    .catch((err) => {
      console.log('Fetch Error ', err);
      acquireDataFallback(dataSource);
    });
};

const theNebulas = document.querySelector('.nebula_best_novel').addEventListener('click', () => { chooseAward('nebula_award_novels'); });
const theHugos = document.querySelector('.hugo_best_novel').addEventListener('click', () => { chooseAward('hugo_award_novels'); });
// const capitaliseMe = (startsLowerCase) => {
//   startsLowerCase.split(' ').forEach((element) => {
//     capitaliseThis.push(element.charAt(0).toUpperCase() +  element.slice(1));
//     capitalise.join(' ');
//   });
// }
