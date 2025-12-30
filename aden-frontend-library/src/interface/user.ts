// src/app/interface/user.ts

// 1. Definiere, wie eine Komponente in der Liste aussieht (Mini-Ansicht)
export interface MemberComponent {
  id: number;
  title: string;
  slug: string;
  category: string;
  subcategory: string;
  likes_count: number;
}

// 2. Erweitere dein UserProfile
export interface UserProfile {
  id: number;
  email: string;
  username: string; // <-- Wichtig für URLs
  first_name: string;
  last_name: string;
  photo: string | null;
  bio: string;
  github_url: string;
  linkedin_url: string;

  is_premium: boolean;
  plan: string;
  date_joined: string; // oder Date, je nach Config

  // --- NEUE FELDER VOM BACKEND ---
  total_likes?: number; // Optional, da MemberProfil es hat
  created_components?: MemberComponent[];
  saved_components?: MemberComponent[];
}
