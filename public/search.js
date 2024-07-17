//const apikey = '5972f2c1';
const apikey = '48aa722f'

var searchButton = document.getElementById('searchbutton');
var searchInput = document.getElementById('searchbox');
var dropdownInput = document.getElementById('dropdown');


const mediumtype = {imdb: 0, openlibrary: 1, myanimelist: 2};

searchInput.addEventListener('submit', async (event) => {
    event.preventDefault();
    switch (dropdownInput.value){
        case 'Movies/TV':
            findItems(0);
            break;
        case 'Books':
            findItems(1);
            break;
        case 'Anime':
            findItems(2);
            break;
        case 'Manga':
            findItems(3);
            break;
        case 'Games':
            findItems(4);
            break;
    }

});


searchButton.addEventListener("click", async (event) => {
    event.preventDefault();
    switch (dropdownInput.value){
        case 'Movies/TV':
            findItems(0);
            break;
        case 'Books':
            findItems(1);
            break;
        case 'Anime':
            findItems(2);
            break;
        case 'Manga':
            findItems(3);
            break;
        case 'Games':
            findItems(4);
            break;
    }

});

async function findItems(mediumtype){
    let input = searchInput.value.trim();

    switch (mediumtype){
        case 0: //imdb
            const url0 = `https://www.omdbapi.com/?s=${input}&page=1&apikey=${apikey}`;
            const res0 = await fetch(url0);
            const data0 = await res0.json();
            console.log(res0);
            console.log(data0);
            showItems(data0, 0);
            break;
        case 1: //hapi-books

        const url1 = `https://hapi-books.p.rapidapi.com/search/${input}`;
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '76274be780msh95ae5ce951b0774p1b9681jsn63c92585531c',
                'x-rapidapi-host': 'hapi-books.p.rapidapi.com'
            }
        };

            const res1 = await fetch(url1, options);
            const data1 = await res1.json();
            console.log(res1);
            console.log(data1);
            showItems(data1, 1);
            break;
        case 2: //myanimelist
            const url2 = `https://myanimelist.p.rapidapi.com/v2/anime/search?q=${input}&n=20&score=0`;
            const options2 = {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': '76274be780msh95ae5ce951b0774p1b9681jsn63c92585531c',
                    'x-rapidapi-host': 'myanimelist.p.rapidapi.com'
                }
            };
        
            const res2 = await fetch(url2, options2);
            const data2 = await res2.json();
            console.log(res2);
            console.log(data2);
            showItems(data2, 2);
            break;
        case 3:
            const url3 = `https://myanimelist.p.rapidapi.com/v2/manga/search?q=${input}&n=20&score=0`;
            const options3 = {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': '76274be780msh95ae5ce951b0774p1b9681jsn63c92585531c',
                    'x-rapidapi-host': 'myanimelist.p.rapidapi.com'
                }
            };
        
            const res3 = await fetch(url3, options3);
            const data3 = await res3.json();
            console.log(res3);
            console.log(data3);
            showItems(data3, 3);
            break;
    }
}

async function showItems(data, mediumtype){
    const moviescontainer = document.getElementById("moviescontainer");
    moviescontainer.innerHTML = ''; // clears previous html
    switch(mediumtype){ //different method for each api
        case 0: //imdb
            if(!data){
                moviescontainer.innerHTML = '<p>No results found</p>';
            }
            else {
                for (i of data.Search){  // .Search gives array of 10 items
                    var img = "https://static.vecteezy.com/system/resources/thumbnails/007/104/553/small/search-no-result-not-found-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-vector.jpg";
                    if(i.Poster != 'N/A'){
                        img = i.Poster;
                    }
                    const title = i.Title;
                    const type = i.Type;
                    const year = i.Year;
                    const imdbID = i.imdbID;
        
                    moviescontainer.innerHTML += 
                    /*`<h2>${title}</h2>
                    <h3>${type}</h3>
                    <h3>${year}</h3>*/
                    `<div class="moviecontainer">
                        <div class="title">${i.Title}</div>
                        <i class='bx bx-bookmark' onClick="addToList('${i.imdbID}',0)" style="cursor: pointer;"></i>
                        <a href="https://www.imdb.com/title/${imdbID}" target="_blank" rel="noopener noreferrer""><img src=${img} alt="Favourites Poster"></a>            
                    </div>
                    `
                }
            }

            break;
        case 1: //hapi-books
                let cap = 20;
                if(!data){
                    moviescontainer.innerHTML = '<p>No results found</p>';
                }
                console.log(data);
                for(let i of data){
                        console.log(i.name);
                        moviescontainer.innerHTML +=
            
                        //<h2>${data.docs[i].title}</h2>
                        `<div class="moviecontainer">
                            <div class="title">${i.name}</div>
                            <i class='bx bx-bookmark' onClick="addToList('${i.book_id}', 1)" style="cursor: pointer;"></i>
                            <img src="${i.cover}">
                            <a href="${i.url}"> <img src="${i.cover}"></a>
                        </div>
                        `
                    
                }
            break;
        case 2: //myanimelist
                for(i of data){
                    console.log(i.title);
                    moviescontainer.innerHTML +=
        
                    //<h2>${data.docs[i].title}</h2>
                    `<div class="moviecontainer">
                        <div class="title">${i.title}</div>
                        <i class='bx bx-bookmark' onClick="addToList('${i.myanimelist_id}', 2)" style="cursor: pointer;"></i>
                        <img src=${i.picture_url}>
                        <a href=${i.myanimelist_url} <img src=${i.picture_url}></a>
                    </div>
                    `
                }
            break;
        case 3: //mymangalist
            for(i of data){
                console.log(i.title);
                moviescontainer.innerHTML +=

                //<h2>${data.docs[i].title}</h2>
                `<div class="moviecontainer">
                    <div class="title">${i.title}</div>
                    <i class='bx bx-bookmark' onClick="addToList('${i.myanimelist_id}', 3)" style="cursor: pointer;"></i>
                    <img src=${i.picture_url}>
                    <a href=${i.myanimelist_url} <img src=${i.picture_url}></a>
                </div>
                `
            }

    }
    
}

async function addToList(id, mediumtype){
    console.log("flag");

    switch (mediumtype){
        case 0: //imdb
                const res0 = await fetch('/list', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({movietv: id})
                });
                console.log('flag2');
                console.log(res0);
                const data0 = await res0.json();
                console.log(data0);
            break;
        case 1:
            const res1 = await fetch('/list', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({books: id})
            });
            console.log('flag2');
            console.log(res1);
            const data1 = await res1.json();
            console.log(data1);
            break;
        case 2:
            const res2 = await fetch('/list', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({anime: id})
            });
            console.log('flag2');
            console.log(res2);
            const data2 = await res2.json();
            console.log(data2);
            break;
        case 3:
            const res3 = await fetch('/list', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({manga: id})
            });
            console.log('flag2');
            console.log(res3);
            const data3 = await res3.json();
            console.log(data3);
            break;
    }
}