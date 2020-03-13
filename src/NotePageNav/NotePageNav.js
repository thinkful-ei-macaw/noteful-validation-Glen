import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CircleButton from '../CircleButton/CircleButton'
import AddFolder from '../AddFolder/AddFolder';
import AddNote from '../AddNote/AddNote';
import './NotePageNav.css'



export default function NotePageNav(props) {
  return (
    <div className='NotePageNav'>
      <CircleButton
        tag='button'
        role='link'
        onClick={() => props.history.goBack()}
        className='NotePageNav__back-button'
      >
        <FontAwesomeIcon icon='chevron-left' />
        <br />
        Back
      </CircleButton>
      {props.folder && (
        <h3 className='NotePageNav__folder-name'>
          {props.folder.name}

        </h3>
      )}

      <AddFolder />
      <AddNote />
    </div>
  )
}

NotePageNav.defaultProps = {
  history: {
    goBack: () => { }
  }
}
