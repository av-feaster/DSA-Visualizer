 function qSort() {
  let ele = document.querySelectorAll(".bar");
  let l = 0;
  let r = ele.length - 1;
  quickSort(ele, l, r);
  async function swap(el1, el2) {
    console.log("In swap()");

    el1.style.transform = "translateY(50px)";
    el1.style.background = "purple";

    el2.style.transform = "translateY(50px)";
    el2.style.background = "purple";
    await delayIt(delay);
    let temp = el1.style.height;
    el1.style.height = el2.style.height;
    el2.style.height = temp;

    let txt=el1.innerHTML;
    el1.innerHTML=el2.innerHTML;
    el2.innerHTML=txt;
    await delayIt(delay);

    el2.style.transform = "translateY(0)";
    el1.style.transform = "translateY(0)";
    el2.style.background = "cyan";
    el1.style.background = "cyan";
  }

  /* This function takes last element as pivot, places
   the pivot element at its correct position in sorted
    array, and places all smaller (smaller than pivot)
   to left of pivot and all greater elements to right
   of pivot */
  async function partition(ele, low, high) {
    var pivot = ele[high]; // pivot
    pivot.style.background="crimson";
    var i = low - 1; // Index of smaller element
     //color the partion arrray
     for (var j = low; j <= high - 1; j++) {
        ele[j].style.background="pink";
        
      }
    for (var j = low; j <= high - 1; j++) {
      // If current element is smaller than or
      // equal to pivot
      if (parseInt(ele[j].style.height) <= parseInt(pivot.style.height)) {
        i++; // increment index of smaller element
       await swap(ele[i], ele[j]);
      }
    }
    for (var j = low; j <= high - 1; j++) {
        ele[j].style.background="cyan";
        
      }


    await delayIt(delay);
    ele[i+1].style.transform = "translateY(20)";
    ele[high].style.transform = "translateY(20)";
    ele[i+1].style.background = "pink";
    ele[high].style.background = "pink";
   

    await delayIt(delay);
    await swap(ele[i + 1], ele[high]);
    await delayIt(delay);

    ele[i+1].style.transform = "translateY(0)";
    ele[high].style.transform = "translateY(0)";

      // color
    
 
    return i + 1;
  }

  /* The main function that implements QuickSort
 arr[] --> Array to be sorted,
  low  --> Starting index,
  high  --> Ending index */
  async function quickSort(ele, low, high) {
    if (low < high) {
      /* pi is partitioning index, arr[p] is now
           at right place */
      var pivot = await partition(ele, low, high);
       await delayIt(delay);
      // Separately sort elements before
      // partition and after partition
      await quickSort(ele, low, pivot - 1);
      await quickSort(ele, pivot + 1, high);
    }

    else{
       for(var k=0 ;k<ele.length;k++)
       {
           ele[k].style.background = "lightgreen";

       }
    }
  }
}
