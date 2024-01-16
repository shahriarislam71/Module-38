// data load
const dataLoad = async (value, x) => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    const data = await fetch(url)
    const res = await data.json()
    displayLoadData(res.data.tools, value, x)
}

// displaying load data 
const displayLoadData = (data, value, x) => {
    const spinner = document.getElementById('spinner')
    spinner.classList.remove('d-none')
    const loadDataDiv = document.getElementById('loadData')
    const showMorebtn = document.getElementById('showMore')
    const showLessbtn = document.getElementById('showLess')
    if (value) {
        data = data.slice(0, value)
        showLessbtn.classList.add('d-none')
        showMorebtn.classList.remove('d-none')
    }
    else {
        showLessbtn.classList.remove('d-none')
        showMorebtn.classList.add('d-none')
    }
    loadDataDiv.innerHTML = ''
    if (!x) {
        data.forEach(element => {
            const createDiv = document.createElement('div')
            createDiv.classList.add('col')
            createDiv.innerHTML = `
            <div class="card h-100">
                <img class='p-3' src="${element.image}" class="card-img-top" alt="Image is not found">
                <div class="card-body">
                    <h5 class="card-title">Features</h5>
                    <p class="card-text">
                    1. ${element.features[0] ? element.features[0] : "No data found"} <br>
                    2. ${element.features[1] ? element.features[1] : "No data found"} <br>
                    3. ${element.features[2] ? element.features[2] : "No data found"}
                    </p>
                    <hr>
                    <div class='d-sm-flex justify-content-between align-items-center'>
                        <div>
                            <h5 class="card-title ">${element.name ? element.name : "Name is not found"}</h5>
                            <p class='card-title'>
                            <i class="fa-regular fa-calendar-days calender"></i>
                            ${element.published_in ? element.published_in : "Date is not found"}
                            </p>
                        </div>
                        <div>
                            <i onclick='loadModalData("${element.id}")' class="fa-solid fa-arrow-right-long arrowIcon rounded-circle" data-bs-toggle="modal" data-bs-target="#staticBackdrop"></i>
                        </div>
                    </div>
                </div>
            </div>
            `
            loadDataDiv.appendChild(createDiv)
            spinner.classList.add('d-none')
        });
    }
    else {
        function sortFunction(a, b) {
            var dateA = new Date(a.published_in).getTime();
            var dateB = new Date(b.published_in).getTime();
            return dateA > dateB ? 1 : -1;
        };

        var array = data
        array.sort(sortFunction);
        console.log(array)
        displayLoadData(array, 0, false)
    }

}

// see more btn 
const seeMoreBtn = () => {
    dataLoad(0, false)
}

// see less btn 
const seeLessBtn = () => {
    dataLoad(6, false)
}

// sort by date btn 
document.getElementById('sortButtonid').addEventListener('click', function () {
    dataLoad(0, true)
})


// loadmodaldata
const loadModalData = async (id) => {
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`
    const data = await fetch(url)
    const res = await data.json()
    displayLoadModalData(res.data)
}

const displayLoadModalData = (data) => {
    console.log(data)
    const cardDescription = document.getElementById('card-description')
    cardDescription.innerText = data.description
    const column1 = document.getElementById('col-1')
    column1.innerHTML = `
    <p>${data.pricing[0].price === '0' || data.pricing[0].price === 'No cost' ? "Free of cost/" : data.pricing[0].price} <br>
    ${data.pricing[0].plan ? data.pricing[0].plan : "Free of cost/"}
    </p>
    `
    const column2 = document.getElementById('col-2')
    column2.innerHTML = `
    <p>${data.pricing[1].price === '0' || data.pricing[1].price === 'No cost' ? "Free of cost/" : data.pricing[1].price}
    ${data.pricing[1].plan ? data.pricing[1].plan : "Free of cost/"}
    </p>
    `
    const column3 = document.getElementById('col-3')
    column3.innerHTML = `
    <p>${data.pricing[2].price === '0' || data.pricing[2].price === 'No cost' ? "Free of cost/" : data.pricing[2].price}
    ${data.pricing[2].plan ? data.pricing[2].plan : "Free of cost/"}
    </p>
    `
    // for features
    const enterpriseId = document.getElementById('enterpriseId')
    console.log(data.features)
    enterpriseId.innerHTML = `
    <h1>Features</h1><br>
    <ul>
    <li>'${data.features[1].feature_name}'</li>
    <li>'${data.features[2].feature_name}'</li>
    <li>'${data.features[3].feature_name}'</li>
    </ul>    
    `
    // for integration
    const integrationId = document.getElementById('integrationId')
    integrationId.innerHTML = ''
    integrationId.innerHTML = `
    <h1>Integration</h1><br>
    `
    for (let i of data.integrations) {
        const integration = document.createElement('ul')
        integration.classList.add('integrations')
        integration.innerHTML = `
        <li>${i}</li>
        `
        integrationId.appendChild(integration)
    }

    // for part-2
    const mainDiv = document.getElementById('part-2')
    const newDiv = document.createElement('div')
    newDiv.classList.add('col')
    mainDiv.innerHTML = ''
    newDiv.innerHTML = `
    <div class="card h-100">
      <img  src="${data.image_link[0]}" class="card-img-top" alt="...">
      <div class='card-img-overlay'>
          <button class='position-absolute top-25 end-0 imgbtn border-0'>${data.accuracy.score*100}% accuracy</button>
      </div>
      <div class="card-body">
        <h5 class="card-title">${data.input_output_examples[0].input}</h5>
        <p class="card-text">${data.input_output_examples[0].output}</p>
      </div>
    </div>
    `
    mainDiv.appendChild(newDiv)
}

dataLoad(6, false)