const section = document.getElementById('characters');
const backPage = document.getElementById('back-page');
const forwardPage = document.getElementById('forward-page');
const radioArray = Array.from(document.querySelectorAll('input[type=radio]'));
const searchInput = document.getElementById('name-search');

let page = 1;
let status = 'Alive';
let name = '';

async function loadCharacters() {
	try {
		const response = await fetch(
			`https://rickandmortyapi.com/api/character/?page=${page}&status=${status}&name=${name}`
		);

		const data = await response.json();
		clearOldCharacters();
		if (Array.isArray(data.results)) {
			data.results.forEach((character) => {
				createCharacter(character);
			});
			check();
		} else {
			noElements();
		}
		btnBlock();
	} catch (error) {
		console.log('error', error);
	}
}
loadCharacters();

function createCharacter(character) {
	const outerDiv = document.createElement('div');
	outerDiv.classList.add('character-background');

	const imgHolder = document.createElement('div');
	imgHolder.classList.add('img-holder');
	const img = document.createElement('img');
	img.src = character.image;
	imgHolder.appendChild(img);
	outerDiv.appendChild(imgHolder);

	const pName = document.createElement('p');
	pName.innerText = character.name;
	outerDiv.appendChild(pName);

	const infoHolder = document.createElement('div');
	infoHolder.classList.add('info-holder');
	const pStatus = document.createElement('p');
	pStatus.innerText = `Status: ${character.status}`;
	const pSpecies = document.createElement('p');
	pSpecies.innerText = `Rasa: ${character.species}`;
	infoHolder.appendChild(pStatus);
	infoHolder.appendChild(pSpecies);
	outerDiv.appendChild(infoHolder);

	section.appendChild(outerDiv);
}

function clearOldCharacters() {
	const characterList = Array.from(
		document.getElementsByClassName('character-background')
	);
	characterList.forEach((character) => {
		character.remove(character);
	});
}

backPage.addEventListener('click', prevPage);
function prevPage() {
	page += -1;
	loadCharacters();
}
forwardPage.addEventListener('click', nextPage);
function nextPage() {
	page += 1;
	loadCharacters();
}

function btnBlock() {
	if (page === 1) {
		backPage.disabled = true;
	} else {
		backPage.disabled = false;
	}
}

radioArray.forEach((radio) => {
	radio.addEventListener('click', changeStatus);
});
function changeStatus() {
	page = 1;
	status = this.defaultValue;
	loadCharacters();
}

searchInput.addEventListener('input', searchByName);
function searchByName() {
	name = this.value;
	loadCharacters();
}

function noElements() {
	const check = document.getElementById('announcement');
	if (check === null) {
		const announcement = document.createElement('p');
		announcement.id = 'announcement';
		announcement.innerText =
			'Nie znaleziono postaci spełniających kryteria wyszukiwania.';
		section.appendChild(announcement);
	}
}
function check() {
	const check = document.getElementById('announcement');
	if (check != null) {
		check.remove(check);
	}
}
