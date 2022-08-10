import styled from 'styled-components';
import { Schedule } from '../../interfaces/types';
import { convert24hourTo12HourFormat } from '../../utils/util';

interface Props {
  schedule: Schedule;
  onDeleteClick: (id: number) => void;
}

export default function ScheduleCard({ schedule, onDeleteClick }: Props) {
  return (
    <Container>
      <Time>{convert24hourTo12HourFormat(schedule.startTime)} - </Time>
      <DeleteButton onClick={() => onDeleteClick(schedule.id)}>X</DeleteButton>
      <Time>{convert24hourTo12HourFormat(schedule.endTime)}</Time>
    </Container>
  );
}

const Container = styled.div`
  color: black;
  background-color: gray;
`;

const Time = styled.div``;

const DeleteButton = styled.button``;
