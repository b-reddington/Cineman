
$("#generatePair").click(function (event) {
  console.log("scriptaccess")
  event.preventDefault
  $('#save-show').css('visibility', 'visible');
  $('h1').remove(); // Remove the H1 of "Results will be displayed here"
});

let movieTitle = localStorage.getItem("showTitle");
const titleString = JSON.stringify(movieTitle); // convert object to JSON string
const titleFormatted = titleString.replace(/\"/g, ""); // remove double quotes from JSON string
let restaurant = localStorage.getItem("restaurant");
const restaurantString = JSON.stringify(restaurant); // convert object to JSON string
const restaurantFormatted = restaurantString.replace(/\"/g, ""); // remove double quotes from JSON string
$(".savedData .movieName").prepend("<u>Movie Title</u><br>" + titleFormatted);
$(".card-content .restaurantName").prepend("<u>Restaurant</u><br>" + restaurantFormatted);

$("#save-show").click(function () {
  location.reload();
})

$("#removeSave").click(function () {
  localStorage.removeItem("showTitle");
  localStorage.removeItem("restaurant");
  $(".savedData .movieName").remove();
  $(".card-content .restaurantName").remove();
})
// Everything below this is used for the Results Modal
document.addEventListener('DOMContentLoaded', () => {
  // Functions to open and close a modal
  function openModal($el) {
    $el.classList.add('is-active');
  }

  function closeModal($el) {
    $el.classList.remove('is-active');
  }

  function closeAllModals() {
    (document.querySelectorAll('.modal') || []).forEach(($modal) => {
      closeModal($modal);
    });
  }

  // Add a click event on buttons to open a specific modal
  (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
    const modal = $trigger.dataset.target;
    const $target = document.getElementById(modal);

    $trigger.addEventListener('click', () => {
      openModal($target);
    });
  });

  // Add a click event on various child elements to close the parent modal
  (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
    const $target = $close.closest('.modal');

    $close.addEventListener('click', () => {
      closeModal($target);
    });
  });

  // Add a keyboard event to close all modals
  document.addEventListener('keydown', (event) => {
    const e = window.event;

    if (e.keyCode === 27) { // Escape key
      closeAllModals();
    }
  });
});