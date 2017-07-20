$(document).ready(function() {


    alert('device is ready');


    // Lockr.flush();
    // console.log('locker flushed');
    // return false;

    var base_url = "https://findanythinganywhere.com/";

    // variables for map use globally
    var map, geocoder, service, directionsService, directionsDisplay;

    // for multiple_markers
    var infowindow, cl_marker, multiple_marker;

    // for current stored location
    var current_position, place_id, location;

    // for last action
    var lastaction, find, find_text, search;

    // for filers
    var filter_currently, filter_radius;

    // misc
    var multiple_markers = [];
    var slider = "";

    var start, end;
    var resultfound;

    var src;
    // check for user logged in

    var near = "";

    initMap();

    function resetMapArea() {

        directionsDisplay.setMap(null);

        for (var i = 0; i < multiple_markers.length; i++) {
            multiple_markers[i].setMap(null);
        }

        map.setZoom(16);
        map.setCenter(current_position);

        $('#open-filter').animate({
            right: '-125%'
        }, 250);

        $('#open-details').animate({
            left: '-125%'
        }, 250);

        $('.right-panel-container').animate({
            right: '-300px'
        });

        $('#result_found_container').animate({
            right: '-200px'
        }, 250);

        $('.direction-btn').removeClass('direction-active');
        $("[data-id='WALKING']").addClass('direction-active');

        $('.hideshowbtn').fadeOut('fast');
        $('.hideshowbtn').html('HIDE');
    }

    function showPreloader() {
        $('.preloader').fadeIn();
    }

    function hidePreloader() {
        $('.preloader').fadeOut();
    }

    // function initmap start

    function initMap() {

        // var map initilize start

        alert('init map called');

        map = new google.maps.Map(document.getElementById('main_map'), {

            zoom: 16,
            zoomControl: true,
            streetViewControl: false,
            zoomControlOptions: {
                position: google.maps.ControlPosition.RIGHT_CENTER
            },
            mapTypeControl: false,
            fullscreenControl: false,
            styles: [

                {
                    featureType: 'all',
                    elementType: 'all',
                    stylers: [{
                            invert_lightness: 'true'
                        },
                        {
                            saturation: -100
                        }
                    ]
                },

                {
                    featureType: 'all',
                    elementType: 'labels.icon',
                    stylers: [{
                        visibility: 'off',

                    }]
                },
                {
                    featureType: 'all',
                    elementType: 'labels.text',
                    stylers: [{
                        visibility: 'on',
                    }]
                },
                {
                    featureType: 'road.arterial',
                    elementType: 'labels',
                    stylers: [{
                        visibility: 'on',

                    }]
                },

            ]

        });

        // var map initilize end

        geocoder = new google.maps.Geocoder;
        service = new google.maps.places.PlacesService(map);
        directionsService = new google.maps.DirectionsService();
        directionsDisplay = new google.maps.DirectionsRenderer();


        if (navigator.geolocation) {

            var options = {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            };

            navigator.geolocation.getCurrentPosition(function(position, error, options) {



                alert('location allowed');

                current_position = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };


                map.setCenter(current_position);

                cl_marker = new google.maps.Marker({
                    position: current_position,
                    map: map,
                    animation: google.maps.Animation.DROP,
                    icon: base_url + 'assets/website_assets/img/man1.png'
                });

                geocoder.geocode({

                    'location': current_position

                }, function(results, status) {

                    if (status === 'OK') {

                        if (results[0]) {

                            for (var i = 0; i < results[0].address_components.length; i++) {

                                if (results[0].address_components[i].types[0] === "administrative_area_level_2") {
                                    var city = results[0].address_components[i].long_name;
                                }

                                if (results[0].address_components[i].types[0] === "administrative_area_level_1") {
                                    var state = results[0].address_components[i].long_name;
                                }

                                if (results[0].address_components[i].types[0] === "country") {
                                    var country = results[0].address_components[i].long_name;
                                }

                                if (results[0].address_components[i].types[0] === "political") {
                                    var area = results[0].address_components[i].long_name;
                                }
                            }

                            place_id = results[0].place_id;
                            location = area + ", " + city + ", " + state + ", " + country;

                            $('#change_location').val(location);

                            $.ajax({

                                type: 'POST',
                                url: base_url + 'home/checklogin',
                                data: {
                                    place_id: place_id,
                                    position: current_position,
                                    location: location
                                },
                                success: function(result) {



                                    alert('check login checked');

                                    result = JSON.parse(result);
                                    // console.log(result);

                                    if (result.status == 'success') {

                                        $('.login-popup-container').fadeOut('fast');
                                        $('#logout').fadeIn('slow');


                                    }

                                    $('.preloader').fadeOut('fast');

                                },
                                error: function() {

                                    console.log('server error');
                                }
                            })

                        } else {

                            console.log("No reverse geocode results.")
                        }

                    } else {
                        alert('Geocoder failed due to: ' + status);

                    }

                });

            }, function() {

                alert('Location not allowed first');

                $('.enable-location').css('display','block');
                $('.preloader').fadeOut('fast');

                // handleLocationError(true, infowindow, map.getCenter());

            });

        } else {

            alert('Location not allowed');

            $('.enable-location').css('display','block');
            $('.preloader').fadeOut('fast');

            // handleLocationError(false, infowindow, map.getCenter());
        }
    }

    // function initmap end

    function handleLocationError(browserHasGeolocation, infowindow, pos) {
        // check condition and show error to the user
        // infowindow.setPosition(pos);
        // infowindow.setContent(browserHasGeolocation ?
        //     'Error: The Geolocation service failed.' :
        //     'Error: Your browser doesn\'t support geolocation.');
        // infowindow.open(map);
    }

    // get location and display on current location


    // find start 
    $('.find').click(function() {

        $('.disable-screen').fadeIn('slow');

        $('#text_search').val("");

        near = "in 1 Km";

        $('input:radio[class=filter-change][id=both]').prop('checked', true);
        $('input:radio[class=filter-change][id=onethousand]').prop('checked', true);

        resultfound = 0;

        resetMapArea();

        lastaction = 'find';

        find = $(this).attr('data-id');
        find_text = $(this).attr('data-name');


        $('.category-popup-container').fadeOut('fast');

        service.nearbySearch({

            location: current_position,
            radius: 1000,
            type: [find]

        }, callback);

        $.ajax({

            type: "POST",
            url: base_url + 'home/insertJourney',
            data: {

                place_id: place_id,
                location: location,
                looking_for: find_text,

            },
            success: function(result) {

                result = JSON.parse(result);
                
                console.log(result);

                if (result.status == 'success') {

                    $('#filter').fadeIn('slow');
                    console.log('Data Inserted');

                } else {

                    console.log('Data Insert Failee');

                }
            },
            error: function(error) {

                console.log('Server Error');

            }

        })

    })


    $('#search').click(function() {

        $('.disable-screen').fadeIn('slow');

        near = "<p class='adjust-zoom'>NOTE:- ADJUST ZOOM TO <br> SEE ALL RESULTS<p>";

        $('input:radio[class=filter-change][id=both]').prop('checked', true);
        $('input:radio[class=filter-change][id=onethousand]').prop('checked', true);

        resultfound = 0;

        $('#filter').fadeOut('fast');
        $('input:radio[class=filter-change][id=onethousand]').prop('checked', true);

        lastaction = 'search';

        resetMapArea();

        search = $('#text_search').val();

        var request = {
            location: current_position,
            radius: 1000,
            query: search
        };

        service = new google.maps.places.PlacesService(map);
        service.textSearch(request, callback);

        $.ajax({

            type: "POST",
            url: base_url + 'home/insertJourney',
            data: {

                place_id: place_id,
                location: location,
                looking_for: search,

            },
            success: function(result) {

                result = JSON.parse(result);
                console.log(result);
                if (result.status == 'success') {

                    console.log('Data Inserted');

                } else {

                    console.log('Data Insert Failee');

                }
            },
            error: function(error) {

                console.log('Server Error');

            }

        })

    })


    $(".filter-change").change(function() {

        $('.disable-screen').fadeIn('slow');

        $('#text_search').val("");

        near = $('input[name=radius]:checked').val();
        near = 'in ' + near / 1000 + ' Km';

        resultfound = 0;
        resetMapArea();

        filter_currently = $('input[name=showStatus]:checked').val();
        filter_radius = $('input[name=radius]:checked').val();

        if (lastaction == 'find') {

            if (filter_currently == 'true') {

                service.nearbySearch({
                    location: current_position,
                    radius: filter_radius,
                    openNow: true,
                    type: [find]
                }, callback);

            } else {

                service.nearbySearch({
                    location: current_position,
                    radius: filter_radius,
                    openNow: false,
                    type: [find]
                }, callback);

            }

        } else if (lastaction == 'search') {

            if (filter_currently == 'true') {

                var request = {
                    location: current_position,
                    radius: filter_radius,
                    openNow: true,
                    query: search
                };

            } else {

                var request = {
                    location: current_position,
                    radius: filter_radius,
                    openNow: false,
                    query: search
                };
            }

            service = new google.maps.places.PlacesService(map);
            service.textSearch(request, callback);
        }
    })

    function callback(results, status, pagination) {

        resultfound += results.length;

        if (status === google.maps.places.PlacesServiceStatus.OK) {

            if (pagination.hasNextPage) {

                pagination.nextPage();

                $('#result_found_container').html('<p class="result-found">Searching..</p>');

                $('#result_found_container').animate({
                    right: '15px'
                }, 500);

            } else {

                if (lastaction == 'find') {

                    $('#result_found_container').html('<p class="result-found"><span>' + resultfound + '</span> results found for <br> ' + find_text + ' <br> ' + near + '</p>');

                } else if (lastaction == 'search') {

                    $('#result_found_container').html('<p class="result-found"><span>' + resultfound + '</span> results found for <br> ' + search + ' <br> ' + near + '</p>');

                }

                $('#result_found_container').animate({
                    right: '15px'
                }, 500);

                $('.disable-screen').fadeOut('fast');

            }

            for (var i = 0; i < results.length; i++) {
                createMarker(results[i]);
            }

        } else if (status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {

                if (lastaction == 'find') {

                    $('#result_found_container').html('<p class="result-found">0 results found for <br> ' + find_text + ' <br> ' + near + '</p>');

                } else if (lastaction == 'search') {

                    $('#result_found_container').html('<p class="result-found">0 results found for <br> ' + search + ' <br> ' + near + '</p>');

                }

            $('#result_found_container').animate({
                right: '15px'
            }, 500);

            $('.disable-screen').fadeOut('fast');



        } else if (status === google.maps.places.PlacesServiceStatus.OVER_QUERY_LIMIT) {

            $.ajax({

                type: "POST",
                url: base_url + 'home/insertLimit',
                success: function(result) {

                    result = JSON.parse(result);
                    // console.log(result);
                    if (result.status == 'success') {


                    } else {

                    }
                },
                error: function(error) {

                    console.log('Server Error');

                }

            })


            alert('Daily Request limit exceeded for static search');
            $('.disable-screen').fadeOut('fast');

        }

    }


    function createMarker(place) {

        console.log("createMarker Place " + place.place_id);

        infowindow = new google.maps.InfoWindow();

        multiple_marker = new google.maps.Marker({

            map: map,
            position: place.geometry.location,
            icon: base_url + 'assets/website_assets/img/pin.png',
            animation: google.maps.Animation.DROP,

        });

        multiple_markers.push(multiple_marker);

        google.maps.event.addListener(multiple_marker, 'mouseover', function() {

            infowindow.setContent("<div><h5 class='labelcss'><b>" + place.name + "</b></h5></div>");
            infowindow.open(map, this);

        });

        google.maps.event.addListener(multiple_marker, 'click', function() {

            console.log("Click Event Place " + place.place_id);

            $('#open-details').animate({
                left: '-125%'
            }, 250);

            service.getDetails({

                placeId: place.place_id

            }, function(place, status) {

                console.log("Details Place " + place.place_id);

                if (status === google.maps.places.PlacesServiceStatus.OK) {

                    if (place.photos != undefined) {

                        console.log(place.photos[0]);

                        src = place.photos[0].getUrl({
                            'maxWidth': 1000,
                            'maxHeight': 1000
                        });
                        src = src.replace("w1000-h1000-", "");
                        src = src.slice(0, -1);
                        src = src + "w1000-h1000";

                        slider = "<img class='place-image show_photos' src='" + src + "' alt='no image available'/>";

                    } else {

                        slider = "<img class='place-image show_photos' src='" + base_url + "assets/website_assets/img/default.png" + "' alt=''/>";;
                    }

                    var avgrating, currently, number, name, website, address, openinghours, reviewContent, rating;

                    if (place.rating != undefined) {
                        avgrating = place.rating;
                    } else {
                        avgrating = "NA";
                    }

                    if (place.opening_hours != undefined) {

                        if (place.opening_hours.open_now) {
                            currently = "<b class='active-green'>OPEN</b>";
                        } else {
                            currently = "<b class='deactive-red'>CLOSE</b>";
                        }

                    } else {
                        currently = 'NA';
                    }

                    if (place.international_phone_number != undefined) {
                        number = place.international_phone_number;
                    } else {
                        number = "NA";
                    }

                    if (place.name != undefined) {
                        name = place.name;
                    } else {
                        name = "NA";
                    }

                    if (place.website != undefined) {

                        website = "<a class='text-black' target='_blank' href='" + place.website + "'>" + place.website + "</a>";

                    } else {
                        website = "NA";
                    }

                    if (place.formatted_address != undefined) {
                        address = place.formatted_address;
                    } else {
                        address = "NA";
                    }

                    openinghours = "";
                    if (place.opening_hours != undefined) {
                        for (var i = place.opening_hours.weekday_text.length - 1; i >= 0; i--) {
                            openinghours += "<p>" + place.opening_hours.weekday_text[i] + "</p>";
                        }
                    } else {
                        openinghours = "NA";
                    }

                    reviewContent = "";
                    if (place.reviews != undefined) {


                        for (var i = 0; i < place.reviews.length; i++) {

                            var roundRating = Math.round(place.reviews[i].rating);
                            rating = "";
                            for (var j = 0; j < 5; j++) {
                                if (roundRating > j) {
                                    rating += "<i style='color:yellow' class='fa fa-star star' aria-hidden='true'></i>";
                                } else {
                                    rating += "<i class='fa fa-star star' aria-hidden='true'></i>";
                                }
                            }

                            reviewContent += "<div class='row resolve-row'>" +
                                "<div class='col-lg-3 col-xs-3 text-center pad0'>" +
                                "<img class='img-responsive' src='" + place.reviews[i].profile_photo_url + "'>" +
                                "<p>" + place.reviews[i].author_name + "</p>" +
                                "</div>" +
                                "<div class='col-lg-9 col-xs-9'>" +
                                "<p>" + place.reviews[i].text + "</p>" +
                                "<div class='row resolve-row'>" +
                                "<div class='col-lg-6 pad0'>" +
                                "<p>Rating:</p>" +
                                "<p>" + rating + "</p>" +
                                "</div>" +
                                "<div class='col-lg-6 pad0'>" +
                                "<p>" + place.reviews[i].relative_time_description + "</p>" +
                                "</div>" +
                                "</div>" +
                                "</div>" +
                                "</div>";

                        }

                    } else {

                        reviewContent = "NA";
                    }

                    // "++"
                    var html = "<div class='place-image-container'>" + slider +
                        "<div class='row resolve-row view-more-photos-container'>" +
                        "<div class='col-lg-8 col-xs-8'><p>" + name + "</p></div>" +
                        "<div class='col-lg-4 col-xs-4'><p class='view-photos show_photos'>View Photos</p></div>" +
                        "</div>" +
                        "<h1 class='rating-circle'>" + avgrating + "/5</h1>" +
                        "</div>" +

                        "<div class='row resolve-row qube-container'>" +
                        "<div class='col-lg-6 col-xs-6'>" +
                        "<h5><b>Currently:</b></h5>" + currently + "</div>" +
                        "<div class='col-lg-6 col-xs-6'>" +
                        "<h5><b>Contact No:</b></h5>" +
                        "<p><a class='call' href='tel:" + number + "'>" + number + "</a></p>" +
                        "</div>" +
                        "</div>" +

                        "<div class='details-content'>" +
                        "<h4>Website:</h4>" +
                        "<p class='overflow-scroll'>" + website + "</p>" +
                        "<h4>Address:</h4>" +
                        "<p>" + address + "</p>" +
                        "<h4>Opening Hours: </h4>" +
                        "<p>" + openinghours + "</p>" +
                        "<h4>Reviews: </h4>" +
                        "<div class='review-container'>" + reviewContent + "</div>" +
                        "<div id='btn-direction' class='direction-container'>" +
                        "<div class='full-width text-center'>" +
                        "<button  class='btn-direction'>Show Direction</button>" +
                        "</div>" +
                        "</div>" +
                        "</div>";


                    $('#dynamic-details').html(html);

                    $(".show_photos").click(function() {

                        var dynamicgallary = "$.fancybox.open([";

                        for (var photoi = 0; photoi < place.photos.length; photoi++) {

                            src = place.photos[photoi].getUrl({
                                'maxWidth': 1000,
                                'maxHeight': 1000
                            });
                            src = src.replace("w1000-h1000-", "");
                            src = src.slice(0, -1);
                            src = src + "w1000-h1000";

                            dynamicgallary += "{" +
                                "src : '" + src + "'," +
                                "},";
                        }

                        dynamicgallary += "], { thumbs : { autoStart : true } })";

                        eval(dynamicgallary);

                    });

                    start = current_position;
                    end = place.geometry.location;

                    $('.btn-direction').click(function() {

                        console.log('show direction button clicked ' + JSON.stringify(start) + " " + JSON.stringify(end));

                        $('.direction-btn').removeClass('direction-active');
                        $("[data-id='WALKING']").addClass('direction-active');

                        $('#open-filter').animate({
                            right: '-125%'
                        }, 250);


                        $('.hideshowbtn').html('HIDE');
                        $('.hideshowbtn').fadeIn('slow');

                        $('#open-details').animate({
                            left: '-125%'
                        }, 250);

                        directionsDisplay.setMap(null);
                        directionsDisplay.setMap(map);

                        directionsDisplay.setPanel(document.getElementById('right-panel'));

                        var request = {
                            origin: start,
                            destination: end,
                            travelMode: 'WALKING'
                        };

                        directionsService.route(request, function(result, status) {

                            if (status == 'OK') {

                                directionsDisplay.setDirections(result);

                                $('.right-panel-container').animate({
                                    right: '0'
                                }, 500);

                            }

                        });
                    })

                    $('#open-details').animate({
                        left: '0%'
                    }, 500);


                } else {

                    alert('failed');

                }

            });

        });
    }



    $('.direction-btn').click(function() {

        console.log('routes change button clicked location is  ' + JSON.stringify(start) + " " + JSON.stringify(end));

        $('.direction-btn').removeClass('direction-active');

        directionsDisplay.setMap(null);

        if ($(this).attr('data-id') == 'WALKING') {

            $(this).addClass('direction-active');

            var request = {
                origin: start,
                destination: end,
                travelMode: 'WALKING'
            };

        } else {

            $(this).addClass('direction-active');

            var request = {
                origin: start,
                destination: end,
                travelMode: 'DRIVING'
            };
        }

        directionsDisplay.setMap(map);
        directionsDisplay.setPanel(document.getElementById('right-panel'));

        directionsService.route(request, function(result, status) {

            if (status == 'OK') {

                directionsDisplay.setDirections(result);

                $('.right-panel-container').animate({
                    right: '0'
                }, 500);
            }
        });
    })


    // for auto select current location

    $('.right-location').click(function() {

        $('.disable-screen').fadeIn('slow');

        cl_marker.setMap(null);

        resetMapArea();

        if (navigator.geolocation) {

            var options = {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            };

            navigator.geolocation.getCurrentPosition(function(position, error, options) {

                current_position = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                map.setCenter(current_position);

                cl_marker = new google.maps.Marker({
                    position: current_position,
                    map: map,
                    animation: google.maps.Animation.DROP,
                    icon: base_url + 'assets/website_assets/img/man1.png'
                });


                geocoder.geocode({

                    'location': current_position

                }, function(results, status) {

                    if (status === 'OK') {

                        if (results[0]) {


                            for (var i = 0; i < results[0].address_components.length; i++) {

                                if (results[0].address_components[i].types[0] === "administrative_area_level_2") {
                                    var city = results[0].address_components[i].long_name;
                                }

                                if (results[0].address_components[i].types[0] === "administrative_area_level_1") {
                                    var state = results[0].address_components[i].long_name;
                                }

                                if (results[0].address_components[i].types[0] === "country") {
                                    var country = results[0].address_components[i].long_name;
                                }

                                if (results[0].address_components[i].types[0] === "political") {
                                    var area = results[0].address_components[i].long_name;
                                }
                            }

                            place_id = results[0].place_id;
                            location = area + ", " + city + ", " + state + ", " + country;

                            $('#change_location').val(location);

                            $('.disable-screen').fadeIn('slow');


                            // $.ajax({

                            //     type: 'POST',
                            //     url: base_url + 'home/checklogin',
                            //     data: {
                            //         place_id: place_id,
                            //         position: current_position,
                            //         location: location
                            //     },
                            //     success: function(result) {

                            //         result = JSON.parse(result);
                            //         // console.log(result);

                            //         if (result.status == 'success') {

                            //             // $('.login-popup-container').fadeOut('fast');
                            //             // $('#logout').fadeIn('slow');
                            //         }
                            //     },
                            //     error: function() {

                            //         console.log('server error');
                            //     }
                            // })




                        } else {

                            console.log("No reverse geocode results.")
                        }



                    } else {
                        alert('Geocoder failed due to: ' + status);

                    }

                    
                    $('.disable-screen').fadeOut('fast');


                });


            }, function() {

                // alert('Location not allowed');
                // handleLocationError(true, infowindow, map.getCenter());
                $('.enable-location').css('display','block');
                $('.preloader').fadeOut('fast');

            });

        } else {

            // alert('Location not allowed');
            // // Browser doesn't support Geolocation
            // handleLocationError(false, infowindow, map.getCenter());

                $('.enable-location').css('display','block');
                $('.preloader').fadeOut('fast');


        }

    })


    var searchBox = new google.maps.places.SearchBox(document.getElementById('change_location'));

    google.maps.event.addListener(searchBox, 'places_changed', function() {

        $('.disable-screen').fadeIn('slow');

        resetMapArea();

        var place = searchBox.getPlaces()[0];

        console.log(place);

        if (!place){

            document.getElementById('change_location').value = "";
            $('.disable-screen').fadeOut('fast');
            return;  
        } 

        if (place.geometry.viewport) {

            console.log(JSON.stringify(place));

            map.fitBounds(place.geometry.viewport);

            current_position = place.geometry.location;
            place_id = place.place_id;
            location = place.formatted_address;

            map.setCenter(current_position);
            map.setZoom(16);
            cl_marker.setPosition(current_position);



            // $.ajax({

            //     type: 'POST',
            //     url: base_url + 'home/checklogin',
            //     data: {

            //         place_id: place_id,
            //         // position:current_position,
            //         location: location
            //     },
            //     success: function(result) {

            //     },
            //     error: function() {

            //         console.log('server error');
            //     }
            // })

        } else {


            current_position = place.geometry.location;
            place_id = place.place_id;
            location = place.formatted_address;

            map.setCenter(current_position);
            map.setZoom(16);
            cl_marker.setPosition(current_position);



            // $.ajax({

            //     type: 'POST',
            //     url: base_url + 'home/checklogin',
            //     data: {

            //         place_id: place_id,
            //         // position:current_position,
            //         location: location
            //     },
            //     success: function(result) {

            //     },
            //     error: function() {

            //         console.log('server error');
            //     }
            // })

        }

        $('.disable-screen').fadeOut('fast');



    });


    // callback functions end

    // var input = document.getElementById('change_location');
    // autocomplete = new google.maps.places.Autocomplete(input);

    // autocomplete.addListener('place_changed', function() {

    //     resetMapArea();

    //     var place = autocomplete.getPlace();

    //     if (!place.geometry) {
    //         window.alert("No details available for input: '" + place.name + "'");
    //         return;
    //     }

    //     current_position = place.geometry.location;
    //     place_id = place.place_id;
    //     location = place.formatted_address;

    //     map.setCenter(current_position);
    //     cl_marker.setPosition(current_position);

        
    // });



    function validateEmail(email) {
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email);
    }

    // ajax start


    $('#forgot_submit').click(function() {


        var email = $('#forgot_email').val();

        if (!email) {
            $('#forgot_error').html('<p>*Email Required</p>');
            return false;
        } else if (!validateEmail(email)) {
            $('#forgot_error').html('<p>*Invalid Email</p>');
            return false;
        }

        showPreloader();

        $.ajax({

            type: 'POST',
            url: base_url + 'home/sendemail',
            data: {
                email: email,
            },
            success: function(result) {

                result = JSON.parse(result);

                if (result.status == 'success') {

                    // window.location.href = base_url;

                    $('#forgot_email').val("");
                    $('#forgot_error').html("");

                    $('#forgot_error').html("<p class='success'>Password Sent Successfully</p>");

                    hidePreloader();

                } else {


                    $('#forgot_email').val("");
                    $('#forgot_error').html("");

                    $('#forgot_error').html("<p class='error'>Email Not Available</p>");

                    hidePreloader();

                }
            },
            error: function(error) {

                console.log('Server Error');

            }
        });

    })




    $('#signup_submit').click(function() {

        var name = $('#signup_name').val();
        var mobile = $('#signup_mobile').val();
        var email = $('#signup_email').val();
        var password = $('#signup_password').val();

        if (!name) {
            $('#signup_error').html('<p>*Name Required</p>');
            return false;
        } else if (!mobile) {
            $('#signup_error').html('<p>*Mobile Required</p>');
            return false;
        } else if (!email) {
            $('#signup_error').html('<p>*Email Required</p>');
            return false;
        } else if (!validateEmail(email)) {
            $('#signup_error').html('<p>*Invalid Email</p>');
            return false;
        } else if (!password) {
            $('#signup_error').html('<p>*Password Required</p>');
            return false;
        }

        showPreloader();


        $.ajax({

            type: 'POST',
            url: base_url + 'home/signup',
            data: {

                name: name,
                mobile: mobile,
                email: email,
                password: password,
                place_id: place_id,
                location: location
            },
            success: function(result) {

                result = JSON.parse(result);
                console.log(result);
                
                if (result.status == 'success') {

                    // window.location.href = base_url;

                    $('#signup_name').val("");
                    $('#signup_mobile').val("");
                    $('#signup_email').val("");
                    $('#signup_password').val("");

                    $('#signup_error').html("");

                    $('.signup-popup-container').fadeOut('fast');
                    $('#name').html(result.name);
                    $('#logout img').attr('src', result.profile_url);
                    $('#logout').fadeIn('slow');

                    hidePreloader();

                } else if (result.msg == 'emailexist') {

                    $('#signup_error').html("<p>*Email Already Exist</p>");
                    hidePreloader();

                } else {

                    alert('failed')
                    hidePreloader();
                }
            },
            error: function(error) {

                console.log('Server Error');

            }
        });

    })

    $('#login_submit').click(function() {


        var email = $('#login_email').val();
        var password = $('#login_password').val();

        if (!email) {
            $('#login_error').html('<p>*Email Required</p>');
            return false;
        } else if (!validateEmail(email)) {
            $('#login_error').html('<p>*Invalid Email</p>');
            return false;
        } else if (!password) {
            $('#login_error').html('<p>*Password Required</p>');
            return false;
        }

        showPreloader();

        $.ajax({

            type: 'POST',
            url: base_url + 'home/login',
            data: {
                email: email,
                password: password,
            },
            success: function(result) {

                result = JSON.parse(result);
                console.log(result);

                if (result.status == 'success') {


                    $('#login_email').val("");
                    $('#login_password').val("");
                    $('#login_error').html("");

                    $('.login-popup-container').fadeOut('fast');
                    $('#name').html(result.name);
                    $('#logout img').attr('src', result.profile_url);
                    $('#logout').fadeIn('slow');

                    // Lockr.set('is_loggedin', true);

                    hidePreloader();

                } else {

                    $('#login_error').html('<p>*Invalid Credentials</p>');
                    hidePreloader();

                }
            },
            error: function(error) {

                console.log('Server Error');

            }
        });

    })

    $('#logout').click(function() {

        showPreloader();

        $.ajax({

            type: 'POST',
            url: base_url + 'home/logout',
            success: function(result) {

                result = JSON.parse(result);
                console.log(result);

                if (result.status == 'success') {


                    $('#logout').fadeOut('fast');
                    $('.login-popup-container').fadeIn('slow');

                    // Lockr.rm('is_loggedin');

                    hidePreloader();


                } else {

                    alert('failed');
                    hidePreloader();
                }
            },
            error: function(error) {

                console.log('Server Error');

            }
        });

    })

    $('#feedback_submit').click(function() {

        var description = $('#description').val();

        if (!description) {
            $('#feedback_error').html('<p>*Description Required</p>');
            return false;
        }

        showPreloader();

        $.ajax({

            type: 'POST',
            url: base_url + 'home/insertFeedback',
            data: {
                description: description,
            },
            success: function(result) {

                result = JSON.parse(result);
                console.log(result);

                if (result.status == 'success') {

                    $('#description').val("");
                    $('#feedback_error').html("");

                    $('#feedback_error').html("<p class='success'>Feedback Subimitted Successfully</p>");
                    hidePreloader();

                } else {

                    $('#feedback_error').html("<p class='success'>Feedback Failed</p>");
                    hidePreloader();

                }
            },
            error: function(error) {

                console.log('Server Error');

            }
        });

    })

    // ajax end



    //facebook start


    window.fbAsyncInit = function() {
        FB.init({
            appId: '1345970355499001',
            xfbml: true,
            version: 'v2.9'
        });

        FB.AppEvents.logPageView();

        // FB.getLoginStatus(function(response) {
        //    statusChangeCallback(response);
        //  });
    };

    (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
            return;
        }
        js = d.createElement(s);
        js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));


    function statusChangeCallback(response) {
        console.log('statusChangeCallback');
        console.log(response);

        if (response.status === 'connected') {
            testAPI();
        } else {

            // document.getElementById('status').innerHTML = 'Please log ' +
            //   'into this app.';
        }
    }

    function checkLoginState() {
        FB.getLoginStatus(function(response) {
            statusChangeCallback(response);
        });
    }

    function testAPI() {

        console.log('Welcome!  Fetching your information.... ');

        FB.api('/me?fields=id,name,email,picture', function(response) {

            // console.log('Successful login for: ' + );

            $.ajax({

                type: 'POST',
                url: base_url + 'home/social_signup',
                data: {

                    loggedin_from: "facebook",
                    social_id: response.id,
                    name: response.name,
                    email: response.email,
                    profile_url: response.picture.data.url,
                    place_id: place_id,
                    location: location

                },
                success: function(result) {

                    result = JSON.parse(result);
                    console.log(result);
                    if (result.status == 'success') {

                        $('#login_email').val("");
                        $('#login_password').val("");
                        $('#login_error').html("");

                        $('.login-popup-container').fadeOut('fast');
                        $('#name').html(result.name);
                        $('#logout img').attr('src', result.profile_url);
                        $('#logout').fadeIn('slow');

                        // Lockr.set('is_loggedin', true);

                        hidePreloader();

                    } else {

                        alert('failed')
                        hidePreloader();

                    }
                },
                error: function(error) {

                    console.log('Server Error');

                }
            });




        });

    }

    $('#share').click(function() {

        // FB.ui({
        //     method: 'share',
        //     display: 'popup',
        //     href: 'https://findanythinganywhere.com/',
        // }, function(response) {});

        FB.ui(
        {
            method: 'share',
            href: 'https://findanythinganywhere.com/',     // The same than link in feed method
            title: 'Find Places Near Me',  // The same than name in feed method
            picture: 'https://findanythinganywhere.com/assets/website_assets/img/facebookshare.png',  
            caption: 'Find Places Near Me',  
            description: 'Find Places Near Me',
         },
         function(response){
            // your code to manage the response

            $.ajax({

                type: "POST",
                url: base_url + 'home/insertShare',
                success: function(result) {

                    result = JSON.parse(result);
                    // console.log(result);
                    if (result.status == 'success') {


                    } else {

                    }
                },
                error: function(error) {

                    console.log('Server Error');

                }

            })

         });




    })

    $('#fblogin').click(function() {

        FB.login(function(response) {

            if (response.status === 'connected') {
                testAPI();
            } else {
                // document.getElementById('status').innerHTML = 'Please log ' +
                //   'into this app.';
            }

        }, {
            scope: 'public_profile,email'
        });
    })


    //facebook end

    // google start

    var googleUser = {};

    var startApp = function() {

        gapi.load('auth2', function() {
            // Retrieve the singleton for the GoogleAuth library and set up the client.
            auth2 = gapi.auth2.init({
                client_id: '396969281785-kef6niou9a40dhqrqmc4ubng9e57v3to.apps.googleusercontent.com',
                cookiepolicy: 'single_host_origin',
                // Request scopes in addition to 'profile' and 'email'
                //scope: 'additional_scope'
            });
            attachSignin(document.getElementById('googlelogin'));
        });
    };

    function attachSignin(element) {

        auth2.attachClickHandler(element, {},

            function(googleUser) {

                var profile = googleUser.getBasicProfile();

                $.ajax({

                    type: 'POST',
                    url: base_url + 'home/social_signup',
                    data: {

                        loggedin_from: "google",
                        social_id: profile.getId(),
                        name: profile.getName(),
                        email: profile.getEmail(),
                        profile_url: profile.getImageUrl(),
                        place_id: place_id,
                        location: location

                    },
                    success: function(result) {

                        result = JSON.parse(result);
                        console.log(result);
                        if (result.status == 'success') {

                            $('#login_email').val("");
                            $('#login_password').val("");
                            $('#login_error').html("");

                            $('.login-popup-container').fadeOut('fast');
                            $('#name').html(result.name);
                            $('#logout img').attr('src', result.profile_url);
                            $('#logout').fadeIn('slow');

                            // Lockr.set('is_loggedin', true);

                            hidePreloader();

                        } else {

                            alert('failed')
                            hidePreloader();

                        }
                    },
                    error: function(error) {

                        console.log('Server Error');

                    }
                });

            },
            function(error) {

                // alert(JSON.stringify(error, undefined, 2));
            });
    }

    startApp();

    // google end

})