export interface MockParticipant {
  id: string;
  pseudo: string;
  gender: 'male' | 'female';
  color: string;
}

export const MOCK_PARTICIPANTS: MockParticipant[] = [
  { id: 'm1',  pseudo: 'Flamingo99',  gender: 'female', color: '#C084FC' },
  { id: 'm2',  pseudo: 'TigerBoy',    gender: 'male',   color: '#60A5FA' },
  { id: 'm3',  pseudo: 'SunsetGirl',  gender: 'female', color: '#F472B6' },
  { id: 'm4',  pseudo: 'NightOwl',    gender: 'male',   color: '#34D399' },
  { id: 'm5',  pseudo: 'Mango42',     gender: 'female', color: '#A78BFA' },
  { id: 'm6',  pseudo: 'CobraKai',    gender: 'male',   color: '#38BDF8' },
  { id: 'm7',  pseudo: 'StarDust',    gender: 'female', color: '#818CF8' },
  { id: 'm8',  pseudo: 'Reef_Wave',   gender: 'male',   color: '#2DD4BF' },
  { id: 'm9',  pseudo: 'LunaBlue',    gender: 'female', color: '#6EE7B7' },
  { id: 'm10', pseudo: 'GhostRider',  gender: 'male',   color: '#94A3B8' },
  { id: 'm11', pseudo: 'PeachyVibes', gender: 'female', color: '#E879F9' },
  { id: 'm12', pseudo: 'VolcanoBoy',  gender: 'male',   color: '#7DD3FC' },
  { id: 'm13', pseudo: 'IcyQueen',    gender: 'female', color: '#67E8F9' },
  { id: 'm14', pseudo: 'ShadowFox',   gender: 'male',   color: '#A3E635' },
  { id: 'm15', pseudo: 'NeonDream',   gender: 'female', color: '#D946EF' },
];
