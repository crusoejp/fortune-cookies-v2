import { Box, Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Fortune from "./Fortunes";
import { Fortune as FortuneType } from "./utils";
import AddFortuneModal from "./AddFortuneModal";

const FortunesContainer = () => {
  const [fortunes, setFortunes] = useState<FortuneType[]>([]);

  const getFortunes = async () => {
    // READ
    await fetch("https://6608ab89a2a5dd477b14acb4.mockapi.io/fortune").then(
      (response) => {
        response.json().then((data) => {
          setFortunes(data);
        });
      }
    );
  };

  useEffect(() => {
    if (fortunes.length === 0) {
      getFortunes();
    }
  }, [fortunes]);

  return (
    <Box w="80%" m="0 auto" pt="20px" pb="50px" minH="100vh">
      <Text fontSize="36px" mb="20px">
        Fortune Cookies v2
      </Text>
      <AddFortuneModal getFortunes={getFortunes} />
      <Flex wrap="wrap" gap="15px" m="0 auto" justifyContent="center">
        {fortunes.map((fortune) => (
          <Fortune
            key={fortune.id}
            fortune={fortune}
            getFortunes={getFortunes}
          />
        ))}
      </Flex>
    </Box>
  );
};

export default FortunesContainer;
