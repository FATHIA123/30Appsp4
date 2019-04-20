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
const speakButton = document.querySelector('#speak');
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

voicesOptions = voices
.map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
.join('');

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

// So we are going to make another function called set voice


speechSynthesis.addEventListener('voiceschanged', populateVoices)
