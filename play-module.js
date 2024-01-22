/* In this module, create three classes: Play, Act, and Scene. */

  class Play{
    constructor(acts)
    {
        this.acts = acts;


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
    addSpeeches()
    {
        const speechElement = document.getElementsByClassName('sceneHere');
         
            this.speeches.forEach(speech => {
            const speechSegment = document.createElement('div');
            speechSegment.classList.add('speech');
            const speaker = speech.speaker;
            const text = speech.lines;
            speechSegment.textContent= '<span>${speaker}</span><p>${text}</p>';
            speechElement.appendChild(speechSegment);
        
    });

    }


  }
  
  

export default {play:Play,act:Act,scene:Scene};