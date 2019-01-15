import React from 'react';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from "@material-ui/core/DialogTitle";
import FlashOnIcon from '@material-ui/icons/FlashOn'
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import Typography from '@material-ui/core/Typography';
import { speak } from './Voice';
import { withStyles } from '@material-ui/core/styles';

const icon = JSON.parse(window.localStorage.getItem('icon'));
const style = theme => ({
  dialog: {
    padding: theme.spacing.unit * 5,
    zIndex: 2000
  },
  dialogTitle: {
    fontSize: '30pt'
  },
  flashIcon: {
    fontSize: '36pt'
  },
  grid: {
    margin: 10,
    textAlign: 'center'
  },
  record: {
    fontSize: icon ? '40pt' : '60pt'
  },
  replyIcon: {
    fontSize: '24pt'
  }
});

class Mail extends React.Component {
  constructor(props) {
    super(props);
    this.ok = `
      Dear ${ this.props.from },
      \r\n\n
      Sounds great!`;
    this.no = `
      Dear ${ this.props.from },
      \r\n\n
      No, sorry. I don't think so.`;
    this.maybe = `
      Dear ${ this.props.from },
      `;
    this.state = {
      read: JSON.parse(window.localStorage.getItem('tts')) ? (
        <Button variant='contained' color='secondary' onClick={ () => Mail.getAllText() }>
          <RecordVoiceOverIcon className={ this.props.classes.record } />&nbsp;
          Read Email
        </Button>
      ) : null
    };
  }

  entered() {
    document.getElementsByClassName('mail-body')[0].innerHTML = this.props.data;
  }

  static getAllText() {
    speak(document.getElementsByClassName('mail-body')[0].innerText);
  }

  static getSelectedText() {
    let text = '';
    if (window.getSelection) {
      text = window.getSelection().toString();
    }
    speak(text);
  }

  send(value) {
    document.getElementById('btn-compose').click();
    setTimeout(() => {
      document.getElementById('recipient').value = this.props.address.substring(0, this.props.address.length - 1);
      document.getElementById('recipient').setAttribute('disabled', 'true');
      document.getElementById('compose-body').value = value;
      document.getElementById('compose-body').setAttribute('disabled', 'true');
      setTimeout(() => {
        document.getElementById('btn-send').click();
      }, 2000);
    }, 1000);
  }

  render() {
    const { classes } = this.props;
    return (
      <Dialog className={ classes.dialog } open={ this.props.open } fullScreen={ true } onClose={ () => this.props.onClose() } onEntered={ () => this.entered() }>
        <Grid container spacing={ 8 }>
          <Grid item sm={ 7 }>
            <DialogTitle className={ classes.dialogTitle } onClick={ () => speak(this.props.subject) }>{ this.props.subject }</DialogTitle>
            <br />
          </Grid>
          <Grid item sm={ 3 }>
            <br />
            <br />
            { this.state.read }
          </Grid>
          <Grid item sm={ 2 }>
            <br />
            <IconButton aria-label='Close' color='primary' onClick={ () => this.props.func(false) }>
              <CloseIcon className={ classes.record } />
            </IconButton>
          </Grid>
        </Grid>
        <br />
        <div className={ `${ classes.dialog } mail-body` } onClick={ () => Mail.getAllText() } onMouseUp={ () => Mail.getSelectedText() } />
        <Grid container spacing={ 8 } className={ classes.grid }>
          <Grid item sm={ 12 }>
            <br />
            <br />
            <Typography variant='h3' onClick={ () => speak('Quick reply') }>
              <FlashOnIcon className={ classes.flashIcon } />Quick Reply
            </Typography>
            <br />
            <br />
          </Grid>
          <Grid item sm={ 4 } />
          <Grid item sm={ 1 }>
            <IconButton aria-label='Ok' color='primary' onClick={ () => this.send(this.ok) }>
              <ThumbUpIcon className={ classes.replyIcon } />
            </IconButton>
          </Grid>
          <Grid item sm={ 1 }>
            <IconButton aria-label='No' color='primary' onClick={ () => this.send(this.no) } >
              <ThumbDownIcon className={ classes.replyIcon } />
            </IconButton>
          </Grid>
          <Grid item sm={ 1 }>
            <IconButton aria-label='Maybe' color='primary' onClick={ () => this.send(this.maybe) }>
              <SentimentDissatisfiedIcon className={ classes.replyIcon } />
            </IconButton>
          </Grid>
          <Grid item sm={ 1 }>
            <IconButton aria-label='Maybe' color='primary' onClick={ () => this.send('test') }>
              <SentimentDissatisfiedIcon className={ classes.replyIcon } />
            </IconButton>
          </Grid>
        </Grid>
        <br />
        <br />
        <br />
      </Dialog>
    );
  }
}

export default withStyles(style)(Mail);