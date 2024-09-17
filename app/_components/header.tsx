"use client";

import { LogInIcon, LogOutIcon, MenuIcon, UserIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarImage } from "./ui/avatar";

const Header = () => {
  const { data } = useSession();

  const handleLogoutClick = () => signOut();
  const handleLoginClick = () => signIn("google");

  return (
    <Card>
      <CardContent className="p-3 flex justify-between items-center flex-row">
        <Image src="/logo.png" alt="Barbershop App" width={120} height={22} />
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="h-8 w-8">
              <MenuIcon size={18} />
            </Button>
          </SheetTrigger>
          <SheetContent className="p-0">
            <SheetHeader className="text-left border-b border-secondary p-5">
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>

            {data?.user ? (
              <div className="flex justify-between px-5 py-6 items-center">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={data.user?.image ?? ""} />
                  </Avatar>

                  <h2 className="font-bold">{data.user.name}</h2>
                </div>

                <Button variant="secondary">
                  <LogOutIcon onClick={handleLogoutClick} />
                </Button>
              </div>
            ) : (
              <div className="flex flex-col px-5 py-">
                <div className="flex items-center gap-2 px-5 py-6">
                  <UserIcon size={32} />
                  <h2 className="font-bold">Olá, faça seu Loign</h2>
                </div>

                <Button
                  variant="secondary"
                  className="w-full"
                  onClick={handleLoginClick}
                >
                  <LogInIcon className="mr-2" />
                  Fazer Login
                </Button>
              </div>
            )}


            <div className="flex flex-col gap-3 px-5">
              
            </div>
          </SheetContent>
        </Sheet>
      </CardContent>
    </Card>
  );
};

export default Header;
