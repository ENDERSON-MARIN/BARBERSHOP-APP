import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import BookingItem from "../_components/bokking-item";
import Header from "../_components/header";
import Search from "./_components/search";
import { db } from "../_lib/prisma";
import BarbershopItem from "./_components/barbershop-item";
import Footer from "../_components/footer";

export default async function Home() {
  /* LLAMAR A PRISMA Y OBTENER BARBERIAS */
  const barbershop = await db.barbershop.findMany({});

  return (
    <div className="">
      <Header></Header>

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

      <div className="px-5 mt-6">
        <h2 className="text-xs mb-3 uppercase text-gray-400 font-bold">
          Agendamientos
        </h2>
        <BookingItem />
      </div>

      <div className="px-5 mt-6">
        <h2 className="text-xs mb-3 uppercase text-gray-400 font-bold">
          Recomendados
        </h2>
        <div className="flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {barbershop.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
      <div className="px-5 mt-6 mb-[4.5rem]">
        <h2 className="text-xs mb-3 uppercase text-gray-400 font-bold">
          Populares
        </h2>
        <div className="flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {barbershop.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
      <div className="flex text-center">
        <Footer />
      </div>
    </div>
  );
}
