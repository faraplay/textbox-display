function kanjiToEmoji(text) {
    emojidata.forEach(x => {
        text = text.replace(new RegExp(x.kanji, "g"), x.emoji)
    });
    return text;
}

function emojiToKanji(text) {
    emojidata.forEach(x => {
        text = text.replace(new RegExp(x.emoji, "g"), x.kanji)
    });
    return text;
}

function replaceKtEText() 
{
    let text = document.getElementById("textinput").value;
    document.getElementById("textinput").value = kanjiToEmoji(text);
}
function replaceEtKText() 
{
    let text = document.getElementById("textinput").value;
    document.getElementById("textinput").value = emojiToKanji(text);
}