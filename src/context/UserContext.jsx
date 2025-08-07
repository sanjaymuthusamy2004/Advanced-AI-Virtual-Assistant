import React, { createContext,useState  } from 'react';
import run from '../../gemini';

export const datacontext = createContext();

function UserContext({ children }) {
let [speaking,setSpeaking] = useState(false);
let [prompt, setPrompt] = useState("listening....")
let [response,setResponse]  = useState(false)
  function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.volume = 1;
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.lang = 'eng-GB';
    window.speechSynthesis.speak(text_speak);
  }


  async function aiResponse(prompt){
       let text =  await run(prompt) 
       let newText=text.split("**")&&text.split("*") &&text. replace("google", "Sanjay") &&text.replace("Google", "Sanjay")
       setPrompt(newText)
       speak(newText)
       setResponse(true)
       setTimeout(()=>{setSpeaking(false)},5000) 
        
    
    }
  

let speechRecoginition = window.SpeechRecoginition || window.webkitSpeechRecognition

let recognition = new speechRecoginition()
recognition.onresult=(e)=>{
    let currentIndex=e.resultIndex
    let transcript=e.results[currentIndex] [0].transcript
    setPrompt(transcript)    
    takeCommand(transcript.toLowerCase())
 }

function takeCommand(command){
    if(command.includes("open") && command.includes("youtube")){
        window.open("https://www.youtube.com/","_blank")
        speak("opening youtube")
        setResponse(true)
        setPrompt("opening youtube...")
        setTimeout(()=>{setSpeaking(false)},5000) 
    }else if (command.includes("open") && command.includes("google")){
        window.open("https://www.google.com/","_blank")
        speak("opening google")
        setResponse(true)
        setPrompt("opening google...")
        setTimeout(()=>{setSpeaking(false)},5000) 
    }else if (command.includes("open") && command.includes("instagram")){
        window.open("https://www.instagram.com/","_blank")
        speak("opening instagram")
        setResponse(true)
        setPrompt("opening instagram...")
        setTimeout(()=>{setSpeaking(false)},5000) 
    }else if(command.includes("time")){
        let time=new Date().toLocaleString(undefined,
        {hour: "numeric", minute: "numeric"})
        speak(time)
        setResponse(true)
        setPrompt(time)
        setTimeout(()=>{setSpeaking(false)},5000) 
    }else if(command.includes("date")) {
        let date=new Date().toLocaleString ({undefinedday: "numeric", month:"short"})
        speak(date)
        setResponse(true)
        setPrompt(date)
        setTimeout(()=>{setSpeaking(false)},5000) 
    }else if (command.includes("open") && command.includes("resume")){
        window.open("https://drive.google.com/file/d/1ZjZNVGkj_POsCoksEY6SkYtT_oykupcR/view?usp=sharing","_blank")
        speak("opening resume")
        setResponse(true)
        setPrompt("opening google...")
        setTimeout(()=>{setSpeaking(false)},5000) 
    }
      
    else{
        aiResponse(command)
    }
}

  let value = {
   recognition,
   speaking,
   setSpeaking,
   prompt,
   setPrompt,
   response,
   setResponse
  };

  return (
    <datacontext.Provider value={value}>
      {children}
    </datacontext.Provider>
  );
}

export default UserContext;
