

class Activity {
    static all = []
    
    constructor(id, title, description, creator) {
        this.id = id
        this.title = title
        this.description = description
        this.creator = creator
        Activity.all.push(this)
    }
    
    // static handleActivities(activitiesArr) {
    //     debugger
    //     activitiesArr.forEach(a => {
    //         putActivityOnDom(a)
    //     })
    // }

    putActivityOnDom() {

        let div = document.createElement("div")
        this.container = div
        let li = document.createElement("li")
        let p1 = document.createElement("p")
        let p2 = document.createElement("p")
        let p3 = document.createElement("p")
        let deleteLink = document.createElement("a")

        deleteLink.dataset.id = this.id
        deleteLink.setAttribute("href", "#")
        deleteLink.innerText = "Delete"

        deleteLink.addEventListener("click", deleteActivity)

        
        p1.innerText = `Title: ${this.title}`
        p2.innerText = `Description: ${this.description}`
        p3.innerText = `Creator: ${this.creator}`
    
        li.append(p1, p2, p3)
        div.append(li)
        ul.append(div)
        div.append(deleteLink)
        
    }

}