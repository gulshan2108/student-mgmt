import React, { useEffect, useState } from 'react'
import { Table, TableRow, Header, Button } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

const StudentList=()=>{
    const history=useHistory()
    const[state,setState]=useState({
        studentList:[],
        showDetails:false,
        selectedId:0
    })

    useEffect(()=>{
        fetchStudents()
    },[])

    const fetchStudents= async() =>{
        await fetch('http://localhost:5000/students')
        .then(res=>res.json())
        .then(data=>{
            setState({...state,studentList:data})
        })
    } 

    const deletedata=async id=>{
        await fetch(`http://localhost:5000/students/${id}`,{
            method:'DELETE'
        })
        .then(res=>{
            if(res.status===200){
                toast.success('Deleted Successfully')
                fetchStudents()
            }
            else{
                toast.error(res.text)
            }
        })
    }

    return(<>
   <div className='create-form'>
   <ToastContainer 
    theme="colored"
    />
    {!state.showDetails ? 
    <Table singleLine>
        <Table.Header>
        <Table.Row>
            <Table.HeaderCell>Id</Table.HeaderCell>
            <Table.HeaderCell>Student Name</Table.HeaderCell>
            <Table.HeaderCell>Edit</Table.HeaderCell>
            <Table.HeaderCell>Delete</Table.HeaderCell>
            <Table.HeaderCell>View Details</Table.HeaderCell>
        </Table.Row>
        </Table.Header>

        <Table.Body>
        {state.studentList && state.studentList.length > 0 ? state.studentList.map((data)=>{
            return(<>
            <Table.Row>
                <Table.Cell>{data.id}</Table.Cell>
                <Table.Cell>{data.firstName}</Table.Cell>
                <Table.Cell>
                    <i class="edit icon" onClick={()=>history.push(`/create/${data.id}`)}></i>
                </Table.Cell>
                <Table.Cell>
                    <i class="window minimize icon" onClick={()=>deletedata(data.id)}></i>
                </Table.Cell>
                <Table.Cell>
                    <i class="tasks icon" onClick={()=>setState({...state,showDetails:true, selectedId:data.id})}></i>
                </Table.Cell>
            </Table.Row>
            </>)
        })
        :
        <TableRow>No Data Found</TableRow>
        }
        </Table.Body>
    </Table>
  :
    <>
    <Table basic='very' celled collapsing>
    <Table.Body>
    {state.showDetails && state.studentList.map(data=>{
        if(data.id===state.selectedId){
            return(<>
                    <Table.Row>
                        <Table.Cell>
                            <Header>
                            <Header.Content>
                            First Name
                            </Header.Content>
                            </Header>
                        </Table.Cell>
                        <Table.Cell>{data.firstName}</Table.Cell>
                    </Table.Row>

                    <Table.Row>
                        <Table.Cell>
                            <Header>
                            <Header.Content>
                            Last Name
                            </Header.Content>
                            </Header>
                        </Table.Cell>
                        <Table.Cell>{data.lastName}</Table.Cell>
                    </Table.Row>

                    <Table.Row>
                        <Table.Cell>
                            <Header>
                            <Header.Content>
                            Date of Birth
                            </Header.Content>
                            </Header>
                        </Table.Cell>
                        <Table.Cell>{data.birthdate}</Table.Cell>
                    </Table.Row>

                    <Table.Row>
                        <Table.Cell>
                            <Header>
                            <Header.Content>
                            Email
                            </Header.Content>
                            </Header>
                        </Table.Cell>
                        <Table.Cell>{data.email}</Table.Cell>
                    </Table.Row>

                    <Table.Row>
                        <Table.Cell>
                            <Header>
                            <Header.Content>
                            Address
                            </Header.Content>
                            </Header>
                        </Table.Cell>
                        <Table.Cell>{data.adress}</Table.Cell>
                    </Table.Row>

                    <Table.Row>
                        <Table.Cell>
                            <Header>
                            <Header.Content>
                            Gender
                            </Header.Content>
                            </Header>
                        </Table.Cell>
                        <Table.Cell>{data.gender}</Table.Cell>
                    </Table.Row>
                </>)
        }
    })}
    </Table.Body>
    </Table>
    <Button 
        Primary 
        className='list-btn'
        onClick={()=>setState({...state,selectedId:0,showDetails:false})}>
        View List
    </Button>
    </>
    }
   </div>
    </>)
}

export default StudentList