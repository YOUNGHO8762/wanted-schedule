import styled from 'styled-components';

interface Props {
  children: string;
}

export default function Title({ children }: Props) {
  return <H1>{children}</H1>;
}

const H1 = styled.h1`
  font-size: 2rem;
  margin: 2rem 0;
`;
