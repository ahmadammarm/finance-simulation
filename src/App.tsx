import { useEffect } from "react"
import FinanceTypeCard from "./components/homepage/FinanceTypeCard"
import { Wallet, Banknote } from "lucide-react"

export default function App() {

    useEffect(() => {
        document.title = "Finance Simulation Platform"
    }, [])

    return (
        <div className="min-h-screen bg-linear-to-br from-primary/10 via-card to-accent/10">
            <div className="text-center pt-12 mb-8 px-4">
                <h1 className="text-4xl md:text-5xl font-bold">
                    Finance Simulation Platform
                </h1>
                <p className="text-muted-foreground text-lg mt-2">
                    Platform simulasi keuangan untuk membantu Anda mengelola dan menghitung kewajiban keuangan dengan mudah.
                </p>
            </div>

            <div className="flex justify-center">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 px-4 py-12 max-w-6xl w-full">
                    <FinanceTypeCard
                        title="Zakat Maal"
                        description="Hitung kewajiban zakat maal Anda dengan mudah dan cepat."
                        icon={Wallet}
                        buttonColor="text-emerald-700"
                        link="/zakat-maal"
                        gradient="bg-linear-to-br from-emerald-400 to-emerald-500"
                    />

                    <FinanceTypeCard
                        title="Zakat Penghasilan"
                        description="Hitung zakat penghasilan Anda setiap bulan atau tahun dengan mudah."
                        icon={Banknote}
                        buttonColor="text-blue-700"
                        link="/zakat-penghasilan"
                        gradient="bg-linear-to-br from-cyan-400 to-blue-500"
                    />

                    <FinanceTypeCard
                        title="Simulasi KPR Syariah"
                        description="Simulasikan cicilan KPR Syariah berbasis akad Murabahah dengan margin tetap."
                        icon={Banknote}
                        buttonColor="text-purple-700"
                        link="/kpr-syariah"
                        gradient="bg-linear-to-br from-purple-400 to-pink-500"
                    />

                    <FinanceTypeCard
                        title="Dana Darurat"
                        description="Hitung kebutuhan dana darurat Anda berdasarkan pengeluaran bulanan dan tanggungan."
                        icon={Wallet}
                        buttonColor="text-red-700"
                        link="/dana-darurat"
                        gradient="bg-linear-to-br from-red-400 to-red-500"
                    />
                </div>
            </div>
        </div>
    )
}
