var socket = io("https://d7f1-172-114-234-240.ngrok.io", { withCredentials: true });
function reset_theme(obj){
    document.documentElement.style.setProperty("--main", obj["--main"]);
    document.documentElement.style.setProperty("--text", obj["--text"]);
    document.documentElement.style.setProperty("--secondary", obj["--secondary"]);
}

localStorage.getItem("cssvariables") ? reset_theme(JSON.parse(localStorage.getItem("cssvariables"))) : console.log("useless log");

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
        }else{
            localStorage.setItem("cssvariables", JSON.stringify({
                "--main": "#CCCCFF",
                "--text": "rgb(255,255,255)",
                "--secondary": "rgb(218, 218, 255)"
            }));
        }
        reset_theme(JSON.parse(localStorage.getItem("cssvariables")));
    });
} else {
    location = "index.html"
}

if(JSON.parse(localStorage.getItem("cssvariables"))["--main"] == "#232323"){
    document.querySelector("img").src = "img/dark.png";
}

document.addEventListener("deviceready", function (){
    let options = {
        x: window.screen.width*7.5/100,
        y: window.screen.height*0.13,
        width: window.screen.width*85/100,
        height: window.screen.height*0.57,
        camera: CameraPreview.CAMERA_DIRECTION.FRONT,
        toBack: false,
        tapPhoto: true,
        tapFocus: false,
        previewDrag: false,
        storeToFile: false,
        disableExifHeaderStripping: false
    };
    CameraPreview.startCamera(options);

    document.querySelector("button#snap").addEventListener('click', function (){
        CameraPreview.takePicture({ width: 512, height: 512, quality: 100 }, function (base64PictureData) {
            socket.emit("uploadhistory", base64PictureData,localStorage.getItem("_id"), function (callback){

            });
        });
    })

    StatusBar.backgroundColorByHexString(JSON.parse(localStorage.getItem("cssvariables"))["--main"]);
})