import { createContext, useState, useMemo, useContext } from "react";

const ThemeContext = createContext(undefined);

export const ThemeProvider = ({ children }) => {
    
    const [theme, setTheme] = useState("light");

    const value = useMemo(() => ({
        theme,
        toggleTheme: () => setTheme(theme === 'light' ? 'dark' : 'light')
    }), [theme]);

    return <ThemeContext.Provider value={value}>
        {children}
    </ThemeContext.Provider>
};

export const useTheme = () => useContext(ThemeContext); 
