//import {binarySearch} from '../navbar/binarySearch';
//import  linearSearch from './linearSearch'

var keyToFind = 1;
let key = document.getElementById("inputkey");
key.oninput = function () {
  keyToFind = parseInt(this.value);
};

let arraySize = document.querySelector("#size");

// Event listener to update the bars on the UI
var size;
arraySize.oninput = function () {
  size = this.value;

  createNewArray(size);
};
function selectionSort(inputArr) {
  let n = inputArr.length;

  for (let i = 0; i < n; i++) {
    // Finding the smallest number in the subarray
    let min = i;
    for (let j = i + 1; j < n; j++) {
      if (inputArr[j] < inputArr[min]) {
        min = j;
      }
    }
    if (min != i) {
      // Swapping the elements
      let tmp = inputArr[i];
      inputArr[i] = inputArr[min];
      inputArr[min] = tmp;
    }
  }
  return inputArr;
}
// Default input for waitforme function (260ms)
let delay = 260;
let delayElement = document.querySelector("#speed");

// Event listener to update delay time
delayElement.addEventListener("input", function () {
  console.log(delayElement.value, typeof delayElement.value);
  delay = 320 - parseInt(delayElement.value);
});

// Used in async function so that we can so animations of sorting, takes input time in ms (1000 = 1s)
function waitforme(milisec) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("");
    }, milisec);
  });
}

//generating array

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
  console.log("randomgen " + array);
  for (let k = 0; k < array.length; k++) {
    randomArray[k] = array[k];
  }
  console.log(randomArray);
  array = selectionSort(array);
  console.log(array);
  console.log("key", keyToFind);
  const boxes = document.querySelector("#box");
  for (let i = 0; i < asize; i++) {
    const bar = document.createElement("div");
    bar.classList.add("bar");
    bar.id = `i${i}`;
    bar.innerHTML = `${array[i]}`;
    //bar.innerHTML.value = `${array[i]}`;
    boxes.appendChild(bar);
  }

  const alength = document.createElement("div");
  alength.classList.add("alength");
  alength.innerHTML = `Array Length ${array.length}`;
  boxes.appendChild(alength);
}

function shuffle(x) {
  if (x == 1) {
    console.log("shufflearray " + randomArray);
    console.log("key", keyToFind);
    for (let i = 0; i < randomArray.length; i++) {
      var change = document.getElementById(`i${i}`);
      console.log(change);
      change.innerText = parseInt(randomArray[i]);
      change.style.background = "lightcoral";
    }
  } else if (x == 2) {
    console.log("Array " + array);
    console.log("key", keyToFind);
    for (let i = 0; i < array.length; i++) {
      var change = document.getElementById(`i${i}`);
      console.log(change);
      change.innerText = parseInt(array[i]);
      change.style.background = "lightcoral";
    }
  }
}
function deleteBars() {
  const bar = document.querySelector("#box");
  bar.innerHTML = "";
}

var position = -1;
var flag = 1;
async function binarySearch() {
  flag = 1;
  const element = document.querySelectorAll(".bar");
  const Key = document.getElementById("key");

  element.forEach(async (element, index) => {
    element.style.background = "lightcoral";
    await waitforme(delay);
    await waitforme(delay);
  });

  console.log(parseInt(element.length));
  var start = 0;
  var end = parseInt(element.length);
  await waitforme(3 * delay);
  while (start <= end) {
    let mid = Math.floor(start + (end - start) / 2);

    //if element is present in mid op
    var compare = parseInt(element[mid].innerHTML);
    if (compare == keyToFind) {
      console.log("mid " + element[mid] + " " + mid + " " + keyToFind);
      element[mid].style.background = "green";
      Key.style.background = "green";
      position = mid;
      flag = 0;
      break;
    } else if (compare < keyToFind) {
      element[mid].style.background = "red";
      Key.style.background = "red";
      start = mid + 1;
      await waitforme(delay);
      Key.style.background = "#22577a";
      await waitforme(delay);
      console.log("mid ", element[mid], " ", compare);
    } else {
      element[mid].style.background = "blue";
      Key.style.background = "blue";
      end = mid - 1;
      await waitforme(delay);

      Key.style.background = "#22577a";
      await waitforme(delay);
      console.log("mid ", element[mid], " ", compare);
    }
  }
  updateResult(position, flag);
  return false;
}

async function linearSearch() {
  flag = 1;
  const element = document.querySelectorAll(".bar");
  const Key = document.getElementById("key");

  element.forEach(async (element, index) => {
    element.style.background = "lightcoral";
    await waitforme(delay);
  });
  console.log(parseInt(element.length));
  var start = 0;
  var end = parseInt(element.length - 1);
  await waitforme(3 * delay);
  for (var i = 0; i <= end; i++) {
    var compare = parseInt(element[i].innerHTML);
    if (compare == keyToFind) {
      await waitforme(delay); //await
      //await
      element[i].style.background = "green";
      Key.style.background = "green";
      position = i;
      flag = 0;
      break;
    } else {
      element[i].style.background = "red";
      Key.style.background = "red";
      await waitforme(delay); //await

      Key.style.background = "#22577a";
      await waitforme(delay);
    }
  }

  updateResult(position, flag);
  return false;
}

function updateKey(keyToFind) {
  const keyItem = document.getElementById("key-v");
  keyItem.innerHTML = `${parseInt(keyToFind)}`;
}
function updateResult(position, flag) {
  const res = document.getElementById("innerRes");
  if (flag == 0) {
    console.log("element found at " + (position + 1));
    res.innerHTML = `Element Found at ${position + 1}`;
  } else {
    console.log("element not found!");
    res.innerHTML = `Element Not Found! </br>TRY AGAIN WITH DIFFERENT NO`;
  }
}

function updateInfo() {
  const Info = document.querySelector(".Info");
  for (let i = 0; i < 3; i++) {
    const info = document.createElement("div");
    info.classList.add("inf");
    info.id = `info${i}`;
    Info.appendChild(info);

    const textbox = document.createElement("span");
    textbox.classList.add("text");
    textbox.id = `t${i}`;
    Info.appendChild(textbox);

    if ((textbox.id = "t0" && info.id == "info0")) {
      textbox.innerHTML = `<ul>Represent in<li>Binary search, element may be present after current mid element.</li><li>Linear search,Element not found at current position.</li>`;
    } else if ((textbox.id = "t1" && info.id == "info1")) {
      textbox.innerHTML = `<ul>Represent in<li>Binary search, element may be present before current mid element.</li></ul>`;
    } else {
      textbox.innerHTML = `<ul>Represent Element Found</ul>`;
    }
  }
}

var footer = document.querySelector("#footer");
footer.innerHTML = `<p>Created with</p><a target="_blank" href="https://github.com/av-feaster/DSA-Visualizer.git">❤</a>`;
createNewArray(50);
updateInfo();
updateKey(1);

//code block
/*
var code = '' + 
'<code>' + 
'                    <h1>BINARY SEARCH</h1>' + 
'        ' + 
'        <p>        // C++ program to implement recursive Binary Search</p>' + 
'        <p>        #include <bits/stdc++.h></p>' + 
'        <p>        using namespace std;</p>' + 
'        <p>        </p>' + 
'        <p>        // A iterative binary search function. It returns</p>' + 
'        <p>        // location of x in given array arr[l..r] if present,</p>' + 
'        <p>        // otherwise -1</p>' + 
'        <p>        int binarySearch(int arr[], int l, int r, int x)</p>' + 
'        <p>        {</p>' + 
'        <p>            while (l <= r) {</p>' + 
'        <p>                int m = l + (r - l) / 2;</p>' + 
'        <p>        </p>' + 
'        <p>                // Check if x is present at mid</p>' + 
'        <p>                if (arr[m] == x)</p>' + 
'        <p>                    return m;</p>' + 
'        <p>        </p>' + 
'        <p>                // If x greater, ignore left half</p>' + 
'        <p>                if (arr[m] < x)</p>' + 
'        <p>                    l = m + 1;</p>' + 
'        <p>        </p>' + 
'        <p>                // If x is smaller, ignore right half</p>' + 
'        <p>                else</p>' + 
'        <p>                    r = m - 1;</p>' + 
'        <p>            }</p>' + 
'        <p>        </p>' + 
'        <p>            // if we reach here, then element was</p>' + 
'        <p>            // not present</p>' + 
'        <p>            return -1;</p>' + 
'        <p>        }</p>' + 
'        <p>        </p>' + 
'        <p>        int main(void)</p>' + 
'        <p>        {</p>' + 
'        <p>            int arr[] = { 2, 3, 4, 10, 40 };</p>' + 
'        <p>            int x = 10;</p>' + 
'        <p>            int n = sizeof(arr) / sizeof(arr[0]);</p>' + 
'        <p>            int result = binarySearch(arr, 0, n - 1, x);</p>' + 
'        <p>            (result == -1) ? cout << &#34;Element is not present in array&#34;</p>' + 
'        <p>                        : cout << &#34;Element is present at index &#34; << result;</p>' + 
'        <p>            return 0;</p>' + 
'        <p>        }</p>' + 
'        <p>        </p>' + 
'                    ' + 
'                   </code>"' + 
'' + 
'';

const CP = document.querySelector("#CP");
CP.innerHTML = code;
*/
