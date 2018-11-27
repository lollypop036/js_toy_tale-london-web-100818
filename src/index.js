const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const addToyForm = document.querySelector('.add-toy-form')
const toyCollection = document.querySelector('#toy-collection')
let addToy = false

// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    addToyForm.addEventListener("submit", event => {

    event.preventDefault()
    addToy = !addToy
    


    const toy = {
      name: toyname.value,
      image: image.value,
     likes:0
    }

    createToy(toy)
    .then(serverToy => addNewToy(serverToy))
    .catch( () => alert('Unable to create toy. Check your internet connection.'))

    addToyForm.reset()
    toyForm.style.display = 'none'
    }
    )}
   else {
    toyForm.style.display = 'none'
  }
})



const getToys = () =>
  fetch('http://localhost:3000/toys')
    .then(resp => resp.json())

  
  const updateToy = toy => 
   fetch(`http://localhost:3000/toys/${toy.id}`, {
     method: 'PATCH',
     headers: { 'Content-Type':'application/json' },
     body: JSON.stringify(toy)
    }).then(resp => resp.json())
  


const createToy = toy =>
fetch('http://localhost:3000/toys', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(toy)
}).then(resp => resp.json())

const addNewToy = toy => {

  const toyItem = document.createElement('div')
  toyItem.className = 'card'
  toyItem.id = toy.id
  toyItem.innerHTML = `
  <h2>${toy.name}</h2>
  <img class="toy-avatar" src="${toy.image}">
  <p class="likes">${toy.likes} likes</p>
  <button class="like-button">Like</button>
  `
  toyCollection.appendChild(toyItem)
  
  const likesBtnEl = toyItem.querySelector(".like-button")
  const likesEl = toyItem.querySelector(".likes")

  
  likesBtnEl.addEventListener("click", () => {
    toy.likes++
    likesEl.innerText = `${toy.likes} likes`
    updateLikes(toy)
    }) 


}

const addToys = toys => {
  toys.forEach(toy => addNewToy(toy))
}

getToys()
.then(addToys)






