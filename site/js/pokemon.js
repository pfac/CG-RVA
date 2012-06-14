<!--
var pokeDB;
var pokePC;   //< saves how many of each pokemon have been caught
var pokeDex;

function pokeInit () {
	var rateVeryCommon = 0.1;
	var rateCommon = 0.085;
	var rateSemiRare = 0.0675;
	var rateRare = 0.0333;
	var rateVeryRare = 0.0125;

	pokeDB = Array();
	pokeDB[1]  = {name:"Bulbasaur",  chance:rateSemiRare,   catch_rate:0.059, locked:0};
	pokeDB[2]  = {name:"Ivysaur",    chance:rateRare,       catch_rate:0.059, locked:16};
	pokeDB[3]  = {name:"Venusaur",   chance:rateVeryRare,   catch_rate:0.059, locked:36};
	pokeDB[4]  = {name:"Charmander", chance:rateSemiRare,   catch_rate:0.059, locked:0};
	pokeDB[5]  = {name:"Charmeleon", chance:rateRare,       catch_rate:0.059, locked:16};
	pokeDB[6]  = {name:"Charizard",  chance:rateVeryRare,   catch_rate:0.059, locked:36};
	pokeDB[7]  = {name:"Squirtle",   chance:rateSemiRare,   catch_rate:0.059, locked:0};
	pokeDB[8]  = {name:"Wartortle",  chance:rateRare,       catch_rate:0.059, locked:16};
	pokeDB[9]  = {name:"Blastoise",  chance:rateVeryRare,   catch_rate:0.059, locked:36};
	pokeDB[10] = {name:"Caterpie",   chance:rateVeryCommon, catch_rate:0.333, locked:0};
	pokeDB[11] = {name:"Metapod",    chance:rateCommon,     catch_rate:0.157, locked:7};
	pokeDB[12] = {name:"Butterfree", chance:rateRare,       catch_rate:0.059, locked:10};
	pokeDB[13] = {name:"Weedle",     chance:rateVeryCommon, catch_rate:0.333, locked:0};
	pokeDB[14] = {name:"Kakuna",     chance:rateCommon,     catch_rate:0.157, locked:7};
	pokeDB[15] = {name:"Beedrill",   chance:rateRare,       catch_rate:0.059, locked:10};

	for (var i = 1; i < pokeDB.length; ++i) {
		pokeDB[i].caught = 0;
	}

	//	GUI
	pokeDex = document.createElement("table");
	//pokeDex.style.cssFloat = "right";
	
	for (var i in pokeDB) {
		var pokemon = pokeDB[i];

		var row = pokeDex.insertRow(-1);
		
		row.insertCell(-1).innerHTML = pokemon.name;
		row.insertCell(-1).innerHTML = pokemon.caught;
	}

	var thead = pokeDex.createTHead();
	var row = thead.insertRow(-1);
	row.insertCell(-1).innerHTML = "Pokémon";
	row.insertCell(-1).innerHTML = "Lvl";

	document.getElementById('initial_image')
	document.getElementById('pokedex_container').appendChild(pokeDex);
}

// -->