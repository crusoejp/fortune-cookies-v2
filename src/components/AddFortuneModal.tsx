import {
  Box,
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import { useState } from "react";

interface Props {
  getFortunes: () => void;
}

const AddFortuneModal = ({ getFortunes }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newFortune, setNewFortune] = useState<string>("");
  const [newLuckyNumbers, setNewLuckyNumbers] = useState<string>("");
  const [newLearnChinese, setNewLearnChinese] = useState<string>("");

  const addFortune = async () => {
    // CREATE
    await fetch("https://6608ab89a2a5dd477b14acb4.mockapi.io/fortune", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fortune: newFortune,
        lucky_numbers: newLuckyNumbers,
        learn_chinese: newLearnChinese,
      }),
    }).then(() => {
      setIsOpen(false);
      getFortunes();
    });
  };

  return (
    <Box>
      <Button
        color="red"
        bgColor="white"
        border="1px solid red"
        _hover={{ bgColor: "red", color: "white" }}
        onClick={() => setIsOpen(true)}
        mb="20px"
      >
        Add Fortune
      </Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexDir="column" gap="10px" pt="35px">
              <Input
                onChange={(e) => setNewFortune(e.target.value)}
                placeholder="Fortune"
              />
              <Input
                onChange={(e) => setNewLuckyNumbers(e.target.value)}
                placeholder="Lucky Numbers"
              />
              <Input
                onChange={(e) => setNewLearnChinese(e.target.value)}
                placeholder="Learn Chinese"
              />
              <Button onClick={addFortune}>Submit</Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default AddFortuneModal;
