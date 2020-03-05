import {Data} from "./Data";

export interface Props {
  nodes: Data,
  onImgClick?: Function
  onLinkClick?: Function,
  latexApi?: string,
  yumlApi?: string
}
