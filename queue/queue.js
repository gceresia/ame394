/* 
enqueue	queue
[a]		[b,c,d]
[a]*[b,c,d]
result: queue
[a,b,c,d]
peek last value

initialize queue [a,b,c,d]
enqueue [x]
dequeue 
enqueue [y]
enqueue [z]
peek



*/


var queue = {
    content: [],
	init: function (initStack) {
		queue.content = initStack;
	},
	enqueue: function ( item ) {
		queue.content = item.concat(queue.content);
	},
	dequeue: function() {
		if ( queue.content != null ) {
			var x = queue.content[queue.content.length-1];
			queue.content = queue.content.splice(0,queue.content.length - 1);
			return x;
		} else {
			return "null";
		}
	},
	peek: function() {
		return (queue.content[queue.content.length-1]);
	}
}

console.log ("Initalize stack with a,b,c,d")
queue.init(["a","b","c","d"]);
console.log ( "Stack= " + queue.content );

console.log ("Enqueue x");
queue.enqueue(["x"]);
console.log ("stack= " + queue.content );

console.log ( "Dequeue stack")
console.log ( "Dequeue= " + queue.dequeue() );
console.log ("Stack= " + queue.content );

console.log ( "Enqueue y, then enqueue z")
queue.enqueue(["y"]);
queue.enqueue(["z"]);
console.log ("Stack= " + queue.content );

console.log ("Peek stack");
console.log ("Peek= " + queue.peek() );
console.log ("Stack= " + queue.content );



/*
Priority queue implementation
one queue for each priority
*/

