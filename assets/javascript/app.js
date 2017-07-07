



var topic=["laughing", "mad", "happy", "chill", "shocked","omg", "yikes", "sarcasm", "what", "smiling"];

function displayGiphy(){

	var gif = $(this).attr("reaction-name");	
	var API = "b65d5f82fb254e96b900afe9bfd98bc1";
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +gif+ "&api_key=" + API+ "&limit=10";

	$(".gif-pics").empty();

	$("#title").html("Results: " + $(this).attr("reaction-name"));

	$.ajax({
		url: queryURL,
		method: "GET"}).done(function(response){
		for(var i = 0; i < 10; i++){

			var play =  response.data[i].images.fixed_height.url;

			var image = response.data[i].images.fixed_height_still.url;


			var gifDiv=$("<div class= col-md-6>");

			var rating = response.data[i].rating;

			if (rating === 'r'){

				var pOne=$("<p>").text("Rating: " + rating + " Content Not Viewable.");
				gifDiv.append(pOne);
				$(".gif-pics").prepend(gifDiv);

			}
			else {

			var pOne=$("<p>").text("Rating: " + rating);
			

			gifDiv.append(pOne);

			
			var image = $("<img class='gif img-responsive' data-still="+image+" data-state='still' data-animate="+play+">").attr("src", response.data[i].images.fixed_height_still.url);


			gifDiv.append(image);

			
			$(".gif-pics").prepend(gifDiv);
			}

	}
		})

}

function createButtons(){

	//deleting so as to avoid repeat buttons
	$("#button-list").empty();

	for (var i=0; i<topic.length; i++) {
		var b = $("<button>");
		b.addClass("reaction");
		b.attr("reaction-name",topic[i]);
		b.text(topic[i]);
		$("#button-list").append(b);
		}
}

$("#add-gif").on("click", function(event) {

	event.preventDefault();

	var react = $("#gif-input").val().trim();

	topic.push(react);

	createButtons();

});

$(document).on("click",".reaction", displayGiphy);

createButtons();

$(document).on("click",".gif", function(){


	var state = $(this).attr("data-state");
	console.log(state);
	console.log(this);

	if(state === "still") {
		$(this).attr("src", $(this).attr("data-animate"));
		$(this).attr("data-state", "animate");
	}
	else {
		$(this).attr("src", $(this).attr("data-still"));
		$(this).attr("data-state","still");
	}

});