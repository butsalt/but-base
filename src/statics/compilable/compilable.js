export default function compilableMounter(ButBase) {
  ButBase.compile = compile
}

function compile(description) {
  const ButBase = this

  description = {
    ...description
  }

  let name = description.name
  delete description.name
  if (!name) {
    name = 'Component'
  }

  const cls = (new Function(
    `return function ${name}(config) {
      this.init(config)
    }`
  ))()

  const proto = Object.create(ButBase.prototype)

  proto.constructor = cls

  Object.keys(description)
    .forEach(key => {
      proto[key] = description[key]
    })

  cls.prototype = proto

  return cls
}