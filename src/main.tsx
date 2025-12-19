import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import ZakatMaal from './components/ZakatMaal.tsx'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/zakat-maal" element={<ZakatMaal title="Kalkulator Zakat Maal" />} />
            </Routes>
        </BrowserRouter>
    </StrictMode>
)
