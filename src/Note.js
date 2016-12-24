import React, { Component } from 'react';
import { ButtonGroup, Button, Glyphicon } from 'react-bootstrap';

class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      note: this.props.note
    };
  }

  render() {
    return (
      <div className="list-group-item">
        {this.state.expanded ? this.state.note.text : this.state.note.text.substr(0, 3) + "..."}
        <ButtonGroup>
          <Button onClick={this.toggleExpand.bind(this)}><Glyphicon glyph={this.state.expanded ? "collapse-up" : "collapse-down"} /></Button>
          <Button onClick={this.navNote.bind(this)}><Glyphicon glyph="pencil" /></Button>
        </ButtonGroup>
      </div>
    );
  }

  toggleExpand() {
    this.setState({expanded: !this.state.expanded});
  }

  navNote() {
    this.context.router.push("/notes/" + this.state.note.id);
  }
}

Note.contextTypes = {
  router: React.PropTypes.object
};


export default Note;
