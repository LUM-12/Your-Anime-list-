
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
      description 
      genres
      episodes
      duration
      season
      seasonYear
      status
      characters {
       edges {
        node {
          name {
            full
          }
        }
        role
      }
    }
    startDate {
      year
      month
      day
    }
    endDate {
      year
      month
      day
    } 
    
    studios {
      nodes {
        name
      }
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
  const titleEnglish = document.getElementById('english');
  const synopsis = document.getElementById('description');
  const japTitle = document.getElementById('jap-title')
  
  
  coverImg.src = data.data.Media.coverImage.large;
  titleRomaji.textContent = data.data.Media.title.romaji;
  titleEnglish.textContent = data.data.Media.title.english;
  synopsis.innerHTML = data.data.Media.description;
  japTitle.innerHTML = data.data.Media.title.native;
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






// Detect the current page using `window.location.pathname`
const currentPage = window.location.pathname;

// Code for the first page
if (currentPage.includes('Anime.html')) {
  const search = document.getElementById('searchBtn');
  search.addEventListener('click', () => {
    
  const searchTitle = document.getElementById('search').value;
// Redirect to the second page with the title as a query parameter
  window.location.href = `searchResult.html?title=${encodeURIComponent(searchTitle)}`;
  });
}

// Code for the second page
if (currentPage.includes('searchResult.html')) {
  document.addEventListener('DOMContentLoaded', () => {
    
  const urlParams = new URLSearchParams(window.location.search);
   const searchTitle = urlParams.get('title');
    
  if (searchTitle) {
    
    const letSearch = `https://api.jikan.moe/v4/anime?q=${searchTitle}&sfw=true`;
  
  
  fetch(letSearch)
    .then(response => response.json())
    .then(data => {
      const listContainer = document.querySelector('.list-container');

      if (!data || !data.data || !Array.isArray(data.data)) {
        console.error('Invalid data structure:', data);
        return;
      }

      // Clear any existing list items
      listContainer.innerHTML = '';

      // Loop through the fetched data and dynamically create list items
      data.data.forEach(anime => {
        // Create list item container
        const listItem = document.createElement('div');
        listItem.className = 'list-item';
        
        // Create image container
        const sTitleCover = document.createElement('div');
        sTitleCover.className = 's-titleCover';

        const image = document.createElement('img');
        image.className = 's-cover';
        image.src = anime.images?.jpg?.image_url || '/Images/default.jpeg';
        image.alt = anime.title || 'Anime Image';

        sTitleCover.appendChild(image);

        // Create title container
        const sTitle = document.createElement('div');
        sTitle.className = 's-title';

        const englishTitle = document.createElement('h6');
        englishTitle.className = 'e_title';
        englishTitle.textContent = anime.title || 'No English title found';

        const japaneseTitle = document.createElement('p');
        japaneseTitle.className = 'j_title';
        japaneseTitle.textContent = anime.title_japanese || 'No Japanese title found';

        sTitle.appendChild(englishTitle);
        sTitle.appendChild(japaneseTitle);

        // Append the created elements to the list item
        listItem.appendChild(sTitleCover);
        listItem.appendChild(sTitle);

        // Add a click event listener to redirect to anime.js
        listItem.addEventListener('click', () => {
          const animeId = anime.mal_id; // Assuming `mal_id` uniquely identifies the anime
          window.location.href = `anime.js?id=${animeId}`;
        });

        // Append the list item to the container
        listContainer.appendChild(listItem);
      });
    })
    .catch(error => {
      console.error('Error fetching anime data:', error);
    });  
    
        
    } else {
      console.log('No title provided.');
    }
  });
}