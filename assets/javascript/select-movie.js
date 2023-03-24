//html form elements -- jquery***
var possibleTypes = [$('#movie'), $('#tv-series')];
var possibleGenres = [$('#action'), $('#adventure'), $('#animation'), $('#anime'), $('#biography'), $('#comedy'), $('#crime'), $('#documentary'), $('#drama'), $('#family'), $('#fantasy'), $('#food'), $('#game-show'), $('#history'), $('#horror'), $('#kids'), $('#music'), $('#musical'), $('#mystery'), $('#nature'), $('#romance'), $('#sci-fi'), $('#soap'), $('#sports'), $('#thriller'), $('#travel'), $('#western')];
var possiblePlatforms = [$('#hbo-max'), $('#netflix'), $('#hulu'), $('#amazon-prime'), $('#disney-pl'), $('#apple-tv')];

var TypeRadioEl = $("input[name='select-type']");
var GenresCheckEl = $("input[name='genres']");
var PlatformsCheckEl = $("input[name='platform']");

//variables
var formComplete = false;
var options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '872e03d86emsh692dc8617ff8678p13f059jsn5c1a993e895f',
        'X-RapidAPI-Host': 'watchmode.p.rapidapi.com'
    }
};
var selectedMovieId;

var selectedTitle;
var selectedPoster;

//variables - parameters
var selectedType;
var selectedGenres;
var selectedPlatforms;


//function -- check if inputs are filled out
function checkInputs() {
    //if all of the form has inputs that are selected, then formComplete = true
    if (TypeRadioEl.is(':checked') && GenresCheckEl.is(':checked') && PlatformsCheckEl.is(':checked')) {
        formComplete = true;
    }
};

//function -- reset form
function resetSelections() {
    selectedType = undefined;
    selectedGenres = undefined;
    selectedPlatforms = undefined;

};

//function -- store selected type in a variable
function storeSelectedType() {
    for (i = 0; i < possibleTypes.length; i++) {
        if (possibleTypes[i].is(':checked')) { //change to jquery
            selectedType = possibleTypes[i].val();
        }
    };

    console.log(selectedType);
    return selectedType;
};

//function -- store checked genres in an array --> .checked
//loop through possibleGenres, if .checked is true, then push the value into selectedGenres
function storeSelectedGenres() {
    for (i = 0; i < possibleGenres.length; i++) { //issue
        if (possibleGenres[i].is(':checked')) { //change to jquery
            selectedGenres= possibleGenres[i].val();
        }
    };
    
    console.log(selectedGenres);
    return selectedGenres;
};

//function -- store checked platforms in an array --> .checked
//loop through possiblePlatforms, if .checked is true, then push the value into selectedPlatforms
function storeSelectedPlatforms() {
    for (i = 0; i < possiblePlatforms.length; i++) {
        if (possiblePlatforms.is(':checked')) { //this one doesn't work for some reason
                selectedPlatforms = possiblePlatforms[i].val();
            };
    };

    console.log(selectedPlatforms);
    return selectedPlatforms;
};

//fetch -- get a list of movies & store selected movie into variable
function searchTitles() {
    storeSelectedType();
    storeSelectedGenres();
    storeSelectedPlatforms();

    var listTitlesurl = 'https://watchmode.p.rapidapi.com/list-titles/?types=' + selectedType + '&genres=' + selectedGenres + '&source_ids=' + selectedPlatforms + '&limit=25&sort_by=relevance_desc';

    fetch(listTitlesurl, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            selectedMovieId = data[Math.floor(Math.random() * data.length)].imdb_id;
        });
    
    console.log(selectedMovieId);
    return selectedMovieId;
};

//fetch -- get detailed information about a movie & render onto page
function renderShow() {
    searchTitles()
    var TitleDetailurl = 'https://watchmode.p.rapidapi.com/title/' + selectedMovieId + '/details/?language=EN';

    fetch(TitleDetailurl, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            
            selectedTitle = data.title;
            selectedPoster = data.poster;

            //render onto divs
            $('.selected-title').text(selectedTitle);

            $('.card-image').find('img').attr('src', selectedPoster);

            $('.tv-rating').text(data.us_rating);
            $('.release-yr').text(data.year);
            $('.ratings').text(data.user_rating);
            $('.show-minutes').text(data.runtime_minutes);

            $('.show-summary').text(data.plot_overview);
        })
};

//click event -- 'submit', render movie onto page
$('#find-show').click(function(event) {
    event.preventDefault;

    checkInputs();
    
    if (formComplete === true) {
        renderShow();
    } else {
        //send a message saying that inputs must be selected;
        $('.movie-errormsg').text('You must make a selection!')

        setTimeout(function() {
            $('.movie-errormsg').text('');
        }, 2000)
    };

    renderShow();

    //reset inputs
    resetSelections();
});

//click event -- save show to local storage
$('#save-show').click(function(event) {
    event.preventDefault;

    localStorage.setItem('showTitle', selectedTitle);
    localStorage.setItem('showPoster', selectedPoster);

    var savedShow = {
        showTitle: selectedTitle,
        showPoster: selectedPoster
    };

    localStorage.setItem('show', JSON.stringify(savedShow));
});