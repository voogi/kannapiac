export type Category = {
  id: string;
  name: string;
  icon?: string;
  description?: string;
};

export const categories: Category[] = [
  {
    id: 'park',
    name: 'Park',
    description: 'Zöld területek, parkok és pihenőhelyek'
  },
  {
    id: 'nature',
    name: 'Természetvédelmi terület',
    description: 'Védett természeti területek és rezervátumok'
  },
  {
    id: 'waterfront',
    name: 'Vízpart',
    description: 'Folyópartok, tavak és strandok'
  },
  {
    id: 'mountain',
    name: 'Hegy',
    description: 'Hegyek, dombok és kilátópontok'
  },
  {
    id: 'forest',
    name: 'Erdő',
    description: 'Erdős területek és erdei ösvények'
  },
  {
    id: 'island',
    name: 'Sziget',
    description: 'Szigetek és félszigetek'
  }
]; 