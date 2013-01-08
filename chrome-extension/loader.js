var concerto = concerto || new Object();
concerto.player = concerto.player || new Object();

concerto.player.keypress = function(e)
{
	//console.log("Key pressed.");
	if (e.which == 67)
	{
		window.location = "settings.html"; // Manual configuration page.
	}
	else if (e.which == 65)
	{
		/* Automatic configuration.
    		 * Change localStorage["serverEndpoint"] to the URL of your Concerto installation.
		 *
		 */
		//localStorage["mac"] = "2421522B50";
		if (window.location.hash != '')
		{
			localStorage["mac"] = window.location.hash.substring(1);
		}
		localStorage["serverEndpoint"] = "http://concerto.rpi.edu/screen/";
		localStorage["serverVersion"] = "1";
		localStorage["haveConfiguration"] = "true";
		$("#status_message").html("Automatic configuration complete.  Reloading.");
		setTimeout(location.reload(true), 2000);
	}
}

concerto.player.message_loop = function()
{
	if (!sessionStorage.message_id)
	{
		$("#status_message").html("Not configured.");
		sessionStorage.message_id = 1;
	}
	else
	{
		if (sessionStorage.message_id == 0)
		{
			$("#status_message").html("Not configured.");
			sessionStorage.message_id = 1;
		}
		else if (sessionStorage.message_id == 1)
		{
			$("#status_message").html("Please connect a keyboard.");
			sessionStorage.message_id = 2;
		}
		else if (sessionStorage.message_id == 2)
		{
			$("#status_message").html("Press C to start the configuration wizard.");
			sessionStorage.message_id = 3;
		}
		else if (sessionStorage.message_id == 3)
		{
			$("#status_message").html("Press A to attempt automatic configuration.");
			sessionStorage.message_id = 0;
		}
		else
		{
			sessionStorage.message_id = 0;
		}
	}
}

concerto.player.is_resolution = function(width, height)
{
	// Resolution tolerance of 5%
	var tolerance = .005;
	var height_t = height * tolerance;
	var width_t = width * tolerance;
	var lb_height = height - height_t;
	var ub_height = height + height_t;
	var lb_width = width - width_t;
	var ub_width = width + width_t;
	if ((screen.width < ub_width) && (screen.width > lb_width) && (screen.height > lb_height) && (screen.height < ub_height))
	{
		return true;
	}
	else
	{
		return false;
	}
}
concerto.player.redirect = function()
{
	if (localStorage["haveConfiguration"] == "true")
	{
		if (localStorage["serverVersion"] == 1)
		{
			window.location = localStorage["serverEndpoint"] + "/screen/?mac=" + localStorage["mac"];
		}
		else
		{
			window.location = localStorage["serverEndpoint"] + "/frontend/" + localStorage["mac"];
		}
	}
	else
	{
		//window.location = "settings.html"
		console.log("Not configured. Waiting to launch configuration wizard.");
		setInterval(concerto.player.message_loop, 5000);
	}
}

$(function() {
	console.log("Initializing Concerto.");
	// Detect screen dimensions/size
	if (concerto.player.is_resolution(1920, 1200))
	{
		$("body").addClass("size-1920x1200");
	}
	else if (concerto.player.is_resolution(1680, 1050))
	{
		$("body").addClass("size-1680x1050");
	}
	else if (concerto.player.is_resolution(1400, 1050))
	{
		$("body").addClass("size-1400x1050");
	}
	else
	{
		// Assume baseline resolution of 1280x1024.
		$("body").addClass("size-1280x1024");
	}
	$("body").removeClass('uninitialized');
	$("body").addClass('initialization');
	jQuery('<div/>', {
		id: 'status_message',
		text: 'Initializing...'
	}).appendTo('#container');
	$(document).keyup(concerto.player.keypress);
	//concerto.player.redirect();
});