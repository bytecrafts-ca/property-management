import type { StayPhoto } from "@/lib/stays";

type HospitablePhoto = {
  thumbnail: string;
  xx_large: string;
  order: number;
};

const ONE_DAY = 60 * 60 * 24;

export async function getStayPhotos(propertyId: string): Promise<StayPhoto[]> {
  try {
    const res = await fetch(`https://api.hospitable.com/bookings/api/properties/${propertyId}`, {
      headers: { Accept: "application/json" },
      next: { revalidate: ONE_DAY },
    });
    if (!res.ok) return [];
    const json = (await res.json()) as { data?: { photos?: HospitablePhoto[] } };
    return (json.data?.photos ?? [])
      .slice()
      .sort((a, b) => a.order - b.order)
      .map((photo) => ({ thumb: photo.thumbnail, large: photo.xx_large }));
  } catch {
    return [];
  }
}
