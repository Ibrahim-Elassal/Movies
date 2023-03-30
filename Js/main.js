$(".strip-toggel-menu i").click(function () {
      if($(".nav-tab-menu").css("left") == "0px"){
        let sidebarInnerWidth = $(".nav-tab-menu").innerWidth() ;
        $(".nav-tab-menu").animate({left : -sidebarInnerWidth} , 100  );
        $(".strip-header-nav").animate({left : "0px"} , 100 , function () {
            $(".item1").hide(10);
            $(".item2").hide(10);
            $(".item3").hide(10);
            $(".item4").hide(10);
            $(".item5").hide(10);
            $(".item6").hide(10);
          } );
        $(".strip-toggel-menu i").toggleClass('fa-times')
      }
      else {
        $(".nav-tab-menu").animate({left : "0px"} , 100);
        $(".strip-header-nav").animate({left : "240px"} , 100 , function () {
                $(".item1").show(1000);
                $(".item2").show(1000);
                $(".item3").show(1000);
                $(".item4").show(1000);
                $(".item5").show(1000);
                $(".item6").show(1000);
          });
        $(".strip-toggel-menu i").toggleClass('fa-times')
      }
  })
 

let items = [] ;
async function defaultApi(){
      var myResponse  = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=500d0a830dab9f5f9908d1d31a910663&language=en-US&page=1`);
      var finalResulte = await myResponse.json();
      let AllMovies = finalResulte.results ;
      items = finalResulte.results ;
      displayMovies(AllMovies); 
}
defaultApi ();

let popularMovies = [] ;
async function getPopularMovies(){
        var myResponse  = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=500d0a830dab9f5f9908d1d31a910663&language=en-US&page=1`);
        var finalResulte = await myResponse.json();
        popularMovies = finalResulte.results ;
}
getPopularMovies ();

async function getMovies(inputValue){
    let item = document.querySelectorAll('.nav-item li') ;
    for (let i = 0; i < item.length; i++) {
        item[i].addEventListener('click' , async (eventInfo)=>{
        let category = eventInfo.target.getAttribute('value') ;
        var myResponse  = await fetch(`https://api.themoviedb.org/3/${category}?api_key=500d0a830dab9f5f9908d1d31a910663&language=en-US&page=1`);
        var finalResulte = await myResponse.json();
        let AllMovies = finalResulte.results ;
         items = finalResulte.results ;
        displayMovies(AllMovies); 
        } ) 
    }
}
getMovies ();

// display 
function displayMovies(arr){
    let baseSrcImg  = 'https://image.tmdb.org/t/p/w500' ;
    let  temp = ``;
        for (let i = 0; i < arr.length; i++) {
            temp += `
        <div class="col-md-6 col-lg-4 my-3 myM  shadow">
        <div class="movie shadow rounded position-relative">
            <div class="post ">
                <img src="${baseSrcImg+arr[i].poster_path}" alt="" class="img-fluid rounded ">
                <div class="layer d-flex align-items-center justify-content-center">
                    <div class="info p-0">
                        <h2 class="">${arr[i].original_title}</h2>
                        <p class="fw-bold">${arr[i].overview}</p>
                        <p class="fw-bold">rate:${arr[i].vote_average}</p>
                        <p class="fw-bold">${arr[i].release_date}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
            `
            document.getElementById('rowData').innerHTML =  temp ;
        }
   
}

// search movie 
function searchMovie (term){
    let matchedMovies =[];  
    for(var i=0 ; i<popularMovies.length ; i++){
        if(popularMovies[i].original_title.toLowerCase().includes(term.toLowerCase()) ===true){
            matchedMovies.push(popularMovies[i]);
        }
    }
    if(matchedMovies <1 ){
        console.log(result)
        $('#rowData').css({'display' : "none"})
    }
    else {
        console.log(matchedMovies);
        $('#rowData').css({'display' : "flex"})
        displayMovies(matchedMovies)
    }
}

//  contacts 
let nameInput = document.getElementById("name")
let emailInput = document.getElementById("email")
let phoneInput = document.getElementById("phone")
let ageInput = document.getElementById("age")
let passwordInput = document.getElementById("password")
let rePasswordInput = document.getElementById("rePassword")

let nameAlert = document.getElementById("namealert")
let emailAlert = document.getElementById("emailalert")
let phonealert = document.getElementById("phonealert")
let agealert = document.getElementById("agealert")
let passwordalert = document.getElementById("passwordalert")
let repasswordalert = document.getElementById("repasswordalert")

let submitBtn = document.getElementById("submitBtn")

let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let rePasswordInputTouched = false;

function validName(){
    return /^[A-Z][a-z]{2,}$/.test(nameInput.value)
}
function validEmail(){
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailInput.value)
}
function validPhone(){
    return /^01[0125][0-9]{8}$/.test(phoneInput.value)
}
function validAge(){
    return /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|99)$/.test(ageInput.value)
}
function validPassword(){
    var regEx = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/gm 
    return regEx.test(passwordInput.value);
}
function validRePassword(){
    if(passwordInput.value === rePasswordInput.value){
        return true ;
    }
    else{
        return false
    }
}

nameInput.addEventListener("focus", _=> nameInputTouched = true)
emailInput.addEventListener("focus", _=> emailInputTouched = true)
phoneInput.addEventListener("focus", _=> phoneInputTouched = true)
ageInput.addEventListener("focus", _=> ageInputTouched = true)
passwordInput.addEventListener("focus", _=> passwordInputTouched = true)
rePasswordInput.addEventListener("focus", _=> rePasswordInputTouched = true)

function validInputs(){
    if(nameInputTouched){
        if(validName()){
            nameInput.classList.add("is-valid")
            nameInput.classList.remove("is-invalid")
            nameAlert.classList.replace("d-block","d-none")
        } else{
            nameInput.classList.add("is-invalid")
            nameInput.classList.remove("is-valid")
            nameAlert.classList.replace("d-none","d-block")
        }
    }
    if(emailInputTouched){
        if(validEmail()){
            emailInput.classList.add("is-valid")
            emailInput.classList.remove("is-invalid")
            emailAlert.classList.replace("d-block","d-none")
        } else{
            emailInput.classList.add("is-invalid")
            emailInput.classList.remove("is-valid")
            emailAlert.classList.replace("d-none","d-block")
        }
    }
    if(phoneInputTouched){
        if(validPhone()){
            phoneInput.classList.add("is-valid")
            phoneInput.classList.remove("is-invalid")
            phonealert.classList.replace("d-block","d-none")
        } else{
            phoneInput.classList.add("is-invalid")
            phoneInput.classList.remove("is-valid")
            phonealert.classList.replace("d-none","d-block")
        }
    }
    if(ageInputTouched){
        if(validAge()){
            ageInput.classList.add("is-valid")
            ageInput.classList.remove("is-invalid")
            agealert.classList.replace("d-block","d-none")
        } else{
            ageInput.classList.add("is-invalid")
            ageInput.classList.remove("is-valid")
            agealert.classList.replace("d-none","d-block")
        }
    }
    if(passwordInputTouched){
        if(validPassword()){
            passwordInput.classList.add("is-valid")
            passwordInput.classList.remove("is-invalid")
            passwordalert.classList.replace("d-block","d-none")
        } else{
            passwordInput.classList.add("is-invalid")
            passwordInput.classList.remove("is-valid")
            passwordalert.classList.replace("d-none","d-block")
        }
    }
    if(rePasswordInputTouched){
        if(validRePassword()){
            rePasswordInput.classList.add("is-valid")
            rePasswordInput.classList.remove("is-invalid")
            repasswordalert.classList.replace("d-block","d-none")
        } else{
            rePasswordInput.classList.add("is-invalid")
            rePasswordInput.classList.remove("is-valid")
            repasswordalert.classList.replace("d-none","d-block")
        }
    }
    if(validName()&& validEmail()&&validPhone() && validAge() && validPassword() && validRePassword()){
        submitBtn.removeAttribute("disabled")
    } else{
        submitBtn.setAttribute("disabled", true)
    }
}