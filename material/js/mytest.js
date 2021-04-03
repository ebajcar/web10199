(function(){

    var settings = {
            trigger:'hover',
            title:'SYST10199 Web Programming ',
            content:'<p>Examine and explore. Make observations and describe in your own words.</p>',
            width:320,						
            multi:true,						
            closeable:false,
            style:'',
            delay:300,
            padding:true
    };

    // $('a[data-toggle="tab"]').on('click',function(e){
    // 	e.preventDefault();
    // 	var $this = $(this);
    // 	$this.parent().addClass('active').siblings().removeClass('active');
    // 	var $content = $this.closest('.nav-tabs').next().find($this.attr('href'));
    // 	$content.addClass('active').siblings().removeClass('active');
    // });

    $('#setup').webuiPopover({
        width:300,
        height:535,
        padding:false,
        animation:'pop',
        content:$('#optionsWrapper').html(),
    });	
    content:$('#optionsWrapper').remove();



    $(document).on('hover','span.option-checker',function(e){
        e.preventDefault();
        $(this).toggleClass('active');
        var text = $(this).hasClass('active')?'yes':'no';
        $(this).children('.text').text(text);
        updateSettings();
    });

    $(document).on('hover','span.option-box',function(e){
        e.preventDefault();
        $(this).addClass('active').siblings().removeClass('active');
        updateSettings();
    });


    $('.list-example').on('hover','.list-group-item',function(e){
        e.preventDefault();
        $(this).addClass('active').siblings().removeClass('active');
        var $content = $($(this).attr('href'));
        $content.addClass('active').siblings().removeClass('active');
        $('.webui-popover').hide();
    });

    




    // $('.btn-settings').on('click',function(e){
    // 		e.preventDefault();
    // 		$(this).addClass('active').siblings().removeClass('active');
    // 		var option = $(this).data('option');
    // 		settings[option]= $(this).data(option);					
    // 		initPopover();
    // });	

    // $('.btn-reset').on('click',function(e){
    // 	e.preventDefault();
    // 	location.reload();
    // });	

    function updateSettings(){
        settings.style=$('.option-style.active').data('option');
        settings.trigger=$('.option-trigger.active').data('option');
        settings.closeable=$('.option-closeable').hasClass('active');
        settings.multi = $('.option-mulit').hasClass('active');
        settings.arrow = $('.option-arrow').hasClass('active');
        initPopover();
    }		


    function initPopover(){					
        $('a.show-pop').webuiPopover('destroy').webuiPopover(settings);				
        $('a.myclass-pop').webuiPopover({title:'Title',content:'Content'});        
        var tableContent = $('#tableContent').html(),
            tableSettings = {content:tableContent,
                                width:500
                            };
        $('a.url-pop').webuiPopover({url:'#largeContent'});
        $('a.mframe-pop').webuiPopover({type:'iframe',url:'../sh/tut01.html',width:1200,height:600});
        $('a.mfram3-pop').webuiPopover({type:'iframe',url:'docs/code02.html',width:700,height:300});
        
        $('a.show-pop-table').webuiPopover('destroy').webuiPopover($.extend({},settings,tableSettings));

        var listContent = $('#listContent').html(),
            listSettings = {content:listContent,
                                title:'',
                                padding:false
                            };
        $('a.show-pop-list').webuiPopover('destroy').webuiPopover($.extend({},settings,listSettings));

        var largeContent = $('#largeContent').html(),
            largeSettings = {content:largeContent,
                                width:400,
                                height:350,
                                delay:{show:300,hide:1000},
                                closeable:true
                            };
        var popLarge = $('a.show-pop-large').webuiPopover('destroy').webuiPopover($.extend({},settings,largeSettings));


        $('a.show-pop-delay').webuiPopover('destroy').webuiPopover({trigger:'hover',width:300});
        $('a.show-pop-code-delay').webuiPopover('destroy').webuiPopover({
                                                                            trigger:'hover',
                                                                            width:300,
                                                                            delay:{
                                                                                show:0,
                                                                                hide:1000
                                                                            }
                                                                        });

         var
            iframeSettings = {	width:500,
                                height:350,
                                closeable:true,
                                padding:false,
                                type:'iframe',
                                url:'http://www.w3schools.com/'};					
        $('a.show-pop-iframe').webuiPopover('destroy').webuiPopover($.extend({},settings,iframeSettings));
         var
            iframeHome = {	width:560,
                                height:350,
                                closeable:true,
                                padding:false,
                                type:'iframe',
                                url:'http://mobile.sheridanc.on.ca/~bajcar/syst10049/'};
        $('a.show-pop-ifram2').webuiPopover('destroy').webuiPopover($.extend({},settings,iframeHome));                        

        var
            asyncSettings = {	width:'auto',
                                height:'200',
                                closeable:true,
                                padding:false,
                                cache:false,
                                url:'https://api.github.com/',
                                type:'async',
                                content:function(data){
                                    var html = '<ul class="list-group">';
                                    for(var key in data){
                                        html+='<li class="list-group-item"><a href="'+ data[key] +'" target="_blank">'
                                        + '<i class="glyphicon glyphicon-leaf"></i> '+ key+'</a>'+'</li>';	
                                    }
                                    html+='</ul>';
                                    return html;
                                }};
        $('a.show-pop-async').webuiPopover('destroy').webuiPopover($.extend({},settings,asyncSettings));

        $('a.show-pop-backdrop').webuiPopover('destroy').webuiPopover({content:'popover with backdrop!', backdrop:true});


        // var nocacheSettings = {
        // 		cache:true,
        // 		content:function(){
        // 			return $('#aa').text();
        // 		}
        // }

        
        // $('a.show-pop-uncache').webuiPopover('destroy').webuiPopover($.extend({},settings,nocacheSettings));

        $('#change').on('hover',function(e){
            e.preventDefault();
            $('#aa').text('changed text');
        })


        $('a.show-pop-event').each(function(i,item){
                var ename = $(item).text()+'.webui.popover';
                $(item).webuiPopover('destroy').webuiPopover(settings)
                .on(ename,function(e){
                    var log =  ename+' is trigged!';
                    if (console){
                        console.log(log);
                    }
                    $('#eventLogs').text($('#eventLogs').text()+'\n'+log);
                });
        });



        
        $('body').on('hover','.pop-hover',function(e){
            e.preventDefault();
            if (console){
                console.log('clicked');
            }
        });


        var inputSettints = {
            placement:'right',
            title:'',
            multi:false,
            width:220
        };
        

        $('.form-input').webuiPopover('destroy').webuiPopover($.extend({},settings,inputSettints));

        $('.form-input').on('focus',function(){
            $(this).webuiPopover('show');
        });

    }

    $('#resetLogs').on('hover',function(e){
        e.preventDefault();
        $('#eventLogs').text('');
    });


    initPopover();

    
    
        
})();
