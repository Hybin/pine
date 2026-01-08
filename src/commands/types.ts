import { ExtensionContext } from "vscode";

export interface ICommand<T> {
    activate(context: ExtensionContext): void;
    execute(option?: T): void;
    dispose(): void;
}
