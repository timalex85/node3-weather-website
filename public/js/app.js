console.log('Client side javascript file is loaded');

// fetch('http://localhost:3000/weather?address=Boston').then((response) => {
//     response.json().then((data) => {
//         console.log(data.forecast)
//     })
// }) 




const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

messageOne.textContent = '';
messageTwo.textContent = '';

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    messageTwo.textContent = ''
    
    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = `${data.forecast.description}. Current temperature is ${data.forecast.temperature} and it feels like ${data.forecast.feelslike}`;
            }
        })
    })

})