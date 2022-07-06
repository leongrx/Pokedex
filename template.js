"use strict"

function pokedexHeaderHTML() {
    return /*html*/ `
    <img src="./img/pokedex-header.jpg">
    <input type="text" placeholder="Suchen..." id="search" onkeyup="searchPokemon()"> `;
}

function pokedexPokemonHTML(i) {
    const id = allPokemons[i].id;
    return /*html*/ `
    <div onclick="showImage(${i})" class="design" id="design${i}">
        <div class="d-flex">
            <img src="" id="designImg${i}" class="designImg">
        </div>
        <div>
            <div class="circle" id="circle${i}">
                <span id="circle-number">${"#" + id.toString().padStart(3, '0')}</span>
            </div>
        </div>
        <div class="d-flex">
            <span class="design-name">${allPokemonsName[i].names[5].name}</span>
        </div>
        <div id="type${i}" class="design-type"></div>
    </div> `;
}

function showImageHTML(i) {
    return /*html*/ `
    <div class="showImageOverview" id="showImageOverview${i}">
        <div class="stickyHeaderOverview" id="stickyHeaderOverview${i}">
            <div onclick="closeOverview()" id="zurück-btn"><img src="./img/zurueck.svg"></div>
            <div class="circle-overview">
                <span>${"#" + allPokemons[i].id}</span>
            </div>
            <div class="placeholder"></div>
        </div>
        <div class="divShowImage">
            <img class="showImage" id="showImage" src="${allPokemons[i].sprites.other.home.front_shiny}">
        </div>
        <div class="d-flex">
            <span class="designNameOverview">${allPokemonsName[i].names[5].name}</span>
        </div>
        <div id="typeOverview${i}" class="designTypeOverview"></div>
        <div class="pokemonStatsOverview">
            <div class="statsOverview">
                <span>Pokemon:</span>
                <span>${allPokemonsName[i].genera[4].genus}</span>
            </div>
            <div class="statsOverview">
                <span>Größe:</span>
                <span>${allPokemons[i].height / 10} m</span>
            </div>
            <div class="statsOverview">
                <span>Gewicht:</span>
                <span>${allPokemons[i].weight / 10} Kg</span>
            </div>
        </div>
        <div class="pokemonBaseStatsOverview">
            <div class="baseStatsCategoryOverview" id="statNameOverview${i}">
            </div>
            <div class="baseStatsFactsOverview" id="statFactOverview${i}">
            </div>
            <div class="baseStatsProgressbarOverview" id="statProgressbarOverview${i}">
            </div>
        </div>
        <div class="pokemonContentOverview">
            <span>${allPokemonsName[i].flavor_text_entries[41].flavor_text}</span>
        </div>
        <h2>Entwicklungen</h5>
        <div id="evolutionImg" class="evolutionImg"></div>
        <div id="strongTypeImg" class="strongWeakTypeImg"></div>
        <div id="weakTypeImg" class="strongWeakTypeImg"></div>
    </div> `;
}

function showEvolutionHTML(evolution) {
    return /*html*/ `
    <img class="evolutions" src="${evolution.img}">`;
}

function showStrongTypeHTML(strong) {
    return /*html*/ `
    <div>
        <img class="strongType" src="./img/${strong}.svg">
        <span>${strong}</span>
    </div> `;
}

function showWeakTypeHTML(weak) {
    return /*html*/ `
    <div>
        <img class="strongType" src="./img/${weak}.svg">
        <span>${weak}</span>
    </div> `;
}
