// hiding no books found div 
document.getElementById('noBooks-found').style.display = 'none';
// book search 
const searchBook = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText);

    // clear search field data 
    searchField.value = '';
    if (searchText == '') {
        document.getElementById('noBooks-found').style.display = 'block';
        // clear field 
        const totalResultDiv = document.getElementById('total-results');
        const searchResultDiv = document.getElementById('search-result');
        totalResultDiv.textContent = '';
        searchResultDiv.textContent = '';

    }
    else {
        document.getElementById('noBooks-found').style.display = 'none';

        // load data 
        const url = `https://openlibrary.org/search.json?q=${searchText}`;
        // console.log(url);
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.numFound, data.docs));
    }
}
// display books after searching
const displaySearchResult = (totalResults, books) => {
    console.log(totalResults);
    console.log(books);

    // total results show 
    const totalResultDiv = document.getElementById('total-results');
    totalResultDiv.textContent = '';
    const h3 = document.createElement('h3');
    h3.innerHTML = `
    <h3>Total Results of books: ${totalResults}</h3>
    `;
    totalResultDiv.appendChild(h3);
    // no books found show 
    if (totalResults === 0) {
        document.getElementById('noBooks-found').style.display = 'block';
    }
    else {
        document.getElementById('noBooks-found').style.display = 'none';
    }
    // search books 
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';

    // book show result 
    books.forEach(book => {
        console.log(book);
        // console.log(book.author_name);
        // console.log(book.cover_i);
        // const firstAuthorName = book.author_name[0];
        // console.log(firstAuthorName);
        const div = document.createElement('div');
        div.classList.add('book');
        div.classList.add('col');

        if (typeof (book.author_name) === undefined) {
            const authorName = book.author_alternative_name;
        }
        else {
            const authorName = book.author_name;
        }
        coverImageUrl = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;

        {/* <p class="card-text">${meal.strInstructions.slice(0, 200)}</p> */ }
        div.innerHTML = `
        <div class="card h-100">
            
            <div class="card-body">
                <img height="350px"  src="${coverImageUrl}" class="card-img-top" alt="..."></img>
                <h5 class="card-title mt-5">Book Name: ${book.title}</p></h5>
                <h5>Author Name: ${book.author_name}</p></h5>
                <h5>Publisher: ${book.publisher}</h5>
                <h5>First Publish Year: ${book.first_publish_year}</h5>
            </div>
        </div>
            `;
        searchResult.appendChild(div);
    });
}
