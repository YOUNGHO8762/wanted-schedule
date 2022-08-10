import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { SCHEDULES_API } from '../../constant/constants';
import { Days, Schedule } from '../../interfaces/types';
import { compareStartTime } from '../../utils/util';
import ScheduleCard from './ScheduleCard';

interface Props {
  day: Days;
}

export default function DailySchedule({ day }: Props) {
  const [schedules, setSchedules] = useState<Schedule[]>([]);

  const getSchedules = () => {
    fetch(`${SCHEDULES_API}?day=${day}`)
      .then((response) => response.json())
      .then((json) => {
        const sortedClasses = json.sort(compareStartTime);
        setSchedules(sortedClasses);
      });
  };

  useEffect(() => {
    getSchedules();
  }, []);

  const handleDeleteClick = (id: number) => {
    if (confirm('정말로 삭제하시겠습니까?')) {
      fetch(`${SCHEDULES_API}/${id}`, {
        method: 'DELETE',
      }).then((response) => {
        getSchedules();
        console.log(response);
      });
    }
  };

  return (
    <Container>
      <Day>{day}</Day>
      {schedules.map((schedule: Schedule) => (
        <ScheduleCard key={schedule.id} schedule={schedule} onDeleteClick={handleDeleteClick} />
      ))}
    </Container>
  );
}

const Container = styled.li`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Day = styled.div``;
