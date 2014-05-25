
var app = {

	//<ul> containing cycling list of leaders
	uLleaders : $('ul.leaders'),
	//position in unordered cycling list of leaders
	uLindex : 0,
	//test if leaders drop down is being mouse overed
	uLmouseover: false,


	//whats being displayed to ul List
	leadersNav : ["Stephen Harper", "Justin Trudeau", "Thomas Mulcair", "Elizabeth May"],
	//used for search query
	politicians : ['stephen-harper','justin-trudeau','thomas-mulcair','elizabeth-may'],
	//array of quotes of leaders.
	quotes: [null,null,null,null], 

	//Party Leaders
	leaders : ['stephen-harper','justin-trudeau','thomas-mulcair','elizabeth-may'],
	
	//Members of Parliament that mention the leaders
	mps: {},

	//Greater than 6 will cause HTTP request errors.
	search_limit : 6,

	current_id : 0, //which leader
	quote_id : 0,  //which quote

	main_url: 'http://api.openparliament.ca',

	//First Ajax query for content about the mentioned politician
	//@param politician - mentioned politician
	//@param id - represents which political leader
	query: function(politician,id) {
		console.log("Ajax query for speeches mentioning: " + politician);
		$.ajax({
			url: app.buildSearch(politician),
			type: 'GET',
			success: function(response){
				//store the mentioned politicians quotes
				app.quotes[id] = response; 
				
				//set current politician
				app.current_id = id;
				//reset quote
				app.quote_id = 0;

				app.nextQuote();
					
			}
		});//ajax
	},//query


	//build the JSON URL for the mentioned politician / leader.
	//@param - mentioned politicial Leader 
	buildSearch: function(politician){
		var url = app.main_url + '/speeches/?mentioned_politician='+politician+'&limit='+app.search_limit+'&format=json';
		console.log("Building search URL for " + politician + " :" +url);
		return url;
	},


	//Get profile of the politician who mentioned the leader.
	//@param mpURL - the url of the leaders profile
	buildAttribution: function(mpURL){
		console.log("Ajax query for MP profile: "+app.main_url + mpURL + '?format=json');
		$.ajax({
			url: app.main_url + mpURL + '?format=json',
			type: 'GET',
			success: function(response){
				//console.log('setting MP key: ' +mpURL);
				app.mps[mpURL] = response; 

				var speaker = $('.speaker');
				speaker.find('img').attr('src',app.main_url+app.mps[mpURL].image);
				speaker.find('#full-name').text(app.mps[mpURL].name);
				speaker.find('#party-riding').text(app.mps[mpURL].memberships[0].party.name.en);

			}

		});//ajax
	},//buildAttribution


	//Displays the content and speaker information
	//increases iteration for the bubble.
	nextQuote: function(){
		var bubble  = $('.quote-text');	//speach bubble of whats being said
		var speaker = $('.speaker');//who said it
		

		//change background based on which leader is selected.
		var bg = $('.body-wrapper');

		switch (app.current_id) {
			//Harper
			case 0: 
					bg.addClass('bg-harper');
					bg.removeClass('bg-trudeau bg-mulcair bg-may').fadeIn();
					break;
			//Trudeau
			case 1: 
					bg.addClass('bg-trudeau');
					bg.removeClass('bg-harper bg-mulcair bg-may');
					break;
			//Mulcair
			case 2: 
					bg.addClass('bg-mulcair');
					bg.removeClass('bg-trudeau bg-harper bg-may');
					break;
			//May
			case 3: 
					bg.addClass('bg-may');
					bg.removeClass('bg-trudeau bg-mulcair bg-harper');
					break;

		}


		// var leader = $('.leader');	//mentioned political leader

		// var rand = Math.floor(Math.random()*3+1);
		// console.log("politician: " + app.current_id + ' numb:' + rand);

		// switch (app.current_id) {
		// 	//Harper
		// 	case 0 :  	leader.find('img').attr('src',('images/harper/'+rand+'.jpg'));
		// 				break;
		// 	//Trudeau			
		// 	case 1 : 	if (rand === 3) {
		// 					leader.find('img').attr('src',('images/trudeau/'+rand+'.PNG'));
		// 				}else{
		// 					leader.find('img').attr('src',('images/trudeau/'+rand+'.jpg'));
		// 				}
		// 				break;
		// 	//Mulcair			
		// 	case 2 : 	leader.find('img').attr('src',('images/mulcair/'+rand+'.jpg'));
		// 				break;
		// 	//Elizabeth May
		// 	case 3 : 	if (rand ===2) {
		// 					leader.find('img').attr('src',('images/may/'+rand+'.jpeg'));
		// 				}else{
		// 					leader.find('img').attr('src',('images/may/'+rand+'.jpg'));
		// 				}
		// 				break;
		// } 
		
		//set content bubble.
		bubble.html(app.quotes[app.current_id].objects[app.quote_id].content.en);

		//get quotes for specific leader
		var quotes = app.quotes[app.current_id];
		//get mp's URL of who said current quote;
		var mpURL = quotes.objects[app.quote_id].politician_url;
		
		//if the MP isn't cached
		if (app.mps[mpURL] === undefined){
			app.buildAttribution(mpURL);
		}
		//get cache and set the speaker.
		else {		
			speaker.find('img').attr('src',app.main_url+app.mps[mpURL].image);
			speaker.find('#full-name').text(app.mps[mpURL].name);
			speaker.find('#party-riding').text(app.mps[mpURL].memberships[0].party.name.en);
		}

		app.quote_id++;
		//console.log('incrementing quote_id: ' + app.quote_id);

		//reset quote_id when it reaches # of quotes
		if (app.quote_id === app.search_limit){
			app.quote_id = 0;
			//console.log('reseting quote_id: ' + app.quote_id);
		}
	},//nextQuote


	//change all a tags to include api.openparliment.ca
	//@param text - Anchor Tag that needs to be altered.
	replaceLinks: function(text){ 
		
		//To Do.

	},//replaceLinks


	//run the rotating Nav
	buildNav: function(){

		//append the sub menu on mouseOver
	 	if (app.uLmouseover === false){
		 	switch (app.uLindex) {
		 		case 0: app.uLleaders.html("<li class='first' ><a href='#' id=" + app.uLindex + ">"+app.leadersNav[app.uLindex]+"</a><ul class='sub-leadersNav'><li ><a href='#' id=1>" + app.leadersNav[app.uLindex+1]+"</a></li><li ><a href='#' id=2>" + app.leadersNav[app.uLindex+2]+"</a></li><li ><a href='#' id=3>" + app.leadersNav[app.uLindex+3]+"</a></li></ul></li>");
		 			break;
		 		case 1: app.uLleaders.html("<li class='first' ><a href='#' id=" + app.uLindex + ">"+app.leadersNav[app.uLindex]+"</a><ul class='sub-leadersNav'><li ><a href='#' id=2>" + app.leadersNav[app.uLindex+1]+"</a></li><li ><a href='#' id=3>" + app.leadersNav[app.uLindex+2]+"</a></li><li ><a href='#' id=0>" + app.leadersNav[0]+"</a></li></ul></li>");
		 			break;
		 		case 2: app.uLleaders.html("<li class='first' ><a href='#' id=" + app.uLindex + ">"+app.leadersNav[app.uLindex]+"</a><ul class='sub-leadersNav'><li ><a href='#' id=3>" + app.leadersNav[app.uLindex+1]+"</a></li><li ><a href='#' id=0>" + app.leadersNav[0]+"</a></li><li ><a href='#' id=1>" + app.leadersNav[1]+"</a></li></ul></li>");	
		 			break;
		 		case 3: app.uLleaders.html("<li class='first' ><a href='#' id=" + app.uLindex + ">"+app.leadersNav[app.uLindex]+"</a><ul class='sub-leadersNav'><li ><a href='#' id=0>" + app.leadersNav[0]+"</a></li><li ><a href='#' id=1>" + app.leadersNav[1]+"</a></li><li ><a href='#' id=2>" + app.leadersNav[2]+"</a></li></ul></li>");	
		 			break;
		 	} 
	 	}

	 	//increment index 
		app.uLindex++;
	 	if (app.uLindex >=4) {
	 		//
			app.uLindex=0;
		} //if

		//if mouseover don't increment index
		$('li').on('mouseover', function (){
			app.uLmouseover=true;
		});

		//on mouseout, go back to rotating nav
		$('li').on('mouseout', function (){
			app.uLmouseover=false;
		});


		//on clicking one of the political leaders.
		$('ul li:first-child ul li a, ul li:first-child a').on('click',function(e){
			e.preventDefault();

			console.log("clicked on " + app.leaders[Number(this.id)]);
			//each li has an id corresponding to the leaders array
			var id = Number(this.id);
			app.current_id = id;
			//if the Leader hasn't already been queried
			if(app.quotes[id] === null){
				console.log("making a query for: " + app.leaders[id]);
				//query the leader
				app.query(app.leaders[id],id);
			}
			else {
				console.log("retrieving cache for: " + app.leaders[id]);
				app.nextQuote();
				//recall the cache
			}

		});//on click

		$('button#next-quote').on('click', function(e){
			e.preventDefault();
			app.nextQuote();
		});
	 }//buildNav

}//ap


  //Create Interval to loop through Nav of Party Leaders 
  

$(document).ready(function(){
	window.setInterval(app.buildNav, 1500);
	//window.setTimeout(app.buildNav, 1500);
	//clicking on a Leader's name.
});











































