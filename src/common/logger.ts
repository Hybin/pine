import { injectable } from 'inversify';
import { LogLevel, OutputChannel, window, workspace } from 'vscode';

@injectable()
export class Logger {
    constructor(
        private logLevel: LogLevel = LogLevel.Info,
        private outputChannel?: OutputChannel
    ) { }

    private setLogLevel(level: LogLevel) {
        this.logLevel = level;
    }

    public activate() {
        const config = workspace.getConfiguration('pine');
        this.setLogLevel(config.get('logLevel') as LogLevel);
    }

    public log(message: string) {
        if (!this.outputChannel) {
            this.outputChannel = window.createOutputChannel('Pine Script');
        }
        this.outputChannel.appendLine(message);
    }

    public error(message: string) {
        this.log(`[Error] ${message}`);
    }

    public warn(message: string) {
        this.log(`[Warning] ${message}`);
    }

    public info(message: string) {
        this.log(`[Info] ${message}`);
    }

    public debug(message: string) {
        this.log(`[Debug] ${message}`);
    }
}
