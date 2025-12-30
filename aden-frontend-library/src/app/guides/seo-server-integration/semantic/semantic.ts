import { Component } from '@angular/core';
import { CodeBlockGuide } from "../../../shared/ui/code-block-guide/code-block-guide";
import { Notice } from "../../../shared/ui/notice/notice";
import { SemanticInteractiveDemo } from "./semantic-interactive-demo/semantic-interactive-demo";
import { HeadlineGuides } from "../../../shared/ui/headline-guides/headline-guides";

@Component({
  selector: 'app-semantic',
  imports: [CodeBlockGuide, Notice, SemanticInteractiveDemo, HeadlineGuides],
  templateUrl: './semantic.html',
  styleUrl: './semantic.scss',
})
export class Semantic {

  badCode = `<div class="header">
  <div class="nav">Menu</div>
</div>
<div class="main-content">
  <div class="article">
     <div class="title">Hello World</div>
  </div>
</div>`;

  goodCode = `<header>
  <nav>Menu</nav>
</header>
<main>
  <article>
     <h1>Hello World</h1>
  </article>
</main>`;

  // Expanded Cheatsheet Data
  tags = [
    {
      tag: '<main>',
      category: 'Structure',
      desc: 'The unique main content. Should only appear once per view.',
      do: 'Wrap the specific content of the current route here.',
      dont: 'Do not put the sidebar, header, or footer inside.'
    },
    {
      tag: '<header> & <footer>',
      category: 'Structure',
      desc: 'Not just for the page! These define the top/bottom of *any* section.',
      do: 'Use inside <article>, <section>, or <main> to group meta-data or actions.',
      dont: 'Do not rely on the class name <div class="header">.'
    },
    {
      tag: '<nav>',
      category: 'Structure',
      desc: 'Area for major navigation blocks.',
      do: 'Main menu, table of contents, pagination.',
      dont: 'Not for a single "Read more" link or a small footer link list.'
    },
    {
      tag: '<article>',
      category: 'Content',
      desc: 'Independent, self-contained content. Syndicatable.',
      do: 'Blog posts, comments, widgets, product cards.',
      dont: 'Do not use as a generic wrapper just to group elements.'
    },
    {
      tag: '<section>',
      category: 'Content',
      desc: 'A thematic grouping of content, usually with a heading.',
      do: 'Chapters of a page, "Features" section, "Contact" area.',
      dont: 'Do not use purely for CSS styling (use <div>).'
    },
    {
      tag: '<aside>',
      category: 'Structure',
      desc: 'Content tangentially related to the content around it.',
      do: 'Sidebars, advertising, "Related Posts", pull quotes.',
      dont: 'Do not put primary content here that is vital for understanding.'
    },
    {
      tag: '<h1> - <h6>',
      category: 'Text',
      desc: 'The outline of your document. Vital for screen readers.',
      do: 'H1 for page title (1x). H2 for main sections. H3 for subsections.',
      dont: 'Never skip levels (H2 -> H4) just for font sizing.'
    },
    {
      tag: '<label>',
      category: 'Forms',
      desc: 'The most important tag for form accessibility.',
      do: 'Connect to inputs via `for` attribute or by wrapping the input.',
      dont: 'Do not use a <span> or <p> to name an input field.'
    },
    {
      tag: '<ul>, <ol>, <dl>',
      category: 'Lists',
      desc: 'Grouping items. Screen readers announce "List, 5 items".',
      do: 'Navigation links, card lists, steps (<ol>), key-value pairs (<dl>).',
      dont: 'Do not create a stack of <div>s for a list of items.'
    },
    {
      tag: '<figure> & <figcaption>',
      category: 'Media',
      desc: 'Connects media (images, code, video) with a description.',
      do: 'Image with a caption below it. Code block with a filename.',
      dont: 'Do not use <div> + <span> for image captions.'
    },
    {
      tag: '<details> & <summary>',
      category: 'Interactive',
      desc: 'A native HTML accordion/toggle without JavaScript.',
      do: 'FAQ sections, spoilers, "Show more" toggles.',
      dont: 'Do not build a JS accordion for simple text toggling.'
    },
    {
      tag: '<button> vs <a>',
      category: 'Interaction',
      desc: 'The semantic difference between "Go" and "Do".',
      do: '<a> for navigation (URL changes). <button> for actions (Submit, Toggle, Open Dialog).',
      dont: 'Never put a (click) handler on a <div> or <span>.'
    }
  ];
}
