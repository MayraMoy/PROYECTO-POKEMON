const URL = "https://pokeapi.co/api/v2/pokemon/";

const searchInput = document.getElementById("search");
const pokedexContainer = document.getElementById("pokedex");

async function searchPokemon() {
    const searchPokemon = searchInput.value.trim().toLowerCase();

    if (!searchPokemon) {
        pokedexContainer.innerHTML = "<p>Please enter a Pokémon name or ID.</p>";
        return;
    }

    try {
        const response = await fetch(URL + searchPokemon);
        
        if (!response.ok) {
            throw new Error("Pokémon not found");
        }

        const data = await response.json();

        pokedexContainer.innerHTML = 
        `
            <h2>${data.name.toUpperCase()}</h2>
            <img src="${data.sprites.front_default}" alt="${data.name}">
            <p>Number: ${data.id}</p>
            <p>Height: ${data.height / 10}m</p>
            <p>Weight: ${data.weight / 10}kg</p>
        `;
    } catch (error) {
        pokedexContainer.innerHTML = "<p>Pokémon not found. Please try again.</p>";
        console.error(error);
    }
}

document.getElementById("btn-search").addEventListener("click", searchPokemon);

