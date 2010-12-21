// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults

$(document).ready(function() {



    function showDeletePost()
    {
        //humanMsg.displayMsg("Calendar Event Deleted");

        $('#pageinfo').load("/ #pageinfo");
        return false;
    }
    $("input:text:visible:first").focus();
    $('.delete-icon').bind('ajax:success', function() {
        //$(this).closest('tr').animate({"color": '#555555'}, 'slow');
        $(this).closest('tr').fadeOut("linear", showDeletePost);
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
                        zoom:                   15,
                        markers:                [{latitude: lat, longitude: lon}],
                        scrollwheel:            false,
                        maptype:                G_NORMAL_MAP,
                        icon:
                        {
                            shadowsize:         false,
                            iconanchor:         [9,34],
                            infowindowanchor:   [8, 2]
                        }
                    };

        $(this).gMap(options);
      });

     //Step: 1 set hover event on all the 'where' class divs
         $('a[id^="map-"]').fancybox({
		    'hideOnContentClick': false,
		    'onComplete':function() {
		    $("#fancybox-wrap").hover(function() {
			    $("#fancybox-title").show();
		    }, function() {
			    $("#fancybox-title").hide();
		    });
	    }
     });
     $(".map-icon").hide();
     $('a[id^="map-"]').hover(

        function() { $(this).next('.map-icon').show(slow);},
        function() { $(this).next('.map-icon').hide(slow);}
//         $(this).next().hide(slow);
     );





});

