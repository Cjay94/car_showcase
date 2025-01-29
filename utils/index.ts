import { CarProps, FilterProps } from "@/types";

export const fetchCars = async (filters: FilterProps) => {
  const { manufacturer, year, model, limit, fuel } = filters;

  const headers = new Headers();

  headers.append("X-RapidAPI-Key", process.env.X_RAPID_API_KEY || "");
  headers.append("X-RapidAPI-Host", "cars-by-api-ninjas.p.rapidapi.com");

  const response = await fetch(
    `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&year=${year}&model=${model}&limit=${limit}&fuel_type=${fuel}`,
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

export const generateCarImageUrl = (car: CarProps, angle?: string) => {
  const url = new URL("https://cdn.imagin.studio/getimage");

  const { make, year, model } = car;

  url.searchParams.append(
    "customer",
    process.env.NEXT_PUBLIC_CAR_IMAGE_API_KEY || ""
  );
  url.searchParams.append("make", make);
  url.searchParams.append("modelFamily", model.split(" ")[0]);
  url.searchParams.append("zoomType", "fullscreen");
  url.searchParams.append("modelYear", `${year}`);
  angle && url.searchParams.append("angle", `${angle}`);

  return `${url}`;
};

export const updateSearchParams = (type: string, value: string) => {
  const searchParams = new URLSearchParams(window.location.search);

  searchParams.set(type, value);

  const newPathName = `${window.location.pathname}?${searchParams.toString()}`;

  return newPathName;
};
