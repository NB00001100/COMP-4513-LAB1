/* In this module, create three classes: Play, Act, and Scene. */

  class Play{
    constructor(acts)
    {
        this.acts = acts;


    }
    clearSceneHere()
    {
   const selectElement = document.getElementById('sceneHere');
      const divsToRemove = selectElement.querySelectorAll('div');
      divsToRemove.forEach((div)=>{
        div.remove();
      })
    }
      clearPlayHere()
      {
        var h3Element = document.querySelector('#actHere h3');
        var h4Element = document.querySelector('#sceneHere h4');
        var titleParagraph = document.querySelector('#sceneHere .title');
        var directionParagraph = document.querySelector('#sceneHere .direction');

        // Set innerHTML to an empty string
        h3Element.innerHTML = '';
        h4Element.innerHTML = '';
        titleParagraph.innerHTML = '';
        directionParagraph.innerHTML = '';

      }
    
    clearOptions(id)
    {
   const selectElement = document.getElementById(id);
   selectElement.innerHTML = ''; //removes all options
    }
    setPlayTitle(playName)
    {
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
    populateActDropDown()
    {
       let n = 0;
       const selectAct = document.getElementById('actList');
       selectAct.innerHTML = '<option value=0>Choose an Act</option>';
       this.acts.forEach(act => {
          const option = document.createElement('option');
          option.value = n;
          option.textContent = act.name;
          selectAct.appendChild(option);
          n = n+1;
       });
    }
    populatePlayersList(persona)
    {
      const selectPlayer = document.getElementById('playerList');
      selectPlayer.innerHTML = '<option value="AllPlayers">All Players</option>';
      persona.forEach( actor => {
         const option = document.createElement('option');
         option.value = actor.player;
         option.textContent = actor.player;
         selectPlayer.appendChild(option);
      });
   }

    setActName(num)
    {
        const actHere = document.getElementById('actHere');
         let header = actHere.querySelector('h3');
        header.textContent = this.acts[num].name;

    }


}
  class Act{

    constructor(scenes)
    {
        this.scenes = scenes;
    }
    populateSceneDropDown()
{
    let n =0;
   const selectScene = document.getElementById('sceneList');
   selectScene.innerHTML = '<option value=0>Choose a Scene</option>';
   this.scenes.forEach(act =>{
      const option = document.createElement('option');
      option.value = n;
      option.textContent = act.name;
      selectScene.appendChild(option);
      n = n+1;
   });
}

   setSceneName(num)
   {
    const sceneHere = document.getElementById('sceneHere');
     let header = sceneHere.querySelector('h4');
    header.textContent = this.scenes[num].name;
    header = actHere.querySelector(".title");
    header.textContent = this.scenes[num].title;
    header = actHere.querySelector('.direction');
    header.textContent = this.scenes[num].stageDirection;
   }

}


  class Scene{

    constructor(speeches){
        this.speeches = speeches;
    }
    showSpeeches(value){
      const element = document.getElementById('playerList');
      const elementOption = element.options[0];
      const optionValue = elementOption.value;
      if(value == optionValue)
      {
        this.addSpeeches1();
        
      }
      else{
        this.addSpeeches2(value);
      }

    }
    addSpeeches1()
    {
          const speechElement1 = document.getElementById('sceneHere');
         const allspeeches = this.speeches;

         allspeeches.forEach( speech =>{
          const div = document.createElement('div');
          const speaker = speech.speaker;
          const text = speech.lines;
          div.innerHTML = `<span>${speaker}</span><p>${text}</p>` ;
          div.classList.add('speech');
          speechElement1.appendChild(div);


         })
        
    

    }
    addSpeeches2(value)
    {
      const speechElement = document.getElementById('sceneHere');
      const valuesSpeeches = this.speeches;

      valuesSpeeches.forEach(speech =>
        {
          if(speech.speaker == value)
          {
            const div = document.createElement('div');
            const speaker = speech.speaker;
            const text = speech.lines;
            div.innerHTML = `<span>${speaker}</span><p>${text}</p>`;
            div.classList.add('speech');
            speechElement.appendChild(div);

          }

        })


    }
    clearSceneHere()
    {
   const selectElement = document.getElementById('sceneHere');
      const divsToRemove = selectElement.querySelectorAll('div');
      divsToRemove.forEach((div)=>{
        div.remove();
      })
    }
    highlightText (input , div)
    {
      // Why does this highlight the entire block of text instead of just the text that matches the regex.
     // Get the text content of the paragraph
     var paragraphContent = div.querySelector('p').innerHTML;

     // Remove previous highlighting by replacing spans with their inner content
     paragraphContent = paragraphContent.replace(/<span[^>]*>([^<]*)<\/span>/gi, '$1');

     // Create a regular expression for the input string with global and case-insensitive flags
     var regex = new RegExp('\\b(' + input + ')\\b', 'gi');

     // Replace the matching content with the highlighted version
     var highlightedContent = paragraphContent.replace(regex, '<span style="background-color: yellow;">$1</span>');

     // Update the paragraph with the highlighted content
     div.querySelector('p').innerHTML = highlightedContent;

    }


  }
  
  

export default {play:Play,act:Act,scene:Scene};
