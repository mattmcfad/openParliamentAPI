var app = {

	quotes: [null,null,null,null], 
	politicians : ['stephen-harper','justin-trudeau','thomas-mulcair','elizabeth-may'],
	mps: {},


	search_limit : '3',

	main_url: 'http://api.openparliament.ca',

	//First Ajax query for content about the mentioned politician
	//@param politician- mentioned politician
	query: function(politician,id) {

		$.ajax({
			url: app.buildSearch(politician),
			type: 'GET',
			success: function(response){
				app.quotes[id] = response; 
				//where text is being applied
				var div = $('.bubble');

				for (var i = 0; i < app.search_limit; i ++) {
					//what they said
					var content = (response.objects[i].content.en);

					//URL of politician who said it.
					var attribution = (response.objects[i].politician_url);

					//stats of the politician who said it 
					//second AJAX call
					stats = app.buildAttribution(attribution,content,id,i);

					//set speach bubble	
					div.html(content);

					//shitSaid[id] = contentRecord(content,)
				}

				
				
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
	buildAttribution: function(politicianUrl, content,id,i){
		console.log(app.main_url + politicianUrl + '?format=json');
		$.ajax({
			url: app.main_url + politicianUrl + '?format=json',
			type: 'GET',
			success: function(response){

				app.mps['id_'+response.other_info.wikipedia_id] = response; 

				var div = $('.speaker');
				
				console.log(content);
				var img = app.main_url+response.image;
				div.find('img').attr('src',app.main_url+response.image);
				
				var name = response.name;
				div.find('#full-name').text(response.name);

				var partyRiding = response.memberships[0].party.name.en;
				div.find('#party-riding').text(response.memberships[0].party.name.en);

				app.contentRecord(content,img,name,partyRiding,id,i);


			}

		});//ajax
	},//buildAttribution

	//create a record of who mentioned a leader
	//@param content - what they said about mentioned leader
	//@param img - image of the politician who said this
	//@param name - name of the politician who said this
	//@param partyRiding - Party and Riding of the politician who saids.
	//@param id - refers to which politician is being mentioned
	//@param i - refers to which index in the politicians array
	contentRecord: function(content,img,name,partyRiding,id,i){
		var record = { content: content, image: img, fullName: name, party: partyRiding};
		
		console.log(app.shitSaid);
	},

	//change all a tags to include api.openparliment.ca
	//@param text - Anchor Tag that needs to be altered.
	replaceLinks: function(text){ 
		
		//To Do.


	},//replaceLinks

}//ap



$(document).ready(function(){

	$('li').on('click',function(){
		//each li has an id corresponding to the
		app.query(app.politicians[Number(this.id)],Number(this.id));
	});
});



