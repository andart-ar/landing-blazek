import type { TraitVector } from './traits';

export interface Garment {
  id: string;
  name: string;
  vector: TraitVector;
  teaserCopy: string;
  image: string;
}

const UNSPLASH = 'https://images.unsplash.com/photo-';
const UNSPLASH_PARAMS = '?w=900&q=80&auto=format&fit=crop';

const unsplash = (id: string) => `${UNSPLASH}${id}${UNSPLASH_PARAMS}`;

export const GARMENTS: Garment[] = [
  {
    id: 'remera-rollin',
    name: 'Remera Rollin',
    vector: [3, 1, 3, 3, 0, 1, 0],
    teaserCopy:
      'Te movés rápido, conectás con todos y no te quedás quieto. La Rollin es para los que llegan y prenden el ambiente.',
    image: unsplash('1503341733017-1901578f9f1e'),
  },
  {
    id: 'classic-bzk-blanca',
    name: 'Remera Classic BZK Blanca',
    vector: [1, 2, 1, 1, 3, 2, 3],
    teaserCopy:
      'Sobria, limpia, sin gritar. La Classic BZK Blanca es para los que dicen mucho diciendo poco.',
    image: unsplash('1523585298601-d46ae038d7d3'),
  },
  {
    id: 'classic-bzk-negra',
    name: 'Remera Classic BZK Negra',
    vector: [1, 3, 1, 0, 3, 3, 2],
    teaserCopy:
      'Foco, detalle y carácter. La Classic BZK Negra acompaña a los que van a lo suyo sin distracciones.',
    image: unsplash('1503341504253-dff4815485f1'),
  },
  {
    id: 'remera-senda',
    name: 'Remera Senda',
    vector: [2, 2, 3, 2, 0, 3, 0],
    teaserCopy:
      'Equilibrio entre la calle y la idea. La Senda es para los que crean en movimiento y arrastran a la banda.',
    image: unsplash('1503341338985-c0477be52513'),
  },
  {
    id: 'classic-senda',
    name: 'Remera Classic Senda',
    vector: [2, 1, 2, 2, 1, 3, 1],
    teaserCopy:
      'Versátil, prolija, siempre a mano. La Classic Senda es la prenda que combina con todo lo que sos.',
    image: unsplash('1593726891090-b4c6bc09c819'),
  },
  {
    id: 'camisa-bz',
    name: 'Camisa BZ',
    vector: [3, 3, 1, 1, 2, 3, 2],
    teaserCopy:
      'Ambición con criterio. La Camisa BZ es para los que arman su mundo con detalle y no se conforman.',
    image: unsplash('1624124959348-86710fef6630'),
  },
  {
    id: 'campera-rib',
    name: 'Campera Rib',
    vector: [1, 2, 0, 1, 3, 2, 3],
    teaserCopy:
      'Tu refugio para todas las estaciones. La Campera Rib es para los que valoran su espacio y su ritmo.',
    image: unsplash('1654169368969-c0836b5fb377'),
  },
  {
    id: 'hoodie-ollie',
    name: 'Hoodie Ollie',
    vector: [2, 1, 1, 2, 1, 1, 2],
    teaserCopy:
      'Comodidad sin perder actitud. La Hoodie Ollie es para los que fluyen y se la bancan en cualquier plan.',
    image: unsplash('1630590613173-b01fdb40a1eb'),
  },
  {
    id: 'boxers-bzk',
    name: 'Boxers BZK',
    vector: [1, 3, 3, 1, 0, 3, 1],
    teaserCopy:
      'El detalle que solo vos sabés. Los Boxers BZK son para los que cuidan hasta lo que no se ve.',
    image: unsplash('1589902860314-e910697dea18'),
  },
];
