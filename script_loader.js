function loadScriptsNoCache(paths) {
	if (paths.length == 0) {
		return;
	}

	// Load the first path in the array, shift it, and call loadScriptsNoCache
	// again with the shifted path array when the script loads.
	var fileRef = document.createElement('script');
	fileRef.setAttribute('type', 'text/javascript');
	var path = paths.shift();
	var separator = path[path.length - 1] == '?' ? '&' : '?';
	fileRef.setAttribute('src', path + separator + 'ts=' + Date.now());
	fileRef.onload = function() {
		loadScriptsNoCache(paths);
	};

	document.getElementsByTagName('head')[0].appendChild(fileRef);
}

loadScriptsNoCache([
	'../../common/jquery-3.1.1.min.js',
	'//www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadGamesSDK&',
	'../../common/message.js',
	'sender.js',
	'startup.js'
]);
