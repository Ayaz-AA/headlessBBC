'use client'

import { useEffect } from 'react'

export default function BootstrapClient() {
  useEffect(() => {
    // Load Bootstrap JS (includes collapse/accordion behavior used in FAQs)
    import('bootstrap/dist/js/bootstrap.bundle.min.js')
  }, [])

  return null
}


