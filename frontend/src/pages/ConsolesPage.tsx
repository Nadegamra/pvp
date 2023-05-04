import { useState, useEffect } from 'react';
import { getConsoles } from '../api/ConsolesApi';
import { ConsoleGet } from '../models/Console';

interface Props {
  onConsoleSelected?: (console: ConsoleGet, quantity: number) => void;
}

function ConsolesPage({ onConsoleSelected }: Props) {
  const [consoles, setConsoles] = useState<ConsoleGet[]>([]);
  const [quantities, setQuantities] = useState<{ [id: number]: number }>({});

  useEffect(() => {
    getConsoles().then((response) => {
      const consolesData: ConsoleGet[] = response.data;
      setConsoles(consolesData);
    });
  }, []);

  const handleConsoleSelected = (console: ConsoleGet) => {
    const quantity = quantities[console.id] ?? 0;
    if (onConsoleSelected) {
      onConsoleSelected(console, quantity);
    }
  };

  const handleQuantityChange = (consoleId: number, quantity: number) => {
    setQuantities({ ...quantities, [consoleId]: quantity ?? 0 });
  };

  return (
    <div>
      <h1>Available Consoles</h1>
      <ul>
        {consoles.map((console) => (
          <li key={console.id} onClick={() => handleConsoleSelected(console)}>
            {console.name} ({console.dailyPrice} eur)
            <input
              type="number"
              min="0"
              value={quantities[console.id] ?? ''}
              onChange={(e) =>
                handleQuantityChange(console.id, parseInt(e.target.value) ?? 0)
              }
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ConsolesPage;
