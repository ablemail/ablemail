import React, { useState, useEffect } from 'react';
import MailItem from './MailItem';
import { connect } from 'react-redux';
import { getMail } from '../../store/actions/mailActions';

const Inbox = ({ mail, getMail }) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { getMail(); }, []);

  const [state, setState] = useState({
    noMail: (
      <div className="container no-mail">
        <div className="level no-mail">
          <div className="level-item has-text-centered">
            <progress className="progress is-primary" max="100" />
          </div>
        </div>
      </div>
    ),
    loading: false
  });

  const list = mail && mail.length > 0 && mail.some(m => m !== null) ?
    mail.map((message, i) => message && message.body ? <MailItem key={ message.body.messageId } mail={ message } index={ i } /> : null)
    : state.noMail;

  useEffect(() => {
    if ((!mail || mail.length === 0 || mail.every(m => m === null)) && state.loading) {
      setState({
        ...state,
        noMail: (
          <div className="container no-mail">
            <div className="level no-mail">
              <div className="level-item has-text-centered">
                <h1 className="title is-1 has-text-primary">
                  <i className="fas fa-folder-open" />
                  &nbsp;
                  No mail!
                </h1>
              </div>
            </div>
          </div>
        )
      });
    } else if ((!mail || mail.length === 0 || mail.every(m => m === null)) && !state.loading) {
      setState({
        ...state,
        loading: true
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mail]);

  return (
    <div className="inbox">
      { list }
    </div>
  );
};

const mapStateToProps = state => ({
  mail: state.mail.mail
});

const mapDispatchToProps = dispatch => ({
  getMail: () => dispatch(getMail())
});

export default connect(mapStateToProps, mapDispatchToProps)(Inbox);