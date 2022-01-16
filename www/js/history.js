document.addEventListener("deviceready", function (){
    StatusBar.backgroundColorByHexString(JSON.parse(localStorage.getItem("cssvariables"))["--main"]);
    CameraPreview.stopCamera();
})

var socket = io("https://d7f1-172-114-234-240.ngrok.io", { withCredentials: true });

function reset_theme(obj) {
    document.documentElement.style.setProperty("--main", obj["--main"]);
    document.documentElement.style.setProperty("--text", obj["--text"]);
    document.documentElement.style.setProperty("--secondary", obj["--secondary"]);
}

reset_theme(JSON.parse(localStorage.getItem("cssvariables")));

if (localStorage.getItem("_id")) {
    socket.emit("userexists", localStorage.getItem("_id"), function (tf, res) {
        if (!tf) {
            localStorage.clear();
            location = "index.html"
        }
        if (res[0].isDarkMode) {
            localStorage.setItem("cssvariables", JSON.stringify({
                "--main": "#232323",
                "--text": "#CCCCFF",
                "--secondary": "#484848"
            }));
        } else {
            localStorage.setItem("cssvariables", JSON.stringify({
                "--main": "#CCCCFF",
                "--text": "rgb(255,255,255)",
                "--secondary": "rgb(218, 218, 255)"
            }));
        }
        reset_theme(JSON.parse(localStorage.getItem("cssvariables")));
        var history = res[0].history;
        var container = document.querySelector("div#histcontainer")
        for(i=0;i<history.length;i++){
            var historyelem = document.createElement("historyelem");
            var highest = Object.values(history[i].results).sort(function (a,b){ return b-a })[0];
            highestkey="";
            for(o = 0;o<Object.keys(history[i].results).length;o++){
                if(history[i].results[Object.keys(history[i].results)[o]] == highest){
                    highestkey = Object.keys(history[i].results)[o];
                    o = Object.keys(history[i].results).length;
                }
            }
            historyelem.innerHTML = `${parseInt(Math.round(highest*100))}% chance of ${highestkey}<br>${history[i].time}`;
            container.append(historyelem)
        }
    });
} else {
    location = "index.html"
}

if(JSON.parse(localStorage.getItem("cssvariables"))["--main"] == "#232323"){
    document.querySelector("img").src = "img/dark.png";
}
