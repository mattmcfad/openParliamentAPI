var app = {

	quotes: [null,null,null,null], 

	leaders : ['stephen-harper','justin-trudeau','thomas-mulcair','elizabeth-may'],
	mps: {},


	search_limit : '5',

	current_id : 0,
	//next bubble
	bubble_id : 0,

	main_url: 'http://api.openparliament.ca',

	//First Ajax query for content about the mentioned politician
	//@param politician- mentioned politician
	query: function(politician,id) {

		$.ajax({
			url: app.buildSearch(politician),
			type: 'GET',
			success: function(response){
				//store the mentioned politicians quotes
				app.quotes[id] = response; 
				//set current politician
				app.current_id = id;

				app.bubble_id = 0;


				app.nextQuote();





				// //where text is being applied
				// var div = $('.bubble');

				// for (var i = 0; i < app.search_limit; i ++) {
				// 	//what they said
				// 	var content = (response.objects[i].content.en);

				// 	//URL of politician who said it.
				// 	var attribution = (response.objects[i].politician_url);

				// 	//stats of the politician who said it 
				// 	//second AJAX call
				// 	stats = app.buildAttribution(attribution,content,id,i);

				// 	//set speach bubble	
				// 	div.html(content);

				// 	//shitSaid[id] = contentRecord(content,)
				// }

				
				
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
	//@param mpURL - the url of the leaders profile
	buildAttribution: function(mpURL){
		console.log("getting: "+app.main_url + mpURL + '?format=json');
		$.ajax({
			url: app.main_url + mpURL + '?format=json',
			type: 'GET',
			success: function(response){
				console.log('setting MP key: ' +mpURL);
				app.mps[mpURL] = response; 


				var speaker = $('.speaker');
				speaker.find('img').attr('src',app.main_url+app.mps[mpURL].image);
				speaker.find('#full-name').text(app.mps[mpURL].name);
				speaker.find('#party-riding').text(app.mps[mpURL].memberships[0].party.name.en);

				//var div = $('.speaker');
				
				// console.log(content);
				// var img = app.main_url+response.image;
				// div.find('img').attr('src',app.main_url+response.image);
				
				// var name = response.name;
				// div.find('#full-name').text(response.name);

				// var partyRiding = response.memberships[0].party.name.en;
				// div.find('#party-riding').text(response.memberships[0].party.name.en);

				//app.contentRecord(content,img,name,partyRiding,id,i);


			}

		});//ajax
	},//buildAttribution


	nextQuote: function(){
		var bubble  = $('.bubble');
		var speaker = $('.speaker');
		console.log('quotes: ' +app.quotes[app.current_id].objects[app.bubble_id].content.en);
		bubble.html(app.quotes[app.current_id].objects[app.bubble_id].content.en);

		//get quotes for specific leader
		var quotes = app.quotes[app.current_id];
		//get mp's URL of who said current quote;
		var mpURL = quotes.objects[app.bubble_id].politician_url;
		
		//if the MP isn't cached
		if (app.mps[mpURL] === undefined){
			app.buildAttribution(mpURL);
		}
		//get cache and set the dude.
		else {
			// var index = '\'' + mpURL + '\'';
			// console.log(index);
			console.log(app.main_url+app.mps[mpURL].image);			
			speaker.find('img').attr('src',app.main_url+app.mps[mpURL].image);
			speaker.find('#full-name').text(app.mps[mpURL].name);
			speaker.find('#party-riding').text(app.mps[mpURL].memberships[0].party.name.en);
		}
		






	},//nextQuote


	//create a record of who mentioned a leader
	//@param content - what they said about mentioned leader
	//@param img - image of the politician who said this
	//@param name - name of the politician who said this
	//@param partyRiding - Party and Riding of the politician who saids.
	//@param id - refers to which politician is being mentioned
	//@param i - refers to which index in the leaders array
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
		var id = Number(this.id);
		app.current_id = id;
		//if the Leader hasn't already been queried
		if(app.quotes[id] !== undefined){
			//query the leader
			app.query(app.leaders[id],id);
		}
		else {
			app.nextQuote();
			//recall the cache
		}	

	});
});



