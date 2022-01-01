import styled from 'styled-components';

interface wrapperProps {
  variant?: 'small' | 'regular';
  type?: 'form' | 'table';
}

export const Wrapper = styled.div<wrapperProps>`
  max-width: ${(props) => (props.variant === 'regular' ? '800px' : '400px')};
  width: 100%;
  margin: auto;
  margin-top: ${(props) => (props.type === 'table' ? '50px' : '200px')};
`;
