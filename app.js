// Longitud och latitud från den plats där användaren befinner sig
// Funktionen körs när sidan laddar

window.addEventListener("load", () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector(".location-timezone");
  let temperatureSection = document.querySelector(".temperature");
  const temperatureSpan = document.querySelector(".temperature span");

  // Hämtar lat o long
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      // api som fungerar som proxy för att få sidan att fungera på local host
      const proxy = "https://cors-anywhere.herokuapp.com/";
      // api key darksky.net
      const api = `${proxy}https://api.darksky.net/forecast/cec3b18963a93888fe6584309f311ae8/${lat},${long}`;

      // Gör en get-request till darksky.net
      // json gör att data från api omvandlas till js
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises
      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          // Ger data till DOM element från api
          const { temperature, summary, icon } = data.currently;
          temperatureDegree.textContent = temperature;
          temperatureDescription.textContent = summary;
          locationTimezone.textContent = data.timezone;
          // formel för C
          let celsius = (temperature - 32) * (5 / 9);

          // Anger ikon
          setIcons(icon, document.querySelector(".icon"));

          // Skifta temperatur mellan C/F
          temperatureSection.addEventListener("click", () => {
            // händelselyssnare - click
            if (temperatureSpan.textContent === "F") {
              temperatureSpan.textContent = "C";
              temperatureDegree.textContent = Math.floor(celsius);
            } else {
              temperatureSpan.textContent = "F";
              temperatureDegree.textContent = temperature;
            }
          });
        });
    });
  }

  // Importerar ikoner från skycons
  function setIcons(icon, iconID) {
    const skycons = new Skycons({ color: "white" }); //skapar nytt icon bibliotek + ändrar ikonens färg till vit
    const currentIcon = icon.replace(/-/g, "_").toUpperCase(); // ersätter bindestreck med underscore + omvandlar text till stor bokstav
    skycons.play(); // startar animation av icon
    return skycons.set(iconID, Skycons[currentIcon]); // returnerar den aktuell ikonen från rad 31
  }
});

//SJälvkritik - clean code! Functions i separata sektioner
