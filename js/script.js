function showCards(movie) {
	return `<div class="col-md-4 my-3">
				<div class="card">
					<img src="${movie.Poster}" class="card-img-top">
					<div class="card-body">
					    <h5 class="card-title">${movie.Title}</h5>
					    <h6 class="card-subtitle mb-2 text-muted">${movie.Year}</h6>
					    <a href="#" class="btn btn-primary modal-detail-button" data-toggle="modal" data-target="#movieDetailModal" data-imdbid="${movie.imdbID}">Show Details</a>
					</div>
				</div>
			</div>`;
}

function showMovieDetail(movie) {
	return `<div class="container-fluid">
	        	<div class="row">
	        		<div class="col-md-3">
	        			<img src="${movie.Poster}" class="img-fluid">
	        		</div>
	        		<div class="col-md">
	        			<ul class="list-group">
						  <li class="list-group-item"><h4>${movie.Title} (${movie.Year})</h4></li>
						  <li class="list-group-item"><strong>Director : </strong>${movie.Director}</li>
						  <li class="list-group-item"><strong>Actors : </strong>${movie.Actors}</li>
						  <li class="list-group-item"><strong>Writer : </strong>${movie.Writer}</li>
						  <li class="list-group-item"><strong>Plot : </strong><br>${movie.Plot}</li>
						</ul>
	        		</div>
	        	</div>
	        </div>`;
}

function getMovies(keyword) {
	return fetch('http://www.omdbapi.com/?apikey=fa7ef84d&s=' + keyword)
	 .then(response => response.json())
	 .then(response => response.Search);
}

function updateUI(movies) {
	let cards = '';
	movies.forEach(movie => cards += showCards(movie));
	const movieContainer = document.querySelector('.movie-container');
	movieContainer.innerHTML = cards;
}

function getMovieDetail(imdbid) {
	return fetch('http://www.omdbapi.com/?apikey=fa7ef84d&i=' + imdbid)
	 .then(response => response.json())
	 .then(movie => movie);
}

function updateUIDetail(movie) {
	const movieDetail = showMovieDetail(movie);
 	const modalBody = document.querySelector('.modal-body');
 	modalBody.innerHTML = movieDetail;
}

const searchButton = document.querySelector('.search-button');
searchButton.addEventListener('click', async function() {
	const inputKeyword = document.querySelector('.input-keyword');
	const movies = await getMovies(inputKeyword.value);
	updateUI(movies);
});

document.addEventListener('click', async function(e) {
	if (e.target.classList.contains('modal-detail-button')) {
		const imdbid = e.target.dataset.imdbid;
		const movieDetail = await getMovieDetail(imdbid);
		updateUIDetail(movieDetail);
	}
})
