import styled from 'styled-components';
import { DAYS } from '../../constant/constants';
import { Days } from '../../interfaces/types';
import DailySchedule from './DailySchedule';

export default function Scheduler() {
  return (
    <Container>
      {DAYS.map((day: Days, index) => (
        <DailySchedule key={index} day={day} />
      ))}
    </Container>
  );
}

const Container = styled.ul`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  justify-content: center;
  background-color: white;
`;
