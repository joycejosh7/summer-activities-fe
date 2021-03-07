const baseUrl =  "http://localhost:3000/activities"
const form = document.getElementById("activityform")
form.addEventListener("submit", handleSubmit)
const container = document.getElementById("container")
const ul = document.getElementById("activity-area")

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
        .then(data => putActivityOnDom(data))
}

function getAllActivities() {
    fetch(baseUrl)
    // the result from baseURL is NOT JSON it's a String
    .then(r => r.json())
    .then(handleActivities)
}

function handleActivities(activitiesArr) {
    activitiesArr.forEach(a => {
        putActivityOnDom(a)
    })
}

