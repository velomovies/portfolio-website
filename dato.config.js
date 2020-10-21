const staticDir = `./src/`
const dataDir = `${staticDir}/_data`

module.exports = (dato, root) => {
  root.createDataFile(`${dataDir}/info.json`, 'json', getInfo(dato))
  root.createDataFile(`${dataDir}/pages/contact.json`, 'json', getContact(dato.contact))
  dato.pages.forEach(page => {
    root.createDataFile(`${dataDir}/pages/${page.slug}.json`, 'json', getPage(page))
  })
}

function getInfo(dato) {
  const { pages } = dato

  const indexablePages = pages.map((item) => {
    return {
      title: item.title,
      slug: item.slug,
    }
  })

  return {
    pages: indexablePages,
    name: dato.siteInfo.name,
    siteUrl: dato.siteInfo.url
  }
}

function getPage(page) {
  return {
    title: page.title,
    slug: page.slug,
    headerText: page.headerText,
    content: page.content.toMap(),
  }
}

function getContact(contact) {
  return {
    title: contact.title,
    slug: contact.slug,
    headerText: contact.headerText,
    headerImage: contact.headerImage,
    information: contact.information,
    description: contact.description,
    instagramUrl: contact.instagramUrl,
    linkedinUrl: contact.linkedinUrl,
    youtubeUrl: contact.youtubeUrl
  }
}
