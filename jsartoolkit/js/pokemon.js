<!--
var pokeDB;
var pokePC;   //< saves how many of each pokemon have been caught

function pokeInit () {
	var rateVeryCommon = 0.1;
	var rateCommon = 0.085;
	var rateSemiRare = 0.0675;
	var rateRare = 0.0333;
	var rateVeryRare = 0.0125;

	pokeDB = Array();
	pokeDB[1]  = {name:"Bulbasaur",  chance:rateSemiRare,   catch_rate:0.059};
	pokeDB[2]  = {name:"Ivysaur",    chance:rateRare,       catch_rate:0.059};
	pokeDB[3]  = {name:"Venusaur",   chance:rateVeryRare,   catch_rate:0.059};
	pokeDB[4]  = {name:"Charmander", chance:rateSemiRare,   catch_rate:0.059};
	pokeDB[5]  = {name:"Charmeleon", chance:rateRare,       catch_rate:0.059};
	pokeDB[6]  = {name:"Charizard",  chance:rateVeryRare,   catch_rate:0.059};
	pokeDB[7]  = {name:"Squirtle",   chance:rateSemiRare,   catch_rate:0.059};
	pokeDB[8]  = {name:"Wartortle",  chance:rateRare,       catch_rate:0.059};
	pokeDB[9]  = {name:"Blastoise",  chance:rateVeryRare,   catch_rate:0.059};
	pokeDB[10] = {name:"Caterpie",   chance:rateVeryCommon, catch_rate:0.333};
	pokeDB[11] = {name:"Metapod",    chance:rateCommon,     catch_rate:0.157};
	pokeDB[12] = {name:"Butterfree", chance:rateRare,       catch_rate:0.059};
	pokeDB[13] = {name:"Weedle",     chance:rateVeryCommon, catch_rate:0.333};
	pokeDB[14] = {name:"Kakuna",     chance:rateCommon,     catch_rate:0.157};
	pokeDB[15] = {name:"Beedrill",   chance:rateRare,       catch_rate:0.059};

	for (var i = 1; i < pokeDB.length; ++i) {
		pokeDB[i].broke_free = false;
	}
}

// -->