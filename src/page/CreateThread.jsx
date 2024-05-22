import React from 'react'
import PropTypes from 'prop-types'

export const CreateThread = ({ loggedInUser }) => {
  return (
    <>
        <div>
            <form>
                Author:
                <input id='author' type='text' readOnly value={loggedInUser.username}></input>
                <select id='category'>
                    <option value='1'>General</option>
                    <option value='2'>Technology</option>
                    <option value='3'>Animals</option>
                    <option value='4'>Food</option>
                    <option value='5'>Sports</option>
                    <option value='6'>Music</option>
                    <option value='7'>Movies</option>
                    <option value='8'>Books</option>
                    <option value='9'>Travel</option>
                    <option value='10'>Fashion</option>
                    <option value='11'>Health</option>
                    <option value='12'>Cars</option>
                    <option value='13'>Politics</option>
                    <option value='14'>Science</option>
                    <option value='15'>History</option>
                    <option value='16'>Art</option>
                    <option value='17'>Gaming</option>
                    <option value='18'>Fitness</option>
                    <option value='19'>Photography</option>
                    <option value='20'>DIY</option>
                    <option value='21'>Birds</option>
                    <option value='22'>Astrology</option>
                    <option value='23'>Astronomy</option>
                    <option value='24'>Debate</option>
                    <option value='25'>News</option>
                    <option value='26'>Advice</option>
                    <option value='27'>Relationships</option>
                    <option value='28'>Work</option>
                    <option value='29'>Education</option>
                    <option value='30'>Parenting</option>
                    <option value='31'>Religion</option>
                    <option value='32'>Beauty</option>
                    <option value='33'>Shopping</option>
                    <option value='34'>Home</option>
                    <option value='35'>Gardening</option>
                    <option value='36'>Programming</option>
                    <option value='37'>Writing</option>
                    <option value='38'>Language</option>
                </select>
                <input id='content' type='text'></input>

            </form>
        </div>
    </>
  )
}

CreateThread.propTypes = {
    loggedInUser: PropTypes.object
}