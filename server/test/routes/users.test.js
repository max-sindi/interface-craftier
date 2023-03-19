import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.headers['authorization'] = 'asdsadas'
const email = `${Date.now()}@test.com`
const password = 'password'
let id

async function fetchUsers() {
  return await axios.get('/users')
}

async function fetchUserById(id) {
  return await axios.get(`/users/${id}`)
}

test('createUser', async () => {
  expect.assertions(1)
  try {
    const createdUser = await axios.post('/users', {password, email})
    /* SET USER ID FOR FURTHER MANIPULATIONS*/
    id = createdUser.data.id
    expect(createdUser.data.email).toBe(email)
  } catch (e) {
    console.error(e)
  }
})

test('fetch users', async () => {
  expect.assertions(2)
  try {
    const users = await fetchUsers()
    expect(typeof users.data.length).toBe('number')
    expect(users.data.find(item => item.id === id).email).toBe(email)
  } catch(e) {
    console.error(e)
  }
})

test('fetch single user', async () => {
  expect.assertions(1)
  try {
    const user = await fetchUserById(id)
    expect(user.data.email).toBe(email)
  } catch (e) {
    console.error(e)
  }
})

test('update user', async () => {
  expect.assertions(1)
  const newEmail = `a${email}`
  try {
    const updatedUser = await axios.put(`/users/${id}`, {
      email: newEmail
    })
    expect(updatedUser.data.email).toBe(newEmail)
  } catch (e) {
    console.error(e)
  }
})

test('delete user', async () => {
  expect.assertions(1)
  try {
    const deletedResponse = await axios.delete(`/users/${id}`)
    expect(deletedResponse.data.ok).toBe(true)
  } catch (e) {
    console.error(e)
  }
})

async function deleteAllUsers() {
  const users = await fetchUsers()
  users.data.forEach(item => axios.delete('/users/' + item.id))
}

// deleteAllUsers()