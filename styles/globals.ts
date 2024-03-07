import styled, {css} from '@emotion/native';

export const Button = styled.TouchableOpacity`
  :background-color: #1e1e1e;
  padding: 10px;
  border-radius: 5px;
  margin: 10px;
  width: fit-content;
  max-width: 100px;
`;

export const Wrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
