export const fetchCars = async () => {
  const rapidAPIKey = String(process.env.X_RAPID_API_KEY);
  const rapidAPIHost = String(process.env.X_RAPID_API_HOST);

  const headers = new Headers();

  headers.append("X-RapidAPI-Key", rapidAPIKey);
  headers.append("X-RapidAPI-Host", rapidAPIHost);

  const response = await fetch(
    "https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?model=corolla",
    {
      headers: headers,
    }
  );

  const result = await response.json();

  return result;
};

export const calculateCarRent = (city_mpg: number, year: number) => {
  const exchangeRate = 18; // 1 USD = 18 ZAR
  const basePricePerDayUSD = 50; // Base rental price per day in USD

  // Convert the base price to ZAR (South African Rand)
  const basePricePerDayZAR = basePricePerDayUSD * exchangeRate;

  const mileageFactor = 0.1; // Additional rate per liter per 100 km driven
  const ageFactor = 0.05; // Additional rate per year of vehicle age

  // Convert city_mpg (miles per gallon) to L/100km (liters per 100 kilometers)
  const cityLPer100km = 235.214 / city_mpg;

  // Calculate additional rate based on mileage and age
  const mileageRate = cityLPer100km * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  // Calculate total rental rate per day in ZAR
  const rentalRatePerDayZAR = basePricePerDayZAR + mileageRate + ageRate;

  return rentalRatePerDayZAR.toFixed(0); // Returns the rental price in ZAR rounded to nearest integer
};
