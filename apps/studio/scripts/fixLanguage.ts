import {getCliClient} from 'sanity/cli'

const client = getCliClient()

async function run() {
  const docs = await client.fetch<{_id: string}[]>(
    `*[_type == "legalPage" && !defined(language) && _id match "*-*"]{_id}`,
  )

  console.log(
    'gefunden:',
    docs.length,
    docs.map((d) => d._id),
  )

  if (!docs.length) return

  const tx = docs.reduce((tx, doc) => {
    const lang = doc._id.split('-').pop()
    return tx.patch(doc._id, {set: {language: lang}})
  }, client.transaction())

  await tx.commit()
  console.log('fertig')
}

run()

//npx sanity exec scripts/fixLanguage.ts --with-user-token
