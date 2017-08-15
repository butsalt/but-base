function findByPure(context, selector) {
  return Array.from(
    context.querySelectorAll(selector)
  )
}

export default function getFinder(lib) {
  let finder
  switch(lib) {
    default:
      finder = findByPure
      break;
  }
  return finder
}