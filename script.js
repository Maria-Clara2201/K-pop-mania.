const musicas=[

{title:"Better in Denim",artist:"KATSEYE",file:"music/better-in-denim.mp4",cover:"img/capa-katseye.jpg"},
{title:"BOOMBAYAH",artist:"BLACKPINK",file:"music/boombayah.mp4",cover:"img/capa-blackpink.jpg"},
{title:"Chk Chk Boom",artist:"Stray Kids",file:"music/chk-chk-boom.mp4",cover:"img/capa-straykids.jpg"},
{title:"Cookie",artist:"NewJeans",file:"music/cookie.mp4",cover:"img/capa-newjeans.jpg"},
{title:"Debut",artist:"KATSEYE",file:"music/debut.mp4",cover:"img/capa-katseye.jpg"},
{title:"Divine",artist:"Stray Kids",file:"music/divine.mp4",cover:"img/capa-straykids.jpg"},
{title:"Do It",artist:"Stray Kids",file:"music/do-it.mp4",cover:"img/capa-straykids.jpg"},
{title:"Drip",artist:"BABYMONSTER",file:"music/drip.mp4",cover:"img/capa-babymonster.jpg"},
{title:"Gabriela",artist:"KATSEYE",file:"music/gabriela.mp4",cover:"img/capa-katseye.jpg"},
{title:"Gameboy",artist:"KATSEYE",file:"music/gameboy.mp4",cover:"img/capa-katseye.jpg"},
{title:"Gnarly",artist:"KATSEYE",file:"music/gnarly.mp4",cover:"img/capa-katseye.jpg"},
{title:"GO!",artist:"CORTIS",file:"music/go.mp4",cover:"img/capa-cortis.jpg"},
{title:"Hot Sauce",artist:"BABYMONSTER",file:"music/hot-sauce.mp4",cover:"img/capa-babymonster.jpg"},
{title:"Internet Girl",artist:"KATSEYE",file:"music/internet-girl.mp4",cover:"img/capa-katseye.jpg"},
{title:"Jellyous",artist:"ILLIT",file:"music/jellyous.mp4",cover:"img/capa-illit.jpg"},
{title:"Jump",artist:"BLACKPINK",file:"music/jump.mp4",cover:"img/capa-blackpink.jpg"},
{title:"LALALA",artist:"Stray Kids",file:"music/lalala.mp4",cover:"img/capa-straykids.jpg"},
{title:"Like That",artist:"BABYMONSTER",file:"music/like-that.mp4",cover:"img/capa-babymonster.jpg"},
{title:"Magnetic",artist:"ILLIT",file:"music/magnetic.mp4",cover:"img/capa-illit.jpg"},
{title:"Megaverse",artist:"Stray Kids",file:"music/megaverse.mp4",cover:"img/capa-straykids.jpg"},
{title:"M.I.A",artist:"KATSEYE",file:"music/mia.mp4",cover:"img/capa-katseye.jpg"},
{title:"New Jeans",artist:"NewJeans",file:"music/new-jeans.mp4",cover:"img/capa-newjeans.jpg"},
{title:"Not Cute Anymore",artist:"ILLIT",file:"music/not-cute-anymore.mp4",cover:"img/capa-illit.jpg"},
{title:"Pink Venom",artist:"BLACKPINK",file:"music/pink-venom.mp4",cover:"img/capa-blackpink.jpg"},
{title:"Psycho",artist:"BABYMONSTER",file:"music/psycho.mp4",cover:"img/capa-babymonster.jpg"},
{title:"Scientist",artist:"TWICE",file:"music/scientist.mp4",cover:"img/capa-twice.jpg"},
{title:"Sheesh",artist:"BABYMONSTER",file:"music/sheesh.mp4",cover:"img/capa-babymonster.jpg"},
{title:"Strategy",artist:"TWICE",file:"music/strategy.mp4",cover:"img/capa-twice.jpg"},
{title:"Supernatural",artist:"NewJeans",file:"music/supernatural.mp4",cover:"img/capa-newjeans.jpg"},
{title:"The Feels",artist:"TWICE",file:"music/the-feels.mp4",cover:"img/capa-twice.jpg"},
{title:"Walkin On Water",artist:"Stray Kids",file:"music/walkin-on-water.mp4",cover:"img/capa-straykids.jpg"},
{title:"We Go Up",artist:"BABYMONSTER",file:"music/we-go-up.mp4",cover:"img/capa-babymonster.jpg"},
{title:"What Is Love",artist:"TWICE",file:"music/what-is-love.mp4",cover:"img/capa-twice.jpg"}

];

const grid=document.getElementById("musicGrid");
const favGrid=document.getElementById("favGrid");
const audio=document.getElementById("audio");
const capa=document.getElementById("capa");
const title=document.getElementById("title");
const artist=document.getElementById("artist");
const progress=document.getElementById("progress");

let atual=0;
let favoritos=JSON.parse(localStorage.getItem("favoritos"))||[];
let playlists=JSON.parse(localStorage.getItem("playlists"))||{};


/* trocar seções */

function mostrarSecao(id){

document.querySelectorAll(".secao").forEach(sec=>{
sec.classList.remove("ativa");
});

document.getElementById(id).classList.add("ativa");

}


/* criar cards */

function criarCards(lista,container){

container.innerHTML="";

lista.forEach((m,i)=>{

const card=document.createElement("div");
card.className="card";

card.innerHTML=`
<img src="${m.cover}">
<h4>${m.title}</h4>
<p>${m.artist}</p>
`;

card.onclick=()=>tocar(i);

container.appendChild(card);

});

}

criarCards(musicas,grid);


/* player */

function tocar(i){

const m=musicas[i];

audio.src=m.file;
title.textContent=m.title;
artist.textContent=m.artist;
capa.src=m.cover;

audio.play();

atual=i;

}


function playPause(){

if(audio.paused){
audio.play();
}else{
audio.pause();
}

}

function proxima(){

atual++;
if(atual>=musicas.length) atual=0;

tocar(atual);

}

function anterior(){

atual--;
if(atual<0) atual=musicas.length-1;

tocar(atual);

}


/* progresso */

audio.ontimeupdate=()=>{

progress.value=(audio.currentTime/audio.duration)*100||0;

};

progress.oninput=()=>{

audio.currentTime=(progress.value/100)*audio.duration;

};


/* favoritos */

function favoritar(){

if(!favoritos.includes(atual)){
favoritos.push(atual);
}else{
favoritos=favoritos.filter(f=>f!==atual);
}

localStorage.setItem("favoritos",JSON.stringify(favoritos));

renderFav();

}

function renderFav(){

const lista=favoritos.map(i=>musicas[i]);

criarCards(lista,favGrid);

}

renderFav();


/* playlists */

function criarPlaylist(){

const nome=document.getElementById("playlistNome").value;

if(!nome) return;

playlists[nome]=[];

localStorage.setItem("playlists",JSON.stringify(playlists));

alert("Playlist criada!");

}