import React from 'react'
import { useHistory } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

const Head=()=>{
    const history=useHistory()
    return(<>
        <Menu size='massive' widths={2} borderless className="top-menu">
        <Menu.Menu className="menu-text">
          <Menu.Item
          active
          position='right'
            name='Add Student'
            onClick={()=>history.push('/')}
          />
          <Menu.Item
            name='Student List'
            onClick={()=>history.push('/list')}
          />
        </Menu.Menu>
      </Menu>
    </>)
}

export default Head