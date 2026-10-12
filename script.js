
const parkingForm = document.getElementById("parkingForm");
const searchMessage = document.getElementById("searchMessage");
const parkingResults = document.getElementById("parkingResults");

const parkingLots = [

const parkingLots = [
    {
        name: "Erode Junction Parking",
        location: "Railway Colony, Erode",
        distance: 0.5,
        price: 20,
        vehicles: ["TWO_WHEELER", "FOUR_WHEELER"],
        available: 12,
        totalSpaces: 30,
        updated: "Sample data"
    },
    {
        name: "Central Bus Stand Parking",
        location: "Sathy Road, Erode",
        distance: 0.8,
        price: 15,
        vehicles: ["TWO_WHEELER", "FOUR_WHEELER"],
        available: 8,
        totalSpaces: 20,
        updated: "Sample data"
    },
    {
        name: "Brough Road Parking",
        location: "Brough Road, Erode",
        distance: 1.2,
        price: 25,
        vehicles: ["TWO_WHEELER", "FOUR_WHEELER"],
        available: 5,
        totalSpaces: 15,
        updated: "Sample data"
    },
    {
        name: "Erode EV Parking Demo",
        location: "Erode city — example location",
        distance: 1.5,
        price: 30,
        vehicles: ["EV"],
        available: 4,
        totalSpaces: 10,
        updated: "Sample data"
    }
];

];

function calculateScore(lot) {
    const distanceScore = Math.max(0, 100 - lot.distance * 40);
    const priceScore = Math.max(0, 100 - lot.price);
    const availabilityScore =
        (lot.available / lot.totalSpaces) * 100;

    return (
        distanceScore * 0.4 +
        priceScore * 0.3 +
        availabilityScore * 0.3
    );
}

parkingForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const destination =
        document.getElementById("destination").value.trim();

    const arrival =
        document.getElementById("arrival").value;

    const vehicle =
        document.getElementById("vehicle").value;

    if (!destination || !arrival || !vehicle) {
        searchMessage.textContent =
            "Please complete all parking search fields.";
        return;
    }

    const arrivalDate = new Date(arrival);

    if (
        Number.isNaN(arrivalDate.getTime()) ||
        arrivalDate <= new Date()
    ) {
        searchMessage.textContent =
            "Please select a future arrival time.";
        parkingResults.replaceChildren();
        return;
    }

    const matchingLots = parkingLots
        .filter(lot => lot.vehicles.includes(vehicle))
        .map(lot => ({
            ...lot,
            score: calculateScore(lot)
        }))
        .sort((a, b) => b.score - a.score);

    searchMessage.textContent =
        "Sample parking recommendations for " + destination + ".";

    if (matchingLots.length === 0) {
        parkingResults.textContent =
            "No matching sample parking options found.";
        return;
    }

    parkingResults.innerHTML = matchingLots.map((lot, index) => `
        <article class="parking-card">
            ${index === 0
                ? '<p class="recommendation-badge">Top sample match</p>'
                : ''}
            <h3>${lot.name}</h3>
            <p>${lot.location}</p>
            <p><strong>Distance:</strong> ${lot.distance} km</p>
            <p><strong>Price:</strong> ₹${lot.price}/hour</p>
            <p><strong>Sample spaces:</strong> ${lot.available}</p>
            <p><strong>Availability ratio:</strong>
                ${Math.round(lot.available / lot.totalSpaces * 100)}%
            </p>
            <p><strong>Recommendation score:</strong>
                ${Math.round(lot.score)}/100
            </p>
            <p class="freshness">
                Sample data only — timestamp: ${lot.updated}
            </p>
        </article>
    `).join("");
});
