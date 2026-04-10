export interface Session {
  id: string;
  time: string;
  title: string;
  speaker: string;
  category: string;
  type: string;
  day: 1 | 2;
  location: string;
  locationLink?: string;
  description: string;
}

export interface Speaker {
  id: string;
  name: string;
  role: string;
  org: string;
  image: string;
  bio: string;
}

export interface Partner {
  id: string;
  name: string;
  logo: string;
  tier: 'Host' | 'Platinum' | 'Gold';
  description: string;
}

export interface Resource {
  id: string;
  title: string;
  type: 'Report' | 'Video' | 'Presentation';
  date: string;
  tags: string[];
}