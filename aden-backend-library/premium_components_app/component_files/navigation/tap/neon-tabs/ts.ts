import { Component } from '@angular/core';

@Component({
    selector: 'example-component',
    imports: [],
    templateUrl: './example.component.html',
    styleUrls: ['./example.component.scss'],
})
export class ExampleComponent {
    tabs: TabItem[] = [
        { id: 'design', label: 'Design', content: 'Our design philosophy centers around minimalism and dark aesthetics to reduce eye strain and improve focus.' },
        { id: 'code', label: 'Code', content: 'Built with Angular 18+, utilizing standalone components and strict typing for maximum reliability.' },
        { id: 'deploy', label: 'Deploy', content: 'Seamlessly deploy to Vercel, Netlify, or AWS with our pre-configured CI/CD pipelines.' }
    ];

    activeTab = 'design';

    /**
     * Selects a tab by its ID and sets it as active.
     * @param id - The ID of the tab to select
     */
    selectTab(id: string) {
        this.activeTab = id;
    }

    /**
     * Gets the currently active tab.
     * @returns The active tab object or undefined if not found.
     */
    getActiveTab() {
        return this.tabs.find(t => t.id === this.activeTab);
    }
}
