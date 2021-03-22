import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import { Component } from "react"

export interface GifCardProps {
  image: string
  title: string
}

class GifCard extends Component<GifCardProps> {
  render() {
    return (
      <Row className="py-2">
        <Col sm={3}>
          <img src={this.props.image} alt={this.props.title} style={{ width: 200 }} />
        </Col>
        <Col sm={9} className="text-end">
          <h3>{this.props.title}</h3>
        </Col>
      </Row>
    )
  }
}

export default GifCard
