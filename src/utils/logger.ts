import consola, { LogLevel } from 'consola';

const DEFAULT_LOG_LEVEL = LogLevel[LogLevel.Info];

const LEVEL_STRS = Object.keys(LogLevel);

let level: LogLevel | unknown = DEFAULT_LOG_LEVEL;

export function getConsolaLevelStr(logLevel: string): LogLevel {
  const [firstChar, ...rest] = logLevel.split('');
  const str: unknown = [firstChar.toUpperCase(), rest.join('').toLowerCase()].join('');

  if (!LEVEL_STRS.includes(str as string)) {
    throw new Error(`Invalid Log Level: ${logLevel}`);
  }

  return str as LogLevel;
}

const LOG_LEVEL = process.env.NEXT_PUBLIC_LOG_LEVEL ?? DEFAULT_LOG_LEVEL;

try {
  level = getConsolaLevelStr(LOG_LEVEL);
} catch (err) {
  consola.error(err);
}

const logger = consola.create({
  level: level as LogLevel,
});

logger.debug(`LogLevel: ${LOG_LEVEL} - ${level}`);

export default logger;
