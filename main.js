const msg = new SpeechSynthesisUtterance(); 
// what's going to be in this function is what this person is going to say 
// and on that utterance/function it is going to contain the following

//    what is the voice that they say it in
//    how fast (rate) they are going to say it
//    what is the pitch they are going to say it in
//    and what will they be saying. 

// All the four things that we have is going to be included in this function. 
// we are creating a new version of that into msg

// this empty array is where the different people voices we are going to be using dumpped into

let voices = [];

// now lets manipulate the DOM and select some of things we need to select from the html

const voicesDropdown = document.querySelector('[name="voice"]');
// here we are selecting the drop down, we need the [] becasue its written this way <select name="voice" id="voices">

const options = document.querySelectorAll('[type="range"], [name="text"]');
// here we are selecting the Rate, Pitch, & text area all in one and calling it options
const speakButton = document.querySelector("#speak");
// this starts the speach
const stopButton = document.querySelector('#stop');
// this stops the speech 

// now what we need to do is on page load, 
// whatever is inthe text area, I want to set that to be the default
// this is what we will do 
// take the functions text and set that to the text value that is in the html
msg.text = document.querySelector('[name= "text"]').value;
// if you go to the console and type in msg you should see the SpeechSynthesisUtterance function 
// and textarea printed
// but if you drop it down you'll see null for  voices there is no voice being set yet

// lets populate all the different voices 
//  we take a global variable 
// the SpeechSynthesisUtterance is one thing that the person might say

//  we have a global variable called "speechSynthesis" it already comes wth JS
// You can call .speack() on speechSynthesis and pass in a single utterance or in out case
// SpeechSynthesisUtterance that is connected to the text we put in the text area. 
// aka msg 
// if we do that now, and go to the consele type in speechSynthesis.speack(msg) and pass in our utterance 
// or what we are going to say, it returns null because we don't yet have no voice 


// but what we can do is take the global variable which is speechSynthesis(text to speak) and add an event listener to it
// and there is an event called vocies changed, and when the voices change, we are going to populate 
// populate our vocies, and right before that we are going to make that function. 

function populateVoices() {
// we are going to take the voices array we declared up there and override it with 
// getVocies can't be called on page load because when speechSynthesis loads it has to fire the voices changed 
// becasue it takes a minute for it to load so we need to wait until we need to run the voices changed. 
voices = this.getVoices();
console.log(voices);
// twhen we console log this we see a list of voices available. about 66 
// each of these is a voice, where they have a name, a language code they speak in. 
//  So this means that for voices, it is an array with 66 voices in it
// Sowhat we want to do is loop over all of these speach vocies and set that as options in the dropdown above. 

// So vocies array set as options for them to select. direct correlation. 
// so for voicesOptions we will take all our voices in the array, and map over it.
// so in the map we have an individual voice 
// so for each voice we want to create an option tag that has the name and the lang of the speaker.
// so map loops through all of them, once it loops through each we want to join them together to keep it neat

voicesOptions = 
voices
.filter(voice => voice.lang.includes('en')) 
.map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
.join('');

// for the filter function read notes down at line 186 -191
// now we have all the voices and they are concatinated, we initally wanted them to be as a drop down in the select bar
// so since we have all the infor we just change the inner HTML of the dropdown to the options that we looped through
voicesDropdown.innerHTML = voicesOptions;

// or if you want that to happen right away you ca equate the "voicesDropdown.innerHTML" to the entire map function.

//  save refresh. As soon as the voices load you will get a hug drop down of all the possible list of voices 
// now that the voices are actually loaded on the page we can take a look at our msg in console 
// there still isn't a voice on our SpeechSynthesisUtterance or the word that's in the txt box, voice is null. 
// But because those voices have been loaded into the page it will default to Alex. 
// if we call speechSynthesis.speak(msg) it speeks. we can change the words in our console and it will say what we wrote.
// msg.text = "I love food" and run it again, it will say "Ilovefood" regardless of another thing being in the msg txt box
// but we want to choose from the drop down but that doesn't work yet

}

// So we are going to make another function called set voice to be able to choose the dropdown 

function setVoice() {
    // console.log("changing voice")
    // this function should be called when we change from this drop down ***(read*** down below)
    //  ***we have our voices dropdown, we are going to add an event listener on changed, we are going to call setVoice 
    // ***So everytime we change voices from the dropdown, its actually changing it and consologs "changing voice"
    // ***but we don't want to just console log it 
    // we have our uttence (msg), we want the voice to be the voice we selected. we can't say 
    // msg.voice = "Alex" because its not a valid voice property. 
    // So we need to find the voice that lines up with the value. 
// now if we do this 

// console.log(this.value) we get the name of the speaker
// we need to find not just the name of it but we also need to find the corrosponding speech synthesis voice object

msg.voice = voices.find(voice => voice.name === this.value);
// so we want to find the one where the voice name is equal to the value
// this is going to loop over each of speeachsynthesis array and its going to find the name attribute is the same as 
// the options html tags value and find the corrosponding value to the name
// so now if we in the console speachSynthesis.speack(msg) and select any voice it will speek it. Manually works
toggle();
// without the toggle only works manually but with toggle it automatically restarts with new person
}

// Great, now I want to create a function that everytime I change the name i want to restart it. Toggle

function toggle(startOver = true) {

// initally I want to cancel everything that I have that is speacking 
    speechSynthesis.cancel();
// So if you run something and immidiatly call toggle function, it will cancel it/stop it from speaking and 
// we will retart the entire thing.
// speachSynthesis.speak(msg)
// and then we will go up to the set voice and add toggle
// So everytime you change it it is going to stop it and start it again. 
// you can also pass a flag in the parantesis as true, but sometime you want to pass false so it won't restart itself. 
// by defult it is going to be true so you don't have to pass anything unless you specifically don't want it to not start over

if(startOver) {    
    speechSynthesis.speak(msg);
}
// toogle false will stop it all, toggle will restart it.

// So you are  not canceling
// you are just starting canceling whatever was started and restarting, it does not stop.
// toggle(false) literlly stops it and doesn't restart what they are saying
}

// now we want to work on or rate pitch and message. 
// lets take all of our options, if we go to the console and type in options we will see it is (input, input, textarea)
// first and second slider and text option
// so here we are looping through our, first and second slider and text option, and listening to the changes it makes
// once any change is made in these areas we will run a function called setOption

options.forEach(option => option.addEventListener('change', setOption));

function setOption() {
    console.log(this.name, this.value)
    // so when I slide this rate its going to tell me the rate change in amount and every thing else.
    // so when changes are made we know what prperty was changed(this.name), and what property it changed to(this.value)
    // we simply need to take out msg, and set what property change this.name to what property value this.value

    msg[this.name] = this.value;
    toggle();
    // then we can stop it and start it again with the new set changes
}

// now we need to listen to a button click on the buttons, so we take the speak button 

speakButton.addEventListener('click', toggle)
// this button funtion is going to manually run it
// and we need to listen for a click on out stop button
// stopButton.addEventListener('click', toggle(false))
// but it doesn't work becasue its gonna run on page load we need to pass in a function 
// so instead we can do function {
//     toggle(false);
// } 
// it works but it seems abit bulky 

// or we can 
// toggle.bind(null, false)
// pass it the b=value of this which is nothing and then pass it your first argument which is false. 
// This is what bind does, you take take any function, then you call it in the context of this and pass it the argument of false

// or we can do an inline arrow function () => toggle(false) downside to this is that it is creating another function
// samw with bind. But it isn't a big deal 
stopButton.addEventListener('click', toggle.bind(null, false))

voicesDropdown.addEventListener('change', setVoice);
speechSynthesis.addEventListener('voiceschanged', populateVoices)

// last thing i want to do is customize the amount of speakers there are on the drop down to only english speakers
// So before we map in our populateVoices function we will add a quick filter 
// .filter(voice => voice.lang.includes('en')) 
// aka if the voice language includes en in the begining 
//  this should trim that list down to the ones that include en before we map over it 
//  now if we refreash we will see a smaller list of languages





















// the cleaner code version is this below 

// const msg = new SpeechSynthesisUtterance();
//   let voices = [];
//   const voicesDropdown = document.querySelector('[name="voice"]');
//   const options = document.querySelectorAll('[type="range"], [name="text"]');
//   const speakButton = document.querySelector('#speak');
//   const stopButton = document.querySelector('#stop');
//   msg.text = document.querySelector('[name="text"]').value;
//   function populateVoices() {
//     voices = this.getVoices();
//     voicesDropdown.innerHTML = voices
//       .filter(voice => voice.lang.includes('en'))
//       .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
//       .join('');
//   }
//   function setVoice() {
//     msg.voice = voices.find(voice => voice.name === this.value);
//     toggle();
//   }
//   function toggle(startOver = true) {
//     speechSynthesis.cancel();
//     if (startOver) {
//       speechSynthesis.speak(msg);
//     }
//   }
//   function setOption() {
//     console.log(this.name, this.value);
//     msg[this.name] = this.value;
//     toggle();
//   }
//   speechSynthesis.addEventListener('voiceschanged', populateVoices);
//   voicesDropdown.addEventListener('change', setVoice);
//   options.forEach(option => option.addEventListener('change', setOption));
//   speakButton.addEventListener('click', toggle);
//   stopButton.addEventListener('click', () => toggle(false));