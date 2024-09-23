/* eslint-disable @typescript-eslint/no-explicit-any */
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
// import BookingItem from "../_components/booking-item";
import Header from "../_components/header";
import Search from "./_components/search";
import { db } from "../_lib/prisma";
import BarbershopItem from "./_components/barbershop-item";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import BookingItem from "../_components/booking-item";

export default async function Home() {
  //recuperar la session del usuario(ver si esta logueado o no)
  const session = await getServerSession(authOptions);

  /* LLAMAR A PRISMA Y OBTENER BARBERIAS */
  // const barbershops = await db.barbershop.findMany({});

  // const confirmedBookings = session?.user
  //   ? await db.booking.findMany({
  //       where: {
  //         userId: (session.user as any).id,
  //         date: {
  //           gte: new Date(),
  //         },
  //       },
  //       include: {
  //         service: true,
  //         barbershop: true,
  //       },
  //     })
  //   : [];

  /* OPTIMIZO LA CONSULTA CON UN PROMISE.ALL PARA MEJOR PERFORMANCE */

  const [barbershops, confirmedBookings] = await Promise.all([
    db.barbershop.findMany({}),
    session?.user
      ? db.booking.findMany({
          where: {
            userId: (session.user as any).id,
            date: {
              gte: new Date(),
            },
          },
          include: {
            service: true,
            barbershop: true,
          },
        })
      : Promise.resolve([]),
  ]);

  return (
    <div className="">
      <Header />

      <div className="px-5 pt-5">
        <h2 className="text-xl font-bold">Olá, Enderson</h2>
        <p className="capitalize text-sm">
          {format(Date.now(), "EEEE',' dd 'de' MMMM", {
            locale: ptBR,
          })}
        </p>
      </div>

      <div className="px-5 mt-6">
        <Search />
      </div>

      <div className="mt-6">
        <h2 className="text-xs pl-5 mb-3 uppercase text-gray-400 font-bold">
          Agendamientos
        </h2>
        <div className="flex px-5 gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {confirmedBookings.map((booking) => (
            <BookingItem key={booking.id} booking={booking} />
          ))}
        </div>
      </div>

      <div className="px-5 mt-6">
        <h2 className="text-xs mb-3 uppercase text-gray-400 font-bold">
          Recomendados
        </h2>
        <div className="flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
      <div className="px-5 mt-6 mb-[4.5rem]">
        <h2 className="text-xs mb-3 uppercase text-gray-400 font-bold">
          Populares
        </h2>
        <div className="flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </div>
  );
}
