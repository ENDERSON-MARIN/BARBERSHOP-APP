import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";



const BookingItem = () => {
    return (

        <Card>
            <CardContent className="p-5">
                <div>
                    <Badge className="bg-[#221c3d] text-primary hover:bg-[#221c3d]">Confirmado</Badge>
                    <h2 className="font-bold">Corte de Cabelo</h2>
                    <Avatar>
                        <AvatarImage/>
                    </Avatar>
                </div>
            </CardContent>
        </Card>
    );
}

export default BookingItem;