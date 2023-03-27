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
		'X-RapidAPI-Key': '39755327ccmsh47fb34c6b77b4c4p1156dcjsn89b7a5a0e3d0',
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


// //function -- check if inputs are filled out
// function checkInputs() {
//     //if all of the form has inputs that are selected, then formComplete = true
//     if (TypeRadioEl.is(':checked') && GenresCheckEl.is(':checked') && PlatformsCheckEl.is(':checked')) {
//         formComplete = true;
//     }
// };

//function -- reset results
function resetResults() {
    $('#invalid-msg').css('display', 'none');
    $('#movie-results').css('display', 'none');
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
        if (possiblePlatforms[i].is(':checked')) { //this one doesn't work for some reason
                selectedPlatforms = possiblePlatforms[i].val();
            };
    };

    console.log(selectedPlatforms);
    return selectedPlatforms;
};

//fetch -- get a list of movies & store selected movie into variable
function searchTitles() {
    var selectedType = storeSelectedType();
    var selectedGenres = storeSelectedGenres();
    var selectedPlatforms = storeSelectedPlatforms();


    var listTitlesurl = 'https://watchmode.p.rapidapi.com/list-titles/?types=' + selectedType + '&genres=' + selectedGenres + '&source_ids=' + selectedPlatforms + '&limit=25&sort_by=relevance_desc';


    fetch(listTitlesurl, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);

            if (data.titles.length === 0) {
                $('#invalid-msg').css('display', 'block');
            } else {
                $('#movie-results').css('display', 'block');
                selectedMovieId = data.titles[Math.floor(Math.random() * data.titles.length)].imdb_id;
                console.log(selectedMovieId);
                renderShow();
            }
        });
    
    return selectedMovieId;
};

//fetch -- get detailed information about a movie & render onto page
function renderShow() {
    var TitleDetailurl = 'https://watchmode.p.rapidapi.com/title/' + selectedMovieId + '/details/?language=EN';
    console.log(selectedMovieId);

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

            if (selectedPoster === "") {
                $('#show-poster').css('display', 'none');
            } else {
                $('#show-poster').attr('src', selectedPoster);
            };

            if (data.us_rating === null) {
                $('.rated').css('display', 'none');
            } else {
                $('.tv-rating').text(data.us_rating);
            };

            if (data.year === "") {
                $('.release-yr').css('display', 'none');
            } else {
                $('.release-yr').text(data.year);
            };

            if (data.user_rating === "") {
                $('.ratings').css('display', 'none');
            } else {
                $('.ratings').text(data.user_rating);
            };

            if (data.runtime_minutes === null) {
                $('.runtime').css('display', 'none');
            } else {
                $('.show-minutes').text(data.runtime_minutes);
            };
        })
};

//click event -- 'submit', render movie onto page
$('#generatePair').click(function(event) {
    event.preventDefault;

    resetResults();

    setTimeout(function() {
        searchTitles();
    }, 3000);
});
$('#generateMovie').click(function(event) {
    event.preventDefault;
    console.log("movieregen")
    resetResults();

    setTimeout(function() {
        searchTitles();
    }, 60);
});
//click event -- uncheck options
$('#uncheck').click(function(event) {
    event.preventDefault;

    $('input[type=radio]').prop('checked', false);
});

//click event -- save show to local storage
$('#save-show').click(function(event) {
    event.preventDefault;
    console.log('testingmovie');
    localStorage.setItem('showTitle', selectedTitle);
    localStorage.setItem('showPoster', selectedPoster);

    var savedShow = {
        showTitle: selectedTitle,
        showPoster: selectedPoster
    };

    localStorage.setItem('show', JSON.stringify(savedShow));
});