export function trim(str, isglobal) {
  let result
  result = str.replace(/(^\s+)|(\s+$)/g, '')
  if (isglobal && isglobal.toLowerCase() === 'g') {
    result = result.replace(/\s/g, '')
  }
  return result
}

export function styleToObj(style) {
  if (!style || style === '') {
    return {}
  }
  let Arr = style.split(';')
  Arr = Arr.filter(item => {
    return item !== ''
  })
  let str = ''
  Arr.forEach(item => {
    let test = ''
    trim(item).split(':').forEach(item2 => {
      test += '"' + trim(item2) + '":'
    })
    str += test + ','
  })
  str = str.replace(/:,/g, ',')
  str = str.substring(0, str.lastIndexOf(','))
  str = '{' + str + '}'
  return JSON.parse(str)
}
