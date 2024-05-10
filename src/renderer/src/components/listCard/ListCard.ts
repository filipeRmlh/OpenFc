import styled from 'styled-components'

export const ListCardContainer = styled.div`
  display: flex;
  width: 100%;
  box-sizing: border-box;
  & > div:not(:first-child) {
    margin-top: 20px;
  }
`

export const ListCard = styled.div`
  display: flex;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-sizing: border-box;
`

export const ListCardFirstColumn = styled.div`
  display: flex;
  width: 100%;
  padding: 20px;
  justify-content: flex-start;
  box-sizing: border-box;
`

export const ListCardSecondColumn = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  padding: 20px;
  box-sizing: border-box;
`

export const ListCardIndicator = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 100%;

  &.disconnected{
    background-color: #ff5555;
  }

  &.connected{
    background-color: #55ff55;
  }

  &.connecting{
    background-color: #ffdd00;
  }
`
