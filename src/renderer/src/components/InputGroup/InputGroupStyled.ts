import styled from 'styled-components'

export const InputGroupContainer = styled.div`
  display: inline-flex;
  width: 100%;
  flex-direction: column;
`

export const InputGroupLabel = styled.label`
  font-family: sans-serif;
  width: 100%;
  color: #555;
`

export const InputGroupInput = styled.input`
  box-sizing: border-box;
  width: 100%;
  outline: none;
  background-color: #f2f2f2;
  height: 30px;
  border-radius: 5px;
  font-family: sans-serif;
  border: 1px solid #ddd;
  padding: 3px;
  &:disabled,
  &.disabled {
    color: #777;
    background-color: #fefefe;
    cursor: not-allowed;
  }
`

export const InputGroupTextArea = styled.textarea`
  box-sizing: border-box;
  width: 100%;
  resize: vertical;
  min-height: 100px;
  outline: none;
  background-color: #f2f2f2;
  height: 30px;
  border-radius: 5px;
  font-family: sans-serif;
  padding: 3px;
  border: 1px solid #ddd;
`

export const SwitchInputPill = styled.label`
  width: 37px;
  height: 23px;
  display: inline-flex;
  background-color: #b7b7b7;
  border-radius: 20px;
  align-items: center;
  justify-content: start;
  padding: 0 3px;

  input:not(:disabled):checked + &,
  input:not(.disabled):checked + & {
    background-color: #008d8d;

    & > div {
      color: #008d8d;
    }
  }

  input:disabled:not(:checked) + &,
  input.disabled:not(:checked) + & {
    cursor: not-allowed;
    background-color: rgba(221, 221, 221, 0.68);

    & > div {
      box-shadow: none;
      color: #9b9b9b;
    }
  }

  input:disabled:checked + &,
  input.disabled:checked + & {
    cursor: not-allowed;
    background-color: rgba(101, 140, 140, 0.66);

    & > div {
      color: rgba(101, 140, 140, 0.66);
    }
  }

  input:not(:checked) + & {
    justify-content: start;

    & > div {
      &:before {
        content: 'O';
      }
    }
  }

  input:checked + & {
    justify-content: end;

    & > div {
      &:before {
        content: 'I';
      }
    }
  }
`

export const SwitchInputKey = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 15px;
  background-color: white;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: sans-serif;
  font-size: 6pt;
  color: #666;
  &:before {
    vertical-align: middle;
  }
`
export const SwitchInputCheck = styled.input`
  display: none;
`
