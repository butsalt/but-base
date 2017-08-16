const parser = new DOMParser()

const svgTags = 'animate|circle|clippath|cursor|defs|desc|ellipse|filter|font-face|' +
  'foreignObject|g|glyph|image|line|marker|mask|missing-glyph|path|pattern|' +
  'polygon|polyline|rect|switch|symbol|text|textpath|tspan|use|view'
const svgTagReg = new RegExp('^<(' + svgTags + ')(\\s|>)')
function isSvgTag(str) {
  return svgTagReg.test(str)
}

export default function parse(str) {
  const needSvgWrapper = isSvgTag(str)
  if (needSvgWrapper) {
    // svg元素先用svg包裹，然后再取出
    str = '<svg xmlns="http://www.w3.org/2000/svg">' + str + '</svg>'
  }
  const doc = parser.parseFromString(
    str,
    'text/html'
  )
  const el = doc.body.firstElementChild
  if (needSvgWrapper) {
    return el.firstElementChild
  }
  return el
}