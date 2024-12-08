export const getData = async () => {

	try {
	  // Skicka en POST-förfrågan för att hämta API-nyckeln
	const keyResponse = await fetch("https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/keys", {
		method: "POST", // Använd POST-metod för att hämta nyckeln
	});

	  // Extrahera nyckeln från svaret
	const { key } = await keyResponse.json();

	  // Använd nyckeln för att hämta data om planeter
	const dataResponse = await fetch("https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/bodies", {
		method: "GET", // Använd GET-metod för att hämta data
		headers: { "x-zocom": key }, // Lägg till nyckeln i förfrågans header
	});

	  // Returnera den hämtade datan i JSON-format
	return await dataResponse.json();
	} catch (error) {
	  // Om ett fel uppstår, loggas det i konsolen
	console.error("Error occurred while fetching data:", error);
	}
};
