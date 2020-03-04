export interface Data {
  attr: {
    value: string,
    class: string,
    type: string,
    width: string,
    height: string,
    style: string,
    name: string,
    author: string,
    src: string,
    poster?: string,
    mode?: 'scaleToFill' | 'aspectFit' | 'aspectFill' | 'widthFix' | 'top' |
      'bottom' | 'center' | 'left' | 'right' | 'top left' | 'top right' |
      'bottom left' | 'bottom right',
    href: string
  },
  tag: string,
  text?: string,
  child: (Data)[],
  theme: string
}
