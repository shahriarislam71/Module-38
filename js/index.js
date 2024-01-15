// data load
const dataLoad = async (value) => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    const data = await fetch(url)
    const res = await data.json()
    displayLoadData(res.data.tools,value)
}

// displaying load data 
const displayLoadData = (data,value) => {
    const loadDataDiv = document.getElementById('loadData')
    const showMorebtn = document.getElementById('showMore')
    const showLessbtn = document.getElementById('showLess')
    if(value){
        data = data.slice(0,value)
    }
    else{
        showLessbtn.classList.remove('d-none')
        showMorebtn.classList.add('d-none')
    }
    loadDataDiv.innerHTML = ''
    data.forEach(element => {
        console.log(element)
        const createDiv = document.createElement('div')
        createDiv.classList.add('col')
        createDiv.innerHTML = `
        <div class="card h-100">
            <img class='p-3' src="${element.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">Features</h5>
                <p class="card-text">
                1. ${element.features[0] ? element.features[0] : "No data found"} <br>
                2. ${element.features[1] ? element.features[1] : "No data found"} <br>
                3. ${element.features[2] ? element.features[2] : "No data found"}
                </p>
                <hr>
                <h5 class="card-title mt-3">${element.name ? element.name : "Name is not found"}</h5>
                <p class='card-title'>${element.published_in ? element.published_in : "Date is not found"}</p>
            </div>
        </div>
        `
        loadDataDiv.appendChild(createDiv)
    });
}

const seeMoreBtn = () =>{
    dataLoad()
}

dataLoad(6)