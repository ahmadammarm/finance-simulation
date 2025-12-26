import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import ZakatMaal from './components/ZakatMaal.tsx'
import ZakatPenghasilan from './components/ZakatPenghasilan.tsx'
import KPRSyariah from './components/KPRSyariah.tsx'
import DanaDarurat from './components/DanaDarurat.tsx'
import PengeluaranBulanan from './components/PengeluaranBulanan.tsx'
import Homepage from './components/homepage/Homepage.tsx'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Homepage title="Finance Simulation Platform" />} />
                    <Route path="/zakat-maal" element={<ZakatMaal title="Kalkulator Zakat Maal" />} />
                    <Route path="/zakat-penghasilan" element={<ZakatPenghasilan title="Kalkulator Zakat Penghasilan" />} />
                    <Route path="/kpr-syariah" element={<KPRSyariah title="Simulasi KPR Syariah" />} />
                    <Route path="/dana-darurat" element={<DanaDarurat title="Kalkulator Dana Darurat" />} />
                    <Route path="/pengeluaran-bulanan" element={<PengeluaranBulanan title="Pengeluaran Bulanan" />} />
                </Routes>
            </BrowserRouter>
        </App>
    </StrictMode>
)
