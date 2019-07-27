import { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';

const HelpEmail = () => {
  const [state, setState] = useState('');
  useEffect(() => {
    const get = item => !!localStorage.getItem(item) ? JSON.parse(localStorage.getItem(item)) : '';
    setState(get('help'));
  }, []);
  useEffect(() => { localStorage.setItem('help', state) }, [state]);
  const handleChange = e => setState(e.target.value);
  return (
    <Card>
      <CardContent className="settings-name">Help Email</CardContent>
      <CardActions className="settings-action">
        <TextField
          fullWidth
          label="Help Email"
          margin="normal"
          onChange={ handleChange }
          variant="outlined"
          type="email"
        />
      </CardActions>
    </Card>
  );
};

export default HelpEmail;