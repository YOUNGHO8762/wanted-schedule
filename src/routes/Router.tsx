import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import Schedule from '../pages/Schedule';
import AddSchedule from '../pages/AddSchedule';

export default function Router() {
  return (
    <BrowserRouter>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Schedule />} />
        <Route path="/addClassSchedule" element={<AddSchedule />} />
      </Routes>
    </BrowserRouter>
  );
}
