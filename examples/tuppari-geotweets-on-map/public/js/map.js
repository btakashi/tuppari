$(function(){

  /*
   * Render the gmap
   */

  var latlng = new google.maps.LatLng(0, 0);
  var myOptions = {
      zoom: 2
    , center: latlng
    , mapTypeId: google.maps.MapTypeId.ROADMAP
  };
    
  var map = new google.maps.Map(document.getElementById("map"), myOptions);

  /*
   * tuppari
   */

  var client = new tuppari.createClient({
    applicationId: '4d4a7750-cf98-11e1-be46-79623beffd35' // Replace this with your Application ID.
  });
  var geotweets = client.subscribe('geotweets');
  geotweets.bind('update', function (message) {
    var data = JSON.parse(message);

    // Add marker

    var myLatlng = new google.maps.LatLng(data.coordinates[0],data.coordinates[1]);

    var marker = new google.maps.Marker({
      position: myLatlng, 
      animation: google.maps.Animation.DROP,
      map: map
    });  

    // Remove marker after 30 seconds

    setTimeout(function(){
      marker.setMap(null);
      delete marker;
    }, 30000);

    // Attach info window to marker

    var infowindow = new google.maps.InfoWindow({
      content: "<img src='"+data.pic+"' style='float:left; padding: 5px;' /><strong>"+data.screen_name+"</strong>: "+data.text
    });

    google.maps.event.addListener(marker, 'click', function() {
      infowindow.open(map,marker);
    });

  });

});
