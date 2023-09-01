import React, { useEffect } from 'react'
import { PubSub } from 'pubsub-js'
import { Button } from 'antd'
export default function Dashborad() {

  useEffect(() => {
    const token = PubSub.subscribe('login_msg', (topic: string, stateObj: any) => {
      console.log(topic, stateObj)
    })
    return () => {
      PubSub.unsubscribe(token)
    }
  }, [])

  const demoAction = () => {
    PubSub.publish("login_msg", { data: 'adf' })
  }
  return (
    <div>
      <h2>Dashborad</h2>
      <Button onClick={demoAction} >发布</Button>
    </div>
  )
}
