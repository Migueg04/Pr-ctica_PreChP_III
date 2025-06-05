import { AppDispatcher } from './Dispatcher';
import { Action } from './Dispatcher';
import {auth, posts, postsActions, Screen, screenActionType } from './Actions';

type Callback = () => void;

// export type Garden = {
//   plants: Plant[],
//   name: string,
// }

export type Post = {
  title: string,
  caption: string,
  postId: string,
}

export type User = {
  username: string,
  userType: string, // 'admin' | 'user'
}

export type State = {
  currentUser: User | null,
  postList: Post[],
  screen: Screen,
}

type Listener = (state: State) => void;

class Store {
  private _myState: State = {
      currentUser: null,
      postList: [],
      screen: Screen.REGISTER,
  }

  private _listeners: Listener[] = [];

  constructor() {
      AppDispatcher.register(this._handleActions.bind(this)); // Bind the context of this method to the Store instance
  }

  getState() {
      return this._myState;
  }

  _handleActions(action: Action): void {
    switch (action.type) {
      // ================ TODO: Implementar cases usando utils de FIREBASE! ==============

      case posts.GET_POSTS:
        this._myState.postList = action.payload as Post[];
        this._emitChange();
        break;
      case posts.ADD_POST:
        this._myState.postList = action.payload as Post[];
        this._emitChange();
        break;
      case posts.DELETE_POST:
        this._myState.postList = action.payload as Post[];
        this._emitChange();
        break;
      case screenActionType.CHANGE_SCREEN:
        this._myState.screen = action.payload as Screen;
        this._emitChange();
        break;
      case auth.LOGIN:
        this._myState.currentUser = action.payload as User;
        this._myState.screen = Screen.DASHBOARD; // Change screen to DASHBOARD on login
        this._emitChange();
        break;
      case auth.LOGOUT:
        this._myState.currentUser = null;
        this._myState.screen = Screen.LOGIN; // Reset screen to LOGIN on logout
        this._emitChange();
        break;
      default:
        break;
    }
    this.persist();
  }

  private _emitChange(): void {
    const state = this.getState();
    for (const listener of this._listeners) {
        listener(state);
    }
  }

  // Permite a los componentes suscribirse al store
  subscribe(listener: Listener): void {
    this._listeners.push(listener);
    listener(this.getState()); // Emitir estado actual al suscribirse
  }

  // Permite quitar la suscripción
  unsubscribe(listener: Listener): void {
    this._listeners = this._listeners.filter(l => l !== listener);
  }

  persist(): void {
    localStorage.setItem('flux:state', JSON.stringify(this._myState));
  }

  load(): void {
    const persistedState = localStorage.getItem('flux:state');
    if (persistedState) {
      this._myState = JSON.parse(persistedState);
      this._emitChange(); // Emitir el nuevo estado
    }
  }
}
export const store = new Store();