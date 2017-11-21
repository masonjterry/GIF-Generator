$(document).ready(function() {

  let gifArr = ["michael scott", "dwight shrute", "creed bratton", "stanley hudson", "jim halpert"];

  function createButton() {
    $("#buttonsDiv").empty();

    for (let i = 0; i < gifArr.length; i++) {

    let newButton = $("<button>");

    newButton.addClass("gifs btn");
    newButton.attr("data-name", gifArr[i]);
    newButton.text(gifArr[i]);

    $("#buttonsDiv").append(newButton);

    }

  }

  $(document).on("click", "#button", function(event) {

    event.preventDefault();

    let button = $("#input").val().trim();

    gifArr.push(button);

    createButton();

  });

  $(document).on("click", ".gifs", function(event) {

    let gifName = $(this).attr("data-name");

    let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gifName +"&api_key=w52Y5QjnKPepH9PkHJmhJDbaISOJLre5&limit=10";

      $.ajax({ url: queryURL, method: "GET"}).done(function(response) {

        let newGifDiv = $("<div>");

        for (let i = 0; i <response.data.length; i++) {

        let rating = response.data[i].rating;

        let ratingP = $("<p>").text("Rating: " + rating);

        let imageAnimate = response.data[i].images.original.url;

        let imageStill = response.data[i].images.original_still.url;

        let image = $("<img src=\"" + imageStill + "\"data-still=\"" + imageStill + "\" data-animate=\"" + imageAnimate + "\" data-state=\"still\">");

        newGifDiv.append(image);

        newGifDiv.append(ratingP);

        $("#gifDiv").prepend(newGifDiv);

        }
      });
  });

  $(document).on("click", "img", function(event) {

    let click = $(this).attr("data-state");

    if (click === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

  createButton();

});
