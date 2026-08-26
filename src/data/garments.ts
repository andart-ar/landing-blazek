import type { ImageMetadata } from 'astro';
import type { TraitVector } from './traits';
import camperaRib from '@/assets/clothing/campera_rib.jpg';
import remeraSenda from '@/assets/clothing/remera_senda.jpg';
import remeraClassicSenda from '@/assets/clothing/remera_classic_senda.jpg';
import remeraClassic from '@/assets/clothing/remera_classic.jpg';
import hoodieOllie from '@/assets/clothing/hoodie_ollie.jpg';

export interface Garment {
  id: string;
  name: string;
  vector: TraitVector;
  teaserCopy: string;
  image: ImageMetadata | null;
}

export const GARMENTS: Garment[] = [
  {
    id: 'remera-rollin',
    name: 'Remera Rollin',
    vector: [3, 1, 3, 3, 0, 1, 0],
    teaserCopy:
      'Te movés rápido, conectás con todos y no te quedás quieto. La Rollin es para los que llegan y prenden el ambiente.',
    image: null,
  },
  {
    id: 'classic-bzk-blanca',
    name: 'Remera Classic',
    vector: [1, 2, 1, 1, 3, 2, 3],
    teaserCopy:
      'Sobria, limpia, sin gritar. La Classic es para los que dicen mucho diciendo poco.',
    image: remeraClassic,
  },
  {
    id: 'remera-senda',
    name: 'Remera Senda',
    vector: [2, 2, 3, 2, 0, 3, 0],
    teaserCopy:
      'Equilibrio entre la calle y la idea. La Senda es para los que crean en movimiento y arrastran a la banda.',
    image: remeraSenda,
  },
  {
    id: 'classic-senda',
    name: 'Remera Classic Senda',
    vector: [2, 1, 2, 2, 1, 3, 1],
    teaserCopy:
      'Versátil, prolija, siempre a mano. La Classic Senda es la prenda que combina con todo lo que sos.',
    image: remeraClassicSenda,
  },
  {
    id: 'campera-rib',
    name: 'Campera Rib',
    vector: [1, 2, 0, 1, 3, 2, 3],
    teaserCopy:
      'Tu refugio para todas las estaciones. La Campera Rib es para los que valoran su espacio y su ritmo.',
    image: camperaRib,
  },
  {
    id: 'hoodie-ollie',
    name: 'Hoodie Ollie',
    vector: [2, 1, 1, 2, 1, 1, 2],
    teaserCopy:
      'Comodidad sin perder actitud. La Hoodie Ollie es para los que fluyen y se la bancan en cualquier plan.',
    image: hoodieOllie,
  },
];
