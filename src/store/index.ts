import { legacy_createStore as createStore } from 'redux'

interface DispatchAction<T> {
  type: string,
  value: T
}



const defaultState = {
  token: {
    access: '',
    refresh: ''
  },
  userinfo: {
    id: 0,
    username: "游客",
    avatar: 'user/default.png',
    options: {
      is_active: false,
      is_staff: false,
      is_admin: false
    },
  },
  value: 0
}


function counterReducer(state = defaultState, action: DispatchAction<any>) {
  switch (action.type) {
    case 'add':
      return { value: state.value + action.value }
    case 'sub':
      return { value: state.value - action.value }
    case 'SET_USER':
      return {
        userinfo: action.value
      }
    default:
      return state
  }
}


const store = createStore(counterReducer)


export default store