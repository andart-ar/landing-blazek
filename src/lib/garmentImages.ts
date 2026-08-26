import { getImage } from 'astro:assets';
import { GARMENTS } from '@/data/garments';

const GARMENT_IMAGE_WIDTH = 900;

export async function buildGarmentImageMap(): Promise<Record<string, string>> {
  const entries = await Promise.all(
    GARMENTS.filter((garment) => garment.image).map(async (garment) => {
      const optimized = await getImage({
        src: garment.image!,
        format: 'webp',
        width: GARMENT_IMAGE_WIDTH,
      });
      return [garment.id, optimized.src] as const;
    }),
  );
  return Object.fromEntries(entries);
}
