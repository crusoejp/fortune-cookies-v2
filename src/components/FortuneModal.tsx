import {
  Box,
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { Fortune } from "./utils";
import { get } from "http";
import { useState } from "react";

interface ModalProps {
  fortune: Fortune;
  open: boolean;
  setOpen: (open: boolean) => void;
  getFortunes: () => void;
}

const FortuneModal = ({ fortune, open, setOpen, getFortunes }: ModalProps) => {
  const [editing, setEditing] = useState<boolean>(false);
  const [newFortune, setNewFortune] = useState<string>(fortune.fortune);
  const [newLuckyNumbers, setNewLuckyNumbers] = useState<string>(
    fortune.lucky_numbers
  );
  const [newLearnChinese, setNewLearnChinese] = useState<string>(
    fortune.learn_chinese
  );

  const deleteFortune = async () => {
    // DELETE
    await fetch(
      `https://6608ab89a2a5dd477b14acb4.mockapi.io/fortune/${fortune.id}`,
      {
        method: "DELETE",
      }
    ).then(() => {
      setOpen(false);
      getFortunes();
    });
  };

  const handleSubmit = async () => {
    // UPDATE
    await fetch(
      `https://6608ab89a2a5dd477b14acb4.mockapi.io/fortune/${fortune.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fortune: newFortune,
          lucky_numbers: newLuckyNumbers,
          learn_chinese: newLearnChinese,
        }),
      }
    ).then(() => {
      setEditing(false);
      setOpen(false);
      getFortunes();
    });
  };

  return (
    <Modal isOpen={open} onClose={() => setOpen(false)}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <Box pt="35px">
            {!editing ? (
              <Box>
                <Text>{fortune.fortune}</Text>
                <Text>{fortune.lucky_numbers}</Text>
                <Text>{fortune.learn_chinese}</Text>
              </Box>
            ) : (
              <Flex flexDir="column" gap="10px">
                <Input
                  onChange={(e) => setNewFortune(e.target.value)}
                  defaultValue={fortune.fortune}
                />
                <Input
                  onChange={(e) => setNewLuckyNumbers(e.target.value)}
                  defaultValue={fortune.lucky_numbers}
                />
                <Input
                  onChange={(e) => setNewLearnChinese(e.target.value)}
                  defaultValue={fortune.learn_chinese}
                />
              </Flex>
            )}
            <Flex justifyContent="space-between" mt="10px">
              {editing ? (
                <Button onClick={() => handleSubmit()}>Submit</Button>
              ) : (
                <Button onClick={() => setEditing(true)}>Edit</Button>
              )}
              <Button onClick={deleteFortune}>Delete</Button>
            </Flex>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default FortuneModal;
