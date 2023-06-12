// https://stackoverflow.com/questions/32707322/how-to-make-a-handlebars-helper-global-in-expressjs
export const helpers = {
  // put all of your helpers inside this object
  checkIsLogin: function () {
    return false
  },
  checkIsRegister: function () {
    return false
  },
  matchIcon: function (record, categories) {
    // 在index呈現record時回傳對應categories的icon
    const icon = categories.find((item) => {
      return item._id === record.categoryID
    })
    if (icon) {
      return icon.icon
    } else {
      return null
    }
  }
}
