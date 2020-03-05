import {Data} from "./Data"

export interface Props {
  content: string,
  type: 'markdown' | 'html',
  onImgClick?: Function
  onLinkClick?: Function,
  latexApi?: string,
  yumlApi?: string,
  theme?: 'dark' | 'light'
}

export interface State {
  nodes: Data
}
