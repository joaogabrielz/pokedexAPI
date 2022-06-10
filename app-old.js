const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

const fetchPokemon = () => {
    const pokemonPromises = []

    for(let i=1; i <= 150; i++){
        //Fetch - Versao moderna requisicao AJAX - Asyncronous Javascript And XML 
        pokemonPromises.push(fetch(getPokemonUrl(i)).then(response => response.json()))      
    }
    //metodo statico do promise - All (metodo que nao obriga usar o New, assim pode encadear no construtor)
    Promise.all(pokemonPromises)
    .then(pokemons => {

        const lisPokemons = pokemons.reduce((accumulator, pokemon) => {
            const types = pokemon.types.map(typeInfo => typeInfo.type.name)

            accumulator += `
             <li class="card ${types[0]}">
             <img class="card-image" alt="${pokemon.name}" src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png"/>
                <h2 class="card-title">${pokemon.id}. ${pokemon.name}</h2>
                <p class="card-subtitle">${types.join(" | ")}</p>
             </li>`
            return accumulator;
        }, '') //reduzir o array em string que é o template html

        const ul = document.querySelector('[data-js="pokedex"]')

        ul.innerHTML = lisPokemons;
    })
}
fetchPokemon();