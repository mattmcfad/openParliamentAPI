var app = {

	politicians : ['stephen-harper','justin-trudeau','thomas-mulcair','elizabeth-may'],
	search_limit : '10',

	main_url: 'http://api.openparliament.ca',

	query: function(politicians) {

		$.ajax({
			url: app.buildSearch(politicians),
			type: 'GET',
			success: function(response){

				var div = $('.bubble');
					
					var speaker = (response.objects[0].attribution.en);
					var output = (response.objects[0].content.en);
					
					div.html('<h4>'+speaker+'</h4>');
					div.html(output);
			}
		});//ajax
	},//query

	//change all a tags to include api.openparliment.ca
	replaceLinks: function(text){ 

	},//replaceLinks

	buildSearch: function(politician){
		var url = app.main_url + '/speeches/?mentioned_politician='+politician+'&limit='+app.search_limit+'&format=json';
		console.log(url);
		return url;
	},

	buildAttribution: function(politicianUrl){
		var url = app.main_url + politicianUrl + '?format=json';
		return url;
	}

}//ap



$(document).ready(function(){
	// app.query();

	$('li').on('click',function(){
		
		app.query(app.politicians[Number(this.id)]);
	});
});



