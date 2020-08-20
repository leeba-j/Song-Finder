let term = '';
const songContainer = document.getElementById('songs');


const updateTerm = () => {
    console.log('Searching');
    term = document.getElementById('searchInput').value;

    if (!term || term === ''){
        alert('Please enter a search term')
    }
    else
    {
    while(songContainer.firstChild)
    {
        songContainer.removeChild(songContainer.firstChild);
    }

        const url = `https://itunes.apple.com/search?limit=12&media=music&term=${term}`;

        fetch(url)
        .then((response) => { return response.json()})
        .then( (data)=>{ 
            const artists = data.results
            return artists.map( (results) => {
                const article = document.createElement('article'),
                artist = document.createElement('p'),
                song = document.createElement('p'),
                img = document.createElement('img'),
                audio = document.createElement('audio'),
                audioSource = document.createElement('source')

                artist.innerHTML = results.artistName
                song.innerHTML = results.trackName
                img.src = results.artworkUrl100
                audioSource.src = results.previewUrl
                
                audio.setAttribute('controls', '')
                article.appendChild(img)
                article.appendChild(artist)
                article.appendChild(song)
                article.appendChild(audio)
                audio.appendChild(audioSource)
                songContainer.appendChild(article)
    })
})
.catch ( error => console.log('Request failed: ' , error))
    }
}

const searchBtn = document.querySelector('button');
searchBtn.addEventListener('click', updateTerm);

document.addEventListener('play', event =>{
    const audio = document.getElementsByTagName('audio');
    for( let i = 0; i < audio.length; i++)
        {
            if(audio[i] != event.target)
            {
                audio[i].pause();
            }
        }
}, true)