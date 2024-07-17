const apikey = '48aa722f'

const dropdownInput = document.getElementById("dropdownlist");
moviescontainer.innerHTML = 'List is Empty/Loading'; // clears previous html

dropdownInput.addEventListener("change", async e => {

    moviescontainer.innerHTML = 'List is Empty/Loading'; // clears previous html

    const res = await fetch('/listdata', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    console.log('flag2');
    console.log(res);
    const data = await res.json();
    console.log(data);
    moviescontainer.innerHTML = ''; // clears previous html


    switch (dropdownInput.value){
        case 'Movies/TV':

            for(id of data[0]){
                const omdb_url = `https://www.omdbapi.com/?i=${id}&plot=full&apikey=${apikey}`
                const omdb_res = await fetch(omdb_url);
                const omdb_data = await omdb_res.json();
                console.log(omdb_data);

                moviescontainer.innerHTML += 
                /*`<h2>${title}</h2>
                <h3>${type}</h3>
                <h3>${year}</h3>*/
                `<div class="moviecontainer">
                <div class="title">${omdb_data.Title}</div>
                <i class='bx bx-bookmark' onClick="removeFromList('${id}',0)" style="cursor: pointer;"></i>
                <a href="https://www.imdb.com/title/${omdb_data.imdbID}" target="_blank" rel="noopener noreferrer""><img src=${omdb_data.Poster} alt="Favourites Poster"></a>            
                </div>
                `
            }

            break;
        case 'Books':

            for(id of data[1]){
                const hapi_url = 'https://hapi-books.p.rapidapi.com/book/138398';
                const options = {
                    method: 'GET',
                    headers: {
                        'x-rapidapi-key': '76274be780msh95ae5ce951b0774p1b9681jsn63c92585531c',
                        'x-rapidapi-host': 'hapi-books.p.rapidapi.com'
                    }
                };                
                const open_res = await fetch(hapi_url,options);
                const hapi_data = await hapi_res.json();
                console.log(hapi_data);

                moviescontainer.innerHTML += 
                /*`<h2>${title}</h2>
                <h3>${type}</h3>
                <h3>${year}</h3>*/
                `<div class="moviecontainer">
                    <div class="title">${hapi_data.name}</div>
                    <i class='bx bx-bookmark' onClick="removeFromList(${id},1)" style="cursor: pointer;"></i>
                    <a href="${hapi_data.url}"> <img src="${hapi_data.cover}"></a>            
                </div>
                `
            }

            showItems(1);
            break;
        case 'Anime':

        for(id of data[2]){
            const mal_url = `https://myanimelist.p.rapidapi.com/anime/${id}`;
            const options = {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': '76274be780msh95ae5ce951b0774p1b9681jsn63c92585531c',
                    'x-rapidapi-host': 'myanimelist.p.rapidapi.com'
                }
            };
            const mal_res = await fetch(mal_url, options);
            const mal_data = await mal_res.json();
            console.log(mal_data);

            moviescontainer.innerHTML += 
            /*`<h2>${title}</h2>
            <h3>${type}</h3>
            <h3>${year}</h3>*/
            `<div class="moviecontainer">
                <div class="title">${mal_data.title_ov}</div>
                <i class='bx bx-bookmark' onClick="removeFromList('${id}', 2)" style="cursor: pointer;"></i>
                <img src=${mal_data.picture_url}>
                <a href=${mal_data.myanimelist_url} <img src=${mal_data.picture_url}></a>         
            </div>
            `
        }
            showItems(2);
            break;
        case 'Manga':
            for(id of data[3]){
                const mml_url = `https://myanimelist.p.rapidapi.com/manga/${id}`;
                const options = {
                    method: 'GET',
                    headers: {
                        'x-rapidapi-key': '76274be780msh95ae5ce951b0774p1b9681jsn63c92585531c',
                        'x-rapidapi-host': 'myanimelist.p.rapidapi.com'
                    }
                };

                const mml_res = await fetch(mml_url, options);
                const mml_data = await mml_res.json();
                console.log(mml_data);

                moviescontainer.innerHTML += 
                /*`<h2>${title}</h2>
                <h3>${type}</h3>
                <h3>${year}</h3>*/
                `<div class="moviecontainer">
                    <div class="title">${mml_data.title_ov}</div>
                    <i class='bx bx-bookmark' onClick="removeFromList('${id}',3)" style="cursor: pointer;"></i>
                    <img src=${mml_data.picture_url}>
                    <a href=${mml_data.myanimelist_url} <img src=${mml_data.picture_url}></a>         
                </div>
                `
            }
            showItems(3);
            break;
        case 'Games':
            showItems(4);
            break;
    }
});

async function showItems(mediumtype) {

}

async function removeFromList(id, mediumtype){

    alert('Removed from list');


    switch(mediumtype) {
    case 0: //imdb
                    const res0 = await fetch('/removelist', {
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
                const res1 = await fetch('/removelist', {
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
                const res2 = await fetch('/removelist', {
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
                const res3 = await fetch('/removelist', {
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

        alert('Removed from list');
}
