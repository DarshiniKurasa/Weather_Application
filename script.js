const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {
    const APIKey = '7b037771901a6fe652ca0bfb076f4143';
    const city = document.querySelector('.search-box input').value.trim();

    if (city === "") {
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
            if (json.cod === '404') {
                container.classList.remove('active');
                container.classList.add('error'); // Add error class for wrong location
                error404.classList.add('active'); // Display error message
                weatherBox.classList.remove('active');
                weatherDetails.classList.remove('active');
                return;
            }

            // If valid location, show the weather information
            container.classList.remove('error'); // Remove error class if any
            container.classList.add('active'); // Add active class for valid data
            error404.classList.remove('active'); // Hide error message

            const image = document.querySelector('.weather-box img');
            const temp = document.querySelector('.weather-box .temp');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'images/R.png';
                    break;
                case 'Rain':
                    image.src = 'images/rain.png';
                    break;
                case 'Snow':
                    image.src = 'images/snow.png';
                    break;
                case 'Clouds':
                    image.src = 'images/brokenclo.png';
                    break;
                case 'Mist':
                    image.src = 'images/mist.png';
                    break;
                default:
                    image.src = 'images/brokenclo.png';
                    break;
            }

            temp.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            weatherBox.classList.add('active');
            weatherDetails.classList.add('active');
        })
        .catch(() => {
            // In case of any network or other errors
            container.classList.remove('active');
            container.classList.add('error');
            error404.classList.add('active');
            weatherBox.classList.remove('active');
            weatherDetails.classList.remove('active');
        });
});

// Handle re-entering location
document.querySelector('.search-box input').addEventListener('input', () => {
    if (container.classList.contains('error')) {
        container.classList.remove('error'); // Remove error class to reset the UI
        error404.classList.remove('active'); // Hide the error message
    }
});
