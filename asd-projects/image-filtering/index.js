// This is a small program. There are only two sections. This first section is what runs
// as soon as the page loads.
$(document).ready(function () {
  render($("#display"), image);
  $("#apply").on("click", applyAndRender);
  $("#reset").on("click", resetAndRender);
});

/////////////////////////////////////////////////////////
//////// event handler functions are below here /////////
/////////////////////////////////////////////////////////

// this function resets the image to its original value; do not change this function
function resetAndRender() {
  reset();
  render($("#display"), image);
}

// this function applies the filters to the image and is where you should call
// all of your apply functions
function applyAndRender() {
  // Multiple TODOs: Call your apply function(s) here
applyFilter(reddify);
applyFilterNoBackground(decreaseBlue)
applyFilterNoBackground(increaseGreenByBlue)
  // do not change the below line of code
  render($("#display"), image);
}

/////////////////////////////////////////////////////////
// "apply" and "filter" functions should go below here //
/////////////////////////////////////////////////////////

// TODO 1, 2 & 4: Create the applyFilter function here
function applyFilter(filterFunction){
for (let r=0;r<image.length;r++){
  const row=image[r];
  for (let c=0;c<row.length;c++){
    let rgbString=image[r][c];
    let rgbNumbers=rgbStringToArray(rgbString);
    filterFunction(rgbNumbers)
    rgbString=rgbArrayToString(rgbNumbers)
    image[r][c]=rgbString;
  }
}
}

// TODO 7: Create the applyFilterNoBackground function
function applyFilterNoBackground(filterFunction){
  for (let r=0;r<image.length;r++){
    const row=image[r];
    let backgroundColor=image[0][0]
    for (let c=0;c<row.length;c++){
      let rgbString=image[r][c];
      if (rgbString!==backgroundColor){
        
        let rgbNumbers=rgbStringToArray(rgbString);
        filterFunction(rgbNumbers)
        rgbString=rgbArrayToString(rgbNumbers)
        image[r][c]=rgbString;
      }
      
    }
}
}

// TODO 5: Create the keepInBounds function
function keepInBounds(num){
  var temp1=(num<0) ? num=0:num
  var temp2=(temp1>255)? temp1=255:temp1
  return temp2
}

// TODO 3: Create reddify function
function reddify(array){
  array[RED]=200
}

// TODO 6: Create more filter functions
function decreaseBlue(array){
  array[BLUE]=keepInBounds(array[BLUE]-50)
}
function increaseGreenByBlue(array){
  array[GREEN] = keepInBounds(array[BLUE] + array[GREEN]);
}


// CHALLENGE code goes below here
