import { ExtensionContext } from 'vscode';
import { ICommand } from './types';

export function register(context: ExtensionContext) {
    const commands: ICommand<unknown>[] = [];
    return commands.forEach(command => command.activate(context));
}
