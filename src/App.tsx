import Dashboard from './pages/Dashboard';
import { useUtils } from './context/utilsContext/useUtils';
import { Theme } from "@radix-ui/themes";
import NavBar from './components/Navbar/Navbar';
import { Routes, Route } from 'react-router-dom';


export default function MyApp() {
  const { theme } = useUtils();
	return (
    <Theme appearance={theme}>
      <NavBar />
      <Routes>
        <Route path='/' element={<Dashboard />} />
      </Routes>
    </Theme>
  );
}