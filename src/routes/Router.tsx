import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from '../pages/Main';
import AddClassSchedule from '../pages/AddClassSchedule';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/addClassSchedule" element={<AddClassSchedule />} />
      </Routes>
    </BrowserRouter>
  );
}
