



var topic=["laughing", "mad", "happy", "chill", "shocked","omg", "yikes", "sarcasm", "what", "smiling"];

function displayGiphy(){

	var gif = $(this).attr("reaction-name");	
	var API = "b65d5f82fb254e96b900afe9bfd98bc1";
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +gif+ "&api_key=" + API+ "&limit=10";

	$("#gif-pics").empty();
	
	$.ajax({
		url: queryURL,
		method: "GET"}).done(function(response){
		for(var i = 0; i < 10; i++){
			var gifDiv=$("<div class='gif'>");

			var rating = response.data[i].rating;

			var pOne=$("<p>").text("Rating: " + rating);
			console.log(response.data[i].rating);

			gifDiv.append(pOne);

			
			var image = $("<img>").attr("src", response.data[i].images.fixed_height_still.url);

			gifDiv.append(image);

			$("#gif-pics").prepend(gifDiv);

			console.log(response.data[i].images.fixed_height_still.url);
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
