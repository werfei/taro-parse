import {BaseProps} from "../BaseProps"

export interface Props extends BaseProps {
  onImgClick?: Function,
  api?: string
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
