// Initial array of cars
var cars = ["ford", "honda", "toyota", "dodge", "kia", "bmw", "audi", "gmc", "chevy", "volvo"];

$(document).on("click", ".car", function () {

    var car = $(this).attr("data-name");
    // var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=we748bwKG6dqEfiIdJdX8nmZixYkk5x9&q=cars&limit=10&offset=0&rating=PG-13&lang=en";
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + car + "&api_key=we748bwKG6dqEfiIdJdX8nmZixYkk5x9&limit=10&offset=0&rating=PG-13&lang=en";
    // Creating an AJAX call for the specific car button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response)
        $("#cars-view").empty();
        // console.log(queryURL)
        for (var i = 0; i < response.data.length; i++) {
            // Creating a div to hold the cars
            var carDiv = $("<div class='carDiv'>");
            var rating = response.data[i].rating;
            var rate = $("<p>").text("Rating: " + rating);
            var img = $("<img>");
            img.attr("src", response.data[i].images.fixed_height_still.url);
            img.attr("data-still", response.data[i].images.fixed_height_still.url);
            img.attr("data-animate", response.data[i].images.fixed_height.url);
            img.attr("data-state", "still");
            img.addClass("gif");
            carDiv.append(img);
            carDiv.append(rate);
            // Putting the entire car above the previous cars
            $("#cars-view").prepend(carDiv);
        }
        $(".gif").on("click", function () {
            var state = $(this).attr("data-state");

            if (state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
            } else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }
        });
    });
});

// Function for displaying car data
function renderButtons() {

    // Deleting the cars prior to adding new cars
    $("#buttons-view").empty();

    // Looping through the array of cars
    for (var i = 0; i < cars.length; i++) {

        // Then dynamicaly generating buttons for each car in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a class of car-btn to our button
        a.addClass("car");
       
        // Adding a data-attribute
        a.attr("data-name", cars[i]);
        a.attr("data-state", "still");
        // Providing the initial button text
        a.text(cars[i]);
        // Adding the button to the buttons-view div
        $("#buttons-view").append(a);
    }
}
// This function handles events where a car button is clicked
$("#add-car").on("click", function (event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var car = $("#car-input").val().trim();
    // Adding car from the textbox to our array
    cars.push(car);
    // Calling renderButtons which handles the processing of our car array
    renderButtons();
});
// Adding a click event listener to all elements with a class of "car-btn"
// $(document).on("click", ".car", this);
// Calling the renderButtons function to display the intial buttons
renderButtons();
