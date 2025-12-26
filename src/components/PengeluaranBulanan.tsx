"use client"

import { useEffect, useState } from "react"
import {
    Info,
    CheckCircle2,
    AlertCircle,
    XCircle,
    Home,
    ShoppingCart,
    Calendar
} from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FormatRupiah } from "@/lib/rupiah"
import BackToHome from "./layout/BackToHome"
import { BreadcrumbHeader } from "./layout/BreadcrumbHeader"

export default function PengeluaranBulanan({ title }: { title: string }) {
    const [salary, setSalary] = useState<string>("")
    const [dependents, setDependents] = useState<string>("")
    const [showResult, setShowResult] = useState(false)

    const BASIC_COST_PER_PERSON = 1_500_000
    const HEALTHY_LIMIT = 0.6

    const parsedSalary = Number.parseFloat(salary) || 0
    const parsedDependents = Number.parseInt(dependents) || 0

    const totalPeople = parsedDependents + 1

    const mandatoryExpense = totalPeople * BASIC_COST_PER_PERSON * 0.4

    const variableExpense = totalPeople * BASIC_COST_PER_PERSON * 0.35

    const periodicExpense = totalPeople * BASIC_COST_PER_PERSON * 0.25

    const totalExpense = mandatoryExpense + variableExpense + periodicExpense
    const expenseRatio = parsedSalary > 0 ? totalExpense / parsedSalary : 0

    const getStatus = () => {
        if (expenseRatio <= HEALTHY_LIMIT) return "healthy"
        if (expenseRatio <= 0.8) return "warning"
        return "danger"
    }

    const status = getStatus()

    const handleCalculate = () => {
        if (parsedSalary > 0) {
            setShowResult(true)
        }
    }

    useEffect(() => {
        document.title = `Finance Simulation App - ${title}`
    }, [title])

    return (
        <div className="min-h-screen bg-linear-to-br from-amber-50/30 via-yellow-50/50 to-orange-50/40 py-12 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="mb-6">
                    <BreadcrumbHeader pathName="Pengeluaran Bulanan" textColor="text-amber-600" />
                </div>

                <div className="text-center mb-12 space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                        Kalkulator Pengeluaran Bulanan
                    </h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Simulasikan estimasi pengeluaran bulanan Anda berdasarkan gaji dan jumlah
                        tanggungan untuk membantu perencanaan keuangan yang lebih sehat.
                    </p>
                </div>

                <Card className="mb-8 border-2 border-amber-200/60 bg-linear-to-br from-white to-amber-50/30 shadow-lg">
                    <CardContent className="p-6 flex gap-3">
                        <div className="bg-amber-400 p-2 rounded-lg shadow-md">
                            <Info className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h3 className="font-semibold mb-2 text-amber-900">Informasi Pengeluaran Ideal</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Pengeluaran bulanan yang sehat idealnya tidak melebihi 60% dari gaji.
                                Jumlah tanggungan sangat memengaruhi besarnya kebutuhan dasar.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="mb-8 border-2 border-amber-200/60 shadow-2xl bg-linear-to-br from-white to-amber-50/30">
                    <CardContent className="p-8 space-y-6">
                        <div>
                            <label className="block text-sm font-semibold mb-3 text-amber-900">
                                Gaji Bulanan (Rupiah)
                            </label>
                            <input
                                type="text"
                                value={salary}
                                onChange={(e) => {
                                    setSalary(e.target.value.replace(/[^0-9]/g, ""))
                                    setShowResult(false)
                                }}
                                placeholder="0"
                                className="w-full px-4 py-4 text-lg border-2 border-amber-200/60 rounded-xl focus:border-amber-400 focus:ring-4 focus:ring-amber-100"
                            />
                            {salary && (
                                <p className="text-sm font-medium text-amber-600 mt-2">
                                    {FormatRupiah(parsedSalary)}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-semibold mb-3 text-amber-900">
                                Jumlah Tanggungan
                            </label>
                            <input
                                type="number"
                                min={0}
                                value={dependents}
                                onChange={(e) => {
                                    setDependents(e.target.value)
                                    setShowResult(false)
                                }}
                                placeholder="0"
                                className="w-full px-4 py-4 text-lg border-2 border-amber-200/60 rounded-xl focus:border-amber-400 focus:ring-4 focus:ring-amber-100"
                            />
                        </div>

                        {salary && (
                            <div
                                className={`p-4 rounded-xl border-2 shadow-md ${status === "healthy"
                                    ? "bg-green-50 border-green-400"
                                    : status === "warning"
                                        ? "bg-yellow-100 border-yellow-400"
                                        : "bg-red-100 border-red-400"
                                    }`}
                            >
                                <div className="flex items-center gap-2">
                                    {status === "healthy" && (
                                        <CheckCircle2 className="text-green-600" />
                                    )}
                                    {status === "warning" && (
                                        <AlertCircle className="text-yellow-600" />
                                    )}
                                    {status === "danger" && (
                                        <XCircle className="text-red-600" />
                                    )}
                                    <span className="font-semibold text-sm">
                                        {status === "healthy"
                                            ? "Pengeluaran masih dalam batas sehat"
                                            : status === "warning"
                                                ? "Pengeluaran perlu diwaspadai"
                                                : "Pengeluaran melebihi batas sehat"}
                                    </span>
                                </div>
                            </div>
                        )}

                        <Button
                            onClick={handleCalculate}
                            disabled={!salary || parsedSalary === 0}
                            className="w-full py-6 text-lg font-bold rounded-xl shadow-xl bg-amber-400 hover:bg-amber-500 text-white"
                        >
                            Hitung Pengeluaran
                        </Button>
                    </CardContent>
                </Card>

                {showResult && (
                    <Card className="border-2 border-amber-300/60 shadow-2xl bg-linear-to-br from-white to-amber-50/40 animate-in fade-in slide-in-from-bottom-4">
                        <CardContent className="p-8 space-y-6">
                            <div className="text-center">
                                <p className="text-sm text-muted-foreground mb-2">
                                    Total Estimasi Pengeluaran Bulanan
                                </p>
                                <p className="text-4xl md:text-6xl font-bold text-amber-500">
                                    {FormatRupiah(totalExpense)}
                                </p>
                            </div>

                            <div className="space-y-4 mt-8">
                                <h3 className="text-lg font-bold text-amber-900 mb-4">Rincian Pengeluaran</h3>

                                <div className="bg-white p-5 rounded-xl border-2 border-amber-200/50 shadow-md">
                                    <div className="flex items-start gap-3 mb-3">
                                        <div className="bg-amber-400 p-2 rounded-lg">
                                            <Home className="w-5 h-5 text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-center mb-1">
                                                <h4 className="font-bold text-amber-900">Pengeluaran Wajib</h4>
                                                <span className="font-bold text-amber-600">
                                                    {FormatRupiah(mandatoryExpense)}
                                                </span>
                                            </div>
                                            <p className="text-xs text-gray-600">
                                                Kebutuhan pokok: sewa/cicilan rumah, listrik, air, gas, transportasi rutin
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white p-5 rounded-xl border-2 border-amber-200/50 shadow-md">
                                    <div className="flex items-start gap-3 mb-3">
                                        <div className="bg-amber-500 p-2 rounded-lg">
                                            <ShoppingCart className="w-5 h-5 text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-center mb-1">
                                                <h4 className="font-bold text-amber-900">Pengeluaran Variabel</h4>
                                                <span className="font-bold text-amber-600">
                                                    {FormatRupiah(variableExpense)}
                                                </span>
                                            </div>
                                            <p className="text-xs text-gray-600">
                                                Kebutuhan sehari-hari: belanja bulanan, makan, komunikasi, hiburan
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white p-5 rounded-xl border-2 border-amber-200/50 shadow-md">
                                    <div className="flex items-start gap-3 mb-3">
                                        <div className="bg-orange-400 p-2 rounded-lg">
                                            <Calendar className="w-5 h-5 text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-center mb-1">
                                                <h4 className="font-bold text-amber-900">Pengeluaran Berkala</h4>
                                                <span className="font-bold text-orange-500">
                                                    {FormatRupiah(periodicExpense)}
                                                </span>
                                            </div>
                                            <p className="text-xs text-gray-600">
                                                Kebutuhan tidak rutin: pendidikan, kesehatan, perawatan, asuransi
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3 mt-6">
                                <div className="flex justify-between p-4 bg-amber-50/60 rounded-lg border border-amber-100">
                                    <span className="font-semibold">Gaji Bulanan</span>
                                    <span className="font-bold text-amber-600">
                                        {FormatRupiah(parsedSalary)}
                                    </span>
                                </div>
                                <div className="flex justify-between p-4 bg-amber-50/60 rounded-lg border border-amber-100">
                                    <span className="font-semibold">Total Orang</span>
                                    <span className="font-bold text-amber-600">{totalPeople} orang</span>
                                </div>
                                <div className="flex justify-between p-4 bg-amber-50/60 rounded-lg border border-amber-100">
                                    <span className="font-semibold">Pengeluaran / Gaji</span>
                                    <span className="font-bold text-amber-600">
                                        {(expenseRatio * 100).toFixed(1)}%
                                    </span>
                                </div>
                                <div className="flex justify-between p-4 bg-amber-50/60 rounded-lg border border-amber-100">
                                    <span className="font-semibold">Sisa untuk Tabungan</span>
                                    <span className={`font-bold ${parsedSalary - totalExpense >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                        {FormatRupiah(parsedSalary - totalExpense)}
                                    </span>
                                </div>
                            </div>

                            <div className="bg-amber-50/50 p-5 rounded-xl border-2 border-amber-200/60">
                                <p className="text-sm text-center font-medium text-amber-900">
                                    {status === "healthy" &&
                                        "✓ Keuangan Anda berada dalam kondisi sehat. Pertahankan pola ini dan tingkatkan tabungan."}
                                    {status === "warning" &&
                                        "⚠ Pengeluaran mendekati batas aman. Pertimbangkan penghematan atau tambahan penghasilan."}
                                    {status === "danger" &&
                                        "✕ Pengeluaran melebihi batas sehat. Perlu penyesuaian segera pada pengeluaran atau penghasilan."}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                )}

                <div className="mt-8 text-center text-sm text-gray-600">
                    Perhitungan ini bersifat estimasi dan dapat berbeda tergantung kondisi keluarga
                    dan wilayah tempat tinggal.
                </div>

                <BackToHome bgColor="bg-amber-400 hover:bg-amber-500" />
            </div>
        </div>
    )
}