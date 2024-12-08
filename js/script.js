import { getData } from "./fetch.js"; // Importera funktionen för att hämta data från API
import { planets, displayData, changePage } from "./data.js"; // Importera data från data.js för att hantera element och visa information

// Funktion för att hantera planetinteraktioner och visa data när en planet klickas
const handlePlanetInteraction = async () => {
	try {
		// Hämta planetdata från API
		const { bodies } = await getData(); // Avkapsla direkt för enkelhet
		console.log(bodies); // Skriv ut planetdata i konsolen för debugging

		// Loopa igenom varje planet och lägg till eventlyssnare för klick
		for (const [key, element] of Object.entries(planets)) {
			if (!element) continue; // Om elementet inte finns, hoppa över det

			// Lägg till en klicklyssnare för varje planet
			element.addEventListener("click", () => {
				// Hitta planeten som matchar nyckeln (kockpnamn) baserat på dess namn
				const body = bodies.find(
					(b) => b.name.toLowerCase() === key.toLowerCase() // Jämför planetnamn
				);
				if (!body) return; // Om planeten inte finns, gör inget

				console.log(`Clicked on: ${body.name}`); // Skriv ut namnet på den klickade planeten för debugging

				// Destrukturera objektet body för att få ut nödvändig data om planeten
				const {
					name,
					latinName,
					desc,
					circumference,
					distance,
					temp,
					moons,
				} = body;

				// Uppdatera visad planetdata i gränssnittet
				displayPlanetData({
					name,
					latinName,
					desc,
					circumference,
					distance,
					temp,
					moons,
				});

				// Byt till informationssidan för planeten
				changePage.planets.style.display = "none"; // Göm planetsidan
				changePage.info.style.display = "flex"; // Visa informationssidan
			});
		}
	} catch (err) {
		console.error("Error:", err); // Fånga eventuella fel och skriv ut dem i konsolen
	}
};

// Funktion för att uppdatera planetdata i användargränssnittet
const displayPlanetData = ({ name, latinName, desc, circumference, distance, temp, moons }) => {
	// Uppdatera texten med planetens data
	displayData.planetName.textContent = name.toUpperCase(); // Konvertera planetnamnet till stora bokstäver
	displayData.latin.textContent = latinName.toUpperCase(); // Visa latinskt namn
	displayData.infoText.textContent = desc; // Visa beskrivning
	displayData.omkretsInfo.textContent = `${circumference}KM`; // Visa omkrets i kilometer
	displayData.distansKm.textContent = `${distance}KM`; // Visa avstånd i kilometer
	displayData.maxTemp.textContent = `${temp.day}C`; // Visa max temperatur på dagen
	displayData.minTemp.textContent = `${temp.night}C`; // Visa min temperatur på natten

	// Hantera månar
	const maxMoonsToShow = 5; // Maximalt antal månar att visa
	if (moons.length > 0) {
		// Om planeten har månar, visa upp till maxMoonsToShow
		displayData.moon.textContent =
			moons.length > maxMoonsToShow
				? `${moons.slice(0, maxMoonsToShow).join(", ")}... (+${moons.length - maxMoonsToShow} more)` // Visa de första 5 månarna, och markera att fler finns
				: moons.join(", "); // Visa alla månar om det finns färre än max
	} else {
		displayData.moon.textContent = "NOTHING moons"; // Om planeten inte har några månar, visa meddelandet
	}
};

// Funktion för att navigera tillbaka till planetsidan
const navigateBackToPlanets = () => {
	// Visa planetsidan och göm informationssidan
	changePage.planets.style.display = "flex";
	changePage.info.style.display = "none";
};

// Lägg till eventhantering för tillbaka-knappen
changePage.button.addEventListener("click", navigateBackToPlanets);

// Anropa huvudfunktionen för att initiera interaktioner
handlePlanetInteraction();
