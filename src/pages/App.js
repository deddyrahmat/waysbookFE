//Components
import { AppContextProvider, Routes } from '../configs';

function App() {
  return (
    <AppContextProvider>
      <Routes />
    </AppContextProvider>
  );
}

export default App;
