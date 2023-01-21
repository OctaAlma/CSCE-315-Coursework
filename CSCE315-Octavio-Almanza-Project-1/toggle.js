// Whenever a window is loaded, we want to make sure it matches the selected style!

window.onload = (event) => {
    page_style = localStorage.getItem("currStyle");
    var fileName = location.pathname.split("/").slice(-1).toString();

    if (fileName == ''){
        console.log("empty");
    }

    if (page_style == null){
        localStorage.setItem("currStyle",0);
    }else{
        var fileName = location.pathname.split("/").slice(-1);
        fileName = fileName.toString();
        if (fileName == ''){
            fileName = "index.html";
        }
        document.getElementById('page_style').setAttribute("href", getStyleName(fileName,page_style));
    }
}

function getStyleName(str, num){
    str = str.toString();
    arr = str.split(".");

    // If the current style cookie is set to 1, we return str1.css.
    // Else, we return str.css

    if (num == 1){
        if (arr.length == 1){
            return "index.css";
        }
        console.log("Switching to:" + arr[0] + ".css");
        return arr[0] + ".css";
    }else{
        if (arr.length == 1){
            return "index1.css";
        }
        console.log("Switching to:" + arr[0] + "1.css");
        return arr[0] + "1.css";
    }
}


function switch_style(){
    page_style = localStorage.getItem("currStyle");
    var filename = location.pathname.split("/").slice(-1);

    var cssName; 
    if (page_style == 0){
        localStorage.setItem("currStyle",1);
        cssName = getStyleName(filename,1);

    }else{
        localStorage.setItem("currStyle",0);
        cssName = getStyleName(filename,0);
    }
    console.log(page_style);
    document.getElementById('page_style').setAttribute("href", cssName);
}