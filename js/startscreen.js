window.onload = function() {

  const button = document.getElementsByClassName("js--Button");

  for(var i = 0; i < button; i++){
    console.log(button[i])
  }

  button[0].addEventListener('click', function(evt){
      var name = evt.target.id;

      if(name === 'game'){
        navigateToGame();
      }
      if(name === 'tutorial'){
        navigateToTutorial();
      }

    }
  )

  button[1].addEventListener('click', function(evt){
      var name = evt.target.id;

      if(name === 'game'){
        navigateToGame();
      }
      if(name === 'tutorial'){
        navigateToTutorial();
      }
    }
  )



}
