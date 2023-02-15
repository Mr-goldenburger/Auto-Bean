var interval = {
	"test": "",
	"click": "",
	"deltest": "",
} 
var bool = {
	"bot": true,
	"on": true,
	"skip": true,
} 
var object = {
	"div": "",
	"button1": "",
}

object.div = document.createElement("DIV");
object.div.style.width = "202px";
object.div.style.height = "26px";
object.div.style.border = "3px solid black";
object.div.id = "div";
object.div.style.background = "gray";

object.button2 = document.createElement("BUTTON");
object.button2.style.width = "100px";
object.button2.style.height = "25px";
object.button2.style.border = "3px solid black";
object.button2.style.background = "white";
object.button2.id = "button2";
object.button2.innerHTML = "Skip: On";
object.button2.setAttribute("onclick", "skip()");

object.button1 = document.createElement("BUTTON");
object.button1.style.width = "100px";
object.button1.style.height = "25px";
object.button1.style.border = "3px solid black";
object.button1.style.background = "white";
object.button1.id = "button1";
object.button1.innerHTML = "On";
object.button1.setAttribute("onclick", "start()");

document.body.appendChild(object.div);
document.getElementById("div").appendChild(object.button1);
document.getElementById("div").appendChild(object.button2);

var no_content = 0
var accu_reduction = 0
var targ_accu = 0
var disp_accu = 0
while (targ_accu == 0){
	accu_reduction = (Math.random() * 15);
	targ_accu = 93 - accu_reduction;
	disp_accu = targ_accu.toFixed(0);
	targ_accu = targ_accu / 100;
	console.log("Session Accuracy Target is " + disp_accu +"%");
}


function test() {
	if(bool.bot == true) {
		if(document.Pass) {
			bool.bot = false;
			set("click");
		} else if (document.getElementById("next-btn")) {
			set("stop");
			let x = document.querySelectorAll("#choice-section li");
			console.log("Next button clicked");
			x[0].click();
			x[1].click();
			x[2].click();
			document.getElementById("next-btn").click();
			set("test");
		} else if (no_content >= 1000) {
			console.log("No question detected. Reattempting...");
			no_content = 0
			set("test");
		} else {
			console.log("Scanning for question");
			no_content = no_content + 1				
		}
	}
} function set(type) {
	if(type == "click") {//waits time to click
		no_content = 0
		let rand = Math.floor(Math.random() * (26 - 10)) + 10;
		if(Math.random() > targ_accu && bool.skip == true) {
			console.log("Skipping question");
			setTimeout(() => {set("test")}, 35000);
		}
		else {
			console.log("This question will be answered in", rand, "seconds");
			rand = rand * 1000;
			interval.click = setTimeout(press, rand);
		}
	
	} else if (type == "test") {//starts testing after 2 seconds
		interval.deltest = setTimeout(function x(){bool.bot = true;}, 2000);
	} else if (type == "stop") { //CLEAR ALL TIMEOUTS AND INTERVALS
		clearTimeout(interval.click);
		clearTimeout(interval.deltest);
		bool.bot = false; 
	}
} function press() {
	document.Pass.click();
	console.log("Question answered");
	set("test");
	
} 


function start() {
	if(bool.on == true) {
		set("stop");
		bool.on = false;
		bool.bot = false;
		set("stop");
		console.log("Bot Inactive");
		document.getElementById("button1").innerHTML = "Off";
	} else if (bool.on == false) {
		bool.on = true;
		bool.bot = true;
		console.log("Bot Active");
		document.getElementById("button1").innerHTML = "On";
	}
} function skip() {
	if(bool.skip == true) {
		bool.skip = false;
		console.log("Answering all questions");
		document.getElementById("button2").innerHTML = "Skip: Off";
	
	} else if (bool.skip == false) {
		bool.skip = true;
		console.log("Skipping some questions");
		document.getElementById("button2").innerHTML = "Skip: On";
	}
}

interval.test = setInterval(test, 1);
