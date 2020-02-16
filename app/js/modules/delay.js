// This function should manage the delay in building each row.
export const delay = (rowsToBuild, Winners, theContainer, nextHugo) => {
    if (typeof nextHugo === 'undefined') {
        nextHugo = 0;
        generateTableHead(theContainer, Winners);
    }
    if (rowsToBuild === 0) {
        console.log('End of row building.');
    }
    else {
        setTimeout(() => {
            console.log(typeof theContainer);
            rowBuilder(Winners[nextHugo], theContainer, nextHugo);
            rowsToBuild--;
            nextHugo++;
            // console.log(`the next index is ${nextHugo}`);
            delay(rowsToBuild, Winners, theContainer, nextHugo);
        }, 1000);
    }
};