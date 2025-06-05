import { AppDispatcher } from './Dispatcher';
import { getPostsDb, addPostDb, deletePostDb, getUsersDb, registerUserDb } from '../services/firebase';
import { Post } from './Store';

// export const garden = {
//   ADD_TO_GARDEN: 'ADD_TO_GARDEN',
//   REMOVE_FROM_GARDEN: 'REMOVE_FROM_GARDEN',
//   CHANGE_NAME: 'CHANGE_NAME',
// };

export const auth = {
  LOGIN: 'LOGIN',
  REGISTER: 'REGISTER',
  LOGOUT: 'LOGOUT',
};

export enum Screen {
  REGISTER = 'REGISTER',
  LOGIN = 'LOGIN',
  DASHBOARD = 'DASHBOARD',
}

export const screenActionType = {
  CHANGE_SCREEN: 'CHANGE_SCREEN',
};

export const posts = {
  GET_POSTS: 'GET_POSTS',
  ADD_POST: 'ADD_POST',
  DELETE_POST: 'DELETE_POST',
}

// export const plantsManager = {
//   GET_PLANTS: 'GET_PLANTS',
//   MODIFY_PLANT: 'MODIFY_PLANT',
// }

export const authActions = {
  login: async (username: string) => {
    const userData = await getUsersDb();
    userData.docs.forEach((doc: any) => {
      const user = doc.data();
      if (user.username === username) {
        AppDispatcher.dispatch({
          type: auth.LOGIN,
          payload: user
        });
        console.log("User logged in:", user);
      } else {
        console.log("User not found:", username);
      }
    });
  },
  register: async (username: string, userType: string) => {
    const usersData = await getUsersDb();
    let userExists = false;
    usersData.docs.forEach((doc: any) => {
      const user = doc.data();
      if (user.username === username) {
        userExists = true;
        console.log("User already exists:", username);
      }
    });

    if(!userExists) {
      const userId = await registerUserDb(username, userType);
      AppDispatcher.dispatch({
        type: auth.REGISTER,
        payload: { username, userType }
      });
      console.log("User registered:", { username, userType, userId });
    }
    else {
      console.log("User registration failed, user already exists:", username);
    }
  },
  logout: async () => {
    AppDispatcher.dispatch({
      type: auth.LOGOUT,
      payload: null
    });
    console.log("User logged out");
  }
}

export const postsActions = {
  getPosts: async () => {
    console.log('HELLO, IM A FLAG!!');
    const postData = await getPostsDb();
    const postList: Post[] = [];
    postData.docs.forEach((doc: any) => {
      const post = doc.data();
      post.postId = doc.id; // Add the document ID to the post object
      postList.push(post);
    });

    AppDispatcher.dispatch({
      type: posts.GET_POSTS,
      payload: postList
    });
  },
  addPost: async (post: any) => {
    await addPostDb(post);

    const postData = await getPostsDb();
    const postList: Post[] = [];
    postData.docs.forEach((doc: any) => {
      const post = doc.data();
      post.postId = doc.id; // Add the document ID to the post object
      postList.push(post);
    });

    AppDispatcher.dispatch({
      type: posts.ADD_POST,
      payload: postList
    });
  },
  deletePost: async (postId: string) => {
    await deletePostDb(postId);
    
    const postData = await getPostsDb();
    const postList: Post[] = [];
    postData.docs.forEach((doc: any) => {
      const post = doc.data();
      post.postId = doc.id; // Add the document ID to the post object
      postList.push(post);
    });

    AppDispatcher.dispatch({
      type: posts.ADD_POST,
      payload: postList
    });
  }
}


export const screenActions = {
  changeScreen: (newScreen: Screen) => {
    AppDispatcher.dispatch({
      type: screenActionType.CHANGE_SCREEN,
      payload: newScreen
    });
  }
}

// export const plantsManagerAction = {
//   getPlants: async () => {
//     const plants = plantsData;
//     AppDispatcher.dispatch({
//       type: plantsManager.GET_PLANTS,
//       payload: plants
//     });
//   },
//   modifyPlant: async (plant: Plant, index: Number) => {
//     console.log("Plant in Action:", plant);
//     AppDispatcher.dispatch({
//       type: plantsManager.MODIFY_PLANT,
//       payload: { plant, index}
//     });
//   }
// }

// export const gardenActions = {
//   addToGarden: async(plant: Plant) => {
//     AppDispatcher.dispatch({
//       type: garden.ADD_TO_GARDEN,
//       payload: plant
//     });
//   },
//   removeFromGarden: (plantIndex: number) => {
//     AppDispatcher.dispatch({
//       type: garden.REMOVE_FROM_GARDEN,
//       payload: plantIndex
//     });
//   },
//   changeName: (name: string) => {
//     AppDispatcher.dispatch({
//       type: garden.CHANGE_NAME,
//       payload: name
//     });
//   }
// };