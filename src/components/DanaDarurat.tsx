import { useEffect, useState } from "react";
import { BreadcrumbHeader } from "./layout/BreadcrumbHeader";
import BackToHome from "./layout/BackToHome";

type SimulasiItem = {
    bulan: number;
    danaAwal: number;
    tabungan: number;
    danaAkhir: number;
    progressMin: number;
    progressIdeal: number;
    progressMax: number;
    status: string;
    statusClass: string;
    isMilestone: boolean;
};

type WaktuSimulasi = {
    bulanMin: number;
    bulanIdeal: number;
    bulanMax: number;
    tanggalMin: Date | null;
    tanggalIdeal: Date | null;
    tanggalMax: Date | null;
};

type Recommendations = {
    minimum: number;
    ideal: number;
    maksimal: number;
    baseMin: number;
    baseIdeal: number;
    baseMax: number;
};

type Progress = {
    persentase: number;
    status: string;
    statusColor: string;
    danaSaatIni: number;
};

type Hasil = {
    recommendations: Recommendations;
    progress: Progress;
    waktuSimulasi: WaktuSimulasi | null;
    simulasiBulanan: SimulasiItem[];
    jenisKerja: string;
    pengeluaranBulanan: number;
    jumlahTanggungan: number;
};

export default function DanaDarurat({ title }: { title: string }) {
    const [pengeluaranBulanan, setPengeluaranBulanan] = useState(0);
    const [jumlahTanggungan, setJumlahTanggungan] = useState(0);
    const [jenisKerja, setJenisKerja] = useState('tetap');
    const [danaSaatIni, setDanaSaatIni] = useState(0);
    const [tabunganBulanan, setTabunganBulanan] = useState(0);
    const [hasil, setHasil] = useState<Hasil | null>(null);

    const formatRupiah = (angka: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(angka);
    };

    const formatTanggal = (date: Date | null) => {
        if (!date) return '';
        return new Intl.DateTimeFormat('id-ID', {
            year: 'numeric',
            month: 'long'
        }).format(date);
    };

    const hitungDanadarurat = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (pengeluaranBulanan <= 0) {
            alert('Mohon isi pengeluaran bulanan dengan nilai yang valid!');
            return;
        }

        let baseMin, baseIdeal, baseMax;

        if (jenisKerja === 'tetap') {
            baseMin = 3;
            baseIdeal = 6;
            baseMax = 6;
        } else {
            baseMin = 6;
            baseIdeal = 9;
            baseMax = 12;
        }

        const adjustedMin = (baseMin + jumlahTanggungan) * pengeluaranBulanan;
        const adjustedIdeal = (baseIdeal + jumlahTanggungan) * pengeluaranBulanan;
        const adjustedMax = (baseMax + jumlahTanggungan) * pengeluaranBulanan;

        const progress = danaSaatIni > 0 ? (danaSaatIni / adjustedIdeal) * 100 : 0;

        let status = '';
        let statusColor = '';
        if (danaSaatIni >= adjustedIdeal) {
            status = 'Excellent! Dana darurat Anda sudah mencapai target ideal';
            statusColor = 'text-red-600';
        } else if (danaSaatIni >= adjustedMin) {
            status = 'Good! Dana darurat Anda sudah mencapai target minimum';
            statusColor = 'text-yellow-600';
        } else {
            status = 'Perlu ditingkatkan! Dana darurat Anda masih di bawah target minimum';
            statusColor = 'text-red-600';
        }

        let waktuSimulasi = null;
        const simulasiBulanan = [];

        if (tabunganBulanan > 0) {
            const sisaMin = Math.max(0, adjustedMin - danaSaatIni);
            const sisaIdeal = Math.max(0, adjustedIdeal - danaSaatIni);
            const sisaMax = Math.max(0, adjustedMax - danaSaatIni);

            const bulanMin = sisaMin > 0 ? Math.ceil(sisaMin / tabunganBulanan) : 0;
            const bulanIdeal = sisaIdeal > 0 ? Math.ceil(sisaIdeal / tabunganBulanan) : 0;
            const bulanMax = sisaMax > 0 ? Math.ceil(sisaMax / tabunganBulanan) : 0;

            const today = new Date();
            const tanggalMin = bulanMin > 0 ? new Date(today.getFullYear(), today.getMonth() + bulanMin, 1) : null;
            const tanggalIdeal = bulanIdeal > 0 ? new Date(today.getFullYear(), today.getMonth() + bulanIdeal, 1) : null;
            const tanggalMax = bulanMax > 0 ? new Date(today.getFullYear(), today.getMonth() + bulanMax, 1) : null;

            waktuSimulasi = {
                bulanMin,
                bulanIdeal,
                bulanMax,
                tanggalMin,
                tanggalIdeal,
                tanggalMax
            };

            let danaAkumulasi = danaSaatIni;
            const maxBulan = Math.min(bulanMax || 120, 120);

            for (let bulan = 1; bulan <= maxBulan; bulan++) {
                const danaAwalBulan = danaAkumulasi;
                danaAkumulasi += tabunganBulanan;
                const progressMin = (danaAkumulasi / adjustedMin) * 100;
                const progressIdeal = (danaAkumulasi / adjustedIdeal) * 100;
                const progressMax = (danaAkumulasi / adjustedMax) * 100;

                let status = '';
                let statusClass = '';
                let isMilestone = false;

                if (danaAkumulasi >= adjustedMax) {
                    if (bulan === bulanMax) {
                        status = 'Target Maksimal Tercapai! ⭐';
                        statusClass = 'bg-blue-50 border-blue-300';
                        isMilestone = true;
                    } else {
                        status = 'Maksimal Tercapai';
                        statusClass = '';
                    }
                } else if (danaAkumulasi >= adjustedIdeal) {
                    if (bulan === bulanIdeal) {
                        status = 'Target Ideal Tercapai! ✓';
                        statusClass = 'bg-red-50 border-red-300';
                        isMilestone = true;
                    } else {
                        status = 'Ideal Tercapai';
                        statusClass = '';
                    }
                } else if (danaAkumulasi >= adjustedMin) {
                    if (bulan === bulanMin) {
                        status = 'Target Minimum Tercapai!';
                        statusClass = 'bg-yellow-50 border-yellow-300';
                        isMilestone = true;
                    } else {
                        status = 'Minimum Tercapai';
                        statusClass = '';
                    }
                } else {
                    status = 'Belum Tercapai';
                    statusClass = '';
                }

                simulasiBulanan.push({
                    bulan,
                    danaAwal: danaAwalBulan,
                    tabungan: tabunganBulanan,
                    danaAkhir: danaAkumulasi,
                    progressMin: Math.min(progressMin, 100),
                    progressIdeal: Math.min(progressIdeal, 100),
                    progressMax: Math.min(progressMax, 100),
                    status,
                    statusClass,
                    isMilestone
                });

                if (danaAkumulasi >= adjustedMax) {
                    break;
                }
            }
        }

        setHasil({
            recommendations: {
                minimum: adjustedMin,
                ideal: adjustedIdeal,
                maksimal: adjustedMax,
                baseMin: baseMin + jumlahTanggungan,
                baseIdeal: baseIdeal + jumlahTanggungan,
                baseMax: baseMax + jumlahTanggungan
            },
            progress: {
                persentase: Math.min(progress, 100),
                status,
                statusColor,
                danaSaatIni
            },
            waktuSimulasi,
            simulasiBulanan,
            jenisKerja,
            pengeluaranBulanan,
            jumlahTanggungan
        });
    };

    const reset = () => {
        setPengeluaranBulanan(0);
        setJumlahTanggungan(0);
        setJenisKerja('tetap');
        setDanaSaatIni(0);
        setTabunganBulanan(0);
        setHasil(null);
    };

    useEffect(() => {
        window.document.title = `Finance Simulation App - ${title}`;
    }, [title]);

    return (
        <div className="min-h-screen bg-linear-to-br from-red-50 to-rose-100 py-12 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="mb-6">
                    <BreadcrumbHeader pathName="Dana Darurat" textColor="text-red-500" />
                </div>
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-red-500 mb-4">Dana Darurat</h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Hitung berapa dana darurat yang ideal untuk Anda berdasarkan pengeluaran bulanan, jenis pekerjaan, dan jumlah tanggungan keluarga
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Input Data</h2>

                    <form onSubmit={hitungDanadarurat} className="space-y-6">
                        <div>
                            <label htmlFor="pengeluaran-bulanan" className="block text-sm font-medium text-gray-700 mb-2">
                                Pengeluaran Bulanan (Rp) <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                id="pengeluaran-bulanan"
                                value={pengeluaranBulanan || ''}
                                onChange={(e) => setPengeluaranBulanan(Number(e.target.value))}
                                min="0"
                                step="100000"
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                                placeholder="Contoh: 5000000"
                            />
                            <p className="mt-1 text-sm text-gray-500">
                                Total pengeluaran rutin bulanan Anda (termasuk sewa, makan, transportasi, dll)
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Jenis Pekerjaan <span className="text-red-500">*</span>
                            </label>
                            <div className="space-y-3">
                                <label className="flex items-center cursor-pointer">
                                    <input
                                        type="radio"
                                        name="jenis-kerja"
                                        value="tetap"
                                        checked={jenisKerja === 'tetap'}
                                        onChange={(e) => setJenisKerja(e.target.value)}
                                        className="w-4 h-4 text-red-600 focus:ring-red-500"
                                    />
                                    <span className="ml-3">
                                        <span className="font-medium text-gray-900">Pegawai Tetap</span>
                                        <span className="block text-sm text-gray-500">Pendapatan tetap dan stabil setiap bulan</span>
                                    </span>
                                </label>
                                <label className="flex items-center cursor-pointer">
                                    <input
                                        type="radio"
                                        name="jenis-kerja"
                                        value="freelance"
                                        checked={jenisKerja === 'freelance'}
                                        onChange={(e) => setJenisKerja(e.target.value)}
                                        className="w-4 h-4 text-red-600 focus:ring-red-500"
                                    />
                                    <span className="ml-3">
                                        <span className="font-medium text-gray-900">Freelance</span>
                                        <span className="block text-sm text-gray-500">Pendapatan tidak tetap setiap bulan</span>
                                    </span>
                                </label>
                                <label className="flex items-center cursor-pointer">
                                    <input
                                        type="radio"
                                        name="jenis-kerja"
                                        value="wiraswasta"
                                        checked={jenisKerja === 'wiraswasta'}
                                        onChange={(e) => setJenisKerja(e.target.value)}
                                        className="w-4 h-4 text-red-600 focus:ring-red-500"
                                    />
                                    <span className="ml-3">
                                        <span className="font-medium text-gray-900">Wiraswasta</span>
                                        <span className="block text-sm text-gray-500">Punya usaha sendiri dengan cash flow variabel</span>
                                    </span>
                                </label>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="jumlah-tanggungan" className="block text-sm font-medium text-gray-700 mb-2">
                                Jumlah Tanggungan Keluarga <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                id="jumlah-tanggungan"
                                value={jumlahTanggungan || ''}
                                onChange={(e) => setJumlahTanggungan(Number(e.target.value))}
                                min="0"
                                max="10"
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                                placeholder="Contoh: 3"
                            />
                            <p className="mt-1 text-sm text-gray-500">
                                Jumlah anggota keluarga yang bergantung pada pendapatan Anda (pasangan, anak, orang tua)
                            </p>
                        </div>

                        <div>
                            <label htmlFor="dana-saat-ini" className="block text-sm font-medium text-gray-700 mb-2">
                                Dana Darurat Saat Ini (Rp) <span className="text-gray-400">(Opsional)</span>
                            </label>
                            <input
                                type="number"
                                id="dana-saat-ini"
                                value={danaSaatIni || ''}
                                onChange={(e) => setDanaSaatIni(Number(e.target.value))}
                                min="0"
                                step="100000"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                                placeholder="Contoh: 10000000"
                            />
                            <p className="mt-1 text-sm text-gray-500">
                                Jumlah dana darurat yang sudah Anda miliki saat ini (kosongkan jika belum ada)
                            </p>
                        </div>

                        <div>
                            <label htmlFor="tabungan-bulanan" className="block text-sm font-medium text-gray-700 mb-2">
                                Tabungan Bulanan untuk Dana Darurat (Rp) <span className="text-gray-400">(Opsional)</span>
                            </label>
                            <input
                                type="number"
                                id="tabungan-bulanan"
                                value={tabunganBulanan || ''}
                                onChange={(e) => setTabunganBulanan(Number(e.target.value))}
                                min="0"
                                step="100000"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                                placeholder="Contoh: 1000000"
                            />
                            <p className="mt-1 text-sm text-gray-500">
                                Berapa yang bisa Anda sisihkan setiap bulan? Kami akan hitung berapa lama mencapai target
                            </p>
                        </div>

                        <div className="flex gap-4">
                            <button
                                type="submit"
                                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
                            >
                                Hitung Dana Darurat
                            </button>
                            <button
                                type="button"
                                onClick={reset}
                                className="px-6 py-3 border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold rounded-lg transition-colors duration-200"
                            >
                                Reset
                            </button>
                        </div>
                    </form>
                </div>

                {hasil && (
                    <>
                        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Status Dana Darurat Anda</h2>

                            <div className="mb-6">
                                <p className={`text-lg ${hasil.progress.statusColor} font-semibold mb-2`}>
                                    {hasil.progress.status}
                                </p>
                                <p className="text-gray-600">
                                    Dana Anda saat ini: <span className="font-bold text-gray-800">{formatRupiah(hasil.progress.danaSaatIni)}</span>
                                </p>
                            </div>

                            <div className="mb-4">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-medium text-gray-700">Progress ke Target Ideal</span>
                                    <span className="text-sm font-bold text-red-600">{hasil.progress.persentase.toFixed(1)}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                                    <div
                                        className="bg-linear-to-r from-red-500 to-rose-600 h-4 rounded-full transition-all duration-500"
                                        style={{ width: `${Math.min(hasil.progress.persentase, 100)}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Rekomendasi Dana Darurat</h2>

                            <div className="grid md:grid-cols-3 gap-6">
                                <div className="bg-linear-to-br from-yellow-50 to-yellow-100 p-6 rounded-xl border-2 border-yellow-300">
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="text-lg font-bold text-gray-800">Minimum</h3>
                                        <svg className="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
                                        </svg>
                                    </div>
                                    <p className="text-3xl font-bold text-yellow-700 mb-2">
                                        {formatRupiah(hasil.recommendations.minimum)}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        {hasil.recommendations.baseMin} bulan pengeluaran
                                    </p>
                                    <p className="text-xs text-gray-500 mt-2">Target minimum untuk keamanan dasar</p>
                                </div>

                                <div className="bg-linear-to-br from-red-50 to-rose-100 p-6 rounded-xl border-2 border-red-400">
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="text-lg font-bold text-gray-800">Ideal</h3>
                                        <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                        </svg>
                                    </div>
                                    <p className="text-3xl font-bold text-red-700 mb-2">
                                        {formatRupiah(hasil.recommendations.ideal)}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        {hasil.recommendations.baseIdeal} bulan pengeluaran
                                    </p>
                                    <p className="text-xs text-gray-500 mt-2">Target yang direkomendasikan</p>
                                </div>

                                <div className="bg-linear-to-br from-blue-50 to-blue-100 p-6 rounded-xl border-2 border-blue-300">
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="text-lg font-bold text-gray-800">Maksimal</h3>
                                        <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                        </svg>
                                    </div>
                                    <p className="text-3xl font-bold text-blue-700 mb-2">
                                        {formatRupiah(hasil.recommendations.maksimal)}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        {hasil.recommendations.baseMax} bulan pengeluaran
                                    </p>
                                    <p className="text-xs text-gray-500 mt-2">Target optimal untuk perlindungan maksimal</p>
                                </div>
                            </div>

                            <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                                <p className="text-sm text-gray-700 leading-relaxed">
                                    <strong>Catatan:</strong>
                                    {hasil.jenisKerja === 'tetap' ? (
                                        ' Sebagai pegawai tetap dengan pendapatan stabil, Anda memerlukan dana darurat 3-6 bulan pengeluaran.'
                                    ) : (
                                        ` Sebagai ${hasil.jenisKerja} dengan pendapatan tidak tetap, Anda memerlukan dana darurat 6-12 bulan pengeluaran untuk perlindungan lebih baik.`
                                    )}
                                    {hasil.jumlahTanggungan > 0 && (
                                        ` Dengan ${hasil.jumlahTanggungan} tanggungan, setiap tanggungan menambah 1 bulan ke target dana darurat Anda.`
                                    )}
                                </p>
                            </div>
                        </div>

                        {hasil.waktuSimulasi && tabunganBulanan > 0 && (
                            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
                                <h2 className="text-2xl font-bold text-gray-800 mb-6">Simulasi Waktu Pencapaian</h2>

                                <p className="text-gray-600 mb-6">
                                    Dengan menabung <span className="font-bold text-red-600">{formatRupiah(tabunganBulanan)}</span> setiap bulan, berikut estimasi waktu untuk mencapai target:
                                </p>

                                <div className="space-y-4">
                                    {hasil.waktuSimulasi.bulanMin > 0 ? (
                                        <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                                            <div className="flex-1">
                                                <p className="font-semibold text-gray-800">Target Minimum</p>
                                                <p className="text-sm text-gray-600">{formatRupiah(hasil.recommendations.minimum)}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-2xl font-bold text-yellow-700">
                                                    {hasil.waktuSimulasi.bulanMin} bulan
                                                </p>
                                                <p className="text-sm text-gray-600">~{formatTanggal(hasil.waktuSimulasi.tanggalMin)}</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
                                            <div className="flex-1">
                                                <p className="font-semibold text-gray-800">Target Minimum</p>
                                                <p className="text-sm text-gray-600">{formatRupiah(hasil.recommendations.minimum)}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-lg font-bold text-red-700">✓ Tercapai!</p>
                                            </div>
                                        </div>
                                    )}

                                    {hasil.waktuSimulasi.bulanIdeal > 0 ? (
                                        <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
                                            <div className="flex-1">
                                                <p className="font-semibold text-gray-800">Target Ideal</p>
                                                <p className="text-sm text-gray-600">{formatRupiah(hasil.recommendations.ideal)}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-2xl font-bold text-red-700">
                                                    {hasil.waktuSimulasi.bulanIdeal} bulan
                                                </p>
                                                <p className="text-sm text-gray-600">~{formatTanggal(hasil.waktuSimulasi.tanggalIdeal)}</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
                                            <div className="flex-1">
                                                <p className="font-semibold text-gray-800">Target Ideal</p>
                                                <p className="text-sm text-gray-600">{formatRupiah(hasil.recommendations.ideal)}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-lg font-bold text-red-700">✓ Tercapai!</p>
                                            </div>
                                        </div>
                                    )}

                                    {hasil.waktuSimulasi.bulanMax > 0 ? (
                                        <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                                            <div className="flex-1">
                                                <p className="font-semibold text-gray-800">Target Maksimal</p>
                                                <p className="text-sm text-gray-600">{formatRupiah(hasil.recommendations.maksimal)}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-2xl font-bold text-blue-700">
                                                    {hasil.waktuSimulasi.bulanMax} bulan
                                                </p>
                                                <p className="text-sm text-gray-600">~{formatTanggal(hasil.waktuSimulasi.tanggalMax)}</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
                                            <div className="flex-1">
                                                <p className="font-semibold text-gray-800">Target Maksimal</p>
                                                <p className="text-sm text-gray-600">{formatRupiah(hasil.recommendations.maksimal)}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-lg font-bold text-red-700">✓ Tercapai!</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </>
                )}

                <div className="mt-8 bg-white p-8 rounded-2xl shadow-xl border border-red-100">
                    <h2 className="text-3xl font-bold text-red-700 mb-6">
                        Apa itu Dana Darurat?
                    </h2>

                    <div className="mb-8">
                        <h3 className="text-xl font-semibold text-gray-800 mb-3">Definisi</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Dana darurat adalah sejumlah uang yang disisihkan khusus untuk menghadapi keadaan darurat atau kejadian tak terduga seperti kehilangan pekerjaan, sakit mendadak, kecelakaan, atau kerusakan kendaraan/rumah yang memerlukan perbaikan segera.
                        </p>
                    </div>

                    <div className="mb-8">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Mengapa Penting?</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                                <span className="text-red-600 font-bold text-xl">•</span>
                                <span className="text-gray-600">Melindungi dari krisis finansial saat kehilangan pendapatan</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-red-600 font-bold text-xl">•</span>
                                <span className="text-gray-600">Menghindari utang berbunga tinggi (kartu kredit, pinjaman online)</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-red-600 font-bold text-xl">•</span>
                                <span className="text-gray-600">Memberikan ketenangan pikiran dan mengurangi stress finansial</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-red-600 font-bold text-xl">•</span>
                                <span className="text-gray-600">Melindungi investasi jangka panjang dari pencairan dini</span>
                            </li>
                        </ul>
                    </div>

                    <div className="mb-8 bg-linear-to-br from-red-50 to-rose-50 p-6 rounded-xl">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Tips Membangun Dana Darurat</h3>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <span className="bg-red-600 text-white font-bold rounded-full w-7 h-7 flex items-center justify-center shrink-0 mt-0.5">1</span>
                                <div>
                                    <span className="font-semibold text-gray-800">Prioritaskan</span>
                                    <span className="text-gray-600"> - Bangun dana darurat sebelum investasi lain</span>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="bg-red-600 text-white font-bold rounded-full w-7 h-7 flex items-center justify-center shrink-0 mt-0.5">2</span>
                                <div>
                                    <span className="font-semibold text-gray-800">Otomatis</span>
                                    <span className="text-gray-600"> - Set auto-transfer ke rekening terpisah setiap gajian</span>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="bg-red-600 text-white font-bold rounded-full w-7 h-7 flex items-center justify-center shrink-0 mt-0.5">3</span>
                                <div>
                                    <span className="font-semibold text-gray-800">Mulai kecil</span>
                                    <span className="text-gray-600"> - Tidak harus langsung penuh, mulai dengan 10-20% dari target</span>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="bg-red-600 text-white font-bold rounded-full w-7 h-7 flex items-center justify-center shrink-0 mt-0.5">4</span>
                                <div>
                                    <span className="font-semibold text-gray-800">Pisahkan</span>
                                    <span className="text-gray-600"> - Simpan di rekening terpisah agar tidak tergoda menggunakannya</span>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="bg-red-600 text-white font-bold rounded-full w-7 h-7 flex items-center justify-center shrink-0 mt-0.5">5</span>
                                <div>
                                    <span className="font-semibold text-gray-800">Review berkala</span>
                                    <span className="text-gray-600"> - Sesuaikan jumlah saat ada kenaikan pengeluaran atau tanggungan</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-lg">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            Catatan Penting
                        </h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                                <span className="text-yellow-600 font-bold text-xl">•</span>
                                <span className="text-gray-700">Simpan dana darurat di instrumen yang mudah dicairkan (likuid) seperti tabungan atau deposito jangka pendek (max 3 bulan)</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-yellow-600 font-bold text-xl">•</span>
                                <span className="text-gray-700">Jangan investasikan dana darurat di instrumen berisiko seperti saham, reksa dana saham, atau kripto</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-yellow-600 font-bold text-xl">•</span>
                                <span className="text-gray-700">Dana darurat berbeda dengan tabungan tujuan (liburan, gadget, dll) - ini khusus untuk keadaan darurat</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-yellow-600 font-bold text-xl">•</span>
                                <span className="text-gray-700">Review dan sesuaikan target saat ada perubahan kondisi (naik gaji, tambah tanggungan, pindah kerja)</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-yellow-600 font-bold text-xl">•</span>
                                <span className="text-gray-700">Hasil simulasi bersifat perkiraan dan bukan nasihat finansial profesional</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <BackToHome bgColor="bg-red-500" />
            </div>
        </div>
    );
}
