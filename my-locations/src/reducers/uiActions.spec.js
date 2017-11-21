import uiActions from './uiActions'
import * as types from '../constants/ActionTypes'

const initialState = {
  actionState : "VIEW"
}

describe('categories reducer', () => {
  it('should handle initial state', () => {
    expect(
        uiActions(undefined, {})
    ).toEqual(initialState)
  })

  it('should set empty state to ADD', () => {
    expect(uiActions(undefined, {
          type: types.SET_ACTION_ADD
        })
      ).toEqual({
        actionState : "ADD"
          }
      )
  })

  it('should set other state to ADD', () => {
      expect(uiActions({actionState : "REMOVE"}, {
        type: types.SET_ACTION_ADD
      })
    ).toEqual({
      actionState : "ADD"
      }
    )
  })

  it('should set empty state to EDIT', () => {
    expect(uiActions(undefined, {
          type: types.SET_ACTION_EDIT
        })
      ).toEqual({
        actionState : "EDIT"
          }
      )
  })

  it('should set other state to EDIT', () => {
      expect(uiActions({actionState : "REMOVE"}, {
        type: types.SET_ACTION_EDIT
      })
    ).toEqual({
      actionState : "EDIT"
      }
    )
  })

  it('should set empty state to VIEW', () => {
    expect(uiActions(undefined, {
          type: types.SET_ACTION_VIEW
        })
      ).toEqual({
        actionState : "VIEW"
          }
      )
  })

  it('should set other state to VIEW', () => {
      expect(uiActions({actionState : "REMOVE"}, {
        type: types.SET_ACTION_VIEW
      })
    ).toEqual({
      actionState : "VIEW"
      }
    )
  })

  it('should set empty state to REMOVE', () => {
    expect(uiActions(undefined, {
          type: types.SET_ACTION_REMOVE
        })
      ).toEqual({
          actionState : "REMOVE"
          }
      )
  })

  it('should set other state to REMOVE', () => {
      expect(uiActions({actionState : "ADD"}, {
        type: types.SET_ACTION_REMOVE
      })
    ).toEqual({
        actionState : "REMOVE"
      }
    )
  })

})