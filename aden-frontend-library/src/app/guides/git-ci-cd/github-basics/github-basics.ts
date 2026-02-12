import { Component, signal } from '@angular/core';
import { CodeBlockGuide } from "../../../shared/ui/code-block-guide/code-block-guide";
import { Notice } from "../../../shared/ui/notice/notice";
import { HeadlineGuides } from "../../../shared/ui/headline-guides/headline-guides";
import { GitVisualizer } from "./git-visualizer/git-visualizer";
import { Typografie } from "../../../shared/text/typografie/typografie";
import { VisuelRight } from "../../../main-content/home/quick-start-section/visuel-right/visuel-right";
import { GithubBasicsLiveDemo } from "./github-basics-live-demo/github-basics-live-demo";

interface GitCommit {
  id: string;
  msg: string;
  time: string;
}

@Component({
  selector: 'app-github-basics',
  imports: [CodeBlockGuide, Notice, HeadlineGuides, GitVisualizer, Typografie, VisuelRight, GithubBasicsLiveDemo],
  templateUrl: './github-basics.html',
  styleUrl: './github-basics.scss',
})
export class GithubBasics {

  configCode = `git config --global user.name "Your Name"
git config --global user.email "your@email.com"`;

  initCode = `# In your project folder
git init`;

  cloneCode = `# Load project from GitHub
git clone https://github.com/user/project.git`;

  statusDiffCode = `# 1. The most important command: What is the current status?
git status

# 2. View the history of your snapshots
git log --oneline

# 3. See the exact differences in code (before adding)
git diff`;

  commitWorkflowCode = `# 1. Add changes to the queue (Staging Area)
git add .

# 2. Create a snapshot with a clear message
git commit -m "feat: add hero section typography"

# Pro tip: Add and commit changed files directly (in one step)
git commit -am "fix: button alignment on mobile"`;

  syncCode = `# 1. Upload your local snapshots to GitHub
git push origin main

# 2. Download the latest version from GitHub
git pull origin main

# Bonus: If you need to reconnect a repo
git remote add origin https://github.com/user/project.git`;

  ignoreCode = `# 1. Ignore large dependencies
node_modules/

# 2. Ignore build folders
dist/
.angular/

# 3. Secret credentials (IMPORTANT!)
.env
auth.json

# 4. System files
.DS_Store`;
}
