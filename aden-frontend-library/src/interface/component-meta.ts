export interface ComponentAuthor {
  id?: number;
  username: string;
  first_name?: string;
  last_name?: string;
  photo?: string;
}

export interface ComponentStats {
  id: number;
  slug: string;
  likes_count: number;
  is_liked_by_user: boolean;
  is_saved_by_user?: boolean;
  author: ComponentAuthor;
  is_premium: boolean;
}

export interface ComponentMeta {
  title: string;
  description: string;
  slug: string;
  author?: Partial<ComponentAuthor>;
}
