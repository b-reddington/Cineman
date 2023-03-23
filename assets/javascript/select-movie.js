//html form elements -- vanilla javascript***
var possibleGenres = [];
var possiblePlatforms = [];

//variables
var options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '872e03d86emsh692dc8617ff8678p13f059jsn5c1a993e895f',
        'X-RapidAPI-Host': 'watchmode.p.rapidapi.com'
    }
}
var selectedMovieId;

//variables - parameters
var selectedType;
var selectedGenres = [];
var selectedPlatforms = [];


//function -- check if inputs are filled out

//function -- store selected type in a variable


//function -- store checked genres in an array --> .checked
//loop through possibleGenres, if .checked is true, then push the value into selectedGenres

//function -- store checked platforms in an array --> .checked
//loop through possiblePlatforms, if .checked is true, then push the value into selectedPlatforms


//fetch -- get a list of movies & store selected movie into variable
//function searchTitles() {
    //var typeParam;
    //var genreParam = if only one then selectedGenres[0] else selectedGenres.join('%2C');
    //var platformParam = if only one then selectedPlatforms[0] else selectedPlatforms.join('%2C');

    //var listTitlesurl = 'https://watchmode.p.rapidapi.com/list-titles/?types=' + typeParam + '&genres=' + genreParam + '&network_ids=' + platformParam + '&sort_by=relevance_desc';

    //fetch(listTitlesurl, options)
        // .then(function(response) {
        //     return response.json();
        // .then(function(data) {
            // console.log(data);
            // selectedMovieId = data[0].imdb_id;
        // })
        // })


//fetch -- get detailed information about a movie & render onto page
//var TitleDetailurl = 'https://watchmode.p.rapidapi.com/title/' + selectedMovieId + '/details/?language=EN';

// fetch(TitleDetailurl, options)
//     .then(function(resonse) {
//         return response.json();
//     })
//     .then(function(data) {
//         console.log(data);
        
//     })

//click event -- 'submit', render movie onto page