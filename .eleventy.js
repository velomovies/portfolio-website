const cleanCSS = require('clean-css')
const fastGlob = require('fast-glob')
const fs = require('fs')

module.exports = function (eleventyConfig) {
  eleventyConfig.addLayoutAlias('default', 'layouts/base.njk')

  eleventyConfig.addNunjucksAsyncShortcode('includeAll', async path => {
    const stream = fastGlob.stream([`src/_includes/${path}`])
    let text = ''
    for await (const entry of stream) {
      text += await fs.readFileSync(entry, 'utf8', data => data)
    }
    return cssMin(text)
  })

  eleventyConfig.addFilter('cssmin', code => {
    return cssMin(code)
  })

  return {
    dir: {
      input: 'src',
      output: 'dist',
    },
  }
}

function cssMin(css) {
  return new cleanCSS({}).minify(css).styles
}
