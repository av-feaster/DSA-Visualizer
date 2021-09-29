 async function selectionSort()
{
  const ele=document.querySelectorAll(".bar");
  var minindex=0;
  for(var i=0;i<ele.length-1;i++)
  {
      minindex=i;
      ele[minindex].style.background="blue";
      await delayIt(delay);
      for(var j=i+1;j<ele.length;j++)
      {
        var val1=parseInt(ele[j].style.height);
        var val2=parseInt(ele[minindex].style.height);
        if(val1<val2)
        {
          minindex=j;
        }
      }
      /*await new Promise((resolve) =>
        setTimeout(() => {
          resolve();
        }, 600)
      );*/
      /*for(var j=i+1;j<ele.length;j++)
      {
        if(j!=minindex)
        ele[j].style.background="red";
      }*/
      await delayIt(delay);
      ele[minindex].style.background="yellow";
      await delayIt(delay*5);

      var temp=ele[minindex].style.height;
      ele[minindex].style.height=ele[i].style.height; 
      ele[i].style.height=temp;
      //changing the color of ith block to yellow after swapping of ith and minindex
      ele[i].style.background="green";
      await delayIt(delay);
      
      //after placing one bars rest of the bars has been colored to skyblue
     for(var j=i+1;j<ele.length;j++)
      {
        ele[j].style.background="skyblue";
      }

  }
  await delayIt(delay);
  ele[ele.length-1].style.background="yellow";
}