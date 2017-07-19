$(document).ready(function(){

	// alert('doc is ready')

	$('.close-popup').click(function(){
		$('.opened-popup').fadeOut('slow');
	})

	
	$('#category').click(function(){
		$('.category-popup-container').fadeIn('slow');
	})

	$('#setting').click(function(){
		$('.setting-popup-container').fadeIn('slow');
	})

	$('#feedback').click(function(){
		$('.feedback-popup-container').fadeIn('slow');
	})

	$('#change_location').focus(function(){

		// alert('edit clicked');
		$('#change_location').val('');
	})

	$('#text_search').focus(function(){

		// alert('edit clicked');
		$('#text_search').val('');
	})

	$('#filter').click(function(){

        $('.hideshowbtn').html('SHOW');
		$('.right-panel-container').animate({right: '-300px'}, 250);

		$('#open-filter').animate({right:'0%'},500);
	})

	$('.mob-location-icon').click(function(){
		$('.left-mobile').toggle();
		$('.right-mobile').toggle();
	})

	$('.close-details').click(function(){
		$('#open-details').animate({left:'-125%'},250);
	})

	$('.close-filter').click(function(){
		$('#open-filter').animate({right:'-125%'},250);
	})


	$('.hideshowbtn').click(function(){
		var status = $('.hideshowbtn').html();
		if(status=='HIDE'){
			$('.hideshowbtn').html('SHOW');
			$('.right-panel-container').animate({right:'-300px'},250);
		}else if(status=='SHOW'){
			$('.hideshowbtn').html('HIDE');
			$('.right-panel-container').animate({right:'0'},500);
		}
	})



	$('.text-search-container').keypress(function(e) {
	    if(e.which == 13) {
	        // alert('You pressed enter!');
			$( "#search" ).trigger( "click" );

	    }
	});



	

	

	$('.already').click(function(){

		$('.signup-popup-container').fadeOut('fast');
		$('.login-popup-container').fadeIn('slow');

	})

	$('.donthave').click(function(){

		$('.login-popup-container').fadeOut('fast');
		$('.signup-popup-container').fadeIn('slow');

	})

	$('.forgot-password').click(function(){

		// alert('clicked');
		$('.login-popup-container').fadeOut('fast');
		$('.forgot-popup-container').fadeIn('slow');

	})

	$('.backtologin').click(function(){

		// alert('clicked');
		$('.forgot-popup-container').fadeOut('fast');
		$('.login-popup-container').fadeIn('slow');
		

	})

})



$(window).load(function(){

	// $('.preloader').fadeOut('slow');

})




