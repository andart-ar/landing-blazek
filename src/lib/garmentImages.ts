import { getImage } from 'astro:assets';
import type { ImageMetadata } from 'astro';
import { GARMENTS } from '@/data/garments';

const GARMENT_IMAGE_WIDTH = 900;
export const GARMENT_EMAIL_IMAGE_WIDTH = 480;

export interface ResolvedGarmentImage {
  src: string;
  width: number;
  height: number;
}

export async function resolveGarmentImage(
  image: ImageMetadata,
  width: number,
): Promise<ResolvedGarmentImage> {
  const optimized = await getImage({ src: image, format: 'webp', width });
  return {
    src: optimized.src,
    width: Number(optimized.attributes.width),
    height: Number(optimized.attributes.height),
  };
}

export async function buildGarmentImageMap(): Promise<Record<string, string>> {
  const entries = await Promise.all(
    GARMENTS.filter((garment) => garment.image).map(async (garment) => {
      const resolved = await resolveGarmentImage(garment.image!, GARMENT_IMAGE_WIDTH);
      return [garment.id, resolved.src] as const;
    }),
  );
  return Object.fromEntries(entries);
}
