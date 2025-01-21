import { HStack } from "@chakra-ui/react";
import { Status } from "@/components/ui/status";

export default function ChakraBadge() {
  return (
    <HStack gap="6">
      {/* <Status value="error">Error</Status> */}
      {/* <Status value="info">Info</Status> */}
      <Status value="warning">Warning</Status>
      {/* <Status value="success">Success</Status> */}
    </HStack>
  );
}
