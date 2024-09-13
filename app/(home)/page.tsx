import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import BookingItem from "../_components/bokking-item";
import Header from "../_components/header";
import Search from "./_components/search";

export default function Home() {
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
    </div>
  );
}
