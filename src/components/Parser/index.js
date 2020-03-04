import md from '../parse/markdown/index'
import parse from '../parse/index'

export default function (str, type, option) {
  option = option || {};
  let result;
  switch (type) {
    case 'markdown': {
      result = parse(md(str), option)
      break
    }
    case 'html': {
      result = parse(str, option)
      break
    }
    default: {
      throw new Error('Invalid type, only markdown and html are supported')
    }
  }
  return result
}
