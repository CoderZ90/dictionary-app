// importing - API used Dictionary API
let input = document.querySelector('#input');
let searchBtn = document.querySelector('#search');
let apiKey = 'd42f9402-ee5c-4382-932b-cf8d3f7c082e'
let notFound = document.querySelector('.not__found');
let defBox = document.querySelector('.defi');
let audioBox = document.querySelector('.audio');
let loader = document.querySelector('.loading');

searchBtn.addEventListener('click', function(e) {
    e.preventDefault();
    // Clears Data
    audioBox.innerHTML = '';
    notFound.innerText = '';
    defBox.innerText = '';
    
    // Get inputData
    let word = input.value;
    // call API get data
    if (word === '') {
        alert('Please Enter A Word To Search');
        return;
    }
    // if not empty
    getData(word);
});

async function getData(word) {
    // Loading
    loader.style.display = 'block';

    // Ajax Call API
    const response = await fetch(`https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${apiKey}`);
    const data = await response.json();
    // if empty result
    if (!data.length) {
        // loader
        loader.style.display = 'none';
        notFound.innerHTML = 'No Result Found';
        return;
    }
    // if result notfound and is = suggestion
    if (typeof data[0] === 'string') {
        // loader
        loader.style.display = 'none';
        // object is result not suggestion so we put string
        let heading = document.createElement('h3');
        heading.innerText = 'Try Searching One of these'
        // appending ( showing result )
        notFound.appendChild(heading)

        // Looping all data one by one
        data.forEach(element => {
            let suggestion =  document.createElement('span')
            // adding class suggested to suggestion
            suggestion.classList.add('suggested');
            suggestion.innerText = element;
            // Appending
            notFound.appendChild(suggestion);
        });

        return;
    } 

    // Result found
    let defination = data[0].shortdef[0];
    defBox.innerText = defination;
    loader.style.display = 'none';

    // Sound
    // Sound Get -> AVAILABLE
    const soundName = data[0].hwi.prs[0].sound.audio
    if (soundName) {
        renderSound(soundName);
    }

    console.log(data)
}

function renderSound(soundName) {
    // https://media.merriam-webster.com/soundc11
    let subfolder = soundName.charAt(0);
    let soundSrc = `https://media.merriam-webster.com/soundc11/${subfolder}/${soundName}.wav?key=${apiKey}`;

    let aud = document.createElement('audio');
    aud.src = soundSrc;
    aud.controls = true;
    audioBox.appendChild(aud);
}