import React, { Component } from 'react';
import { Form, Container, Col, Row, Button } from 'react-bootstrap';
import axios from 'axios';

const postEndpoint = '/add_transaction'
const getEndpoint = '/get_chain'
class Send extends Component {
  constructor(props){
    super(props);
    this.state = {
      recipient: '',
      amount: 0,
      time: '',
      sender: '',
    }
    this.handleRecipient = this.handleRecipient.bind(this);
    this.handleAmount = this.handleAmount.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleRecipient(event){
    this.setState({ recipient: event.target.value});
  }
  handleAmount(event){
    this.setState({ amount: event.target.value});
  }
  componentDidMount() {
    axios.get(getEndpoint)
      .then(res => {
        const sender = res.data.chain[1].transactions[0].receiver;
        this.setState({ sender });
      })
    }

  handleSubmit(event) {
    event.preventDefault();

      axios.post(postEndpoint, { "sender": this.state.sender,
      "receiver": this.state.recipient,
      "amount": this.state.amount,
      "time": this.state.time })
       .then(res => {
         console.log(res);
         console.log(res.data);
       })
  }

  render(){
    return (
        <Container style={{height:"60vh"}}>
  <br/>
  <h3><b>SudoCoin</b></h3>
  <h4><b className="title">Send unlimited dummy crypto to anyone.</b> </h4>
        <Form onSubmit={this.handleSubmit}>
        <Form.Group as={Row}>
         <Form.Label column sm="2">
           Recipient
         </Form.Label>
         <Col sm="8">
           <Form.Control className="input" onChange={this.handleRecipient} value={this.state.recipient} placeholder="Enter Recipient Address" />
         </Col>
       </Form.Group>
       <Form.Group as={Row}>
        <Form.Label column sm="2">
          Amount
        </Form.Label>
        <Col sm="2">
          <Form.Control  className="input"onChange={this.handleAmount} placeholder="Amount" value={this.state.amount} />
        </Col>
        <Col sm="0.5"><b> Sudo </b></Col>
      </Form.Group>
      <Form.Group as={Row}>
      <Col sm="5">
      <Button className="button" variant="primary" type="submit">
    Send
  </Button>
  </Col>
  </Form.Group>
     </Form>
     <br/><br/>
     <img className="sendImage" src="https://next-landing-six.vercel.app/_next/static/images/about-cd62bc0292a7dc10fb880734a63b9584.svg"/>
     <img className="abtImage"src="https://next-landing-six.vercel.app/_next/static/images/particle-bottom-right-a33c6aca44edb7d79cd3b83380e078b0.png"/>
     <img className="abImage"src="https://next-landing-six.vercel.app/_next/static/images/prticle-top-right-7008d66665bf1da1d452b7f43dd0a814.png"/>
      </Container>
    );
  }
}

export default Send;
