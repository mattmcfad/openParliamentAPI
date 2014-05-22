var app = {

	var url_home = 'http://api.openparliament.ca/';

	init: function() {
		console.log("Jess's sanity check");
		$.ajax({
			url: 'http://api.openparliament.ca/speeches/?mentioned_politician=stephen-harper&limit=10&format=json',
			type: 'GET',
			success: function(response){

				var div = $('.wrapper');

				
				for(var i = 0; i < response.objects.length; i++){
					var speaker = (response.objects[i].attribution.en);
					var output = (response.objects[i].content.en);
					div.append(speaker);
					div.append(output);
				}
			}
		});

	},//init

	replaceLinks: function(text){ 
	}
}//ap





$(document).ready(function(){
	app.init()
});



