export type RuntimeBindings = Record<string, string | undefined> & { DB?: D1Database };

const nodeEnv = typeof process !== 'undefined' && process.env
  ? (process.env as unknown as RuntimeBindings)
  : ({} as RuntimeBindings);

export const runtimeEnv: RuntimeBindings = nodeEnv;
