import React from 'react';

class AddNote extends React.Component {

    date = new Date();

    addNoteFunc = (e) => {
        e.preventDefault();
        fetch('http://localhost:9090/notes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: this.state.name,
                modified: this.date,
                folderId: '',
                content: this.state.content
            }),
        }

        )
    }

    state = {

        name: '',
        modified: '',
        folderId: '',
        content: ''

    }


    // formValues = (name, content) => {

    //     this.setState({

    //         name: name,
    //         modified: '',
    //         folderId: '',
    //         content: content

    //     })

    // }

    //folder Id is passing in the id
    //modified is passing in the time stamp
    render() {
        return (

            <form onSubmit={(e) => { this.addNoteFunc(e) }}>
                <label htmlFor="name">Name</label>
                <input id="name" type="text" value={this.state.name} onChange={e => this.setState({ name: e.target.value })} />
                <label htmlFor="content">Content</label>
                <input id="content" value={this.state.content} onChange={e => this.setState({ content: e.target.value })} />
                <button type="submit">Add New Note</button>
            </form>
        )
    }

}


export default AddNote;