goog.provide('concerto.player.pages.Settings');

goog.require('concerto.player.Settings');

/**
 * Player Settings Page.
 *
 * @constructor
 */
concerto.player.pages.Settings = function() {
	this.el_label_id = goog.dom.query("label[for=mac]");
	this.el_input_id = goog.dom.getElement("mac");
	this.el_input_url = goog.dom.getElement("url");
	this.el_input_version = goog.dom.getElement("version");
};
goog.exportSymbol('concerto.player.Settings', concerto.player.Settings);

concerto.player.pages.Settings.prototype.load = function() {
	var handler_label = this.setIDLabel(this.el_label_id, this.el_input_id);
	this.populate_form(this.el_input_id, this.el_input_url, this.el_input_version);
	handler_label();
	goog.events.listen(this.el_input_version, goog.events.EventType.CHANGE, funct_label);
};

/**
 * Set up proper input names for the screen identifier.
 * @param {ELement=} label Label element describing the form input
 * @param {ELement=} input Input element for screen identifier
 */
concerto.player.pages.Settings.prototype.setIDLabel = function(label, input) {
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
concerto.player.pages.Settings.prototype.populate_form = function(id, url, version)
{
	goog.dom.forms.setValue(id, this.screen_id);
	goog.dom.forms.setValue(url, this.server_url);
	goog.dom.forms.setValue(version, this.server_version);
};

// Google Chrome Packaged Apps CSP restricts inline scripting.
(function() {
	var page = new concerto.player.pages.Settings();
	goog.events.listen(window, goog.events.EventType.LOAD, page.load);
})();