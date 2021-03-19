import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import { Component } from "react"

interface AppGifProps {
  images: {
    downsized: {
      url: string
    }
  }
  title: string
}

class AppGif extends Component<AppGifProps> {
  constructor(props: AppGifProps) {
    super(props)
  }

  render() {
    return (
      <Row className="py-2">
        <Col sm={3}>
          <img src={this.props.images.downsized.url} alt={this.props.title} style={{ width: 200 }} />
        </Col>
        <Col sm={9} className="text-end">
          <h3>{this.props.title}</h3>
        </Col>
      </Row>
    )
  }
}

export default AppGif
