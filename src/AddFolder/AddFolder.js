import React from 'react';


class AddFolder extends React.Component {



    addFolderFunc = (e) => {
        e.preventDefault();
        fetch('http://localhost:9090/folders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: this.state.value }),
        })

    }


    state = {

        value: '',

    }

    setFolderName = folderName => {
        this.setState({
            value: folderName
        })
    }

    render() {
        console.log(this.date)
        return (
            <form onSubmit={(e) => { this.addFolderFunc(e) }}>
                <label htmlFor="newFolder">Name of New Folder</label>
                <input id="newFolder" type="text" value={this.state.value} onChange={e => this.setFolderName(e.target.value)} />
                <button type="submit">Submit New Folder</button>
            </form>
        )
    }

}

export default AddFolder;