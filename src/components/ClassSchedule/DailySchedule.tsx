import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { SCHEDULES_API } from '../../constant/constants';
import { Days, Class } from '../../interfaces/types';
import { compareStartTime } from '../../utils/util';
import ClassCard from './ClassCard';

interface Props {
  day: Days;
}

export default function DailySchedule({ day }: Props) {
  const [classes, setClasses] = useState<Class[]>([]);

  const getSchedules = () => {
    fetch(`${SCHEDULES_API}?day=${day}`)
      .then((response) => response.json())
      .then((json) => {
        const sortedClasses = json.sort(compareStartTime);
        setClasses(sortedClasses);
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
      {classes.map((classData: Class) => (
        <ClassCard key={classData.id} classData={classData} onDeleteClick={handleDeleteClick} />
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
