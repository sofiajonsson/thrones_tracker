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

		let comment = document.createElement('p')
			comment.textContent = post.comment
			postDiv.appendChild(comment)

		let deleteButton = document.createElement('button')
			deleteButton.textContent = "Delete"
			postDiv.appendChild(deleteButton)

			deleteButton.addEventListener('click', () => {
				postDiv.remove()
				deleteCharacterPost(post.id)
			})
	}


	function deleteCharacterPost(id){
		fetch(POSTS_URL + '/' + id, {
			method: 'DELETE'
		})
		.then(res => res.json())
			console.log('Deleted');
	}

	function addNewCharacter(){
		let topDiv = document.getElementById('throne-collection')

		let newCharacterForm = document.getElementById('new-character')
			newCharacterForm.addEventListener('submit', handleSubmit)
			topDiv.appendChild(newCharacterForm)
	}

	function handleSubmit(ev){
		ev.preventDefault()
		fetch(POSTS_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			name: document.getElementById('name'),
			image: document.getElementById('image'),
			comment: document.getElementById('comment')
	})
})
	.then(res => res.json())
	.then(json =>showCharacterPosts(json))
}




	addBtn.addEventListener('click', () => {
	    // hide & seek with the form
	    addNewCharacter = !addNewCharacter
	    if (addNewCharacter) {
	      charcterPostForm.style.display = 'block'
	      // submit listener here
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
