
import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import { Link } from "react-router"


export default function FinanceTypeCard({
    title,
    description,
    icon: Icon,
    buttonColor,
    link,
    gradient,
}: {
    title: string
    description: string
    icon: React.ComponentType<{ className?: string }>
    link: string
    buttonColor: string
    gradient?: string
}) {
    return (
        <Link to={link} className="group block">
            <Card className="h-full border-2 border-border transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 bg-linear-to-br from-card to-primary/5 overflow-hidden relative">
                <div
                    className={`absolute top-0 right-0 w-32 h-32 opacity-10 blur-2xl transition-opacity group-hover:opacity-20 ${gradient || "bg-linear-to-br from-primary via-secondary to-accent"
                        }`}
                />
                <CardContent className="p-8 relative z-10">
                    <div className="flex flex-col h-full">
                        <div
                            className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 ${gradient || "bg-linear-to-br from-primary via-secondary to-accent"
                                }`}
                        >
                            <Icon className={`w-8 h-8 text-white`} />
                        </div>
                        <h3 className={`text-2xl font-bold text-foreground mb-3 group-hover:${gradient} transition-colors`}>
                            {title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed grow mb-6">{description}</p>
                        <div className={`flex items-center font-semibold ${buttonColor} group-hover:gap-3 gap-2 transition-all`}>
                            <span>Hitung Sekarang</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Link>
    )
}
