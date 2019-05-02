var Twit = require("twit");
var config = require('./config');
var T = new Twit(config);

//keepTweeting();
setInterval(keepTweeting, 1000*60*10);

function keepTweeting(){
	var trendQ;
	function findTrendData(err, data, response) {
	  var d = data[0];
	  var trends = d['trends']
	  trendQ = trends[0].query;
	  //console.log(trendQ);
	  T.get('search/tweets', { q: trendQ, count: 1, result_type: 'popular' }, function(err, data, response) 
	  {
		var tweet = "From @" + data.statuses[0].user.screen_name + ": " + data.statuses[0].text;
		console.log(tweet);
		T.post('statuses/update', {status: tweet}, function (err, data, response)
		{
			if (err)
				console.log("Did not post.");
			else{
				console.log("Posted!");
		}
		})
	  })
	}
	T.get('trends/place', { id: 1 }, findTrendData);
}