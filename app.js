const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`
let quant = 10
let index = 0

const generatePokemonPromises = () => Array(quant).fill().map((_, index) =>
	fetch(getPokemonUrl(index + 1)).then((res) => res.json()))

const generateHTML = pokemons => pokemons.reduce((accumulator, { id, name, types, sprites }) => {
	const elementTypes = types.map(typeInfo => typeInfo.type.name)

	accumulator += `<li class="card ${elementTypes[0]}">
		<img class="card-image" alt="${name}" src="${sprites.front_default}"/>
		<h2 class="car-title">${id}, ${name}</h2>
		<p class="card-subtitle">${elementTypes.join(' | ')}</p>
	</li>`

	return accumulator;
}, '')

const insertPokemonsIntoPage = pokemons => {
	const ul = document.querySelector('[data-js="pokedex"]')
	ul.innerHTML += pokemons
}

const fetchPokedex = () => {
	const pokemonPromises = generatePokemonPromises()

	Promise.all(pokemonPromises)
		.then(generateHTML)
		.then(insertPokemonsIntoPage)

	quant += quant
	index += quant
}
fetchPokedex()
fetchPokedex()
