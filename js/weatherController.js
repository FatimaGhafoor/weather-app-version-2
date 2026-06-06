export function createWeatherController({
    elements, 
    services,
    view,
    config
}){
    const {cityInput, searchBtn, resultDiv } = elements;
    const { fetchWeather, cache} = services;
    const { showMessage, showLoading, displayWeather} = view;

    function setUpEventListeners(){
        searchBtn.addEventListener("click", handleSearch);
        cityInput.addEventListener("keydown", (e)=>{
            if(e.key === "Enter"){
                e.preventDefault();
                handleSearch();
            }
        });
    }
    function setupNetworkListeners(){
        window.addEventListener("offline", ()=>{
            
        })
    }

    async function handleSearch(){
        
    }
}