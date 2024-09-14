import { Button } from "@/app/_components/ui/button";
import { db } from "@/app/_lib/prisma";
import { ChevronLeftIcon, MenuIcon } from "lucide-react";
import Image from "next/image";

interface BarbershopDetailsPageProps {
  params: {
    id?: string;
  };
}

const BarbershopDetailsPage = async ({
  params,
}: BarbershopDetailsPageProps) => {
  if (!params.id) {
    // TODO: Redireccionar para home page
    return null;
  }

  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!barbershop) {
    // TODO: Redireccionar para home page
    return null;
  }

  return (
    <div className="">
      <div className="w-full relative h-[250px]">
        <Button
          size="icon"
          variant="outline"
          className="absolute z-50 top-4 left-4"
        >
          <ChevronLeftIcon />
        </Button>
        <Button
          size="icon"
          variant="outline"
          className="absolute z-50 top-4 right-4"
        >
          <MenuIcon />
        </Button>
        <Image
          src={barbershop.imageUrl}
          fill
          alt={barbershop.name}
          style={{ objectFit: "cover" }}
          className="opacity-75"
        />
      </div>
    </div>
  );
};

export default BarbershopDetailsPage;
