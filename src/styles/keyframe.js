import { keyframes } from 'styled-components';

const beat = scale => keyframes`
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(${scale});
  }
  40% {
    transform: scale(1);
  }
  60% {
    transform: scale(${scale});
  }
  100% {
    transform: scale(1);
  }
`;

export default { beat };
