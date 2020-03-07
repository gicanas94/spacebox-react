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

const float = translateY => keyframes`
  0% {
    box-shadow: 0 5px 15px 0px rgba(0, 0, 0, 0.6);
    transform: translateY(${translateY[0]});
  }

  50% {
    box-shadow: 0 25px 15px 0px rgba(0, 0, 0, 0.2);
    transform: translateY(${translateY[1]});
  }

  100% {
    box-shadow: 0 5px 15px 0px rgba(0, 0, 0, 0.6);
    transform: translateY(${translateY[0]});
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

export default { beat, float, gradient };
