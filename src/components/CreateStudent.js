import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { useHistory, useParams } from 'react-router-dom';
import { Button, Radio, Form } from 'semantic-ui-react'
import DatePicker from "react-datepicker";
import { ToastContainer, toast } from 'react-toastify';
import "react-datepicker/dist/react-datepicker.css";

const CreateStudent=()=>{
    const { register, handleSubmit, formState: { errors } } = useForm();
    const history=useHistory()
    const params=useParams()
    const id=params.id
    const [state,setState]=useState({
        firstName:'',
        lastName:'',
        date:new Date(),
        email:'',
        add:'',
        gender:'',
        list:[]
    })

    useEffect(async()=>{
        if(id !== undefined){
            await fetch(`http://localhost:5000/students/${id}`)
            .then(res=>res.json())
            .then(data=>setState({...state,
                firstName:data.firstName,
                lastName:data.lastName,
                email:data.email,
                add:data.adress,
                gender:data.gender
            }))
        }
    },[])

    useEffect(async ()=>{
        await fetch(`http://localhost:5000/students`)
            .then(res=>res.json())
            .then(data=>{
                setState({...state,list:data})
            })
    },[])


    const handleChange = (e, { value }) =>{setState({...state,gender:value})}

    const onSubmit = async data => {
        let duplicate
        state.list.map(data=>{
            if(data.email===state.email){
                duplicate=true
                return
            }
        })
        if(state.date.toLocaleDateString() === new Date().toLocaleDateString()){
            toast.error("Date should not today date");
        }
        else if(duplicate === true){
            toast.error("try another email");
        }
        else if(state.gender=== ''){
            toast.error("select gender");
        }
        else if(id){
            await fetch(`http://localhost:5000/students/${id}`,{
                method:'PUT',
                headers:{
                    "content-type":"application/json"
                },
                body:JSON.stringify({
                    firstName:state.firstName,
                    lastName:state.lastName,
                    birthdate:state.date.toLocaleDateString(),
                    email:state.email,
                    adress:state.add,
                    gender:state.gender
                })
            })
            .then(res=>{
                if(res.status===200){
                    history.push("/list")
                }
            })
        }
        else{
            await fetch('http://localhost:5000/students',{
                method:'POST',
                headers:{
                    "content-type":"application/json"
                },
                body:JSON.stringify({
                    firstName:state.firstName,
                    lastName:state.lastName,
                    birthdate:state.date.toLocaleDateString(),
                    email:state.email,
                    adress:state.add,
                    gender:state.gender
                })
            })
            .then(res=>{
                if(res.status===201 && res.statusText==="Created"){
                    history.push("/list")
                }
            })
        }
    }

    return(<>
    <div className='create-form'>
    <ToastContainer 
    theme="colored"
    />
    <h1 className='heading'>Add Student</h1>
    <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Field className='form-field'>
            <label className='form-label'>First Name</label>
            <input 
                placeholder='First Name' 
                value={state.firstName}
                {...register("FirstName", { required: true })} 
                onChange={(e)=>setState({...state,firstName:e.target.value})}
            />
        </Form.Field>
        {errors.FirstName?.type === 'required' && <span className='err-msg'>First name is required</span>}
        <Form.Field className='form-field'>
            <label className='form-label'>Last Name</label>
            <input 
                placeholder='Last Name' 
                value={state.lastName}
                {...register("LastName", { required: true })} 
                onChange={(e)=>setState({...state,lastName:e.target.value})}
            />
        </Form.Field>
        {errors.LastName?.type === 'required' && <span className='err-msg'>Last Name required</span>}
        {id === undefined &&
        <Form.Field className='form-field'>
            <label className='form-label'>Date</label>
            <DatePicker 
                selected={state.date} 
                filterDate={d => {
                    return new Date() > d;
                  }}
                onChange={(date) => setState({...state,date:date})} />
        </Form.Field >
        }
        <Form.Field className='form-field'>
            <label className='form-label'>Email</label>
            <input 
                placeholder='Email' 
                value={state.email}
                {...register("Email", { required: true, pattern:/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/ })} 
                onChange={(e)=>setState({...state,email:e.target.value})}
            />
        </Form.Field>
        {errors.Email?.type === 'required' && <span className='err-msg'>Email required</span>}
        {errors.Email?.type === 'pattern' && <span className='err-msg'>Enter valid email</span>}
        <Form.Field className='form-field'>
            <label className='form-label'>Address</label>
            <input 
                placeholder='Add' 
                value={state.add}
                {...register("Add", { required: true })}
                onChange={(e)=>setState({...state,add:e.target.value})} 
            />
        </Form.Field>
        {errors.Add?.type === 'required' && <span className='err-msg'>Address Required</span>}
        <Form.Field>
          Selected value: <b>{state.gender}</b>
        </Form.Field>
            <Radio
            label='Male'
            name='Male'
            value='Male'
            checked={state.gender === 'Male'}
            onChange={handleChange}
          />
        <Form.Field>
          <Radio
            label='Female'
            name='Female'
            value='Female'
            checked={state.gender === 'Female'}
            onChange={handleChange}
          />
        </Form.Field>
        <div className='form-btn'>
        <Button 
            floated='left' 
            onClick={(e)=>setState({...state,
                firstName:'',
                lastName:'',
                date:new Date(),
                email:'',
                add:'',
                gender:''
            })
        }
        >
            Cancle
        </Button>
        <Button floated='left' type="submit">Submit</Button>
        </div>
    </Form>
    </div>
    </>)
}

export default CreateStudent