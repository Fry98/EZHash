declare class EZHash {
  hashPass(password: string): Promise<string>;
  verifyPass(password: string, encStr: string): Promise<boolean>;
  hashPassSync(password: string): string;
  verifyPassSync(password: string,encStr: string): boolean;
}

declare function createInstance(setup?: {
  algo?: string,
  iters?: number,
  sLen?: number,
  hLen?: number
}): EZHash;

export = createInstance;
