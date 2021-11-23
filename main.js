// var img = "";
var status1 = "";
var objects = [];
var video;
var r = 0;
var g = 0;
var b = 0;


function preload() {
//    img = loadImage("Pets.jpg");
}

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML="Status = Detecting Objects";
}

function draw() {
    image(video, 0, 0, 380, 380);

    if (status1 != "") {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResult);
        for (var i=0; i<objects.length; i++) {
            strokeWeight(2);
            fill(r, g, b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x +10, objects[i].y +10);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    document.getElementById("status").innerHTML = "Status - Object Detected";
    document.getElementById("number_of_objects").innerHTML = "The number of objects detected are " + objects.length;
    }
}

function modelLoaded() {
    console.log("Model Loaded");
    status1 = "true";
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        objects = results;
    }
}