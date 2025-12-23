"use client"

import { useEffect, useState } from "react"
import { Wallet, Info, CheckCircle2, AlertCircle, CalendarDays, Calendar } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import BackToHome from "./layout/BackToHome"
import { BreadcrumbHeader } from "./layout/BreadcrumbHeader"

export default function ZakatPenghasilan({ title }: { title: string }) {
    const [penghasilan, setPenghasilan] = useState<string>("")
    const [periode, setPeriode] = useState<"bulanan" | "tahunan">("bulanan")
    const [zakatAmount, setZakatAmount] = useState<number | null>(null)
    const [showResult, setShowResult] = useState(false)

    const HARGA_EMAS_PER_GRAM = 1250000 // Harga per gram emas (contoh)
    const NISAB_GRAM = 85 // 85 gram emas
    const NISAB_BULANAN = (NISAB_GRAM * HARGA_EMAS_PER_GRAM) / 12
    const NISAB_TAHUNAN = NISAB_GRAM * HARGA_EMAS_PER_GRAM
    const ZAKAT_RATE = 0.025 // 2.5%

    const getNisab = () => (periode === "bulanan" ? NISAB_BULANAN : NISAB_TAHUNAN)

    const calculateZakat = (income: number): number => {
        const nisab = getNisab()
        if (income >= nisab) {
            return income * ZAKAT_RATE
        }
        return 0
    }

    const handleCalculate = () => {
        const income = Number.parseFloat(penghasilan)
        if (!isNaN(income) && income > 0) {
            const result = calculateZakat(income)
            setZakatAmount(result)
            setShowResult(true)
        }
    }

    const formatRupiah = (value: number): string => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value)
    }

    const isAboveNisab = penghasilan ? Number.parseFloat(penghasilan) >= getNisab() : false

    useEffect(() => {
        document.title = `Finance Simulation App - ${title}`
    }, [title])

    return (
        <div className="min-h-screen bg-blue-500/5">
            <div className="container mx-auto px-4 py-12 max-w-4xl">
                <div className="mb-6">
                    <BreadcrumbHeader pathName="Zakat Penghasilan" textColor="text-blue-500" />
                </div>
                <div className="text-center mb-12 space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold text-blue-500 text-balance">
                        Kalkulator Zakat Penghasilan
                    </h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Zakat penghasilan adalah zakat yang dikenakan atas penghasilan yang diterima dari hasil pekerjaan, profesi,
                        atau usaha. Mari hitung berapa zakat penghasilan yang perlu Anda bayarkan setiap bulannya atau tahunnya.
                    </p>
                </div>

                <Card className="mb-8 border-2 border-blue-500/30 backdrop-blur shadow-lg">
                    <CardContent className="p-6">
                        <div className="flex items-start gap-3">
                            <div className="bg-blue-500 p-2 rounded-lg mt-1 shadow-md">
                                <Info className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-foreground mb-2">Informasi Nisab</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                                    Nisab zakat penghasilan setara dengan 85 gram emas (setara {formatRupiah(NISAB_TAHUNAN)} per tahun
                                    atau {formatRupiah(NISAB_BULANAN)} per bulan). Jika penghasilan Anda mencapai atau melebihi nisab,
                                    maka wajib dizakati sebesar 2,5%.
                                </p>
                                <div className="flex flex-wrap gap-2 text-xs">
                                    <div className="bg-blue-500/20 px-3 py-2 rounded-lg border border-blue-500/30">
                                        <span className="font-bold text-blue-500">Nisab Bulanan: </span>
                                        <span className="text-foreground">{formatRupiah(NISAB_BULANAN)}</span>
                                    </div>
                                    <div className="bg-blue-500/20 px-3 py-2 rounded-lg border border-blue-500/30">
                                        <span className="font-bold text-blue-500">Nisab Tahunan: </span>
                                        <span className="text-foreground">{formatRupiah(NISAB_TAHUNAN)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="mb-8 border-2 border-blue-500/30 shadow-2xl">
                    <CardContent className="p-8">
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-foreground mb-3 items-center gap-2">
                                    <CalendarDays className="w-4 h-4 text-blue-500" />
                                    Pilih Periode Perhitungan
                                </label>
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setPeriode("bulanan")
                                            setShowResult(false)
                                        }}
                                        className={`p-4 rounded-xl border-2 transition-all font-semibold flex items-center justify-center gap-2 ${periode === "bulanan"
                                            ? "bg-blue-500 border-blue-500 text-white shadow-lg scale-105"
                                            : "border-border hover:border-blue-500/50 text-muted-foreground hover:text-foreground"
                                            }`}
                                    >
                                        <Calendar className="w-5 h-5" />
                                        Bulanan
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setPeriode("tahunan")
                                            setShowResult(false)
                                        }}
                                        className={`p-4 rounded-xl border-2 transition-all font-semibold flex items-center justify-center gap-2 ${periode === "tahunan"
                                            ? "bg-blue-500 border-blue-500 text-white shadow-lg scale-105"
                                            : "border-border hover:border-blue-500/50 text-muted-foreground hover:text-foreground"
                                            }`}
                                    >
                                        <CalendarDays className="w-5 h-5" />
                                        Tahunan
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-foreground mb-3 items-center gap-2">
                                    <Wallet className="w-4 h-4 text-blue-500" />
                                    Penghasilan {periode === "bulanan" ? "Bulanan" : "Tahunan"} (Rupiah)
                                </label>
                                <div className="relative">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 bg-blue-500 p-1.5 rounded-md">
                                        <Wallet className="w-5 h-5 text-white" />
                                    </div>
                                    <input
                                        type="text"
                                        value={penghasilan}
                                        onChange={(e) => {
                                            const value = e.target.value.replace(/[^0-9]/g, "")
                                            setPenghasilan(value)
                                            setShowResult(false)
                                        }}
                                        placeholder="0"
                                        className="w-full pl-16 pr-4 py-4 text-lg border-2 border-border rounded-xl focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all bg-background shadow-inner"
                                    />
                                </div>
                                {penghasilan && (
                                    <p className="text-sm font-medium text-blue-500 mt-2">
                                        {formatRupiah(Number.parseFloat(penghasilan) || 0)}
                                    </p>
                                )}
                            </div>

                            {penghasilan && (
                                <div
                                    className={`p-4 rounded-xl border-2 shadow-md ${isAboveNisab
                                        ? "bg-blue-500/10 border-blue-500/40"
                                        : "bg-muted border-muted-foreground/40"
                                        }`}
                                >
                                    <div className="flex items-center gap-2">
                                        {isAboveNisab ? (
                                            <CheckCircle2 className="w-5 h-5 text-blue-500" />
                                        ) : (
                                            <AlertCircle className="w-5 h-5 text-muted-foreground" />
                                        )}
                                        <span className={`font-semibold text-sm ${isAboveNisab ? "text-blue-500" : "text-muted-foreground"}`}>
                                            {isAboveNisab
                                                ? "Penghasilan Anda sudah mencapai nisab ✓"
                                                : "Penghasilan Anda belum mencapai nisab"}
                                        </span>
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-2 ml-7">
                                        Nisab {periode}: {formatRupiah(getNisab())}
                                    </p>
                                </div>
                            )}

                            <Button
                                onClick={handleCalculate}
                                disabled={!penghasilan || Number.parseFloat(penghasilan) === 0}
                                className="w-full py-6 text-lg font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all disabled:opacity-50 bg-blue-500 hover:bg-blue-500/90 text-white"
                                size="lg"
                            >
                                Hitung Zakat
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {showResult && zakatAmount !== null && (
                    <Card className="border-2 border-blue-500/40 shadow-2xl bg-blue-500/10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <CardContent className="p-8">
                            {zakatAmount > 0 ? (
                                <div className="space-y-6">
                                    <div className="text-center">
                                        <div className="inline-block bg-blue-500 px-4 py-2 rounded-full mb-3">
                                            <p className="text-sm font-bold text-white flex items-center gap-2">
                                                <CheckCircle2 className="w-4 h-4" />
                                                Wajib Zakat
                                            </p>
                                        </div>
                                        <p className="text-sm font-medium text-muted-foreground mb-2">
                                            Jumlah Zakat {periode === "bulanan" ? "Bulanan" : "Tahunan"} yang Harus Dibayarkan
                                        </p>
                                        <p className="text-4xl md:text-6xl font-bold text-blue-500 mb-4">
                                            {formatRupiah(zakatAmount)}
                                        </p>
                                        <div className="inline-block bg-blue-500/20 px-6 py-3 rounded-full border-2 border-blue-500/30">
                                            <p className="text-sm font-bold text-blue-500">
                                                2,5% dari {formatRupiah(Number.parseFloat(penghasilan))}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="border-t-2 border-blue-500/20 pt-6">
                                        <h4 className="font-bold text-foreground mb-4 text-center flex items-center justify-center gap-2">
                                            <Info className="w-5 h-5 text-blue-500" />
                                            Rincian Perhitungan
                                        </h4>
                                        <div className="space-y-3">
                                            <div className="flex justify-between items-center p-4 bg-blue-500/5 rounded-lg border border-blue-500/10">
                                                <span className="text-sm font-medium text-muted-foreground">
                                                    Penghasilan {periode === "bulanan" ? "Bulanan" : "Tahunan"}
                                                </span>
                                                <span className="font-bold text-foreground">
                                                    {formatRupiah(Number.parseFloat(penghasilan))}
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center p-4 bg-blue-500/5 rounded-lg border border-blue-500/10">
                                                <span className="text-sm font-medium text-muted-foreground">
                                                    Nisab {periode === "bulanan" ? "Bulanan" : "Tahunan"} (85 gram emas)
                                                </span>
                                                <span className="font-bold text-foreground">{formatRupiah(getNisab())}</span>
                                            </div>
                                            <div className="flex justify-between items-center p-4 bg-blue-500/5 rounded-lg border border-blue-500/10">
                                                <span className="text-sm font-medium text-muted-foreground">Persentase Zakat</span>
                                                <span className="font-bold text-foreground">2,5%</span>
                                            </div>
                                            <div className="flex justify-between items-center p-4 bg-blue-500 rounded-lg shadow-lg">
                                                <span className="text-sm font-bold text-white">Zakat yang Wajib Dibayar</span>
                                                <span className="font-bold text-white text-lg">{formatRupiah(zakatAmount)}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {periode === "bulanan" && (
                                        <div className="bg-blue-500/20 p-5 rounded-xl border-2 border-blue-500/30 shadow-md">
                                            <p className="text-sm text-foreground text-center leading-relaxed mb-2">
                                                <span className="font-bold text-blue-500">Proyeksi Tahunan:</span>
                                            </p>
                                            <p className="text-2xl font-bold text-center text-blue-500">{formatRupiah(zakatAmount * 12)}</p>
                                            <p className="text-xs text-muted-foreground text-center mt-1">
                                                (Jika penghasilan konsisten selama 12 bulan)
                                            </p>
                                        </div>
                                    )}

                                    <div className="bg-blue-500/10 p-5 rounded-xl border-2 border-blue-500/20 shadow-md">
                                        <p className="text-sm text-foreground text-center leading-relaxed">
                                            <span className="font-bold text-blue-500">Catatan:</span> Zakat penghasilan dapat dibayarkan setiap
                                            kali menerima penghasilan tanpa harus menunggu haul (satu tahun).
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <div className="bg-muted-foreground p-5 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center shadow-lg">
                                        <AlertCircle className="w-10 h-10 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-foreground mb-2">Belum Wajib Zakat</h3>
                                    <p className="text-muted-foreground max-w-md mx-auto leading-relaxed mb-4">
                                        Penghasilan {periode} Anda belum mencapai nisab. Anda belum wajib membayar zakat penghasilan saat
                                        ini.
                                    </p>
                                    <div className="inline-block bg-muted px-6 py-3 rounded-full border-2 border-muted-foreground/30">
                                        <p className="text-sm font-bold text-muted-foreground">
                                            Selisih: {formatRupiah(getNisab() - Number.parseFloat(penghasilan))}
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
                <BackToHome bgColor="bg-blue-400 hover:bg-blue-500" />
            </div>
        </div>
    )
}
