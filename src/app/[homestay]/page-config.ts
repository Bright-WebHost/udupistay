import { homestays } from "@/data/homestays";

export async function generateStaticParams() {
  return homestays.map((homestay) => ({
    homestay: homestay.route.toLowerCase(),
  }));
}
