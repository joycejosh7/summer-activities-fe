const baseUrl =  "http://localhost:3000/activities"
const form = document.getElementById("activityform")
form.addEventListener("submit", handleSubmit)
const container = document.getElementById("container")
const ul = document.getElementById("activity-area")
const sortButton = document.getElementById("sort")
sortButton.addEventListener("click", handleSort)
const randomButton = document.getElementById("random")
randomButton.addEventListener("click", handleRandom)
const searchButton = document.getElementById("searchButton")
searchButton.addEventListener("click", (e) => quicksearch(e))



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

    e.target.reset()
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
        ul.innerHTML = ""
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


function handleRandom() {
    let item = Activity.all[Math.floor(Math.random() * Activity.all.length)] 
    ul.innerHTML = ""  
    item.putActivityOnDom()
}


function deleteActivity(e) {
    e.preventDefault()
    
    let id = e.target.dataset.id
    
    fetch(baseUrl + `/${id}`, {
        method: "DELETE",
        
    })
    
    .then (resp => {
        return resp.json()
    })
    .then(data => {
        const activity = Activity.all.find(activity => activity.id === data.id)
        activity.container.remove()
    })
}


function quicksearch(){
    const inputValue = document.getElementById("searchBar").value
    const filteredActivities = Activity.all.filter(a => {
        return (a.creator.toLowerCase() === inputValue.toLowerCase()
        )
    })
    ul.innerHTML = "" 
    filteredActivities.map(a => {
        a.putActivityOnDom()
    })
}




