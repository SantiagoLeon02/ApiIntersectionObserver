const url = 'https://rickandmortyapi.com/api/character';
let cards = document.getElementById('cards-characters');
let sentinela = document.getElementById('sentinela');

let page = 1;
let loading = false;

async function mostrarDatos(){

    if(loading) return;
    loading = true;


    try{
        const response = await fetch(`${url}?page=${page}`);
        const data = await response.json();
        console.log(data);
    
        data.results.map(item => {
            const divContent = document.createElement('div');
            divContent.className = 'card-character';
            divContent.innerHTML = `
                <div class="character">
                    <img class="image-character" src="${item.image}" alt="" srcset="">
                    <div class="character-info">
                    <p id="id-character">${item.id}</p>
                    <h1> Nombre ${item.name}</h1>
                    <p>${item.status} - ${item.species}</p>
                    </div>
                </div>
            `;
    
            cards.appendChild(divContent);
        });
        page++;
    }catch(error){
        console.log('Error al cargar los personajes ', error);
    }

    loading = false;
}

const observer = new IntersectionObserver(entries =>{
    const lastEntry = entries[0];
    if(lastEntry.isIntersecting){
        mostrarDatos();
    }
}, { rootMargin: '100px', threshold: 1.0 });

observer.observe(sentinela)


mostrarDatos();

// console.log('Todo bien')