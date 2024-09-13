import { Card, CardContent } from "@/app/_components/ui/card";

import { Barbershop } from "@prisma/client";
import Image from "next/image";

interface BarbershopItemProps {
  barbershop: Barbershop;
}

const BarbershopItem = ({ barbershop }: BarbershopItemProps) => {
  return (
    <Card>
      <CardContent className="p-0">
        <Image
          src={barbershop.imageUrl}
          alt={barbershop.name}
          height={0}
          width={0}
          sizes="100vw"
          className="h-[159px] w-full"
        />
      </CardContent>
    </Card>
  );
};

export default BarbershopItem;
