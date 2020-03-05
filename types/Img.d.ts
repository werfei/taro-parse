import {BaseProps} from "./BaseProps"

export interface Props extends BaseProps {
  onImgClick?: Function
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
