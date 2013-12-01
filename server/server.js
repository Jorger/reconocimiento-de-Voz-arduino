var io = require("socket.io").listen(8080, {log: false});
var five = require("johnny-five");
var board = new five.Board();
var LEDPIN = 9;
var OUTPUT = 1;
var palabra = "";
var esta_sonando = false;

board.on("ready", function()
{
	console.log("Otra: " + palabra);
});

io.on("connection", function(socket)
{
	socket.on("newUser", function(data)
	{
		console.log("Llega: " + data.id);
	});
	socket.on("msg", function(data)
	{	
		palabra = data.p;
		//console.log("La palabra es: " + palabra);
	  	console.log("Ingresa con: " + palabra);
	  	var val = 0;
	  	// Set pin 13 to OUTPUT mode
	  	board.pinMode(LEDPIN, OUTPUT);
	  	board.loop(10, function()
 		{
    		if(palabra.toLowerCase() == "detiene" && esta_sonando == true)
	  		{
	  			board.digitalWrite(LEDPIN, 0);
	  			esta_sonando = false;
	  		}
	  		else
	  		{
	    		if(palabra.toLowerCase() == "inicia" || esta_sonando == true)
	    		{	
	    			board.digitalWrite(LEDPIN, (val = val ? 0 : 1));
	    			esta_sonando = true;
	    		}
	    	}
  		});
	});
});