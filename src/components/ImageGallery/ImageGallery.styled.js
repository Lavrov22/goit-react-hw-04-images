import styled from 'styled-components'

export const ImagesList = styled.ul`
  display: grid;
  max-width: calc(100vw - 48px);
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-gap: 16px;
  margin-top: 0;
  margin-bottom: 0;
  padding: 0;
  list-style: none;
  margin-left: auto;
  margin-right: auto;
`

export const Idle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  font-size: 20px;
  font-weight: bold;
`

export const Pending = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  font-size: 20px;
  font-weight: bold;
  gap: 10px;
  > svg {
    animation-name: animate360;
    animation-duration: 2s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }

    @keyframes animate360 {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
}
`

export const Rejected = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  font-size: 20px;
  font-weight: bold;
`
export const Empty = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  font-size: 20px;
  font-weight: bold;
`
