// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults

$(document).ready(function() {



    function showDeletePost()
    {
        $('#pageinfo').load("/ #pageinfo");
        return false;
    }

    $('#signin-link').colorbox({inline:true, href: function() {
                                               return $(this).attr('href');
                                               }});


/*    $('#signin-link').fancybox({
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
	});*/

    $("input:text:visible:first").focus();
    $('.delete-icon').bind('ajax:success', function() {
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

     //Populating all the event notifiers and their timestamps

     //Opening relevant notification popups
     setInterval(function()
     {
         var d = new Date();
         var ds = d.getTime();
         var sds = ds.toString().substring(0,10);
         //Check if the milisecond matches with stamped values
           $("#feed_item_today :input").each( function() {
               elemVal = $(this).val();
                if(elemVal == sds)
                {
                    msg=$(this).attr('name');
                    //humanMsg.displayMsg("Reminder : " + $(this).attr('name'));
                    $.pnotify({
						pnotify_title: 'Reminder',
						pnotify_text: msg,
						pnotify_opacity: .8
					});
                }
         });
     }, 1000); //Bug - run Every second to make sure miliseconds are in sync


     //Step: 1 set hover event on all the 'where' class divs
     $('a[rel^="map-"]').colorbox({inline:true, href: function() {
                                               return "#"+$(this).attr('rel');
                                               }});
     $(".map-icon").hide();
     $('a[rel^="map-"]').hover(

        function() { $(this).next('.map-icon').show(slow);},
        function() { $(this).next('.map-icon').hide(slow);}
     );

     $('div[id^="map-"]').each(function() {
            var relStr = $(this).attr('title');
            var co_ords = relStr.split(',');
            lat = co_ords[0];
            lon = co_ords[1];
            loc = co_ords[2];
            var a = [loc];


            var mapstraction;
            mapstraction = new mxn.Mapstraction($(this).attr('id'),'google');
            var myPoint = new mxn.LatLonPoint(lat,lon);
            mapstraction.setCenterAndZoom(myPoint, 15);
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
//     $('a[id^="edit-form-link-"]').fancybox(); transition:'fade', speed:500}
       $('a[id^="edit-form-link-"]').colorbox({title:'Edit Calendar Entry',transition:'elastic',opacity:0.3,inline:true, href: function() {
                                               return $(this).attr('href');
                                               }});

       $('div[id^="inline-edit-form-"]').css("padding","6px");
       $('div[id^="inline-edit-form-"]').find('label').css("padding","5px");
       $('div[id^="inline-edit-form-"]').find('input').css("float","left");


});

