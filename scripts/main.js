var app = {

	politicians : ['stephen-harper','justin-trudeau','thomas-mulcair','elizabeth-may'],
	search_limit : '10',

	main_url: 'http://api.openparliament.ca',

	//First Ajax query for content about the mentioned politician
	//@param politician- mentioned politician
	query: function(politician) {

		$.ajax({
			url: app.buildSearch(politician),
			type: 'GET',
			success: function(response){

				//where text is being applied
				var div = $('.bubble');
				
				//who said it
				var attribution = (response.objects[0].politician_url);
				app.buildAttribution(attribution);
				//second AJAX call

				//what they said
				var output = (response.objects[0].content.en);
				
				//set speach bubble	
				div.html(output);
			}
		});//ajax
	},//query


	//build the JSON URL for the mentioned politician.
	//@param - mentioned politician
	buildSearch: function(politician){
		var url = app.main_url + '/speeches/?mentioned_politician='+politician+'&limit='+app.search_limit+'&format=json';
		console.log(url);
		return url;
	},

	//Get profile of the politician who mentioned the leader.
	//@param politicianUrl - the url of the politicians profile
	buildAttribution: function(politicianUrl){
		console.log(app.main_url + politicianUrl + '?format=json');
		$.ajax({
			url: app.main_url + politicianUrl + '?format=json',
			type: 'GET',
			success: function(response){
				var div = $('.speaker');
				div.find('img').attr('src',app.main_url+response.image);
				div.find('#full-name').text(response.name);
				div.find('#party-riding').text(response.memberships[0].party.name.en);
			}

		});//ajax
	},//buildAttribution

	//change all a tags to include api.openparliment.ca
	//@param text - Anchor Tag that needs to be altered.
	replaceLinks: function(text){ 
		
		//To Do.

	},//replaceLinks

}//ap



$(document).ready(function(){

	$('li').on('click',function(){
		//each li has an id corresponding to the
		app.query(app.politicians[Number(this.id)]);
	});
});



