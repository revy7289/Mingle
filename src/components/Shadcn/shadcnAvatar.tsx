import { AvatarFallback, AvatarImage } from "@chakra-ui/react";
import { Avatar } from "../ui/avatar";


export default function ShadcnAvatar() {
  return (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}
