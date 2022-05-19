import {useState} from 'react'
const axios = require('axios')

const App = () => {
   
  const [username, setUsername] = useState(null)
  const [password, setPassword] = useState(null)
  const [confirmPassword, setConfirmPassword] = useState(null)
  const [error, setError] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent reloading
    if(password !== confirmPassword) {
      setError('* make sure passwords match!')
      return
    }

    axios.post('/signup', {
      username, 
      password
    })

    console.log('username', username); 
    console.log('password', password); 
    console.log('confirmPassword', confirmPassword); 
  }

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text"
        id={"username"}
        name="username"
        placeholder="username"
        required
        onChange={(e) => setUsername(e.target.value)}
      />
      <input 
        type="text" 
        id="password"
        name="password" 
        placeholder="password"
        required
        onChange={(e) => setPassword(e.target.value)}
      />
      <input 
        type="text" 
        id="password-check"
        name="password-check" 
        placeholder="confirm password"
        required
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <input type="submit"/>
      <p>{error}</p>
    </form>
    )
}

export default App;
