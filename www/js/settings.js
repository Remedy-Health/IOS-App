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

if(localStorage.getItem("_id")){
    socket.emit("userexists", localStorage.getItem("_id"), function (tf,res){
        if(!tf){
            localStorage.clear();
            location = "index.html"
        }
        if(res[0].isDarkMode){
            localStorage.setItem("cssvariables", JSON.stringify({
                "--main": "#232323",
                "--text": "#CCCCFF",
                "--secondary": "#484848"
            }));
            reset_theme({
                "--main": "#232323",
                "--text": "#CCCCFF",
                "--secondary": "#484848"
            });
        }else{
            localStorage.setItem("cssvariables", JSON.stringify({
                "--main": "#CCCCFF",
                "--text": "rgb(255,255,255)",
                "--secondary": "rgb(218, 218, 255)"
            }));
            reset_theme({
                "--main": "#CCCCFF",
                "--text": "rgb(255,255,255)",
                "--secondary": "rgb(218, 218, 255)"
            });
        }
    });
} else {
    location = "index.html"
}
if(JSON.parse(localStorage.getItem("cssvariables"))["--main"] == "#232323"){
    document.querySelector("textarea#circlecrtl").value = "a";
    document.querySelector("img").src = "img/dark.png";
}

document.querySelectorAll("div#themeselect").forEach(function (elem){
    elem.addEventListener("click", function (){
        document.querySelector("textarea#circlecrtl").value = elem.getAttribute("txt");
    })
})

document.querySelector("button#save").addEventListener("click", function (){
    var isDarkMode = (document.querySelector("textarea#circlecrtl").value == "a");
    socket.emit("edituser", {
        isDarkMode: isDarkMode
    }, localStorage.getItem("_id"), function (){
        if(isDarkMode){
            localStorage.setItem("cssvariables", JSON.stringify({
                "--main": "#232323",
                "--text": "#CCCCFF",
                "--secondary": "#484848"
            }));
        }else{
            localStorage.setItem("cssvariables", JSON.stringify({
                "--main": "#CCCCFF",
                "--text": "rgb(255,255,255)",
                "--secondary": "rgb(218, 218, 255)"
            }));
        }
        location = "hub.html"
    });
})