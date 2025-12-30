import { Component } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { HeadlineGuides } from "../../../shared/ui/headline-guides/headline-guides";
import { Notice } from "../../../shared/ui/notice/notice";

interface FileNode {
  name: string;
  type: 'folder' | 'file';
  children?: FileNode[];
  isOpen?: boolean;
  contentKey?: string; // Verweis auf den Datei-Inhalt
  highlight?: boolean; // Für spezielle Dateien
}

@Component({
  selector: 'app-folder-structure',
  imports: [NgTemplateOutlet, HeadlineGuides, Notice],
  templateUrl: './folder-structure.html',
  styleUrl: './folder-structure.scss',
})
export class FolderStructure {
  selectedFileTitle = 'Select a file';
  selectedFileContent = '// Click on a file (e.g. Services, Interfaces) to see how it is structured.';

  // Hier definieren wir Architectural Patterns als Code-Beispiele
  fileContents: Record<string, string> = {
'htaccess': `# Apache Config
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -f [OR]
  RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -d
  RewriteRule ^ - [L]
  RewriteRule ^ /index.html [L]
</IfModule>`,

'environment': `export const environment = {
  production: false,
  apiUrl: 'http://localhost:4000/',
};`,

'interface-user': `// Interfaces at root define global data structures
export interface User {
  uid: string;
  email: string;
  displayName: string;
  role: 'admin' | 'user';
  createdAt: Date;
}`,

'auth-service': `// Services are pure logic, separated from the UI
@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private http = inject(HttpClient);

  login(credentials: LoginData) {
    return this.http.post(API_URL + '/auth', credentials);
  }
}`,

'auth-guard': `// Guards protect routes based on services
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);

  return authService.isLoggedIn() || router.createUrlTree(['/login']);
};`,

  };

  // Alles defaultmäßig geschlossen (kein 'isOpen: true' mehr)
  rootTree: FileNode[] = [
    { name: '.angular', type: 'folder' },
    { name: '.vscode', type: 'folder' },
    { name: 'dist', type: 'folder' },
    { name: 'node_modules', type: 'folder' },

    // PUBLIC
    {
      name: 'public',
      type: 'folder',
      children: [
        { name: 'fonts', type: 'folder' },
        {
          name: 'img',
          type: 'folder',
          children: [
            { name: 'icons', type: 'folder' },
            { name: 'logo', type: 'folder' }
          ]
        },
        { name: '.htaccess', type: 'file', contentKey: 'htaccess' },
        { name: 'favicon.ico', type: 'file' },
        { name: 'robots.txt', type: 'file', contentKey: 'robots' }
      ]
    },

    {
      name: 'src',
      type: 'folder',
      children: [
        {
          name: 'app',
          type: 'folder',
          children: [
            {
              name: 'auth',
              type: 'folder',
              children: [
                { name: 'forgot-password', type: 'folder' },
                { name: 'login', type: 'folder' },
                { name: 'new-password', type: 'folder' },
                { name: 'register', type: 'folder' },
                { name: 'register-success', type: 'folder' },
                { name: 'verify-email', type: 'folder' }
              ]
            },
            {
              name: 'components',
              type: 'folder',
              children: [
                { name: 'feedback-indicators', type: 'folder' },
                { name: 'form-controls', type: 'folder' },
                { name: 'layout', type: 'folder' },
                { name: 'media-interaction', type: 'folder' },
                { name: 'navigation', type: 'folder' },
                { name: 'typography', type: 'folder' }
              ]
            },
            {
              name: 'dialogs',
              type: 'folder',
              children: [
                { name: 'change-email', type: 'folder' },
                { name: 'delete-account', type: 'folder' },
                { name: 're-authenticate', type: 'folder' },
                { name: 'upgrade-dialog', type: 'folder' }
              ]
            },
            {
              name: 'guides',
              type: 'folder',
              children: [
                { name: 'angular-essential', type: 'folder' },
                { name: 'architecture-best-practices', type: 'folder' },
                { name: 'build-performance-tools', type: 'folder' },
                { name: 'seo-server-integration', type: 'folder' }
              ]
            },
            {
              name: 'imprint',
              type: 'folder',
              children: [
                { name: 'legal-notice', type: 'folder' },
                { name: 'privacy-policy', type: 'folder' }
              ]
            },
            {
              name: 'main-content',
              type: 'folder',
              children: [
                { name: 'components-home', type: 'folder' },
                { name: 'contribution', type: 'folder' },
                { name: 'contribution-form', type: 'folder' },
                { name: 'guides-home', type: 'folder' },
                { name: 'home', type: 'folder' },
                { name: 'showcase', type: 'folder' },
                { name: 'updates', type: 'folder' }
              ]
            },
            {
              name: 'shared',
              type: 'folder',
              children: [
                { name: 'base', type: 'folder' },
                { name: 'btn-ui', type: 'folder' },
                { name: 'feedbacks', type: 'folder' },
                { name: 'forms', type: 'folder' },
                { name: 'navigation', type: 'folder' },
                { name: 'styles', type: 'folder' },
                { name: 'text', type: 'folder' },
                { name: 'ui', type: 'folder' }
              ]
            },
            {
              name: 'user',
              type: 'folder',
              children: [
                { name: 'components-viewer', type: 'folder' },
                { name: 'member-profil', type: 'folder' },
                { name: 'profile', type: 'folder' }
              ]
            },
            { name: 'app.config.ts', type: 'file' },
            { name: 'app.html', type: 'file' },
            { name: 'app.routes.ts', type: 'file' },
            { name: 'app.scss', type: 'file' },
            { name: 'app.spec.ts', type: 'file' },
            { name: 'app.ts', type: 'file' },
          ]
        },
        {
          name: 'environments',
          type: 'folder',
          children: [
            { name: 'environment.ts', type: 'file', contentKey: 'environment' },
            { name: 'environment.prod.ts', type: 'file' }
          ]
        },
        {
          name: 'guards',
          type: 'folder',
          children: [
            { name: 'auth', type: 'folder', children: [{ name: 'auth.guard.ts', type: 'file', contentKey: 'auth-guard' }] },
            { name: 'premium', type: 'folder' }
          ]
        },
        {
          name: 'interface',
          type: 'folder',
          children: [
            { name: 'user.ts', type: 'file', contentKey: 'interface-user' }
          ]
        },
        {
          name: 'service',
          type: 'folder',
          children: [
            {
              name: 'auth',
              type: 'folder',
              children: [
                { name: 'authApi', type: 'folder', children: [{ name: 'authApi.ts', type: 'file', contentKey: 'auth-service' }] },
                { name: 'authentication', type: 'folder' },
                { name: 'authState', type: 'folder' },
                { name: 'interceptor', type: 'folder' },
              ]
            },
            {
              name: 'components', type: 'folder',
              children: [
                { name: 'component-code', type: 'folder' },
                { name: 'component-interaction', type: 'folder' },
                { name: 'library', type: 'folder' },
              ]
            },
            {
              name: 'feedbacks', type: 'folder',
              children: [
                { name: 'random-message', type: 'folder' },
                { name: 'toast', type: 'folder' },
              ]
            },
            {
              name: 'global', type: 'folder',
              children: [
                { name: 'contributor', type: 'folder' },
                { name: 'layout', type: 'folder' },
                { name: 'recaptcha', type: 'folder' },
                { name: 'urls', type: 'folder' },
              ]
            },
            {
              name: 'user', type: 'folder',
              children: [
                { name: 'userApi', type: 'folder' },
                { name: 'userProfile', type: 'folder' },
              ]
            }
          ]
        },
        { name: 'fonts.scss', type: 'file' },
        { name: 'index.html', type: 'file' },
        { name: 'main.ts', type: 'file' },
        { name: 'styles.scss', type: 'file' },
      ]
    },
    { name: '.gitignore', type: 'file' },
    { name: 'angular.json', type: 'file' },
    { name: 'package.json', type: 'file' },
    { name: 'package-lock.json', type: 'file' },
    { name: 'README.md', type: 'file' },
  ];

  toggleFolder(node: FileNode) {
    if (node.type === 'folder') {
      node.isOpen = !node.isOpen;
    } else {
      this.selectFile(node);
    }
  }

  selectFile(node: FileNode) {
    if (node.contentKey && this.fileContents[node.contentKey]) {
      this.selectedFileTitle = node.name;
      this.selectedFileContent = this.fileContents[node.contentKey];
    } else {
      this.selectedFileTitle = node.name;

      this.selectedFileContent = node.name.endsWith('.ts')
        ? '// Code preview not available.'
        : '// Binary or Config file.';
    }
  }
}
