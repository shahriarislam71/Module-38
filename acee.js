const array1 = ['12/1/2020','11/1/2005']
array1.sort()
console.log(array1)

function sortFunction(a,b){  
    var dateA = new Date(a.date).getTime();
    var dateB = new Date(b.date).getTime();
    return dateA > dateB ? 1 : -1;  
}; 

var array = [{id: 1,date: "5/12/2023"}, {id: 2, date: "13/12/2023"},{id: 3,date: "6/12/2020"},{id: 4,date: "3/12/2016"},{id: 5,date: "9/12/2022"}];
array.sort(sortFunction);
console.log(array)