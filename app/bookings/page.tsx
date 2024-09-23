/* eslint-disable @typescript-eslint/no-explicit-any */
import { getServerSession } from "next-auth";
import Header from "../_components/header";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { db } from "../_lib/prisma";
import BookingItem from "../_components/booking-item";
// import { isFuture, isPast } from "date-fns";

const BookingPage = async () => {
  //recuperar la session del usuario(ver si esta logueado o no)
  const session = await getServerSession(authOptions);

  //si no se encuentra loguado redireccionar a la página de login o inicio
  if (!session?.user) {
    return redirect("/");
  }

  /* SEPARAR LOS AGENDAMIENTOS CONFIRMADOS Y FINALIZADOS MEDIANTE JS */
  // const confirmedBookings = bookings.filter((booking) =>isFuture(booking.date));
  // const finishedBookings = bookings.filter((booking) => isPast(booking.date));

  /* SEPARAR LOS AGENDAMIENTOS CONFIRMADOS Y FINALIZADOS MEDIANTE DB (MEJOR ASI PORQUE NO CONSUME MEMORIA) */
  // const confirmedBookings = await db.booking.findMany({
  //   where: {
  //     userId: (session.user as any).id,
  //     date: {
  //       gte: new Date(),
  //     },
  //   },
  //   include: {
  //     service: true,
  //     barbershop: true,
  //   },
  // });

  // const finishedBookings = await db.booking.findMany({
  //   where: {
  //     userId: (session.user as any).id,
  //     date: {
  //       lt: new Date(),
  //     },
  //   },
  //   include: {
  //     service: true,
  //     barbershop: true,
  //   },
  // });

  /* OPTIMIZO LA CONSULTA CON UN PROMISE.ALL PARA MEJOR PERFORMANCE */

  const [confirmedBookings, finishedBookings] = await Promise.all([
    db.booking.findMany({
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
    }),
    db.booking.findMany({
      where: {
        userId: (session.user as any).id,
        date: {
          lt: new Date(),
        },
      },
      include: {
        service: true,
        barbershop: true,
      },
    }),
  ]);

  return (
    <>
      <Header />
      <div className="px-5 py-6">
        <h1 className="text-xl font-bold text-center">Agendamientos</h1>

        <h2 className="font-bold text-sm text-gray-400 uppercase mt-6 mb-3">
          Confirmados
        </h2>
        <div className="flex flex-col gap-3">
          {confirmedBookings.map((booking) => (
            <BookingItem key={booking.id} booking={booking} />
          ))}
        </div>
        <h2 className="font-bold text-sm text-gray-400 uppercase mt-6 mb-3">
          Finalizados
        </h2>
        <div className="flex flex-col gap-3">
          {finishedBookings.map((booking) => (
            <BookingItem key={booking.id} booking={booking} />
          ))}
        </div>
      </div>
    </>
  );
};

export default BookingPage;
