export default function getValueByPath (object, path) {
  let splits = path.trim().split('.')
  let value = object
  for (let i = 0; i < splits.length; i++) {
    let split = splits[i]
    if (split in value) {
      value = value[split]
    } else {
      return undefined
    }
  }
  return value
}
