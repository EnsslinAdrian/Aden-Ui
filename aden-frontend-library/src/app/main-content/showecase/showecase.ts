import { Component, inject } from '@angular/core';
import { Typografie } from "../../shared/text/typografie/typografie";

@Component({
  selector: 'app-showecase',
  imports: [Typografie],
  templateUrl: './showecase.html',
  styleUrl: './showecase.scss',
})
export class Showecase {


  projects = [
    {
      title: 'E-Commerce Plattform',
      description: 'Ein spezialisierter B2B-Webshop für Naturstein- und Bodenprodukte, vollständig angebunden an ein ERP-System. Produktdaten, Lagerstände und Bestellungen werden automatisch synchronisiert.',
      skills: ['Angular', 'TypeScript', 'Python', 'Django'],
      image: 'img/projects/fs_schleiftechnick 1.png',
      liveTestUrl: 'https://fs-schleiftechnik.de/',
      githubUrl: ''
    },
    {
      title: 'DaBubble',
      description: 'Ein Echtzeit-Chat-Messenger mit Server- und Kanalstruktur – inspiriert von Discord. Nutzer können eigene Räume erstellen und live kommunizieren.',
      skills: ['Angular', 'Firebase', 'TypeScript', 'SCSS'],
      image: '/img/projects/daBubble.png',
      liveTestUrl: 'https://dabubble-380.developerakademie.net/angular-projects/dabubble/',
      githubUrl: 'https://github.com/EnsslinAdrian/DABubble'
    },
  ];

  openLink(url: string) {
    if (url) window.open(url, '_blank');
  }

}
