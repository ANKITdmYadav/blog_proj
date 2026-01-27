import React, { useState } from 'react'
import {useAuth} from '../context/AuthProvider'
import Sidebar from '../dashboard/Sidebar'
import UpdateBlog from '../dashboard/UpdateBlog'
import MyBlogs from '../dashboard/MyBlogs'
import MyProfile from '../dashboard/MyProfile'
import CreateBlog from '../dashboard/CreateBlog'

function Dashboard() {
  const {profile,isAuthenticated} =useAuth()
  const [component, setComponent] = useState("My Blogs")
  console.log(profile)
  console.log(isAuthenticated)
  
  return (
    <div>
      <div>
        <Sidebar component={component} setComponent={setComponent}/>
        {component === "My Profile"?(
          <MyProfile/>
        ): component==="Create Blog"?(
          <CreateBlog/>
        ): component==="Update Blog"?(
          <UpdateBlog/>
        ):(
          <MyBlogs/>
        )}
        
        </div>
    </div>
  )
}

export default Dashboard