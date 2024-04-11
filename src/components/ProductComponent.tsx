import { useState } from 'react';

import { createComputerBuilder, Director, ItemComputer } from '../core/Item';

const ProductComponent = ({ id }: { id: number }) => {
  const [selectedItemComputer, setSelectedItemComputer] = useState<ItemComputer | null>(
    null,
  );

  const director = Director;

  const onCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    switch (event.target.value) {
      case 'Gaming':
        setSelectedItemComputer(director.makeGamingComputer(createComputerBuilder(id)));
        break;
      case 'Office':
        setSelectedItemComputer(director.makeOfficeComputer(createComputerBuilder(id)));
        break;
      default:
        setSelectedItemComputer(null);
        break;
    }
  };

  return (
    <div>
      <h1>Wähle deinen PC</h1>
      <Checkbox onChange={onCheckboxChange} />
      <div>
        {selectedItemComputer && (
          <div>
            <h2>Dein PC</h2>
            <table>
              <tr>
                <th>Prozessor</th>
                <th>Arbeitsspeicher</th>
                <th>Speicher</th>
                <th>Grafikkarte</th>
              </tr>
              <tr>
                <td>
                  {selectedItemComputer.processor.brand}{' '}
                  {selectedItemComputer.processor.model}
                </td>
                <td>{selectedItemComputer.memory.size} GB</td>
                <td>{selectedItemComputer.storage.size} GB</td>
                <td>
                  {selectedItemComputer.graphics.brand}{' '}
                  {selectedItemComputer.graphics.model}
                </td>
              </tr>
            </table>
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
