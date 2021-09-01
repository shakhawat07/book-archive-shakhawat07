// document.getElementById('total-results').style.display = 'none';
// book search 
const searchBook = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText);

    // clear data 
    // searchField.value = '';
    if (searchText == '') {
        // write something in a div 
    }
    else {
        // load data 
        const url = `http://openlibrary.org/search.json?q=${searchText}`;
        // console.log(url);
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.docs));
    }
}
// display books after searching
const displaySearchResult = books => {
    // console.log(books);
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';

    if (books.length == 0) {
        //show no result found
        // display in a div 
    }
    books.forEach(book => {
        console.log(book);
        // console.log(book.author_name);

        const div = document.createElement('div');
        div.classList.add('book');
        div.classList.add('col');

        if (typeof (book.author_name) === undefined) {
            const authorName = book.author_alternative_name;
        }
        else {
            const authorName = book.author_name;
        }
        {/* <img src="..." class="card-img-top" alt="..."></img> */ }
        {/* <p class="card-text">${meal.strInstructions.slice(0, 200)}</p> */ }
        div.innerHTML = `
        <div class="card h-100">
            
            <div class="card-body">
                <h5 class="card-title">Author Name: ${book.author_name}</h5>
                 <h5>Publisher: ${book.publisher}</h5>
                <h5>First Publish Year: ${book.first_publish_year}</h5>
            </div>
        </div>
            `;
        searchResult.appendChild(div);
    });
}
