import { Item } from './Item';

export type ComputerProcessor = {
  brand: string;
  model: string;
  cores: number;
  integratedGraphics: boolean;
};
export enum ComputerMemoryType {
  DDR3 = 'DDR3',
  DDR4 = 'DDR4',
  DDR5 = 'DDR5',
}
export type ComputerMemory = {
  type: ComputerMemoryType;
  size: number;
  rgb: boolean;
};
export enum ComputerStorageType {
  HDD = 'HDD',
  SSD = 'SSD',
}
export type ComputerStorage = {
  type: ComputerStorageType;
  size: number; // in GB
};
export type ComputerGraphics = {
  brand: string;
  model: string;
  vram: number;
  baseClock: number;
  boostClock: number;
  rgb: boolean;
  rayTracing: boolean;
};

export type ItemComputer = Item & {
  processor: ComputerProcessor;
  memory: ComputerMemory;
  storage: ComputerStorage;
  graphics: ComputerGraphics;
};
export type ItemComputerGaming = ItemComputer & {
  type: 'Gaming';
};
export type ItemComputerOffice = ItemComputer & {
  type: 'Office';
};
