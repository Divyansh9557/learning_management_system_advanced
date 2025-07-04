import { auth } from '@/lib/auth';
import AdminDashboard from '@/modules/Admin/Dashboard/AdminDashboard'
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react'

const page = async() => {
   const session = await auth.api.getSession({
          headers:await headers()
        })
      
        const allowedRoles = [ "admin"].some((item)=> item===session?.roles[0].role );
    
    
      if (!session?.user || !allowedRoles  ) {
        redirect('/sign-in')
      }
  return (
    <AdminDashboard/>
  )
}

export default page