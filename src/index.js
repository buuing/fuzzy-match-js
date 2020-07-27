/**
 * 查询一个字符串是否包含另一个字符串, 并且索引不在 exclude 之内
 * @param { String } text 将要查询的文本
 * @param { String } target 被包含的子字符串
 * @param { Array } exclude 排除该集合之外的索引
 * @return { Number } 如果查询到则返回第一个索引, 否则返回-1
 */
const getIndex = (text, target, exclude = []) => {
  let len = target.length
  for (let i = 0; i < text.length - len + 1; i++) {
    if (text[i] !== target[0]) continue
    let flag = true
    for (let j = 0; j < len; j++) {
      if (target[j] !== text[i + j] || exclude.includes(i + j)) {
        flag = false
        break
      }
    }
    if (flag) return i
  }
  return -1
}

/**
 * 根据用户输入的内容, 去和一段文本进行模糊匹配, 最后得到匹配的索引集合
 * @param { String } text 将要比对的文本
 * @param { String } input 用户输入的值
 * @return { Array } 返回所有匹配到的索引
 */
export const getDictionary = (text, input) => {
  input = input.replace(/\s/g, '')
  let res = []
  const dfs = word => {
    let len = word.length,
      start = 0, end = 0, index = 0, step = 0
    for (let i = len; i > 0; i--) {
      for (let j = 0; j < len + 1 - i; j++) {
        let curr = word.substr(j, i)
        index = getIndex(text, curr, res)
        if (index === -1) continue
        start = word.indexOf(curr)
        end = start + curr.length
        step = index + curr.length
        while (step > index) res.push(index++)
        if (start - 0) dfs(word.slice(0, start))
        if (end - len) dfs(word.slice(end, len))
        return
      }
    }
  }
  dfs(input)
  return res
}
