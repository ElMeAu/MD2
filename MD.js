class Storage{
    constructor (title, amount = 0, maxAmount = 100) {
        this.amount = amount
        this.maxAmount = maxAmount
        this.title = title
    }

    plusAmount(amount) {
        if(this.amount + parseInt(amount) > this.maxAmount) {
            this.amount = this.maxAmount
            return
        }
            this.amount += parseInt(amount)
            console.log(this.amount)
    }

    setMax(maxAmount){
        this.maxAmount = parseInt(maxAmount)
        console.log(this.maxAmount)
    }
}

let items = []

function addNewItem(title) {
    if(title == ""){
        return
        
    }
    
    let obj = new Storage(title)
    items.push(obj)
    

    let tl = gsap.timeline({
        repeat: 0, 
        repeatDelay: 3
        });
    
    tl.to(".inputPlace",{ 
        width: 0,
        duration: 0.3 
        });

    addDiv(obj,tl)

    tl.to(".inputPlace", {
         width : "100%", 
         duration: 0.3, 
         onStart: function() { document.querySelector('#Input').value = "" } })
    
}

function addDiv(obj,tl) {

    // dalvenais div
    let div = document.createElement("div")
    div.innerHTML = obj.title
    div.setAttribute("class", "newDiv")
    document.body.appendChild(div)

    tl.from( div, {
        opacity: 0, 
        x: 300, 
        duration: 1
      })

    tl.to(div, {
        height: "auto", 
        duration: 0.3
    })
    
    
    let progressValue = document.createElement("div")
    div.appendChild(progressValue)
   
    //div % tukš
    let progressBar = document.createElement("div")
    progressBar.setAttribute("class", "bar")
     progressValue.appendChild(progressBar)
   
    //% div fill
    let percBar = document.createElement("div")
    percBar.setAttribute("class", "prec")
    progressBar.appendChild(percBar)
   
    //inputs jaunajām vērtībām
    let value = document.createElement("input")
     value.setAttribute("class", "box")
    progressValue.appendChild(value)
   
    // div add input+btn
    let divAddB = document.createElement("div")
    divAddB.setAttribute("class", "add")
    div.appendChild(divAddB)

    let ADD = document.createElement("input")
    ADD.setAttribute("class","inputAdd")
    divAddB.appendChild(ADD)
     
    let addBtn = document.createElement("button")
    addBtn.innerHTML = "Add"
    addBtn.setAttribute("class", "addBtn")
    addBtn.onclick = function() {
        obj.plusAmount(ADD.value)
        progress(percBar, obj)
        value.value = obj.amount
    }
    divAddB.appendChild(addBtn)
    
    let maxAndBtn = document.createElement("div")
    maxAndBtn.setAttribute("class","max")
    div.appendChild(maxAndBtn)

    let setMax = document.createElement("input")
    setMax.value = obj.maxAmount
    setMax.setAttribute("class","maxInput")
    maxAndBtn.appendChild(setMax)

    let max = document.createElement("button")
    max.innerHTML = "Max"
    max.setAttribute("class", "maxBtn")
    max.onclick = function() {
        obj.setMax(setMax.value)
        progress(percBar, obj)
    }
    maxAndBtn.appendChild(max)
}

function progress(percBar, obj) {
    let percentage = (obj.amount / obj.maxAmount)*100
    percBar.style.width = percentage + "%"
}
