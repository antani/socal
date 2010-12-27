// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults

$(document).ready(function() {



    function showDeletePost()
    {
        //humanMsg.displayMsg("Calendar Event Deleted");

        $('#pageinfo').load("/ #pageinfo");
        return false;
    }

    $('#signin-link').fancybox({
		'transitionIn'	:	'elastic',
		'transitionOut'	:	'elastic',
		'speedIn'		:	600,
		'speedOut'		:	200,
		'overlayShow'	:	true,
		'padding'       :   10,
		'opacity'       :   true,
		'overlayOpacity':   0.2,
		'titlePosition' : 'outside',
		'showCloseButton' : false
	});

    $("input:text:visible:first").focus();
    $('.delete-icon').bind('ajax:success', function() {
        //$(this).closest('tr').animate({"color": '#555555'}, 'slow');
        $(this).closest('tr').fadeOut("linear", showDeletePost);
    });
    $('#feed_item_today,#feed_item_past,#feed_item_tomorrow').find('tbody tr').each(function() {
        if($(this).attr('rel')=='true'){
              $(this).fadeTo("slow",0.4);
              $(this).find(".event-span").find("a").css("textDecoration","line-through");

        }
    });
    $('.done-icon').bind('ajax:success', function() {
        var currentVal = $(this).closest('tr').attr('rel');

        if (currentVal=='false')
        {
            $(this).closest('tr').attr('rel','true');
            $(this).closest('tr').fadeTo("slow", 0.4).find(".event-span").find("a").css("textDecoration","line-through");;
        }
        else
        {
            $(this).closest('tr').attr('rel','false');
            $(this).closest('tr').fadeTo("slow", 1).find(".event-span").find("a").css("textDecoration","none");;
        }
    });


    //Add "selected" class to any selected inputbox
    $("input:text,input:password").focus(function(){
        // Select field contents
        $(this).addClass("selected-input");
    });
    $("input:text,input:password").blur(function(){
        // Select field contents
        $(this).removeClass("selected-input");
    });

    $('form').submit(function () { // optional: replace "form" with whatever CSS selector you want (ex: ID or class)
        $('input[type="submit"]', this).replaceWith('<p><strong>Please wait...</strong></p>'); // optional: change "Sending..." to something else
    });

    //Hide the error messages automatically
    setTimeout(hideFlashMessages, 10000);
    function hideFlashMessages() {
      $('#flash_alert,#flash_success').fadeOut(2000)
    }

    //Add jqueryUI dialog on edit calendar form
    $( "#editcal" ).dialog({
            autoOpen: false,
			height: 300,
			width: 350,
			modal: true,
			buttons: {
				"Ok": function() {},
				Cancel: function() {
					$( this ).dialog( "close" );
				}
			},
			close: function() {
				allFields.val( "" ).removeClass( "ui-state-error" );
			}});

//    $("select").styleSelect();

/*    $( "#feed_items_all a" ).click(function(){
        alert("opening");
        $( "#editcal" ).dialog( "open" );
        //event.preventDefault;
        return false;
    });*/


//   $( "#feed_items_all a" )
//			.click(function()
//			    alert("opening");
//				$( "#editcal" ).dialog( "open" );
//				return false;
//            }
			//});

     //Populating all the event notifiers and their timestamps

     //Opening relevant notification popups
     setInterval(function()
     {
         var d = new Date();
//         var ds = new String(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes()));
         var ds = d.getTime();
         //alert(ds);
         var sds = ds.toString().substring(0,10);
         //var allInputs = $(":input");
         /*for(i=0;i<allInputs.length; i++)
         {
            elem = allInputs[i];
            //alert($(elem).val());
            //alert(ds);
            elemVal = $(elem).val();
            if(elemVal == ds)
            {
                humanMsg.displayMsg("Reminder : " + $(elem).attr('name'));

            }
         }*/
//         1292764500
//         129276462
//         1292764620
//           $("#error").html(sds);
         //alert(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), d.getUTCHours(), d.getUTCMinutes() ));
         //Check if the milisecond matches with stamped values
           $("#feed_item_today :input").each( function() {
//               $("#error").html(sds);
               elemVal = $(this).val();
               //alert(ds);
                if(elemVal == sds)
                {

//                    $(this).addClass("selected-input");
                    humanMsg.displayMsg("Reminder : " + $(this).attr('name'));
                    //do not consider this element again.

                }
         });
     }, 1000); //Bug - run Every second to make sure miliseconds are in sync

     //Add gMap to the div
     $('div[id^="map-"]').each(function() {
        var relStr = $(this).attr('rel');
        var co_ords = relStr.split(',');
        lat = co_ords[0];
        lon = co_ords[1];
        options = {
                        latitude:               lat,
                        longitude:              lon,
                        zoom:                   12,
                        markers:                [{latitude: lat, longitude: lon, html: "_latlng"},{ address: "Taj Mahal Agra",html: "_address" }],

                        scrollwheel:            false,
                        maptype:                G_NORMAL_MAP,
                        icon:
                        {
                            shadowsize:         false,
                            iconanchor:         [9,34],
                            infowindowanchor:   [8, 2]
                        }
                    };
        //options = {markers : [{ address: "Tettnang, Germany", html: "The place I live" }],
        //           zoom:15

        // }

        //$(this).gMap(options);
      });

     //Step: 1 set hover event on all the 'where' class divs
     $('a[id^="map-"]').fancybox();
    //$('a[id^="map-"]').ceebox();

     $(".map-icon").hide();
     $('a[id^="map-"]').hover(

        function() { $(this).next('.map-icon').show(slow);},
        function() { $(this).next('.map-icon').hide(slow);}
//         $(this).next().hide(slow);
     );

     $('div[id^="map-"]').each(function() {
            var relStr = $(this).attr('rel');
            var co_ords = relStr.split(',');
            lat = co_ords[0];
            lon = co_ords[1];
            var mapstraction;
            mapstraction = new mxn.Mapstraction($(this).attr('id'),'google');
            var myPoint = new mxn.LatLonPoint(lat,lon);
            mapstraction.setCenterAndZoom(myPoint, 12);
            mapstraction.addControls({
                                        pan: true,
                                        zoom: 'small',
                                        map_type: true
                                    });
            // create a marker positioned at a lat/lon
            my_marker = new mxn.Marker(myPoint);
            my_marker.setIcon('http://mapstraction.com/icon.gif');
            // display marker
            mapstraction.addMarker(my_marker);
     }
     );
});

