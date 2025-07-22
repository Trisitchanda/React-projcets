import React, {useContext,createContext} from 'react'

export const Themecontext = React.createContext({
    themeMode: "Light",
    darkTheme: () => {},
    lightTheme: () => {},
})

export const ThemeProvider = Themecontext.Provider

export default function useTheme(){
    return useContext(Themecontext)
}
