export type Item = {
  id: number;
  name: string;
};

type ComputerProcessor = {
  brand: string;
  model: string;
  cores: number;
  integratedGraphics: boolean;
};

enum ComputerMemoryType {
  DDR3 = 'DDR3',
  DDR4 = 'DDR4',
  DDR5 = 'DDR5',
}
type ComputerMemory = {
  type: ComputerMemoryType;
  size: number;
  rgb: boolean;
};

enum ComputerStorageType {
  HDD = 'HDD',
  SSD = 'SSD',
}

type ComputerStorage = {
  type: ComputerStorageType;
  size: number; // in GB
};

type ComputerGraphics = {
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

type ItemComputerGaming = ItemComputer & {
  type: 'Gaming';
};

type ItemComputerOffice = ItemComputer & {
  type: 'Office';
};

// Builder Pattern
type ComputerBuilder = {
  setProcessor: (processor: ComputerProcessor) => void;
  setMemory: (memory: ComputerMemory) => void;
  setStorage: (storage: ComputerStorage) => void;
  setGraphics: (graphics: ComputerGraphics) => void;
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

export const createComputerBuilder = (id: number): ComputerBuilder => {
  let processor: ComputerProcessor;
  let memory: ComputerMemory;
  let storage: ComputerStorage;
  let graphics: ComputerGraphics;

  return {
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
    build: () => {
      return {
        id,
        name: 'Computer',
        processor,
        memory,
        storage,
        graphics,
      };
    },
  };
};
const makeGamingComputer = (builder: ComputerBuilder) => {
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

  return builder.build();
};

const makeOfficeComputer = (builder: ComputerBuilder) => {
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

  return builder.build();
};

export const Director: Director = Object.freeze({
  makeGamingComputer,
  makeOfficeComputer,
});
