const record = document.getElementById('record'),
shot = document.getElementById('shot'),
hit = document.getElementById('hit'),
dead = document.getElementById('dead'),
enemy = document.getElementById('enemy'),
again = document.getElementById('again'),
header = document.querySelector('.header');

const play = {
	record: localStorage.getItem('seaBattleRecord') || 0,
	shot: 0,
	hit: 0,
	dead: 0,
	set updateData(data) {
      this[data] += 1;
      this.render(); 
	},
	render() {
		record.textContent = this.record;
		shot.textContent = this.shot;
		hit.textContent = this.hit;
		dead.textContent = this.dead;
	}
};

const game = {
	ships: [
		{
			location: ['13', '23', '33', '43'],
			hit: ['', '', '', '']
		},
		{
			location: ['46', '47', '48'],
			hit: ['', '', '']
		},
		{
			location: ['88', '98'],
			hit: ['', '']
		},
		{
			location: ['72'],
			hit: ['']
		},
	],
	shipCount: 4,
}

const show = {
	hit(elem) {
		this.changeClass(elem, 'hit');
	},
	miss(elem) {
		this.changeClass(elem, 'miss');
	},
	dead(elem) {
		this.changeClass(elem, 'dead');
	},
	changeClass(elem, value) {
		elem.className = value;
	}
};

const fire = (event) => {
	const target = event.target;
	if (target.classList.length !== 0 || target.tagName !== 'TD') return;
	show.miss(target);
	play.updateData = 'shot';

	for (let i = 0; i < game.ships.length; i++) {
		const ship = game.ships[i];
		const index = ship.location.indexOf(target.id);
		if (index >= 0) {
			show.hit(target);
			play.updateData = 'hit';
			ship.hit[index] = 'x';
			const life = ship.hit.indexOf('');
			if (life < 0) {
				play.updateData = 'dead';
				for (const cell of ship.location) {
					show.dead(document.getElementById(cell));
				}

				game.shipCount -= 1;

				if (game.shipCount < 1) {
					header.textContent = 'Игра окончена!';
					header.style.color = 'red';

					if (play.shot < play.record || play.record === 0) {
						localStorage.setItem('seaBattleRecord', play.shot);
						play.record = play.shot;
						play.render();
					}
				}

			}
		}
	}
};

const init = () => {
	enemy.addEventListener('click', fire);
	play.render();
	again.addEventListener('click', () => {
		location.reload();
	});
};

init();