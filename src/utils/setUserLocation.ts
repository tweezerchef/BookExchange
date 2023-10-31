// utils/location.js
import prisma from "./prismaClient";

interface LocationData {
  userId: string;
  address: string;
}

interface GeocodeResponse {
  results: {
    geometry: {
      location: {
        lat: number;
        lng: number;
      };
    };
    address_components: {
      long_name: string;
      types: string[];
    }[];
  }[];
}

export async function setUserLocation({ userId, address }: LocationData) {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.GOOGLE_MAPS_API_KEY}`
    );
    const data: GeocodeResponse = (await response.json()) as GeocodeResponse;

    const { location } = data.results[0].geometry;
    const { lat, lng } = location;

    const cityComponent = data.results[0].address_components.find((component) =>
      component.types.includes("locality")
    );

    const city = cityComponent ? cityComponent.long_name : "";

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        latitude: lat,
        longitude: lng,
        city,
      },
    });

    return { lat, lng, city };
  } catch (error) {
    console.error(error);
    throw new Error("Failed to add location");
  }
}
