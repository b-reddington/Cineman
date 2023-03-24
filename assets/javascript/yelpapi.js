function yelpApi() {
    //TO-DO
    // Create an array of 20 restaurant choices, randomly select 1 choice to display
    // Set the API endpoint and parameters
    const url = 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search';
    const apiKey = 'Bearer dP92CHePjlcDz-ohDw-j69lpyxOZI3K8azTR037qWSHnP85OQO5y4cJktUQF_YIWZtyi6WxzY-gTS3ZbPiqNbNdktWKj5M4CSJUiJKJ733A5ke1PiASRG5uLyDgbZHYx';
    let select = {
        location: 'Long Beach', // Currently hardcoded to Long Beach. Eventually users can select area
        term: 'restaurants',
        foods: ['american', 'chinese', 'mexican', 'japanese', 'indian', 'italian', 'korean'],
        limit: 1, // How many results appear
        delivery: 'restaurants_delivery', // Select restaurants that offer delivery
    }

    fetch(`${url}?term=${select.term}&categories=${select.foods[2]}&location=${select.location}&attributes=${select.delivery}&limit=${select.limit}`, {
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
                    "\nCategories: " + JSON.stringify(business.categories) + // Displays categories of business
                    "\nImg URL: " + business.image_url + // Displays a featured image URL from the business
                    "\nAddress: " + JSON.stringify(business.location) + // Displays the address of a business
                    "\nYelp Link: " + business.url); // Displays the link to the yelp business
            });
        })
        .catch((error) => console.log(error));
}
$("#generateFood").click(function() {
    yelpApi();
});