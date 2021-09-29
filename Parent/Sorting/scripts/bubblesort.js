//bubble sorting
async function bubbleSort() {
  const ele = document.querySelectorAll(".bar");
  for (let i = 0; i < ele.length; i++) {
    await delayIt(delay);

    for (let j = 0; j < ele.length - i - 1; j++) {
      ele[j].style.background = "red";
      ele[j + 1].style.background = "red";
      if (parseInt(ele[j].style.height) > parseInt(ele[j + 1].style.height)) {
        let temp = ele[j].style.height;
        ele[j].style.height = ele[j + 1].style.height;
        ele[j + 1].style.height = temp;
      }
      await delayIt(delay);
      ele[j].style.background = "cyan";
      ele[j + 1].style.background = "cyan";
    }
    ele[ele.length - 1 - i].style.background = "green";
  }
  console.log(arr);
  ele[0].style.background = "green";
}
