import compilable from './compilable/compilable'

export default function statics(ButBase) {
  ButBase.use = function use(mounter, config={}) {
    mounter(this, config)
  };

  [compilable]
    .forEach(mounter => {
      ButBase.use(mounter)
    })
}