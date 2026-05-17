import React from 'react'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import RightSidebar from '../../components/RightSidebar/RightSidebar'
import QuestionDetails from './QuestionDetails'

const DisplayQuestion = () => {
    return (
        <div className='home-container'>
            <LeftSidebar/>
            <QuestionDetails/>
            <RightSidebar/>
        </div>
    )
}

export default DisplayQuestion