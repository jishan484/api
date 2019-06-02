var grid;
var cols;
var rows;
var w = 30;
var mouseclick=false;

var totalBees = 120;


function setup()
{
	var max=110;var min=85;
    var cols=23;var rows=16;var totalBees=Math.floor(Math.random() * (+max - +min)) + +min;
    var options = [];
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      options.push([i, j]);
    }
  }

var ans=[];
  for (var n = 0; n < totalBees; n++) {
    var index = floor(random(options.length));
    var choice = options[index];
    var i = choice[0];
    var j = choice[1];
    // Deletes that spot so it's no longer an option
    options.splice(index, 1);
    ans.push([i,j]);
  }
  console.log(ans[0][2]);
}


function draw() {
  background(255);
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].show();
    }
  }
}


function make2DArray(cols, rows) {
  var arr = new Array(cols);
  for (var i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

function handOver() {
  //not game over chance goes to player 2
}

function mousePressed() {
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      if (grid[i][j].contains(mouseX, mouseY) && mouseclick===true) {
        grid[i][j].reveal();
        //if a bee then call handover and give chance to 2nd player
        if (grid[i][j].bee) {
          handOver();
        }
      }
    }
  }
}
function count()
{
	for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].countBees();
    }
  }
}
function beeopt()
{
	  var options = [];
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      options.push([i, j]);
    }
  }


  for (var n = 0; n < totalBees; n++) {
    var index = floor(random(options.length));
    var choice = options[index];
    var i = choice[0];
    var j = choice[1];
    // Deletes that spot so it's no longer an option
    options.splice(index, 1);
    grid[i][j].bee = true;
  }


    /*
    socket.on('options', function(var){
          console.log(msg);
    });
    */
}