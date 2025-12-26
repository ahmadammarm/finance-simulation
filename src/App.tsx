import { ThemeProvider } from "./providers/theme-provider"

function App({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            {children}
        </ThemeProvider>
    )
}

export default App