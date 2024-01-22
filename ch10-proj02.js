import playModule from "./play-module.js";

document.addEventListener("DOMContentLoaded", function() {

	
	const url = 'https://www.randyconnolly.com//funwebdev/3rd/api/shakespeare/play.php';

   /*
     To get a specific play, add play name via query string, 
	   e.g., url = url + '?name=hamlet';
	 
	 https://www.randyconnolly.com/funwebdev/3rd/api/shakespeare/play.php?name=hamlet
	 https://www.randyconnolly.com/funwebdev/3rd/api/shakespeare/play.php?name=jcaesar
     
   */
	 
   
    /* note: you may get a CORS error if you test this locally (i.e., directly from a
       local file). To work correctly, this needs to be tested on a local web server.  
       Some possibilities: if using Visual Code, use Live Server extension; if Brackets,
       use built-in Live Preview.
    */

       const  playList= document.getElementById("playList");
       

       playList.addEventListener('change', populateEverything);

       


});

function populateEverything(event){
   const play = event.target.value;
 //  console.log(play);

   //fetch info and populate for that selected play
   fetch('https://www.randyconnolly.com//funwebdev/3rd/api/shakespeare/play.php' + '?name='+ play)
   .then(response => response.json())
   .then(playData => {

      clearOptions('actList');
      clearOptions('sceneList');
      clearOptions('playerList');
      setPlayTitle(play);
      
     
     const currentPlay = new playModule.play(playData.acts);
     populatePlayersList(playData.persona);
     
    // const currentScene = new playModule.scene(playData.acts.scenes.speeches);
    
   currentPlay.populateActDropDown();

   const popActs = document.getElementById("actList");
   popActs.addEventListener('change',(e)=>{

      const currentAct = new playModule.act(playData.acts[e.target.value].scenes);
      currentAct.populateSceneDropDown();
      currentPlay.setActName(e.target.value);
      const popScenes = document.getElementById("sceneList");
      popScenes.addEventListener('change', (event) => {
      currentAct.setSceneName(event.target.value);
      const currentScene = new playModule.scene(currentAct[event.target.value].speeches);
      currentScene.addSpeeches();
         
       })

   
      });
   })
   .catch( error => console.error("Error fetching play data:", error));
}

 
function populatePlayersList(persona){
   const selectPlayer = document.getElementById('playerList');
   persona.forEach( actor => {
      const option = document.createElement('option');
      option.value = actor.player;
      option.textContent = actor.player;
      selectPlayer.appendChild(option);
   });
}

function setPlayTitle(playName){
   const playHere = document.getElementById("playHere");
   var name = '';
   if(playName == 'hamlet'){
      name = 'Hamlet';
   }else if(playName =='jcaesar')
   {
      name = 'Julius Caesar'
   }
   let header = playHere.querySelector('h2');
   header.textContent = name;
}

function clearOptions(id)
{
   const selectElement = document.getElementById(id);
   selectElement.innerHTML = ''; //removes all options
}