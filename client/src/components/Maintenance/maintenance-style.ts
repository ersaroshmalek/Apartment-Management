import styled from 'styled-components';

export const Header = styled.div`
  font-size: 3em;
  text-align: center;
  color: ${(props) => (props.color ? props.color : '#0f62fe')};
  padding-bottom: 20px;
`;
