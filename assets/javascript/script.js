      // Initial array of movies
      var cars = ["ford", "honda", "toyota", "dodge", "kia", "bmw", "audi", "gmc", "chevy", "volvo"];

      // displayMovieInfo function re-renders the HTML to display the appropriate content
      function displayCarInfo() {

        var car = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=we748bwKG6dqEfiIdJdX8nmZixYkk5x9&q=cars&limit=10&offset=0&rating=PG-13&lang=en";

        // Creating an AJAX call for the specific car button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
          console.log(response)
          $("#cars-view").empty();
           // console.log(queryURL)
           for (var i = 0; i < response.data.length; i++) {
          // Creating a div to hold the car
          var carDiv = $("<div class='car'>");
          // Storing the rating data
          var rating = response.data[i].rating;
          // Creating an element to have the rating displayed
          var rate = $("<p>").text("Rating: " + rating);
          // Displaying the rating
          carDiv.append(rate);
          // Retrieving the URL for the still image
          var imgURL = response.data[i].images.fixed_height_still.url;
          // Creating an element to hold the still image
          var image = $("<img>").attr("src", imgURL);
          // Appending the still image
          carDiv.append(image);
          // Retrieving the URL for the still image
          var imgMURL = response.data[i].images.fixed_width.url;
          // Creating an element to hold the still image
        //   var imageM = $("<img>").attr("src", imgMURL);
        //   // Appending the image
        //   carDiv.append(imageM);
          // Putting the entire car above the previous cars

           $("#cars-view").prepend(carDiv)
          }
    });
    }
        image.attr("data-state", "still");
        imgMURL.attr("data-state", "animate");

        $(".gif").on("click", function() {
            var state = $(this).attr("data-state");

             if (state === "still") {
             $(this).attr("src", $(this).attr("data-animate"));
             $(this).attr("data-state", "animate");
             } else {
              $(this).attr("src", $(this).attr("data-still"));
              $(this).attr("data-state", "still");
             }
      // Function for displaying car data
      function renderButtons() {

        // Deleting the cars prior to adding new cars
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();

        // Looping through the array of cars
        for (var i = 0; i < cars.length; i++) {

          // Then dynamicaly generating buttons for each car in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class of car-btn to our button
          a.addClass("car-btn");
          // Adding a data-attribute
          a.attr("data-name", cars[i]);
          // Providing the initial button text
          a.text(cars[i]);
          // Adding the button to the buttons-view div
          $("#buttons-view").append(a);
        }
      }

      // This function handles events where a car button is clicked
      $("#add-car").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var car = $("#car-input").val().trim();

        // Adding car from the textbox to our array
        cars.push(car);

        // Calling renderButtons which handles the processing of our car array
        renderButtons();
      });

      // Adding a click event listener to all elements with a class of "car-btn"
      $(document).on("click", ".car-btn", displayCarInfo);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();
