class Activity {
    static all = []

    constructor(id, title, description, creator) {
        this.id = id
        this.title = title
        this.description = description
        this.creator = creator
        Activity.all.push(this)
    }

    static handleActivities(activitiesArr) {
        activitiesArr.forEach(a => {
            putActivityOnDom(a)
        })
    }

    putActivityOnDom() {

        let div = document.createElement("div")
        let li = document.createElement("li")
        let p1 = document.createElement("p")
        let p2 = document.createElement("p")
        // let deleteLink = document.createElement("a")
        let p3 = document.createElement("p")

        // deleteLink.dataset.id = this.id
        // deleteLink.setAttribute("href", "#")
        // deleteLink.innerText = "Delete"

        // deleteLink.addEventListener("click", deleteActivity)

        
        p1.innerText = this.title
        p2.innerText = this.description
        p3.innerText = this.creator
    
        li.append(p1, p2, p3)
        div.append(li)
        // div.append(deleteLink)
        ul.append(div)
        
    }

    // function deleteActivity(e) {
    //     e.preventDefault()

    //     debugger
    // }
}