async function insertionSort(){

    const element= document.querySelectorAll(".bar");


    for (let i = 1; i < element.length; i++) {
        let j = i - 1;
        info(element,i,j);

        let key = element[i].style.height;
        //here we are changing the height only so no  parseInt

        element[i].style.transform = "translateY(50px)";
        element[i].style.background = "purple";
        await delayIt(delay);

        while(j >= 0 && parseInt(element[j].style.height) > parseInt(key)) {
            await delayIt(delay);
            beforeCompare(element,j, i);

            element[j + 1].style.height = element[j].style.height; //Value change

            afterCompare(element,j, i);
            await delayIt(delay*2);
            for(let x=i;x>0;x--){
                element[x].style.background = "green";
              }
              j--;

        }
        element[i].style.transform = "translateY(0px)";

        element[j + 1].style.height = key;
        element[j + 1].style.background = "purple";
        await delayIt(delay);
        element[j+1].style.background = "green";
     }
     async function beforeCompare(element,j, i) {
        element[j + 1].classList.add("blink");
        element[j].classList.add("blink");
       
        element[j + 1].style.transform = "translateY(50px)";
        element[j].style.transform = "translateY(50px)";
        element[j + 1].style.background = "crimson";
        element[j].style.background = "crimson";
        await delayIt(delay);
        element[j].style.animation = "blinker";
        
        element[0].style.background = 'green';
        await delayIt(delay/0.9);
        
      }
      
      async function afterCompare(element,j, i) {
        await delayIt(delay);
        element[j + 1].style.transform = "translateY(0px)";
        element[j].style.transform = "translateY(0px)";
      
        element[j + 1].classList.remove("blink");
        element[j].classList.remove("blink");
        //element[j].style.background = "cyan";
        //delete previous comparisons
        // const del = document.querySelectorAll(".comp");
        // del.innerHTML = "";
      }

      delinfo();

}

function info(element,i,j=0) {
    const Info = document.querySelector(".info");
    Info.innerHTML=`<span>KEY: &nbsp;</span>`
    const ai= document.createElement("div");

    ai.classList.add("flex-item");
    ai.classList.add("elekey");
    ai.style.height=`${parseInt(element[i].style.height)}px`;
    Info.appendChild(ai);

}

function delinfo() {
  const delInfo = document.querySelector(".info");
  delInfo.innerHTML=``;


}