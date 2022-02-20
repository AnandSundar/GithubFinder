import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";
const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
export const GithubProvider = ({children}) => {

const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false
}

const [state, dispatch] = useReducer(githubReducer, initialState)

// const fetchUsers = async () => {

//     setLoading()
//     const response = await fetch(`${GITHUB_URL}/users`, {
//       //   headers: {
//       //       Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
//       //   },
//     })

//     const data = await response.json()

//     dispatch({
//         type: 'GET_USERS',
//         payload: data,
//     })
// }

//get one user
const getUser = async (login) => {

    setLoading()
    const response = await fetch(`${GITHUB_URL}/users/${login}`, {
      //   headers: {
      //       Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
      //   },
    })

    if(response.status === 404) {
        window.location = '/notfound'
    }else{
        const data = await response.json()
    
        dispatch({
            type: 'GET_USER',
            payload: data,
        })
    }

    
}

const getUserRepos = async (login) => {

    setLoading()

    const params = new URLSearchParams({
        sort: 'created',
        per_page: 10
    })

    const response = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`, {
      //   headers: {
      //       Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
      //   },
    })

    const data = await response.json()

    // console.log(items)

    dispatch({
        type: 'GET_REPOS',
        payload: data,
    })
}


const clearUsers = () => {
    // console.log("clear users")
    dispatch({
        type: 'CLEAR_USERS',
        // payload: [],
    })
}

//set loading

const setLoading = () => dispatch({
    type: 'SET_LOADING'
})

return <GithubContext.Provider value={{
    ...state,
    dispatch,
    clearUsers,
    getUser,
    getUserRepos,
}}>
    {children}
</GithubContext.Provider>

}

export default GithubContext 