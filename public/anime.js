const urlParams = new URLSearchParams(window.location.search);
const animeId = urlParams.get("id");
console.log(animeId);



const query = `
  query ($search: String!) {
    Media(search : $search, type : ANIME ) {
      id
      title {
        romaji
        english
        native
      }
      season
      coverImage{
        large 
        medium
      }
    }
  }
`;

const variables = { search: animeId };

fetch('https://graphql.anilist.co', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  body: JSON.stringify({
    query,
    variables
  })
})
.then(response => response.json())
.then(data => {
  console.log(data)
  
  const coverImg = document.getElementById('cover');
  const titleRomaji = document.getElementById('romaji');
  const titleEnglish = document.getElementById('english')
  
  coverImg.src = data.data.Media.coverImage.large;
  titleRomaji.textContent = data.data.Media.title.romaji;
  titleEnglish.textContent = data.data.Media.title.english;
  
} ) 
.catch(error => console.error(error));



/*const url4 = `https://api.jikan.moe/v4/anime/52991`


getDetails();
async function getDetails() {
  try {
    const response4 = await fetch(url4)
  
    const data4 = response4.json()
    console.log(data4)
  } catch (e) {
    throw e
  }
  
}

*/

/*const box = document.querySelector('.holder')


for (var i = 0; i < 100; i++) {
  
  const wong = i+1 ;
  const text = document.createElement('p')
  text.classList.add('para')
  
  box.appendChild(text);
  setTimeout(()=> {
    text.textContent = `${wong }. wong `;
  },i* 500)

} 
*/