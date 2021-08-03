import { View, Button } from '@tarojs/components'
import { useCom } from '@doudou/taro-hooks'
import Container from '@/components/container'
import './index.less'

const init = {
  state: {
  },
  loginNow () {
    console.log('登录')
  }
}

export default function Index() {

  const { events } = useCom(init)

  const {loginNow} = events

  return (
    <Container>
      <View className='pages-login-index'>
        <Button onClick={loginNow}>登录</Button>
      </View>
    </Container>
  )
}
