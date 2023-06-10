// https://stackoverflow.com/questions/32707322/how-to-make-a-handlebars-helper-global-in-expressjs
export const register = function (Handlebars) {
  const helpers = {
    // put all of your helpers inside this object
    foo: function () {
      return 'FOO'
    },
    bar: function () {
      return 'BAR'
    }
  }

  if (Handlebars && typeof Handlebars.registerHelper === 'function') {
    // register helpers
    for (const prop in helpers) {
      Handlebars.registerHelper(prop, helpers[prop])
    }
  } else {
    // just return helpers object if we can't register helpers here
    return helpers
  }
}

export const helpers = register(null)
