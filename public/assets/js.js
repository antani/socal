var woffEnabled=true;var scripts=document.getElementsByTagName("SCRIPT");var script=scripts[scripts.length-1].src;if(!script.match("://")&&script.charAt(0)!="/"){script="./"+script}var path=script.replace(/\\/g,"/").replace(/\/[^\/]*\/?$/,"");var browserName,browserVersion,webfontType;var webfontTypeOverride;if(/webfont=(woff|ttf|eot)/.test(window.location.search)){webfontTypeOverride=RegExp.$1;if(webfontTypeOverride=="ttf"){webfontTypeOverride="data-css"}}if(/MSIE (\d+\.\d+)/.test(navigator.userAgent)){browserName="MSIE";browserVersion=new Number(RegExp.$1);if(browserVersion>=9&&woffEnabled){webfontType="woff"}else{if(browserVersion>=5){webfontType="eot"}}}else{if(/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent)){browserName="Firefox";browserVersion=new Number(RegExp.$1);if(browserVersion>=3.6&&woffEnabled){webfontType="woff"}else{if(browserVersion>=3.5){webfontType="data-css"}}}else{if(/Chrome\/(\d+\.\d+)/.test(navigator.userAgent)){browserName="Chrome";browserVersion=new Number(RegExp.$1);if(browserVersion>=6&&woffEnabled){webfontType="woff"}else{if(browserVersion>=4){webfontType="data-css"}}}else{if(/Mozilla.*(iPhone|iPad).* OS (\d+)_(\d+).* AppleWebKit.*Safari/.test(navigator.userAgent)){browserName="MobileSafari";browserVersion=new Number(RegExp.$2)+(new Number(RegExp.$3)/10);if(browserVersion>=4.2){webfontType="data-css"}else{webfontType="svg"}}else{if(/Mozilla.*(iPhone|iPad).*AppleWebKit.*Safari/.test(navigator.userAgent)){browserName="MobileSafari";webfontType="svg"}else{if(/Safari\/(\d+\.\d+)/.test(navigator.userAgent)){browserName="Safari";if(/Version\/(\d+\.\d+)/.test(navigator.userAgent)){browserVersion=new Number(RegExp.$1);if(browserVersion>=3.1){webfontType="data-css"}}}else{if(/Opera\/(\d+\.\d+)/.test(navigator.userAgent)){browserName="Opera";if(/Version\/(\d+\.\d+)/.test(navigator.userAgent)){browserVersion=new Number(RegExp.$1);if(browserVersion>=10.1){webfontType="data-css"}}}}}}}}}if(!webfontType){}if(webfontTypeOverride){webfontType=webfontTypeOverride}switch(webfontType){case"eot":document.write("<style>\n");document.write('@font-face {font-family:"Museo-300";src:url("'+path+'/webfonts/eot/style_154926.eot");}\n');document.write('@font-face {font-family:"Museo-500";src:url("'+path+'/webfonts/eot/style_154928.eot");}\n');document.write("</style>");break;case"woff":document.write("<style>\n");document.write('@font-face {font-family:"Museo-300";src:url("'+path+'/webfonts/woff/style_154926.woff") format("woff");}\n');document.write('@font-face {font-family:"Museo-500";src:url("'+path+'/webfonts/woff/style_154928.woff") format("woff");}\n');document.write("</style>");break;case"data-css":document.write("<link rel='stylesheet' type='text/css' href='"+path+"/webfonts/datacss/MyFonts Webfonts Order M2658772.css'>");break;case"svg":document.write("<style>\n");document.write('@font-face {font-family:"Museo-300";src:url("'+path+'/webfonts/svg/style_154926.svg#Museo-300") format("svg");}\n');document.write('@font-face {font-family:"Museo-500";src:url("'+path+'/webfonts/svg/style_154928.svg#Museo-500") format("svg");}\n');document.write("</style>");break;default:webfontType="default";break}$(document).ready(function(){$(".input-tip").tipTip({activation:"hover",defaultPosition:"right"});$(".twitter-shared").tipTip({activation:"hover",defaultPosition:"right"});$(".setting-icon").tipTip({activation:"hover",defaultPosition:"right"});$(".input-tip-bottom").tipTip({activation:"hover",defaultPosition:"bottom"});$("#user_timezone").tipTip({activation:"focus",defaultPosition:"right"});$(".setting-icon").click(function(){$(this).replaceWith("<p><strong>Please wait...</strong></p>")});$("#tour").colorbox({iframe:true,innerWidth:425,innerHeight:344});$(".facebook-shared, .twitter-shared, .foursquare-shared").hide();function a(){$("#pageinfo").load("/ #pageinfo");return false}$("#signin-link").colorbox({opacity:0.1,inline:true,href:function(){return $(this).attr("href")}});$("input:text:visible:first").focus();$(".delete-icon").bind("ajax:success",function(){$(this).closest("tr").fadeOut("linear",a)});$("#feed_item_today,#feed_item_past,#feed_item_tomorrow").find("tbody tr").each(function(){if($(this).attr("class")=="true"){$(this).fadeTo("slow",0.4);$(this).find(".event-span").find("a").css("textDecoration","line-through")}});$(".done-icon").bind("ajax:success",function(){var c=$(this).closest("tr").attr("class");if(c==""||c=="false"){$(this).closest("tr").attr("class","true");$(this).closest("tr").fadeTo("slow",0.4).find(".event-span").find("a").css("textDecoration","line-through")}else{$(this).closest("tr").attr("class","false");$(this).closest("tr").fadeTo("slow",1).find(".event-span").find("a").css("textDecoration","none")}});$("input:text,input:password").focus(function(){$(this).addClass("selected-input")});$("input:text,input:password").blur(function(){$(this).removeClass("selected-input")});$("form").submit(function(){$('input[type="submit"]',this).replaceWith("<p><strong>Please wait...</strong></p>")});setTimeout(b,10000);function b(){$("#flash_alert,#flash_success,#flash_notice").fadeOut(2000)}$("#editcal").dialog({autoOpen:false,height:300,width:350,modal:true,buttons:{Ok:function(){},Cancel:function(){$(this).dialog("close")}},close:function(){allFields.val("").removeClass("ui-state-error")}});setInterval(function(){var f=new Date();var c=f.getTime();var e=c.toString().substring(0,10);$("#feed_item_today :input").each(function(){elemVal=$(this).val();if(elemVal==e){msg=$(this).attr("name");$.pnotify({pnotify_title:"Reminder",pnotify_text:msg,pnotify_opacity:0.8})}});$(".foursquare-shared,.facebook-shared,.twitter-shared").each(function(){if($(this).attr("rel")=="true"){$(this).show("slow")}})},1000);$('a[rel^="map-"]').colorbox({opacity:0.2,inline:true,href:function(){return"#"+$(this).attr("rel")},onComplete:function(){$("#"+$(this).attr("rel")).each(function(){$(this).css("z-index","1");var h=$(this).attr("title");var e=h.split(",");lat=e[0];lon=e[1];loc=e[2];var c=[loc];var d;d=new mxn.Mapstraction($(this).attr("id"),"google");var f=new mxn.LatLonPoint(lat,lon);d.setCenterAndZoom(f,16);d.addControls({pan:true,zoom:"large",map_type:true});my_marker=new mxn.Marker(f);var g=loc;my_marker.setInfoBubble(g);d.addMarker(my_marker)})}});$(".map-icon").hide();$('a[rel^="map-"]').hover(function(){$(this).next(".map-icon").show(slow)},function(){$(this).next(".map-icon").hide(slow)});$('a[id^="edit-form-link-"]').colorbox({title:"Edit Calendar Entry",transition:"elastic",opacity:0.3,inline:true,href:function(){return $(this).attr("href")}});$('div[id^="inline-edit-form-"]').css("padding","6px");$('div[id^="inline-edit-form-"]').find("label").css("padding","5px");$('div[id^="inline-edit-form-"]').find("input").css("float","left")});(function(a9,aK){var aR="none",aq="LoadedContent",a8=false,aP="resize.",aW="y",aU="auto",a6=true,ar="nofollow",aY="x";function a5(b,d){b=b?' id="'+a2+b+'"':"";d=d?' style="'+d+'"':"";return a9("<div"+b+d+"/>")}function aV(d,c){c=c===aY?aX.width():aX.height();return typeof d==="string"?Math.round(/%/.test(d)?c/100*parseInt(d,10):parseInt(d,10)):d}function ai(a){return ba.photo||/\.(gif|png|jpg|jpeg|bmp)(?:\?([^#]*))?(?:#(\.*))?$/i.test(a)}function aI(b){for(var d in b){if(a9.isFunction(b[d])&&d.substring(0,2)!=="on"){b[d]=b[d].call(aZ)}}b.rel=b.rel||aZ.rel||ar;b.href=b.href||a9(aZ).attr("href");b.title=b.title||aZ.title;return b}function aO(d,b){b&&b.call(aZ);a9.event.trigger(d)}function aH(){var a,h=a2+"Slideshow_",i="click."+a2,g,d;if(ba.slideshow&&a3[1]){g=function(){ay.text(ba.slideshowStop).unbind(i).bind(ah,function(){if(a4<a3.length-1||ba.loop){a=setTimeout(a7.next,ba.slideshowSpeed)}}).bind(ag,function(){clearTimeout(a)}).one(i+" "+ap,d);a1.removeClass(h+"off").addClass(h+"on");a=setTimeout(a7.next,ba.slideshowSpeed)};d=function(){clearTimeout(a);ay.text(ba.slideshowStart).unbind([ah,ag,ap,i].join(" ")).one(i,g);a1.removeClass(h+"on").addClass(h+"off")};ba.slideshowAuto?g():d()}}function aF(b){if(!ao){aZ=b;ba=aI(a9.extend({},a9.data(aZ,aT)));a3=a9(aZ);a4=0;if(ba.rel!==ar){a3=a9("."+ax).filter(function(){return(a9.data(this,aT).rel||this.rel)===ba.rel});a4=a3.index(aZ);if(a4===-1){a3=a3.add(aZ);a4=a3.length-1}}if(!aQ){aQ=aA=a6;a1.show();if(ba.returnFocus){try{aZ.blur();a9(aZ).one(aa,function(){try{this.focus()}catch(c){}})}catch(a){}}aN.css({opacity:+ba.opacity,cursor:ba.overlayClose?"pointer":aU}).show();ba.w=aV(ba.initialWidth,aY);ba.h=aV(ba.initialHeight,aW);a7.position(0);af&&aX.bind(aP+an+" scroll."+an,function(){aN.css({width:aX.width(),height:aX.height(),top:aX.scrollTop(),left:aX.scrollLeft()})}).trigger("scroll."+an);aO(aJ,ba.onOpen);ae.add(aw).add(av).add(ay).add(ad).hide();aD.html(ba.close).show()}a7.load(a6)}}var aG={transition:"elastic",speed:300,width:a8,initialWidth:"600",innerWidth:a8,maxWidth:a8,height:a8,initialHeight:"450",innerHeight:a8,maxHeight:a8,scalePhotos:a6,scrolling:a6,inline:a8,html:a8,iframe:a8,photo:a8,href:a8,title:a8,rel:a8,opacity:0.9,preloading:a6,current:"image {current} of {total}",previous:"previous",next:"next",close:"close",open:a8,returnFocus:a6,loop:a6,slideshow:a8,slideshowAuto:a6,slideshowSpeed:2500,slideshowStart:"start slideshow",slideshowStop:"stop slideshow",onOpen:a8,onLoad:a8,onComplete:a8,onCleanup:a8,onClosed:a8,overlayClose:a6,escKey:a6,arrowKey:a6},aT="colorbox",a2="cbox",aJ=a2+"_open",ag=a2+"_load",ah=a2+"_complete",ap=a2+"_cleanup",aa=a2+"_closed",am=a2+"_purge",ac=a2+"_loaded",az=a9.browser.msie&&!a9.support.opacity,af=az&&a9.browser.version<7,an=a2+"_IE6",aN,a1,aE,aS,bc,aj,al,ak,a3,aX,a0,au,at,ad,ae,ay,av,aw,aD,aC,aB,aM,aL,aZ,a4,ba,aQ,aA,ao=a8,a7,ax=a2+"Element";a7=a9.fn[aT]=a9[aT]=function(h,e){var b=this,g;if(!b[0]&&b.selector){return b}h=h||{};if(e){h.onComplete=e}if(!b[0]||b.selector===undefined){b=a9("<a/>");h.open=a6}b.each(function(){a9.data(this,aT,a9.extend({},a9.data(this,aT)||aG,h));a9(this).addClass(ax)});g=h.open;if(a9.isFunction(g)){g=g.call(b)}g&&aF(b[0]);return b};a7.init=function(){var b="hover",a="clear:left";aX=a9(aK);a1=a5().attr({id:aT,"class":az?a2+"IE":""});aN=a5("Overlay",af?"position:absolute":"").hide();aE=a5("Wrapper");aS=a5("Content").append(a0=a5(aq,"width:0; height:0; overflow:hidden"),at=a5("LoadingOverlay").add(a5("LoadingGraphic")),ad=a5("Title"),ae=a5("Current"),av=a5("Next"),aw=a5("Previous"),ay=a5("Slideshow").bind(aJ,aH),aD=a5("Close"));aE.append(a5().append(a5("TopLeft"),bc=a5("TopCenter"),a5("TopRight")),a5(a8,a).append(aj=a5("MiddleLeft"),aS,al=a5("MiddleRight")),a5(a8,a).append(a5("BottomLeft"),ak=a5("BottomCenter"),a5("BottomRight"))).children().children().css({"float":"left"});au=a5(a8,"position:absolute; width:9999px; visibility:hidden; display:none");a9("body").prepend(aN,a1.append(aE,au));aS.children().hover(function(){a9(this).addClass(b)},function(){a9(this).removeClass(b)}).addClass(b);aC=bc.height()+ak.height()+aS.outerHeight(a6)-aS.height();aB=aj.width()+al.width()+aS.outerWidth(a6)-aS.width();aM=a0.outerHeight(a6);aL=a0.outerWidth(a6);a1.css({"padding-bottom":aC,"padding-right":aB}).hide();av.click(a7.next);aw.click(a7.prev);aD.click(a7.close);aS.children().removeClass(b);a9("."+ax).live("click",function(c){if(!(c.button!==0&&typeof c.button!=="undefined"||c.ctrlKey||c.shiftKey||c.altKey)){c.preventDefault();aF(this)}});aN.click(function(){ba.overlayClose&&a7.close()});a9(document).bind("keydown",function(c){if(aQ&&ba.escKey&&c.keyCode===27){c.preventDefault();a7.close()}if(aQ&&ba.arrowKey&&!aA&&a3[1]){if(c.keyCode===37&&(a4||ba.loop)){c.preventDefault();aw.click()}else{if(c.keyCode===39&&(a4<a3.length-1||ba.loop)){c.preventDefault();av.click()}}}})};a7.remove=function(){a1.add(aN).remove();a9("."+ax).die("click").removeData(aT).removeClass(ax)};a7.position=function(j,l){function a(b){bc[0].style.width=ak[0].style.width=aS[0].style.width=b.style.width;at[0].style.height=at[1].style.height=aS[0].style.height=aj[0].style.height=al[0].style.height=b.style.height}var k,c=Math.max(document.documentElement.clientHeight-ba.h-aM-aC,0)/2+aX.scrollTop(),i=Math.max(aX.width()-ba.w-aL-aB,0)/2+aX.scrollLeft();k=a1.width()===ba.w+aL&&a1.height()===ba.h+aM?0:j;aE[0].style.width=aE[0].style.height="9999px";a1.dequeue().animate({width:ba.w+aL,height:ba.h+aM,top:c,left:i},{duration:k,complete:function(){a(this);aA=a8;aE[0].style.width=ba.w+aL+aB+"px";aE[0].style.height=ba.h+aM+aC+"px";l&&l()},step:function(){a(this)}})};a7.resize=function(a){if(aQ){a=a||{};if(a.width){ba.w=aV(a.width,aY)-aL-aB}if(a.innerWidth){ba.w=aV(a.innerWidth,aY)}a0.css({width:ba.w});if(a.height){ba.h=aV(a.height,aW)-aM-aC}if(a.innerHeight){ba.h=aV(a.innerHeight,aW)}if(!a.innerHeight&&!a.height){a=a0.wrapInner("<div style='overflow:auto'></div>").children();ba.h=a.height();a.replaceWith(a.children())}a0.css({height:ba.h});a7.position(ba.transition===aR?0:ba.speed)}};a7.prep=function(a){var g="hidden";function b(i){var n,k,e,o,h=a3.length,j=ba.loop;a7.position(i,function(){function c(){az&&a1[0].style.removeAttribute("filter")}if(aQ){az&&f&&a0.fadeIn(100);a0.show();aO(ac);ad.show().html(ba.title);if(h>1){typeof ba.current==="string"&&ae.html(ba.current.replace(/\{current\}/,a4+1).replace(/\{total\}/,h)).show();av[j||a4<h-1?"show":"hide"]().html(ba.next);aw[j||a4?"show":"hide"]().html(ba.previous);n=a4?a3[a4-1]:a3[h-1];e=a4<h-1?a3[a4+1]:a3[0];ba.slideshow&&ay.show();if(ba.preloading){o=a9.data(e,aT).href||e.href;k=a9.data(n,aT).href||n.href;o=a9.isFunction(o)?o.call(e):o;k=a9.isFunction(k)?k.call(n):k;if(ai(o)){a9("<img/>")[0].src=o}if(ai(k)){a9("<img/>")[0].src=k}}}at.hide();ba.transition==="fade"?a1.fadeTo(d,1,function(){c()}):c();aX.bind(aP+a2,function(){a7.position(0)});aO(ah,ba.onComplete)}})}if(aQ){var f,d=ba.transition===aR?0:ba.speed;aX.unbind(aP+a2);a0.remove();a0=a5(aq).html(a);a0.hide().appendTo(au.show()).css({width:function(){ba.w=ba.w||a0.width();ba.w=ba.mw&&ba.mw<ba.w?ba.mw:ba.w;return ba.w}(),overflow:ba.scrolling?aU:g}).css({height:function(){ba.h=ba.h||a0.height();ba.h=ba.mh&&ba.mh<ba.h?ba.mh:ba.h;return ba.h}()}).prependTo(aS);au.hide();a9("#"+a2+"Photo").css({cssFloat:aR,marginLeft:aU,marginRight:aU});af&&a9("select").not(a1.find("select")).filter(function(){return this.style.visibility!==g}).css({visibility:g}).one(ap,function(){this.style.visibility="inherit"});ba.transition==="fade"?a1.fadeTo(d,0,function(){b(0)}):b(d)}};a7.load=function(a){var f,e,b,d=a7.prep;aA=a6;aZ=a3[a4];a||(ba=aI(a9.extend({},a9.data(aZ,aT))));aO(am);aO(ag,ba.onLoad);ba.h=ba.height?aV(ba.height,aW)-aM-aC:ba.innerHeight&&aV(ba.innerHeight,aW);ba.w=ba.width?aV(ba.width,aY)-aL-aB:ba.innerWidth&&aV(ba.innerWidth,aY);ba.mw=ba.w;ba.mh=ba.h;if(ba.maxWidth){ba.mw=aV(ba.maxWidth,aY)-aL-aB;ba.mw=ba.w&&ba.w<ba.mw?ba.w:ba.mw}if(ba.maxHeight){ba.mh=aV(ba.maxHeight,aW)-aM-aC;ba.mh=ba.h&&ba.h<ba.mh?ba.h:ba.mh}f=ba.href;at.show();if(ba.inline){a5().hide().insertBefore(a9(f)[0]).one(am,function(){a9(this).replaceWith(a0.children())});d(a9(f))}else{if(ba.iframe){a1.one(ac,function(){var g=a9("<iframe frameborder='0' style='width:100%; height:100%; border:0; display:block'/>")[0];g.name=a2+ +new Date;g.src=ba.href;if(!ba.scrolling){g.scrolling="no"}if(az){g.allowtransparency="true"}a9(g).appendTo(a0).one(am,function(){g.src="//about:blank"})});d(" ")}else{if(ba.html){d(ba.html)}else{if(ai(f)){e=new Image;e.onload=function(){var c;e.onload=null;e.id=a2+"Photo";a9(e).css({border:aR,display:"block",cssFloat:"left"});if(ba.scalePhotos){b=function(){e.height-=e.height*c;e.width-=e.width*c};if(ba.mw&&e.width>ba.mw){c=(e.width-ba.mw)/e.width;b()}if(ba.mh&&e.height>ba.mh){c=(e.height-ba.mh)/e.height;b()}}if(ba.h){e.style.marginTop=Math.max(ba.h-e.height,0)/2+"px"}a3[1]&&(a4<a3.length-1||ba.loop)&&a9(e).css({cursor:"pointer"}).click(a7.next);if(az){e.style.msInterpolationMode="bicubic"}setTimeout(function(){d(e)},1)};setTimeout(function(){e.src=f},1)}else{f&&au.load(f,function(h,i,g){d(i==="error"?"Request unsuccessful: "+g.statusText:a9(this).children())})}}}}};a7.next=function(){if(!aA){a4=a4<a3.length-1?a4+1:0;a7.load()}};a7.prev=function(){if(!aA){a4=a4?a4-1:a3.length-1;a7.load()}};a7.close=function(){if(aQ&&!ao){ao=a6;aQ=a8;aO(ap,ba.onCleanup);aX.unbind("."+a2+" ."+an);aN.fadeTo("fast",0);a1.stop().fadeTo("fast",0,function(){aO(am);a0.remove();a1.add(aN).css({opacity:1,cursor:aU}).hide();setTimeout(function(){ao=a8;aO(aa,ba.onClosed)},1)})}};a7.element=function(){return a9(aZ)};a7.settings=aG;a9(a7.init)})(jQuery,this);(function(g){var a,d,f,c;g.extend({pnotify_remove_all:function(){var e=f.data("pnotify");e&&e.length&&g.each(e,function(){this.pnotify_remove&&this.pnotify_remove()})},pnotify_position_all:function(){d&&clearTimeout(d);d=null;var e=f.data("pnotify");if(e&&e.length){g.each(e,function(){var q=this.opts.pnotify_stack;if(q){if(!q.nextpos1){q.nextpos1=q.firstpos1}if(!q.nextpos2){q.nextpos2=q.firstpos2}if(!q.addpos2){q.addpos2=0}if(this.css("display")!="none"){var m,n,o={},k;switch(q.dir1){case"down":k="top";break;case"up":k="bottom";break;case"left":k="right";break;case"right":k="left";break}m=parseInt(this.css(k));if(isNaN(m)){m=0}if(typeof q.firstpos1=="undefined"){q.firstpos1=m;q.nextpos1=q.firstpos1}var p;switch(q.dir2){case"down":p="top";break;case"up":p="bottom";break;case"left":p="right";break;case"right":p="left";break}n=parseInt(this.css(p));if(isNaN(n)){n=0}if(typeof q.firstpos2=="undefined"){q.firstpos2=n;q.nextpos2=q.firstpos2}if(q.dir1=="down"&&q.nextpos1+this.height()>c.height()||q.dir1=="up"&&q.nextpos1+this.height()>c.height()||q.dir1=="left"&&q.nextpos1+this.width()>c.width()||q.dir1=="right"&&q.nextpos1+this.width()>c.width()){q.nextpos1=q.firstpos1;q.nextpos2+=q.addpos2+10;q.addpos2=0}if(q.animation&&q.nextpos2<n){switch(q.dir2){case"down":o.top=q.nextpos2+"px";break;case"up":o.bottom=q.nextpos2+"px";break;case"left":o.right=q.nextpos2+"px";break;case"right":o.left=q.nextpos2+"px";break}}else{this.css(p,q.nextpos2+"px")}switch(q.dir2){case"down":case"up":if(this.outerHeight(true)>q.addpos2){q.addpos2=this.height()}break;case"left":case"right":if(this.outerWidth(true)>q.addpos2){q.addpos2=this.width()}break}if(q.nextpos1){if(q.animation&&(m>q.nextpos1||o.top||o.bottom||o.right||o.left)){switch(q.dir1){case"down":o.top=q.nextpos1+"px";break;case"up":o.bottom=q.nextpos1+"px";break;case"left":o.right=q.nextpos1+"px";break;case"right":o.left=q.nextpos1+"px";break}}else{this.css(k,q.nextpos1+"px")}}if(o.top||o.bottom||o.right||o.left){this.animate(o,{duration:500,queue:false})}switch(q.dir1){case"down":case"up":q.nextpos1+=this.height()+10;break;case"left":case"right":q.nextpos1+=this.width()+10;break}}}});g.each(e,function(){var k=this.opts.pnotify_stack;if(k){k.nextpos1=k.firstpos1;k.nextpos2=k.firstpos2;k.addpos2=0;k.animation=true}})}},pnotify:function(q){f||(f=g("body"));c||(c=g(window));var r,m;if(typeof q!="object"){m=g.extend({},g.pnotify.defaults);m.pnotify_text=q}else{m=g.extend({},g.pnotify.defaults,q)}if(m.pnotify_before_init){if(m.pnotify_before_init(m)===false){return null}}var n,o=function(x,v){e.css("display","none");var w=document.elementFromPoint(x.clientX,x.clientY);e.css("display","block");var u=g(w),t=u.css("cursor");e.css("cursor",t!="auto"?t:"default");if(!n||n.get(0)!=w){if(n){b.call(n.get(0),"mouseleave",x.originalEvent);b.call(n.get(0),"mouseout",x.originalEvent)}b.call(w,"mouseenter",x.originalEvent);b.call(w,"mouseover",x.originalEvent)}b.call(w,v,x.originalEvent);n=u},e=g("<div />",{"class":"ui-pnotify "+m.pnotify_addclass,css:{display:"none"},mouseenter:function(s){m.pnotify_nonblock&&s.stopPropagation();if(m.pnotify_mouse_reset&&r=="out"){e.stop(true);r="in";e.css("height","auto").animate({width:m.pnotify_width,opacity:m.pnotify_nonblock?m.pnotify_nonblock_opacity:m.pnotify_opacity},"fast")}m.pnotify_nonblock&&e.animate({opacity:m.pnotify_nonblock_opacity},"fast");m.pnotify_hide&&m.pnotify_mouse_reset&&e.pnotify_cancel_remove();m.pnotify_closer&&!m.pnotify_nonblock&&e.closer.show()},mouseleave:function(s){m.pnotify_nonblock&&s.stopPropagation();n=null;e.css("cursor","auto");m.pnotify_nonblock&&r!="out"&&e.animate({opacity:m.pnotify_opacity},"fast");m.pnotify_hide&&m.pnotify_mouse_reset&&e.pnotify_queue_remove();e.closer.hide();g.pnotify_position_all()},mouseover:function(s){m.pnotify_nonblock&&s.stopPropagation()},mouseout:function(s){m.pnotify_nonblock&&s.stopPropagation()},mousemove:function(s){if(m.pnotify_nonblock){s.stopPropagation();o(s,"onmousemove")}},mousedown:function(s){if(m.pnotify_nonblock){s.stopPropagation();s.preventDefault();o(s,"onmousedown")}},mouseup:function(s){if(m.pnotify_nonblock){s.stopPropagation();s.preventDefault();o(s,"onmouseup")}},click:function(s){if(m.pnotify_nonblock){s.stopPropagation();o(s,"onclick")}},dblclick:function(s){if(m.pnotify_nonblock){s.stopPropagation();o(s,"ondblclick")}}});e.opts=m;if(m.pnotify_shadow&&!g.browser.msie){e.shadow_container=g("<div />",{"class":"ui-widget-shadow ui-corner-all ui-pnotify-shadow"}).prependTo(e)}e.container=g("<div />",{"class":"ui-widget ui-widget-content ui-corner-all ui-pnotify-container "+(m.pnotify_type=="error"?"ui-state-error":"ui-state-highlight")}).appendTo(e);e.pnotify_version="1.0.1";e.pnotify=function(t){var s=m;if(typeof t=="string"){m.pnotify_text=t}else{m=g.extend({},m,t)}e.opts=m;if(m.pnotify_shadow!=s.pnotify_shadow){if(m.pnotify_shadow&&!g.browser.msie){e.shadow_container=g("<div />",{"class":"ui-widget-shadow ui-pnotify-shadow"}).prependTo(e)}else{e.children(".ui-pnotify-shadow").remove()}}if(m.pnotify_addclass===false){e.removeClass(s.pnotify_addclass)}else{m.pnotify_addclass!==s.pnotify_addclass&&e.removeClass(s.pnotify_addclass).addClass(m.pnotify_addclass)}if(m.pnotify_title===false){e.title_container.hide("fast")}else{m.pnotify_title!==s.pnotify_title&&e.title_container.html(m.pnotify_title).show(200)}if(m.pnotify_text===false){e.text_container.hide("fast")}else{if(m.pnotify_text!==s.pnotify_text){if(m.pnotify_insert_brs){m.pnotify_text=m.pnotify_text.replace(/\n/g,"<br />")}e.text_container.html(m.pnotify_text).show(200)}}e.pnotify_history=m.pnotify_history;m.pnotify_type!=s.pnotify_type&&e.container.toggleClass("ui-state-error ui-state-highlight");if(m.pnotify_notice_icon!=s.pnotify_notice_icon&&m.pnotify_type=="notice"||m.pnotify_error_icon!=s.pnotify_error_icon&&m.pnotify_type=="error"||m.pnotify_type!=s.pnotify_type){e.container.find("div.ui-pnotify-icon").remove();if(m.pnotify_error_icon&&m.pnotify_type=="error"||m.pnotify_notice_icon){g("<div />",{"class":"ui-pnotify-icon"}).append(g("<span />",{"class":m.pnotify_type=="error"?m.pnotify_error_icon:m.pnotify_notice_icon})).prependTo(e.container)}}m.pnotify_width!==s.pnotify_width&&e.animate({width:m.pnotify_width});m.pnotify_min_height!==s.pnotify_min_height&&e.container.animate({minHeight:m.pnotify_min_height});m.pnotify_opacity!==s.pnotify_opacity&&e.fadeTo(m.pnotify_animate_speed,m.pnotify_opacity);if(m.pnotify_hide){s.pnotify_hide||e.pnotify_queue_remove()}else{e.pnotify_cancel_remove()}e.pnotify_queue_position();return e};e.pnotify_queue_position=function(){d&&clearTimeout(d);d=setTimeout(g.pnotify_position_all,10)};e.pnotify_display=function(){e.parent().length||e.appendTo(f);if(m.pnotify_before_open){if(m.pnotify_before_open(e)===false){return}}e.pnotify_queue_position();if(m.pnotify_animation=="fade"||m.pnotify_animation.effect_in=="fade"){e.show().fadeTo(0,0).hide()}else{m.pnotify_opacity!=1&&e.show().fadeTo(0,m.pnotify_opacity).hide()}e.animate_in(function(){m.pnotify_after_open&&m.pnotify_after_open(e);e.pnotify_queue_position();m.pnotify_hide&&e.pnotify_queue_remove()})};e.pnotify_remove=function(){if(e.timer){window.clearTimeout(e.timer);e.timer=null}if(m.pnotify_before_close){if(m.pnotify_before_close(e)===false){return}}e.animate_out(function(){if(m.pnotify_after_close){if(m.pnotify_after_close(e)===false){return}}e.pnotify_queue_position();m.pnotify_remove&&e.detach()})};e.animate_in=function(t){r="in";var s;s=typeof m.pnotify_animation.effect_in!="undefined"?m.pnotify_animation.effect_in:m.pnotify_animation;if(s=="none"){e.show();t()}else{if(s=="show"){e.show(m.pnotify_animate_speed,t)}else{if(s=="fade"){e.show().fadeTo(m.pnotify_animate_speed,m.pnotify_opacity,t)}else{if(s=="slide"){e.slideDown(m.pnotify_animate_speed,t)}else{if(typeof s=="function"){s("in",t,e)}else{e.effect&&e.effect(s,{},m.pnotify_animate_speed,t)}}}}}};e.animate_out=function(t){r="out";var s;s=typeof m.pnotify_animation.effect_out!="undefined"?m.pnotify_animation.effect_out:m.pnotify_animation;if(s=="none"){e.hide();t()}else{if(s=="show"){e.hide(m.pnotify_animate_speed,t)}else{if(s=="fade"){e.fadeOut(m.pnotify_animate_speed,t)}else{if(s=="slide"){e.slideUp(m.pnotify_animate_speed,t)}else{if(typeof s=="function"){s("out",t,e)}else{e.effect&&e.effect(s,{},m.pnotify_animate_speed,t)}}}}}};e.pnotify_cancel_remove=function(){e.timer&&window.clearTimeout(e.timer)};e.pnotify_queue_remove=function(){e.pnotify_cancel_remove();e.timer=window.setTimeout(function(){e.pnotify_remove()},isNaN(m.pnotify_delay)?0:m.pnotify_delay)};e.closer=g("<div />",{"class":"ui-pnotify-closer",css:{cursor:"pointer",display:"none"},click:function(){e.pnotify_remove();e.closer.hide()}}).append(g("<span />",{"class":"ui-icon ui-icon-circle-close"})).appendTo(e.container);if(m.pnotify_error_icon&&m.pnotify_type=="error"||m.pnotify_notice_icon){g("<div />",{"class":"ui-pnotify-icon"}).append(g("<span />",{"class":m.pnotify_type=="error"?m.pnotify_error_icon:m.pnotify_notice_icon})).appendTo(e.container)}e.title_container=g("<div />",{"class":"ui-pnotify-title",html:m.pnotify_title}).appendTo(e.container);m.pnotify_title===false&&e.title_container.hide();if(m.pnotify_insert_brs&&typeof m.pnotify_text=="string"){m.pnotify_text=m.pnotify_text.replace(/\n/g,"<br />")}e.text_container=g("<div />",{"class":"ui-pnotify-text",html:m.pnotify_text}).appendTo(e.container);m.pnotify_text===false&&e.text_container.hide();typeof m.pnotify_width=="string"&&e.css("width",m.pnotify_width);typeof m.pnotify_min_height=="string"&&e.container.css("min-height",m.pnotify_min_height);e.pnotify_history=m.pnotify_history;var p=f.data("pnotify");if(p==null||typeof p!="object"){p=[]}p=m.pnotify_stack.push=="top"?g.merge([e],p):g.merge(p,[e]);f.data("pnotify",p);m.pnotify_after_init&&m.pnotify_after_init(e);if(m.pnotify_history){var k=f.data("pnotify_history");if(typeof k=="undefined"){k=g("<div />",{"class":"ui-pnotify-history-container ui-state-default ui-corner-bottom",mouseleave:function(){k.animate({top:"-"+a+"px"},{duration:100,queue:false})}}).append(g("<div />",{"class":"ui-pnotify-history-header",text:"Redisplay"})).append(g("<button />",{"class":"ui-pnotify-history-all ui-state-default ui-corner-all",text:"All",mouseenter:function(){g(this).addClass("ui-state-hover")},mouseleave:function(){g(this).removeClass("ui-state-hover")},click:function(){g.each(p,function(){this.pnotify_history&&this.pnotify_display&&this.pnotify_display()});return false}})).append(g("<button />",{"class":"ui-pnotify-history-last ui-state-default ui-corner-all",text:"Last",mouseenter:function(){g(this).addClass("ui-state-hover")},mouseleave:function(){g(this).removeClass("ui-state-hover")},click:function(){for(var s=1;!p[p.length-s]||!p[p.length-s].pnotify_history||p[p.length-s].is(":visible");){if(p.length-s===0){return false}s++}s=p[p.length-s];s.pnotify_display&&s.pnotify_display();return false}})).appendTo(f);a=g("<span />",{"class":"ui-pnotify-history-pulldown ui-icon ui-icon-grip-dotted-horizontal",mouseenter:function(){k.animate({top:"0"},{duration:100,queue:false})}}).appendTo(k).offset().top+2;k.css({top:"-"+a+"px"});f.data("pnotify_history",k)}}m.pnotify_stack.animation=false;e.pnotify_display();return e}});var l=/^on/,j=/^(dbl)?click$|^mouse(move|down|up|over|out|enter|leave)$|^contextmenu$/,i=/^(focus|blur|select|change|reset)$|^key(press|down|up)$/,h=/^(scroll|resize|(un)?load|abort|error)$/,b=function(k,m){var e;k=k.toLowerCase();if(document.createEvent&&this.dispatchEvent){k=k.replace(l,"");if(k.match(j)){g(this).offset();e=document.createEvent("MouseEvents");e.initMouseEvent(k,m.bubbles,m.cancelable,m.view,m.detail,m.screenX,m.screenY,m.clientX,m.clientY,m.ctrlKey,m.altKey,m.shiftKey,m.metaKey,m.button,m.relatedTarget)}else{if(k.match(i)){e=document.createEvent("UIEvents");e.initUIEvent(k,m.bubbles,m.cancelable,m.view,m.detail)}else{if(k.match(h)){e=document.createEvent("HTMLEvents");e.initEvent(k,m.bubbles,m.cancelable)}}}e&&this.dispatchEvent(e)}else{k.match(l)||(k="on"+k);e=document.createEventObject(m);this.fireEvent(k,e)}};g.pnotify.defaults={pnotify_title:false,pnotify_text:false,pnotify_addclass:"",pnotify_nonblock:false,pnotify_nonblock_opacity:0.2,pnotify_history:true,pnotify_width:"300px",pnotify_min_height:"16px",pnotify_type:"notice",pnotify_notice_icon:"ui-icon ui-icon-info",pnotify_error_icon:"ui-icon ui-icon-alert",pnotify_animation:"fade",pnotify_animate_speed:"slow",pnotify_opacity:1,pnotify_shadow:false,pnotify_closer:true,pnotify_hide:true,pnotify_delay:8000,pnotify_mouse_reset:true,pnotify_remove:true,pnotify_insert_brs:true,pnotify_stack:{dir1:"down",dir2:"left",push:"bottom"}}})(jQuery);(function(a){a.fn.tipTip=function(c){var g={activation:"hover",keepAlive:false,maxWidth:"200px",edgeOffset:3,defaultPosition:"bottom",delay:400,fadeIn:200,fadeOut:200,attribute:"title",content:false,enter:function(){},exit:function(){}};var e=a.extend(g,c);if(a("#tiptip_holder").length<=0){var b=a('<div id="tiptip_holder" style="max-width:'+e.maxWidth+';"></div>');var d=a('<div id="tiptip_content"></div>');var f=a('<div id="tiptip_arrow"></div>');a("body").append(b.html(d).prepend(f.html('<div id="tiptip_arrow_inner"></div>')))}else{var b=a("#tiptip_holder");var d=a("#tiptip_content");var f=a("#tiptip_arrow")}return this.each(function(){var i=a(this);if(e.content){var l=e.content}else{var l=i.attr(e.attribute)}if(l!=""){if(!e.content){i.removeAttr(e.attribute)}var h=false;if(e.activation=="hover"){i.hover(function(){k()},function(){if(!e.keepAlive){j()}});if(e.keepAlive){b.hover(function(){},function(){j()})}}else{if(e.activation=="focus"){i.focus(function(){k()}).blur(function(){j()})}else{if(e.activation=="click"){i.click(function(){k();return false}).hover(function(){},function(){if(!e.keepAlive){j()}});if(e.keepAlive){b.hover(function(){},function(){j()})}}}}function k(){e.enter.call(this);d.html(l);b.hide().removeAttr("class").css("margin","0");f.removeAttr("style");var y=parseInt(i.offset()["top"]);var p=parseInt(i.offset()["left"]);var v=parseInt(i.outerWidth());var A=parseInt(i.outerHeight());var x=b.outerWidth();var s=b.outerHeight();var w=Math.round((v-x)/2);var o=Math.round((A-s)/2);var n=Math.round(p+w);var m=Math.round(y+A+e.edgeOffset);var t="";var C="";var u=Math.round(x-12)/2;if(e.defaultPosition=="bottom"){t="_bottom"}else{if(e.defaultPosition=="top"){t="_top"}else{if(e.defaultPosition=="left"){t="_left"}else{if(e.defaultPosition=="right"){t="_right"}}}}var r=(w+p)<parseInt(a(window).scrollLeft());var q=(x+p)>parseInt(a(window).width());if((r&&w<0)||(t=="_right"&&!q)||(t=="_left"&&p<(x+e.edgeOffset+5))){t="_right";C=Math.round(s-13)/2;u=-12;n=Math.round(p+v+e.edgeOffset);m=Math.round(y+o)}else{if((q&&w<0)||(t=="_left"&&!r)){t="_left";C=Math.round(s-13)/2;u=Math.round(x);n=Math.round(p-(x+e.edgeOffset+5));m=Math.round(y+o)}}var z=(y+A+e.edgeOffset+s+8)>parseInt(a(window).height()+a(window).scrollTop());var B=((y+A)-(e.edgeOffset+s+8))<0;if(z||(t=="_bottom"&&z)||(t=="_top"&&!B)){if(t=="_top"||t=="_bottom"){t="_top"}else{t=t+"_top"}C=s;m=Math.round(y-(s+5+e.edgeOffset))}else{if(B|(t=="_top"&&B)||(t=="_bottom"&&!z)){if(t=="_top"||t=="_bottom"){t="_bottom"}else{t=t+"_bottom"}C=-12;m=Math.round(y+A+e.edgeOffset)}}if(t=="_right_top"||t=="_left_top"){m=m+5}else{if(t=="_right_bottom"||t=="_left_bottom"){m=m-5}}if(t=="_left_top"||t=="_left_bottom"){n=n+5}f.css({"margin-left":u+"px","margin-top":C+"px"});b.css({"margin-left":n+"px","margin-top":m+"px"}).attr("class","tip"+t);if(h){clearTimeout(h)}h=setTimeout(function(){b.stop(true,true).fadeIn(e.fadeIn)},e.delay)}function j(){e.exit.call(this);if(h){clearTimeout(h)}b.fadeOut(e.fadeOut)}}})}})(jQuery);jQuery(function(g){var e=g("meta[name=csrf-token]").attr("content"),h=g("meta[name=csrf-param]").attr("content");g.fn.extend({triggerAndReturn:function(i,k){var j=new g.Event(i);this.trigger(j,k);return j.result!==false},callRemote:function(){var k=this,n=k.attr("method")||k.attr("data-method")||"GET",j=k.attr("action")||k.attr("href"),i=k.attr("data-type")||(g.ajaxSettings&&g.ajaxSettings.dataType);if(j===undefined){throw"No URL specified for remote call (action or href must be present)."}else{var m=g(this),l=k.is("form")?k.serializeArray():[];g.ajax({url:j,data:l,dataType:i,type:n.toUpperCase(),beforeSend:function(o){o.setRequestHeader("Accept","text/javascript");if(m.triggerHandler("ajax:beforeSend")===false){return false}},success:function(p,o,q){k.trigger("ajax:success",[p,o,q])},complete:function(o){k.trigger("ajax:complete",o)},error:function(q,o,p){k.trigger("ajax:error",[q,o,p])}})}}});g("body").delegate("a[data-confirm], button[data-confirm], input[data-confirm]","click.rails",function(){var i=g(this);if(i.triggerAndReturn("confirm")){if(!confirm(i.attr("data-confirm"))){return false}}});g("form[data-remote]").live("submit.rails",function(i){g(this).callRemote();i.preventDefault()});g("a[data-remote],input[data-remote]").live("click.rails",function(i){g(this).callRemote();i.preventDefault()});g("a[data-method]:not([data-remote])").live("click.rails",function(m){var l=g(this),j=l.attr("href"),n=l.attr("data-method"),k=g('<form method="post" action="'+j+'"></form>'),i='<input name="_method" value="'+n+'" type="hidden" />';if(h!==undefined&&e!==undefined){i+='<input name="'+h+'" value="'+e+'" type="hidden" />'}k.hide().append(i).appendTo("body");m.preventDefault();k.submit()});var c="input[data-disable-with]",d="form[data-remote]:has("+c+")",b="form:not([data-remote]):has("+c+")";var a=function(){g(this).find(c).each(function(){var i=g(this);i.data("enable-with",i.val()).attr("value",i.attr("data-disable-with")).attr("disabled","disabled")})};g(d).live("ajax:before.rails",a);g(b).live("submit.rails",a);g(d).live("ajax:complete.rails",function(){g(this).find(c).each(function(){var i=g(this);i.removeAttr("disabled").val(i.data("enable-with"))})});var f=g().jquery;if(!((f==="1.4.3")||(f==="1.4.4"))){alert("This rails.js does not support the jQuery version you are using. Please read documentation.")}});