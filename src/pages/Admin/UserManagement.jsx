import { useFetchData } from '6pp'
import { Avatar, Skeleton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { server } from '../../Constants/config'
import Table from '../../components/Shared/Table'
import AdminLayout from '../../components/layout/AdminLayout'
import { useErrors } from '../../hooks/hook'
import { transformImage } from '../../lib/features'

const columns = [{
  field : "id",
  headerName : "ID",
  headerClassName : "table-header",
  width : 200,
},
{
  field : "avatar",
  headerName : "Avatar",
  headerClassName : "table-header",
  width : 150,
  renderCell: (params)=>(
    <Avatar alt={params.row.name} src={params.row.avatar} />
  )
},
{
  field : "name",
  headerName : "Name",
  headerClassName : "table-header",
  width : 200
},
{
  field : "username",
  headerName : "Username",
  headerClassName : "table-header",
  width : 200
},
{
  field : "friends",
  headerName : "Friends",
  headerClassName : "table-header",
  width : 150
},
{
  field : "groups",
  headerName : "Groups",
  headerClassName : "table-header",
  width : 150
}
]

const UserManagement = () => {

  const {loading, data, error} = useFetchData(`${server}/api/v1/admin/users`,"dashboard-users")

  useErrors([{
    isError : error,
    error : error
  }])

  const [rows , setRows] = useState([]);
  useEffect(()=>{
    if(data){
      setRows(data.users.map((i)=>({...i,id: i._id, avatar: transformImage(i.avatar,50)}))); 
    }
  },[data])
  return (
    <AdminLayout>
      {
        loading? <Skeleton /> : <Table heading={"All Users"} columns={columns} rows={rows} />
      }
    </AdminLayout>
  )
}

export default UserManagement