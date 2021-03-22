import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"

export interface AppGifCardProps {
  image: string
  title: string
}

const AppGifCard: React.FC<AppGifCardProps> = ({ image, title }) => {
  return (
    <Row className="py-2">
      <Col sm={3}>
        <img src={image} alt={title} style={{ width: 200 }} />
      </Col>
      <Col sm={9} className="text-center">
        <h3>{title}</h3>
      </Col>
    </Row>
  )
}

export default AppGifCard
