import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NoteListNav from '../NoteListNav/NoteListNav';
import NotePageNav from '../NotePageNav/NotePageNav';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
import AddNote from '../AddNote/AddNote';
import AddFolder from '../AddFolder/AddFolder';
import { getNotesForFolder, findNote, findFolder } from '../notes-helpers';
import './App.css';


class App extends Component {
    state = {
        notes: [],
        folders: []
    };


    addFolder = (value) => {

        this.setState({
            folders: value
        })

    }

    componentDidMount() {

        fetch('http://localhost:9090/folders')
            .then(result => result.json())
            .then(jsonResult => this.setState({
                folders: jsonResult
            }))

        fetch('http://localhost:9090/notes')
            .then(result => result.json())
            .then(jsonResult => this.setState({
                notes: jsonResult
            }))

    }

    renderNavRoutes() {
        const { notes, folders } = this.state;
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        render={routeProps => (
                            <div>
                                <NoteListNav
                                    folders={folders}
                                    notes={notes}
                                    {...routeProps}
                                />


                            </div>
                        )}
                    />
                ))}
                <Route
                    path="/note/:noteId"
                    render={routeProps => {
                        const { noteId } = routeProps.match.params;
                        const note = findNote(notes, noteId) || {};
                        const folder = findFolder(folders, note.folderId);
                        return <NotePageNav {...routeProps} folder={folder} />;
                    }}
                />



                <Route path="/add-folder" component={NotePageNav} />
                <Route path="/add-folder" component={AddFolder} />
                <Route path="/add-note" component={NotePageNav} />
                <Route path="/add-note" component={AddNote} />
            </>
        );
    }

    renderMainRoutes() {
        const { notes, folders } = this.state;
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        render={routeProps => {
                            const { folderId } = routeProps.match.params;
                            const notesForFolder = getNotesForFolder(
                                notes,
                                folderId
                            );
                            return (
                                <NoteListMain
                                    {...routeProps}
                                    notes={notesForFolder}
                                />
                            );
                        }}
                    />
                ))}
                <Route
                    path="/note/:noteId"
                    render={routeProps => {
                        const { noteId } = routeProps.match.params;
                        const note = findNote(notes, noteId);
                        return <NotePageMain {...routeProps} note={note} />;
                    }}
                />
            </>
        );
    }

    render() {
        return (
            <div className="App">
                <nav className="App__nav">{this.renderNavRoutes()}</nav>
                <header className="App__header">
                    <h1>
                        <Link to="/">Noteful</Link>{' '}
                        <FontAwesomeIcon icon="check-double" />
                    </h1>
                </header>
                <main className="App__main">{this.renderMainRoutes()}</main>
            </div>
        );
    }
}

export default App;
