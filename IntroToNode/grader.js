function average(scores){
    var total =0;
    scores.forEach(function(score){
        // add all scores together
        total +=score;
    });
    // average the score
    var avg = total/scores.length;
    // round the score to the neareast whole number
    return Math.round(avg);
}

var scores = [90,98,89,100,100,86,94];
console.log(average(scores));
var scores2 = [40,65,77,82,80,54,73,63,95,49];
var scores = [90,98,89,100,100,86,94];
console.log(average(scores2));