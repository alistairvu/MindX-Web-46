import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"

export interface AppGifProps {
  images: {
    downsized: {
      url: string
    }
  }
  title: string
}

const AppGif: React.FC<AppGifProps> = ({ images, title }) => {
  return (
    <Row className="py-2">
      <Col sm={3}>
        <img src={images.downsized.url} alt={title} style={{ width: 200 }} />
      </Col>
      <Col sm={9} className="text-end">
        <h3>{title}</h3>
      </Col>
    </Row>
  )
}

export default AppGif
