import React, { Component } from 'react';
import {Form} from 'react-bootstrap';
class Profile extends Component {
    render() {
        // let { data} = this.props.data;
        // let loading = '';
        // if (this.props.data && this.props.data.loading === true) {
        //     loading = <img style={{ position: 'absolute', height: '120px', width: '120px', margin: 'auto', left: '0px', right: '0px', bottom: '0px' }} src={load} alt='loading' />
        // }
        return (
            <div className="banner-bootom-w3-agileits py-5" style={{ opacity: this.props.data && this.props.data.loading ? 0.5 : 1, position: 'relative' }}>
                {/* {loading} */}
                <div className="container py-xl-4 py-lg-2">
                <Form>
  <Form.Group controlId="exampleForm.ControlInput1">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="name@example.com" />
  </Form.Group>
  <Form.Group controlId="exampleForm.ControlSelect1">
    <Form.Label>Example select</Form.Label>
    <Form.Control as="select">
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
      <option>5</option>
    </Form.Control>
  </Form.Group>
  <Form.Group controlId="exampleForm.ControlSelect2">
    <Form.Label>Example multiple select</Form.Label>
    <Form.Control as="select" multiple>
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
      <option>5</option>
    </Form.Control>
  </Form.Group>
  <Form.Group controlId="exampleForm.ControlTextarea1">
    <Form.Label>Example textarea</Form.Label>
    <Form.Control as="textarea" rows="3" />
  </Form.Group>
</Form>
                </div>
            </div>
        );
    }
}

export default Profile;