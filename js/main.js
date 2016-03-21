window.onload = function() {

  var firstSubmitBtn = document.getElementById('submit-btn');

  firstSubmitBtn.addEventListener('click', function(event) {
    event.preventDefault();
    var artistNameSearch = document.getElementById('artistSearch').value;

    function musicHover() {
      $('.musicThumb').hover(
          function() {
              sound = $(this).children()[0];
              sound.play();
          }, function() {
              sound.pause();
              sound.currentTime = 0;
          }
      );
    }

    $.ajax({
      url: "http://ws.audioscrobbler.com/2.0/?method=artist.getInfo&" + ("artist=" + artistNameSearch) + oopsLastFM_apiKey,
      dataType: 'jsonp',
      success: function(response){
      // Call Handlebars
      var templateSource = document.getElementById('basicInfo').innerHTML;
      var template = Handlebars.compile(templateSource);
      var computedHtml = template(response);
      var nameContainer = document.getElementById('templateContainer-Zero');
      nameContainer.innerHTML = computedHtml;
      } // success fxn
    }); // end of .ajax

    $.ajax({
      url: "https://api.discogs.com/database/search?q=" + artistNameSearch + discogs_apiKey,
      dataType: 'jsonp',
      success: function(yeah){
        $.ajax({
          url: "https://api.discogs.com/artists/" + yeah.data.results[0].id,
          dataType: 'jsonp',
          success: function(yeahone){
            // Call Handlebars
            var templateSource = document.getElementById('artistURL').innerHTML;
            var template = Handlebars.compile(templateSource);
            var computedHtml = template(yeahone);
            var nameContainer = document.getElementById('templateContainer-URL');
            nameContainer.innerHTML = computedHtml;
          } // success fxn
        }); // end of .ajax
      } // success fxn
    }); // end of .ajax

    $.ajax({
      url: "https://api.spotify.com/v1/search?query=" + artistNameSearch + "&offset=0&limit=1&type=artist",
      success: function(music){
        document.getElementById("artistImage").src = music.artists.items[0].images[1].url;
        $.ajax({
          url: "https://api.spotify.com/v1/artists/" + music.artists.items[0].id + "/top-tracks?country=US",
          success: function(musicID){
            // Call Handlebars
            var templateSource = document.getElementById('music').innerHTML;
            var template = Handlebars.compile(templateSource);
            var computedHtml = template(musicID);
            var nameContainer = document.getElementById('templateContainer-Music');
            nameContainer.innerHTML = computedHtml;
            musicHover();
          } // success fxn
        }); // end of .ajax

        $.ajax({
          url: "https://api.spotify.com/v1/artists/" + music.artists.items[0].id + "/related-artists",
          success: function(relatedArtists){
            $.ajax({
              url: "https://api.spotify.com/v1/artists/" + relatedArtists.artists[0].id + "/top-tracks?country=US",
              success: function(relatedArtistsList){
                // Artist Name
                document.querySelector('#nameOne').innerHTML = relatedArtistsList.tracks[0].artists[0].name;
                // Call Handlebars
                var templateSource = document.getElementById('relatedList-One').innerHTML;
                var template = Handlebars.compile(templateSource);
                var computedHtml = template(relatedArtistsList);
                var nameContainer = document.getElementById('templateContainer-RelatedArtists-One');
                nameContainer.innerHTML = computedHtml;
                musicHover();
              } // success fxn
            }); // end of .ajax
            $.ajax({
              url: "https://api.spotify.com/v1/artists/" + relatedArtists.artists[1].id + "/top-tracks?country=US",
              success: function(relatedArtistsList){
                // Artist Name
                document.querySelector('#nameTwo').innerHTML = relatedArtistsList.tracks[0].artists[0].name;
                // Call Handlebars
                var templateSource = document.getElementById('relatedList-Two').innerHTML;
                var template = Handlebars.compile(templateSource);
                var computedHtml = template(relatedArtistsList);
                var nameContainer = document.getElementById('templateContainer-RelatedArtists-Two');
                nameContainer.innerHTML = computedHtml;
                musicHover();
              } // success fxn
            }); // end of .ajax
            $.ajax({
              url: "https://api.spotify.com/v1/artists/" + relatedArtists.artists[2].id + "/top-tracks?country=US",
              success: function(relatedArtistsList){
                // Artist Name
                document.querySelector('#nameTree').innerHTML = relatedArtistsList.tracks[0].artists[0].name;
                // Call Handlebars
                var templateSource = document.getElementById('relatedList-Three').innerHTML;
                var template = Handlebars.compile(templateSource);
                var computedHtml = template(relatedArtistsList);
                var nameContainer = document.getElementById('templateContainer-RelatedArtists-Three');
                nameContainer.innerHTML = computedHtml;
                musicHover();
              } // success fxn
            }); // end of .ajax
            $.ajax({
              url: "https://api.spotify.com/v1/artists/" + relatedArtists.artists[3].id + "/top-tracks?country=US",
              success: function(relatedArtistsList){
                // Artist Name
                document.querySelector('#nameFour').innerHTML = relatedArtistsList.tracks[0].artists[0].name;
                // Call Handlebars
                var templateSource = document.getElementById('relatedList-Four').innerHTML;
                var template = Handlebars.compile(templateSource);
                var computedHtml = template(relatedArtistsList);
                var nameContainer = document.getElementById('templateContainer-RelatedArtists-Four');
                nameContainer.innerHTML = computedHtml;
                musicHover();
              } // success fxn
            }); // end of .ajax
            $.ajax({
              url: "https://api.spotify.com/v1/artists/" + relatedArtists.artists[4].id + "/top-tracks?country=US",
              success: function(relatedArtistsList){
                // Artist Name
                document.querySelector('#nameFive').innerHTML = relatedArtistsList.tracks[0].artists[0].name;
                // Call Handlebars
                var templateSource = document.getElementById('relatedList-Five').innerHTML;
                var template = Handlebars.compile(templateSource);
                var computedHtml = template(relatedArtistsList);
                var nameContainer = document.getElementById('templateContainer-RelatedArtists-Five');
                nameContainer.innerHTML = computedHtml;
                musicHover();
              } // success fxn
            }); // end of .ajax
          } // success fxn
        }); // end of .ajax
      } // success fxn
    }); // end of .ajax

    $.ajax({
      url: "http://api.giphy.com/v1/gifs/search?q=" + artistNameSearch + giphy_apiKey,
      success: function(gif){
        // background change from artist name.
        var backgroundColor = document.querySelector('body');
        document.body.style.backgroundImage = "url(" + gif.data[0].images.original.url + ")";
        // Call Handlebars
        var templateSource = document.getElementById('gif').innerHTML;
        var template = Handlebars.compile(templateSource);
        var computedHtml = template(gif);
        var nameContainer = document.getElementById('templateContainer-Gif');
        nameContainer.innerHTML = computedHtml;
      } // success fxn
    }); // end of .ajax
  }); // end click fxn
}; // end window onload fxn
