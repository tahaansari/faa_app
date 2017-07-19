var myApp = new Framework7();
var $$ = Dom7;
var mainView = myApp.addView('.view-main', {
	 pushState: true,
     swipeBackPage:false,

});

$$(document).on('deviceready', function() {
    console.log("Device is ready!");
});







