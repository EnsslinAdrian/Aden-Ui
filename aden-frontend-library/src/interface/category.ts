export interface LibraryComponent {
  name: string;
  route?: string;
  type?: 'component' | 'guide';
  premium?: boolean;
  description?: string;
  readingTime?: string;
  level?: 'Beginner' | 'Advanced' | 'Expert';
}

export interface LibraryCategory {
  title: string;
  components: LibraryComponent[];
}

