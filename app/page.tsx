import { CarCard, CustomFilter, SearchBar } from "@/components";
import Hero from "@/components/Hero";
import { fuels, yearsOfProduction } from "@/constants";
import { FilterProps } from "@/types";
import { fetchCars } from "@/utils";
import { Fragment } from "react";

interface HomeProps {
    searchParams: FilterProps
}

export default async function Home({ searchParams }: HomeProps) {
    const allCars = await fetchCars({
        manufacturer: searchParams.manufacturer || '',
        year: searchParams.year || 2022,
        fuel: searchParams.fuel || '',
        limit: searchParams.limit || 10,
        model: searchParams.model || '',
    })


    const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars

    return (
        <main className="overflow-hidden">
            <Hero />

            <section className="mt-12 padding-x padding-y max-width" id="discover">
                <div className="home__text-container">
                    <h1 className="text-4xl font-extrabold">
                        Car Catalogue
                    </h1>
                    <p>Explore the cars you might like</p>
                </div>

                <div className="home__filters">
                    <SearchBar />


                    <div className="home__filter-container">
                        <CustomFilter title="fuel" options={fuels} />
                        <CustomFilter title="year" options={yearsOfProduction} />
                    </div>
                </div>
                {!isDataEmpty ? (
                    <section>
                        <div className="home__cars-wrapper">
                            {allCars?.map((car) => (
                                <Fragment key={car}>
                                    <CarCard car={car} />
                                </Fragment>
                            ))}
                        </div>
                    </section>
                ) : (
                    <div className="home__error-container">
                        <h2 className="text-black text-xl font-bold">
                            Oops, no results
                        </h2>
                        <p>{allCars?.message}</p>
                    </div>
                )}
            </section>
        </main>
    )
}