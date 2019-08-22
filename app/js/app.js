const theNebulas = document.querySelector(".nebula_best_novel").addEventListener('click', ()=>alert('yey!'));
const theHugos = document.querySelector(".hugo_best_novel").addEventListener('click', ()=>alert('hey!'));

//TODO can I get this array to self-populate by reading the ./data directory?
// const dataSource = [ "data/hugo_award_novels", "data/nebula_award_novels" ];
const dataSource = "data/hugo_award_novels";
 
const xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if ( this.readyState == 4 && this.status == 200 ) {
      const response = JSON.parse( xhttp.responseText );
      //Original function processes just one data source
      each( response );
      //New function combines multiple data sources first
      //combineDataSources( response )
    }
  }
    xhttp.open( "GET", dataSource + ".json", true );
    xhttp.send();


// for ( i = 0; i < dataSource.length; i++ ) {
//   // console.log( `test: ${dataSource[i]}` );
//   xhttp.open( "GET", dataSource[i] + ".json", true );
//   xhttp.send();
// }

const combineDataSources = ( theAward ) => {
 console.log( theAward );
}

const rowBuilder = ( i, tableContainer ) => {
  let winnerRow = document.createElement( 'tr' );
  let winnerYear = document.createElement( 'td' );
  winnerYear.textContent = `${i.year}`;
  let winnerAuthor = document.createElement( 'td' );
  winnerAuthor.textContent = `${i.winner.author}`;
  let winnerTitle = document.createElement( 'td' );
  winnerTitle.textContent = `${i.winner.title}`;
  winnerRow.appendChild( winnerYear );
  winnerRow.appendChild( winnerAuthor );
  winnerRow.appendChild( winnerTitle );
  tableContainer.appendChild( winnerRow );
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
      rowBuilder( Winners[nextHugo], theContainer );
      rowsToBuild--;
      nextHugo++;
      delay( rowsToBuild, Winners, theContainer, nextHugo )
    }, 1000);
  }
}

const each = ( hugos ) => { 
  let theContainer = document.querySelector( "#outcome" );
  for ( const novels in hugos ) {
    const theWinners = hugos[novels];
    let rowsToBuild = theWinners.length;
    delay( rowsToBuild, theWinners, theContainer );
   }
}