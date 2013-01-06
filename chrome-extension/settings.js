$(function() {
	// Prepopulate fields if available
	if (!(localStorage["mac"] == undefined))
	{
		$('#mac').val(localStorage["mac"]);
	}
	if (!(localStorage["serverEndpoint"] == undefined))
	{
		$('#endpoint').val(localStorage["serverEndpoint"]);
	}
	if (!(localStorage["serverVersion"] == undefined))
	{
		$('#version').val(localStorage["serverVersion"]);
	}
	$("#settings").submit(function()
	{
		Concerto.settings.set($('#mac').val(), $('#endpoint').val(), parseInt($('#version').val()));
	});
	$("#version").change(function(e){
		if ($(e.target).val() == 1)
		{
			$("label[for='mac']").text("MAC Address");
			$("input#mac").attr("placeholder", "0F:DE:AD:BE:EF");
		}
		else
		{
			$("label[for='mac']").text("Screen ID");
			$("input#mac").attr("placeholder", "1");
		}
	});
});

var Concerto = {};
Concerto.settings = {};

Concerto.settings.set = function(mac_address, server_url, version)
{
	localStorage["mac"] = mac_address;
	localStorage["serverEndpoint"] = server_url;
	localStorage["serverVersion"] = version;
	localStorage["haveConfiguration"] = true;
}