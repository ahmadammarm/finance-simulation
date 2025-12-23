import { useEffect, useState } from "react"
import { Coins, Info, CheckCircle2, AlertCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FormatRupiah } from "@/lib/rupiah"
import BackToHome from "./layout/BackToHome"
import { BreadcrumbHeader } from "./layout/BreadcrumbHeader"

export default function ZakatMaal({ title }: { title: string }) {
    const [totalWealth, setTotalWealth] = useState<string>("")
    const [zakatAmount, setZakatAmount] = useState<number | null>(null)
    const [showResult, setShowResult] = useState(false)
    const [hargaEmas, setHargaEmas] = useState<string>("2500000")

    const NISAB = 85 * (Number.parseFloat(hargaEmas) || 0)
    const ZAKAT_RATE = 0.025

    const calculateZakatMaal = (wealth: number): number => {
        if (wealth >= NISAB) {
            return wealth * ZAKAT_RATE
        }
        return 0
    }

    const handleCalculate = () => {
        const wealth = Number.parseFloat(totalWealth)
        if (!isNaN(wealth) && wealth > 0) {
            const result = calculateZakatMaal(wealth)
            setZakatAmount(result)
            setShowResult(true)
        }
    }



    const isAboveNisab = totalWealth ? Number.parseFloat(totalWealth) >= NISAB : false

    useEffect(() => {
        document.title = `Finance Simulation App - ${title}`
    }, [title])

    return (
        <div className="min-h-screen bg-linear-to-br from-primary/5 via-primary/10 to-primary/20">
            <div className="container mx-auto px-4 py-12 max-w-4xl">
                <div className="mb-6">
                    <BreadcrumbHeader pathName="Zakat Maal" textColor="text-primary" />
                </div>
                <div className="text-center mb-12 space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-primary to-primary/80 bg-clip-text text-transparent text-balance">
                        Kalkulator Zakat Maal
                    </h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Zakat Maal adalah zakat yang dikenakan atas harta yang mencapai nisab dan telah dimiliki selama satu tahun
                        (haul). Mari hitung kewajiban zakat Anda dengan mudah.
                    </p>
                </div>

                <Card className="mb-8 border-2 border-primary/30 bg-linear-to-br from-card to-primary/5 backdrop-blur shadow-lg">
                    <CardContent className="p-6">
                        <div className="flex items-start gap-3">
                            <div className="bg-primary p-2 rounded-lg mt-1 shadow-md">
                                <Info className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-foreground mb-2">Informasi Nisab</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    Nisab zakat maal setara dengan 85 gram emas.
                                    Jika harta sudah melebihi nisab dan telah dimiliki selama satu tahun, maka wajib dizakati sebesar 2,5%.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="mb-8 border-2 border-primary/30 shadow-2xl bg-linear-to-br from-card to-primary/5">
                    <CardContent className="p-8">
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-foreground mb-3 items-center gap-2">
                                    <Coins className="w-4 h-4 text-primary" />
                                    Harga Emas per Gram (Rupiah)
                                </label>
                                <div className="relative">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 bg-primary p-1.5 rounded-md">
                                        <Coins className="w-5 h-5 text-white" />
                                    </div>
                                    <input
                                        type="text"
                                        value={hargaEmas}
                                        onChange={(e) => {
                                            const value = e.target.value.replace(/[^0-9]/g, "")
                                            setHargaEmas(value)
                                            setShowResult(false)
                                        }}
                                        placeholder="0"
                                        className="w-full pl-16 pr-4 py-4 text-lg border-2 border-border rounded-xl focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all bg-background shadow-inner"
                                    />
                                </div>
                                {hargaEmas && (
                                    <p className="text-sm font-medium text-primary mt-2">
                                        Nisab saat ini: {FormatRupiah(NISAB)}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-foreground mb-3 items-center gap-2">
                                    <Coins className="w-4 h-4 text-primary" />
                                    Total Harta Anda (Rupiah)
                                </label>
                                <div className="relative">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 bg-primary p-1.5 rounded-md">
                                        <Coins className="w-5 h-5 text-white" />
                                    </div>
                                    <input
                                        type="text"
                                        value={totalWealth}
                                        onChange={(e) => {
                                            const value = e.target.value.replace(/[^0-9]/g, "")
                                            setTotalWealth(value)
                                            setShowResult(false)
                                        }}
                                        placeholder="0"
                                        className="w-full pl-16 pr-4 py-4 text-lg border-2 border-border rounded-xl focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all bg-background shadow-inner"
                                    />
                                </div>
                                {totalWealth && (
                                    <p className="text-sm font-medium text-primary mt-2">
                                        {FormatRupiah(Number.parseFloat(totalWealth) || 0)}
                                    </p>
                                )}
                            </div>

                            {totalWealth && (
                                <div
                                    className={`p-4 rounded-xl border-2 shadow-md ${isAboveNisab
                                        ? "bg-primary/10 border-primary/40"
                                        : "bg-muted border-accent/40"
                                        }`}
                                >
                                    <div className="flex items-center gap-2">
                                        {isAboveNisab ? (
                                            <CheckCircle2 className="w-5 h-5 text-primary" />
                                        ) : (
                                            <AlertCircle className="w-5 h-5 text-accent" />
                                        )}
                                        <span className={`font-semibold text-sm ${isAboveNisab ? "text-primary" : "text-accent"}`}>
                                            {isAboveNisab ? "Harta Anda sudah mencapai nisab ✓" : "Harta Anda belum mencapai nisab"}
                                        </span>
                                    </div>
                                </div>
                            )}

                            <Button
                                onClick={handleCalculate}
                                disabled={!totalWealth || Number.parseFloat(totalWealth) === 0 || !hargaEmas || Number.parseFloat(hargaEmas) === 0}
                                className="w-full py-6 text-lg font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all disabled:opacity-50 bg-primary hover:bg-primary/90 text-white"
                                size="lg"
                            >
                                Hitung Zakat
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {showResult && zakatAmount !== null && (
                    <Card className="border-2 border-primary/40 shadow-2xl bg-linear-to-br from-primary/10 to-primary/5 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <CardContent className="p-8">
                            {zakatAmount > 0 ? (
                                <div className="space-y-6">
                                    <div className="text-center">
                                        <div className="inline-block bg-primary px-4 py-2 rounded-full mb-3">
                                            <p className="text-sm font-bold text-white flex items-center gap-2">
                                                <CheckCircle2 className="w-4 h-4" />
                                                Wajib Zakat
                                            </p>
                                        </div>
                                        <p className="text-sm font-medium text-muted-foreground mb-2">Jumlah Zakat yang Harus Dibayarkan</p>
                                        <p className="text-4xl md:text-6xl font-bold text-primary mb-4">
                                            {FormatRupiah(zakatAmount)}
                                        </p>
                                        <div className="inline-block bg-primary/20 px-6 py-3 rounded-full border-2 border-primary/30">
                                            <p className="text-sm font-bold text-primary">
                                                2,5% dari {FormatRupiah(Number.parseFloat(totalWealth))}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="border-t-2 border-primary/20 pt-6">
                                        <h4 className="font-bold text-foreground mb-4 text-center flex items-center justify-center gap-2">
                                            <Info className="w-5 h-5 text-primary" />
                                            Rincian Perhitungan
                                        </h4>
                                        <div className="space-y-3">
                                            <div className="flex justify-between items-center p-4 bg-primary/5 rounded-lg border border-primary/10">
                                                <span className="text-sm font-medium text-muted-foreground">Harga Emas per Gram</span>
                                                <span className="font-bold text-foreground">
                                                    {FormatRupiah(Number.parseFloat(hargaEmas))}
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center p-4 bg-primary/5 rounded-lg border border-primary/10">
                                                <span className="text-sm font-medium text-muted-foreground">Total Harta</span>
                                                <span className="font-bold text-foreground">
                                                    {FormatRupiah(Number.parseFloat(totalWealth))}
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center p-4 bg-primary/5 rounded-lg border border-primary/10">
                                                <span className="text-sm font-medium text-muted-foreground">Nisab (85 gram emas)</span>
                                                <span className="font-bold text-foreground">{FormatRupiah(NISAB)}</span>
                                            </div>
                                            <div className="flex justify-between items-center p-4 bg-primary/5 rounded-lg border border-primary/10">
                                                <span className="text-sm font-medium text-muted-foreground">Persentase Zakat</span>
                                                <span className="font-bold text-foreground">2,5%</span>
                                            </div>
                                            <div className="flex justify-between items-center p-4 bg-primary rounded-lg shadow-lg">
                                                <span className="text-sm font-bold text-white">Zakat yang Wajib Dibayar</span>
                                                <span className="font-bold text-white text-lg">{FormatRupiah(zakatAmount)}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-primary/10 p-5 rounded-xl border-2 border-primary/20 shadow-md">
                                        <p className="text-sm text-foreground text-center leading-relaxed">
                                            <span className="font-bold text-primary">Catatan:</span> Pastikan harta ini telah Anda miliki
                                            selama satu tahun penuh (haul) dan tidak termasuk hutang atau kebutuhan pokok.
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <div className="bg-accent p-5 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center shadow-lg">
                                        <AlertCircle className="w-10 h-10 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-foreground mb-2">Belum Wajib Zakat</h3>
                                    <p className="text-muted-foreground max-w-md mx-auto leading-relaxed mb-4">
                                        Harta Anda belum mencapai nisab. Anda belum wajib membayar zakat maal saat ini.
                                    </p>
                                    <div className="inline-block bg-accent/20 px-6 py-3 rounded-full border-2 border-accent/30">
                                        <p className="text-sm font-bold text-accent">
                                            Selisih: {FormatRupiah(NISAB - Number.parseFloat(totalWealth))}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                )}

                <div className="mt-8 text-center">
                    <p className="text-sm text-muted-foreground">
                        Perhitungan ini adalah estimasi. Untuk perhitungan yang lebih akurat, konsultasikan dengan ustadz atau
                        lembaga zakat terpercaya.
                    </p>
                </div>
                <BackToHome bgColor="bg-primary" />
            </div>
        </div>
    )
}
