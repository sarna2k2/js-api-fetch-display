const searchBtn = document.getElementById("searchBtn");
const resultDiv = document.getElementById("result");

searchBtn.addEventListener("click", fetchPokemon);

function fetchPokemon() {
    const name = document.getElementById("pokemonName").value.toLowerCase();

    if (name === "") {
        alert("Please enter a Pokémon name!");
        return;
    }

    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Pokémon not found");
            }
            return response.json();
        })
        .then(data => displayPokemon(data))
        .catch(err => {
            resultDiv.innerHTML = `<p class='error'>${err.message}</p>`;
            resultDiv.classList.remove("hidden");
        });
}

function displayPokemon(data) {
    resultDiv.classList.remove("hidden");

    const pokemonHTML = `
        <h2>${data.name.toUpperCase()}</h2>
        <img src="${data.sprites.front_default}" alt="${data.name}">
        <p><b>ID:</b> ${data.id}</p>
        <p><b>Height:</b> ${data.height}</p>
        <p><b>Weight:</b> ${data.weight}</p>
        <p><b>Base Experience:</b> ${data.base_experience}</p>
    `;

    resultDiv.innerHTML = pokemonHTML;
}
