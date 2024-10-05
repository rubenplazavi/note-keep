export type MyCustomCallback = (error: Error | null, result: any) => void;

export interface DynamicData {
  [key: string]: unknown;
}

export interface TokenObject {
  [key: string]: string;
}

export type DynamicTemplate = Record<string, string>;
