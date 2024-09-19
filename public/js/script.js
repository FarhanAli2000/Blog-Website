document.addEventListener('DOMContentLoaded', function() {

    const allButtons = document.querySelectorAll('.searchBtn');
    const searchBar = document.querySelector('.searchBar'); // Ensure it's correctly selected
    const searchInput = document.getElementById('searchInput');
    const searchClose = document.getElementById('searchClose');

    // Debugging: Check if elements are selected correctly
    console.log(searchBar, searchInput, searchClose);

    // Adding event listener for all search buttons
    allButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            searchBar.style.visibility = 'visible';
            searchBar.classList.add('open');
            this.setAttribute('aria-expanded', 'true');
            searchInput.focus();
        });
    });

    // Adding event listener for closing the search bar
    searchClose.addEventListener('click', function() {
        searchBar.classList.remove('open');
        searchBar.style.visibility = 'hidden';
    });

});
