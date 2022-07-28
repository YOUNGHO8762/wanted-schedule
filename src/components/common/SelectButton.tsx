import styled from 'styled-components';

interface Props {
  children: string;
  onClick: () => void;
  isSelected: boolean;
}

export default function SelectButton({ children, onClick, isSelected }: Props) {
  return (
    <Button isSelected={isSelected} onClick={() => onClick()}>
      {children}
    </Button>
  );
}

const Button = styled.button<{ isSelected: boolean }>`
  padding: 0.6rem;
  color: ${(props) => (props.isSelected ? 'white' : 'black')};
  border-radius: 10px;
  background-color: ${(props) => (props.isSelected ? 'gray' : 'white')};
  cursor: pointer;
`;
