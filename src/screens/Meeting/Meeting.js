import React, { Component } from 'react'
import Header from '../../component/Header/Header'
import Cards, { Card } from 'react-swipe-deck'
const data = []


class Meeting extends Component {

    action(){
        console.log("hi");
        
    }
  render() {
    return (
      <div>
        <Header />
        <Cards onEnd={action('end')} className='master-root'>
        {data.map(item =>
          <Card
            onSwipeLeft={action('swipe left')}
            onSwipeRight={action('swipe right')}>
            <h2>{item}</h2>
          </Card>
        )}
      </Cards>
      </div>
    )
  }
}

export default Meeting