import React from 'react';
import { useTracked } from './../../Store';

const AppInlineProfile = (props) => {

  const [state] = useTracked();

  return (
    <div className="profile">
      <div>
        <img src={require('./../../assets/user.png')} alt="logo" />
      </div>
      <a href="#" className="profile-link" onClick={e => e.preventDefault()}>
        <span className="username">{state.user.name}</span>
      </a>
    </div>
  );
}

export default React.memo(AppInlineProfile);
