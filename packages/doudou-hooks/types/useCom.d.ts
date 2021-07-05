declare namespace Hooks {
  namespace useCom {
    type init = Record<string, any>
    type props =  Record<string, any>
    type Res = {
      state: Record<string, any>
      globalState?: Record<string, any>
      events: Record<string, any>
      loading: Record<string, boolean>
      error: any
    }
  }

  namespace useEventEnhancement {
    type init = Record<string, any>
    type context =  Record<string, any>
    type Return = {
      globalState?: Record<string, any>
      events: Record<string, any>
      loading: Record<string, boolean>
      error: any
    }
  }

  function useCom(init: useCom.init, props?: useCom.props): useCom.Res
}