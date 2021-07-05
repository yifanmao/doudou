import { View } from '@tarojs/components'
import { useCom } from 'doudou-hooks'
import Container from '@/components/container'
import './index.less'

const init = {
  state: {
    count: 1,
  },
  add () {
    const { count } = this.state
    this.setState({
      count: count + 1
    })
  },
  subtract () {
    const { count } = this.state
    this.setState({
      count: count - 1
    })
  }
}

export default function Index() {

  const { state, events } = useCom(init)

  const {count} = state

  const {subtract, add} = events

  return (
    <Container>
      <View className='pages-index-index'>
        <View className='count-container'>
          <View className='btn-subtract' onClick={subtract}>-</View>
          <View className='text-count'>{count}</View>
          <View className='btn-add' onClick={add}>+</View>
        </View>
      </View>
    </Container>
  )
}
