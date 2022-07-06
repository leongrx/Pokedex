"use strict"

let allPokemons = []; 
let allPokemonsName = [];
let evolutionPokemonsOverview = [];
let strongWeakTypes = [];
let loadedPokemons = 30;
let activeFullscreen = false;

const colors = {
    fire: "#f08030",
    grass: "#78c850",
    electric: "#fbd100",
    water: "#3692dc",
    ground: "#e87236",
    rock: "#c8b686",
    fairy: "#ee99ac",
    poison: "#b567ce",
    bug: "#83c300",
    dragon: "#006fc9",
    psychic: "#ff6675",
    flying: "#89AAE3",
    fighting: "#c03028",
    normal: "#919aa2",
    dark: "#5b5466",
    ghost: "#644cb2",
    ice: "#4cd1c0",
    shadow: "#e87236",
    steel: "#abacbc",
}

async function loadPokemon() {
    await loadAllPokemons();
    await loadAllPokemonsName();
    await loadEvolutionPokemon();
    await loadStrongWeakTypes();
    disableLoader();
    renderPokemonInfo();
    pokedexHeader();
    loadEvolutionImg();
}

async function loadAllPokemons() {
    for (let i = 1; i < loadedPokemons; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let response = await fetch(url);
        let allPokemonsJSON = await response.json();
        allPokemons.push(allPokemonsJSON);
    }
}

async function loadAllPokemonsName() {
    for (let i = 1; i < loadedPokemons; i++) {
        let url2 = `https://pokeapi.co/api/v2/pokemon-species/${i}`;
        let response2 = await fetch(url2);
        let allPokemonsNameJSON = await response2.json();
        allPokemonsName.push(allPokemonsNameJSON);
    }
}

async function loadEvolutionPokemon() {
    for (let i = 1; i < loadedPokemons; i++) {
        try {
            let url3 = `https://pokeapi.co/api/v2/evolution-chain/${i}/`;
            let response3 = await fetch(url3);
            let allEvolutionJSON = await response3.json();
            getEvolution(allEvolutionJSON);
        } catch (err) {
            continue;
        } finally {
            i++;
        }
    }
}

async function loadStrongWeakTypes() {
    for (let i = 1; i < 19; i++) {
        let url4 = `https://pokeapi.co/api/v2/type/${i}`;
        let response4 = await fetch(url4);
        let strongWeakTypesJSON = await response4.json();
        strongWeakTypes.push(strongWeakTypesJSON);
    }
    for (let i = 10001; i <= 10002; i++) {
        let url5 = `https://pokeapi.co/api/v2/type/${i}`;
        let response5 = await fetch(url5);
        let strongWeakTypesJSON = await response5.json();
        strongWeakTypes.push(strongWeakTypesJSON);
    }
}

function disableLoader() {
    document.getElementById('preloader').classList.add('d-none');
}

function renderPokemonInfo() {
    document.getElementById('pokemon').innerHTML = '';
    for (let i = 0; i < allPokemons.length; i++) {
        document.getElementById('pokemon').innerHTML += pokedexPokemonHTML(i);
        document.getElementById(`designImg${i}`).src = allPokemons[i].sprites.other.home.front_shiny;
        for (let j = 0; j < allPokemons[i].types.length; j++) {
            loadTypes(i, j);
            bgPokemon(i);
        }
    }
}

window.onscroll = function () {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && !activeFullscreen) {
        if (screen.width >= 1000) {
            loadedPokemons += 30;
            document.getElementById('preloader').classList.remove('d-none');
            refreshLoadPokemon();
        }
    }
};

function refreshLoadPokemon() {
    allPokemons = [];
    allPokemonsName = [];
    evolutionPokemonsOverview = [];
    strongWeakTypes = [];
    loadPokemon();
}

function loadTypes(i, j) {
    let pokedexContent = document.getElementById(`type${i}`);
    let type = document.createElement('img');
    let pokemonType = allPokemons[i].types[j].type.name
    type.setAttribute('src', `./img/${pokemonType}.svg`);
    type.setAttribute('id', 'pokemontype' + j);
    type.innerHTML = pokemonType;
    pokedexContent.appendChild(type);
}

function pokedexHeader() {
    document.getElementById('pokedex-header').innerHTML = pokedexHeaderHTML();
}

function bgPokemon(i) {
    const type = allPokemons[i].types[0].type.name;
    const color = colors[type];
    document.getElementById(`design${i}`).style.backgroundColor = color;
    document.getElementById(`circle${i}`).style.backgroundColor = color;
}

function showImage(i) {
    let showImage = document.getElementById('pokedex');
    showImage.classList.remove('d-none');
    showImage.innerHTML = showImageHTML(i);
    forShowImage(i);
    showEvolutions(i);
}

function forShowImage(i, j) {
    for (let j = 0; j < allPokemons[i].types.length; j++) {
        loadTypesOverview(i, j);
        bgPokemonOverview(i, j);
    }
    showStrongTypes(i);
    forBaseStatsOverview(i, j);
}

function closeOverview() {
    let showImage = document.getElementById('pokedex');
    showImage.classList.add('d-none');
}

function loadTypesOverview(i, j) {
    let pokedexContentOverview = document.getElementById(`typeOverview${i}`);
    let typeOverviewImg = document.createElement('img');
    let typeOverviewText = document.createElement('span');
    let pokemonType = allPokemons[i].types[j].type.name

    typeOverviewImg.setAttribute('src', `./img/${pokemonType}.svg`);
    typeOverviewImg.setAttribute('id', 'pokemontypeOverview' + j);
    typeOverviewImg.innerHTML = pokemonType;

    typeOverviewText.innerHTML = pokemonType;

    pokedexContentOverview.appendChild(typeOverviewImg);
    pokedexContentOverview.appendChild(typeOverviewText);
}

function bgPokemonOverview(i) {
    const type = allPokemons[i].types[0].type.name;
    const color = colors[type];
    document.getElementById(`showImageOverview${i}`).style.backgroundColor = color;
    document.getElementById(`stickyHeaderOverview${i}`).style.backgroundColor = color;
}

function forBaseStatsOverview(i) {
    for (let j = 0; j < allPokemons[i].stats.length; j++) {
        loadBaseStatsOverview(i, j);
        loadProgressbar(i, j);
    }
}

function loadBaseStatsOverview(i, j) {
    let statName = document.getElementById(`statNameOverview${i}`);
    let statFact = document.getElementById(`statFactOverview${i}`);

    let statNameSpan = document.createElement('span');
    let statFactSpan = document.createElement('span');

    statNameSpan.innerHTML = allPokemons[i].stats[j].stat.name;
    statFactSpan.innerHTML = allPokemons[i].stats[j].base_stat;

    statName.appendChild(statNameSpan);
    statFact.appendChild(statFactSpan);
}

function loadProgressbar(i, j) {
    let statProgressbar = document.getElementById(`statProgressbarOverview${i}`);
    let statProgressbarDiv = document.createElement('div');
    statProgressbarDiv.setAttribute('class', 'progressbar');
    statProgressbar.appendChild(statProgressbarDiv);

    let statProgressbarDivInner = document.createElement('div');
    statProgressbarDivInner.setAttribute('class', 'width');

    let width = allPokemons[i].stats[j].base_stat;
    statProgressbarDivInner.style.width = `${width}px`;
    statProgressbarDiv.appendChild(statProgressbarDivInner);
}

function searchPokemon() {
    let search = document.getElementById('search').value;
    search = search.toLowerCase();
    if (document.getElementById('search').value == "") {
        refreshLoadPokemon();
    } else {
        filterPokemon(search);
    }
}

function filterPokemon(search) {
    document.getElementById('pokemon').innerHTML = '';
    for (let i = 0; i < allPokemons.length; i++) {
        if (allPokemonsName[i].names[5].name.toLowerCase().includes(search)) {
            document.getElementById('pokemon').innerHTML += pokedexPokemonHTML(i);
            document.getElementById(`designImg${i}`).src = allPokemons[i].sprites.other.home.front_shiny;
            for (let j = 0; j < allPokemons[i].types.length; j++) {
                loadTypes(i, j);
                bgPokemon(i);
            }
        }
    }
}

function getEvolution(allEvolutionJSON) {
    const evolution = allEvolutionJSON;
    const firstName = evolution.chain.species.name;

    if (evolution.chain["evolves_to"] == "") {
        return;
    } else {
        ifSecondEvolution(evolution, firstName);
        ifFirstEvolution(evolution, firstName);
    }
}

function ifSecondEvolution(evolution, firstName) {
    if (evolution.chain["evolves_to"][0]["evolves_to"] != "") {
        const secondName = evolution.chain["evolves_to"][0].species.name;
        const thirdName = evolution.chain["evolves_to"][0]["evolves_to"][0].species.name;
        evolutionPokemonsOverview.push([
            {
                name: firstName,
            },
            {
                name: secondName,
            },
            {
                name: thirdName,
            }
        ]);
    }
}

function ifFirstEvolution(evolution, firstName) {
    if (evolution.chain["evolves_to"][0]["evolves_to"] == "") {
        const secondName = evolution.chain["evolves_to"][0].species.name;
        evolutionPokemonsOverview.push([
            {
                name: firstName,
            },
            {
                name: secondName,
            }
        ]);
    }
}

async function loadEvolutionImg() {
    for (let i = 0; i < evolutionPokemonsOverview.length; i++) {
        const evolution = evolutionPokemonsOverview[i];
        for (let j = 0; j < evolution.length; j++) {
            const name = evolution[j].name;
            let urlPokemon = `https://pokeapi.co/api/v2/pokemon/${name}`;
            let response = await fetch(urlPokemon);
            let responseAsJson = await response.json();
            let imgURL = responseAsJson.sprites.other.home.front_shiny;
            evolution[j].img = imgURL;
        }
    }
}

function showEvolutions(i) {
    const name = allPokemons[i].species.name;
    for (let i = 0; i < evolutionPokemonsOverview.length; i++) {
        const evolution = evolutionPokemonsOverview[i];
        for (let j = 0; j < evolution.length; j++) {
            const evolutionName = evolution[j].name;
            if (name == evolutionName) {
                for (let k = 0; k < evolution.length; k++) {
                    const evolutionPos = evolution[k];
                    document.getElementById("evolutionImg").innerHTML += showEvolutionHTML(evolutionPos);
                }
            }
        }
    }
}

function showStrongTypes(i) {
    const pokemonType = allPokemons[i].types[0].type.name;
    for (let k = 0; k < strongWeakTypes.length; k++) {
        const currentType = strongWeakTypes[k];
        if (pokemonType == currentType.name) {
            loadStrongType(currentType);
            loadWeakType(currentType);
        }
    }
}

function loadStrongType(currentType) {
    let strongType = currentType["damage_relations"]["double_damage_to"];
    if (strongType == 0) {
        return;
    } else {
        document.getElementById("strongTypeImg").innerHTML = '<h2>Stärken</h2>';
        for (let i = 0; i < strongType.length; i++) {
            let strong = strongType[i].name;
            document.getElementById("strongTypeImg").innerHTML += showStrongTypeHTML(strong);
        }
    }
}

function loadWeakType(currentType) {
    let weakType = currentType["damage_relations"]["double_damage_from"];
    if (weakType == 0) return;
    document.getElementById("weakTypeImg").innerHTML = '<h2>Schwächen</h2>';
    for (let i = 0; i < weakType.length; i++) {
        let weak = weakType[i].name;
        document.getElementById("weakTypeImg").innerHTML += showWeakTypeHTML(weak);
    }
}