function yelpApi() {
    // Set Up the API endpoint and parameters
    const url = 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search';
    const apiKey = 'Bearer dP92CHePjlcDz-ohDw-j69lpyxOZI3K8azTR037qWSHnP85OQO5y4cJktUQF_YIWZtyi6WxzY-gTS3ZbPiqNbNdktWKj5M4CSJUiJKJ733A5ke1PiASRG5uLyDgbZHYx';
    let select = {
        location: $("#location").val().trim(), // Grabs the location of an area the user types in
        foods: ['american', 'chinese', 'mexican', 'japanese', 'indian', 'italian', 'korean'],
        foodSplit: [],
        limit: 1, // How many results appear
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
    &limit=${select.limit}`, { // Select 1 restaurant from the list
        headers: {
            Authorization: apiKey,
        },
    })
        .then((response) => response.json())
        .then((data) => {
            // Print the names of the businesses that were retrieved
            data.businesses.forEach((business) => {
                console.log(
                    "Name: " + business.name + // Displays Business Name
                    "\nRating: " + business.rating + // Displays Selected Business Rating
                    "\nPrice Range: " + business.price + // Displays Selected Business Price Range
                    "\nCategories: " + JSON.stringify(select.foods) + // Displays categories of business
                    "\nImg URL: " + business.image_url + // Displays a featured image URL from the business
                    "\nAddress: " + JSON.stringify(business.location) + // Displays the address of a business
                    "\nYelp Link: " + business.url); // Displays the link to the yelp business
                $(".foodResults").prepend("<img id='foodImg' src='" + business.image_url + "'>"); // Inserts an image from Yelp Object
                $("#restaurantName").text(business.name); // Displays Business Name
                $("#restaurantType").text(selectedFoods);  // Displays Selected Business Rating
                $("#restaurantRating").text("Rating: " + business.rating + "/5");  // Displays Selected Business Rating
                $("#restaurantPrice").text("Average Price: " + business.price); // Displays Selected Business Price Range
                console.log(selectedFoods)
            });
        })
        .catch((error) => console.log(error));
}
$("#generate").click(function () {
    $(".foodResults img").remove(); // remove images when searcching for new restaurants to avoid creating multiple images
    yelpApi();
    $('.foodResults').css('display', 'block');
    
});
$("#generateFood").click(function () {
    $(".foodResults img").remove(); // remove images when searcching for new restaurants to avoid creating multiple images
    yelpApi();
    $('.foodResults').css('display', 'block');
    console.log(genFood)
});


