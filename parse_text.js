/**@type{string} */
var filename;

/**
 * 
 * @param {string} text 
 */
function parseLine(text)
{
    var lines = text.split('\n');
    filename = getNonCommentLine(lines);
    var boxes = [];
    /**@type{string} */
    var line;
    var broken = false;
    while (lines && lines.length > 0) {
        var box = {};

        line = getNonCommentLine(lines);
        if (!line) {
            break;
        }
        box.id = parseInt(line, 10);
        if (isNaN(box.id)) {
            broken = true;
            break;
        }

        line = getNonCommentLine(lines);
        if (line == null) {
            broken = true;
            break;
        }
        box.speaker = line;
        
        line = getNonCommentLine(lines);
        if (line == null) {
            broken = true;
            break;
        }
        var message = line;
        
        /** @type{string} */
        var msgline;
        line = getNonCommentLine(lines);
        if (line == null) {
            broken = true;
            break;
        }
        while ((msgline = line) != "$") {
            message += '\n' + msgline;
            line = getNonCommentLine(lines);
            if (line == null) {
                broken = true;
                break;
            }
        }
        box.message = message;
        boxes.push(box);
    }
    if (broken)
        return null;
    else
        return boxes;
}

/**
 * 
 * @param {string[]} lines 
 */
function getNonCommentLine(lines)
{
    /** @type{string} */
    var line;
    do {
        line = lines.shift();
    } while ((line !== null) && line.charAt(0) == "#");
    return line;
}

/**
 * 
 * @param {string} text 
 */
function encode(text) 
{
    var array = [];
    var next = 0;
    var prevk = 0;
    text.split("").forEach( function (char) {
        var k = char.codePointAt(0);
        switch (next) {
            case 3:
                if (k > 0x20 && k < 0x7F) {
                    array.push(prevk * 256 + k + 0x80);
                    next = 0;
                    return;
                } else {
                    array.push(prevk * 256);
                }
                break;
            case 2:
                if (k == 0x20 || (k > 0x60 && k < 0x7A)) {
                    array.push(prevk * 256 + k + 0x80);
                    next = 0;
                    return;
                } else {
                    array.push(prevk * 256);
                }
                break;
            case 1:
                if (k == 0x20) {
                    array.push(prevk * 256 + k + 0x80);
                    next = 0;
                    return;
                } else {
                    array.push(prevk * 256);
                }
                break;
        }
        if (k == 0x20) {
            prevk = k + 0x80;
            next = 3;
        } else if (k > 0x60 && k <= 0x7A) {
            prevk = k + 0x80;
            next = 2;
        } else if (k >= 0x20 && k <= 0x7F) {
            prevk = k + 0x80;
            next = 1;
        } else {
            array.push(k);
            next = 0;
        }
    });
    if (next != 0) {
        array.push(prevk * 256);
    }
    return array;
}