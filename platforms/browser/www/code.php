<!DOCTYPE html>
<html lang="en">
   <head>

      <title>Near Me | Find Places Near Me</title>
      <meta charset="utf-8">
      <meta name="description" content="Restaurant Near Me, Food Near Me, Atm Near Me, Hotels Near Me">
      <meta name="keywords" content="Restaurants, Food, Atm, Hotels">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta property="og:image" content="https://findanythinganywhere.com/assets/website_assets/img/facebookshare.png"/>
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, minimal-ui">
      <meta name="apple-mobile-web-app-capable" content="yes">
      <meta name="apple-mobile-web-app-status-bar-style" content="black">
      <meta name="format-detection" content="telephone=no">
      <meta name="msapplication-tap-highlight" content="no">


      <!--
        Customize this policy to fit your own app's needs. For more guidance, see:
            https://github.com/apache/cordova-plugin-whitelist/blob/master/README.md#content-security-policy
        Some notes:
            * gap: is required only on iOS (when using UIWebView) and is needed for JS->native communication
            * https://ssl.gstatic.com is required only on Android and is needed for TalkBack to function properly
            * Disables use of inline scripts in order to mitigate risk of XSS vulnerabilities. To change this:
                * Enable inline JS: add 'unsafe-inline' to default-src
        -->
<!--     <meta http-equiv="Content-Security-Policy" content="default-src 'self' data: gap: https://ssl.gstatic.com 'unsafe-eval'; style-src 'self' 'unsafe-inline'; media-src *"> -->


       <!-- This template defaults to the iOS CSS theme. To support both iOS and material design themes, see the Framework7 Tutorial at the link below:
        http://www.idangero.us/framework7/tutorials/maintain-both-ios-and-material-themes-in-single-app.html
     -->

      <link rel="icon" type="image/png" href="<?= base_url('assets/website_assets/img/favicon.png');?>" sizes="32x32"/>
      <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
      <link href="<?= base_url('assets/website_assets/css/bootstrap-slider.min.css')?>" rel="stylesheet" media="screen">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.2.1/assets/owl.carousel.min.css" />
      <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet" media="all">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.0.47/jquery.fancybox.min.css" />
      <link href="<?= base_url('assets/website_assets/fonts/font.css')?>" rel="stylesheet" media="screen">
      <link href="<?= base_url('assets/website_assets/css/styles.css')?>" rel="stylesheet" media="screen">
      <link href="<?= base_url('assets/website_assets/css/media.css')?>" rel="stylesheet" media="screen">


      <link rel="stylesheet" href="lib/framework7/css/framework7.material.min.css">
      <link rel="stylesheet" href="lib/framework7/css/framework7.material.colors.min.css">
      <link rel="stylesheet" href="css/styles.css">
      <link rel="stylesheet" href="css/reset_tma.css">


      <style type="text/css">
               
         .footer{
             width: 100%;
             position: fixed;
             left: 0;
             bottom: 0;
             background: black;
             padding: 5px;
             color: white;
             text-align: center;
             padding: 8px;
         }

      </style>
   
   </head>
   <body>

      <script>
      
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

        ga('create', 'UA-102274533-1', 'auto');
        ga('send', 'pageview');

      </script>


<!--       <div class="landscape">
         <img class="img-responsive" src="<?= base_url('assets/website_assets/img/landscape.png');?>">
      </div> -->

      <div class="statusbar-overlay"></div>
       <div class="panel-overlay"></div>
       <div class="panel panel-left panel-cover">
           <div class="content-block">
               <p>Left panel content goes here</p>
           </div>
       </div>
       <div class="views">
           <div class="view view-main">
               <div class="pages navbar-through toolbar-through">
                   <div data-page="index" class="page text-center">
                       <!-- <h1>Hello World</h1> -->

                        <div class="enable-location">
                           <img class="img-responsive" src="<?= base_url('assets/website_assets/img/locationdisabled.png');?>">
                           <h2>your location is disabled please enable it and try again</h2>
                        </div>

                        <div class="disable-screen"></div>
                        <div class="preloader">

                        <!-- base_url('assets/website_assets/img/preloader.gif'); -->
                        <!-- https://barryustorage.blob.core.windows.net/assets/img/ui/preloaders/load.gif -->



                           <img class="img-responsive" src="https://www.vesselfinder.com/images/loading-text.gif">
                        </div>
                        <div class="opened-popup forgot-popup-container">
                           <div class="forgot-popup">
                              <h4 class="popup-up-heading">Forgot Password</h4>
                              <div class="form">
                                 <input id="forgot_email" type="text" name="email" placeholder="*Email"><br>
                                 <input id='forgot_submit' class="form-submit" type="submit" name="submit" value="Submit">
                                 <div id='forgot_error' class="errors"></div>
                                 <p class="backtologin">Back</p>
                              </div>
                           </div>
                        </div>
                        <div class="opened-popup signup-popup-container">
                           <div class="signup-popup">
                              <h4 class="popup-up-heading">Sign Up</h4>
                              <div class="form">
                                 <input id="signup_name" type="text" name="name" placeholder="*Name"><br>
                                 <input id="signup_mobile" type="number" name="mobile" placeholder="*Mobile"><br>
                                 <input id="signup_email" type="text" name="email" placeholder="*Email"><br>
                                 <input id="signup_password" type="password" name="password" placeholder="*Password"><br>
                                 <input id='signup_submit' class="form-submit" type="submit" name="submit" value="Submit">
                                 <div id='signup_error' class="errors"></div>
                                 <p class="already">Already have account ?</p>
                              </div>
                           </div>
                        </div>
                        <div class="opened-popup login-popup-container">
                           <div class="login-popup">
                              <h4 class="popup-up-heading">Sign In</h4>
                              <div class="form">
                                 <input id="login_email" type="text" name="email" placeholder="*Email"><br>
                                 <input id="login_password" type="password" name="password" placeholder="*Password"><br>
                                 <input style="margin-bottom: 5%" id='login_submit' class="form-submit" type="submit" name="submit" value="Submit">
                                 <div id='login_error' class="errors"></div>
                                 <div class="row resolve-row social-container">
                                    <div class="col-lg-12 col-xs-12">
                                       <img id="fblogin" class="img-responsive" src="<?= base_url('assets/website_assets/img/facebook.png');?>"> 
                                    </div>
                                    <div class="col-lg-12 col-xs-12">
                                       <img id="googlelogin" style="margin-bottom: 5%;" class="img-responsive" src="<?= base_url('assets/website_assets/img/google.png');?>">
                                    </div>
                                    <div class="col-lg-12 col-xs-12">
                                       <p class="donthave">Dont have account ?</p>
                                    </div>
                                    <div class="col-lg-12 col-xs-12">
                                       <p class="forgot-password">Forgot Password ?</p>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div class="features">
                           <img id='category' class="img-responsive make-icon pull-left" src="<?= base_url('assets/website_assets/img/category.png');?>">
                           <img id='filter' class="img-responsive make-icon pull-left" src="<?= base_url('assets/website_assets/img/filter.png');?>">
                           <img id='share' class="img-responsive make-icon pull-right" src="<?= base_url('assets/website_assets/img/share.png');?>">  
                           <img id='feedback' class="img-responsive make-icon pull-right" src="<?= base_url('assets/website_assets/img/report.png');?>">
                        </div>
                        <div id="open-details">
                           <div class="cross-container">
                              <h4 class="details-header">PLACE DETAILS</h4>
                              <img class="img-responsive close-details" src="<?= base_url('assets/website_assets/img/cross.png');?>">
                           </div>
                           <div id="dynamic-details">
                           </div>
                        </div>
                        <div id="open-filter">
                           <div class="cross-container">
                              <img class="img-responsive close-filter" src="<?= base_url('assets/website_assets/img/cross.png');?>">
                              <h4 class="details-header">MAP FILTERS</h4>
                           </div>
                           <div class="filter-content">
                              <br>
                              <h4 class="filter-header">Show Places</h4>
                              <input class="filter-change" type="radio" name="showStatus" id="both" value="false" checked="">
                              <label for="both">Both</label>
                              <br>
                              <input class="filter-change" type="radio" name="showStatus" id="currently_opened" value="true">
                              <label for="currently_opened">Currently Opened</label>
                              <br>
                              <br>
                              <h4 class="filter-header">Set Radius</h4>
                              <input class="filter-change" type="radio" name="radius" id="fivehundred" value="500">
                              <label for="fivehundred">0.5 Km</label>
                              <br>
                              <input class="filter-change" type="radio" name="radius" id="onethousand" value="1000" checked="">
                              <label for="onethousand">1 Km</label>
                              <br>
                              <input class="filter-change" type="radio" name="radius" id="twothousand" value="2000">
                              <label for="twothousand">2 Km</label>
                              <br>
                              <input class="filter-change" type="radio" name="radius" id="threethousand" value="3000">
                              <label for="threethousand">3 Km</label>
                              <br>
                              <input class="filter-change" type="radio" name="radius" id="fourthousand" value="4000">
                              <label for="fourthousand">4 Km</label>
                              <br>
                              <input class="filter-change" type="radio" name="radius" id="fivethousand" value="5000">
                              <label for="fivethousand">5 Km</label>
                           </div>
                        </div>
                        <div class="opened-popup category-popup-container">
                           <div class="category-popup">
                              <h1 class="popup-up-heading">FIND PLACES NEAR ME</h1>
                              <img class="img-responsive close-popup" src="<?= base_url('assets/website_assets/img/cross.png');?>">
                              <div class="row resolve-row icons">

                                 <div class="col-lg-3 col-xs-6 find" data-id='atm' data-name='Atm'>
                                    <img class="img-responsive" src="<?= base_url('assets/website_assets/img/bigicons/atm.png');?>">
                                    <h5>Atm</h5>
                                 </div>

                                 <div class="col-lg-3 col-xs-6 find" data-id='restaurant' data-name='Restaurant'>
                                    <img class="img-responsive" src="<?= base_url('assets/website_assets/img/bigicons/restaurant.png');?>">
                                    <h5>Restaurant</h5>
                                 </div>

                                 <div class="col-lg-3 col-xs-6 find" data-id='meal_delivery' data-name='Meal Delivery'>
                                    <img class="img-responsive" src="<?= base_url('assets/website_assets/img/bigicons/meal_delivery.png');?>">
                                    <h5>Meal Delivery</h5>
                                 </div>

                                 <div class="col-lg-3 col-xs-6 find" data-id='cafe' data-name='Cafe'>
                                    <img class="img-responsive" src="<?= base_url('assets/website_assets/img/bigicons/cafe.png');?>">
                                    <h5>Cafe</h5>
                                 </div>
                                

                                  <div class="col-lg-3 col-xs-6 find" data-id='gas_station' data-name='Petrol/Gas'>
                                    <img class="img-responsive" src="<?= base_url('assets/website_assets/img/bigicons/fuel.png');?>">
                                    <h5>Petrol/Gas</h5>
                                 </div>


                                 <div class="col-lg-3 col-xs-6 find" data-id='train_station' data-name='Railway Station'>
                                    <img class="img-responsive" src="<?= base_url('assets/website_assets/img/bigicons/railway.png');?>">
                                    <h5>Railway Station</h5>
                                 </div>

                                  <div class="col-lg-3 col-xs-6 find" data-id='pharmacy' data-name='Medical'>
                                    <img class="img-responsive" src="<?= base_url('assets/website_assets/img/bigicons/medical.png');?>">
                                    <h5>Medical</h5>
                                 </div>


                                 <div class="col-lg-3 col-xs-6 find" data-id='movie_theater' data-name='Movie Theater'>
                                    <img class="img-responsive" src="<?= base_url('assets/website_assets/img/bigicons/theater.png');?>">
                                    <h5>Movie Theater</h5>
                                 </div>

                                 <!-- ...............clse.................... -->


                                  <div class="col-lg-3 col-xs-6 find" data-id='lodging' data-name='Hotels'>
                                    <img class="img-responsive" src="<?= base_url('assets/website_assets/img/bigicons/hotels.png');?>">
                                    <h5>Hotels</h5>
                                 </div>

                                 <div class="col-lg-3 col-xs-6 find" data-id='hardware_store' data-name='Hardware Store'>
                                    <img class="img-responsive" src="<?= base_url('assets/website_assets/img/bigicons/tools.png');?>">
                                    <h5>Hardware Store</h5>
                                 </div>
                                 <div class="col-lg-3 col-xs-6 find" data-id='pet_store' data-name='Animal Stores'>
                                    <img class="img-responsive" src="<?= base_url('assets/website_assets/img/bigicons/pet_store.png');?>">
                                    <h5>Animal Store</h5>
                                 </div>

                                 <div class="col-lg-3 col-xs-6 find" data-id='veterinary_care' data-name='Animal Hospitals'>
                                    <img class="img-responsive" src="<?= base_url('assets/website_assets/img/bigicons/pet_hospital.png');?>">
                                    <h5>Animal Hospital</h5>
                                 </div>

                                <!--  <div class="col-lg-2 col-xs-6 find" data-id='doctor' data-name='Doctor'>
                                    <img class="img-responsive" src="<?= base_url('assets/website_assets/img/bigicons/doctor.png');?>">
                                    <h5>Doctor</h5>
                                 </div>

                                

                                 <div class="col-lg-2 col-xs-6 find" data-id='pharmacy' data-name='Home Services'>
                                    <img class="img-responsive" src="<?= base_url('assets/website_assets/img/bigicons/home_care.png');?>">
                                    <h5>Home Services</h5>
                                 </div> -->

                  <!--                <div class="col-lg-2 col-xs-6 find" data-id='car_repair' data-name='Car Repair'>
                                    <img class="img-responsive" src="<?= base_url('assets/website_assets/img/bigicons/car_repair.png');?>">
                                    <h5>Car Repair</h5>
                                 </div> -->

                                
                                 
                                <!--  <div class="col-lg-2 col-xs-6 find" data-id='parking' data-name='Parking'>
                                    <img class="img-responsive" src="<?= base_url('assets/website_assets/img/bigicons/parking.png');?>">
                                    <h5>Parking</h5>
                                 </div> -->

                  <!--                <div class="col-lg-2 col-xs-6 find" data-id='shopping_mall' data-name='Shopping Mall'>
                                    <img class="img-responsive" src="<?= base_url('assets/website_assets/img/bigicons/mall.png');?>">
                                    <h5>Shopping Mall</h5>
                                 </div> -->

                                 

                                 <!-- <div class="col-lg-2 col-xs-6 find" data-id='pharmacy' data-name='Stores'>
                                    <img class="img-responsive" src="<?= base_url('assets/website_assets/img/bigicons/store.png');?>">
                                    <h5>Stores</h5>
                                 </div> -->
                                 

                              </div>
                           </div>
                        </div>
                        <!-- current disabled -->
                        <div class="opened-popup setting-popup-container">
                           <div class="setting-popup">
                              <h4 class="popup-up-heading">MAP SETTING</h4>
                              <img class="img-responsive close-popup" src="<?= base_url('assets/website_assets/img/cross.png');?>">
                              <div class="setting-container">
                                 <div class="radius-container">
                                    <input type="text" id="radius" class="radius"  data-slider-id="radius-range" data-slider-min="200" data-slider-max="5000" data-slider-step="200" data-slider-value="600" data-slider-tooltip="hide">
                                    <p>Radius  <span id='slider_value'>600</span> Meters</p>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div class="opened-popup feedback-popup-container">
                           <div class="feedback-popup">
                              <h4 class="popup-up-heading">Feedback/Report Errors</h4>
                              <img class="img-responsive close-popup" src="<?= base_url('assets/website_assets/img/cross.png');?>">
                              <div class="form">
                                 <textarea name="description" id='description' placeholder="*Description" style="height: 70px;"></textarea>
                                 <!-- <input style="border:none;font-size: 12px;" type="file" name="file" placeholder="Screenshot"> -->
                                 <input id='feedback_submit' class="form-submit" type="submit" name="submit" value="Submit">
                                 <div id='feedback_error' class="errors"></div>
                              </div>
                           </div>
                        </div>
                        <div id="main_map">
                        </div>
                        <div class="row resolve-row header-container">

                           <div class="col-lg-3">
                              <a class="hideonmobile" href="https://findanythinganywhere.com/">
                                 <!-- <h4 class="logo-text"> -->
                                    <!-- <img style="margin:auto" class="img-responsive" src="<?= base_url('assets/website_assets/img/logo.jpg')?>"> -->
                                    <!-- Find Anything Anywhere -->
                                 <!-- </h4> -->
                              </a>
                           </div>

                           <div class="col-lg-5 pad0">
                              <div class="left-mobile">
                                 <div class="row resolve-row text-search-container">
                                    <div class="col-lg-10 col-xs-7">
                                       <input id="text_search" class="text-search" type="text" placeholder="Search anything Eg: Restaurants, Pizza etc">
                                    </div>
                                    <div class="col-lg-2 col-xs-2">
                                       <img id="search" class="search-icon" src="<?= base_url('assets/website_assets/img/search.png')?>">
                                    </div>
                                    <div class="col-lg-0 col-xs-3">
                                       <img class="img-responsive mob-location-icon pull-left" src="<?= base_url('assets/website_assets/img/switch.png')?>">
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div class="col-lg-4 pad0">
                              <div class="right-mobile">
                                 <div class="row resolve-row">
                                    <div class="col-lg-10 col-xs-7">
                                       <input id="change_location" placeholder="E.g. Lokhandwala, Andheri, Mumbai, Maharashtra, India" class="change-location" type="text" name="change-location">
                                    </div>
                                    <div class="col-lg-2 col-xs-2">
                                       <img class="right-marker right-location" src="<?= base_url('assets/website_assets/img/marke.png')?>">
                                    </div>
                                    <div class="col-lg-0 col-xs-3">
                                       <img class="img-responsive mob-location-icon pull-left" src="<?= base_url('assets/website_assets/img/switch.png')?>">
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>



                        <div class="right-panel-container">
                           <div class="btn-fixed-container">
                              <div class="row resolve-row fixed-routes">
                                 <div class="col-lg-6 col-xs-6 pad0">
                                    <button data-id='WALKING' class="direction-btn direction-active">WALKING</button>
                                 </div>
                                 <div class="col-lg-6 col-xs-6 pad0">
                                    <button data-id='DRIVING' class="direction-btn">DRIVING</button>
                                 </div>
                              </div>
                           </div>
                           <button class="hideshowbtn">HIDE</button>
                           <div id="right-panel"></div>
                        </div>

                        <div id="logout" class="logout">
                           <img class="img-responsive" src="<?php echo $this->session->userdata('profile_url'); ?>">
                           <p id="name"><?php echo $this->session->userdata('name'); ?></p>
                        </div>

                        <div id="result_found_container">
                        </div>

                        <div class="footer">
                           <p>Developed By <a target="_blank" href="https://tahamehmoodansari.com/"> Taha Mehmood Ansari </a> </p>
                        </div>
                   </div>
               </div>
           </div>
       </div>


       <!-- from app start-->
       <script type="text/javascript" src="cordova.js"></script>
       <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
       <script type="text/javascript" src="lib/framework7/js/framework7.min.js"></script>
       <script type="text/javascript" src="js/script.js"></script>
       <script type="text/javascript" src="js/my-app.js"></script>
       <!-- from app end-->


      <script src="<?= base_url('assets/website_assets/js/jquery-1.10.2.min.js')?>"></script>
      <script src="<?= base_url('assets/website_assets/js/lockr.min.js')?>"></script>
      <script src="<?= base_url('assets/website_assets/js/bootstrap.min.js')?>"></script>
      <script src="<?= base_url('assets/website_assets/js/maps.js')?>"></script>
      <script src="<?= base_url('assets/website_assets/js/bootstrap-slider.min.js')?>"></script>
      <script src="<?= base_url('assets/website_assets/js/script.js')?>"></script>
      <!-- old AIzaSyBXRUgPPo8LBZACZZCWAlCDfiXVoEu8-mI -->
      <!-- AIzaSyBpDbp2CweJU5jQy-j0w5tM-cLWRA_H0AY -->
      <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBXRUgPPo8LBZACZZCWAlCDfiXVoEu8-mI&libraries=places" ></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.2.1/owl.carousel.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.0.47/jquery.fancybox.min.js"></script>
      <script src="https://apis.google.com/js/api:client.js"></script>

      
   </body>
</html>