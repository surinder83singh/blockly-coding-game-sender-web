var BlocklyCodingGame = window.BlocklyCodingGame || {};
BlocklyCodingGame.sender = {};


/**
* A helper that sets up the cast sender SDK with console debugging information.
* @param {string} appId The app ID to create a cast session with.
* @param {function(!chrome.cast.Session)} sessionCallback Callback that is
*     called when a cast sender session is ready.
*/
BlocklyCodingGame.sender.setup = function(appId, sessionCallback) {
	console.log('### Preparing session request and cast sender API config with app ID ' + appId);
	var sessionRequest 	= new chrome.cast.SessionRequest(appId);
	var apiConfig 		= new chrome.cast.ApiConfig(sessionRequest, sessionCallback, BlocklyCodingGame.sender.setup.onCastReceiverChanged);

	console.log('### Initializing cast sender API and requesting a session.');
	chrome.cast.initialize(apiConfig, BlocklyCodingGame.sender.setup.onCastInit, BlocklyCodingGame.sender.setup.onCastError);
};


/**
* Callback when there is a receiver change. When the receiver is available, the
* user can click on the chromecast button, which will create a session (and
* call the sessionCallback passed in #setup).
* @param {!chrome.cast.ReceiverAvailability} receiverAvailability
* @private
*/
BlocklyCodingGame.sender.setup.onCastReceiverChanged = function(receiverAvailability) {
	if (receiverAvailability == chrome.cast.ReceiverAvailability.AVAILABLE) {
		console.log('\n### Click cast button in the Google Cast extension to start!\n');
	} else {
		console.log('\n### Not ready. Do NOT click cast button in the Google Cast extension.\n');
	}
};


/**
* Callback when the cast API is initialized.
* @private
*/
BlocklyCodingGame.sender.setup.onCastInit = function() {
	console.log('### Cast sender API initialized.');
};


/**
* Callback when there is a cast API error.
* @param {chrome.cast.Error} error
* @private
*/
BlocklyCodingGame.sender.setup.onCastError = function(error) {
	console.log('### Cast sender API error:');
	console.dir(error);
};
