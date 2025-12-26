import { useEffect } from "react"
import FinanceTypeCard from "./FinanceTypeCard"
import { Wallet, Banknote, Home as HomeIcon, Shield, TrendingUp, Github } from "lucide-react"
import { ModeToggle } from "../layout/ModeToggle"
import { Button } from "../ui/button"

export default function Homepage({ title = "Finance Simulation Platform" }) {
    useEffect(() => {
        document.title = title
    }, [title])

    return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            <div className="flex items-center justify-center pt-6">
                <div className="mb-4">
                    <Button variant="ghost" size="icon" className="hover:bg-accent/10 mr-2" onClick={() => window.open("https://github.com/ahmadammarm/finance-simulation")}>
                        <Github className="h-[1.2rem] w-[1.2rem]" />
                    </Button>
                    <ModeToggle />
                </div>
            </div>

            <div className="container mx-auto px-4 pt-8 pb-12">
                <div className="text-center max-w-4xl mx-auto space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-700 dark:text-blue-300 text-sm font-semibold mb-4">
                        Kelola Keuangan dengan Bijak
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold bg-linear-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                        Finance Simulation Platform
                    </h1>

                    <p className="text-gray-600 dark:text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        Platform simulasi keuangan untuk membantu Anda mengelola dan menghitung kewajiban keuangan dengan mudah dan akurat.
                    </p>

                    <div className="flex flex-wrap justify-center gap-8 pt-8">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">5+</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Kalkulator</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">100%</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Gratis</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-green-600 dark:text-green-400">Mudah</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Digunakan</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 pb-16">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                            Pilih Simulasi Keuangan
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400">
                            Berbagai tools untuk membantu perencanaan keuangan Anda
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        <FinanceTypeCard
                            title="Zakat Maal"
                            description="Hitung kewajiban zakat maal Anda dengan mudah dan cepat berdasarkan harta yang dimiliki."
                            icon={Wallet}
                            buttonColor="text-emerald-700 dark:text-emerald-400"
                            link="/zakat-maal"
                            gradient="bg-linear-to-br from-emerald-400 to-emerald-500"
                        />

                        <FinanceTypeCard
                            title="Zakat Penghasilan"
                            description="Hitung zakat penghasilan Anda setiap bulan atau tahun dengan perhitungan yang akurat."
                            icon={Banknote}
                            buttonColor="text-blue-700 dark:text-blue-400"
                            link="/zakat-penghasilan"
                            gradient="bg-linear-to-br from-cyan-400 to-blue-500"
                        />

                        <FinanceTypeCard
                            title="Simulasi KPR Syariah"
                            description="Simulasikan cicilan KPR Syariah berbasis akad Murabahah dengan margin tetap."
                            icon={HomeIcon}
                            buttonColor="text-purple-700 dark:text-purple-400"
                            link="/kpr-syariah"
                            gradient="bg-linear-to-br from-purple-400 to-pink-500"
                        />

                        <FinanceTypeCard
                            title="Dana Darurat"
                            description="Hitung kebutuhan dana darurat Anda berdasarkan pengeluaran bulanan dan tanggungan keluarga."
                            icon={Shield}
                            buttonColor="text-red-700 dark:text-red-400"
                            link="/dana-darurat"
                            gradient="bg-linear-to-br from-red-400 to-red-500"
                        />

                        <FinanceTypeCard
                            title="Pengeluaran Bulanan"
                            description="Simulasikan pengeluaran bulanan Anda berdasarkan gaji dan jumlah tanggungan dengan rinci."
                            icon={TrendingUp}
                            buttonColor="text-yellow-700 dark:text-yellow-400"
                            link="/pengeluaran-bulanan"
                            gradient="bg-linear-to-br from-yellow-400 to-amber-500"
                        />
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-800 py-8">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                        &copy; {new Date().getFullYear()} Finance Simulation Platform. Semua perhitungan bersifat estimasi.
                    </p>
                </div>
            </div>
        </div>
    )
}