interface GIFInterface {
  type: "gif"
  id: string
  slug: string
  url: string
  bitly_url: string
  embed_url: string
  username?: string
  source: string
  rating: string
  title: string
  images: {
    downsized: {
      url: string
    }
  }
}
