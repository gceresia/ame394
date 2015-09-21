var http = require('http');
var url = require('url');
var querystring = require ( 'querystring' );
var fr = function ( n ) {
	if ( n == 2 )  {
		return [ 0 , 1 ];
	} else if ( n == 1 ) {
		return [0];
	} else {
		var x = fr ( n - 1);
		x[x.length] = x[x.length - 1] + x[x.length - 2];
		return x;
	}
}

var callback = function ( req , res ) {

	
	var query = url.parse(req.url).query;
	var route = req.url.split("?")[0];
	var params = querystring.parse( query );

	console.log( req.url );
	console.log( route );
	console.log( params );

	res.writeHead ( 200 , { 'Content-Type': 'text/plain' } );

	if ( route == "/addNumbers" ) {
		var r = parseFloat(params.a) + parseFloat(params.b);
		res.end ( 'The result is: ' + r + '\n' );
	} else if ( route == "/greaterOf" ) {
		var v1 = parseFloat(params.a);
		var v2 = parseFloat(params.b);
		
		if ( v1 > v2 ) {
			res.end ( "The Result is: " + v1 + "\n" )
		}
		if (v1 < v2 ) {
			res.end ( "The Result is: " + v2 + "\n" )
		}
		if ( v1 == v2 ) {
			res.end ( "They are equal.............." )
		}
		
	} else if ( route == "/fib" ) {
		
		//To access: http://127.0.0.1:1337/fib?a=10
		
		
		var x = fr(parseFloat(params.a) );
		res.end ( "Result: " + x + "\n" );
	} else  {
		res.end ("Hello World" );
	}
	
}
var server = http.createServer(callback)

server.listen(1337, "127.0.0.1");
console.log('Server running at http://127.0.0.1:1337/');




/*http.createServer(function (req, res) {
	res.writeHead(200, {'content-Type': 'text/plain'});
	res.end('Hello World\n');
}).listen(1337, '127.0.0.1');
console.log('server running at http://127.0.0.1:1337/');*/
