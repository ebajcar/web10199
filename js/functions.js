// JavaScript Document
	
	//INIT
	$(document).ready(function() {
		
		current_hash = '';
		scrolling = 0;
		
		document.addEventListener("touchmove",function(){scrolling = 1;},false);
		window.onscroll = function() {scrolling = 0;};
		
		//MENU NAV	
		$(function() {
        	$('div#menu a').bind('click',function(event){
            	var $anchor = $(this);
				current_area = $anchor.attr('href');
               	if(timeline_open == 1){
					$('#timeline_wrapper').fadeOut(400,function(){
						$('#site_content').fadeIn(400,function(){
							$('html, body').stop().animate({
								scrollTop: $($anchor.attr('href')).offset().top - 100
							}, 700,'easeInOutSine');
							event.preventDefault();	
							timeline_open == 0;
						});											
					});		
				}else{
					$('html, body').stop().animate({
						scrollTop: $($anchor.attr('href')).offset().top - 100
					}, 700,'easeInOutSine');
					window.location = base_url + '/#!/' + current_area;
					event.preventDefault();
				}
			});
        });
		
		//MOBILE MENU
		$(function() {
			$('div#mobile_submenu a').bind('click',function(event){
				var $anchor = $(this);	
				$('html, body').stop().animate({
					scrollTop: $($anchor.attr('href')).offset().top - 56
				}, 700,'easeInOutSine',function(){$('#mobile_submenu').slideUp('normal', function() {});});
				event.preventDefault();
			});
		});
		
		$('.ui-loader').css('display','none');
		
		//DEEP LINKS
		if(window.location.hash) {
			current_hash = window.location.hash;
			hash_array = current_hash.split('_');
			hash_id = hash_array[1];
			
			if(current_hash.indexOf("headline") != -1){
				//hash_id = hash_array[1];
				if(hash_id != ''){
					show_headline(hash_id);
				}
			}else if(current_hash.indexOf("work") != -1 && typeof(hash_id) !== 'undefined'){
				hash_cat = hash_array[2];
				show_work(hash_id,hash_cat);
			}else if(current_hash.indexOf("job") != -1){
				//hash_id = hash_array[1];
				show_jobs();
				if(hash_id != ''){
					show_job(hash_id,'');
				}
			}else if(current_hash.indexOf("timeline") != -1){
				show_timeline();
			}else{
				url_array = current_hash.split('#!/');
				$('html, body').stop().animate({
					scrollTop: $(url_array[1]).offset().top - 100
				}, 700,'easeInOutSine');
			}
		}
		
	});
	
	/*function get_meta(){
		
		if(window.location.hash && window.location.hash != '#_' && window.location.hash != '#'){
			
			current_hash = window.location.hash;
			hash_array = current_hash.split('_');
			id = hash_array[1];
			
			if(current_hash.indexOf("headline") != -1){
				type = 'headline';
			}else if(current_hash.indexOf("work") != -1){
				type = 'work';
			}else if(current_hash.indexOf("job") != -1){
				type = 'job';
			}
			
			if(window.XMLHttpRequest){var xmlhttp=new XMLHttpRequest();}
			
			xmlhttp.onreadystatechange=function(){
				if (xmlhttp.readyState==4 && xmlhttp.status==200){
					meta_array = xmlhttp.responseText.split(',');
					
					$('head').append ('<meta name="description" content="'+meta_array[1]+'" />');
					$('head').append ('<link rel="image_src" href="'+meta_array[2]+'" />');
					$('head').append ('<title id="meta_title">'+meta_array[0]+'</title>');
					$('head').append ('<meta property="og:title" content="'+meta_array[0]+'"/>');
					$('head').append ('<meta property="og:url" content="'+base_url+'/'+window.location.hash+'"/>');
					$('head').append ('<meta property="og:image" content="'+meta_array[2]+'"/>');
					$('head').append ('<meta property="og:description" content="'+meta_array[1]+'"/>');
				}
			}
					
			xmlhttp.open("GET",base_url+"/ajax/get_meta/"+type+"/"+id,true);
			xmlhttp.send('');
			
		}else{
			$('head').append ('<meta name="description" content="'+meta_text+'" />');
			$('head').append ('<link rel="image_src" href="'+meta_image+'" />');
			$('head').append ('<title id="meta_title">'+meta_title+'</title>');
			$('head').append ('<meta property="og:title" content="'+meta_title+'"/>');
			$('head').append ('<meta property="og:url" content="'+base_url+'"/>');
			$('head').append ('<meta property="og:image" content="'+meta_image+'"/>');
			$('head').append ('<meta property="og:description" content="'+meta_text+'"/>');
		}
		
	}*/
		
	//CHECK MOBILE
	function check_mobile(){
		if(window_width <= 480){
			return true;	
		}else{
			return false;	
		}
	}
	
	//CHECK TOUCH DEVICE
	function get_touch_device() {
  		return !!('ontouchstart' in window);
	}
		
	//SHOW / HIDE	
	function show_fade(element_id){
		if ( $('#'+element_id).is(':visible')){
			$('#'+element_id).fadeOut(200);
		}else{
			$('#'+element_id).fadeIn(200);
		}
	}
	
	function show_slide(element_id){
		if ( $('#'+element_id).is(':visible')){
			$('#'+element_id).slideUp('normal', function() {});
		}else{
			$('#'+element_id).slideDown('normal', function() {});
		}
	}
	
	//INIT SLIDER
	function init_slider(element,element2){
		if(!is_mobile){
			
			if(element2 == '.team'){
				$('#teams').css('width', Math.floor((team_count/2) + (team_count%2)) * 281 + 'px');
			}
			
			$(element).thumbnailScroller({ 
				scrollerType:"hoverPrecise", 
				scrollerOrientation:"horizontal", 
				scrollSpeed:2, 
				scrollEasing:"easeOutCirc", 
				scrollEasingAmount:400, 
				acceleration:4, 
				scrollSpeed:800, 
				noScrollCenterSpace:10, 
				autoScrolling:0, 
				autoScrollingSpeed:2000, 
				autoScrollingEasing:"easeInOutQuad", 
				autoScrollingDelay:500 
			});		
			
			center_slider(element);
			if(is_touch_device == false){
				slide_hover(element2);
			}
		}
	}
	
	function hide_slide(element){
		$(element).slideUp(500);
		window.location.hash = '!/';
	}

	//CENTER SLIDER
	function center_slider(element){
		slider_width = $(element).find('.jTscroller').outerWidth( true );
		if(slider_width > window_width){
			$(element).find('.jTscroller').css('left', - ( (slider_width - window_width) / 2 ) + 'px');
		}else{
			$(element).find('.jTscroller').css('left', ( (window_width - slider_width) / 2 ) + 'px');		
		}
	}
	
	//SLIDE HOVER
	function slide_hover(element){
		$(element).hover(
		  function () {
			$(this).stop(true,true).find(element+'_content').fadeIn(300);
		  }, 
		  function () {
			$(this).stop(true,true).find(element+'_content').fadeOut(300);
		  }
		);
	}	
	
	//SLIDE TOUCH
	current_touch_slide = 0;
	function slide_touch(el){
		$(el).stop(true,true).find('.team_content').fadeIn(200,function(){
			$(current_touch_slide).fadeOut(200,function(){});
			current_touch_slide = $(el).find('.team_content');
		});
	}
	
	//SHOW HEADLINE
	function show_headline(id){
		
		$('#arquive_view').slideUp(600);
		
		$('#headlines_view_content').stop().fadeOut(400,function(){
			document.getElementById('headlines_view_content').innerHTML = '';
			$('#headlines_view_wrapper').addClass('loading');												  
		});
		
		if(window.XMLHttpRequest){xmlhttp=new XMLHttpRequest();}
		
		xmlhttp.onreadystatechange=function(){
			if (xmlhttp.readyState==4 && xmlhttp.status==200){
				current_headline_img = 1;
				$('#headlines_view_content').css('display','none');
				$('#headlines_view_wrapper').removeClass('loading');
				document.getElementById('headlines_view_content').innerHTML = xmlhttp.responseText;
				$('#headlines_view_content').stop().fadeIn(400,function(){ window.location.hash = '!/headline_'+id;});
				if(!is_mobile){
					$('#headlines_view_wrapper').animate({height: Math.max($('#headlines_view_content').height(),525) + 'px'},200,function(){});
				}
			}
		}
				
		xmlhttp.open("GET",base_url+"/ajax/get_headline/"+id,true);
		xmlhttp.send('');	
		
		$('#headlines_view').slideDown(600,'easeOutQuart',function(){});
		$('html, body').stop().animate({scrollTop: '0'}, 500,'easeOutQuart');
		
	}	
	
	function hide_headline(type){
		if(type == 0){
			$('#headlines_view').slideUp(500);
		}else{
			$('#arquive_view').slideDown(500);	
			$('#headlines_view').slideUp(500);	
		}
		window.location.hash = '!/';
	}

	//SHOW WORK
	function show_work(id,cat){
		
		$('#work_menus').find('a').removeClass('work_select');
		$('#cat_menu'+cat).addClass('work_select');
		
		$('#work_view_content').stop().fadeOut(400,function(){
			document.getElementById('work_view_content').innerHTML = '';
			$('#work_view_wrapper').addClass('loading');												  
		});
		
		if(window.XMLHttpRequest){xmlhttp=new XMLHttpRequest();}
		
		xmlhttp.onreadystatechange=function(){
			if (xmlhttp.readyState==4 && xmlhttp.status==200){
				current_work_img = 1;
				$('#work_view_content').css('display','none');
				$('#work_view_wrapper').removeClass('loading');
				document.getElementById('work_view_content').innerHTML = xmlhttp.responseText;
				$('#work_view_content').stop().fadeIn(400,function(){ window.location.hash = '!/work_'+id+'_'+cat; });
				$('#headlines_view_wrapper').animate({height: Math.max($('#work_view_wrapper').height(),525) + 'px'},200,function(){});
				}
		}
				
		xmlhttp.open("GET",base_url+"/ajax/get_work/"+id,true);
		xmlhttp.send('');	
		
		$('#work_view').slideDown(600,'easeOutQuart',function(){});
		work_position = $('#work_view').offset();
		if(!is_mobile){
			$('html, body').stop().animate({scrollTop: work_position.top - 200}, 500,'easeOutQuart');
		}else{
			$('html, body').stop().animate({scrollTop: work_position.top - 50}, 500,'easeOutQuart');
		}
	}	

	function filter_work(cat,el){
		
		window.location.hash = '!/';
		
		$('#work_menus').find('a').removeClass('work_select');
		$(el).addClass('work_select');
		
		$('#work_view').slideUp(600,'easeOutQuart',function(){});
		
		work_stopped = 1;
		works_width = (Math.round((work_counts[cat] - 0.1)/2) + (work_counts[cat]%2)) * 380;
		
		if(cat == 0){
			thiscat = '.work';
		}else{
			thiscat = '.cat'+cat;
		}
		
		if(!is_mobile){
			if(works_width < window_width){
				$('#works').animate({left: (window_width/2) - (works_width/2) + 'px'},function(){});
			}else{
				$('#works').animate({left: ((window_width - works_width)/2) + 'px'},function(){});
			}
		}
		
		$('#works').isotope({ filter: thiscat},function(){
			
			slider_width = $('#w_wrapper').find('.jTscroller').width();
			if(slider_width > window_width){
				work_stopped = 0;
			}else{
				work_stopped = 1;
			}	
			init_slider('#w_wrapper');
		
		});
	
	}
	
	//FIELD FOCUS
	function field_focus(element,value){
		if(element.value == value){
			$(element).val('');
		}
	}
	
	
	//BALLS
	$(document).ready(function() {
		
		anim_interval = 0;
		ball_wrapper_width = 600;	
		ball_wrapper_height = 500;
		ball_inner_width = 500;	
		ball_inner_height = 400;
		wrapper = $('#ballon_wrapper');
		inner = $('#ballon_inner');
		ball_back = $('#ballon_back');
		ball1 = $('#ballon1');
		ball2 = $('#ballon2');
		ball3 = $('#ballon3');
		ball4 = $('#ballon4');
		ball5 = $('#ballon5');
		ball_back_img = ball_back.find('img');
		ball1_img = ball1.find('img');
		ball2_img = ball2.find('img');
		ball3_img = ball3.find('img');
		ball4_img = ball4.find('img');
		ball5_img = ball5.find('img');
		
		if(!is_mobile && !is_touch_device){
			$('.ball').hover(
				function(){
					$(this).stop(true,false).find('.ball_title').fadeIn();
				},
				function(){
					$(this).stop(true,false).find('.ball_title').fadeOut();
				}
			);
		
		}else if(!is_mobile){
			$('.ball').click(
				function(){
					$('.ball').find('.ball_title').fadeOut(200,function(){});
					$(this).stop(true,false).find('.ball_title').fadeIn();
				}
			);		
		}
		
		function ball_1(){
			ball1_img.animate({width:100,height:70},1500,'linear',function(){
				ball1_img.animate({width:75,height:95},1500,'easeInSine',function(){
					ball1_img.animate({width:80,height:80},1500,'linear',function(){
						ball_1();	
						
					});	
				});										
			});
		}
		
		function ball_2(){
			ball2_img.animate({width:90, height:50},2500,'easeInSine',function(){
					ball2_img.animate({width:60, height:75},2200,'linear',function(){
						ball_2();	
					});	
													
			});
		}
		
		function ball_3(){
			ball3_img.animate({width:84, height:65},900,'linear',function(){
				ball3_img.animate({width:76, height:73},1400,'linear',function(){
					ball_3();	
				});										
			});
		}
		
		function ball_4(){
			ball4_img.animate({width:75, height:69},2000,'linear',function(){
				ball4_img.animate({width:65, height:80},1300,'easeInSine',function(){
					ball4_img.animate({width:89, height:50},1800,'linear',function(){
						ball_4();	
					});	
				});										
			});
		}
		
		function ball_5(){
			ball5_img.animate({width:70, height:100},1300,'linear',function(){
				ball5_img.animate({width:100, height:68},1800,'easeInSine',function(){
					ball5_img.animate({width:85, height:79},1500,'linear',function(){
						ball_5();	
					});	
				});										
			});
		}
		
		function ball_backer(){
			ball_back_img.animate({width: 630},2000,'easeOutSine',function(){
				ball_back_img.animate({width: 700},1500,'easeInSine',function(){
					ball_backer();
				});
			});
		}
		
		window.onload = function(){
			if(!is_mobile){
				ball_1();
				ball_2();
				ball_3();
				ball_4();
				ball_5();
			}
		}
		//ball_backer();
		
		if(!is_mobile && ! is_touch_device){
		wrapper.hover(
			 function () {

				$(this).mousemove(function(e){
					var now = new Date().getTime();
					if(now - anim_interval > 50){
						pos=findPos(this);
						mouseCoords=(e.pageX-pos[1]);
						mouseCoordsY=(e.pageY-pos[0]);
						mousePercentX=mouseCoords/ball_inner_width;
						mousePercentY=mouseCoordsY/ball_inner_height;
						destX=Math.round(((ball_wrapper_width-ball_inner_width)*(mousePercentX)));
						destY=Math.round(((ball_wrapper_height-ball_inner_height)*(mousePercentY)));
						ball1.stop(true,false).animate({marginLeft:destX+230,marginTop:destY*0.3},3000,'easeOutCirc');
						ball2.stop(true,false).animate({marginLeft:(destX*1.2)+400,marginTop:(destY*0.3)+170},3000,'easeOutCirc');
						ball3.stop(true,false).animate({marginLeft:(destX*0.8)+360,marginTop:(destY*0.6)+310},3000,'easeOutCirc');
						ball4.stop(true,false).animate({marginLeft:(destX*0.9)+80,marginTop:(destY*0.4)+280},3000,'easeOutCirc');
						ball5.stop(true,false).animate({marginLeft:(destX*1.2+30),marginTop:(destY*0.3)+90},3000,'easeOutCirc');
						ball_back.stop(true,false).animate({marginLeft:((-destX) *0.5),marginTop:((-destY +300)*0.3)},3000,'easeOutCirc');
						anim_interval = now;
					}
				});
			 }, 
			 function () {
				
			 }
		);
		}else if(!is_mobile && is_touch_device){
			
			document.getElementById(wrapper.attr('id')).addEventListener('touchstart', function(e) {
				if(scrolling == 1){
					e.preventDefault();
					scrolling = 0;
				}																			   
			 	}
			);
			document.getElementById(wrapper.attr('id')).addEventListener('touchmove', function(e) {
					
					if(scrolling == 1){
						e.preventDefault();
						scrolling = 0;
					}
					var touch = e.touches[0];
					
					var now = new Date().getTime();
					if(now - anim_interval > 50){
						pos=findPos(this);
						mouseCoords=(touch.pageX-pos[1]);
						mouseCoordsY=(touch.pageY-pos[0]);
						mousePercentX=mouseCoords/ball_inner_width;
						mousePercentY=mouseCoordsY/ball_inner_height;
						destX=Math.round(((ball_wrapper_width-ball_inner_width)*(mousePercentX)));
						destY=Math.round(((ball_wrapper_height-ball_inner_height)*(mousePercentY)));
						ball1.stop(true,false).animate({marginLeft:destX+230,marginTop:destY*0.3},2000,'easeOutCirc');
						ball2.stop(true,false).animate({marginLeft:(destX*1.2)+400,marginTop:(destY*0.3)+170},2000,'easeOutCirc');
						ball3.stop(true,false).animate({marginLeft:(destX*0.8)+360,marginTop:(destY*0.6)+310},2000,'easeOutCirc');
						ball4.stop(true,false).animate({marginLeft:(destX*0.9)+80,marginTop:(destY*0.4)+280},2000,'easeOutCirc');
						ball5.stop(true,false).animate({marginLeft:(destX*1.2+30),marginTop:(destY*0.3)+90},2000,'easeOutCirc');
						ball_back.stop(true,false).animate({marginLeft:((-destX) *0.5),marginTop:((-destY +300)*0.3)},2000,'easeOutCirc');
						anim_interval = now;
					}
				
			 }
		);
		}
	});	
	
	//SHOW BALLS AREAS
	previous_area = 0;
	function show_area(area){
		if(previous_area != area){
			$('#company_area'+previous_area).fadeOut(function(){
				$('.company_area').css('diplsay','none');
				$('#company_area'+area).fadeIn();
				if(is_mobile){
				$('html, body').stop().animate({scrollTop: $('#company_info').offset().top - 65}, 700,'easeInOutSine');
				}
			});	
			previous_area = area;
		}
	}
	
	/*** JOBS ***/
	function show_jobs(){
		if ( $('#join_us').is(':visible')){
			$('#join_us').slideUp();
			$('#jobs_btn').removeClass('active');
		}else{
			$('html, body').stop().animate({scrollTop: $('#team').offset().top - 100}, 700,'easeInOutSine');
			$('#join_us').slideDown();
			$('#jobs_btn').addClass('active');
		}	
	}
	
	//SHOW JOB
	function show_job(id,btn){
		
		$('.join_right').find('span').removeClass('active');
		$(btn).find('span').addClass('active');
		
		$('#join_subwrapper').animate({marginLeft: -650 }, 500);
		$('#job_content').stop(true,true).fadeOut(400);
		
		if(window.XMLHttpRequest){xmlhttp=new XMLHttpRequest();}
		
		xmlhttp.onreadystatechange=function(){
			if (xmlhttp.readyState==4 && xmlhttp.status==200){
				document.getElementById('job_content').innerHTML = xmlhttp.responseText;
				$('#job_content').stop(true,true).fadeIn(400, function(){
					$('#job_content_wrapper').animate({height: $('#job_content').height()},400);													   
					window.location.hash = '!/job_'+id;
				});
				
			}
		}
		
		xmlhttp.open("GET",base_url+"/ajax/get_job/"+id,true);
		xmlhttp.send('');
	}
	
	function close_jobs(){
		$('#join_subwrapper').animate({marginLeft: 0 }, 500);
		window.location.hash = '!/';
	}
	
	//GALLERYS
	nav_anim = 0;
	current_headline_img = 1;
	function headlines_gallery(action){
		img_count = $('div#headline_gallery img').length + $('div#headline_gallery iframe').length;
		margin = $('#gallery_table1').css('margin-left');
		
		if(action == 'prev' && nav_anim == 0 && current_headline_img > 1){
			nav_anim = 1;
			$('#gallery_table1').animate({marginLeft: parseInt(margin) + 380 + 'px'},250,function(){nav_anim=0;});
			current_headline_img--;
		}else if(action == 'next' && nav_anim == 0 && current_headline_img < img_count){
			nav_anim = 1;
			$('#gallery_table1').animate({marginLeft: parseInt(margin) - 380 + 'px'},250,function(){nav_anim=0;});
			current_headline_img++;
		}
	}
	
	current_work_img = 1;
	function work_gallery(action){
		img_count = $('div#work_gallery img').length + $('div#work_gallery iframe').length;
		margin = $('#gallery_table2').css('margin-left');
		
		if(action == 'prev' && nav_anim == 0 && current_work_img > 1){
			nav_anim = 1;
			$('#gallery_table2').animate({marginLeft: parseInt(margin) + 380 + 'px'},250,function(){nav_anim=0;});
			current_work_img--;
		}else if(action == 'next' && nav_anim == 0 && current_work_img < img_count){
			nav_anim = 1;
			$('#gallery_table2').animate({marginLeft: parseInt(margin) - 380 + 'px'},250,function(){nav_anim=0;});
			current_work_img++;
		}
	}
	
	//SEND MESSAGE
	function send_message(){
		if(document.getElementById("contact_st").value == ''){
			
			$('#contact_blocker').fadeIn(200);	
			
			name = document.getElementById("contact_name").value;
			email = document.getElementById("contact_email").value;
			text = document.getElementById("contact_text").value;
			
			var http = new XMLHttpRequest();
			var url = base_url+"/ajax/email_send/";
			var params = "name="+name+"&email="+email+"&text="+text;
			http.open("POST", url, true);

			http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			http.setRequestHeader("Content-length", params.length);
			http.setRequestHeader("Connection", "close");
				
			http.onreadystatechange = function(){
				if(http.readyState == 4 && http.status == 200) {
					//alert(http.responseText);
					document.getElementById("contact_msg").innerHTML = http.responseText;
					$('#contact_blocker').fadeOut(200);	
					$('#contact_msg').slideDown(500,function(){
						setTimeout('hide_msg()',4000);
					});
				}
			}
			http.send(params);
			
		}
	}
	
	function hide_msg(){
		$('#contact_msg').slideUp(500);	
	}
	
	timeline_open = 0;
	function show_timeline(){
		timeline_open = 1;
		$('#site_content').fadeOut(300,function(){
			if(document.getElementById('timeline_frame').src != base_url + "/timeline/"){									
				document.getElementById('timeline_frame').src = base_url + "/timeline/";
			}
			$('#timeline_wrapper').fadeIn();										
		});
	}
	
	/**** ARQUIVE ***/
	
	function show_arquive(){
		$('#headlines_view').slideUp(400);	
		$('#arquive_view').slideDown(400);		
	}
	
	function close_arquive(){
		$('#arquive_view').slideUp(400);	
	}
	
	current_arquive_page = 1;
	load_page = 1;
	function arquive_page(action){
		
		if(action == 'prev' && current_arquive_page > 1){
			current_arquive_page--;
		}else if(action == 'next' && current_arquive_page < arquive_total/4){
			current_arquive_page++;
		}
		
		if(current_arquive_page == 1){ $('#arquive_arrow1').css('opacity','0.3');}else{$('#arquive_arrow1').css('opacity','1');}
		if(current_arquive_page >= arquive_total/4){ $('#arquive_arrow2').css('opacity','0.3');}else{$('#arquive_arrow2').css('opacity','1');}
		
		if(load_page != current_arquive_page ){
			
			$('#arquive_content').stop().fadeOut(function(){
				document.getElementById('arquive_content').innerHTML = '';	
				$('#arquive_list').addClass('loading');
			})
			
			if(window.XMLHttpRequest){xmlhttp=new XMLHttpRequest();}
			
			xmlhttp.onreadystatechange=function(){
				if (xmlhttp.readyState==4 && xmlhttp.status==200){
					document.getElementById('arquive_content').innerHTML = xmlhttp.responseText;
					$('#arquive_list').removeClass('loading');
					$('#arquive_content').stop().fadeIn(function(){});		
					load_page = current_arquive_page;
				}
			}
			
			xmlhttp.open("GET",base_url+"/ajax/arquive_page/"+current_arquive_page,true);
			xmlhttp.send('');
		}
		
	}
	