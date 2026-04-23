import FooterClient from './FooterClient'
import { getFooter, mapFooter } from '@/lib/footer'

export default async function Footer() {

  let data = null

  try {
    const footerRaw = await getFooter()
    data = mapFooter(footerRaw)
  } catch (e) {
    console.error("Footer error:", e)
  }

  return <FooterClient data={data} />
}