import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';

import getStyles from './styles'
import { deleteNote } from 'actions/notes'

class Note extends Component {
  constructor (props) {
    super(props)

    this.removeNote = this.removeNote.bind(this)
  }

  removeNote (event) {
    event.preventDefault()
    // TODO
    axios.delete(`/api/note/${this.props.note._id}`)
    .then((response) => {
      this.props.deleteNote(this.props.index)
    })
    .catch((err) => {
      console.error(err)
    })
  }

  componentWillMount() {
    this.props.note.date = moment(this.props.note.date).format('L')  
  }

  render () {
    const styles = getStyles()

    return (
      <Paper style={styles.paper} zDepth={2} circle={false}>
        <div style={styles.paperTitle}>{this.props.note.title}</div>
        <Divider />
        <div>{this.props.note.text}</div>
        <Divider />
        <div>{this.props.note.date}</div>
        <Divider />
        <div>{this.props.note.color}</div>
        <Divider />
        <button onClick={this.removeNote}>
          del
        </button>
      </Paper>
    )
  }
}

Note.propTypes = {
  state: PropTypes.array.isRequired,
  note: PropTypes.object.isRequired,
  deleteNote: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired
}

Note.contextTypes = {
  store: PropTypes.object.isRequired
}

export default connect(
  state => ({
    state
  }),
  {deleteNote}
)(Note)
