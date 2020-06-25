window.onload = function() {

  console.log('the end!');

  const button = document.getElementsByClassName("js--Button");

  for(var i = 0; i < button; i++){
    console.log(button[i])
  }

  button[0].addEventListener('click', function(evt){
        navigateToStartscreen();
    }
  )



}
