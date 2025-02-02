export interface WeatherResponse {
    coord: Coordinates;
    weather: Weather[];
    base: string;
    main: MainWeather;
    visibility: number;
    wind: Wind;
    rain?: Precipitation;
    snow?: Precipitation;
    clouds: Clouds;
    dt: number;
    sys: System;
    timezone: number;
    id: number;
    name: string;
    cod: number;
}

interface Coordinates {
    lon: number;
    lat: number;
}

interface Weather {
    id: number;
    main: string;
    description: string;
    icon: string;
}

interface MainWeather {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level?: number;
    grnd_level?: number;
}

interface Wind {
    speed: number;
    deg: number;
    gust?: number;
}

interface Precipitation {
    "1h"?: number;
    "3h"?: number;
}

interface Clouds {
    all: number;
}

interface System {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
}
