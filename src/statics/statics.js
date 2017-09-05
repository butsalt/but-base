import compilable from './compilable/compilable'

export default function statics(ButBase) {
  ButBase.use = function use(mounter) {
    mounter(this)
  };

  [compilable]
    .forEach(mounter => {
      ButBase.use(mounter)
    })
}