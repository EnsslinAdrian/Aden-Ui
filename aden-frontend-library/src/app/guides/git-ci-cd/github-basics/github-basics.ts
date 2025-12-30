import { Component } from '@angular/core';
import { CodeBlockGuide } from "../../../shared/ui/code-block-guide/code-block-guide";
import { Notice } from "../../../shared/ui/notice/notice";
import { HeadlineGuides } from "../../../shared/ui/headline-guides/headline-guides";
import { GitVisualizer } from "./git-visualizer/git-visualizer";

@Component({
  selector: 'app-github-basics',
  imports: [CodeBlockGuide, Notice, HeadlineGuides, GitVisualizer],
  templateUrl: './github-basics.html',
  styleUrl: './github-basics.scss',
})
export class GithubBasics {

  // 1. Setup
  setupCode = `# 1. Repo klonen (Der Standard)
git clone https://github.com/username/repo.git

# 2. Oder neues Projekt starten
git init
git remote add origin https://github.com/username/repo.git`;

  // 2. Daily Workflow
  dailyCode = `# 1. Status checken (Mein meistgenutzter Befehl)
git status

# 2. Alles stagen
git add .

# 3. Speichern (Commit)
git commit -m "feat: add new login button"

# 4. Hochladen
git push`;

  // 3. Branches
  branchCode = `# Neuen Branch erstellen und direkt hinwechseln
git checkout -b feature/login-page

# Zurück zu main wechseln
git checkout main

# Branch löschen (wenn fertig)
git branch -d feature/login-page`;

  // 4. Panic Room
  panicCode = `# "Ich habe Mist gebaut, mach alles wie beim letzten Commit"
git reset --hard

# "Ich habe aus Versehen committed, will aber weiterarbeiten"
# (Behält Änderungen, löscht nur den Commit)
git reset --soft HEAD~1

# "Ich will Änderungen temporär parken, um Branch zu wechseln"
git stash
# Später wiederholen:
git stash pop`;

  // 5. Aliases (Pro Tip)
  aliasCode = `# In deiner .gitconfig (oder Terminal):
git config --global alias.s "status"
git config --global alias.c "commit -m"
git config --global alias.co "checkout"

# Jetzt kannst du tippen:
git s       # statt git status
git c "msg" # statt git commit -m "msg"`;

}
