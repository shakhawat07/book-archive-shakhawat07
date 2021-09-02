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
        const foundNoBook = document.getElementById('noBooks-found');
        foundNoBook.style.display = 'block';
        foundNoBook.innerHTML = `
        <h3 class="text-danger">Empty search box</h3>
        `;
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
// show not found in books description 
const notFoundResult = data => {
    if (data === undefined) {
        data = 'Not found';
        return data;
    }
    else {
        return data;
    }
}
// display books after searching
const displaySearchResult = (totalResults, books) => {
    // console.log(totalResults);
    // console.log(books.length);
    // console.log(books);

    // total results show 
    const totalResultDiv = document.getElementById('total-results');
    totalResultDiv.textContent = '';
    const h3 = document.createElement('h3');
    h3.innerHTML = `
    <h3 class="text-center text-danger mb-4">Showing results ${books.length} of ${totalResults}</h3>
    `;
    totalResultDiv.appendChild(h3);
    // no books found show 
    if (totalResults === 0) {
        const noBookFound = document.getElementById('noBooks-found');
        noBookFound.style.display = 'block';
        noBookFound.innerHTML = `
        <h3 class="text-danger">No books found</h3>
        `;
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

        const authorName = notFoundResult(book.author_name);
        const publisher = notFoundResult(book.publisher);
        const firstPublishYear = notFoundResult(book.first_publish_year);
        // book image show 
        let coverImageUrl = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
        if (book.cover_i === undefined) {
            coverImageUrl = `images/no image available.png`;
        }
        else {
            coverImageUrl = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
        }
        {/* <p class="card-text">${meal.strInstructions.slice(0, 200)}</p> */ }
        div.innerHTML = `
        <div class="card h-100 border border-secondary border-2 shadow-sm">        
            <div class="card-body">
                <img height="250px"  src="${coverImageUrl}" class="card-img-top" alt="..."></img>
                <h6 class="text-secondary fs-5 mt-3">${book.title}</h6>
                <p class="text-primary fw-bolder"><span class="text-primary fw-bold">by </span>${authorName}</p>
                <p><span class="fw-bolder">Publisher: </span>${publisher}</p>
                <p><span class="fw-bolder">First Publish Year: </span>${firstPublishYear}</p>
            </div>
        </div>
            `;
        searchResult.appendChild(div);
    });
}
