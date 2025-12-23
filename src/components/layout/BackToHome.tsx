import { Link } from "react-router";
import { Button } from "../ui/button";
import { Home } from "lucide-react";

export default function BackToHome({ bgColor }: { bgColor: string }) {
    return (
        <Link to="/">
            <Button className={`${bgColor} text-white mt-8 p-5`}>
                <Home /> Kembali ke Beranda
            </Button>
        </Link>
    )
}