function yelpApi() {
    // Set Up the API endpoint and parameters
    const url = 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search';
    const apiKey = 'Bearer dP92CHePjlcDz-ohDw-j69lpyxOZI3K8azTR037qWSHnP85OQO5y4cJktUQF_YIWZtyi6WxzY-gTS3ZbPiqNbNdktWKj5M4CSJUiJKJ733A5ke1PiASRG5uLyDgbZHYx';
    let select = {
        location: $("#location").val().trim(), // Grabs the location of an area the user types in
        foods: ['american', 'chinese', 'mexican', 'japanese', 'indian', 'italian', 'korean'],
        foodSplit: [],
        limit: 15, // How many results to fetch
        delivery: 'restaurants_delivery', // Select restaurants that offer delivery
    }
    let selectedFoods = [];

    function isChecked() {
        for (i = 0; i < select.foods.length; i++) {
            select.foodSplit.push(select.foods[i].split(' '));
            if ($("#" + select.foods[i]).is(":checked")) {
                selectedFoods.push(select.foods[i]);
            }
        }
        $("#selectedFoods").text("Selected Food Types: " + selectedFoods);
    }
    isChecked();

    fetch(`${url}?term=${selectedFoods + " food"} // Selects that  you're looking for restaurants
    &categories=${selectedFoods} // Selects what type of food you prefer
    &location=${select.location} // Selects restaurants near the designated address
    &attributes=${select.delivery} // Select only restaurants that deliver
    &limit=${select.limit}`, { // Select 10 restaurants from the list
        headers: {
            Authorization: apiKey,
        },
    })
        .then((response) => response.json())
        .then((data) => {
            // Randomly pick one restaurant from the list
            const randomIndex = Math.floor(Math.random() * data.businesses.length);
            const business = data.businesses[randomIndex];
            $(".foodResults").prepend("<img id='foodImg' src='" + business.image_url + "'>"); // Inserts an image from Yelp Object
            $("#restaurantName").text(business.name); // Displays Business Name
            $("#restaurantType").text(selectedFoods);  // Displays Selected Business Rating
            $("#restaurantRating").text("Rating: " + business.rating + "/5");  // Displays Selected Business Rating
            $("#restaurantPrice").text("Average Price: " + business.price); // Displays Selected Business Price Range

            let navButton = $("<button>");
            navButton.text("Order from Here");
            navButton.attr("id", "order");
            navButton.attr("class", "button is-centered is-success is-medium")
            $(".afterBtns").append(navButton)
            $('#order').click(function () {
                window.open(business.url, '_blank');
            });

            const savedInfo = { // A variable for saving generated data
                image: business.image_url,
                name: business.name,
                type: selectedFoods,
                rating: business.rating,
                price: business.price
            };
            const stringInfo = JSON.stringify(savedInfo); // Converts saved data as a string
            let saveButton = $("<button>");
            saveButton.text("Save Results");
            saveButton.attr("id", "saveFood");
            saveButton.attr("class", "button is-centered is-success is-medium");
            $(".afterBtns").append(saveButton)
            $("#saveFood").click(function () {
                localStorage.setItem('Generated Food', stringInfo);
            })

        })
        .catch((error) => console.log(error));
}
$("#generateFood").click(function () {
    $(".foodResults img").remove(); // remove images when searcching for new restaurants to avoid creating multiple images
    $("#saveFood").remove();
    $('.foodResults').css('display', 'block');
    yelpApi();
});