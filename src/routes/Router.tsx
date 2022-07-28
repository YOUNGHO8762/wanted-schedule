import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import ClassSchedule from '../pages/ClassSchedule';
import AddClassSchedule from '../pages/AddClassSchedule';

export default function Router() {
  return (
    <BrowserRouter>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<ClassSchedule />} />
        <Route path="/addClassSchedule" element={<AddClassSchedule />} />
      </Routes>
    </BrowserRouter>
  );
}
