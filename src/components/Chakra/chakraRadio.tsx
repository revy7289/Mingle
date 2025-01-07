import { HStack } from "@chakra-ui/react";
import { Radio, RadioGroup } from "@/components/ui/radio";

export default function ChakraRadio() {
  return (
    <RadioGroup defaultValue="1">
      <HStack gap="6">
        <Radio value="1">Radio 1</Radio>
        <Radio value="2">Radio 2</Radio>
        {/* <Radio value="3">Option 3</Radio> */}
      </HStack>
    </RadioGroup>
  );
}
