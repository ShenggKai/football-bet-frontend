import { useState, createContext } from 'react';

// project import
import { ChildContainerProps, MenuContextProps } from '@/types';

// ========================|| Menu context ||========================
export const MenuContext = createContext({} as MenuContextProps);

// ========================|| Menu provider ||========================
export const MenuProvider = ({ children }: ChildContainerProps) => {
    const [activeMenu, setActiveMenu] = useState('');

    const value = {
        activeMenu,
        setActiveMenu
    };

    return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
};
