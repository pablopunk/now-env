require('../../index.js').config()
console.log(
  process.env.SECRET,
  process.env.ANOTHER_SECRET,
  process.env.SECRET_FAIL
)
