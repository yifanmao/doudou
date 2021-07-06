import { View } from '@tarojs/components'

export default function Error (props: any): JSX.Element {

  return <View className='page-error'>
    error: {props}
  </View>
}
