import { View } from '@tarojs/components'
import Loading from './loading'
import Error from './error'

interface IProps {
  loading?: boolean;
  error?: any;
  children: JSX.Element | null;
}

export default function Container (props: IProps): JSX.Element {

  const {error, loading, children} = props

  return <View className='page-container'>
    {error ? <Error {...error} /> : loading ? <Loading /> : <View>{children}</View>}
  </View>
}
