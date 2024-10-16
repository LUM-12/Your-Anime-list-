/*const url = 'https://api.jikan.moe/v4/recommendations/anime';
const topAnimeUrl = 'https://api.jikan.moe/v4/top/anime';

const seasonAnime = 'https://api.jikan.moe/v4/seasons/now'
fetch(url)
.then(response => response.json())
.then(data => console.log(data))
*/
const menu = document.getElementById('mySidebar');
const collapse = document.getElementById('closeIT')
function openNav() {
  
  menu.style.width = '50%'
  menu.style.padding = '20px'
} 
function closeIt(){
  menu.style.width = '0px'
  menu.style.padding = '0px'
}

//get top anime data 

const topAnime = 'https://api.jikan.moe/v4/top/anime';
getTopAnime()
async function getTopAnime(){
  try {
    const response = await fetch(topAnime);
  
    const data = await response.json();
    console.log(data)
    const anime = data.data;
    const img = document.querySelectorAll('.sprites1');
  
    img.forEach((img, index) => {
      img.src = anime[index].images.jpg.image_url 
  })
  
    const cards = document.querySelectorAll('.title-cover');
    cards.forEach((card) => {
    card.style.display = 'flex';
});
  } catch (e) {
    console.error(e)
    throw e
  }
  

  try {
    // Second fetch call
    const seasonAnime2 = 'https://api.jikan.moe/v4/seasons/2024/fall';
    const response2 = await fetch(seasonAnime2);
    const data2 = await response2.json();
    console.log('Data from second API:', data2);
    
    const anime2 = data2.data
    const img2 = document.querySelectorAll('.sprites2')
    img2.forEach((img2, index) =>{
      img2.src = anime2[index].images.jpg.image_url 
    })
    
    
  } catch (e) {
    console.log('Error with second fetch:', e);
  }

  const animeVid = 'https://api.jikan.moe/v4/seasons/upcoming'
  try {
    const response3 = await fetch(animeVid);
    const data3 = await response3.json()
    console.log(data3)
    
    const anime3 = data3.data;
    const img3 = document.querySelectorAll('.sprites3');
    img3.forEach((img3, index) => {
      
      img3.src = anime3[index].images.jpg.image_url
    })
    
    
  } catch (e) {
    throw e
  }

}



