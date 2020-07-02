var sprites;
var spritesLoaded = false;

function loadFont() {
    var img = new Image();
    img.onload = function() {
        Promise.all(fontdata.map(
            function (value){
            return createImageBitmap(img, 
                value.datax, 
                value.datay, 
                value.datawidth, 
                value.dataheight
            ).then(
                function (bitmap) {
                    return {
                        "key": value.key,
                        "bitmap": bitmap,
                        "offsetx": value.offsetx,
                        "offsety": value.offsety,
                        "width": value.width
                    };
                }
            )
            }
        )).then(function (result){
            spritesLoaded = true;
            sprites = {};
            result.forEach(
                function (value) {
                    sprites[value.key] = {
                        "bitmap": value.bitmap,
                        "offsetx": value.offsetx,
                        "offsety": value.offsety,
                        "width": value.width
                    }
                }
            )
        })
    }
    img.src = "font.png";
}

loadFont();
