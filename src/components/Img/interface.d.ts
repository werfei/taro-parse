import {Data} from "../data"

export interface Props {
  data: Data
}

export interface State {
  attr: {
    src: string,
    className: string
  },
  size: {
    w: number,
    h: number
  }
}
