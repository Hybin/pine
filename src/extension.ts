import { ExtensionContext } from 'vscode';

export function activate(context: ExtensionContext) {
  console.log('Pine Script extension is now active!');
}

export function deactivate() {
  console.log('Pine Script extension is now inactive!');
}
