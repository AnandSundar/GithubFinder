const GITHUB_URL = process.env.REACT_APP_GITHUB_URL


export const searchUsers = async (text) => {

    const params = new URLSearchParams({
        q: text
    })
    const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
      //   headers: {
      //       Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
      //   },
    })

    const {items} = await response.json()

    // console.log(items)

    return items
}