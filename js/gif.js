window.onload = function() {

  var firstSubmitBtn = document.getElementById('submit-btn');

  firstSubmitBtn.addEventListener('click', function(ev) {
    ev.preventDefault();

    var artistNameSearch = document.getElementById('artistSearch').value;
    var methodGet = document.getElementById('artistPick').value;

    //var gifMoving = document.getElementById("videoOne").src = "http://media0.giphy.com/media/m3lsvix9fzzz2/200.gif";

    $.ajax({
      url: "http://api.giphy.com/v1/gifs/search?q=" + artistNameSearch + "&api_key=dc6zaTOxFJmzC",
      success: function(gif){
        console.log("Layer 00_Gif");
        console.log(gif);
        console.log(gif.data[0].images.downsized.url);
        console.log(gif.data[0].images.original.mp4);
        console.log(gif.data[0].images.original.webp);

        var backgroundColor = document.querySelector('body');
        document.body.style.backgroundImage = "url(" + gif.data[0].images.downsized.url + ")";
        //backgroundColor.style.background = "scr=(" + gif.data[0].images.downsized.url + ")" ;
        //backgroundColor.style.background = "black" ;

      } // success fxn
    }); // end of .ajax

    $.ajax({
      url: "http://ws.audioscrobbler.com/2.0/?method=" + ("artist." + methodGet) + "&" + ("artist=" + artistNameSearch) + oopsLastFM_apiKey,
      dataType: 'jsonp',
      success: function(response){
        console.log("Layer One");
        console.log(response);

      // Call Handlebars
      var templateSource = document.getElementById('widget').innerHTML;
      var template = Handlebars.compile(templateSource);
      var computedHtml = template(response);
      var nameContainer = document.getElementById('template-container');
      nameContainer.innerHTML = computedHtml;

      } // success fxn
    }); // end of .ajax

    $.ajax({
      url: "https://api.discogs.com/database/search?q=" + artistNameSearch + discogs_apiKey,
      dataType: 'jsonp',
      success: function(yeah){
        //console.log("Layer Two");
        //console.log(yeah);

        $.ajax({
          url: "https://api.discogs.com/artists/" + yeah.data.results[0].id,
          dataType: 'jsonp',
          success: function(yeahone){

            console.log("Layer Three");
            console.log(yeahone);
            console.log(yeahone.data.urls);

            // Call Handlebars
            var templateSource = document.getElementById('widgetOne').innerHTML;
            var template = Handlebars.compile(templateSource);
            var computedHtml = template(yeahone);
            var nameContainer = document.getElementById('template-container-one');
            nameContainer.innerHTML = computedHtml;

            $.ajax({
              url: "https://api.discogs.com/artists/" + yeah.data.results[0].id + "/releases",
              dataType: 'jsonp',
              success: function(yeahTwo){
                console.log("Layer Four");
                console.log(yeahTwo);
                console.log(yeahTwo.data.releases);

                // Call Handlebars
                var templateSource = document.getElementById('widgetTwo').innerHTML;
                var template = Handlebars.compile(templateSource);
                var computedHtml = template(yeahTwo);
                var nameContainer = document.getElementById('template-container-Two');
                nameContainer.innerHTML = computedHtml;
              } // success fxn
            }); // end of .ajax

          } // success fxn
        }); // end of .ajax

      } // success fxn
    }); // end of .ajax

  }); // end click fxn
}; // end window onload fxn
