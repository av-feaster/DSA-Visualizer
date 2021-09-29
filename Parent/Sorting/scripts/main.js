var arr=[];

var a_size=50;
newArray(a_size);
//size
let aLength=document.querySelector('#array_size');
var arrayValue=document.querySelector(`#arrayValue`);
aLength.oninput= function(){
  arrayValue.innerHTML = this.value;
  a_size= arrayValue.innerHTML ;
  createBars(a_size);
}

let delay = 260;
let delayElement = document.querySelector('#sort_speed');

// Event listener to update delay time 
delayElement.addEventListener('input', function(){
    console.log(delayElement.value, typeof(delayElement.value));
    delay = 320 - parseInt(delayElement.value);
});

// Used in async function so that we can so animations of sorting, takes input time in ms (1000 = 1s)
function delayIt(milisec) { 
    return new Promise(resolve => { 
        setTimeout(() => { resolve('') }, milisec); 
    }) 
}

/*
aLength.addEventListener('input', function(){
  console.log(aLength.value, typeof(aLength.value));
  createBars(parseInt(aLength.value));
});

*/
//speed
var a_speed;
var sortSpeed=document.querySelector(`#sort_speed`);
var selectSpeed=document.querySelector(`#selectSpeed`)
sortSpeed.oninput= function(){
  selectSpeed.innerHTML = this.value;
  a_speed= selectSpeed.innerHTML
}

function arrayGenerator(NoofBars=50){
    
    deleteBars();
    arr=[];
    while(arr.length<NoofBars)
    {
    var r = Math.floor(Math.random() * NoofBars) + 1;
        if(arr.indexOf(r) === -1) arr.push(r);

    
    }    console.log(arr);

}


function newArray(){
  createBars(a_size);
}
 
//create Bars
function createBars(NoofBars=50){
  
  arrayGenerator(NoofBars);

  var  barGenerator=document.getElementById(`Bars`);

  for(let i=0 ;i<NoofBars;i++){
      var bar = document.createElement("div");
      bar.style.height=`${arr[i]*3}px`;
      bar.classList.add("bar");
      bar.classList.add("flex-item");
      bar.id =`barNo${i}`;
      bar.innerHTML = `${arr[i]*3}`;
      barGenerator.appendChild(bar);
}


}

function deleteBars() {
  const bar = document.querySelector("#Bars");
  bar.innerHTML = '';
}
