document.addEventListener('DOMContentLoaded', () => {
	POSTS_URL = 'http://localhost:3000/posts'
	const addBtn = document.querySelector('#new-throne-btn')
  const charcterPostForm = document.querySelector('.container')
   let addCharacter = false

	function getCharacters(){
		fetch(POSTS_URL)
			.then(res => res.json())
			.then(json => indexPosts(json))
	}

	function indexPosts(posts){
		posts.forEach(showCharacterPosts)
	}

	function showCharacterPosts(post){
		let topDiv = document.getElementById('throne-collection')

		let postDiv = document.createElement('div')
			postDiv.classList.add('card')
			topDiv.appendChild(postDiv)

		let name = document.createElement('h2')
			name.textContent = post.name
			postDiv.appendChild(name)

		let image = document.createElement('img')
			image.src = post.image
			postDiv.appendChild(image)

		let div = document.createElement('div')
			div.classList.add('editable')
			postDiv.appendChild(div)

		let ul = document.createElement('ul')
		div.appendChild(ul)

		let comment = document.createElement('li')
			comment.textContent = post.comment
			ul.appendChild(comment)

		let deleteButton = document.createElement('right_button')
			deleteButton.textContent = "Delete"
			postDiv.appendChild(deleteButton)

			deleteButton.addEventListener('click', () => {
				postDiv.remove()
				deleteCharacterPost(post.id)
			})
		let editButton = document.createElement('left_button')
			editButton.textContent = "Edit"
			postDiv.appendChild(editButton)

			editButton.addEventListener('click', () => {
				editCharacterPost(post.id)
			})
			charcterPostForm.style.display = 'none'
	}


	function deleteCharacterPost(id){
		console.log(id);
		fetch(POSTS_URL + '/' + id, {
			method: 'DELETE'
		})
	 .then(console.log("Item successfully deleted"))
	}

	function addNewCharacter(){
		let topDiv = document.getElementById('new-character-container')

		let newCharacterForm = document.getElementById('new-character')
			newCharacterForm.addEventListener('submit', handleSubmit)
			topDiv.appendChild(newCharacterForm)
	}
	function editCharacterPost(id){
		console.log(id);
		fetch(POSTS_URL + '/' + id, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			body: JSON.stringify({
				name: document.getElementById('name').value,
				image: document.getElementById('image').value,
				comment: document.getElementById('comment').value
			})
		})
		.then(res => res.json())
		.then(json => showCharacterPosts(json))
	 	.then(console.log("Item Edited"))
	}

	function addNewCharacter(){
		let topDiv = document.getElementById('new-character-container')

		let newCharacterForm = document.getElementById('new-character')
			newCharacterForm.addEventListener('submit', handleSubmit)
			topDiv.appendChild(newCharacterForm)
	}
	function handleSubmit(ev){
		console.log("Happened?")
		ev.preventDefault()
		fetch(POSTS_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			name: document.getElementById('name').value,
			image: document.getElementById('image').value,
			comment: document.getElementById('comment').value
			})
		})
		.then(res => res.json())
		.then(json => showCharacterPosts(json))
	 	document.getElementById('name').value = '',
	 	document.getElementById('image').value = '',
		document.getElementById('comment').value= ''
	}

	addBtn.addEventListener('click', () => {
	    addCharacter = !addCharacter
	    if (addCharacter) {
	      charcterPostForm.style.display = 'block'
	    } else {
	      charcterPostForm.style.display = 'none'
	    }
	  })




















	function main(){
		getCharacters()
		addNewCharacter()
	}


	main()

})
