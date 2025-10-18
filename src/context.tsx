import { createContext, useState } from 'react'

type Item = {
  item_name: string;
  item_cost: number;
  item_quantity: number;
  description?: string;
};
type AppContextType = {
  items: Item[];
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
};

export const AppContext = createContext<AppContextType>({
  items: [],
  setItems: () => {},
});

export function AppProvider({ children }: {children: React.ReactNode}) {
  const [items, setItems] = useState<Item[]>([]);

  return (
    <AppContext.Provider value={{items, setItems}}>
      {children}
    </AppContext.Provider>
  );
}
