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

const gradient = () => keyframes`
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
`;

export default { beat, gradient };
