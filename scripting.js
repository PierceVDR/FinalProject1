form = document.getElementById("diceForm");
var rollSums;
var occurances;

form.addEventListener("submit", function (p) {
    p.preventDefault();
  
    var formData = new FormData(form); // Collect values
  
    var entries = formData.entries();

    // console.log(entries);

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
    // IMPORTANT: idx 0 is the LOWEST POSSIBLE ROLL\
    
    totalSum=0.0;
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

    // MEDIAN:
    var median=-1;
    var halfwayCount = numRolls/2.0
    var curOccurance = 0
    while (median==-1) {
        var numOccurances = occurances[curOccurance]
        if (numOccurances<halfwayCount) {
            halfwayCount-=numOccurances
        } else if (numOccurances>halfwayCount) {
            median=curOccurance+parseInt(numDice);
        } else { // Means that numOccurances==halfwayCount (median is inbetween 2 outcomes)

            // We have the lower number, but we need to find the next number to average them together in this scenario
            const equalsZero = v=>v!=0;
            const next= occurances.slice(curOccurance+1).findIndex( equalsZero ) + curOccurance+1;

            median = (curOccurance+next)/2 + parseInt(numDice);
        }

        curOccurance++;
    }

    // FREQUENCIES:
    var frequencies={};
    for (var idx in occurances) {
        frequencies[  parseInt(idx)+parseInt(numDice) ] = occurances[idx]/numRolls;
    }

    console.log("RESULTS: "+rollSums);
    console.log("OCCURANCES: "+occurances);
    console.log("MEAN: "+mean);
    console.log("MEDIAN: "+median);
    console.log("FREQS: ");
    console.log(frequencies);
}