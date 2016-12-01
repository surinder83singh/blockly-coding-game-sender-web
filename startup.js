'use strict';

/** @define {string} Application ID used when running the sender. */
var APP_ID = '6BC4D834';

// Global reference to game session manager for console debugging.
var gameManagerClient = null;

// Makes it easier to specify a SpritedemoMessageType in the console.
var MessageType = BlocklyCodingGame.MessageType;


/**
* Request a cast session when Cast Sender API loads.
* @param {boolean} loaded
* @param {Object} errorInfo
*/
window['__onGCastApiAvailable'] = function(loaded, errorInfo) {
	if (!loaded) {
		console.error('### Cast Sender SDK failed to load:');
		console.dir(errorInfo);
		return;
	}

	BlocklyCodingGame.sender.setup(APP_ID, onSessionReady);
};


/**
* Callback when a cast session is ready. Connects the game manager.
* @param {!chrome.cast.Session} session
* @private
*/
var onSessionReady = function(session) {
	console.log('### Creating game manager client.');
	chrome.cast.games.GameManagerClient.getInstanceFor(session, function(result) {
		console.log('### Game manager client initialized!');
		gameManagerClient = result.gameManagerClient;
		//cast.games.common.sender.debugGameManagerClient(gameManagerClient);

		console.log('### Sending AVAILABLE message.');
		gameManagerClient.sendPlayerAvailableRequest(null, null, null);
		//help();
	},
	function(error) {
		console.error('### Error initializing the game manager client: ' + error.errorDescription + ' Error code: ' + error.errorCode);
	});
};


/**
* Sends a test message to the receiver.
* @export
*/
var sendTestMessage = function() {
	if (!gameManagerClient) {
		return;
	}
	var message = new BlocklyCodingGame.Message(BlocklyCodingGame.MessageType.MOVE);
	gameManagerClient.sendGameMessage(message);
};


var steps = [];
$(".game-action").on("click", function(){
	if (!gameManagerClient)
		return;

	var type = $(this).data("type");
	console.log("type", type)
	if(type == "START"){
		var message = new BlocklyCodingGame.Message(BlocklyCodingGame.MessageType[type]);
		gameManagerClient.sendGameMessage(message);
	}else if(type == "FINISH"){
		steps.push(BlocklyCodingGame.MessageType.FINISH);
		var message = new BlocklyCodingGame.Message(BlocklyCodingGame.MessageType.STEPS);
		message.steps = [].concat(steps);
		steps = [];
		//console.log("message", message.steps.join(","))
		gameManagerClient.sendGameMessage(message);
	}else{
		steps.push(BlocklyCodingGame.MessageType[type]);
		console.log("steps", steps)
	}
});

/*

$(".game-action").on("click", function(){
    if (!gameManagerClient)
		return;

	var type = $(this).data("type");

	var message = new BlocklyCodingGame.Message(BlocklyCodingGame.MessageType[type]);
	$("#message").html("TYPE:" + type+": "+message.type)
	gameManagerClient.sendGameMessage(message);
});
/*
commandDocs.add('sendTestMessage() - This function creates a new ' +
	'BlocklyCodingGame.Message(), which is a container created ' +
	'specifically for the needs of this cast application. It then ' +
	' sends the message to the receiver using the ' +
	' sendGameMessageWithPlayerId function in GameManagerClient.');
*/

