import { MenuIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

const Header = () => {
    return (

        <Card>
            <CardContent className="p-3 flex justify-between items-center flex-row">
                <Image src="/logo.png" alt="Barbershop App" width={120} height={22} />
                <Button variant="outline" size="icon" className="h-8 w-8">
                    <MenuIcon  size={18} />
                </Button>
            </CardContent>
        </Card>

    );
}

export default Header;