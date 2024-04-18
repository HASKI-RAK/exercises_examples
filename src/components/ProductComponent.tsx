import { useState } from 'react';

import { addItemCommand } from '../CommandPattern';
import { ItemComputer } from '../core/Computer';
import { createComputerBuilder, Director } from '../core/ComputerBuilderPattern';

const ProductComponent = () => {
  const director = Director;
  const addItem = addItemCommand();
  const [selectedItem, setSelectedItem] = useState<ItemComputer | undefined>();
  const [selectedCheckBox, setSelectedCheckBox] = useState<string>('Gaming'); // Default value is 'Gaming

  //! Actual application of the Builder Pattern
  const buildComputer = (type: string) => {
    const builder = createComputerBuilder();
    builder.setComputerName('Computer');
    builder.setId(Date.now());

    // the checkbox decides the type of computer
    if (type === 'Gaming') {
      return director.makeGamingComputer(builder);
    } else {
      return director.makeOfficeComputer(builder);
    }
  };

  const onCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCheckBox(event.target.value);
    setSelectedItem(buildComputer(event.target.value));
  };

  return (
    <div>
      <h1>Wähle deinen PC</h1>
      <Checkbox onChange={onCheckboxChange} />
      <div>
        {selectedItem && (
          <div>
            <h2>Dein PC</h2>
            <table>
              <tr>
                <th>Prozessor</th>
                <th>Arbeitsspeicher</th>
                <th>Speicher</th>
                <th>Grafikkarte</th>
                <th>Preis</th>
              </tr>
              <tr>
                <td>
                  {selectedItem.processor.brand} {selectedItem.processor.model}
                </td>
                <td>{selectedItem.memory.size} GB</td>
                <td>{selectedItem.storage.size} GB</td>
                <td>
                  {selectedItem.graphics.brand} {selectedItem.graphics.model}
                </td>
                <td>
                  {selectedItem.money.amount} {selectedItem.money.currency}
                </td>
              </tr>
            </table>
            <button
              onClick={() => {
                addItem(buildComputer(selectedCheckBox));
              }}
            >
              In den Warenkorb
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductComponent;

const Checkbox = ({
  onChange,
}: {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <form>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: '8px',
          }}
        >
          <input
            type="radio"
            id="html"
            name="computer"
            value="Gaming"
            onChange={onChange}
          />
          <label htmlFor="html">Gaming PC</label>
        </div>
        <div
          style={{
            display: 'flex',
            gap: '8px',
          }}
        >
          <input
            type="radio"
            id="css"
            name="computer"
            value="Office"
            onChange={onChange}
          />
          <label htmlFor="css">Office PC</label>
        </div>
      </div>
    </form>
  );
};
