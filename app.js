// Built by LucyBot. www.lucybot.com
	
$("document").ready(function(){
	$("#submit").click(onSubmit);
});
function onSubmit(){	
	var searchURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
	var key = "ca789060234c4688a4bc3a324e26de6c";
	var keyword = $("#searchTerm").val();
	var startDate = $("#startYear").val(); //Format YYYYMMDD
	var endDate = $("#endYear").val();
	var recordsLimit = $("#numRecords").val();

	searchURL += "?api-key=" + key + "&q=" + keyword;
	if (startDate.length > 1){
		searchURL += "&begin_date=" + startDate;
	}
	if (endDate.length > 1){
		searchURL += "&end_date=" + endDate;
	}
	//console.log(searchURL);
		
	$.ajax({
	  url: searchURL,
	  method: "GET"
	})
	.done(function(result) {
		var loops = recordsLimit;
	  	if (result.response.docs.length === 0){
	  		console.log("No articles found");
	  	} else {
	  		if (result.response.docs.length < recordsLimit){
	  			loops = result.response.docs.length;
	  		}

		    for (var i = 0; i < loops; i++){
			    var articleNum = "article" + i;
				
				var article = $("<div>");	
			    article.attr("id", articleNum);
				article.addClass("well").addClass("result");
					
				var currentArticle = result.response.docs[i];	

			    var headline = "<h3 class='title'>" + currentArticle.headline.main + "</h3>";
			    var articleSection = "<div class='section'" + currentArticle.section_name + "</div>";
				var byline = "<div class='byline'>" + currentArticle.byline.original + "</div>";
				var publishDate = "<div class='date'>" + currentArticle.pub_date + "</div>";
			    var articleURL = "<div class='articleUrl'>" + currentArticle.web_url + "</div>";
			    
				article.append(headline).append(byline).append(publishDate).append(articleSection).append(articleURL);
				$("#results").append(article);
			}
		}
	})
	.fail(function(err) {
	    //throw err;
	});
}