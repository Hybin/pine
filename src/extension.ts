import { ExtensionContext } from 'vscode';
import {
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
  TransportKind,
} from 'vscode-languageclient/node';

let client: LanguageClient | undefined;

export function activate(context: ExtensionContext) {
  const serverModule = context.asAbsolutePath('artifacts/server.js');

  const serverOptions: ServerOptions = {
    run: {
      module: serverModule,
      transport: TransportKind.ipc,
    },
    debug: {
      module: serverModule,
      transport: TransportKind.ipc,
      options: {
        execArgv: ['--nolazy', '--inspect=6009'],
      },
    },
  };

  const clientOptions: LanguageClientOptions = {
    documentSelector: [{ language: 'pinescript' }],
    synchronize: {},
  };

  client = new LanguageClient(
    'pinescriptLanguageServer',
    'Pine Script Language Server',
    serverOptions,
    clientOptions,
  );

  client.start();
}

export function deactivate() {
  if (!client) {
    return;
  }

  return client.stop();
}
