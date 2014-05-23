var app = {

	politicians : ['stephen-harper'],

	main_url: 'http://api.openparliament.ca/',

	query: function(search,politician,date,limit) {

		console.log("Jess's sanity check");
		var search_url = app.main_url;

		switch(search){
			case 'speech' : search_url + 'speeches';
							break;

			default: app.main_url + 'politicians/stephen-harper/';
		}

		$.ajax({
			url: app.main_url + 'speeches/?mentioned_politician=stephen-harper&limit=10&format=json',
			type: 'GET',
			success: function(response){

				var div = $('.wrapper');
				
				for(var i = 0; i < response.objects.length; i++){
					
					var speaker = (response.objects[i].attribution.en);
					var output = (response.objects[i].content.en);
					
					div.append('<h4>'+speaker+'</h4>');
					div.append(output);
				}
			}
		});//ajax
	},//query

	//change all a tags to include api.openparliment.ca
	replaceLinks: function(text){ 

	}//replaceLinks
}//ap



$(document).ready(function(){
	app.query()
});



