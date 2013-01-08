goog.provide('concerto.player.Settings');

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
concerto.player.Settings.prototype.save = function() {
	localStorage["screen_id"] = this.screen_id;
	localStorage["server_url"] = this.server_url;
	localStorage["server_version"] = this.server_version;
};

/**
 * Load Player settings from localStorage.
 */
concerto.player.Settings.prototype.load = function() {
	this.screen_id = localStorage["screen_id"];
	this.server_url = localStorage["server_url"];
	this.server_version = localStorage["server_version"];
};