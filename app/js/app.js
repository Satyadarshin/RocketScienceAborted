const chooseAward = ( selectedAward ) => {
  const caption = document.querySelector( "#outcome caption span"); //
  caption.setAttribute( "class", "swoosh" );
    setTimeout( () => {
      caption.textContent = selectedAward;
    }, 800
  );
  let dataSource = "data/" + selectedAward;
  // XMLHttpRequest doesn't seem to refactor as ES6, hence the combo syntax.
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if ( this.readyState == 4 && this.status == 200 ) {
      const response = JSON.parse( xhttp.responseText );
      each( response );
    }
  }
  xhttp.open( "GET", dataSource + ".json", true );
  xhttp.send();
}

const theNebulas = document.querySelector( ".nebula_best_novel" ).addEventListener( 'click', () => { chooseAward( "nebula_award_novels" ) });
const theHugos = document.querySelector( ".hugo_best_novel" ).addEventListener( 'click', () => { chooseAward( "hugo_award_novels" ) });

const rowBuilder = ( thisWinner, tableContainer, thisIndex ) => {
  const paused = false;
  let winnerRow = document.createElement( 'tr' );
  //this data- value added so that we can pull out this row separately by array index
  winnerRow.setAttribute('data-index', thisIndex);
  let winnerYear = document.createElement( 'td' );
  winnerYear.textContent = `${thisWinner.year}`;
  let winnerAuthor = document.createElement( 'td' );
  winnerAuthor.textContent = `${thisWinner.winner.author}`;
  let winnerTitle = document.createElement( 'td' );
  
  let controls = document.createElement( 'td' );
  const previousWinner = document.createElement( 'button' );
  previousWinner.setAttribute( 'class', 'previous_row' );
  //TODO set up a control so that the next value can't be below 0 
  previousWinner.setAttribute( 'data-previous', thisIndex-1 );
  previousWinner.textContent = 'Previous';

  const nextWinner = document.createElement( 'button' );
  nextWinner.setAttribute( 'class', 'next_row' );
  //TODO set up a control so the next value can't be greater than the total number of winners
  nextWinner.setAttribute( 'data-next', thisIndex+1 );
  nextWinner.textContent = 'next';

  let pauseButton = document.createElement( 'button' );
  pauseButton.setAttribute('class', 'pause_row');
  if ( paused ) {
    pauseButton.setAttribute('class', 'paused');
  }
  pauseButton.textContent = 'Pause';
  controls.appendChild( previousWinner );
  controls.appendChild( pauseButton );
  controls.appendChild( nextWinner );

  
  
  winnerTitle.textContent = `${thisWinner.winner.title}`;
  winnerRow.appendChild( winnerYear );
  winnerRow.appendChild( winnerAuthor );
  winnerRow.appendChild( winnerTitle );
  tableContainer.appendChild( winnerRow );
  winnerRow.appendChild( controls);
  setTimeout( () => { 
    winnerRow.classList.add( "swoosh" );
    setTimeout( () => { 
      tableContainer.removeChild( winnerRow )
    }, 1000) }, 1000 )
}

//Dynamically build a table header.
const generateTableHead = ( theContainer, Winners ) => {
  let tableHead = theContainer.createTHead();
  let columnTitle = Object.keys( Winners[0] );
  for ( theColumn in columnTitle ) {
    if ( theColumn < 2 ) {
      let headerElement = document.createElement( "th" );
      if ( theColumn == 1 ) { 
        headerElement.setAttribute( "colspan", "2" );
      }
      let headerText = document.createTextNode( columnTitle[theColumn] );
      headerElement.appendChild( headerText );
      tableHead.appendChild( headerElement );
    }
  }
}

//This function should manage the delay in building each row. 
const delay = ( rowsToBuild, Winners, theContainer, nextHugo ) => {
  if ( typeof nextHugo === "undefined" ) {
    var nextHugo = 0;
    generateTableHead( theContainer, Winners )
  }
  if ( rowsToBuild === 0 ) {
    console.log( "End of row building." );
  } else {
    setTimeout( ()=> {
      rowBuilder( Winners[nextHugo], theContainer, nextHugo );
      rowsToBuild--;
      nextHugo++;
      //console.log(`the next index is ${nextHugo}`);
      delay( rowsToBuild, Winners, theContainer, nextHugo )
    }, 1000);
  }
}

const each = ( hugos ) => { 
  //todo: hoist this variable out because it's searched for twice
  let theContainer = document.querySelector( "#outcome" );
  for ( const novels in hugos ) {
    const theWinners = hugos[novels];
    let rowsToBuild = theWinners.length;
    delay( rowsToBuild, theWinners, theContainer );
   }
}