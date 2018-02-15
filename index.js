import reddit from './Redditapi';

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

// Form Event Listener
searchForm.addEventListener('submit', e => {
    //get search term
    const searchTerm = searchInput.value;
    //get sort 
    const sortBy = document.querySelector('input[name="sortby"]:checked').value;
    //get limit
    const searchLimit = document.getElementById('limit').value;
    //check input
    if (searchTerm == '') {
        //show message
        showMessage('Please add a search term', 'alert-danger');
    }

    //cear input
    searchInput.value = '';

    //search Reddit
    reddit.search(searchTerm, searchLimit, sortBy).then(results => {
            let output = '<div class="card-columns">';
            //loop through posts
            results.forEach(post => {
                //check for image
                const image = post.preview ? post.preview.images[0].source.url : 'https://marketingland.com/wp-content/ml-loads/2014/07/reddit-combo-1920-800x450.png';
                output += `
                <div class="card">
                <img class="card-img-top" src="${image}" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">${post.title}</h5>
                    <p class="card-text">${truncateText(post.selftext,100)}</p>
                    <a href="${post.url}" target="_blank" class="btn btn-primary">Read More</a>
                    <hr>
                    <span class="badge badge-secondary">Subreddit: ${post.subreddit}</span>
                    <span class="badge badge-dark">Score: ${post.score}</span>
                    </hr>
                </div>
                </div>
                `;
            });
            output += '</div>';
            document.getElementById('results').innerHTML = output;

        });


    e.preventDefault();
})

// SHow Message
function showMessage(message, className) {
    //create div
    const div = document.createElement('div');
    //add classes
    div.className = `alert ${className}`;
    // Add text
    div.appendChild(document.createTextNode(message));
    //get parent container
    const searchContainer = document.getElementById('search-container');
    //get search
    const Search = document.getElementById('search');

    //Insert message
    searchContainer.insertBefore(div, search);

    // Timout Alert
    setTimeout(() => document.querySelector('.alert').remove(), 3000);

}

//Truncate Text 
function truncateText(text, limit){
    const shortened = text.indexOf(' ', limit);
    if(shortened == -1) return text;
    return text.substring(0, shortened); 

};