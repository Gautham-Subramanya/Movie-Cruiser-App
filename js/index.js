const movieNameInput = document.getElementById('movie-name');   
const searchButton = document.getElementById('search-btn');     
const form = document.getElementById('search-movie-form');
const searchMovieByResults=document.getElementById("results");
const favs = document.getElementById("favs");
const favourites = document.getElementById("favourites");
const favBtn = document.getElementById("fav-btn");
let a ;
let favMovies = [];

favourites.style.display = "none";
favBtn.addEventListener("click",displayFavourite);

DataQueue = (a)   => {
    searchMovieByResults.innerHTML="";
    for(let i=0;i<a.results.length;i++){
        let li = document.createElement("li");
        li.innerHTML = a.results[i].title;
        let btn = document.createElement("button");
        btn.innerHTML="Add to fav";
        btn.addEventListener("click",(e)=>{
            addToFavs(a.results[i].title);
        });
        btn.style.margin = "0.2em";
        li.style.padding = "1em";
        searchMovieByResults.appendChild(li);
        searchMovieByResults.appendChild(btn);

    }
 }
searchButton.addEventListener("click",(e)=>{
    e.preventDefault();
    fetch('http://api.themoviedb.org/3/search/movie?query='+movieNameInput.value+'&api_key=2a84cb902550aa6aa13ff3cc9c35c588')
        .then((response) => response.json())
        .then((responseData) => {
            a = responseData;
         DataQueue(a);
});
});

function addToFavs(movieTitle){
    if(!favMovies.includes(movieTitle)){
        favMovies.push(movieTitle);
        localStorage.setItem("fav-movies",JSON.stringify(favMovies));
    }
}


function displayFavourite(){
    if(favourites.style.display==="none"){
        favourites.style.display = "block";
        displayFavs();
    }else{
        favourites.style.display = "none";
    }
}

function displayFavs(){
    favs.innerHTML = "";

    if(favMovies.length!=0){
    for(let i=0;i<favMovies.length;i++){
        let li = document.createElement("li");
        li.innerHTML = favMovies[i];
        favs.appendChild(li);
    }
    
    }
    else{
        favMovies=JSON.parse(localStorage.getItem("fav-movies"));
        console.log(favMovies);

        displayFavs();
    }

}
