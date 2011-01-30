/*
* application.js
* Contains the page.load sort of code and uses jQuery.
* TODO: Is there a need to refactor some of the code in the js.erb ?
*
*/

$(document).ready(function() {
    $(".input-tip").tipTip({activation:"hover",defaultPosition:"right"});
    $(".twitter-shared").tipTip({activation:"hover",defaultPosition:"right"});

    $(".setting-icon").tipTip({activation:"hover",defaultPosition:"right"});
    $('.input-tip-bottom').tipTip({activation:"hover",defaultPosition:"bottom"});
    $("#user_timezone").tipTip({activation:"focus",defaultPosition:"right"});
    $('.setting-icon').click(function () {
         $(this).replaceWith('<p><strong>Please wait...</strong></p>'); // optional: change "Sending..." to something else
    });
    $("#tour").colorbox({iframe:true, innerWidth:425, innerHeight:344});
    $(".facebook-shared, .twitter-shared, .foursquare-shared").hide();
	$("#search").attr("tabindex", 10);
	$("#calendar_event").focus();

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



    $('.done-icon').bind('ajax:success', function() {
        var currentVal = $(this).closest('tr').attr('class');
//        alert(currentVal);
        if (currentVal=='' || currentVal=='false')
        {
            $(this).closest('tr').attr('class','true');
            $(this).closest('tr').fadeTo("slow", 0.4).find(".event-span").find("a").css("textDecoration","line-through");
        }
        else
        {
            $(this).closest('tr').attr('class','false');
            $(this).closest('tr').fadeTo("slow", 1).find(".event-span").find("a").css("textDecoration","none");
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
    function hideFlashMessages() {
      $('#flash_alert,#flash_success,#flash_notice,#setting-error').fadeOut(2000);
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
    $( "#slider" ).slider({
            value:0,
            min: 0,
            max: 5,
            step: 1,
            slide: function( event, ui ) {
                    $( "#pri" ).val( ui.value );
            }
    });
    $( "#pri" ).val(  $( "#slider" ).slider( "value" ) );


});





// ColorBox v1.3.15 - a full featured, light-weight, customizable lightbox based on jQuery 1.3+
// Copyright (c) 2010 Jack Moore - jack@colorpowered.com
// Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
(function(b,ib){var t="none",M="LoadedContent",c=false,v="resize.",o="y",q="auto",e=true,L="nofollow",m="x";function f(a,c){a=a?' id="'+i+a+'"':"";c=c?' style="'+c+'"':"";return b("<div"+a+c+"/>")}function p(a,b){b=b===m?n.width():n.height();return typeof a==="string"?Math.round(/%/.test(a)?b/100*parseInt(a,10):parseInt(a,10)):a}function U(b){return a.photo||/\.(gif|png|jpg|jpeg|bmp)(?:\?([^#]*))?(?:#(\.*))?$/i.test(b)}function cb(a){for(var c in a)if(b.isFunction(a[c])&&c.substring(0,2)!=="on")a[c]=a[c].call(l);a.rel=a.rel||l.rel||L;a.href=a.href||b(l).attr("href");a.title=a.title||l.title;return a}function w(c,a){a&&a.call(l);b.event.trigger(c)}function jb(){var b,e=i+"Slideshow_",c="click."+i,f,k;if(a.slideshow&&h[1]){f=function(){F.text(a.slideshowStop).unbind(c).bind(V,function(){if(g<h.length-1||a.loop)b=setTimeout(d.next,a.slideshowSpeed)}).bind(W,function(){clearTimeout(b)}).one(c+" "+N,k);j.removeClass(e+"off").addClass(e+"on");b=setTimeout(d.next,a.slideshowSpeed)};k=function(){clearTimeout(b);F.text(a.slideshowStart).unbind([V,W,N,c].join(" ")).one(c,f);j.removeClass(e+"on").addClass(e+"off")};a.slideshowAuto?f():k()}}function db(c){if(!O){l=c;a=cb(b.extend({},b.data(l,r)));h=b(l);g=0;if(a.rel!==L){h=b("."+G).filter(function(){return (b.data(this,r).rel||this.rel)===a.rel});g=h.index(l);if(g===-1){h=h.add(l);g=h.length-1}}if(!u){u=D=e;j.show();if(a.returnFocus)try{l.blur();b(l).one(eb,function(){try{this.focus()}catch(a){}})}catch(f){}x.css({opacity:+a.opacity,cursor:a.overlayClose?"pointer":q}).show();a.w=p(a.initialWidth,m);a.h=p(a.initialHeight,o);d.position(0);X&&n.bind(v+P+" scroll."+P,function(){x.css({width:n.width(),height:n.height(),top:n.scrollTop(),left:n.scrollLeft()})}).trigger("scroll."+P);w(fb,a.onOpen);Y.add(H).add(I).add(F).add(Z).hide();ab.html(a.close).show()}d.load(e)}}var gb={transition:"elastic",speed:300,width:c,initialWidth:"600",innerWidth:c,maxWidth:c,height:c,initialHeight:"450",innerHeight:c,maxHeight:c,scalePhotos:e,scrolling:e,inline:c,html:c,iframe:c,photo:c,href:c,title:c,rel:c,opacity:.9,preloading:e,current:"image {current} of {total}",previous:"previous",next:"next",close:"close",open:c,returnFocus:e,loop:e,slideshow:c,slideshowAuto:e,slideshowSpeed:2500,slideshowStart:"start slideshow",slideshowStop:"stop slideshow",onOpen:c,onLoad:c,onComplete:c,onCleanup:c,onClosed:c,overlayClose:e,escKey:e,arrowKey:e},r="colorbox",i="cbox",fb=i+"_open",W=i+"_load",V=i+"_complete",N=i+"_cleanup",eb=i+"_closed",Q=i+"_purge",hb=i+"_loaded",E=b.browser.msie&&!b.support.opacity,X=E&&b.browser.version<7,P=i+"_IE6",x,j,A,s,bb,T,R,S,h,n,k,J,K,Z,Y,F,I,H,ab,B,C,y,z,l,g,a,u,D,O=c,d,G=i+"Element";d=b.fn[r]=b[r]=function(c,f){var a=this,d;if(!a[0]&&a.selector)return a;c=c||{};if(f)c.onComplete=f;if(!a[0]||a.selector===undefined){a=b("<a/>");c.open=e}a.each(function(){b.data(this,r,b.extend({},b.data(this,r)||gb,c));b(this).addClass(G)});d=c.open;if(b.isFunction(d))d=d.call(a);d&&db(a[0]);return a};d.init=function(){var l="hover",m="clear:left";n=b(ib);j=f().attr({id:r,"class":E?i+"IE":""});x=f("Overlay",X?"position:absolute":"").hide();A=f("Wrapper");s=f("Content").append(k=f(M,"width:0; height:0; overflow:hidden"),K=f("LoadingOverlay").add(f("LoadingGraphic")),Z=f("Title"),Y=f("Current"),I=f("Next"),H=f("Previous"),F=f("Slideshow").bind(fb,jb),ab=f("Close"));A.append(f().append(f("TopLeft"),bb=f("TopCenter"),f("TopRight")),f(c,m).append(T=f("MiddleLeft"),s,R=f("MiddleRight")),f(c,m).append(f("BottomLeft"),S=f("BottomCenter"),f("BottomRight"))).children().children().css({"float":"left"});J=f(c,"position:absolute; width:9999px; visibility:hidden; display:none");b("body").prepend(x,j.append(A,J));s.children().hover(function(){b(this).addClass(l)},function(){b(this).removeClass(l)}).addClass(l);B=bb.height()+S.height()+s.outerHeight(e)-s.height();C=T.width()+R.width()+s.outerWidth(e)-s.width();y=k.outerHeight(e);z=k.outerWidth(e);j.css({"padding-bottom":B,"padding-right":C}).hide();I.click(d.next);H.click(d.prev);ab.click(d.close);s.children().removeClass(l);b("."+G).live("click",function(a){if(!(a.button!==0&&typeof a.button!=="undefined"||a.ctrlKey||a.shiftKey||a.altKey)){a.preventDefault();db(this)}});x.click(function(){a.overlayClose&&d.close()});b(document).bind("keydown",function(b){if(u&&a.escKey&&b.keyCode===27){b.preventDefault();d.close()}if(u&&a.arrowKey&&!D&&h[1])if(b.keyCode===37&&(g||a.loop)){b.preventDefault();H.click()}else if(b.keyCode===39&&(g<h.length-1||a.loop)){b.preventDefault();I.click()}})};d.remove=function(){j.add(x).remove();b("."+G).die("click").removeData(r).removeClass(G)};d.position=function(f,d){function b(a){bb[0].style.width=S[0].style.width=s[0].style.width=a.style.width;K[0].style.height=K[1].style.height=s[0].style.height=T[0].style.height=R[0].style.height=a.style.height}var e,h=Math.max(document.documentElement.clientHeight-a.h-y-B,0)/2+n.scrollTop(),g=Math.max(n.width()-a.w-z-C,0)/2+n.scrollLeft();e=j.width()===a.w+z&&j.height()===a.h+y?0:f;A[0].style.width=A[0].style.height="9999px";j.dequeue().animate({width:a.w+z,height:a.h+y,top:h,left:g},{duration:e,complete:function(){b(this);D=c;A[0].style.width=a.w+z+C+"px";A[0].style.height=a.h+y+B+"px";d&&d()},step:function(){b(this)}})};d.resize=function(b){if(u){b=b||{};if(b.width)a.w=p(b.width,m)-z-C;if(b.innerWidth)a.w=p(b.innerWidth,m);k.css({width:a.w});if(b.height)a.h=p(b.height,o)-y-B;if(b.innerHeight)a.h=p(b.innerHeight,o);if(!b.innerHeight&&!b.height){b=k.wrapInner("<div style='overflow:auto'></div>").children();a.h=b.height();b.replaceWith(b.children())}k.css({height:a.h});d.position(a.transition===t?0:a.speed)}};d.prep=function(m){var c="hidden";function l(s){var p,f,m,c,l=h.length,q=a.loop;d.position(s,function(){function s(){E&&j[0].style.removeAttribute("filter")}if(u){E&&o&&k.fadeIn(100);k.show();w(hb);Z.show().html(a.title);if(l>1){typeof a.current==="string"&&Y.html(a.current.replace(/\{current\}/,g+1).replace(/\{total\}/,l)).show();I[q||g<l-1?"show":"hide"]().html(a.next);H[q||g?"show":"hide"]().html(a.previous);p=g?h[g-1]:h[l-1];m=g<l-1?h[g+1]:h[0];a.slideshow&&F.show();if(a.preloading){c=b.data(m,r).href||m.href;f=b.data(p,r).href||p.href;c=b.isFunction(c)?c.call(m):c;f=b.isFunction(f)?f.call(p):f;if(U(c))b("<img/>")[0].src=c;if(U(f))b("<img/>")[0].src=f}}K.hide();a.transition==="fade"?j.fadeTo(e,1,function(){s()}):s();n.bind(v+i,function(){d.position(0)});w(V,a.onComplete)}})}if(u){var o,e=a.transition===t?0:a.speed;n.unbind(v+i);k.remove();k=f(M).html(m);k.hide().appendTo(J.show()).css({width:function(){a.w=a.w||k.width();a.w=a.mw&&a.mw<a.w?a.mw:a.w;return a.w}(),overflow:a.scrolling?q:c}).css({height:function(){a.h=a.h||k.height();a.h=a.mh&&a.mh<a.h?a.mh:a.h;return a.h}()}).prependTo(s);J.hide();b("#"+i+"Photo").css({cssFloat:t,marginLeft:q,marginRight:q});X&&b("select").not(j.find("select")).filter(function(){return this.style.visibility!==c}).css({visibility:c}).one(N,function(){this.style.visibility="inherit"});a.transition==="fade"?j.fadeTo(e,0,function(){l(0)}):l(e)}};d.load=function(u){var n,c,s,q=d.prep;D=e;l=h[g];u||(a=cb(b.extend({},b.data(l,r))));w(Q);w(W,a.onLoad);a.h=a.height?p(a.height,o)-y-B:a.innerHeight&&p(a.innerHeight,o);a.w=a.width?p(a.width,m)-z-C:a.innerWidth&&p(a.innerWidth,m);a.mw=a.w;a.mh=a.h;if(a.maxWidth){a.mw=p(a.maxWidth,m)-z-C;a.mw=a.w&&a.w<a.mw?a.w:a.mw}if(a.maxHeight){a.mh=p(a.maxHeight,o)-y-B;a.mh=a.h&&a.h<a.mh?a.h:a.mh}n=a.href;K.show();if(a.inline){f().hide().insertBefore(b(n)[0]).one(Q,function(){b(this).replaceWith(k.children())});q(b(n))}else if(a.iframe){j.one(hb,function(){var c=b("<iframe frameborder='0' style='width:100%; height:100%; border:0; display:block'/>")[0];c.name=i+ +new Date;c.src=a.href;if(!a.scrolling)c.scrolling="no";if(E)c.allowtransparency="true";b(c).appendTo(k).one(Q,function(){c.src="//about:blank"})});q(" ")}else if(a.html)q(a.html);else if(U(n)){c=new Image;c.onload=function(){var e;c.onload=null;c.id=i+"Photo";b(c).css({border:t,display:"block",cssFloat:"left"});if(a.scalePhotos){s=function(){c.height-=c.height*e;c.width-=c.width*e};if(a.mw&&c.width>a.mw){e=(c.width-a.mw)/c.width;s()}if(a.mh&&c.height>a.mh){e=(c.height-a.mh)/c.height;s()}}if(a.h)c.style.marginTop=Math.max(a.h-c.height,0)/2+"px";h[1]&&(g<h.length-1||a.loop)&&b(c).css({cursor:"pointer"}).click(d.next);if(E)c.style.msInterpolationMode="bicubic";setTimeout(function(){q(c)},1)};setTimeout(function(){c.src=n},1)}else n&&J.load(n,function(d,c,a){q(c==="error"?"Request unsuccessful: "+a.statusText:b(this).children())})};d.next=function(){if(!D){g=g<h.length-1?g+1:0;d.load()}};d.prev=function(){if(!D){g=g?g-1:h.length-1;d.load()}};d.close=function(){if(u&&!O){O=e;u=c;w(N,a.onCleanup);n.unbind("."+i+" ."+P);x.fadeTo("fast",0);j.stop().fadeTo("fast",0,function(){w(Q);k.remove();j.add(x).css({opacity:1,cursor:q}).hide();setTimeout(function(){O=c;w(eb,a.onClosed)},1)})}};d.element=function(){return b(l)};d.settings=gb;b(d.init)})(jQuery,this);

/*
 * jQuery Pines Notify (pnotify) Plugin 1.0.1
 *
 * Copyright (c) 2009 Hunter Perrin
 *
 * Licensed (along with all of Pines) under the GNU Affero GPL:
 *	  http://www.gnu.org/licenses/agpl.html
 */
(function(e){var q,m,k,n;e.extend({pnotify_remove_all:function(){var g=k.data("pnotify");g&&g.length&&e.each(g,function(){this.pnotify_remove&&this.pnotify_remove()})},pnotify_position_all:function(){m&&clearTimeout(m);m=null;var g=k.data("pnotify");if(g&&g.length){e.each(g,function(){var c=this.opts.pnotify_stack;if(c){if(!c.nextpos1)c.nextpos1=c.firstpos1;if(!c.nextpos2)c.nextpos2=c.firstpos2;if(!c.addpos2)c.addpos2=0;if(this.css("display")!="none"){var a,j,i={},b;switch(c.dir1){case "down":b="top";
break;case "up":b="bottom";break;case "left":b="right";break;case "right":b="left";break}a=parseInt(this.css(b));if(isNaN(a))a=0;if(typeof c.firstpos1=="undefined"){c.firstpos1=a;c.nextpos1=c.firstpos1}var h;switch(c.dir2){case "down":h="top";break;case "up":h="bottom";break;case "left":h="right";break;case "right":h="left";break}j=parseInt(this.css(h));if(isNaN(j))j=0;if(typeof c.firstpos2=="undefined"){c.firstpos2=j;c.nextpos2=c.firstpos2}if(c.dir1=="down"&&c.nextpos1+this.height()>n.height()||
c.dir1=="up"&&c.nextpos1+this.height()>n.height()||c.dir1=="left"&&c.nextpos1+this.width()>n.width()||c.dir1=="right"&&c.nextpos1+this.width()>n.width()){c.nextpos1=c.firstpos1;c.nextpos2+=c.addpos2+10;c.addpos2=0}if(c.animation&&c.nextpos2<j)switch(c.dir2){case "down":i.top=c.nextpos2+"px";break;case "up":i.bottom=c.nextpos2+"px";break;case "left":i.right=c.nextpos2+"px";break;case "right":i.left=c.nextpos2+"px";break}else this.css(h,c.nextpos2+"px");switch(c.dir2){case "down":case "up":if(this.outerHeight(true)>
c.addpos2)c.addpos2=this.height();break;case "left":case "right":if(this.outerWidth(true)>c.addpos2)c.addpos2=this.width();break}if(c.nextpos1)if(c.animation&&(a>c.nextpos1||i.top||i.bottom||i.right||i.left))switch(c.dir1){case "down":i.top=c.nextpos1+"px";break;case "up":i.bottom=c.nextpos1+"px";break;case "left":i.right=c.nextpos1+"px";break;case "right":i.left=c.nextpos1+"px";break}else this.css(b,c.nextpos1+"px");if(i.top||i.bottom||i.right||i.left)this.animate(i,{duration:500,queue:false});switch(c.dir1){case "down":case "up":c.nextpos1+=
this.height()+10;break;case "left":case "right":c.nextpos1+=this.width()+10;break}}}});e.each(g,function(){var c=this.opts.pnotify_stack;if(c){c.nextpos1=c.firstpos1;c.nextpos2=c.firstpos2;c.addpos2=0;c.animation=true}})}},pnotify:function(g){k||(k=e("body"));n||(n=e(window));var c,a;if(typeof g!="object"){a=e.extend({},e.pnotify.defaults);a.pnotify_text=g}else a=e.extend({},e.pnotify.defaults,g);if(a.pnotify_before_init)if(a.pnotify_before_init(a)===false)return null;var j,i=function(d,f){b.css("display",
"none");var o=document.elementFromPoint(d.clientX,d.clientY);b.css("display","block");var r=e(o),s=r.css("cursor");b.css("cursor",s!="auto"?s:"default");if(!j||j.get(0)!=o){if(j){p.call(j.get(0),"mouseleave",d.originalEvent);p.call(j.get(0),"mouseout",d.originalEvent)}p.call(o,"mouseenter",d.originalEvent);p.call(o,"mouseover",d.originalEvent)}p.call(o,f,d.originalEvent);j=r},b=e("<div />",{"class":"ui-pnotify "+a.pnotify_addclass,css:{display:"none"},mouseenter:function(d){a.pnotify_nonblock&&d.stopPropagation();
if(a.pnotify_mouse_reset&&c=="out"){b.stop(true);c="in";b.css("height","auto").animate({width:a.pnotify_width,opacity:a.pnotify_nonblock?a.pnotify_nonblock_opacity:a.pnotify_opacity},"fast")}a.pnotify_nonblock&&b.animate({opacity:a.pnotify_nonblock_opacity},"fast");a.pnotify_hide&&a.pnotify_mouse_reset&&b.pnotify_cancel_remove();a.pnotify_closer&&!a.pnotify_nonblock&&b.closer.show()},mouseleave:function(d){a.pnotify_nonblock&&d.stopPropagation();j=null;b.css("cursor","auto");a.pnotify_nonblock&&c!=
"out"&&b.animate({opacity:a.pnotify_opacity},"fast");a.pnotify_hide&&a.pnotify_mouse_reset&&b.pnotify_queue_remove();b.closer.hide();e.pnotify_position_all()},mouseover:function(d){a.pnotify_nonblock&&d.stopPropagation()},mouseout:function(d){a.pnotify_nonblock&&d.stopPropagation()},mousemove:function(d){if(a.pnotify_nonblock){d.stopPropagation();i(d,"onmousemove")}},mousedown:function(d){if(a.pnotify_nonblock){d.stopPropagation();d.preventDefault();i(d,"onmousedown")}},mouseup:function(d){if(a.pnotify_nonblock){d.stopPropagation();
d.preventDefault();i(d,"onmouseup")}},click:function(d){if(a.pnotify_nonblock){d.stopPropagation();i(d,"onclick")}},dblclick:function(d){if(a.pnotify_nonblock){d.stopPropagation();i(d,"ondblclick")}}});b.opts=a;if(a.pnotify_shadow&&!e.browser.msie)b.shadow_container=e("<div />",{"class":"ui-widget-shadow ui-corner-all ui-pnotify-shadow"}).prependTo(b);b.container=e("<div />",{"class":"ui-widget ui-widget-content ui-corner-all ui-pnotify-container "+(a.pnotify_type=="error"?"ui-state-error":"ui-state-highlight")}).appendTo(b);
b.pnotify_version="1.0.1";b.pnotify=function(d){var f=a;if(typeof d=="string")a.pnotify_text=d;else a=e.extend({},a,d);b.opts=a;if(a.pnotify_shadow!=f.pnotify_shadow)if(a.pnotify_shadow&&!e.browser.msie)b.shadow_container=e("<div />",{"class":"ui-widget-shadow ui-pnotify-shadow"}).prependTo(b);else b.children(".ui-pnotify-shadow").remove();if(a.pnotify_addclass===false)b.removeClass(f.pnotify_addclass);else a.pnotify_addclass!==f.pnotify_addclass&&b.removeClass(f.pnotify_addclass).addClass(a.pnotify_addclass);
if(a.pnotify_title===false)b.title_container.hide("fast");else a.pnotify_title!==f.pnotify_title&&b.title_container.html(a.pnotify_title).show(200);if(a.pnotify_text===false)b.text_container.hide("fast");else if(a.pnotify_text!==f.pnotify_text){if(a.pnotify_insert_brs)a.pnotify_text=a.pnotify_text.replace(/\n/g,"<br />");b.text_container.html(a.pnotify_text).show(200)}b.pnotify_history=a.pnotify_history;a.pnotify_type!=f.pnotify_type&&b.container.toggleClass("ui-state-error ui-state-highlight");if(a.pnotify_notice_icon!=
f.pnotify_notice_icon&&a.pnotify_type=="notice"||a.pnotify_error_icon!=f.pnotify_error_icon&&a.pnotify_type=="error"||a.pnotify_type!=f.pnotify_type){b.container.find("div.ui-pnotify-icon").remove();if(a.pnotify_error_icon&&a.pnotify_type=="error"||a.pnotify_notice_icon)e("<div />",{"class":"ui-pnotify-icon"}).append(e("<span />",{"class":a.pnotify_type=="error"?a.pnotify_error_icon:a.pnotify_notice_icon})).prependTo(b.container)}a.pnotify_width!==f.pnotify_width&&b.animate({width:a.pnotify_width});
a.pnotify_min_height!==f.pnotify_min_height&&b.container.animate({minHeight:a.pnotify_min_height});a.pnotify_opacity!==f.pnotify_opacity&&b.fadeTo(a.pnotify_animate_speed,a.pnotify_opacity);if(a.pnotify_hide)f.pnotify_hide||b.pnotify_queue_remove();else b.pnotify_cancel_remove();b.pnotify_queue_position();return b};b.pnotify_queue_position=function(){m&&clearTimeout(m);m=setTimeout(e.pnotify_position_all,10)};b.pnotify_display=function(){b.parent().length||b.appendTo(k);if(a.pnotify_before_open)if(a.pnotify_before_open(b)===
false)return;b.pnotify_queue_position();if(a.pnotify_animation=="fade"||a.pnotify_animation.effect_in=="fade")b.show().fadeTo(0,0).hide();else a.pnotify_opacity!=1&&b.show().fadeTo(0,a.pnotify_opacity).hide();b.animate_in(function(){a.pnotify_after_open&&a.pnotify_after_open(b);b.pnotify_queue_position();a.pnotify_hide&&b.pnotify_queue_remove()})};b.pnotify_remove=function(){if(b.timer){window.clearTimeout(b.timer);b.timer=null}if(a.pnotify_before_close)if(a.pnotify_before_close(b)===false)return;
b.animate_out(function(){if(a.pnotify_after_close)if(a.pnotify_after_close(b)===false)return;b.pnotify_queue_position();a.pnotify_remove&&b.detach()})};b.animate_in=function(d){c="in";var f;f=typeof a.pnotify_animation.effect_in!="undefined"?a.pnotify_animation.effect_in:a.pnotify_animation;if(f=="none"){b.show();d()}else if(f=="show")b.show(a.pnotify_animate_speed,d);else if(f=="fade")b.show().fadeTo(a.pnotify_animate_speed,a.pnotify_opacity,d);else if(f=="slide")b.slideDown(a.pnotify_animate_speed,
d);else if(typeof f=="function")f("in",d,b);else b.effect&&b.effect(f,{},a.pnotify_animate_speed,d)};b.animate_out=function(d){c="out";var f;f=typeof a.pnotify_animation.effect_out!="undefined"?a.pnotify_animation.effect_out:a.pnotify_animation;if(f=="none"){b.hide();d()}else if(f=="show")b.hide(a.pnotify_animate_speed,d);else if(f=="fade")b.fadeOut(a.pnotify_animate_speed,d);else if(f=="slide")b.slideUp(a.pnotify_animate_speed,d);else if(typeof f=="function")f("out",d,b);else b.effect&&b.effect(f,
{},a.pnotify_animate_speed,d)};b.pnotify_cancel_remove=function(){b.timer&&window.clearTimeout(b.timer)};b.pnotify_queue_remove=function(){b.pnotify_cancel_remove();b.timer=window.setTimeout(function(){b.pnotify_remove()},isNaN(a.pnotify_delay)?0:a.pnotify_delay)};b.closer=e("<div />",{"class":"ui-pnotify-closer",css:{cursor:"pointer",display:"none"},click:function(){b.pnotify_remove();b.closer.hide()}}).append(e("<span />",{"class":"ui-icon ui-icon-circle-close"})).appendTo(b.container);if(a.pnotify_error_icon&&
a.pnotify_type=="error"||a.pnotify_notice_icon)e("<div />",{"class":"ui-pnotify-icon"}).append(e("<span />",{"class":a.pnotify_type=="error"?a.pnotify_error_icon:a.pnotify_notice_icon})).appendTo(b.container);b.title_container=e("<div />",{"class":"ui-pnotify-title",html:a.pnotify_title}).appendTo(b.container);a.pnotify_title===false&&b.title_container.hide();if(a.pnotify_insert_brs&&typeof a.pnotify_text=="string")a.pnotify_text=a.pnotify_text.replace(/\n/g,"<br />");b.text_container=e("<div />",
{"class":"ui-pnotify-text",html:a.pnotify_text}).appendTo(b.container);a.pnotify_text===false&&b.text_container.hide();typeof a.pnotify_width=="string"&&b.css("width",a.pnotify_width);typeof a.pnotify_min_height=="string"&&b.container.css("min-height",a.pnotify_min_height);b.pnotify_history=a.pnotify_history;var h=k.data("pnotify");if(h==null||typeof h!="object")h=[];h=a.pnotify_stack.push=="top"?e.merge([b],h):e.merge(h,[b]);k.data("pnotify",h);a.pnotify_after_init&&a.pnotify_after_init(b);if(a.pnotify_history){var l=
k.data("pnotify_history");if(typeof l=="undefined"){l=e("<div />",{"class":"ui-pnotify-history-container ui-state-default ui-corner-bottom",mouseleave:function(){l.animate({top:"-"+q+"px"},{duration:100,queue:false})}}).append(e("<div />",{"class":"ui-pnotify-history-header",text:"Redisplay"})).append(e("<button />",{"class":"ui-pnotify-history-all ui-state-default ui-corner-all",text:"All",mouseenter:function(){e(this).addClass("ui-state-hover")},mouseleave:function(){e(this).removeClass("ui-state-hover")},
click:function(){e.each(h,function(){this.pnotify_history&&this.pnotify_display&&this.pnotify_display()});return false}})).append(e("<button />",{"class":"ui-pnotify-history-last ui-state-default ui-corner-all",text:"Last",mouseenter:function(){e(this).addClass("ui-state-hover")},mouseleave:function(){e(this).removeClass("ui-state-hover")},click:function(){for(var d=1;!h[h.length-d]||!h[h.length-d].pnotify_history||h[h.length-d].is(":visible");){if(h.length-d===0)return false;d++}d=h[h.length-d];
d.pnotify_display&&d.pnotify_display();return false}})).appendTo(k);q=e("<span />",{"class":"ui-pnotify-history-pulldown ui-icon ui-icon-grip-dotted-horizontal",mouseenter:function(){l.animate({top:"0"},{duration:100,queue:false})}}).appendTo(l).offset().top+2;l.css({top:"-"+q+"px"});k.data("pnotify_history",l)}}a.pnotify_stack.animation=false;b.pnotify_display();return b}});var t=/^on/,u=/^(dbl)?click$|^mouse(move|down|up|over|out|enter|leave)$|^contextmenu$/,v=/^(focus|blur|select|change|reset)$|^key(press|down|up)$/,
w=/^(scroll|resize|(un)?load|abort|error)$/,p=function(g,c){var a;g=g.toLowerCase();if(document.createEvent&&this.dispatchEvent){g=g.replace(t,"");if(g.match(u)){e(this).offset();a=document.createEvent("MouseEvents");a.initMouseEvent(g,c.bubbles,c.cancelable,c.view,c.detail,c.screenX,c.screenY,c.clientX,c.clientY,c.ctrlKey,c.altKey,c.shiftKey,c.metaKey,c.button,c.relatedTarget)}else if(g.match(v)){a=document.createEvent("UIEvents");a.initUIEvent(g,c.bubbles,c.cancelable,c.view,c.detail)}else if(g.match(w)){a=
document.createEvent("HTMLEvents");a.initEvent(g,c.bubbles,c.cancelable)}a&&this.dispatchEvent(a)}else{g.match(t)||(g="on"+g);a=document.createEventObject(c);this.fireEvent(g,a)}};e.pnotify.defaults={pnotify_title:false,pnotify_text:false,pnotify_addclass:"",pnotify_nonblock:false,pnotify_nonblock_opacity:0.2,pnotify_history:true,pnotify_width:"300px",pnotify_min_height:"16px",pnotify_type:"notice",pnotify_notice_icon:"ui-icon ui-icon-info",pnotify_error_icon:"ui-icon ui-icon-alert",pnotify_animation:"fade",
pnotify_animate_speed:"slow",pnotify_opacity:1,pnotify_shadow:false,pnotify_closer:true,pnotify_hide:true,pnotify_delay:8E3,pnotify_mouse_reset:true,pnotify_remove:true,pnotify_insert_brs:true,pnotify_stack:{dir1:"down",dir2:"left",push:"bottom"}}})(jQuery);

 /*
 * TipTip
 * Copyright 2010 Drew Wilson
 * www.drewwilson.com
 * code.drewwilson.com/entry/tiptip-jquery-plugin
 *
 * Version 1.3   -   Updated: Mar. 23, 2010
 *
 * This Plug-In will create a custom tooltip to replace the default
 * browser tooltip. It is extremely lightweight and very smart in
 * that it detects the edges of the browser window and will make sure
 * the tooltip stays within the current window size. As a result the
 * tooltip will adjust itself to be displayed above, below, to the left 
 * or to the right depending on what is necessary to stay within the
 * browser window. It is completely customizable as well via CSS.
 *
 * This TipTip jQuery plug-in is dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */
(function($){$.fn.tipTip=function(options){var defaults={activation:"hover",keepAlive:false,maxWidth:"200px",edgeOffset:3,defaultPosition:"bottom",delay:400,fadeIn:200,fadeOut:200,attribute:"title",content:false,enter:function(){},exit:function(){}};var opts=$.extend(defaults,options);if($("#tiptip_holder").length<=0){var tiptip_holder=$('<div id="tiptip_holder" style="max-width:'+opts.maxWidth+';"></div>');var tiptip_content=$('<div id="tiptip_content"></div>');var tiptip_arrow=$('<div id="tiptip_arrow"></div>');$("body").append(tiptip_holder.html(tiptip_content).prepend(tiptip_arrow.html('<div id="tiptip_arrow_inner"></div>')))}else{var tiptip_holder=$("#tiptip_holder");var tiptip_content=$("#tiptip_content");var tiptip_arrow=$("#tiptip_arrow")}return this.each(function(){var org_elem=$(this);if(opts.content){var org_title=opts.content}else{var org_title=org_elem.attr(opts.attribute)}if(org_title!=""){if(!opts.content){org_elem.removeAttr(opts.attribute)}var timeout=false;if(opts.activation=="hover"){org_elem.hover(function(){active_tiptip()},function(){if(!opts.keepAlive){deactive_tiptip()}});if(opts.keepAlive){tiptip_holder.hover(function(){},function(){deactive_tiptip()})}}else if(opts.activation=="focus"){org_elem.focus(function(){active_tiptip()}).blur(function(){deactive_tiptip()})}else if(opts.activation=="click"){org_elem.click(function(){active_tiptip();return false}).hover(function(){},function(){if(!opts.keepAlive){deactive_tiptip()}});if(opts.keepAlive){tiptip_holder.hover(function(){},function(){deactive_tiptip()})}}function active_tiptip(){opts.enter.call(this);tiptip_content.html(org_title);tiptip_holder.hide().removeAttr("class").css("margin","0");tiptip_arrow.removeAttr("style");var top=parseInt(org_elem.offset()['top']);var left=parseInt(org_elem.offset()['left']);var org_width=parseInt(org_elem.outerWidth());var org_height=parseInt(org_elem.outerHeight());var tip_w=tiptip_holder.outerWidth();var tip_h=tiptip_holder.outerHeight();var w_compare=Math.round((org_width-tip_w)/2);var h_compare=Math.round((org_height-tip_h)/2);var marg_left=Math.round(left+w_compare);var marg_top=Math.round(top+org_height+opts.edgeOffset);var t_class="";var arrow_top="";var arrow_left=Math.round(tip_w-12)/2;if(opts.defaultPosition=="bottom"){t_class="_bottom"}else if(opts.defaultPosition=="top"){t_class="_top"}else if(opts.defaultPosition=="left"){t_class="_left"}else if(opts.defaultPosition=="right"){t_class="_right"}var right_compare=(w_compare+left)<parseInt($(window).scrollLeft());var left_compare=(tip_w+left)>parseInt($(window).width());if((right_compare&&w_compare<0)||(t_class=="_right"&&!left_compare)||(t_class=="_left"&&left<(tip_w+opts.edgeOffset+5))){t_class="_right";arrow_top=Math.round(tip_h-13)/2;arrow_left=-12;marg_left=Math.round(left+org_width+opts.edgeOffset);marg_top=Math.round(top+h_compare)}else if((left_compare&&w_compare<0)||(t_class=="_left"&&!right_compare)){t_class="_left";arrow_top=Math.round(tip_h-13)/2;arrow_left=Math.round(tip_w);marg_left=Math.round(left-(tip_w+opts.edgeOffset+5));marg_top=Math.round(top+h_compare)}var top_compare=(top+org_height+opts.edgeOffset+tip_h+8)>parseInt($(window).height()+$(window).scrollTop());var bottom_compare=((top+org_height)-(opts.edgeOffset+tip_h+8))<0;if(top_compare||(t_class=="_bottom"&&top_compare)||(t_class=="_top"&&!bottom_compare)){if(t_class=="_top"||t_class=="_bottom"){t_class="_top"}else{t_class=t_class+"_top"}arrow_top=tip_h;marg_top=Math.round(top-(tip_h+5+opts.edgeOffset))}else if(bottom_compare|(t_class=="_top"&&bottom_compare)||(t_class=="_bottom"&&!top_compare)){if(t_class=="_top"||t_class=="_bottom"){t_class="_bottom"}else{t_class=t_class+"_bottom"}arrow_top=-12;marg_top=Math.round(top+org_height+opts.edgeOffset)}if(t_class=="_right_top"||t_class=="_left_top"){marg_top=marg_top+5}else if(t_class=="_right_bottom"||t_class=="_left_bottom"){marg_top=marg_top-5}if(t_class=="_left_top"||t_class=="_left_bottom"){marg_left=marg_left+5}tiptip_arrow.css({"margin-left":arrow_left+"px","margin-top":arrow_top+"px"});tiptip_holder.css({"margin-left":marg_left+"px","margin-top":marg_top+"px"}).attr("class","tip"+t_class);if(timeout){clearTimeout(timeout)}timeout=setTimeout(function(){tiptip_holder.stop(true,true).fadeIn(opts.fadeIn)},opts.delay)}function deactive_tiptip(){opts.exit.call(this);if(timeout){clearTimeout(timeout)}tiptip_holder.fadeOut(opts.fadeOut)}}})}})(jQuery);

// JQuery URL Parser
// Written by Mark Perkins, mark@allmarkedup.com
// License: http://unlicense.org/ (i.e. do what you want with it!)

jQuery.url = function()
{
	var segments = {};
	
	var parsed = {};
	
	/**
    * Options object. Only the URI and strictMode values can be changed via the setters below.
    */
  	var options = {
	
		url : window.location, // default URI is the page in which the script is running
		
		strictMode: false, // 'loose' parsing by default
	
		key: ["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"], // keys available to query 
		
		q: {
			name: "queryKey",
			parser: /(?:^|&)([^&=]*)=?([^&]*)/g
		},
		
		parser: {
			strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,  //less intuitive, more accurate to the specs
			loose:  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/ // more intuitive, fails on relative paths and deviates from specs
		}
		
	};
	
    /**
     * Deals with the parsing of the URI according to the regex above.
 	 * Written by Steven Levithan - see credits at top.
     */		
	var parseUri = function()
	{
		str = decodeURI( options.url );
		
		var m = options.parser[ options.strictMode ? "strict" : "loose" ].exec( str );
		var uri = {};
		var i = 14;

		while ( i-- ) {
			uri[ options.key[i] ] = m[i] || "";
		}

		uri[ options.q.name ] = {};
		uri[ options.key[12] ].replace( options.q.parser, function ( $0, $1, $2 ) {
			if ($1) {
				uri[options.q.name][$1] = $2;
			}
		});

		return uri;
	};

    /**
     * Returns the value of the passed in key from the parsed URI.
  	 * 
	 * @param string key The key whose value is required
     */		
	var key = function( key )
	{
		if ( jQuery.isEmptyObject(parsed) )
		{
			setUp(); // if the URI has not been parsed yet then do this first...	
		} 
		if ( key == "base" )
		{
			if ( parsed.port !== null && parsed.port !== "" )
			{
				return parsed.protocol+"://"+parsed.host+":"+parsed.port+"/";	
			}
			else
			{
				return parsed.protocol+"://"+parsed.host+"/";
			}
		}
	
		return ( parsed[key] === "" ) ? null : parsed[key];
	};
	
	/**
     * Returns the value of the required query string parameter.
  	 * 
	 * @param string item The parameter whose value is required
     */		
	var param = function( item )
	{
		if ( jQuery.isEmptyObject(parsed) )
		{
			setUp(); // if the URI has not been parsed yet then do this first...	
		}
		return ( parsed.queryKey[item] === null ) ? null : parsed.queryKey[item];
	};

    /**
     * 'Constructor' (not really!) function.
     *  Called whenever the URI changes to kick off re-parsing of the URI and splitting it up into segments. 
     */	
	var setUp = function()
	{
		parsed = parseUri();
		
		getSegments();	
	};
	
    /**
     * Splits up the body of the URI into segments (i.e. sections delimited by '/')
     */
	var getSegments = function()
	{
		var p = parsed.path;
		segments = []; // clear out segments array
		segments = parsed.path.length == 1 ? {} : ( p.charAt( p.length - 1 ) == "/" ? p.substring( 1, p.length - 1 ) : path = p.substring( 1 ) ).split("/");
	};
	
	return {
		
	    /**
	     * Sets the parsing mode - either strict or loose. Set to loose by default.
	     *
	     * @param string mode The mode to set the parser to. Anything apart from a value of 'strict' will set it to loose!
	     */
		setMode : function( mode )
		{
			options.strictMode = mode == "strict" ? true : false;
			return this;
		},
		
		/**
	     * Sets URI to parse if you don't want to to parse the current page's URI.
		 * Calling the function with no value for newUri resets it to the current page's URI.
	     *
	     * @param string newUri The URI to parse.
	     */		
		setUrl : function( newUri )
		{
			options.url = newUri === undefined ? window.location : newUri;
			setUp();
			return this;
		},		
		
		/**
	     * Returns the value of the specified URI segment. Segments are numbered from 1 to the number of segments.
		 * For example the URI http://test.com/about/company/ segment(1) would return 'about'.
		 *
		 * If no integer is passed into the function it returns the number of segments in the URI.
	     *
	     * @param int pos The position of the segment to return. Can be empty.
	     */	
		segment : function( pos )
		{
			if ( jQuery.isEmptyObject(parsed) )
			{
				setUp(); // if the URI has not been parsed yet then do this first...	
			} 
			if ( pos === undefined )
			{
				return segments.length;
			}
			return ( segments[pos] === "" || segments[pos] === undefined ) ? null : segments[pos];
		},
		
		attr : key, // provides public access to private 'key' function - see above
		
		param : param // provides public access to private 'param' function - see above
		
	};
	
}();
/*
* application.js
* Contains the page.load sort of code and uses jQuery.
* TODO: Is there a need to refactor some of the code in the js.erb ?
*
*/

$(document).ready(function() {
    $(".input-tip").tipTip({activation:"hover",defaultPosition:"right"});
    $(".twitter-shared").tipTip({activation:"hover",defaultPosition:"right"});

    $(".setting-icon").tipTip({activation:"hover",defaultPosition:"right"});
    $('.input-tip-bottom').tipTip({activation:"hover",defaultPosition:"bottom"});
    $("#user_timezone").tipTip({activation:"focus",defaultPosition:"right"});
    $('.setting-icon').click(function () {
         $(this).replaceWith('<p><strong>Please wait...</strong></p>'); // optional: change "Sending..." to something else
    });
    $("#tour").colorbox({iframe:true, innerWidth:425, innerHeight:344});
    $(".facebook-shared, .twitter-shared, .foursquare-shared").hide();
	$("#search").attr("tabindex", 10);
	$("#calendar_event").focus();

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



    $('.done-icon').bind('ajax:success', function() {
        var currentVal = $(this).closest('tr').attr('class');
//        alert(currentVal);
        if (currentVal=='' || currentVal=='false')
        {
            $(this).closest('tr').attr('class','true');
            $(this).closest('tr').fadeTo("slow", 0.4).find(".event-span").find("a").css("textDecoration","line-through");
        }
        else
        {
            $(this).closest('tr').attr('class','false');
            $(this).closest('tr').fadeTo("slow", 1).find(".event-span").find("a").css("textDecoration","none");
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
    function hideFlashMessages() {
      $('#flash_alert,#flash_success,#flash_notice,#setting-error').fadeOut(2000);
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
    $( "#slider" ).slider({
            value:0,
            min: 0,
            max: 5,
            step: 1,
            slide: function( event, ui ) {
                    $( "#pri" ).val( ui.value );
            }
    });
    $( "#pri" ).val(  $( "#slider" ).slider( "value" ) );


});



/**
*
*  MD5 (Message-Digest Algorithm)
*
**/
 
var MD5 = function (string) {
 
	function RotateLeft(lValue, iShiftBits) {
		return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));
	}
 
	function AddUnsigned(lX,lY) {
		var lX4,lY4,lX8,lY8,lResult;
		lX8 = (lX & 0x80000000);
		lY8 = (lY & 0x80000000);
		lX4 = (lX & 0x40000000);
		lY4 = (lY & 0x40000000);
		lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);
		if (lX4 & lY4) {
			return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
		}
		if (lX4 | lY4) {
			if (lResult & 0x40000000) {
				return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
			} else {
				return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
			}
		} else {
			return (lResult ^ lX8 ^ lY8);
		}
 	}
 
 	function F(x,y,z) { return (x & y) | ((~x) & z); }
 	function G(x,y,z) { return (x & z) | (y & (~z)); }
 	function H(x,y,z) { return (x ^ y ^ z); }
	function I(x,y,z) { return (y ^ (x | (~z))); }
 
	function FF(a,b,c,d,x,s,ac) {
		a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
		return AddUnsigned(RotateLeft(a, s), b);
	};
 
	function GG(a,b,c,d,x,s,ac) {
		a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
		return AddUnsigned(RotateLeft(a, s), b);
	};
 
	function HH(a,b,c,d,x,s,ac) {
		a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
		return AddUnsigned(RotateLeft(a, s), b);
	};
 
	function II(a,b,c,d,x,s,ac) {
		a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
		return AddUnsigned(RotateLeft(a, s), b);
	};
 
	function ConvertToWordArray(string) {
		var lWordCount;
		var lMessageLength = string.length;
		var lNumberOfWords_temp1=lMessageLength + 8;
		var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % 64))/64;
		var lNumberOfWords = (lNumberOfWords_temp2+1)*16;
		var lWordArray=Array(lNumberOfWords-1);
		var lBytePosition = 0;
		var lByteCount = 0;
		while ( lByteCount < lMessageLength ) {
			lWordCount = (lByteCount-(lByteCount % 4))/4;
			lBytePosition = (lByteCount % 4)*8;
			lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount)<<lBytePosition));
			lByteCount++;
		}
		lWordCount = (lByteCount-(lByteCount % 4))/4;
		lBytePosition = (lByteCount % 4)*8;
		lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80<<lBytePosition);
		lWordArray[lNumberOfWords-2] = lMessageLength<<3;
		lWordArray[lNumberOfWords-1] = lMessageLength>>>29;
		return lWordArray;
	};
 
	function WordToHex(lValue) {
		var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;
		for (lCount = 0;lCount<=3;lCount++) {
			lByte = (lValue>>>(lCount*8)) & 255;
			WordToHexValue_temp = "0" + lByte.toString(16);
			WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);
		}
		return WordToHexValue;
	};
 
	function Utf8Encode(string) {
		string = string.replace(/\r\n/g,"\n");
		var utftext = "";
 
		for (var n = 0; n < string.length; n++) {
 
			var c = string.charCodeAt(n);
 
			if (c < 128) {
				utftext += String.fromCharCode(c);
			}
			else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			}
			else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}
 
		}
 
		return utftext;
	};
 
	var x=Array();
	var k,AA,BB,CC,DD,a,b,c,d;
	var S11=7, S12=12, S13=17, S14=22;
	var S21=5, S22=9 , S23=14, S24=20;
	var S31=4, S32=11, S33=16, S34=23;
	var S41=6, S42=10, S43=15, S44=21;
 
	string = Utf8Encode(string);
 
	x = ConvertToWordArray(string);
 
	a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;
 
	for (k=0;k<x.length;k+=16) {
		AA=a; BB=b; CC=c; DD=d;
		a=FF(a,b,c,d,x[k+0], S11,0xD76AA478);
		d=FF(d,a,b,c,x[k+1], S12,0xE8C7B756);
		c=FF(c,d,a,b,x[k+2], S13,0x242070DB);
		b=FF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);
		a=FF(a,b,c,d,x[k+4], S11,0xF57C0FAF);
		d=FF(d,a,b,c,x[k+5], S12,0x4787C62A);
		c=FF(c,d,a,b,x[k+6], S13,0xA8304613);
		b=FF(b,c,d,a,x[k+7], S14,0xFD469501);
		a=FF(a,b,c,d,x[k+8], S11,0x698098D8);
		d=FF(d,a,b,c,x[k+9], S12,0x8B44F7AF);
		c=FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);
		b=FF(b,c,d,a,x[k+11],S14,0x895CD7BE);
		a=FF(a,b,c,d,x[k+12],S11,0x6B901122);
		d=FF(d,a,b,c,x[k+13],S12,0xFD987193);
		c=FF(c,d,a,b,x[k+14],S13,0xA679438E);
		b=FF(b,c,d,a,x[k+15],S14,0x49B40821);
		a=GG(a,b,c,d,x[k+1], S21,0xF61E2562);
		d=GG(d,a,b,c,x[k+6], S22,0xC040B340);
		c=GG(c,d,a,b,x[k+11],S23,0x265E5A51);
		b=GG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);
		a=GG(a,b,c,d,x[k+5], S21,0xD62F105D);
		d=GG(d,a,b,c,x[k+10],S22,0x2441453);
		c=GG(c,d,a,b,x[k+15],S23,0xD8A1E681);
		b=GG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);
		a=GG(a,b,c,d,x[k+9], S21,0x21E1CDE6);
		d=GG(d,a,b,c,x[k+14],S22,0xC33707D6);
		c=GG(c,d,a,b,x[k+3], S23,0xF4D50D87);
		b=GG(b,c,d,a,x[k+8], S24,0x455A14ED);
		a=GG(a,b,c,d,x[k+13],S21,0xA9E3E905);
		d=GG(d,a,b,c,x[k+2], S22,0xFCEFA3F8);
		c=GG(c,d,a,b,x[k+7], S23,0x676F02D9);
		b=GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
		a=HH(a,b,c,d,x[k+5], S31,0xFFFA3942);
		d=HH(d,a,b,c,x[k+8], S32,0x8771F681);
		c=HH(c,d,a,b,x[k+11],S33,0x6D9D6122);
		b=HH(b,c,d,a,x[k+14],S34,0xFDE5380C);
		a=HH(a,b,c,d,x[k+1], S31,0xA4BEEA44);
		d=HH(d,a,b,c,x[k+4], S32,0x4BDECFA9);
		c=HH(c,d,a,b,x[k+7], S33,0xF6BB4B60);
		b=HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
		a=HH(a,b,c,d,x[k+13],S31,0x289B7EC6);
		d=HH(d,a,b,c,x[k+0], S32,0xEAA127FA);
		c=HH(c,d,a,b,x[k+3], S33,0xD4EF3085);
		b=HH(b,c,d,a,x[k+6], S34,0x4881D05);
		a=HH(a,b,c,d,x[k+9], S31,0xD9D4D039);
		d=HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);
		c=HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);
		b=HH(b,c,d,a,x[k+2], S34,0xC4AC5665);
		a=II(a,b,c,d,x[k+0], S41,0xF4292244);
		d=II(d,a,b,c,x[k+7], S42,0x432AFF97);
		c=II(c,d,a,b,x[k+14],S43,0xAB9423A7);
		b=II(b,c,d,a,x[k+5], S44,0xFC93A039);
		a=II(a,b,c,d,x[k+12],S41,0x655B59C3);
		d=II(d,a,b,c,x[k+3], S42,0x8F0CCC92);
		c=II(c,d,a,b,x[k+10],S43,0xFFEFF47D);
		b=II(b,c,d,a,x[k+1], S44,0x85845DD1);
		a=II(a,b,c,d,x[k+8], S41,0x6FA87E4F);
		d=II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);
		c=II(c,d,a,b,x[k+6], S43,0xA3014314);
		b=II(b,c,d,a,x[k+13],S44,0x4E0811A1);
		a=II(a,b,c,d,x[k+4], S41,0xF7537E82);
		d=II(d,a,b,c,x[k+11],S42,0xBD3AF235);
		c=II(c,d,a,b,x[k+2], S43,0x2AD7D2BB);
		b=II(b,c,d,a,x[k+9], S44,0xEB86D391);
		a=AddUnsigned(a,AA);
		b=AddUnsigned(b,BB);
		c=AddUnsigned(c,CC);
		d=AddUnsigned(d,DD);
	}
 
	var temp = WordToHex(a)+WordToHex(b)+WordToHex(c)+WordToHex(d);
 
	return temp.toLowerCase();
}

/*
 * jquery-ujs
 *
 * http://github.com/rails/jquery-ujs/blob/master/src/rails.js
 *
 * This rails.js file supports jQuery 1.4.3 and 1.4.4 .
 *
 */

jQuery(function ($) {
    var csrf_token = $('meta[name=csrf-token]').attr('content'),
        csrf_param = $('meta[name=csrf-param]').attr('content');

    $.fn.extend({
        /**
         * Triggers a custom event on an element and returns the event result
         * this is used to get around not being able to ensure callbacks are placed
         * at the end of the chain.
         *
         * TODO: deprecate with jQuery 1.4.2 release, in favor of subscribing to our
         *       own events and placing ourselves at the end of the chain.
         */
        triggerAndReturn: function (name, data) {
            var event = new $.Event(name);
            this.trigger(event, data);

            return event.result !== false;
        },

        /**
         * Handles execution of remote calls. Provides following callbacks:
         *
         * - ajax:beforeSend  - is executed before firing ajax call
         * - ajax:success  - is executed when status is success
         * - ajax:complete - is executed when the request finishes, whether in failure or success.
         * - ajax:error    - is execute in case of error
         */
        callRemote: function () {
            var el      = this,
                method  = el.attr('method') || el.attr('data-method') || 'GET',
                url     = el.attr('action') || el.attr('href'),
                dataType  = el.attr('data-type')  || ($.ajaxSettings && $.ajaxSettings.dataType);

            if (url === undefined) {
                throw "No URL specified for remote call (action or href must be present).";
            } else {
                    var $this = $(this), data = el.is('form') ? el.serializeArray() : [];

                    $.ajax({
                        url: url,
                        data: data,
                        dataType: dataType,
                        type: method.toUpperCase(),
                        beforeSend: function (xhr) {
                            xhr.setRequestHeader("Accept", "text/javascript");
                            if ($this.triggerHandler('ajax:beforeSend') === false) {
                              return false;
                            }
                        },
                        success: function (data, status, xhr) {
                            el.trigger('ajax:success', [data, status, xhr]);
                        },
                        complete: function (xhr) {
                            el.trigger('ajax:complete', xhr);
                        },
                        error: function (xhr, status, error) {
                            el.trigger('ajax:error', [xhr, status, error]);
                        }
                    });
            }
        }
    });

    /**
     *  confirmation handler
     */

    $('body').delegate('a[data-confirm], button[data-confirm], input[data-confirm]', 'click.rails', function () {
        var el = $(this);
        if (el.triggerAndReturn('confirm')) {
            if (!confirm(el.attr('data-confirm'))) {
                return false;
            }
        }
    });



    /**
     * remote handlers
     */
    $('form[data-remote]').live('submit.rails', function (e) {
        $(this).callRemote();
        e.preventDefault();
    });

    $('a[data-remote],input[data-remote]').live('click.rails', function (e) {
        $(this).callRemote();
        e.preventDefault();
    });

    /**
     * <%= link_to "Delete", user_path(@user), :method => :delete, :confirm => "Are you sure?" %>
     *
     * <a href="/users/5" data-confirm="Are you sure?" data-method="delete" rel="nofollow">Delete</a>
     */
    $('a[data-method]:not([data-remote])').live('click.rails', function (e){
        var link = $(this),
            href = link.attr('href'),
            method = link.attr('data-method'),
            form = $('<form method="post" action="'+href+'"></form>'),
            metadata_input = '<input name="_method" value="'+method+'" type="hidden" />';

        if (csrf_param !== undefined && csrf_token !== undefined) {
            metadata_input += '<input name="'+csrf_param+'" value="'+csrf_token+'" type="hidden" />';
        }

        form.hide()
            .append(metadata_input)
            .appendTo('body');

        e.preventDefault();
        form.submit();
    });

    /**
     * disable-with handlers
     */
    var disable_with_input_selector           = 'input[data-disable-with]',
        disable_with_form_remote_selector     = 'form[data-remote]:has('       + disable_with_input_selector + ')',
        disable_with_form_not_remote_selector = 'form:not([data-remote]):has(' + disable_with_input_selector + ')';

    var disable_with_input_function = function () {
        $(this).find(disable_with_input_selector).each(function () {
            var input = $(this);
            input.data('enable-with', input.val())
                .attr('value', input.attr('data-disable-with'))
                .attr('disabled', 'disabled');
        });
    };

    $(disable_with_form_remote_selector).live('ajax:before.rails', disable_with_input_function);
    $(disable_with_form_not_remote_selector).live('submit.rails', disable_with_input_function);

    $(disable_with_form_remote_selector).live('ajax:complete.rails', function () {
        $(this).find(disable_with_input_selector).each(function () {
            var input = $(this);
            input.removeAttr('disabled')
                 .val(input.data('enable-with'));
        });
    });

    var jqueryVersion = $().jquery;

	if (!( (jqueryVersion === '1.4.3') || (jqueryVersion === '1.4.4'))){
		alert('This rails.js does not support the jQuery version you are using. Please read documentation.');
	}


});
