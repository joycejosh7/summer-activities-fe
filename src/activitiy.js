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
        let p3 = document.createElement("p")
        
        p1.innerText = this.title
        p2.innerText = this.description
        p3.innerText = this.creator
    
        li.append(p1, p2, p3)
        div.append(li)
        ul.append(div)
    }
}