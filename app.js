const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`
const quant = 50
let index = 0,
	timerId

const generatePokemonPromises = (quant) => Array(quant).fill().map(() => {
	index++
	return fetch(getPokemonUrl(index)).then((res) => res.json())
})

const generateHTML = pokemons => pokemons.reduce((accumulator, { id, name, types, sprites }) => {
	const elementTypes = types.map(typeInfo => typeInfo.type.name)

	accumulator += `<li class="card ${elementTypes[0]}">
		<img class="card-image" alt="${name}" src="${sprites.front_default}"/>
		<h2 class="car-title">${id} - ${name}</h2>
		<p class="card-subtitle">${elementTypes.join(' | ')}</p>
	</li>`

	return accumulator;
}, '')

// fazer a geração da página de layout do pokemon escolhido
const generatePokemonLayout = pokemon => { }

const insertPokemonsIntoPage = pokemons => {
	const ul = document.querySelector('[data-js="pokedex"]')
	ul.innerHTML += pokemons
}

// fazer a inserção de dados na página de layout do pokemon escolhido
const insertPokemonIntoInfoPage = pokemon => { }

const fetchPokedex = () => {
	const pokemonPromises = generatePokemonPromises(quant)

	Promise.all(pokemonPromises)
		.then(generateHTML)
		.then(insertPokemonsIntoPage)
}
fetchPokedex()

const debounce = (func) => {
	if (timerId) return

	func()
	timerId = setTimeout(() => {
		timerId = undefined
	}, 2000);
}

window.onscroll = () => {
	// if (index >= 150) return console.log('asd');
	window.removeEventListener('scroll', this)

	const { clientHeight, scrollHeight, scrollTop } = document.documentElement
	let progresso = Math.abs((scrollTop / (clientHeight - scrollHeight)) * 100)
	console.log(progresso);


	if (progresso > 99) {
		debounce(fetchPokedex)
	}
}
