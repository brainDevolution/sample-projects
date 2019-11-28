$(document).ready(function() {
 $('header').animateAuto('thing-active');
  $('#selector').heapbox(
    {'onChange': function() {
      //remove previous articles
      $('.article-list').empty();

      //adjust margin on the logo
      $('header').addClass('logo-margin');
      $('.letter').addClass('letter-size');

      //append loader onto site
      $('.ajax-loader').append('<img src="assets/images/ajax-loader.gif" alt="loading" class="loader"/>');

      //grab the section from the selector and put it into category
      var category = document.getElementById('selector').value;
var $selector ='';
      $selector.first.hide();

      //set some initial variables
      var articleLink,
      articleCaption,

      $articlelist = $('.article-list');

      var url = 'https://api.nytimes.com/svc/topstories/v2/' + category + '.json';
      url += '?' + $.param({ 'api-key': '9d89c6a48cfc43bfb338b4bc2e1a76a1'});
      // $.ajax({
      //             url: url,
      //             method: 'GET',
      //         }).done(function(data){
      //             $articles.empty();
      //             var dataResults = data.results.filter(function(value){
      //                 return value.multimedia.length >= 5;
      //             })
      //             dataResults.splice(12)
      //             var content ='';
      //             $.each(dataResults, function(key,value) {
      //                 var articleLink = value.url;
      //                 var abstract = value.abstract;
      //                 var multimedia = value.multimedia;
      //
      //                 if (multimedia.length >=5) {
      //                     content += '<li>';
      //                     content += '<a href="'+ articleLink + '" target="_blank">';
      //                     content += '<div class="inner-article">';
      //                     content += '<div class="article_images" style="background-image:url('+multimedia[4].url+')">';
      //
      //                     content +='<p class = "abstract">' +abstract+ '</p>';
      //
      //                     content += '</div>';
      //                     content += '</div>';
      //                     content += '</a>';
      //                     content +='</li>';
      //                 }
      //             })
      //             $articles.append(content);
      //         })
      //             .always(function(){
      //                 $('.loader').hide();
      //             });
      $.ajax({
        url: url,
        method: 'GET',
        dataType: 'json'

      })
      .done(function(data) {
var articleData='';
        articleData = data.results;
        var nytItems = '';
        var i = 0;

        $.each(articleData, function(key, value) {
          // var abstract,
           var articleImageUrl,
          // articleUrl;

          if (value.multimedia.length && i < 12) { //a simpler way to append only 12 articles - FM
            articleImageUrl = value.multimedia[4].url;
            articleCaption = value.abstract;
            articleLink = value.url;

            nytItems +='<li>';
            nytItems +='<a class="caption-font" href="' + articleLink + '" target="_blank">';
            nytItems +='<div>';
            nytItems +='<div class="article" style="background-image:url('+articleImageUrl+')">';
            nytItems +='<div class="abstract">';
            nytItems +='<p>' + (articleCaption || 'This story has no description.') + '</p>';
            nytItems +='</div>';
            nytItems +='</div>';
            nytItems +='</div>';
            nytItems +='</a>';
            nytItems += '</li>';
            i++;
          }
        });

        $articlelist.append(nytItems);
        //
        // //remove loader gif
        // .always(function(){
        //   $('.loader').hide();
        // });
      });
    }
  });
});
