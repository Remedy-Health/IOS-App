document.addEventListener("deviceready", function (){
    StatusBar.backgroundColorByHexString("#CCCCFF");
    CameraPreview.stopCamera();
})

var socket = io("https://d7f1-172-114-234-240.ngrok.io", { withCredentials: true });

if(localStorage.getItem("_id")){
    socket.emit("userexists", localStorage.getItem("_id"), function (tf){
        tf ? location = "hub.html" : localStorage.clear();
    });
}

document.querySelectorAll("button.transparent").forEach(function (btn){
    btn.addEventListener("click", function (){
        if(document.querySelector('textarea#special').value == btn.getAttribute("wantedvalue")){
            funcobj[btn.getAttribute("ree")](document.querySelector("#username").value,document.querySelector("#password").value,document.querySelector("#email").value);
        }
        document.querySelector('textarea#special').value = btn.getAttribute("wantedvalue");
    })
});

function login(username,password){
    socket.emit("login",username,password, function (res,bool){
        if(!bool) return alert(res);
        localStorage.setItem("cssvariables", JSON.stringify({
                "--main": "#CCCCFF",
                "--text": "rgb(255,255,255)",
                "--secondary": "rgb(218, 218, 255)"
            }));
        localStorage.setItem("_id", res)
        location = "hub.html"
    });
}

function signup(username,password,email){
    socket.emit("signup",username,password,email, function (res,bool){
        if(!bool) return alert(res);
        localStorage.setItem("cssvariables", JSON.stringify({
                "--main": "#CCCCFF",
                "--text": "rgb(255,255,255)",
                "--secondary": "rgb(218, 218, 255)"
            }));
        localStorage.setItem("_id",res);
        location = "hub.html"
    });
}

var funcobj = {
    login: login,
    signup: signup
}