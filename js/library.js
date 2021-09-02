// hiding noBooks-found div 
document.getElementById('noBooks-found').style.display = 'none';
// book search 
const searchBook = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText);

    // clear search field text 
    searchField.value = '';
    // search box empty checking 
    if (searchText === '') {
        const foundNoBook = document.getElementById('noBooks-found');
        foundNoBook.style.display = 'block';
        foundNoBook.innerHTML = `
        <h3 class="mb-4 py-3 text-center text-danger bg-white bg-opacity-25 fw-bold border border-2">Empty Search Box</h3>
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
// show not found in books details 
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
    // console.log(books);

    // total results show 
    const totalResultDiv = document.getElementById('total-results');
    totalResultDiv.textContent = '';
    const h3 = document.createElement('h3');
    h3.innerHTML = `
    <h3 class="mb-4 py-3 text-center text-white fw-light fs-4">Showing ${books.length} results of ${totalResults}</h3>
    `;
    totalResultDiv.appendChild(h3);
    // no books found display 
    if (totalResults === 0) {
        const noBookFound = document.getElementById('noBooks-found');
        noBookFound.style.display = 'block';
        noBookFound.innerHTML = `
        <h3 class="mb-4 py-3 text-center text-danger bg-white bg-opacity-25 fw-bold border border-2">No books found</h3>
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
        // console.log(book);
        const div = document.createElement('div');
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
        div.innerHTML = `
        <div class="card h-100 border border-light shadow-lg">        
            <div class="card-body">
                <img height="330px"  src="${coverImageUrl}" class="card-img-top" alt="..."></img>
                <h6 class="text-dark fw-bold fs-5 mt-3">${book.title}</h6>
                <p class="fw-bold">by <span class="text-primary">${authorName}</span></p>
                <p><span class="fw-bolder">Publisher: </span>${publisher}</p>
                <p><span class="fw-bolder">First Publish Year: </span>${firstPublishYear}</p>
            </div>
        </div>
            `;
        searchResult.appendChild(div);
    });
}
