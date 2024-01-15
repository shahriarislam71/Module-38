// data load
const dataLoad = async () => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    const data = await fetch(url)
    const res = await data.json()
    displayLoadData(res.data.tools)
}

// displaying load data 
const displayLoadData = (data) => {
    const loadDataDiv = document.getElementById('loadData')
    data = data.slice(0,6)
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
                
            </div>
        </div>
        `
        loadDataDiv.appendChild(createDiv)
    });
}



dataLoad()