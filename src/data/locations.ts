export type Location = {
  id: string;
  name: string;
  address: string;
  category: string;
  lat: number;
  lng: number;
  description?: string;
};

export const locations: Location[] = [
  {
    id: '1',
    name: 'Margitszigeti Nagyrét',
    address: 'Margitsziget, Budapest',
    category: 'park',
    lat: 47.5294,
    lng: 19.0498,
    description: 'Népszerű pihenőhely a Margitszigeten.'
  },
  {
    id: '2',
    name: 'Városliget',
    address: 'Városliget, Budapest',
    category: 'park',
    lat: 47.5148,
    lng: 19.0830,
    description: 'Budapest egyik legnagyobb közparkja.'
  },
  {
    id: '3',
    name: 'Normafa',
    address: 'Normafa, Budapest',
    category: 'nature',
    lat: 47.5041,
    lng: 18.9621,
    description: 'Népszerű kirándulóhely a Budai-hegységben.'
  },
  {
    id: '4',
    name: 'Kopaszi-gát',
    address: 'Kopaszi-gát, Budapest',
    category: 'park',
    lat: 47.4631,
    lng: 19.0566,
    description: 'Modern szabadidőpark a Duna partján.'
  },
  {
    id: '5',
    name: 'Gellért-hegy',
    address: 'Gellért-hegy, Budapest',
    category: 'nature',
    lat: 47.4837,
    lng: 19.0402,
    description: 'Népszerű kilátóhely a Szabadság-szoborral.'
  },
  {
    id: '6',
    name: 'Római-part',
    address: 'Római-part, Budapest',
    category: 'waterfront',
    lat: 47.5741,
    lng: 19.0583,
    description: 'Népszerű vízparti pihenőhely.'
  },
  {
    id: '7',
    name: 'Hajógyári-sziget',
    address: 'Hajógyári-sziget, Budapest',
    category: 'island',
    lat: 47.5418,
    lng: 19.0514,
    description: 'A Sziget Fesztivál helyszíne.'
  },
  {
    id: '8',
    name: 'Népliget',
    address: 'Népliget, Budapest',
    category: 'park',
    lat: 47.4747,
    lng: 19.1009,
    description: 'Budapest legnagyobb közparkja.'
  },
  {
    id: '9',
    name: 'Kamaraerdő',
    address: 'Kamaraerdő, Budapest',
    category: 'forest',
    lat: 47.4344,
    lng: 18.9900,
    description: 'Erdős terület Budapest határában.'
  },
  {
    id: '10',
    name: 'Hármashatár-hegy',
    address: 'Hármashatár-hegy, Budapest',
    category: 'mountain',
    lat: 47.5597,
    lng: 19.0119,
    description: 'Népszerű kirándulóhely és kilátópont.'
  }
]; 