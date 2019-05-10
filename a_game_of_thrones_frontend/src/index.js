document.addEventListener('DOMContentLoaded', () => {
	POSTS_URL = 'http://localhost:3000/posts'
	COMMENTS_URL = 'http://localhost:3000/comments'
	COMMENTS = []
//---------------------------------------------------------------------
	const addBtn = document.querySelector('#new-throne-btn')
  const charcterPostForm = document.querySelector('.container')
   let addCharacter = false
//---------------------------------------------------------------------
	function getCharacters(){
		fetch(POSTS_URL)
			.then(res => res.json())
			.then(json => indexPosts(json))
	}
//---------------------------------------------------------------------
	function indexPosts(posts){
		posts.forEach(showCharacterPosts)
	}
//---------------------------------------------------------------------
function showComments(comments){
	console.log('hit show comments', comments.text);
	let ul = document.getElementById(`card-ul-${comments.post_id}`)

	let seededLi = document.createElement('li')
		seededLi.textContent = comments.text
		ul.appendChild(seededLi)
	}

//-----------------------------------------------------------------
	function showCharacterPosts(post){
	// COMMENTS.push(post)
		let topDiv = document.getElementById('throne-collection')

		let postDiv = document.createElement('div')
			postDiv.classList.add('card')
			topDiv.appendChild(postDiv)

			let name = document.createElement('h2')
				name.setAttribute("id", `card-name-${post.id}`)
				name.textContent = post.name
				postDiv.appendChild(name)

			let image = document.createElement('img')
				image.setAttribute("id", `card-image-${post.id}`)
				image.src = post.image
				postDiv.appendChild(image)

			let div = document.createElement('div')
				div.classList.add('editable')
				postDiv.appendChild(div)

				let ul = document.createElement('ul')
				ul.setAttribute('id', `card-ul-${post.id}`)
				ul.classList.add("list-group")
					div.appendChild(ul)

					let comment = document.createElement('li')
						comment.setAttribute("id", `card-comment-${post.id}`)
						comment.textContent = post.comment
							console.log(comment)
							ul.appendChild(comment)

					let seededComments = document.createElement('p')
						post.comments.forEach(showComments)
						ul.appendChild(seededComments)



//buttons//
			let commentButton = document.createElement('mid_button')
				commentButton.textContent = "Comment"
				postDiv.appendChild(commentButton)

				commentButton.addEventListener('click', () => {
					addNewComment(post)
					console.log(" new comment passed in:", post);
				})

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
					console.log(" edit passed in:", post);
				})
			//this line of code is to make the add character form dissappear
			charcterPostForm.style.display = 'none'
	}
//---------------------------------------------------------------------
	function editCharacterPost(post){
		let editForm = document.getElementById('edit-form')
			editForm.name = post.id
			console.log(editForm.name);
			editForm.addEventListener('submit', editHandleSubmit )

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
function addNewCharacter(){
	let topDiv = document.getElementById('new-character-container')

	let newCharacterForm = document.getElementById('new-character')
		newCharacterForm.addEventListener('submit', handleSubmit)
		topDiv.appendChild(newCharacterForm)
}

function addNewComment(post){
	let div = document.createElement('div')
		div.classList.add('new-comment-container')
console.log("passing", );

let form = document.createElement('form')
	form.classList.add('comment-form')
	form.addEventListener('submit', newCommentSubmit)
	div.appendChild(form)

	// let ul = document.createElement('ul')
	// ul.classList.add('textarea')
	// div.appendChild(ul)


}
	// 	commentForm.name = post.id
	// 	console.log(commentForm.name);
	// 	commentForm.addEventListener('submit', newCommentSubmit )

	// let ul = document.createElement('ul')
	// 	topDiv.appendChild(ul)
	//
	// let li = document.createElement('li')
	// 	ul.appendChild(li)
	//
	// let newComment = document.getElementById('new-comment-form')
	// 	newComment.value = post.comment


	//
	// let newComment = document.createElement('textarea')
	// newComment.classList.add('input-text')
	// 	newComment.textContent = 'hello'
	// 	li.appendChild(newComment)
	// 	newComment.addEventListener('submit', newCommentSubmit )



//---------------------------------------------------------------------
	function deleteCharacterPost(id){
		console.log(id);
		fetch(POSTS_URL + '/' + id, {
			method: 'DELETE'
		})
	 .then(console.log("Item successfully deleted"))
	}


	function editHandleSubmit(ev){
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
			//give each element an attribute with an id so you can specifically
			//target that card
			//pessimistic rendering
			document.getElementById(`card-name-${res.id}`).textContent = res.name
			document.getElementById(`card-image-${res.id}`).textContent = res.image
			document.getElementById(`card-comment-${res.id}`).textContent = res.comment
		})
		// .then(json => showCharacterPosts(json))
	}


	function handleSubmit(ev){
		console.log("New Character Submitted?")
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

	function newCommentSubmit(ev){
		console.log("New Comment Submitted?")
		ev.preventDefault()
		fetch(POSTS_URL, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			comment: document.getElementById('add-comment-input').value
			})
		})
		.then(res => res.json())
		// .then(json => showCharacterPosts(json))
	}
//---------------------------------------------------------------------
	addBtn.addEventListener('click', () => {
	    addCharacter = !addCharacter
	    if (addCharacter) {
	      charcterPostForm.style.display = 'block'
	    } else {
	      charcterPostForm.style.display = 'none'
	    }
	  })
//---------------------------------------------------------------------
	function main(){
		getCharacters()
		addNewCharacter()
		addNewComment()
		// getComments()
		// dubGet()
	}
//---------------------------------------------------------------------
	main()
})

//create another button and patch situation like the edit
//change comments to be an array so i can iterate through
