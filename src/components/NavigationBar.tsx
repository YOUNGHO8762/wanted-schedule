import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export default function AddClassSchedule() {
  const navigate = useNavigate();

  const navigateToClassSchedule = () => {
    navigate('/');
  };
  return (
    <Container>
      <Logo onClick={() => navigateToClassSchedule()}>engall</Logo>
    </Container>
  );
}

const Container = styled.nav`
  position: sticky;
  padding: 1rem;
  font-size: 1.5rem;
  font-weight: bolder;
  color: white;
  background-color: #3ad5d8;
`;

const Logo = styled.span`
  cursor: pointer;
`;
