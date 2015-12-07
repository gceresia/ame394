var url = require('url'); /* expose url object to var url */
var querystring = require('querystring'); 

var jsonObj = require("./feed.json");
for (var i = 0; i < jsonObj.length - 1; i++)
{
  jsonObj[i].date = new Date(jsonObj[i].date).getTime();
}

var express = require("express"),
app = express();
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');
var methodOverride = require('method-override');
var hostname = process.env.HOSTNAME || 'localhost';
var port = 8080;

app.get("/", function (req, res) {
    res.redirect("/index.html");
});

app.get("/getSortedJSON", function (req, res) {
  var query = url.parse(req.url).query;
  var params = querystring.parse(query);
  var alg = params.alg || "bubble";
  var key = params.key || "id";
  var result = [];
  
  if(alg === "bubble"){
    result = bubbleSort(key); 
  }
  else if(alg === "insertion"){
    result = insertionSort(key); 
  }
  else if(alg === "selection"){
    result = selectionSort(key); 
  }
  res.send(JSON.stringify(result));
  res.end();
});

app.use(methodOverride());
app.use(bodyParser());
app.use(express.static(__dirname + '/public'));
app.use(errorHandler());

console.log("Simple static server listening at http://" + hostname + ":" + port);
app.listen(port);



function insertionSort(key)
{
	var arr = jsonObj;
	for (var i = 1; i < arr.length; i++) {
	// a temporary copy of the current element
		var tmp = arr[i];
	    var j;
	    // find the position for insertion
	    for (j = i; j > 0; j--) {
	    	if (arr[j - 1][key] < tmp[key]) {
	     		break;
			}
	            // shift the sorted part to right
	    	arr[j] = arr[j - 1];
		}
	    // insert the current element
	    arr[j] = tmp;
	}
  return arr;
}

function bubbleSort(key)
{
	var arr = jsonObj;
	{
	    for (var i = arr.length - 1; i >= 0; i--)
	    {
	        // bubble up
	        for (var j = 0; j <= i - 1; j++)
	        {
	            if (arr[j][key] > arr[j + 1][key])
					var temp = arr[j];
					arr[j] = arr[j+1];
					arr[j+1] = temp;
	        }
	    }
	}
  return arr;
}

function selectionSort(key)
{
  var arr = jsonObj;
  for (var i = 0; i < arr.length - 1; i++)
    {
        var min = i;  // record the position of the smallest
        for (var j = i + 1; j < arr.length; j++)
        {
        // update min when finding a smaller element
        if (arr[j][key] < arr[min][key])
            min = j;
        }
 
        // put the smallest element at position i
        var temp = arr[i];
        arr[i] = arr[min];
        arr[min] = temp;
    }
  return arr;
}


console.log(selectionSort("id"));
//console.log(insertionSort("date"));
//console.log(bubbleSort("title"));
//console.log(bubbleSort("id"));