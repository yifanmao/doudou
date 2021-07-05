import React from 'react'

function useState (initialState: any): any {
  const [state, setState] = React.useState(initialState)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const _setState = (newState: any): void => {
    if (toString.call(newState) === '[object Object]') {
      const spreadState = {}
      for (const prop in newState) {
        const multiFields: string[] = prop.split('.')
        // 如果state中包含'.'，说明需要修改深层的state
        if (multiFields.length > 1) {
          let fieldExsits = true
          const firstPropName: string = multiFields[0]
          const firstValue: any = JSON.parse(JSON.stringify(state[firstPropName]))
          const tempArr: any = [firstValue]
          for (let i = 1; i < multiFields.length; i++) {
            const propName: string = multiFields[i]
            const value: any = tempArr[i - 1][propName]
            if (value) {
              // 根据上一个数据获取这次数据值
              if (i + 1 === multiFields.length) {
                tempArr[i - 1][propName] = newState[prop]
              } else {
                tempArr.push(value)
              }
            } else {
              fieldExsits = false
              break
            }
          }

          if (fieldExsits) {
            spreadState[firstPropName] = firstValue
          } else {
            console.error(`${prop} 不存在`)
          }
        } else {
          spreadState[prop] = newState[prop]
        }
      }
      setState((prevState: any) => {
        return { ...prevState, ...spreadState }
      })
    } else {
      setState(newState)
    }
  }

  return [state, _setState]
}

function useEventEnhancement (init: Hooks.useEventEnhancement.init = {}, context: Hooks.useEventEnhancement.context): Hooks.useEventEnhancement.Return {

  const [loading, setLoading] = useState({})

  const [error, setError] = useState(null)

  const events = React.useRef({}).current

  if (!context.__init) {
    context.__init = true

    context = Object.assign(context, {
      loading,
      error,
      setError,
    })
  
    for (const propName in init) {
      if (typeof init[propName] === 'function') {
        const oriFunc = init[propName]
        const newFunc = function (...args: any[]): any {
          const res = oriFunc.call(this, ...args)
          if (typeof res?.then !== 'function') {
            return res
          }
  
          return new Promise(function (resolve) {
            setLoading({
              [propName]: true,
            })
            if (error) {
              setError(null)
            }
            res.then(function (result) {
              setLoading({
                [propName]: false,
              })
              resolve(result)
            }).catch(function (err) {
              setLoading({
                [propName]: false,
              })
  
              setError(err)
            })
          })
        }
        context[propName] = newFunc.bind(context)
        events[propName] = newFunc.bind(context)
      } else if (propName !== 'state') {
        context[propName] = init[propName]
      }
    }
  }

  return {
    events,
    loading,
    error,
  }
}

export function useCom (init: Hooks.useCom.init, props: Hooks.useCom.props = {}): Hooks.useCom.Res {

  const context: any = React.useRef({__mounted: false, props}).current

  const [state, setState] = useState(init.state)

  context.state = state

  React.useEffect(function () {
    context.__mounted = true
    context.onLoad?.()

    return function (): void {
      context.__mounted = false
      context.onUnload?.()
    }
  }, [])

  context.setState = function (newState: any) {
    if (context.__mounted) {
      setState(newState)
    }
  }

  const { events, loading, error } = useEventEnhancement(init, context)

  return {
    state,
    events,
    loading,
    error,
  }
}