goog.provide('concerto.player.pages.Settings');

goog.require('concerto.player.Settings');

/**
 * Player Settings Page.
 *
 * @constructor
 */
concerto.player.pages.Settings = function() {
	this.settings = new concerto.player.Settings();
	this.settings.load();
};
goog.exportSymbol('concerto.player.Settings', concerto.player.Settings);

concerto.player.pages.Settings.prototype.load = function() {
	this.el_label_id = goog.dom.query("label[for=mac]")[0];
	this.el_input_id = goog.dom.getElement("mac");
	this.el_input_url = goog.dom.getElement("endpoint");
	this.el_input_version = goog.dom.getElement("version");
	this.el_submit = goog.dom.getElement("save");
	
	// Dynamically change label/placeholder on screen ID based on Concerto version.
	var handler_label = goog.bind(function(){ this.setIDLabel(this.el_label_id, this.el_input_id)}, this);
	this.populate_form(this.settings.screen_id, this.settings.server_url, this.settings.server_version);
	handler_label();
	goog.events.listen(this.el_input_version, goog.events.EventType.CHANGE, handler_label);
	
	// Populate form.

	var handler_submit = goog.bind(function(){
		this.settings.screen_id = goog.dom.forms.getValue(this.el_input_id);
		this.settings.server_url = goog.dom.forms.getValue(this.el_input_url);
		this.settings.server_version = goog.dom.forms.getValue(this.el_input_version);
		this.settings.save();
	}, this);
	// Save changes to screen configuration on exit.
	goog.events.listen(this.el_submit, goog.events.EventType.CLICK, handler_submit);
};

/**
 * Set up proper input names for the screen identifier.
 * @param {ELement=} label Label element describing the form input
 * @param {ELement=} input Input element for screen identifier
 */
concerto.player.pages.Settings.prototype.setIDLabel = function(label, input) {
	var server_version = goog.dom.forms.getValue(this.el_input_version);
	if (server_version == 1)
	{
		goog.dom.setTextContent(label, "MAC Address");
		goog.dom.setProperties(input, {"placeholder": "0F:DE:AD:BE:EF"});
	}
	else if (server_version == 2)
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
	goog.dom.forms.setValue(this.el_input_id, id);
	goog.dom.forms.setValue(this.el_input_url, url);
	goog.dom.forms.setValue(this.el_input_version, version);
};

// Google Chrome Packaged Apps CSP restricts inline scripting.
(function() {
	var page = new concerto.player.pages.Settings();
	goog.events.listen(window, goog.events.EventType.LOAD, goog.bind(page.load, page));
})();