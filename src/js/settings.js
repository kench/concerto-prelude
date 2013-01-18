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
goog.exportProperty(concerto.player.Settings, 'screen_id', concerto.player.Settings.screen_id);
goog.exportProperty(concerto.player.Settings, 'server_url', concerto.player.Settings.server_url);
goog.exportProperty(concerto.player.Settings, 'server_version', concerto.player.Settings.server_version);

/**
 * Save Player settings to localStorage.
 */
concerto.player.Settings.prototype.save = function() {
  localStorage['screen_id'] = this.screen_id;
  localStorage['server_url'] = this.server_url;
  localStorage['server_version'] = this.server_version;
};
goog.exportSymbol('concerto.player.Settings.save', concerto.player.Settings.prototype.save);

/**
 * Load Player settings from localStorage.
 */
concerto.player.Settings.prototype.load = function() {
  this.screen_id = localStorage['screen_id'];
  this.server_url = localStorage['server_url'];
  this.server_version = localStorage['server_version'];
};
goog.exportSymbol('concerto.player.Settings.load', concerto.player.Settings.prototype.load);

/**
 * Get frontend url from settings
 */
concerto.player.Settings.prototype.url = function() {
  if (this.server_version == 1) {
    return this.server_url + '/screen/?mac=' + this.screen_id;
  } else if (this.server_version == 2) {
    return this.server_url + '/frontend/' + this.screen_id;
  } else {
    return null;
  }
  this.screen_id = localStorage['screen_id'];
  this.server_url = localStorage['server_url'];
  this.server_version = localStorage['server_version'];
};
goog.exportSymbol('concerto.player.Settings.url', concerto.player.Settings.prototype.url);