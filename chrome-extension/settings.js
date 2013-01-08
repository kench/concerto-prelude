goog.provide('concerto.player.Settings');
goog.provide('concerto.player.pages.Settings');

goog.require('goog.dom');
goog.require('goog.events');

/**
 * Player Settings.
 *
 * @param {string} id Screen identifier.  MAC address for version 1, ID number for version 2.
 * @param {string} url Concerto server URL.
 * @param {number} version Concerto server version.
 * @constructor
 */
concerto.player.Settings = function(id, url, version) {
	/**
	 * Screen identifier
	 * @type {string}
	 */
	this.screen_id = id;
	
	/**
	 * Server URL
	 * @type {string}
	 */
	this.server_url = url;
	
	/**
	 * Server version
	 * @type {number}
	 */
	this.server_version = version;
};
goog.exportSymbol('concerto.player.Settings', concerto.player.Settings);

/**
 * Save Player settings to localStorage.
 */
concerto.player.Settings.save = function() {
	localStorage["screen_id"] = this.screen_id;
	localStorage["server_url"] = this.server_url;
	localStorage["server_version"] = this.server_version;
}

/**
 * Load Player settings from localStorage.
 */
concerto.player.Settings.load = function() {
	this.screen_id = localStorage["screen_id"];
	this.server_url = localStorage["server_url"];
	this.server_version = localStorage["server_version"];
}

// Google Chrome Packaged Apps CSP restricts inline scripting.
({
	var page = new concerto.player.pages.Settings();
	goog.events.listen(document, goog.events.EventType.LOAD, this.openEditor, page.load);
})();

/**
 * Player Settings Page.
 *
 * @constructor
 */
concerto.player.pages.Settings = function() {
	this.el_label_id = goog.dom.query("label[for=mac]");
	this.el_input_id = goog.dom.query("#mac");
	this.el_input_url = goog.dom.query("#url");
	this.el_input_version = goog.dom.query("#version");
};
goog.exportSymbol('concerto.player.Settings', concerto.player.Settings);

concerto.player.pages.Settings.load = function() {
	var handler_label = setIDLabel(this.el_label_id, this.el_input_id);
	populate_form(this.el_input_id, this.el_input_url, this.el_input_version);
	handler_label();
	goog.events.listen(this.el_input_version, goog.events.EventType.CHANGE, funct_label);
};

/**
 * Set up proper input names for the screen identifier.
 * @param {ELement=} label Label element describing the form input
 * @param {ELement=} input Input element for screen identifier
 */
concerto.player.pages.Settings.setIDLabel = function(label, input) {
	if (this.server_version == 1)
	{
		goog.dom.setTextContent(label, "MAC Address");
		goog.dom.setProperties(input, {"placeholder": "0F:DE:AD:BE:EF"});
	}
	else if (this.server_version == 2)
	{
		goog.dom.setTextContent(label, "Screen ID");
		goog.dom.setProperties(input, {"placeholder": "1"});
	}
}

/**
 * Populate settings form.
 * @param {string} id Screen identifier.  MAC address for version 1, ID number for version 2.
 * @param {string} url Concerto server URL.
 * @param {number} version Concerto server version.
 */
concerto.player.pages.Settings.populate_form = function(id, url, version)
{
	goog.dom.setProperties(id, {"value": this.screen_id});
	goog.dom.setProperties(url, {"value": this.server_url});
	goog.dom.setProperties(version, {"value": this.server_version});
};
