let test;
let loadLocation = true;

//web apis

//location api
let locationApiUrl = "https://api.ipbase.com/v2/info?apikey=2bb94720-4fd9-11ec-9dd7-8f5634a9b075";
//weather api
let weatherApiUrl = "https://api.openweathermap.org/data/2.5/";
let weatherUnits = "imperial";
let weatherAppid = "24bed316bab905f5361040ddf743ba65";

//forecast object definition
function Forecast(timestamp, temperature, high, low, sky, humidity, icon){
    this.time = vm.getHumanReadableDate(timestamp);
    this.temperature = temperature;
    this.high = high;
    this.low = low;
    this.sky = sky;
    this.humidity = humidity;
    this.icon = vm.getIconLink(icon);
}



function NewsStory(title, date, description, pageUrl, imageUrl, local){
    this.title = title;
    this.date = date;
    this.description = description;
    this.pageUrl = pageUrl;
    this.imageUrl = imageUrl;
    this.local = local;
}


const app = Vue.createApp({
    data() {
        return {
            newsStories: [
                new NewsStory("House Fire", "04/27/2022","A home on Willard Drive in Sandy caught fire.", "pages/fire.html", "images/housefire.jpg", true),
                new NewsStory("Tornado Touchdown", "04/26/2022", "Tornado touched down in SLC", "pages/tornado.html", "images/tornado.jpg", true),
                new NewsStory("Muzos Buys Out Chatter", "04/28/2022", "Chatter board agrees to sell", "pages/business.html", "images/business.jpg", true),
                new NewsStory("Hurricane in Pacific", "04/29/2022", "Hurricane off the coast of Luzon", "pages/hurricane.html", "images/hurricane.jpg", false),
                new NewsStory("Tsunami Hits Japan", "04/27/2022", "A tsunami hit the Japanese coast", "pages/tsunami.html", "images/tsunami.jpg", false)
            ],
            error: false,
            fetchingLocation: false,
            fetchingWeather: false,
            location: {
            },

            currentConditions: {
                time:'',
                temperature: 0,
                high: 0,
                low: 0,
                sky:'',
                humidity:0,
                icon:''
            },

            forecasts: [],
        };
    },

    methods: {

        async fetchData(){
            let result = await this.getLocation();
            console.log("Location fetch result: " + result);
            if(result){ //if location data was obtained successfully
                this.fetchWeather(); //fetch weather data
            }
            else
            {
                this.error = true;
            }

            /*this.fetchLocation()
            .then( locationJson => {
                this.location = locationJson; //set location data
                this.fetchingLocation = false;
                this.fetchWeather();
            })
            .catch(error => {
                console.log("An error occurred while fetching data.")
                this.fetchingLocation = false;
                this.fetchingWeather = false;
                this.error = true;
            });*/
        },

        fetchWeather(){
            console.log("Fetching weather");
            this.fetchingWeather = true;
            
            let url = `${weatherApiUrl}weather?lat=${this.location.latitude}&lon=${this.location.longitude}&units=${weatherUnits}&appid=${weatherAppid}`;

            return fetch(url)
            .then(response => response.json())
            .then(json => {
                this.currentConditions = this.createForecast(json);
                this.fetchForecasts();
                this.fetchingWeather = false;
            })
            .catch(error => {
                console.log("An error occurred while fetching weather data.");
                this.error = true;
                this.fetchingWeather = false;
            });
        },
        
        fetchLocation(){
            return fetch(locationApiUrl)
            .then(response => response.json());
        },

        async getLocation(){
            console.log("getting location");
            this.fetchingLocation = true;
            let result = false;
            if(loadLocation){
                await this.fetchLocation()
                    .then(locationData => {
                        test = locationData.data;
                        this.location = locationData.data.location;
                        console.log("fetched location");
                        result = true;
                        return true;
                    })
                    .catch(error => {
                        console.log("An error occurred while getting location data.");
                        this.fetchingLocation = false;
                        this.error = true;
                        return false;
                    });
            }
            console.log("Location fetch result: " + result);
            this.fetchingLocation = false;
            return result;
        },

        getCoordinates(){
            if(this.location.hasOwnProperty('latitude') && this.location.hasOwnProperty('longitude')){
                return `at coordinates (${this.location.latitude}, ${this.location.longitude}).`;
            }
            return ' Unable to determine coordinates from the current Ip address.'; 
        },

        getIconLink(icon){
            return `http://openweathermap.org/img/wn/${icon}@2x.png`;
        },

        getHumanReadableDate(timestamp){
            let date = new Date(Number.parseInt(timestamp) * 1000);
            return date.toLocaleString();
        },

        fetchForecasts(){
            let url = `${weatherApiUrl}forecast?lat=${this.location.latitude}&lon=${this.location.longitude}&units=${weatherUnits}&cnt=40&appid=${weatherAppid}`;
            return fetch(url)
            .then(response => response.json())
            .then(json => {
                this.setForecasts(json.list)
            })
            .catch(error => {
                console.log("An error occurred while fetching forecast data.");
                this.error = true;
            });
        },

        createForecast(json){
            return new Forecast(json.dt, json.main.temp, json.main.temp_max,
             json.main.temp_min, json.weather[0].description, json.main.humidity, json.weather[0].icon);
        },

        setForecasts(forecasts){
            let forecastArray = [];
            for(index in forecasts){
                let f = forecasts[index];
                forecastArray[index] = this.createForecast(f);
            }
            this.forecasts = forecastArray;
        },

    },

    computed: {
        locationString() {
            let locationStr = '';
            if(this.location.hasOwnProperty('city') && this.location.city.hasOwnProperty('name')){
                locationStr += this.location.city.name + ", ";
            }
            if(this.location.hasOwnProperty('region') && this.location.region.hasOwnProperty('name')){
                locationStr += this.location.region.name + ", ";
            }
            if(this.location.hasOwnProperty('country') && this.location.country.hasOwnProperty('name')){
                locationStr += this.location.country.name;
            }

            return `Your Location: ${locationStr} ${this.getCoordinates()}`;
        }
    }

}); 








const vm = app.mount("#app-root");
if(document.querySelector("#load-forecasts")){
    console.log("fetching data");
    vm.fetchData();
}