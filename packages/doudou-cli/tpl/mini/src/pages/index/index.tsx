import { View, Button } from '@tarojs/components'
import { useCom } from '@doudou/taro-hooks'
import Container from '@/components/container'
import { getUserInfo } from '@/services/user'
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
  },
  onLoad () {
    console.log('page onload')
  },
  async getData1 () {
    await getUserInfo({})
    // options不传，默认就是走代理模式
    // 当接口请求成功，会直接返回data
    // 当接口请求失败是，会自动toast错误，以下代码不会执行
    console.log('此log不会打印')
  },
  async getData2 () {
    await getUserInfo({}, {proxy: false})
    // 当proxy为false时，返回的结果时response，可自行处理返回结果
    console.log('此log会打印')
  }
}

export default function Index() {

  const { state, events } = useCom(init)

  const {count} = state

  const {subtract, add, getData1, getData2} = events

  return (
    <Container>
      <View className='pages-index-index'>
        <View className='count-container'>
          <View className='btn-subtract' onClick={subtract}>-</View>
          <View className='text-count'>{count}</View>
          <View className='btn-add' onClick={add}>+</View>
        </View>
        <Button onClick={getData1}>获取数据, 方式1</Button>
        <Button onClick={getData2}>获取数据, 方式2</Button>
      </View>
    </Container>
  )
}
