import  React ,{useState}from 'react'
import './AskQuestion.css'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'

import {useDispatch, useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {askQuestion }from '../../actions/question'

const AskQuestion = () => {
    
    const[questionTitle,setQuestionTitle]=useState('')
    const[questionBody,setQuestionBody]=useState('')
    const[questionTags,setQuestionTags]=useState('')
    
    const dispatch =useDispatch()
    const navigate=useNavigate()
    const User=useSelector((state)=>(state.currentUserReducer))

    const handleSubmit =(e)=>{
        e.preventDefault()
        console.log({questionTitle,questionBody,questionTags })
        dispatch(askQuestion({questionTitle,questionBody,questionTags,userPosted:User.result.name},navigate))
    }

    const HandleEnter= (e)=>{
        if(e.key==='Enter'){
            setQuestionBody(questionBody+'\n')
        }
    }
    
    return (
        <div className='home-container'>
            <LeftSidebar/>
        
        <div className='ask-question'>
            <div className='ask-ques-container'   >
                <h1>Ask a public Question</h1>
                

                <form onSubmit={handleSubmit}>
                    <div className='ask-form-container'>
                        <label htmlFor="ask-ques-title">
                            <h4>Title</h4>
                            <p>Be Specific and imagine you're asking a question to another persons</p>
                            <input type="text" name='questionTitle' onChange={(e)=>{setQuestionTitle(e.target.value)}} id='ask-ques-title' placeholder='e.g. Is there an R function for Finding index of the element in a vector form ?'></input>

                        </label>
                        <label htmlFor="ask-ques-body">
                            <h4>Body</h4>
                            <p>Include all the information for someone to answer your Question</p>
                            <textarea name="" id="ask-ques-title" onChange={(e)=>{setQuestionBody(e.target.value)}}  onKeyDown={HandleEnter} cols="30" rows="10"></textarea>
                            

                        </label>
                        <label htmlFor="ask-ques-title">
                            <h4>Tags</h4>
                            <p>Add up to 5 tags to describe what your Question is about ! </p>
                            <input type="text" name='questionTitle' onChange={(e)=>{setQuestionTags(e.target.value.split(' '))}} id='ask-ques-title' placeholder='e.g. html (HyperText MarkUp Language '></input>

                        </label>


                    </div>
                    <input type='submit' className='Submitbutton' value='Review your Question'/>
                </form>
            </div>
            
        </div>
        </div>
    )
}

export default AskQuestion