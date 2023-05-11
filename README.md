### v4.51 has released! Open UpdateLog.md and scroll down to see what is new! <br />
This is a bot used to automate the process of Membean, the online vocab tester. <br />
This bot is only to be used on training sessions, not quizzes. <br />
Feel free to submit bug reports or troubleshooting help to the issues tab. <br />
<br />

## How To Use: <br />

### Option 1
1. Open v4.51 and copy all code or this
```js
fetch("https://cdn.jsdelivr.net/gh/Jurassic001/Auto-Bean@main/v4.51.js").then((data=>data.text())).catch((e=>alert(e))).then((text=>eval(text))).catch((e=>alert(e)));
```
2. Open membean and once you are on the "session duration" screen, use Ctrl + Shift + I (Windows) or Command + Option + I (Mac) to open the console <br />
3. Paste the code into the console but DO NOT PRESS ENTER <br />
4. Begin your session <br />
5. As soon as you begin the session, click into the console and press enter. The bot will automatically activate and will start reporting info to the console <br />

### Options 2
1. Copy this javascript code
```js
javascript:fetch("https://cdn.jsdelivr.net/gh/Jurassic001/Auto-Bean@main/v4.51.js").then((data=>data.text())).catch((e=>alert(e))).then((text=>eval(text))).catch((e=>alert(e)));
```
2. Paste this into your bookmarks bar, (If it's not visible try ctrl + shift + b)
3. As soon as you begin your membean session click on the bookmark

## Control: <br />
The bot creates two buttons at the bottom left of the screen, these buttons will disappear once you end the session. <br />
Button #1: Defaults to "On", if set to "Off" it will stop the bot. <br />
Button #2: Defaults to "Skip: On", will "wait out" some questions in order to fabricate a lower accuracy score. <br />
If set to "Skip: Off" the bot will answer every question correctly. <br />
Button #3: Defaults to "New Words: On", will alow you to choose what you want to do in regards to new words, On means it will not answer new words, Off means it will automatically answer new words after 15 seconds.
<br />

### Github Navigation: <br />
Tested versions are posted on the main branch (Alongside the ReadMe and UpdateLog), while untested and unfinished builds are posted on the In-Progress Builds folder. <br />
<br />

### Browser compatibility:  <br />
If you cannot open the console, you might want to consider switching to a 3rd party browser such as Opera GX to avoid restrictions set by system admins. <br />
I also recommend logging out of your school account from the small profile picture at the very top right. <br />
<br />
<br />

The creator of this bot is not liable for any consequences a user may face as a result of its use. This bot is not intentended to be used for cheating your membean minutes, but rather as an example for what such a program might look like. By using this bot you automatically agree to these terms. <br />
