import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3
}

export interface LogEntry {
  level: LogLevel;
  message: string;
  data?: any;
  timestamp: Date;
  userId?: string;
  sessionId: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoggingService {
  private sessionId: string;
  private logs: LogEntry[] = [];
  private maxLogs = 1000;

  constructor() {
    this.sessionId = this.generateSessionId();
  }

  debug(message: string, data?: any): void {
    this.log(LogLevel.DEBUG, message, data);
  }

  info(message: string, data?: any): void {
    this.log(LogLevel.INFO, message, data);
  }

  warn(message: string, data?: any): void {
    this.log(LogLevel.WARN, message, data);
  }

  error(message: string, data?: any): void {
    this.log(LogLevel.ERROR, message, data);
  }

  private log(level: LogLevel, message: string, data?: any): void {
    if (!environment.enableLogging && level < LogLevel.ERROR) {
      return;
    }

    const logEntry: LogEntry = {
      level,
      message,
      data,
      timestamp: new Date(),
      userId: this.getCurrentUserId(),
      sessionId: this.sessionId
    };

    this.logs.push(logEntry);

    // Keep only the last maxLogs entries
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs);
    }

    // Console logging
    this.logToConsole(logEntry);

    // Send to remote logging service if enabled
    if (environment.enableLogging && environment.production) {
      this.sendToRemoteLogging(logEntry);
    }
  }

  private logToConsole(logEntry: LogEntry): void {
    const timestamp = logEntry.timestamp.toISOString();
    const levelName = LogLevel[logEntry.level];
    const prefix = `[${timestamp}] [${levelName}]`;

    switch (logEntry.level) {
      case LogLevel.DEBUG:
        console.debug(prefix, logEntry.message, logEntry.data);
        break;
      case LogLevel.INFO:
        console.info(prefix, logEntry.message, logEntry.data);
        break;
      case LogLevel.WARN:
        console.warn(prefix, logEntry.message, logEntry.data);
        break;
      case LogLevel.ERROR:
        console.error(prefix, logEntry.message, logEntry.data);
        break;
    }
  }

  private sendToRemoteLogging(logEntry: LogEntry): void {
    // Implement integration with remote logging service
    fetch('/api/logs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(logEntry)
    }).catch(err => {
      console.error('Failed to send log to remote service:', err);
    });
  }

  private getCurrentUserId(): string | undefined {
    return localStorage.getItem('userId') || undefined;
  }

  private generateSessionId(): string {
    return 'session_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
  }

  getLogs(): LogEntry[] {
    return [...this.logs];
  }

  clearLogs(): void {
    this.logs = [];
  }

  exportLogs(): string {
    return JSON.stringify(this.logs, null, 2);
  }
}