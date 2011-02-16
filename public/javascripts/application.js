/*
* application.js
* Contains the page.load sort of code and uses jQuery.
* TODO: Is there a need to refactor some of the code in the js.erb ?
*
a[rel^="map-"]
*/

$(document).ready(function() {
    $(".input-tip").tipTip({activation:"hover",defaultPosition:"right"});
    $(".twitter-shared").tipTip({activation:"hover",defaultPosition:"right"});
    $('tr[id^="tr-"]').find('.button-td').hide();

/*    $('tr[id^="tr-"]').hover(function(){
                                       $(this).find("td[id^='slide-']").show();
                                       });
    
    $('tr[id^="tr-"]').blur(function(){
                                      $(this).find("td[id^='slide-']").hide();
                                      });
*/    
    $('tr[id^="tr-"]').live({
        mouseover: function() { $(this).find("td[id^='slide-']").show();},
        mouseout: function() {$(this).find("td[id^='slide-']").hide();}
    });

    $(".setting-icon").tipTip({activation:"hover",defaultPosition:"right"});
    $('.input-tip-bottom').tipTip({activation:"hover",defaultPosition:"bottom"});
    $("#user_timezone").tipTip({activation:"focus",defaultPosition:"right"});
    $('.setting-icon').click(function () {
         $(this).replaceWith('<p><strong>Please wait...</strong></p>'); // optional: change "Sending..." to something else
    });
    $("#tour").colorbox({iframe:true, innerWidth:425, innerHeight:344});
    $(".facebook-shared, .twitter-shared, .foursquare-shared").hide();

    $("#image, #image-in").hide();
    $("#user_email,#email-in").blur(function() {

            email = $(this).val();
            if ($(this).attr('id') == "user_email")
            {    $('#image').attr('src', 'http://www.gravatar.com/avatar/' + MD5(email));
                 $('#image').show('slow');
            }
            else
            {    $('#image-in').attr('src', 'http://www.gravatar.com/avatar/' + MD5(email));
                 $('#image-in').show('slow');
            }
 
     });

     var toggleLoading = function() { $("#loading").toggle() };

     $('.calendar_event_time').datetimepicker({timeFormat: 'hh:mm:ss', dateFormat: 'yy-mm-dd'});  
          
     $("#settings-user-form").bind("ajax:loading", $("#loading").show())
                             .bind("ajax:complete", $("#loading").hide())
                             .bind("ajax:success", function() { $("#setting-user-saved").html("Settings saved.");});

      //Handle the Ajax Delete post request	
      function showDeletePost()
      {
          $('#pageinfo').load("/ #pageinfo");
          $('#pageinfo').load("/ #feed_item_today_container");
                   
          return false;
      }

      $('#signin-link').colorbox({opacity:0.1,inline:true, href: function() {
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
        if($(this).attr('class')=='true'){
              $(this).fadeTo("slow",0.4);
              $(this).find(".event-span").find("a").css("textDecoration","line-through");

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

    $('#new_calendar').submit(function () { // optional: replace "form" with whatever CSS selector you want (ex: ID or class)
        $('input[type="submit"]', this).replaceWith('<p><strong>Please wait...</strong></p>'); // optional: change "Sending..." to something else
    });
    //Hide the error messages automatically
    setTimeout(hideFlashMessages, 10000);
    $('#setting-user-saved').hide();

    function hideFlashMessages() {
      $('#setting-user-saved,#flash_alert,#flash_success,#setting-error').fadeOut(2000);
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
						pnotify_opacity: 0.8
					});
                }
         });
         //also show the shared icons
         $(".foursquare-shared,.facebook-shared,.twitter-shared").each( function() {

            if($(this).attr('rel')=='true')
            {
                $(this).show('slow');
            }
         });

     }, 1000); //Bug - run Every second to make sure miliseconds are in sync


     //Step: 1 set hover event on all the 'where' class divs
     $('a[rel^="map-"]').colorbox({opacity:0.2,inline:true, href: function() {
                                               return "#"+$(this).attr('rel');
                                               },
                                               onComplete: function(){
                                                               $("#"+$(this).attr('rel')).each(function() {
                                                                                        $(this).css("z-index", "1");
                                                                                        var relStr = $(this).attr('title');
                                                                                        var co_ords = relStr.split(',');
                                                                                        lat = co_ords[0];
                                                                                        lon = co_ords[1];
                                                                                        loc = co_ords[2];
                                                                                        var a = [loc];


                                                                                        var mapstraction;
                                                                                        mapstraction = new mxn.Mapstraction($(this).attr('id'),'google');
                                                                                        var myPoint = new mxn.LatLonPoint(lat,lon);
                                                                                        mapstraction.setCenterAndZoom(myPoint, 16);
                                                                                        mapstraction.addControls({
                                                                                                                    pan: true,
                                                                                                                    zoom: 'large',
                                                                                                                    map_type: true
                                                                                                                });
                                                                                        // create a marker positioned at a lat/lon
                                                                                        my_marker = new mxn.Marker(myPoint);
                                                                                        var text = loc;
                                                                                        my_marker.setInfoBubble(text);
                                                                                        // display marker
                                                                                        mapstraction.addMarker(my_marker);
                                                                                 });
                                                }});


     $(".map-icon").hide();
     $('a[rel^="map-"]').hover(

        function() { $(this).next('.map-icon').show(slow);},
        function() { $(this).next('.map-icon').hide(slow);}
     );

/*     $('div[id^="map-"]').each(function() {
            $(this).css("z-index", "1");
            var relStr = $(this).attr('title');
            var co_ords = relStr.split(',');
            lat = co_ords[0];
            lon = co_ords[1];
            loc = co_ords[2];
            var a = [loc];


            var mapstraction;
            mapstraction = new mxn.Mapstraction($(this).attr('id'),'google');
            var myPoint = new mxn.LatLonPoint(lat,lon);
            mapstraction.setCenterAndZoom(myPoint, 16);
            mapstraction.addControls({
                                        pan: true,
                                        zoom: 'large',
                                        map_type: true
                                    });
            // create a marker positioned at a lat/lon
            my_marker = new mxn.Marker(myPoint);
            var text = loc;
            my_marker.setInfoBubble(text);
            // display marker
            mapstraction.addMarker(my_marker);
     }
     );*/
//     $('a[id^="edit-form-link-"]').fancybox(); transition:'fade', speed:500}
       $('a[id^="edit-form-link-"],a[id^="inline-edit-note-link-"]').colorbox({transition:'elastic',opacity:0.3,inline:true, href: function() {
                                               return $(this).attr('href');
                                               }});

       $('div[id^="inline-edit-form-"]').css("padding","6px");
       $('div[id^="inline-edit-form-"]').find('label').css("padding","5px");
       $('div[id^="inline-edit-form-"]').find('input').css("float","left");
/*       $( "#feed_item_today" ).accordion();*/

/*-----------------------------Drop down menu---------------------------------------------------------------------------------*/
 /* for keeping track of what's "open" */
  var activeClass = 'dropdown-active', showingDropdown, showingMenu, showingParent;
  /* hides the current menu */
  var hideMenu = function() {
    if(showingDropdown) {
      showingDropdown.removeClass(activeClass);
      showingMenu.hide();
    }
  };
  
  /* recurse through dropdown menus */
  $('.dropdown').each(function() {
    /* track elements: menu, parent */
    var dropdown = $(this);
    var menu = dropdown.next('div.dropdown-menu'), parent = dropdown.parent();
    /* function that shows THIS menu */
    var showMenu = function() {
      hideMenu();
      showingDropdown = dropdown.addClass('dropdown-active');
      showingMenu = menu.show();
      showingParent = parent;
    };
    /* function to show menu when clicked */
    dropdown.bind('click',function(e) {
      if(e) e.stopPropagation();
      if(e) e.preventDefault();
      showMenu();
    });
    /* function to show menu when someone tabs to the box */
    dropdown.bind('focus',function() {
      showMenu();
    });
  });
  
  /* hide when clicked outside */
  $(document.body).bind('click',function(e) {
    if(showingParent) {
      var parentElement = showingParent[0];
      if(!$.contains(parentElement,e.target) || !parentElement == e.target) {
        hideMenu();
      }
    }
  });
  /*--------------------------------------------------------------------------------------------------------------*/
//div[id^="
/*    $( 'div[id^="slider-847"]' ).slider({
            value:0 ,
            min: 0,
            max: 5,
            step: 1,
            slide: function( event, ui ) {
                    $( "#pri-487" ).val( ui.value );
            }
    });
*/
var colors = new Array();
colors[0] = "#99FF99"
colors[1] = "#99FF00"
colors[2] = "#FFCC66"
colors[3] = "#FF6600"
colors[4] = "#FF3300"
colors[5] = "#FF0000"


$('img[id^="image-down"]').bind('click',function(){
                           elementVal = $(this).attr('id').split('-');
                           priVal = parseInt($("#pri-"+elementVal[2]).attr('value'));
                           priVal = priVal-1;
                           if(priVal>0) 
                           {  
                              $("#pri-"+elementVal[2]).val(priVal);
                              $("#pri-"+elementVal[2]).css("color", colors[priVal]);   
                           }   
                      });
$('img[id^="image-up"]').bind('click',function(){
                           elementVal = $(this).attr('id').split('-');
                           priVal = parseInt($("#pri-"+elementVal[2]).attr('value'));
                           priVal = priVal+1;
                           if(priVal<6)
                           {
                              $("#pri-"+elementVal[2]).val(priVal);
                              $("#pri-"+elementVal[2]).css("color", colors[priVal]);   

                           }   
                      });



    

});
