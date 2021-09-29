let array = [];
let randomArray = [];
function createNewArray(asize = 60) {
  deleteBars();
  // creating an array of random numbers
  array = [];

  for (let i = 0; i < asize; i++) {
    var x = parseInt(Math.floor(Math.random() * 1000) + 1);
    array.push(x);
  }
 
  console.log(array);
  
  const Bars = document.querySelector("#Bars");
  for (let i = 0; i < asize; i++) {
    const bar = document.createElement("div");
    bar.classList.add("bar");
    bar.id=`i${i}`;
    
    bar.innerHTML = `${array[i]}`;
    //bar.innerHTML.value = `${array[i]}`;
    Bars.appendChild(bar);
  }
  
 
}


function deleteBars() {
  const bar = document.querySelector("#box");
  bar.innerHTML = "";

}

//   /*

// function insertionSort(){
//     console.log('In insertion()');
//     const ele = document.querySelectorAll(".bar");
//     // color
//     ele[0].style.background = 'green';
//     for(let i = 1; i < ele.length; i++){
//         console.log('In ith loop');
//         let j = i - 1;
//         let key = ele[i].style.height;
//         // color
//         ele[i].style.background = 'blue';

//        /// await waitforme(delay);

//         while(j >= 0 && (parseInt(ele[j].style.height) > parseInt(key))){
//             console.log('In while loop');
//             // color
//             ele[j].style.background = 'blue';
//             ele[j + 1].style.height = ele[j].style.height;
//             j--;

//            // await waitforme(delay);

//             // color
//             for(let k = i; k >= 0; k--){
//                 ele[k].style.background = 'green';
//             }
//         }
//         ele[j + 1].style.height = key;
//         // color
//         ele[i].style.background = 'green';
//     }
// }