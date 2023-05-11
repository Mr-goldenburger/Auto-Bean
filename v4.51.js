// Creates objects to be called throughout the program
var interval = {
  test: "",
  click: "",
  deltest: "",
};
var bool = {
  bot: true,
  // Determines if the script should run
  on: true,
  // Determines if you want to skip some questions
  skip: true,
  // Determines if you want to skip new words
  ikt: true,
};
// This holds the buttons that will be displayed
var object = {
  div: "",
  button1: "",
  iktbutton: "",
};

// This is the container
object.div = document.createElement("DIV");
object.div.style.width = "330px";
object.div.style.height = "25px";
object.div.style.border = "3px solid black";
object.div.id = "div";
object.div.style.background = "gray";

// This is the button on the left that determines if the script should run
object.button1 = document.createElement("BUTTON");
object.button1.style.width = "100px";
object.button1.style.height = "25px";
object.button1.style.border = "3px solid black";
object.button1.style.background = "white";
object.button1.id = "button1";
object.button1.innerHTML = "On";
object.button1.setAttribute("onclick", "start()");

// This is the button in the middle which will determine if you want 100% accuracy or realistic accuracy
object.button2 = document.createElement("BUTTON");
object.button2.style.width = "100px";
object.button2.style.height = "25px";
object.button2.style.border = "3px solid black";
object.button2.style.background = "white";
object.button2.id = "button2";
object.button2.innerHTML = "Skip: On";
object.button2.setAttribute("onclick", "skip()");

// This is the button on the right which determines if you want to skip new words
object.iktbutton = document.createElement("button");
object.iktbutton.style.width = "130px";
object.iktbutton.style.height = "25px";
object.iktbutton.style.border = "3px solid black";
object.iktbutton.background = "white";
object.iktbutton.id = "ikt";
object.iktbutton.innerHTML = "New Words: On";
object.iktbutton.setAttribute("onclick", "ikt()");

// This adds the buttons to the end of the document
document.body.appendChild(object.div);
document.getElementById("div").appendChild(object.button1);
document.getElementById("div").appendChild(object.button2);
document.getElementById("div").appendChild(object.iktbutton);

// This scans for questions so that way it doesn't enter a infinite loop
var no_content = 0;

// This sets the accuracy it's aiming for
var accu_reduction = 0;
var targ_accu = 0;
var disp_accu = 0;
if (targ_accu == 0) {
  accu_reduction = Math.random() * 15;
  targ_accu = 93 - accu_reduction;
  disp_accu = targ_accu.toFixed();
  targ_accu = targ_accu / 100;
  console.log("Session Accuracy Target is " + disp_accu + "%");
}

function test() {
  if (bool.bot) {
    try {
      // If it's a normal question
      if (document.Pass) {
        bool.bot = false;
        // This eventually turns bool.bot bask on and determined if and when the question is answered
        set("click");
      } else if (document.getElementById("next-btn")) {
        if (document.getElementById("next-btn")) {
          if (document.getElementById("ikt") && bool.ikt) {
            // Turns off the bot and clears all waiting
            set("stop");
          } else {
            let x = document.querySelectorAll("#choice-section li");
            console.log("Next button clicked");
            for (let i = 0; i < x.length; i++) {
              if (x[i].classList.contains("answer")) {
                x[i].click();
              }
            }
			// Clicks the next button in 15 seconds in order to waste time on it
            setTimeout(function () {
              document.getElementById("next-btn").click();
              // turns bool.bot back on in 2 seconds
              set("test");
            }, 15000);
          }
        } else {
          set("stop");
        }
      } else if (no_content >= 1000) {
        console.log("No question detected. Resetting system...");
        set("stop");
        no_content = 0;
        set("test");
      } else {
        console.log("Scanning for question");
        no_content = no_content + 1;
      }
    } catch {
      TypeError;
    }
  }
}

function set(type) {
  switch (type) {
    // waits time to click
    case "click":
      // resets the counter that determines if there are questions on the page
      no_content = 0;
      try {
        // randomly skips a question if you want it to
        if (Math.random() > targ_accu && bool.skip == true) {
          console.log("Skipping question");
          setTimeout(() => {
            set("test");
          }, 40000);
        }
        // Checks to see if you have a limited amount of time for this question
        else if (alotted_time()) {
          let time = alotted_time() - 8;
          console.log("This question will be answered in", time, "seconds");
          time = time * 1000;
          interval.click = setTimeout(press, time);
        }
        // OtherWise it will answer the question in 30 seconds
        else {
          console.log("This question will be answered in", 30, "seconds");
          interval.click = setTimeout(press, 30000);
        }
      } catch {
        TypeError;
      }
      break;
    // starts testing after 2 seconds
    case "test":
      interval.deltest = setTimeout(() => {
        bool.bot = true;
      }, 2000);
      break;
    //CLEAR ALL TIMEOUTS AND INTERVALS
    case "stop":
      clearTimeout(interval.click);
      clearTimeout(interval.deltest);
      bool.bot = false;
      break;
  }

  // This function can only be acceced in set() and determined how much time you have left
  // This is used to determine how short the time answered in should be
  function alotted_time() {
    try {
      const timerContainer = document.getElementById("timer-container");
      const timeoutValue = timerContainer.getAttribute("data-timeout");
      return timeoutValue;
    } catch {
      TypeError;
    }
  }
}

// This attempts to correctly answer the question
// Where all the magic happens
function press() {
  try {
    document.Pass.click();
    console.log("Question answered");
    // turns the bot back on
    set("test");
  } catch {
    TypeError;
  }
  {
    set("test");
  }
}

function start() {
  if (bool.on) {
    // clears
    set("stop");
    bool.on = false;
    // clears
    set("stop");
    console.log("Bot Inactive");
    document.getElementById("button1").innerHTML = "Off";
  } else {
    bool.on = true;
    bool.bot = true;
    console.log("Bot Active");
    document.getElementById("button1").innerHTML = "On";
  }
}

// Sets the content of iktbutton
function ikt() {
  bool.ikt = !bool.ikt;
  document.getElementById("ikt").innerHTML = bool.ikt ? "New Words: On" : "New Words: Off";
  console.log("It will" + (bool.ikt ? " not " : " ") + "automatically skip new words");
}

// This controls the button on the right
// This determines if you should skip
function skip() {
  if (bool.skip) {
    console.log("Answering all questions");
    document.getElementById("button2").innerHTML = "Skip: Off";
  } else {
    console.log("Skipping some questions");
    document.getElementById("button2").innerHTML = "Skip: On";
  }
  bool.skip = !bool.skip;
}

interval.test = setInterval(test, 1);
