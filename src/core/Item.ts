export type Money = {
  currency: string;
  amount: number;
  addition: (money: Money, toAdd: Money) => Money;
  subtract: (money: Money, toSubtract: Money) => Money;
  round: (money: Money, precision: number) => Money;
};

const addition = (money: Money, toAdd: Money) => {
  return {
    currency: money.currency,
    amount: money.amount + toAdd.amount,
    addition: money.addition,
    subtract: money.subtract,
    round: money.round,
  };
};

const subtract = (money: Money, toSubtract: Money) => {
  return {
    currency: money.currency,
    amount: money.amount - toSubtract.amount,
    addition: money.addition,
    subtract: money.subtract,
    round: money.round,
  };
};

const round = (money: Money, precision: number) => {
  return {
    currency: money.currency,
    amount: Math.round(money.amount * Math.pow(10, precision)) / Math.pow(10, precision),
    addition: money.addition,
    subtract: money.subtract,
    round: money.round,
  };
};

export type Item = {
  id: number;
  name: string;
  money: Money;
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
  setComputerName: (name: string) => void;
  setProcessor: (processor: ComputerProcessor) => void;
  setMemory: (memory: ComputerMemory) => void;
  setStorage: (storage: ComputerStorage) => void;
  setGraphics: (graphics: ComputerGraphics) => void;
  setMoney: (money: Money) => void;
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
  let money: Money;
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

  builder.setMoney({
    currency: 'EUR',
    amount: 3000,
    addition,
    subtract,
    round,
  });

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

  builder.setMoney({
    currency: 'EUR',
    amount: 500,
    addition,
    subtract,
    round,
  });

  return builder.build();
};

export const Director: Director = Object.freeze({
  makeGamingComputer,
  makeOfficeComputer,
});
