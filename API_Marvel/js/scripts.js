    document.addEventListener("DOMContentLoaded", () => {
        const publicKey = "78d6e4594a04c8daeb3088838d11ad45"; 
        const privateKey = "2c037f1916c0bda19b80b71cffaa6e281699374e";
        const ts = new Date ().getTime ();
        const baseUrl = "https://gateway.marvel.com:443/v1/public/characters";
        const characterListElement = document.getElementById("character-list");
        const hash = md5(ts+publicKey+privateKey);
        let offset = 20;

        function moreCharacter () {
          fetch(`${baseUrl}?apikey=${publicKey}&hash=${md5}&offset=${offset}`)
          .then(response => response.json())
          .then(response => response.data.results)
          .then(characters => displayCharacters(characters, characterListElement))
          offset+=22
        }
        
        document.querySelector ("button").addEventListener("click", moreCharacter)
      
        fetchCharacters(baseUrl, publicKey, hash)
          .then(characters => displayCharacters(characters, characterListElement))
          .catch(error => console.error("Error fetching data:", error));
      });
      
      async function fetchCharacters(baseUrl, publicKey, md5) {
        const apiUrl = `${baseUrl}?apikey=${publicKey}&hash=${md5}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.data.results;
      }
      
      function displayCharacters(characters, container) {
        characters.forEach(character => {
          const { name, description, thumbnail } = character;
          console.log (thumbnail);
          if (!thumbnail.path.includes ("image_not_available" )) {
            const characterCard = createCharacterCard(name, description, thumbnail);
            container.appendChild(characterCard);
          }
        });
      }
      
      function createCharacterCard(name, description, thumbnail) {
        const characterCard = document.createElement("div");
        characterCard.classList.add("col-md-4", "mb-4");
      
        characterCard.innerHTML = `
          <div class="card">
            <img src="${thumbnail.path}.${thumbnail.extension}" class="card-img-top" alt="${name}">
            <div class="card-body">
              <h5 class="card-title">${name}</h5>
              <p class="card-text">${description || "No description available."}</p>
            </div>
          </div>
        `;
      
        return characterCard;
      }

      
      