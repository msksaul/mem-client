import { useState, useEffect } from 'react'
import { AppBar, Toolbar, Typography, Button, Avatar } from '@material-ui/core'
import { Link, useHistory, useLocation } from 'react-router-dom'

import { useDispatch } from 'react-redux'

import useStyles from './styles'

import memoriesLogo from '../../assets/memoriesLogo.png'
import memoriesText from '../../assets/memoriesText.png'

import decode from 'jwt-decode'

const Navbar = () => {

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))

  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()

  useEffect(() => {
    const token = user?.token

    if(token) {
      const decodedToken = decode(token)

      if(decodedToken.exp * 1000 < new Date().getTime()) logout()
    }

    setUser(JSON.parse(localStorage.getItem('profile')))
  }, [location])

  const logout = () => {
    dispatch({ type: 'LOGOUT' })
    history.push('/')
    setUser(null)
  }

  return (
    <AppBar className={classes.appBar} position='static' color='inherit'>
      <Link to='/' className={classes.brandContainer}>
        <img src={memoriesText} alt='icon-text' height='45px' />
        <img className={classes.image} src={memoriesLogo} alt='memories' height='40px' />
      </Link>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant='h6'>{user.result.name}</Typography>
            <Button variant='contained' className={classes.logout} color='secondary' onClick={logout}>Logout</Button>
          </div>
        ) : (
          <Button component={Link} to='/auth' variant='contained' color='primary'>Sign In</Button>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Navbar