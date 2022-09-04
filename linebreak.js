var fontwidths = {};

function loadFontWidths() {
    fontwidths = {};
    for (let data of fontdata) {
        fontwidths[data.key] = data.width;
    }
}

function lineBreakText(text)
{
    let word = ""; //this must stay shorter than maxwidth at the start of each loop
    let wordWidth = 0;
    let lineWidth = 0;
    let maxWidth = document.getElementById("widthinput").value;
    let newText = ""; //this gets added to word by word, 
    // the space after the last word is not added until the next word gets added
    let lineIsNew = true;
    for (let c of text) {
        if (c == "\n") {
            if (lineIsNew) {
                newText += word + "\n";
            } else {
                newText += " " + word + "\n";
            }
            lineIsNew = true;
            lineWidth = 0;
            word = "";
            wordWidth = 0;
        } else if (c == " ") {
            if (lineIsNew) {
                newText += word;
                lineWidth += wordWidth;
            } else {
                newText += " " + word;
                lineWidth += fontwidths[32] + wordWidth;
            }
            word = "";
            wordWidth = 0;
            lineIsNew = false;
        } else if (!fontwidths[c.codePointAt(0)]) {
            return "Error - unrecognised character!";
        } else {
            let charWidth = fontwidths[c.codePointAt(0)];
            if ((lineIsNew && wordWidth + charWidth <= maxWidth) ||
                lineWidth + fontwidths[32] + wordWidth + charWidth <= maxWidth) {
                word += c;
                wordWidth += charWidth;
            } else {
                if (lineWidth > 0) {
                    newText += "\n";
                    lineIsNew = true;
                    lineWidth = 0;
                }
                if (wordWidth + charWidth <= maxWidth) {
                    word += c;
                    wordWidth += charWidth;
                } else {
                    newText += word;
                    lineIsNew = false;
                    word = c;
                    wordWidth = charWidth;
                    if (charWidth > maxWidth) {
                        return "Error - max width less than width of one of the characters!"
                    }
                }
            }
        }
    }
    if (lineIsNew) {
        newText += word + "\n";
    } else {
        newText += " " + word + "\n";
    }
    return newText;
}

function replaceLineBreakText() 
{
    let text = document.getElementById("textinput").value;
    document.getElementById("textinput").value = lineBreakText(emojiToKanji(text));
}

loadFontWidths();