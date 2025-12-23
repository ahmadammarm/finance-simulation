import { useEffect, useState } from "react"
import { Info, CheckCircle2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FormatRupiah } from "@/lib/rupiah"
import BackToHome from "./layout/BackToHome"
import { BreadcrumbHeader } from "./layout/BreadcrumbHeader"

export default function KPRSyariah({ title }: { title: string }) {
    const [hargaRumah, setHargaRumah] = useState("")
    const [dpPercent, setDpPercent] = useState("20")
    const [tenorTahun, setTenorTahun] = useState("15")
    const [marginPercent, setMarginPercent] = useState("20")
    const [result, setResult] = useState<null | {
        cicilan: number
        totalBayar: number
        totalMargin: number
    }>(null)

    useEffect(() => {
        document.title = `Finance Simulation App - ${title}`
    }, [title])

    const handleCalculate = () => {
        const harga = Math.ceil(Number(hargaRumah))
        const dp = Math.ceil(harga * (Number(dpPercent) / 100))
        const tenorBulan = Math.ceil(Number(tenorTahun) * 12)
        const margin = Math.ceil(harga * (Number(marginPercent) / 100))

        const hargaJual = Math.ceil(harga - dp + margin)
        const cicilan = Math.ceil(hargaJual / tenorBulan)

        setResult({
            cicilan,
            totalBayar: hargaJual,
            totalMargin: margin,
        })
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-purple-700/5 via-purple-700/10 to-purple-700/20">
            <div className="container mx-auto px-4 py-12 max-w-4xl">
                <div className="mb-6">
                    <BreadcrumbHeader pathName="Simulasi KPR Syariah" textColor="text-purple-700" />
                </div>

                <div className="text-center mb-12 space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-purple-700 to-purple-700/80 bg-clip-text text-transparent">
                        Simulasi KPR Syariah
                    </h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        KPR Syariah adalah pembiayaan perumahan yang menggunakan prinsip
                        syariah Islam, seperti akad Murabahah dengan margin tetap tanpa bunga. Mari kita
                        simulasikan cicilan KPR Syariah Anda!
                    </p>
                </div>

                <Card className="mb-8 border-2 border-purple-700/30 bg-linear-to-br from-card to-purple-700/5 shadow-xl">
                    <CardContent className="p-8 space-y-6">
                        <div>
                            <label className="font-semibold text-sm">Harga Rumah</label>
                            <input
                                value={hargaRumah}
                                onChange={(e) => setHargaRumah(e.target.value.replace(/\D/g, ""))}
                                className="w-full mt-2 p-4 border-2 rounded-xl"
                                placeholder="Rp 0"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="font-semibold text-sm">DP (%)</label>
                                <input
                                    value={dpPercent}
                                    onChange={(e) => setDpPercent(e.target.value.replace(/\D/g, ""))}
                                    className="w-full mt-2 p-4 border-2 rounded-xl"
                                />
                            </div>
                            <div>
                                <label className="font-semibold text-sm">Tenor (Tahun)</label>
                                <input
                                    value={tenorTahun}
                                    onChange={(e) => setTenorTahun(e.target.value.replace(/\D/g, ""))}
                                    className="w-full mt-2 p-4 border-2 rounded-xl"
                                />
                            </div>
                            <div>
                                <label className="font-semibold text-sm">Margin (%)</label>
                                <input
                                    value={marginPercent}
                                    onChange={(e) => setMarginPercent(e.target.value.replace(/\D/g, ""))}
                                    className="w-full mt-2 p-4 border-2 rounded-xl"
                                />
                            </div>
                        </div>

                        <ul className="text-sm text-muted-foreground list-disc ml-5 space-y-1">
                            <li><strong>DP:</strong> Persentase uang muka yang dibayarkan di awal transaksi.</li>
                            <li><strong>Tenor:</strong> Lama waktu pelunasan.</li>
                            <li><strong>Margin:</strong> Persentase keuntungan tetap pada akad Murabahah.</li>
                        </ul>

                        <Button
                            onClick={handleCalculate}
                            disabled={!hargaRumah || !dpPercent || !tenorTahun || !marginPercent}
                            className="w-full py-6 text-lg font-bold rounded-xl bg-purple-700 text-white hover:bg-purple-800"
                        >
                            Hitung Simulasi KPR
                        </Button>
                    </CardContent>
                </Card>

                {result && (
                    <Card className="border-2 border-purple-700/40 bg-purple-700/5 shadow-2xl animate-in fade-in">
                        <CardContent className="p-8 space-y-6">
                            <div className="text-center">
                                <div className="inline-flex items-center gap-2 bg-purple-700 px-4 py-2 rounded-full text-white font-bold">
                                    <CheckCircle2 className="w-4 h-4" />
                                    Hasil Simulasi
                                </div>
                                <p className="mt-4 text-sm text-muted-foreground">Cicilan per Bulan</p>
                                <p className="text-4xl font-bold text-purple-700">
                                    {FormatRupiah(result.cicilan)}
                                </p>
                            </div>

                            <div className="space-y-3">
                                <div className="flex justify-between p-4 bg-white rounded-lg border">
                                    <span>Total Pembayaran</span>
                                    <strong>{FormatRupiah(result.totalBayar)}</strong>
                                </div>
                                <div className="flex justify-between p-4 bg-white rounded-lg border">
                                    <span>Total Margin</span>
                                    <strong>{FormatRupiah(result.totalMargin)}</strong>
                                </div>
                            </div>

                            <div className="bg-purple-700/10 p-4 rounded-xl text-center text-sm">
                                <Info className="inline w-4 h-4 text-purple-700 mr-1" />
                                Akad Murabahah menggunakan margin tetap tanpa bunga dan tanpa perubahan cicilan.
                            </div>
                        </CardContent>
                    </Card>
                )}

                <div className="mt-8 text-center text-sm text-muted-foreground">
                    Simulasi ini bersifat ilustratif dan hanya perkiraan. Simulasi ini dapat berbeda dengan realisasi lembaga pembiayaan syariah.
                </div>

                <BackToHome bgColor="bg-purple-700 hover:bg-purple-800" />
            </div>
        </div>
    )
}
