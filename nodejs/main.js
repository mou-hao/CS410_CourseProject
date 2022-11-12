const vader = require('vader-sentiment');
function score(text){
    return vader.SentimentIntensityAnalyzer.polarity_scores(text).compound;
}
module.exports = {score:score};