interface ChangelogEntry {
  version: string;
  date: string;
  description: string;
  changes: {
    type: 'feature' | 'fix' | 'improvement';
    text: string;
  }[];
}
