import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import ClickButton from '../components/common/ClickButton';
import Scheduler from '../components/Schedule/Scheduler';
import Title from '../components/common/Title';

export default function ClassSchedule() {
  const navigate = useNavigate();

  const navigateToAddClassSchedule = () => {
    navigate('addClassSchedule');
  };

  return (
    <Container>
      <FlexSpaceBetween>
        <Title>Class schedule</Title>
        <ClickButton onClick={navigateToAddClassSchedule}>Add Class Schedule</ClickButton>
      </FlexSpaceBetween>
      <Scheduler />
    </Container>
  );
}

const Container = styled.div`
  margin: 0 1rem;
`;

const FlexSpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
