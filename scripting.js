form = document.getElementById("diceForm");
var rollSums;
var occurances;

form.addEventListener("submit", function (p) {
    p.preventDefault();
  
    var formData = new FormData(form); // Collect values
  
    var entries = formData.entries();

    console.log(entries);

    // var numDice=entries[0][1];
    // var numRolls=entries[1][1];

    var numDice;
    var numRolls;

    for (var pair of formData.entries()) {
        // console.log(pair);

        if (pair[0]=="numDice") {
            numDice=pair[1]
        } else if (pair[0]=="numRolls") {
            numRolls=pair[1]
        }
    }

    rollDice(numDice, numRolls)

});

function rollDice(numDice, numRolls) {

    occurances=new Array(5*numDice + 1).fill(0); // Array filled with an element for each outcome, begins with zeros
    // IMPORTANT: idx 0 is the LOWEST POSSIBLE ROLL
    totalSum=0;
    rollSums=[];
    
    for (r=0; r<numRolls; r++) {
        var sum=0;
        for (d=0; d<numDice; d++) {
            sum+=Math.floor(Math.random()*6) + 1;
        }
        rollSums.push(sum);

        occurances[sum-numDice]=occurances[sum-numDice]+1;
        totalSum+=sum;
    }

    // MEAN:
    var mean = totalSum/numRolls;

    // MEDIAN - IMPLEMENTED COMPLETELY INCORRECTLY, MUST FIX!!!
    var median;
    const middle=(numRolls-1)/2;
    if (numRolls%2==1) {
        median = rollSums[middle];
    } else {
        median = (rollSums[middle-0.5]+rollSums[middle+0.5]) / 2;
    }

    // FREQUENCIES:
    var frequencies={};
    for (var idx in occurances) {
        frequencies[  parseInt(idx)+parseInt(numDice) ] = occurances[idx]/numRolls;
    }

    console.log("MEAN: "+mean);
    console.log("MEDIAN: "+median);
    console.log("FREQS: ");
    console.log(frequencies);
}