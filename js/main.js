window.onload = function() {

  var firstSubmitBtn = document.getElementById('submit-btn');

  firstSubmitBtn.addEventListener('click', function(ev) {
    ev.preventDefault();

    var artistNameSearch = document.getElementById('artistSearch').value;
    var methodGet = document.getElementById('artistPick').value;


   var methodGetInfo = "getInfo";
   var methodGetTopAlbums = "getTopAlbums";
   var methodGetTopTracks = "getTopTracks";

   //var methodGet = methodGetTopAlbums;

    $.ajax({
      url: "http://ws.audioscrobbler.com/2.0/?method=" + ("artist." + methodGet) + "&" + ("artist=" + artistNameSearch) + oopsLastFM_apiKey,
      dataType: 'jsonp',
      success: function(response){
        console.log(response);
      }
    });

  }); // end click fxn
}; // end window onload fxn
