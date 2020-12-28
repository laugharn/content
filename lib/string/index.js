export function randomNumbers(length = 32) {
  return [...Array(length)].map(() => (~~(Math.random() * 10)).toString(10)).join('')
}
