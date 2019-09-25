// State
var gameState = {
	userpokemon: '',
	rivalPokemon: '',
	pokemonDB: [
		{
			name: 'charmander',
			type: 'fire',
			attack: 52,
			defense: 39,
			level: 1,
			img: 'http://www.smogon.com/dex/media/sprites/xy/charmander.gif'
		},
		{
			name: 'bulbasaur',
			type: 'grass',
			hp: 45,
			attack: 49,
			defense: 49,
			level: 1,
			img: 'http://www.smogon.com/dex/media/sprites/xy/bulbasaur.gif'
		},
		{
			name: 'squirtle',
			type: 'water',
			hp: 44,
			attack: 48,
			defense: 65,
			level: 1,
			img: 'http://www.smogon.com/dex/media/sprites/xy/squirtle.gif'
		}
	],
	elements: {
		pokemonsEl: document
			.querySelector('.select-screen')
			.querySelectorAll('.character'),
		battleScreenEl: document.getElementById('battle-screen'),
		attackBtnsEl: document
			.getElementById('battle-screen')
			.querySelectorAll('.attack')
	},
	init: function() {
		//  elements

		console.log(gameState.elements.attackBtnsEl);

		// This is the initial loop
		var i = 0;
		while (i < gameState.elements.pokemonsEl.length) {
			// add function to all characters on screen select
			gameState.elements.pokemonsEl[i].onclick = function() {
				// current selected pokemon name
				var pokemonName = this.dataset.pokemon;
				// elements for images on battle screen
				var player1Img = document
					.querySelector('.player1')
					.getElementsByTagName('img');
				var player2Img = document
					.querySelector('.player2')
					.getElementsByTagName('img');

				//We save the current pokemon
				gameState.userPokemon = pokemonName;

				// cpu pics a pokemon
				gameState.cpuPick();

				// change screen to battle scene
				gameState.elements.battleScreenEl.classList.toggle('active');

				// Select Data from current user pokemon
				gameState.currentPokemon = gameState.pokemonDB.filter(function(
					pokemon
				) {
					return pokemon.name == gameState.userPokemon;
				});
				player1Img[0].src = gameState.currentPokemon[0].img;
				// Select Data from current cpu pokemon
				gameState.currentRivalPokemon = gameState.pokemonDB.filter(function(
					pokemon
				) {
					return pokemon.name == gameState.rivalPokemon;
				});
				player2Img[0].src = gameState.currentRivalPokemon[0].img;

				// current and cpu pokemon initial health
				gameState.currentPokemon[0].health = gameState.calculateInitialHealth(
					gameState.currentPokemon
				);
				gameState.currentRivalPokemon[0].health = gameState.calculateInitialHealth(
					gameState.currentRivalPokemon
				);

				console.log(gameState);
				//
			};
			i++;
		}

		var a = 0;
		while (a < gameState.elements.attackBtnsEl.length) {
			gameState.elements.attackBtnsEl[a].onclick = function() {
				var attackName = this.dataset.attack;
				gameState.currentUserAttack = attackName;
				gameState.play(attackName, gameState.cpuAttack());
			};
			a++;
		}

		//
	},

	cpuAttack: function() {
		var attacks = ['rock', 'paper', 'scissors'];

		return attacks[gameState.calculateInitialHealth(0, 3)];
	},

	calculateInitialHealth: function(user) {
		return 0.2 * Math.sqrt(user[0].level) * user[0].defense * user[0].hp;
	},

	attackMove: function(attack, level, stack, critical, enemy, attacker) {
		console.log(enemy.name + ' before: ' + enemy.health);
		var attackAmount = attack * level * (stack + critical);
		enemy.health = enemy.health - attackAmount;
		gameState.checkWinner(enemy, attacker);
		console.log(enemy.name + ' after: ' + enemy.health);
	},

	checkWinner: function(enemy, attacker) {
		if (enemy.health <= 0) {
			console.log('You are the winner ' + attacker.name);
		}
	},
	cpuPick: function() {
		gameState.rivalPokemon =
			gameState.elements.pokemonsEl[
				gameState.calculateInitialHealth(0, 3)
			].dataset.pokemon;
	},
	randomNumber: function(min, max) {
		return Math.floor(Math.random() * (max - min)) + +min;
	},
	play: function(userAttack, cpuAttack) {
		var currentPokemon = gameState.currentPokemon[0];
		var currentRivalPokemon = gameState.currentRivalPokemon[0];
		switch (userAttack) {
			case 'rock':
				if (cpuAttack == 'paper') {
					if (currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
						// user
						gameState.attackMove(
							currentPokemon.attack,
							currentPokemon.level,
							0.8,
							0.5,
							currentRivalPokemon,
							currentPokemon
						);
						if (currentRivalPokemon.health >= 1) {
							gameState.attackMove(
								currentRivalPokemon.attack,
								currentRivalPokemon.level,
								0.8,
								2,
								currentPokemon,
								currentRivalPokemon
							);
						}
					}
					// cpu

					console.log('paper beats rock');
				}
				if (cpuAttack == 'scissors') {
					if (currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
						gameState.attackMove(
							currentPokemon.attack,
							currentPokemon.level,
							0.8,
							0.2,
							currentRivalPokemon,
							currentPokemon
						);
						if (currentRivalPokemon.health >= 1) {
							// cpu
							gameState.attackMove(
								currentRivalPokemon.attack,
								currentRivalPokemon.level,
								0.8,
								0.5,
								currentPokemon,
								currentRivalPokemon
							);
							console.log('rock beats scissors');
						}
					}
				}
				if (cpuAttack == 'rock') {
					if (currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
						// user
						gameState.attackMove(
							currentPokemon.attack,
							currentPokemon.level,
							0.8,
							0.1,
							currentRivalPokemon,
							currentPokemon
						);
						if (currentRivalPokemon.health >= 1) {
							// cpu
							gameState.attackMove(
								currentRivalPokemon.attack,
								currentRivalPokemon.level,
								0.8,
								1,
								currentPokemon,
								currentRivalPokemon
							);
							console.log('you put a chip on my shoulder');
						}
					}
				}
				break;
			case 'paper':
				if (cpuAttack == 'paper') {
					if (currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
						// user
						gameState.attackMove(
							currentPokemon.attack,
							currentPokemon.level,
							0.8,
							1,
							currentRivalPokemon,
							currentPokemon
						);
						if (currentRivalPokemon.health >= 1) {
							// cpu
							gameState.attackMove(
								currentRivalPokemon.attack,
								currentRivalPokemon.level,
								0.8,
								1,
								currentPokemon,
								currentRivalPokemon
							);
							console.log('paper beats rock');
						}
					}
				}
				if (cpuAttack == 'scissors') {
					if (currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
						// user
						gameState.attackMove(
							currentPokemon.attack,
							currentPokemon.level,
							0.8,
							0.5,
							currentRivalPokemon,
							currentPokemon
						);
						if (currentRivalPokemon.health >= 1) {
							// cpu
							gameState.attackMove(
								currentRivalPokemon.attack,
								currentRivalPokemon.level,
								0.8,
								2,
								currentPokemon,
								currentRivalPokemon
							);
							console.log('rock beats scissors');
						}
					}
				}
				if (cpuAttack == 'rock') {
					if (currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
						// user
						gameState.attackMove(
							currentPokemon.attack,
							currentPokemon.level,
							0.8,
							2,
							currentRivalPokemon,
							currentPokemon
						);
						if (currentRivalPokemon.health >= 1) {
							// cpu
							gameState.attackMove(
								currentRivalPokemon.attack,
								currentRivalPokemon.level,
								0.8,
								0.5,
								currentPokemon,
								currentRivalPokemon
							);
						}
					}
				}
				break;
			case 'scissors':
				if (cpuAttack == 'paper') {
					if (currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
						// user
						gameState.attackMove(
							currentPokemon.attack,
							currentPokemon.level,
							0.8,
							2,
							currentRivalPokemon,
							currentPokemon
						);
						if (currentRivalPokemon.health >= 1) {
							// cpu
							gameState.attackMove(
								currentRivalPokemon.attack,
								currentRivalPokemon.level,
								0.8,
								0.5,
								currentPokemon,
								currentRivalPokemon
							);
							console.log('paper beats rock');
						}
					}
				}
				if (cpuAttack == 'scissors') {
					if (currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
						// user
						gameState.attackMove(
							currentPokemon.attack,
							currentPokemon.level,
							0.8,
							1,
							currentRivalPokemon,
							currentPokemon
						);
						if (currentRivalPokemon.health >= 1) {
							// cpu
							gameState.attackMove(
								currentRivalPokemon.attack,
								currentRivalPokemon.level,
								0.8,
								1,
								currentPokemon,
								currentRivalPokemon
							);
							console.log('rock beats scissors');
						}
					}
				}
				if (cpuAttack == 'rock') {
					if (currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
						// user
						gameState.attackMove(
							currentPokemon.attack,
							currentPokemon.level,
							0.8,
							0.5,
							currentRivalPokemon,
							currentPokemon
						);
						if (currentRivalPokemon.health >= 1) {
							// cpu
							gameState.attackMove(
								currentRivalPokemon.attack,
								currentRivalPokemon.level,
								0.8,
								2,
								currentPokemon,
								currentRivalPokemon
							);
							console.log('you put a chip on my shoulder');
						}
					}
				}
				break;
			case 'paper':
				if (cpuAttack == 'paper') {
					if (currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
						// user
						gameState.attackMove(
							currentPokemon.attack,
							currentPokemon.level,
							0.8,
							1,
							currentRivalPokemon,
							currentPokemon
						);
						if (currentRivalPokemon.health >= 1) {
							// cpu
							gameState.attackMove(
								currentRivalPokemon.attack,
								currentRivalPokemon.level,
								0.8,
								1,
								currentPokemon,
								currentRivalPokemon
							);
							console.log('paper beats rock');
						}
					}
				}
				if (cpuAttack == 'scissors') {
					if (currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
						// user
						gameState.attackMove(
							currentPokemon.attack,
							currentPokemon.level,
							0.8,
							0.5,
							currentRivalPokemon,
							currentPokemon
						);
						if (currentRivalPokemon.health >= 1) {
							// cpu
							gameState.attackMove(
								currentRivalPokemon.attack,
								currentRivalPokemon.level,
								0.8,
								2,
								currentPokemon,
								currentRivalPokemon
							);
							console.log('rock beats scissors');
						}
					}
				}
				if (cpuAttack == 'rock') {
					if (currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
						// user
						gameState.attackMove(
							currentPokemon.attack,
							currentPokemon.level,
							0.8,
							2,
							currentRivalPokemon,
							currentPokemon
						);
						if (currentRivalPokemon.health >= 1) {
							// cpu
							gameState.attackMove(
								currentRivalPokemon.attack,
								currentRivalPokemon.level,
								0.8,
								0.5,
								currentPokemon,
								currentRivalPokemon
							);
						}
					}
				}
				console.log(userAttack);
				break;
		}
	}
};
console.log(gameState);
gameState.init();
