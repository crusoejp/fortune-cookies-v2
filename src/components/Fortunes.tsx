import { Box, Text } from "@chakra-ui/react";
import { useState } from "react";
import { Fortune as FortuneType } from "./utils";
import FortuneModal from "./FortuneModal";

interface Props {
  fortune: FortuneType;
  getFortunes: () => void;
}
const Fortune = ({ fortune, getFortunes }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Box
      bgColor="white"
      color="red"
      boxShadow="md"
      width="250px"
      height="45px"
      cursor="pointer"
      onClick={() => setOpen(true)}
      p="10px"
    >
      <Text>{fortune.fortune}</Text>
      <FortuneModal
        fortune={fortune}
        open={open}
        setOpen={setOpen}
        getFortunes={getFortunes}
      />
    </Box>
  );
};

export default Fortune;
