async function mergesort() {

    let ele = document.querySelectorAll(".bar");
    var low = 0, high = ele.length - 1;
    await msort(ele, low, high);






    async function msort(arr, l, h) {
        var mid;
        if (l < h) {
            mid = parseInt(l + (h - l) / 2);
            await msort(arr, l, mid);
            await delayIt(delay);

            await msort(arr, mid + 1, h);
            await delayIt(delay);

            await merge(arr, l, mid, h);
        }
    }
    async function merge(arr, l, mid, h) {
        var n1 = mid - l + 1;
        var n2 = h - mid;
        var left = new Array(n1);
        var right = new Array(n2);
        for (var i = 0; i < n1; i++) {
            left[i] = arr[l + i].style.height;
            arr[l + i].style.background = '#FCFFA6'
        }
        await delayIt(delay);

        for (var i = 0; i < n2; i++) {
            right[i] = arr[mid + i + 1].style.height;
            arr[mid + i + 1].style.background = '#C1FFD7'
        }
        var i = 0, j = 0, k = l;
        await delayIt(delay);

        while (i < n1 && j < n2) {
            if (parseInt(left[i]) <= parseInt(right[j])) {
                arr[k].style.height = left[i];
                i++;
                k++;
            }
            else {
                arr[k].style.height = right[j];
                k++;
                j++;
            }
        }
        while (i < n1) {
            arr[k].style.height = left[i];
            i++;
            k++;
        }
        while (j < n2) {
            arr[k].style.height = right[j];
            j++;
            k++;
        }
        await delayIt(delay);
        for (var i = 0; i < n1 + n2; i++) {
            arr[i].style.background = "green";
        }
    }
}