import styled from 'styled-components';

interface Props {
  children: string;
  onClick: () => void;
}

export default function ClickButton({ children, onClick }: Props) {
  return <Button onClick={() => onClick()}>{children}</Button>;
}

const Button = styled.button`
  padding: 0.6rem;
  color: white;
  border-radius: 10px;
  background-color: #466af0;
  border: none;
  cursor: pointer;
`;
