
const cacheByUrl = {}

export function searchByTitle(title) {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=c582a638ad7c6555e68892f076404dae&language=en-US&page=1&include_adult=false&query=${title}`
    if (cacheByUrl[url]) {
        return Promise.resolve(cacheByUrl[url])
    }

    return fetch(url).then(res => {
        if (!res.ok) {
            return Promise.reject(res.statusText);
        }
        return res.json();
    }).then(data => data.results.map(movie => ({
        title: movie.title,
        id: movie.id,
        poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    })))
        //cache results in browser memory
        .then(res => { cacheByUrl[url] = res; return res });
}



// Find Movie by ID
export function searchById(id) {
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=c582a638ad7c6555e68892f076404dae&language=en-US`
    return fetch(url).then(res => {
        if (!res.ok) {
            return Promise.reject(res.statusText);
        }
        return res.json();
    })
        .then(movie => ({
            title: movie.title,
            id: movie.id,
            poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        }))
        .then(res => { cacheByUrl[url] = res; return res });
}



// Find similar movies from initial movie ID
export function getSimilar(id) {
    return fetch(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=c582a638ad7c6555e68892f076404dae&language=en-US&page=1`).then(res => {
        if (!res.ok) {
            return Promise.reject(res.statusText);
        }
        return res.json();
    }).then(data => data.results.map(movie => ({
        title: movie.title,
        id: movie.id,
        poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    })));
}

