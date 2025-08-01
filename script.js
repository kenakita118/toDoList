const addBtn = document.getElementById('addBtn');

const toDoListTextbox = document.getElementById('toDoListTextbox');

const toDoListSection = document.getElementById('toDoList-section');

let toDoList = JSON.parse(localStorage.getItem('toDoList')) || [];

addBtn.onclick = function () {
	if (toDoListTextbox.value == '') {
		return;
	}
	console.log('Submitted');
	const toDoListTextbox_content = toDoListTextbox.value;
	toDoList.push(toDoListTextbox_content);
	console.log(toDoList);
	toDoListTextbox.value = '';
	localStorage.setItem('toDoList', JSON.stringify(toDoList));
};

const toDoListElementContainer = document.createElement('div');
toDoListElementContainer.classList.add('toDoList__container');

toDoListSection.appendChild(toDoListElementContainer);
function renderToDoItem(content) {
	const toDoListElement = document.createElement('div');
	toDoListElement.classList.add('toDoList__card');
	toDoListElement.innerHTML = `
        <p>${content}</p>
        <button class='card__button'>Remove</button>
    `;

	const removeBtn = toDoListElement.querySelector('.card__button');
	removeBtn.onclick = () => {
		const itemIndex = toDoList.indexOf(content);
		if (itemIndex !== -1) {
			toDoList.splice(itemIndex, 1);
			localStorage.setItem('toDoList', JSON.stringify(toDoList));
			toDoListElement.remove();
		}
	};

	toDoListElementContainer.appendChild(toDoListElement);
}

// Initial render
toDoList.forEach(renderToDoItem);

// Add new item
addBtn.onclick = function () {
	const content = toDoListTextbox.value.trim();
	if (content === '') return;

	toDoList.push(content);
	localStorage.setItem('toDoList', JSON.stringify(toDoList));
	renderToDoItem(content);
	toDoListTextbox.value = '';
};
