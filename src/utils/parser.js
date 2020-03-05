import md from './parse/markdown'
import parse from './parse'

function initClass(val) {
  if (val.attr && val.attr.class) {
    val.attr.class = val.attr.class.split(' ').join(' ~')
  }
  if (val.child) {
    for (let i = 0; i < val.child.length; i++) {
      initClass(val.child[i])
    }
  }
}

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
  initClass(result)
  console.log(result)
  return result
}
