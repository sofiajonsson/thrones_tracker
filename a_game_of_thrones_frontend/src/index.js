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
		let editCardButton = document.createElement('left_button')
			editCardButton.textContent = "Edit"
			postDiv.appendChild(editCardButton)

			editCardButton.addEventListener('click', () => {
				editCharacterPost(post)
				console.log(" passed in:", post);


			})
			//this line of code is to make the add character form dissappear
			charcterPostForm.style.display = 'none'
	}

	function editCharacterPost(post){
		let editForm = document.getElementById('edit-form')
		editForm.name = post.id
		console.log(editForm.name);

		editForm.addEventListener('submit', editHandleSubmit )
	// debugger

		let formName = document.getElementById('edit-name')
		formName.value = post.name
		editForm.appendChild(formName)


		let formImage = document.getElementById('edit-image')
		formImage.value = post.image

		let formComment = document.getElementById('edit-comment')
		formComment.value = post.comment
	}

// This is how we attached id to the form through the name 
// fetch(POSTS_URL + '/' + ev.target.name

	function editHandleSubmit(ev){
		console.log();
		debugger
		console.log("Edit Handle Submitted?")
		ev.preventDefault()
		fetch(POSTS_URL + '/' + ev.target.name , {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			name: document.getElementById('edit-name').value,
			image: document.getElementById('edit-image').value,
			comment: document.getElementById('edit-comment').value
			})
		})
		.then(res => res.json())
		.then(res => {
			console.log(res)
		})
		.then(json => showCharacterPosts(json))
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

		// let editForm = document.getElementById('edit-form')
		// editForm.addEventListener( "submit", (ev) => {
		// handleSubmit(ev)})
	}

	main()

})
