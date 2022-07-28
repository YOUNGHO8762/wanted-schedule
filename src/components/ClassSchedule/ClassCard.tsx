import styled from 'styled-components';
import { Class } from '../../interfaces/types';

interface Props {
  classData: Class;
  onDeleteClick: (id: number) => void;
}

export default function ClassCard({ classData, onDeleteClick }: Props) {
  return (
    <Container>
      <Time>{classData.startTime} - </Time>
      <DeleteButton onClick={() => onDeleteClick(classData.id)}>X</DeleteButton>
      <Time>{classData.endTime}</Time>
    </Container>
  );
}

const Container = styled.div`
  color: black;
  background-color: gray;
`;

const Time = styled.div``;

const DeleteButton = styled.button``;
