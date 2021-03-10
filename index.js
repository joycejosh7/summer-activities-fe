const baseUrl =  "http://localhost:3000/activities"
const form = document.getElementById("activityform")
form.addEventListener("submit", handleSubmit)
const container = document.getElementById("container")
const ul = document.getElementById("activity-area")
const sortButton = document.getElementById("sort")
sortButton.addEventListener("click", handleSort)
const searchButton = document.getElementById("searchButton")
searchButton.addEventListener("click", handleSearch)
const randomButton = document.getElementById("random")
randomButton.addEventListener("click", handleRandom)

document.addEventListener("DOMContentLoaded", init)

function init() {
    getAllActivities()
}

function handleSubmit(e) {
    e.preventDefault()
    const activityInfo = {
        title: e.target[0].value,
        creator: e.target[1].value,
        description: e.target[2].value
    }
    // by default Fetch makes a GET request, if you want to make any other request you HAVE to tell it what kind
    fetch(baseUrl, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(activityInfo)
    })
        .then(r => r.json())
        .then(a => {
            let activity = new Activity(a.id, a.title, a.description, a.creator)
            activity.putActivityOnDom()
        })
}

function getAllActivities() {
    fetch(baseUrl)
    // the result from baseURL is NOT JSON it's a String
    .then(r => r.json())
    .then(data => {
        data.forEach(a => {
            let activity = new Activity(a.id, a.title, a.description, a.creator)
            activity.putActivityOnDom()
        })
    })
}

function handleSort(e) {
    let activities = Activity.all.slice()
    let sortedArray = activities.sort(function(a, b) {

        let nameA = a.title.toUpperCase(); // ignore upper and lowercase
        let nameB = b.title.toUpperCase(); // ignore upper and lowercase

        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
      
        // names must be equal
        return 0;
      })

      // setting innerHTML to "" will clear out the whole tag it self and the contents that are inside of it 
      ul.innerHTML = ""

      // allows us to use the sorted Array and for each one post it onto the dom
      sortedArray.forEach(a => {
          a.putActivityOnDom()
      })
}

function handleSearch(e) {
    let inputValue = document.getElementById("search").value
    let filteredArray = Activity.all.filter(a => {
        return a.creator.toUpperCase() === inputValue.toUpperCase()
    })
        
        ul.innerHTML = ""

        filteredArray.forEach(a => {
            a.putActivityOnDom()
        })
}

// function handleRandom(e) {
//     e.preventDefault()
//     let item = Activity.all[Math.floor(Math.random() * Activity.all.length)] 
//     ul.innerHTML = ""    
//     item.putActivityOnDom()
// }

function handleRandom() {
    fetch(baseUrl)
    .then(r => r.json())
    .then(data => {
            let item = Activity.all[Math.floor(Math.random() * Activity.all.length)]
            ul.innerHTML = ""
            item.putActivityOnDom() 
        })
    
}



// function deleteActivity(e) {
//     e.preventDefault()

//     let id = e.target.dataset.id

//     fetch(baseUrl + `/${this.id}`, {
//         method: "DELETE"
//     })
//     .then (function(resp) {
//         return resp.json()
//     })
//     .then(function(data) {
//         debugger
//     })
// }