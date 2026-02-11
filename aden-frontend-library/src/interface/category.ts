export interface LibraryComponent {
  name: string;
  route?: string;
  type?: 'component' | 'guide';
  premium?: boolean;
  description?: string;
  readingTime?: string;
  level?: 'Beginner' | 'Advanced' | 'Expert';
  tags?: string[];
}

export interface LibraryCategory {
  title: string;
  components: LibraryComponent[];
}

