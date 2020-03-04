import {Data} from "../data"

export interface Props {
  content: string,
  type: 'markdown' | 'html'
}

export interface State {
  nodes: Data
}
