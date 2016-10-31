// Built by LucyBot. www.lucybot.com
	
$("document").ready(function(){
	//event listeners
	$("#submit").click(onSubmit);
	$("#clear").click(function(){
		$("#searchTerm").val("");
		$("#numRecords").val("5");
		$("#startYear").val("");
		$("#endYear").val("");
	});
});
function onSubmit(){	
	var searchURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
	var key = "ca789060234c4688a4bc3a324e26de6c";
	var keyword = $("#searchTerm").val();
	// should validate year format here, or use a date picker
	var startDate = $("#startYear").val(); 
	var endDate = $("#endYear").val();
	var recordsLimit = $("#numRecords").val();

	searchURL += "?api-key=" + key + "&q=" + keyword;
	if (startDate.length > 1){
		searchURL += "&begin_date=" + startDate + "0101";
	}
	if (endDate.length > 1){
		searchURL += "&end_date=" + endDate + "1231";
	}
		
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
			$("#results").empty();
			
		    for (var i = 0; i < loops; i++){
				console.log(i);
			    var articleNum = "article" + i;
				
				var article = $("<div>");	
			    article.attr("id", articleNum);
				article.addClass("well").addClass("result");
					
				var currentArticle = result.response.docs[i];	

			    var headline = "<h3 class='title'>" + currentArticle.headline.main + "</h3>";
			    var articleSection = "<div class='section'" + currentArticle.section_name + "</div>";
				var byline = "<div class='byline'>";
				if(currentArticle.byline){
					//sometimes this is null, and it throws an error
					byline = currentArticle.byline.original;
				}
				byline += "</div>";
				var publishDate = "<div class='date'>" + currentArticle.pub_date.split("T").shift() + "</div>";
			    var articleURL = "<div class='articleUrl'><a href='" + currentArticle.web_url + "' target='_blank'>View Article >></a></div>";
			    
				article.append(headline).append(byline).append(publishDate).append(articleSection).append(articleURL);
				$("#results").append(article);
			}
		}
	})
	.fail(function(err) {
	    //throw err;
	});
}