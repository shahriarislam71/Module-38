// data load
const dataLoad = async (value,x) => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    const data = await fetch(url)
    const res = await data.json()
    displayLoadData(res.data.tools,value,x)
}

// displaying load data 
const displayLoadData = (data,value,x) => {
    const spinner = document.getElementById('spinner')
    spinner.classList.remove('d-none')
    const loadDataDiv = document.getElementById('loadData')
    const showMorebtn = document.getElementById('showMore')
    const showLessbtn = document.getElementById('showLess')
    if(value){
        data = data.slice(0,value)
        showLessbtn.classList.add('d-none')
        showMorebtn.classList.remove('d-none')
    }
    else{
        showLessbtn.classList.remove('d-none')
        showMorebtn.classList.add('d-none')
    }
    loadDataDiv.innerHTML = ''
    if(!x){
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
                            <i class="fa-solid fa-arrow-right-long arrowIcon rounded-circle" data-bs-toggle="modal" data-bs-target="#staticBackdrop"></i>
                        </div>
                    </div>
                </div>
            </div>
            `
            loadDataDiv.appendChild(createDiv)
            spinner.classList.add('d-none')
        });
    }
    else{
        function sortFunction(a,b){  
            var dateA = new Date(a.published_in).getTime();
            var dateB = new Date(b.published_in).getTime();
            return dateA > dateB ? 1 : -1;  
        }; 
        
        var array = data
        array.sort(sortFunction);
        console.log(array)
        displayLoadData(array,0,false)
    }

}

// see more btn 
const seeMoreBtn = () =>{
    dataLoad(0,false)
}

// see less btn 
const seeLessBtn = ()=>{
    dataLoad(6,false)
}

// sort by date btn 
document.getElementById('sortButtonid').addEventListener('click',function(){
    dataLoad(0,true)
})


dataLoad(6,false)