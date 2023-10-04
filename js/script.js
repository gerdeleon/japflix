let peliculas = [];

function cargarPeliculas() {
  fetch('https://japceibal.github.io/japflix_api/movies-data.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      peliculas = data;
    })
    .catch(error => console.error('Error al cargar las películas:', error));
}
function mostrarInfoPelicula(pelicula) {
  const contenedorInfo = document.getElementById('contenedorInfo');
  contenedorInfo.innerHTML = '';

  const titulo = document.createElement('h3');
  titulo.textContent = 'Título: ' + pelicula.title;

  const overview = document.createElement('p');
  overview.textContent = 'Descripción: ' + pelicula.overview;

  const genres = document.createElement('p');
  const genresList = pelicula.genres.map(genre => genre.name).join(', ');
  genres.textContent = 'Géneros: ' + genresList;

  // Crear el dropdown
  const dropdown = document.createElement('div');
  dropdown.classList.add('dropdown');

  const dropdownToggle = document.createElement('button');
  dropdownToggle.classList.add('btn', 'btn-secondary', 'dropdown-toggle');
  dropdownToggle.setAttribute('type', 'button');
  dropdownToggle.setAttribute('id', 'dropdownMenuButton');
  dropdownToggle.setAttribute('data-toggle', 'dropdown');
  dropdownToggle.setAttribute('aria-haspopup', 'true');
  dropdownToggle.setAttribute('aria-expanded', 'false');
  dropdownToggle.textContent = 'Ver más';
  dropdown.appendChild(dropdownToggle);

  const dropdownMenu = document.createElement('div');
  dropdownMenu.classList.add('dropdown-menu');
  dropdownMenu.setAttribute('aria-labelledby', 'dropdownMenuButton');

  const dropdownItems = [
    `Año: ${pelicula.release_date}`,
    `Duración: ${pelicula.runtime} min`,
    `Presupuesto: $${pelicula.budget}`,
    `Ganancias: $${pelicula.revenue}`
  ];

  dropdownItems.forEach(itemText => {
    const dropdownItem = document.createElement('a');
    dropdownItem.classList.add('dropdown-item');
    dropdownItem.textContent = itemText;
    dropdownMenu.appendChild(dropdownItem);
  });

  dropdown.appendChild(dropdownMenu);

  contenedorInfo.appendChild(titulo);
  contenedorInfo.appendChild(overview);
  contenedorInfo.appendChild(genres);
  contenedorInfo.appendChild(dropdown);
  contenedorInfo.classList.add('mostrar');
}
function aplicarFiltro() {
    const filtro = document.getElementById('filtro').value;
    const valorFiltro = document.getElementById('valorFiltro').value;
  
    let resultados;
  
    switch (filtro) {
      case 'ano':
        resultados = peliculas.filter(pelicula => pelicula.release_date.startsWith(valorFiltro));
        break;
      case 'duracion':
        resultados = peliculas.filter(pelicula => pelicula.runtime.toString().startsWith(valorFiltro));
        break;
      case 'presupuesto':
        resultados = peliculas.filter(pelicula => pelicula.budget.toString().startsWith(valorFiltro));
        break;
      case 'ganancias':
        resultados = peliculas.filter(pelicula => pelicula.revenue.toString().startsWith(valorFiltro));
        break;
      default:
        resultados = peliculas;
    }
  
    mostrarResultados(resultados);
  }

function buscarPeliculas() {
  const searchTerm = document.getElementById('inputBuscar').value.toLowerCase().trim();

  const resultados = peliculas.filter(pelicula => {
    return (
      pelicula.title.toLowerCase().includes(searchTerm) ||
      pelicula.genres.some(genre => genre.name.toLowerCase().includes(searchTerm)) ||
      pelicula.tagline.toLowerCase().includes(searchTerm) ||
      pelicula.overview.toLowerCase().includes(searchTerm)
    );
  });

  mostrarResultados(resultados);
}

function mostrarResultados(resultados) {
  const lista = document.getElementById('lista');
  lista.innerHTML = '';

  resultados.forEach(pelicula => {
    const peliculaItem = document.createElement('li');
    peliculaItem.classList.add('list-group-item');

    const titulo = document.createElement('h3');
    titulo.textContent = pelicula.title;

    const tagline = document.createElement('p');
    tagline.textContent = 'Tagline: ' + pelicula.tagline;

    const voteAverage = pelicula.vote_average / 2;  
    const voteAverageFormatted = '★'.repeat(Math.round(voteAverage)) + '☆'.repeat(Math.floor(5 - voteAverage));
    const voteAverageElement = document.createElement('p');
    voteAverageElement.textContent = 'Votación: ' + voteAverageFormatted;

    peliculaItem.appendChild(titulo);
    peliculaItem.appendChild(tagline);
    peliculaItem.appendChild(voteAverageElement);

    peliculaItem.addEventListener('click', () => {
      mostrarInfoPelicula(pelicula);
    });

    lista.appendChild(peliculaItem);
  });
}

window.onload = function () {
  cargarPeliculas();

  const contenedorInfo = document.getElementById('contenedorInfo');
  contenedorInfo.addEventListener('click', () => {
    contenedorInfo.classList.remove('mostrar');
  });

  const btnBuscar = document.getElementById('btnBuscar');
  btnBuscar.addEventListener('click', buscarPeliculas);

  const btnAplicarFiltro = document.getElementById('aplicarFiltro');
  btnAplicarFiltro.addEventListener('click', aplicarFiltro);
};

