import { Component } from '@angular/core';
import { CodeBlockGuide } from "../../../shared/ui/code-block-guide/code-block-guide";
import { Notice } from "../../../shared/ui/notice/notice";
import { CliSimulator } from "./cli-simulator/cli-simulator";
import { HeadlineGuides } from "../../../shared/ui/headline-guides/headline-guides";

@Component({
  selector: 'app-angular-cli-commands',
  imports: [CodeBlockGuide, Notice, CliSimulator, HeadlineGuides],
  templateUrl: './angular-cli-commands.html',
  styleUrl: './angular-cli-commands.scss',
})
export class AngularCliCommands {

  // 1. Scaffolding
  scaffoldingCode = `# The shorthand "g" stands for "generate"

# Component (c)
ng g c components/my-button

# Service (s)
ng g s services/auth

# Directive (d)
ng g d directives/click-outside

# Guard (g)
ng g g guards/auth`;

  // 2. Flags
  flagsCode = `# --dry-run (-d): The lifesaver!
# Only shows what would happen, but does not create any files.
ng g c complex-component --dry-run

# --skip-tests: Do not create a .spec.ts file
ng g s api --skip-tests

# --inline-style (-s) & --inline-template (-t):
# No extra .html or .scss file (everything in the .ts file)
ng g c simple-badge -s -t`;

  // 3. Running
  runningCode = `# Start the server
ng serve

# Start the server and open the browser (-o)
ng serve -o

# Create a production build
ng build`;

}
