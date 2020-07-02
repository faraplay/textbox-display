
/**@type{HTMLCanvasElement} */
var canvas;
/**@type{CanvasRenderingContext2D} */
var ctx;
var canvasx;
var canvasy;

function drawProvidedString() {
    drawString(document.getElementById("textinput").value);
}

/**
 * 
 * @param {string} text 
 */
function drawString(text) {
    if (spritesLoaded) {
        currentBoxes = null;
        disableButtons();
        document.getElementById("indexLabel").innerHTML = "-";
        canvas = document.getElementById("canvas");
        ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvasx = 32;
        canvasy = 32;
        var charArray = text.split("");
        charArray.forEach(drawChar);
    }
}

/**
 * 
 * @param {string} char 
 */
function drawChar(char) {
    drawNum(char.codePointAt(0));
}

/**
 * 
 * @param {number} n 
 */
function drawNum(n) {
    if (n == 10) {
        canvasx = 32;
        canvasy += 32;
    } else {
        var chardata = sprites[n];
        if (!chardata) {
            chardata = sprites[12539];
        }
        ctx.drawImage(chardata.bitmap, 
            canvasx + chardata.offsetx,
            canvasy + chardata.offsety);
        canvasx += chardata.width;
    }
}

/**
 * 
 * @param {number[]} array 
 * @param {boolean} clear 
 * @param {number} posx 
 * @param {number} posy 
 */
function drawNumArray(array, clear = true, posx = 32, posy = 32)
{
    canvasx = posx;
    canvasy = posy;
    if (clear) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    array.forEach(drawNum);
}

/**@type{number} */
var currentIndex = 0;
/**@type{{id:number, speaker:string, message:string}[]} */
var currentBoxes = [];

function parseProvidedString()
{
    if (spritesLoaded) {
        currentBoxes = parseLine(document.getElementById("textinput").value);
        if (currentBoxes == null) {
            document.getElementById("indexLabel").innerHTML = "Error parsing text!";
        } else {
            currentIndex = 0;
            drawCurrentBox();
        }
    }
}

function drawCurrentBox()
{
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    drawBox(currentBoxes[currentIndex]);
    document.getElementById("indexLabel").innerHTML = currentBoxes[currentIndex].id;
    disableButtons();
}

/**
 * 
 * @param {{id: number, speaker: string, message: string}} box 
 */
function drawBox(box)
{
    drawNumArray(encode(box.speaker), true, 32, 64);
    drawNumArray(encode(box.message), false, 32, 112);
}



function disableButtons()
{
    document.getElementById("btnPrev").disabled = !(currentBoxes && currentIndex - 1 >= 0 && currentIndex - 1 < currentBoxes.length);
    document.getElementById("btnNext").disabled = !(currentBoxes && currentIndex + 1 >= 0 && currentIndex + 1 < currentBoxes.length);
}

function prevBox()
{
    if (currentBoxes && currentIndex - 1 >= 0 && currentIndex - 1 < currentBoxes.length) {
        currentIndex -= 1;
        drawCurrentBox();
    } else {
        disableButtons();
    }
}

function nextBox()
{
    if (currentBoxes && currentIndex + 1 >= 0 && currentIndex + 1 < currentBoxes.length) {
        currentIndex += 1;
        drawCurrentBox();
    } else {
        disableButtons();
    }
}

disableButtons();