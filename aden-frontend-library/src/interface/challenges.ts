export interface ChallengeRequirement {
  label: string;
  allowed: boolean; // true = Erlaubt/Pflicht, false = Verboten (z.B. "No jQuery")
}

export interface Challenge {
  id: number;
  title: string;
  description: string;
  status: 'active' | 'closed' | 'upcoming';
  deadline: string; // ISO Date
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert';

  // Tech Specs
  requirements: ChallengeRequirement[];

  // Rewards
  rewards: string[];

  // Wenn vorbei:
  winner?: {
    name: string;
    avatar: string;
    solutionLink: string;
  };
}

export interface LeaderboardUser {
  rank: number;
  name: string;
  avatar: string;
  totalWins: number;
  badges: string[]; // z.B. ['🏆', '⚡']
}
