import React, { useState } from 'react'
import PropTypes from 'prop-types'

export const CreateThread = ({ loggedInUser }) => {
    const [categories, setCategories] = useState(null);

    return (
    <>
        <div>
            <form>
                Author:
                <input id='author' type='text' readOnly value={loggedInUser.username}></input>
                Category: 
                <select id='category'>
                    {categories ? categories.map((category) => {
                        return <option key={category.id} value={category.id}>{category.name}</option>
                    }) : <option value=''>Loading...</option>}
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