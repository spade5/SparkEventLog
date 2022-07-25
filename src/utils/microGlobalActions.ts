import { initGlobalState, MicroAppStateActions } from 'qiankun'

const initialState: any = {}
const microGlobalActions: MicroAppStateActions = initGlobalState(initialState)

export default microGlobalActions
