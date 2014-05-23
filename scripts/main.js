
var app = {
	uLleaders :  $('ul.leaders'),
	uLindex : 0,

	leaders : ["Stephen Harper", "Justin Trudeau", "Thomas Mulcair", "Elizabeth May"],
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
 buildNav: function(){

 	switch (app.uLindex) {
 		case 0: app.uLleaders.html("<li id=" + app.uLindex + ">"+app.leaders[app.uLindex]+"<ul class='sub-leaders'><li id=1>" + app.leaders[app.uLindex+1]+"</li><li id=2>" + app.leaders[app.uLindex+2]+"</li><li id=3>" + app.leaders[app.uLindex+3]+"</li></ul></li>");
 			break;

 		case 1: app.uLleaders.html("<li id=" + app.uLindex + ">"+app.leaders[app.uLindex]+"<ul class='sub-leaders'><li id=2>" + app.leaders[app.uLindex+1]+"</li><li id=3>" + app.leaders[app.uLindex+2]+"</li><li id=0>" + app.leaders[0]+"</li></ul></li>");
 			break;
 		case 2: app.uLleaders.html("<li id=" + app.uLindex + ">"+app.leaders[app.uLindex]+"<ul class='sub-leaders'><li id=3>" + app.leaders[app.uLindex+1]+"</li><li id=0>" + app.leaders[0]+"</li><li id=1>" + app.leaders[1]+"</li></ul></li>");	
 			break;
 		case 3: app.uLleaders.html("<li id=" + app.uLindex + ">"+app.leaders[app.uLindex]+"<ul class='sub-leaders'><li id=0>" + app.leaders[0]+"</li><li id=1>" + app.leaders[1]+"</li><li id=2>" + app.leaders[2]+"</li></ul></li>");	
 			break;
 	} 

	app.uLindex++;
 	if (app.uLindex >=4) {
		app.uLindex=0;
	} //if  
  }//buildNav

}//ap


  //Create Interval to loop through Nav of Party Leaders 
  




$(document).ready(function(){

	window.setInterval(app.buildNav, 1500);

	$('li').on('click',function(){
		//each li has an id corresponding to the
		app.query(app.politicians[Number(this.id)]);
	});
});



