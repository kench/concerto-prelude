goog.provide('concerto.player.pages.Home');

goog.require('concerto.player.Settings');
goog.require('goog.events');
goog.require('goog.dom');
goog.require('goog.dom.query');
goog.require('goog.net.XhrIo');

/**
 * Player Settings Page.
 *
 * @constructor
 */
concerto.player.pages.Home = function() {};
goog.exportSymbol('concerto.player.Settings', concerto.player.Settings);

/**
 * Keypress handler
 */
concerto.player.pages.Home.keypress = function(e) {
  if (e.keyCode == 67) {
    window.location = 'settings.html'; // Configuration page.
  } else if (e.keyCode == 65) {
    // TODO: Automatic configuration.
  } else if (e.keyCode == 76) {
    // Redirect.
    var config = new concerto.player.Settings();
    config.load();
    window.location = config.url();
  }
};

concerto.player.pages.Home.message_loop = function() {
  if (!sessionStorage.message_id) {
    $('#status_message').html('Not configured.');
    sessionStorage.message_id = 1;
  } else {
    if (sessionStorage.message_id == 0) {
      $('#status_message').html('Not configured.');
      sessionStorage.message_id = 1;
    } else if (sessionStorage.message_id == 1) {
      $('#status_message').html('Please connect a keyboard.');
      sessionStorage.message_id = 2;
    } else if (sessionStorage.message_id == 2) {
      $('#status_message').html('Press C to start the configuration wizard.');
      sessionStorage.message_id = 3;
    } else if (sessionStorage.message_id == 3) {
      $('#status_message').html('Press A to attempt automatic configuration.');
      sessionStorage.message_id = 0;
    } else {
      sessionStorage.message_id = 0;
    }
  }
};

concerto.player.pages.Home.redirect = function() {
  if (navigator.onLine) {
    var config = new concerto.player.Settings();
    config.load();
		// Check for HTTP 200 at the destination.  This only works within the Chrome application.
		goog.net.XhrIo.send(config.url(), function(e) {
			var xhr = e.target;
			var resp = xhr.getStatus();
			if (resp < 400) { // Any non-error HTTP response codes.
				window.location = config.url();
			} else { // HTTP response codes > 400
				// Display status message and refresh.
				var div = goog.dom.getElement('status-message');
				goog.dom.setTextContent(div, 'Unable to contact Concerto server.  Please check configuration.');
				setInterval(function() {window.location.reload(true)}, 10000);
			}
		});
		window.location = config.url(); // We have no way of testing the correctness of the server config.  Blindly redirect.
  } else {
    window.location.reload(true)
  }
};

concerto.player.pages.Home.load = function() {
  var properties = {'id' : 'status-message'};
  var div = goog.dom.createDom('div', properties, 'Initializing...');
  goog.dom.appendChild(goog.dom.getElement('container'), div);
  
  goog.events.listen(document, goog.events.EventType.KEYUP, concerto.player.pages.Home.keypress);
    
  var config = new concerto.player.Settings();
  
  config.load();
  
  if (config.url() == null) {
    window.location = 'settings.html';
  } else if (!navigator.onLine) {
    goog.dom.setTextContent(div, 'No internet connectivity.');
    
    // This isn't working.
    //goog.events.listen(document, goog.events.EventType.ONLINE, concerto.player.pages.Home.redirect);
    setInterval(function() {window.location.reload(true)}, 10000);
  } else {
    setInterval(concerto.player.pages.Home.redirect, 5000);
  }
};
goog.exportSymbol('concerto.player.Settings.load', concerto.player.Settings.load);

(function() {
  goog.events.listen(window, goog.events.EventType.LOAD, concerto.player.pages.Home.load);
})();