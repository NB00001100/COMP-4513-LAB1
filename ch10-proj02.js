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

    

      
     
     const currentPlay = new playModule.play(playData.acts);
     currentPlay.clearOptions('actList');
     currentPlay.clearOptions('sceneList');
     currentPlay.clearOptions('playerList');
     currentPlay.clearSceneHere();
     currentPlay.clearPlayHere();
     currentPlay.setPlayTitle(play);
    
     
     


    
   currentPlay.populateActDropDown();
   currentPlay.populatePlayersList(playData.persona)

   const popActs = document.getElementById("actList");
   popActs.addEventListener('change',(e)=>{
      const currentAct = new playModule.act(playData.acts[e.target.value].scenes);
      currentAct.populateSceneDropDown();
      currentPlay.setActName(e.target.value);

      
      const popScenes = document.getElementById("sceneList");
         popScenes.addEventListener('change', (event) => {
          
            currentAct.setSceneName(event.target.value);
          
            const  currentScene = new playModule.scene(playData.acts[e.target.value].scenes[event.target.value].speeches);
            const playersList = document.getElementById('playerList');
         
            playersList.addEventListener('click', (event2)=>{
             currentPlay.clearSceneHere();
               currentScene.showSpeeches(event2.target.value);
               const button = document.getElementById('btnHighlight');
               button.addEventListener('click', ()=>{
                  const searchValue = document.getElementById('txtHighlight').value;

                  var divsForHighlight = document.querySelectorAll('.speech');

                  divsForHighlight.forEach((div)=>{
                     currentScene.highlightText(searchValue,div);

                  })

               });


            });
         });
      });
   })
   .catch( error => console.error("Error fetching play data:", error));
}
