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
	  	console.log();
	  	if (result.response.length <= recordsLimit){
	  		console.log("Not enough articles found: "+result.response.length);
	  	} else {
		    for (var i = 0; i < recordsLimit; i++){
			    var articleNum = "article" + i;
				console.log(articleNum);
				
				var article = $("<div/>");	
			    article.attr("id", articleNum);
				article.attr("class", "newsarticle");
					
				var currentArticle = result.response.docs[i];	
			    var articleSection = $(currentArticle).attr("section_name");
					
			    var headline = currentArticle.headline.main;
					
				var sectionType = $(currentArticle).attr("section_name");
			    
				var byline = currentArticle.byline.original;
				var publishDate = $(currentArticle).attr("pub_date");
			    var articleURL = $(currentArticle).attr("web_url");    
			    
				$(article).html(headline + "<br>" + sectionType);
				$("#results").append(article);
			}
		}
	})
	.fail(function(err) {
	    //throw err;
	});
}