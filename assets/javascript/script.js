function yelpApi() {
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer dP92CHePjlcDz-ohDw-j69lpyxOZI3K8azTR037qWSHnP85OQO5y4cJktUQF_YIWZtyi6WxzY-gTS3ZbPiqNbNdktWKj5M4CSJUiJKJ733A5ke1PiASRG5uLyDgbZHYx'
  }
};

//Cors link used to bypass cors-error! do not remove
fetch('https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/categories/restaurants', options) 
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
}
