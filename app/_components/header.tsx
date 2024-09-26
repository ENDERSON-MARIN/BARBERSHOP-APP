"use client";

import { MenuIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import SideMenu from "./site-menu";
import Link from "next/link";

const Header = () => {
  return (
    <header>
      <Card>
        <CardContent className="p-3 flex justify-between items-center flex-row">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Barbershop App"
              width={120}
              height={22}
            />
          </Link>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <MenuIcon size={18} />
              </Button>
            </SheetTrigger>
            <SheetContent className="p-0">
              <SideMenu />
            </SheetContent>
          </Sheet>
        </CardContent>
      </Card>
    </header>
  );
};

export default Header;
