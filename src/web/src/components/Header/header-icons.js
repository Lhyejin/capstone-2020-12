import React from 'react'
import { Button, Col, Row } from 'antd'
import { UploadOutlined, UserOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

function HeaderIcons (props) {
  return (
    <Row justify="center" align="middle" style={{ top: '8%' }}>
      <Col>
        {
          (props.token === "") ?
          <Link to={'/login'}>
            <Button type="link">
              <UploadOutlined style={{ fontSize: '30px', color: '#949494' }}/>
            </Button>
          </Link>
          :
          <Link to={'/upload'}>
            <Button type="link">
              <UploadOutlined style={{ fontSize: '30px', color: '#949494' }}/>
            </Button>
          </Link>
        }
      </Col>
      <Col>
        {
          (props.token === "") ?
          <Link to={'/login'}>
            <Button type="link">
              LogIn
            </Button>
          </Link>
          :
          <Link to={'/user'}>
            <Button type="link">
              <UserOutlined style={{ fontSize: '30px', color: '#949494' }}/>
            </Button>
          </Link>
        }
      </Col>
    </Row>
  )
}

export default HeaderIcons