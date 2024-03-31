import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import FortunesContainer from "./components/FortunesContainer";

function App() {
  return (
    <div className="App">
      <ChakraProvider>
        <FortunesContainer />
      </ChakraProvider>
    </div>
  );
}

export default App;
