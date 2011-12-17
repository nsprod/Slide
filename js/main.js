$(function(){
	var layouCode = '<h3>Ajouter votre code</h3><pre class="ed">&lt;script type=\'text/javascript\'&gt;\n//Javascript\n&lt;/script&gt;\n\n&lt;style&gt;\n//Css\n&lt;/style&gt;</pre>';
   	jQuery('.ed').addClass('dotted');
    jQuery('.ed').hallo({
      plugins: {
        'halloformat': {},
        'halloheadings': {},
        'hallojustify': {},
        'hallolists': {},
        'halloreundo': {}
      },
      editable: true
    });
    jQuery('.ed').bind('hallomodified', function(event, data) {
        jQuery('#modified').html("Editables modified");
    });
    jQuery('.ed').bind('halloselected', function(event, data) {
        jQuery('#modified').html("Selection made");
    });
    jQuery('.ed').bind('hallounselected', function(event, data) {
        jQuery('#modified').html("Selection removed");
    });
  	  
  	  //Click bouton mode visualisation
      jQuery('#disable').button().click(function() {
      	jQuery('.ed').removeClass('dotted');
      	$('#help').addClass('invisible');
        jQuery('.ed').hallo({editable: false});
      });
      
      //Click bouton mode édition
      jQuery('#enable').button().click(function() {
      	jQuery('.ed').addClass('dotted');
      	$('#help').removeClass('invisible');
        jQuery('.ed').hallo({editable: true});
      });
      
      $('.ed').live('focusin',function() {
      	isEditing = true;
      });
      $('.ed').live('focusout',function() {
      	isEditing = false;
      });
      
      $('body').keydown(function(event) {
      	if(!isEditing){
      		if (event.which == 84) {
      		if($('.slides').hasClass('template-default')){
      			$('.slides').removeClass('template-default');
      			$('.slides').addClass('template-io2011');
      		}else{
      			$('.slides').removeClass('template-io2011');
      			$('.slides').addClass('template-default');
      		}
		    event.preventDefault();
		  } 
      	}
      	
		});
		
		$('[contenteditable]').live('focus', function() {
			var $this = $(this)[0];
		    //range = $(this).caret().start;
		}).live('blur', function() {
		    prettyPrint();
		});		
		
		//Ajoute une slide
		$('#add').click(function(){
			$( "#dialog-modal" ).dialog( "open" );
		});
		
		//Supprimer une slide
		$('#delete').click(function(){
			if($('article').length > 1){
				deleteSlide();
				$('article.next').remove();
			}
		});
		
		//Dupliquer une slide
		$('#copy').click(function(){
			$('article.current').after('<article>' + $('article.current').html() + '</article>');
			
			handleDomLoaded();
			window.setTimeout(function() {
				nextSlide();},100);
			reloadHallo();
		});
		
		//Ajout slide type de layout
		$( "#dialog-modal" ).dialog({
			height: 350,
			modal: true,
			autoOpen: false
		});
		
		//Ajout de la slide comportant le layout choisi
		$('#LAYOUT_NORMAL, #LAYOUT_TITLE, #LAYOUT_CODE').click(function(){
			$( "#dialog-modal" ).dialog( "close" );
			var type = $(this).attr('id');
			if( type == "LAYOUT_NORMAL")
				$('article.current').after('<article><h3 class="ed">Titre</h3><p class="ed">Texte</p><h2 class="ed">Sous titre</h2></article>');
			else if(type == "LAYOUT_TITLE")
				$('article.current').after('<article><h3>Titre</h3><p>Texte</p></article>');
			else if(type == "LAYOUT_CODE")
				$('article.current').after('<article>'+layouCode+'</article>');
			//refresh le slider
			handleDomLoaded();
			//Passe au slide créé
/* 			goToSlide($('article').length-1); */
			window.setTimeout(function() {
				nextSlide();},100);
			reloadHallo();
		});
		
		
		function reloadHallo(){
			
			jQuery('.ed').addClass('dotted');
		    jQuery('.ed').hallo({
		      plugins: {
		        'halloformat': {},
		        'halloheadings': {},
		        'hallojustify': {},
		        'hallolists': {},
		        'halloreundo': {}
		      },
		      editable: true
		    });
		}
  });
