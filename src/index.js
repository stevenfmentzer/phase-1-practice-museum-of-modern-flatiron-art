const exhibitTitle = document.getElementById("exhibit-title")
const buyTicketsButtonElement = document.getElementById("buy-tickets-button")
const ticketsBought = document.getElementById("tickets-bought")
const exhbitDescriptionElement = document.getElementById("exhibit-description")
const exhibitImage = document.getElementById("exhibit-image")
const commentsSection = document.getElementById("comments-section")
const featuringArtist = document.getElementsByClassName("two-columns")[0].querySelector('h3')
const commentForm = document.getElementById("comment-form")
let exhibitComments

function addExhibit(exhibit){
    displayExhibit(exhibit)
    exhibitComments.forEach(comment => {
        addComment(comment)
    })
}

function displayExhibit(exhibit){
    exhibitTitle.textContent = exhibit.title
    exhibitImage.src = exhibit.image
    exhbitDescriptionElement.textContent = exhibit.description
    ticketsBought.textContent = `${exhibit.tickets_bought} Tickets Bought`
    featuringArtist.innerText = `Currently Featuring: ${exhibit.artist_name}`
    exhibitComments = exhibit.comments
}

function addComment(comment){
    nextComment = document.createElement('p')
    nextComment.textContent = comment
    commentsSection.appendChild(nextComment)
}

function patchNewComment(commentInput){
    const data = {"comments" : exhibitComments.concat(commentInput)}

    fetch("http://localhost:3000/current-exhibits/1", {
        method: 'PATCH', 
        headers: { 
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
}

commentForm.addEventListener('submit', event =>{
    event.preventDefault()
    const commentInput = document.getElementsByName("comment-input")[0].value
    addComment(commentInput)
    patchNewComment(commentInput)
    commentForm.reset()
})

buyTicketsButtonElement.addEventListener('click',() => {
    const tickCount = Number(ticketsBought.textContent.split(" ")[0]) + 1
    const data = {"tickets_bought" : tickCount}

    fetch("http://localhost:3000/current-exhibits/1", {
        method: 'PATCH', 
        headers: { 
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    ticketsBought.textContent = `${tickCount} Tickets Bought`
})

fetch("http://localhost:3000/current-exhibits")
.then(response => response.json())
.then(exhibitList => { 
    exhibitList.forEach(exhibit => {
        addExhibit(exhibit)
    })
})
