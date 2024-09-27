/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Prisma } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { format, isFuture } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import Image from "next/image";
import { Button } from "./ui/button";
import { cancelBooking } from "../_actions/cancel-booking";
import { toast } from "sonner";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import BookingInfo from "./booking-info";

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: true;
      barbershop: true;
    };
  }>;
}

const BookingItem = ({ booking }: BookingItemProps) => {
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [sheetIsOpen, setSheetIsOpen] = useState(false);

  const isBookingConfirmed = isFuture(booking.date);

  const router = useRouter();

  const handleCancelClick = async () => {
    setIsDeleteLoading(true);
    setSheetIsOpen(false);
    try {
      Swal.fire({
        title: "Deseja cancelar esta reserva?",
        text: "O processo é irreversível!",
        icon: "question",
        // timer: 3000,
        showConfirmButton: true,
        confirmButtonColor: "Cool",
        confirmButtonText: "Sim",
        showCancelButton: true,
        cancelButtonColor: "#d33",
        cancelButtonText: "Não",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await cancelBooking(booking.id);
          Swal.fire({
            title: "Cancelada!",
            text: "Reserva cancelada com sucesso!",
            icon: "success",
          });
          router.push("/bookings");
        }
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsDeleteLoading(false);
    }
  };

  return (
    <Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
      <SheetTrigger asChild>
        <Card className="min-w-full">
          <CardContent className="px-0 flex py-0">
            <div className="flex flex-col gap-2 py-5 flex-[3] pl-5">
              <Badge
                className="w-fit"
                variant={isBookingConfirmed ? "default" : "secondary"}
              >
                {isBookingConfirmed ? "Confirmado" : "Finalizado"}
              </Badge>
              <h2 className="font-bold">{booking.service.name}</h2>
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={booking.barbershop.imageUrl} />
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>
                <h3 className="text-sm">{booking.barbershop.name}</h3>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center flex-[1] border-l border-solid border-secondary px-3">
              <p className="text-sm capitalize">
                {format(booking.date, "MMMM", {
                  locale: ptBR,
                })}
              </p>
              <p className="text-2xl">{format(booking.date, "dd")}</p>
              <p className="text-sm">{format(booking.date, "hh:mm")}</p>
            </div>
          </CardContent>
        </Card>
      </SheetTrigger>
      <SheetContent className="px-0">
        <SheetHeader className="pb-6 px-5 text-center border-b border-solid border-secondary">
          <SheetTitle>Informaçoes da Reserva</SheetTitle>
        </SheetHeader>
        <div className="px-3">
          <div className="relative h-[180px] w-full mt-6">
            <Image
              src="/barbershop-map.png"
              alt={booking.barbershop.name}
              fill
            />
            <div className="absolute w-full bottom-4 left-0 px-5">
              <Card>
                <CardContent className="p-3 flex gap-2">
                  <Avatar>
                    <AvatarImage src={booking.barbershop.imageUrl} />
                  </Avatar>
                  <div className="">
                    <h2 className="font-bold">{booking.barbershop.name}</h2>
                    <h3 className="text-sm overflow-hidden text-nowrap text-ellipsis">
                      {booking.barbershop.address}
                    </h3>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Badge
            className="w-fit mt-3 my-3"
            variant={isBookingConfirmed ? "default" : "secondary"}
          >
            {isBookingConfirmed ? "Confirmado" : "Finalizado"}
          </Badge>

          <BookingInfo booking={booking} />

          <SheetFooter className="flex-row gap-3 mt-6">
            <SheetClose asChild>
              <Button className="w-full" variant="secondary">
                Voltar
              </Button>
            </SheetClose>
            <Button
              disabled={!isBookingConfirmed || isDeleteLoading}
              className="w-full"
              variant="destructive"
              onClick={handleCancelClick}
            >
              {isDeleteLoading && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Cancelar Reserva
            </Button>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default BookingItem;
