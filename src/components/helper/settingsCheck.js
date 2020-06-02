import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getSettings } from '../../store/actions/settingsActions';
import handleTtsClick from './settings/tts';

const mapStateToProps = state => ({
  settings: state.settings.settings
});

const mapDispatchToProps = dispatch => ({
  getSettings: () => dispatch(getSettings())
});

const SettingsChecker = connect(mapStateToProps, mapDispatchToProps)(({ children, getSettings, settings, help }) => {
  useEffect(() => { getSettings(); }, []);

  const props = { className: [], children: [] };

  if (settings.tts) {
    props.children.push(
      <button className="button is-large is-danger fab-tts" key="btn-tts" onClick={ handleTtsClick }>
        <span className="icon is-large">
          <i className="fas fa-volume-up" />
        </span>
      </button>
    );
  }
  if (settings.large) {
    props.className.push('font-large');
  }
  if (settings.dyslexia) {
    props.className.push('font-dyslexia');
  }
  if (settings.help !== '' && help) {
    props.children.push(
      <button className="button is-large is-danger fab-help" key="btn-help" onClick={ handleTtsClick }>
        <span className="icon is-large">
          <i className="fas fa-question-circle" />
        </span>
      </button>
    );
  }

  props.className = props.className.join(' ');

  return (
    <span { ...props }>
      { children }
      { props.children }
    </span>
  );
});

const settingsCheck = (settingsProps = { help: false }) => Components => props => (
  <SettingsChecker { ...settingsProps }>
    <Components { ...props } />
  </SettingsChecker>
);

export default settingsCheck;