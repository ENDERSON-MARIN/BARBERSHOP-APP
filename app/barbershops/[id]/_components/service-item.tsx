/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/app/_components/ui/button";
import { Calendar } from "@/app/_components/ui/calendar";
import { Card, CardContent } from "@/app/_components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/_components/ui/sheet";
import { Barbershop, Service } from "@prisma/client";
import { ptBR } from "date-fns/locale";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useMemo, useState } from "react";
import Swal from "sweetalert2";
import { generateDayTimeList } from "../_helpers/hours";
import { format, setHours, setMinutes } from "date-fns";
import { saveBooking } from "../_actions/save-booking";
import { Loader2 } from "lucide-react";

interface ServiceItemProps {
  barbershop: Barbershop;
  service: Service;
  isAuthenticated: boolean;
}

const ServiceItem = ({
  service,
  barbershop,
  isAuthenticated,
}: ServiceItemProps) => {
  /* OBTENER SESSION DEL USUARIO LOGUEADO */
  const { data } = useSession();

  const [date, setDate] = useState<Date | undefined>(undefined);
  const [hour, setHour] = useState<string | undefined>();
  const [submitIsLoading, setSubmitIsLoading] = useState(false);

  const handleDateClick = (date: Date | undefined) => {
    setDate(date);
    setHour(undefined);
  };

  const handleHourClick = (time: string) => {
    setHour(time);
  };

  const handleBookingClick = () => {
    if (!isAuthenticated) {
      /* Para no mostrar la ventana de login con google */
      // return signIn("google");
      Swal.fire({
        title: "Para reservar deve estar logado na plataforma!",
        text: "Será redirecionado para fazer login!",
        icon: "warning",
        showCancelButton: false,
        confirmButtonColor: "Cool",
        // confirmButtonColor: "#3085d6",
        // cancelButtonColor: "#d33",
        confirmButtonText: "Ok!",
      }).then((result) => {
        if (result.isConfirmed) {
          // Swal.fire({
          //   title: "Deleted!",
          //   text: "Your file has been deleted.",
          //   icon: "success"
          // });
          return signIn();
        }
      });
    }
  };

  const handleBookingSubmit = async () => {
    setSubmitIsLoading(true);
    try {
      if (!hour || !date || !data?.user) {
        return;
      }

      // hour: 09:45

      const dateHour = Number(hour.split(":")[0]);
      const dateminutes = Number(hour.split(":")[1]);

      const newDate = setMinutes(setHours(date, dateHour), dateminutes);

      await saveBooking({
        serviceId: service.id,
        barbershopId: barbershop.id,
        date: newDate,
        userId: (data.user as any).id,
      });
      Swal.fire({
        title: "Perfeito!",
        text: "Serviço agendado com sucesso!",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
        // confirmButtonColor: "Cool",
        // confirmButtonText: "Ok!",
      });
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitIsLoading(false);
    }
  };

  /* Mostrar el listado de turnos de las barberias de 9 a las 21 con intervalos de 45 min */
  const timeList = useMemo(() => {
    return date ? generateDayTimeList(date) : [];
  }, [date]);

  // console.log("Turnos Barbearias=>", timeList);

  return (
    <Card>
      <CardContent className="p-3">
        <div className="flex gap-5 items-center">
          <div className="relative min-h-[110px] min-w-[110px] max-h[110px] max-h[110px]">
            <Image
              className="rounded-lg"
              src={service.imageUrl}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: "contain" }}
              alt={service.name}
            />
          </div>
          <div className="flex flex-col w-full">
            <h2 className="font-bold">{service.name}</h2>
            <p className="text-sm text-gray-400">{service.description}</p>
            <div className="flex items-center justify-between mt-3">
              <p className="text-primary text-sm font-bold">
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(Number(service.price))}
              </p>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="secondary" onClick={handleBookingClick}>
                    Reservar
                  </Button>
                </SheetTrigger>
                <SheetContent className="p-0">
                  <SheetHeader>
                    <SheetTitle className="px-5 py-6 border-b border-solid border-secondary">
                      Fazer Reserva
                    </SheetTitle>
                    <div className="py-6">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={handleDateClick}
                        locale={ptBR}
                        fromDate={new Date()}
                        styles={{
                          head_cell: {
                            width: "100%",
                            textTransform: "capitalize",
                          },
                          cell: {
                            width: "100%",
                          },
                          button: {
                            width: "100%",
                          },
                          nav_button_previous: {
                            width: "32px",
                            height: "32px",
                          },
                          nav_button_next: {
                            width: "32px",
                            height: "32px",
                          },
                          caption: {
                            textTransform: "capitalize",
                          },
                        }}
                      />
                    </div>
                    {/* Mostrar lista de horários apenas se alguma data estiver selecionada */}
                    {date && (
                      <div className="flex gap-3 overflow-x-auto py-6 px-5 border-t border-solid border-secondary [&::-webkit-scrollbar]:hidden">
                        {timeList.map((time) => (
                          <Button
                            onClick={() => handleHourClick(time)}
                            variant={hour === time ? "default" : "outline"}
                            className="rounded-full"
                            key={time}
                          >
                            {time}
                          </Button>
                        ))}
                      </div>
                    )}

                    <div className="py-6 px-5 border-t border-solid border-secondary">
                      <Card>
                        <CardContent className="p-3 flex flex-col gap-3">
                          <div className="flex justify-between">
                            <h2 className="font-bold">{service.name}</h2>
                            <h3 className="font-bold text-sm">
                              {" "}
                              {Intl.NumberFormat("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                              }).format(Number(service.price))}
                            </h3>
                          </div>
                          {date && (
                            <div className="flex justify-between">
                              <h3 className="text-gray-400 text-sm">Data</h3>
                              <h4 className="text-sm text-gray-400">
                                {format(date, "dd 'de' MMMM", {
                                  locale: ptBR,
                                })}
                              </h4>
                            </div>
                          )}
                          {hour && (
                            <div className="flex justify-between">
                              <h3 className="text-gray-400 text-sm">Horario</h3>
                              <h4 className="text-sm text-gray-400">{hour}</h4>
                            </div>
                          )}
                          <div className="flex justify-between">
                            <h3 className="text-gray-400 text-sm">Barbearia</h3>
                            <h4 className="text-sm text-gray-400">
                              {barbershop.name}
                            </h4>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    <SheetFooter className="px-5">
                      <Button
                        disabled={!hour || !date || submitIsLoading}
                        onClick={handleBookingSubmit}
                      >
                        {submitIsLoading && (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Confirmar Reserva
                      </Button>
                    </SheetFooter>
                  </SheetHeader>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceItem;
