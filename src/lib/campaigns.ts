import type { Lang } from './site';

/**
 * Kampanje na stranicama igara (PLAN A8): vodič, priča i poglavlja. Brojevi su trenutni sadržaj
 * (`pnpm gen:campaign` u backendu); admin dodaje nivoe u dashboardu, pa piše "i stalno ih je više".
 */
export type CampaignGame = 'peaks' | 'mahjong' | 'freecell' | 'spider' | 'kockice' | 'spinyamb';

interface CampaignText {
  guide: string;
  guideId: string;
  quote: string;
  story: string;
  chapters: string[];
  levels: number;
}

export const campaignLabels: Record<Lang, { title: string; levels: (n: number, c: number) => string; how: string; guide: string }> = {
  bs: {
    title: 'Kampanja i priča',
    levels: (n, c) => `${n} nivoa u ${c} poglavlja, i stalno ih je više`,
    how: 'Svaki nivo ima tri cilja za tri zvjezdice. Zvjezdice otvaraju sljedeće poglavlje, a završeno poglavlje donosi coinse i pomoći "pokaži potez".',
    guide: 'Vodič',
  },
  en: {
    title: 'Campaign and story',
    levels: (n, c) => `${n} levels in ${c} chapters, with more on the way`,
    how: 'Every level has three goals for three stars. Stars open the next chapter, and a finished chapter gives coins and "show a move" hints.',
    guide: 'Guide',
  },
};

export const campaigns: Record<Lang, Record<CampaignGame, CampaignText>> = {
  bs: {
    peaks: {
      guide: 'Kazaljka',
      guideId: 'kazaljka',
      quote: 'Malo zarđala, ali uvijek pokazujem gore.',
      story: 'Planine su zaspale pod snijegom. Svaki očišćen sto pali vatru na jednom vrhu, a kad zasvijetle svi vrhovi, u dolinu se vraća proljeće.',
      chapters: ['Prvi uspon', 'Tri vrha', 'Zelena dolina', 'Kamena piramida', 'Ledeni greben', 'Krov svijeta'],
      levels: 59,
    },
    mahjong: {
      guide: 'Majstor Žad',
      guideId: 'majstor-zad',
      quote: 'Polako se daleko stiže.',
      story: 'Hram na brdu je izgubio svoja sjećanja: zapečaćena su u pločicama. Svaki skinut par vraća jednu priču, a hram polako opet svijetli.',
      chapters: ['Vrata hrama', 'Vrt', 'Zvonik'],
      levels: 28,
    },
    freecell: {
      guide: 'Kapetanica Bura',
      guideId: 'kapetanica-bura',
      quote: 'Drži kormilo čvrsto, mornaru!',
      story: 'Oluja stiže, a teret je razbacan po palubi. Složi ga po skladištima prije nego što krene vjetar, brod po brod, sa sve manje sanduka na palubi.',
      chapters: ['Mirna luka', 'Plima', 'Oluja'],
      levels: 26,
    },
    spider: {
      guide: 'Pletilja',
      guideId: 'pletilja',
      quote: 'Pauk, da, ali od onih dobrih.',
      story: 'U Mračnoj šumi dobra paukovica od svakog složenog niza plete most, da putnici nađu put. Što dublje u šumu, to je više boja zapetljano.',
      chapters: ['Šumski rub', 'Isprepleteno granje', 'Srce šume'],
      levels: 22,
    },
    kockice: {
      guide: 'Kocko',
      guideId: 'kocko',
      quote: 'Siguran sam da će pasti šestica!',
      story: 'Karavan putuje od grada do grada. Na svakom konačištu neko izazove na kocke, a pobjeda donosi mjesto u karavanu do sljedećeg grada.',
      chapters: ['Konačište', 'Planinski prolaz'],
      levels: 12,
    },
    spinyamb: {
      guide: 'Zmajko',
      guideId: 'zmajko',
      quote: 'Ako budem najviši, vrpca je naša!',
      story: 'Na Festivalu zmajeva svaki dostignut cilj runde podiže zmaja više, a najviši zmaj osvaja festivalsku vrpcu.',
      chapters: ['Livada', 'Vjetrovito brdo'],
      levels: 12,
    },
  },
  en: {
    peaks: {
      guide: 'Needle',
      guideId: 'kazaljka',
      quote: 'A bit rusty, but I always point up.',
      story: 'The mountains fell asleep under the snow. Every cleared table lights a fire on one peak, and when all the peaks glow, spring returns to the valley.',
      chapters: ['First Climb', 'Three Peaks', 'Green Valley', 'Stone Pyramid', 'Icy Ridge', 'Roof of the World'],
      levels: 59,
    },
    mahjong: {
      guide: 'Master Jade',
      guideId: 'majstor-zad',
      quote: 'Slowly, one goes far.',
      story: 'The temple on the hill lost its memories: they are sealed in the tiles. Every pair you clear brings back one story, and the temple slowly shines again.',
      chapters: ['Temple Gates', 'The Garden', 'Bell Tower'],
      levels: 28,
    },
    freecell: {
      guide: 'Captain Gale',
      guideId: 'kapetanica-bura',
      quote: 'Hold the helm tight, sailor!',
      story: 'A storm is coming and the cargo is all over the deck. Stack it in the holds before the wind picks up, ship by ship, with fewer and fewer crates on deck.',
      chapters: ['Quiet Harbour', 'High Tide', 'The Storm'],
      levels: 26,
    },
    spider: {
      guide: 'Weaver',
      guideId: 'pletilja',
      quote: 'A spider, yes, but one of the nice ones.',
      story: 'In the Dark Forest a kind spider weaves a bridge from every finished run so travellers can find their way. The deeper you go, the more suits are tangled.',
      chapters: ['Forest Edge', 'Tangled Branches', 'Heart of the Forest'],
      levels: 22,
    },
    kockice: {
      guide: 'Dicey',
      guideId: 'kocko',
      quote: 'I’m sure we’ll roll a six!',
      story: 'A caravan travels from town to town. At every inn someone challenges you to dice, and a win earns a seat in the caravan to the next town.',
      chapters: ['The Inn', 'Mountain Pass'],
      levels: 12,
    },
    spinyamb: {
      guide: 'Kitey',
      guideId: 'zmajko',
      quote: 'If I fly highest, the ribbon is ours!',
      story: 'At the Kite Festival every round goal you reach lifts the kite higher, and the highest kite wins the festival ribbon.',
      chapters: ['The Meadow', 'Windy Hill'],
      levels: 12,
    },
  },
};
