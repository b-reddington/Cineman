function yelpApi() {
    // Set the API endpoint and parameters
    // Request demo access here to bypass cors error https://cors-anywhere.herokuapp.com/corsdemo
    const url = 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search';
    const apiKey = 'Bearer dP92CHePjlcDz-ohDw-j69lpyxOZI3K8azTR037qWSHnP85OQO5y4cJktUQF_YIWZtyi6WxzY-gTS3ZbPiqNbNdktWKj5M4CSJUiJKJ733A5ke1PiASRG5uLyDgbZHYx';
    let select = {
        location: 'Long Beach', // Currently hardcoded to Long Beach. Eventually users can select area
        term: 'restaurants', // Specifies to the search that you want restaurants
        foods: ['american', 'chinese', 'mexican', 'japanese', 'indian', 'italian', 'korean'],
        limit: 5, // How many results appear
        delivery: 'restaurants_delivery', // Select restaurants that offer delivery
    }

    fetch(`${url}?term=${select.term}&categories=${select.foods}&location=${select.location}&attributes=${select.delivery}&limit=${select.limit}`, {
        headers: {
            Authorization: apiKey,
        },
    })
        .then((response) => response.json())
        .then((data) => {
            // Print the names of the businesses that were retrieved
            data.businesses.forEach((business) => {
                console.log(business.name);
            });
        })
        .catch((error) => console.log(error));
}

yelpApi()