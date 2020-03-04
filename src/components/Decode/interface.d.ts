import {Data} from '../data'

export interface Props {
  nodes: Data,
  onImgClick?: Function
  onLinkClick?: Function,
  latexApi?: string,
  yumlApi?: string
}
