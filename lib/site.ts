// Budynek przy ul. Źródlanej 37 w Brzeziu, nie środek Zabierzowa.
const mapLat = 50.1238268
const mapLon = 19.8285978

export const company = {
  name: 'GPRO Sp. z o.o.',
  street: 'ul. Źródlana 37',
  city: '32-080 Brzezie',
  phone: '602 695 400',
  phoneHref: 'tel:+48602695400',
  email: 'biuro@gpro.com.pl',
  emailHref: 'mailto:biuro@gpro.com.pl',
  nip: '6562305179',
  formEmail: 'prycerz@student.agh.edu.pl',
  mapLat,
  mapLon,
  maps: `https://www.google.com/maps?q=${mapLat},${mapLon}&ll=${mapLat},${mapLon}&z=17`,
  mapEmbed: `https://www.openstreetmap.org/export/embed.html?bbox=${(mapLon - 0.0078).toFixed(4)}%2C${(mapLat - 0.0055).toFixed(4)}%2C${(mapLon + 0.0078).toFixed(4)}%2C${(mapLat + 0.0055).toFixed(4)}&layer=mapnik&marker=${mapLat}%2C${mapLon}`,
  lead: 'Profesjonalna produkcja i hurtowa sprzedaż roślin ozdobnych. Zapewniamy najwyższą jakość materiału ogrodniczego.',
}

export type PhotoFit = 'cover' | 'contain'

export type GalleryItem = {
  src: string
  title: string
  description: string
  alt: string
  fit: PhotoFit
  position: string
}

export const gallery: GalleryItem[] = [
  {
    src: '/galeria/chryzantemy.jpg',
    title: 'Chryzantemy żółte',
    description:
      'Długie rzędy kwitnących chryzantem w szklarni. Wyrównany, gęsty materiał przygotowany do sprzedaży hurtowej.',
    alt: 'Żółte chryzantemy w doniczkach, ustawione rzędami w szklarni',
    fit: 'cover',
    position: 'center',
  },
  {
    src: '/galeria/bratek-9cm.jpg',
    title: 'Bratek, doniczka 9 cm',
    description:
      'Żółty bratek w doniczce produkcyjnej 9 cm. Klasyczna roślina na rabaty i skrzynki balkonowe.',
    alt: 'Żółty bratek z ciemnym środkiem w żółtej doniczce',
    fit: 'cover',
    position: 'center 62%',
  },
  {
    src: '/galeria/pierwiosnek.jpg',
    title: 'Pierwiosnek',
    description:
      'Różowy pierwiosnek z żółto-czerwonym oczkiem. Kompaktowa roślina doniczkowa na początek sezonu.',
    alt: 'Różowy pierwiosnek z zielonymi liśćmi na jasnym tle',
    fit: 'cover',
    position: 'center 36%',
  },
  {
    src: '/galeria/primule-taca.jpg',
    title: 'Primule w tacy',
    description:
      'Wielokolorowe pierwiosnki spakowane w tacy transportowej. Wygodna forma do wysyłki hurtowej.',
    alt: 'Taca z niebieskimi, czerwonymi, różowymi, żółtymi i białymi pierwiosnkami',
    fit: 'cover',
    position: 'center',
  },
  {
    src: '/galeria/poinsecja-czerwona.jpg',
    title: 'Poinsecja czerwona',
    description:
      'Klasyczna czerwona poinsecja w doniczce. Intensywny kolor i gęsto osadzone przykwiatki.',
    alt: 'Czerwona poinsecja w doniczce na jasnym tle',
    fit: 'cover',
    position: 'center',
  },
  {
    src: '/galeria/poinsecja-marmurkowa.jpg',
    title: 'Poinsecja marmurkowa',
    description:
      'Odmiana o różowo-kremowych przykwiatkach. Wyrazista alternatywa dla klasycznej czerwieni.',
    alt: 'Poinsecja o marmurkowych, różowo-kremowych przykwiatkach',
    fit: 'cover',
    position: '32% center',
  },
  {
    src: '/galeria/poinsecja-kremowa.jpg',
    title: 'Poinsecja kremowa',
    description:
      'Jasna, kremowo-biała poinsecja. Spokojniejszy kolor do świątecznej oferty.',
    alt: 'Kremowa poinsecja w bordowej doniczce',
    fit: 'cover',
    position: '30% center',
  },
  {
    src: '/galeria/poinsecje-szklarnia.jpg',
    title: 'Poinsecje w szklarni',
    description:
      'Czerwone i kremowe poinsecje w hali produkcyjnej, przygotowane na sezon świąteczny.',
    alt: 'Hala pełna czerwonych i kremowych poinsecji',
    fit: 'cover',
    position: 'center',
  },
  {
    src: '/galeria/wrzos.jpg',
    title: 'Wrzos',
    description:
      'Różowy wrzos o zwartej, kopulastej formie. Roślina doniczkowa na jesienną ofertę.',
    alt: 'Różowy wrzos w białej doniczce',
    fit: 'contain',
    position: 'center',
  },
  {
    src: '/galeria/uprawa-polowa.jpg',
    title: 'Uprawa polowa',
    description:
      'Rośliny doniczkowe w równych rzędach, z tunelami foliowymi w tle. Tak wygląda skala produkcji w Brzeziu.',
    alt: 'Pole pełne zielonych roślin doniczkowych i tunele foliowe w tle',
    fit: 'cover',
    position: 'center 42%',
  },
]

export const offers = [
  {
    title: 'Chryzantemy',
    season: 'Jesień',
    text: 'Kwitnące chryzantemy z własnej szklarni. Gęsty, wyrównany materiał pod zamówienia hurtowe.',
    image: '/galeria/chryzantemy.jpg',
    alt: 'Żółte chryzantemy w szklarni',
    fit: 'cover' as const,
    position: 'center',
  },
  {
    title: 'Bratki',
    season: 'Wiosna',
    text: 'Bratki w doniczce produkcyjnej 9 cm. Roślina rabatowa i balkonowa na początek sezonu.',
    image: '/galeria/bratek-9cm.jpg',
    alt: 'Żółty bratek w doniczce 9 cm',
    fit: 'cover' as const,
    position: 'center 62%',
  },
  {
    title: 'Pierwiosnki',
    season: 'Wiosna',
    text: 'Pierwiosnki w pojedynczych doniczkach i w tacach transportowych, w kilku kolorach.',
    image: '/galeria/primule-taca.jpg',
    alt: 'Kolorowe pierwiosnki w tacy transportowej',
    fit: 'cover' as const,
    position: 'center',
  },
  {
    title: 'Poinsecje',
    season: 'Święta',
    text: 'Czerwone, kremowe i marmurkowe poinsecje. Uprawa w szklarni, gotowa na sezon świąteczny.',
    image: '/galeria/poinsecja-czerwona.jpg',
    alt: 'Czerwona poinsecja',
    fit: 'cover' as const,
    position: 'center',
  },
  {
    title: 'Wrzosy',
    season: 'Jesień',
    text: 'Zwarte wrzosy w doniczce. Uzupełnienie jesiennej oferty obok chryzantem.',
    image: '/galeria/wrzos.jpg',
    alt: 'Różowy wrzos w doniczce',
    fit: 'contain' as const,
    position: 'center',
  },
  {
    title: 'Rośliny doniczkowe',
    season: 'Sezonowo',
    text: 'Produkcja na polu i w tunelach. Asortyment zmienia się w ciągu roku — zapytaj, co jest aktualnie dostępne.',
    image: '/galeria/uprawa-polowa.jpg',
    alt: 'Uprawa roślin doniczkowych na polu',
    fit: 'cover' as const,
    position: 'center 42%',
  },
]
