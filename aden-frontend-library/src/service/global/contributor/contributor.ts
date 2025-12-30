import { Injectable } from '@angular/core';

export interface ContributorData {
  name: string;
  github: string;
  contributions: number;
  badges: string[];
}

@Injectable({
  providedIn: 'root',
})
export class Contributor {
  public TOP_CONTRIBUTORS: ContributorData[] = [
    {
      name: 'EnsslinAdrian',
      github: 'https://github.com/EnsslinAdrian',
      contributions: 12,
      badges: ['Admin', 'Founder']
    },
    {
      name: 'MaxMustermann',
      github: 'https://github.com/max',
      contributions: 3,
      badges: ['Early Adopter']
    },
    {
      name: 'AnnaDev',
      github: 'https://github.com/anna',
      contributions: 8,
      badges: ['Contributor']
    },
    {
      name: 'CodeNinja',
      github: 'https://github.com/ninja',
      contributions: 1,
      badges: []
    }
  ];
}
