import {
  ComputerGraphics,
  ComputerMemory,
  ComputerMemoryType,
  ComputerProcessor,
  ComputerStorage,
  ComputerStorageType,
  ItemComputer,
  ItemComputerGaming,
  ItemComputerOffice,
} from './Computer';
import { Money, MoneyType } from './MoneyPattern';

//! Builder Pattern
type ComputerBuilder = {
  setComputerName: (name: string) => void;
  setProcessor: (processor: ComputerProcessor) => void;
  setMemory: (memory: ComputerMemory) => void;
  setStorage: (storage: ComputerStorage) => void;
  setGraphics: (graphics: ComputerGraphics) => void;
  setMoney: (money: MoneyType) => void;
  setId: (id: number) => void;
  build: () => ItemComputer;
};

export type GamingComputerBuilder = ComputerBuilder & {
  build: () => ItemComputerGaming;
};

export type OfficeComputerBuilder = ComputerBuilder & {
  build: () => ItemComputerOffice;
};

// Director
export type Director = {
  makeGamingComputer: (builder: ComputerBuilder) => ItemComputer;
  makeOfficeComputer: (builder: ComputerBuilder) => ItemComputer;
};

export const createComputerBuilder = (): ComputerBuilder => {
  let computerName: string;
  let processor: ComputerProcessor;
  let memory: ComputerMemory;
  let storage: ComputerStorage;
  let graphics: ComputerGraphics;
  let money: MoneyType;
  let id: number;

  return {
    setComputerName: (name) => {
      computerName = name;
    },
    setProcessor: (newProcessor) => {
      processor = newProcessor;
    },
    setMemory: (newMemory) => {
      memory = newMemory;
    },
    setStorage: (newStorage) => {
      storage = newStorage;
    },
    setGraphics: (newGraphics) => {
      graphics = newGraphics;
    },
    setMoney: (newMoney) => {
      money = newMoney;
    },
    setId: (_id) => {
      id = _id;
    },
    build: () => {
      return {
        id,
        name: computerName,
        processor,
        memory,
        storage,
        graphics,
        money,
      };
    },
  };
};

const makeGamingComputer = (builder: ComputerBuilder) => {
  builder.setComputerName('Gaming Computer');

  builder.setProcessor({
    brand: 'AMD',
    model: 'Ryzen 9 5950X',
    cores: 16,
    integratedGraphics: false,
  });
  builder.setMemory({
    type: ComputerMemoryType.DDR4,
    size: 32,
    rgb: true,
  });
  builder.setStorage({
    type: ComputerStorageType.SSD,
    size: 1000,
  });
  builder.setGraphics({
    brand: 'NVIDIA',
    model: 'RTX 3090',
    vram: 24,
    baseClock: 1400,
    boostClock: 1700,
    rgb: true,
    rayTracing: true,
  });

  builder.setMoney(new Money('EUR', 2093.99));

  return builder.build();
};

const makeOfficeComputer = (builder: ComputerBuilder) => {
  builder.setComputerName('Office Computer');

  builder.setProcessor({
    brand: 'Intel',
    model: 'Core i5-10400F',
    cores: 6,
    integratedGraphics: true,
  });
  builder.setMemory({
    type: ComputerMemoryType.DDR4,
    size: 16,
    rgb: false,
  });
  builder.setStorage({
    type: ComputerStorageType.HDD,
    size: 500,
  });
  builder.setGraphics({
    brand: 'Intel',
    model: 'UHD Graphics 630',
    vram: 1,
    baseClock: 350,
    boostClock: 1200,
    rgb: false,
    rayTracing: false,
  });

  builder.setMoney(new Money('EUR', 500.2321));

  return builder.build();
};

// Director can be used to build different types of computers with the same builder
export const Director: Director = Object.freeze({
  makeGamingComputer,
  makeOfficeComputer,
});
