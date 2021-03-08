import React from 'react'
import PropTypes from 'prop-types'
import { InputButton } from './../components'
import './Settings.css'

const Settings = ({ R, user, settings, onClickSignOut, onClickLanguage }) => (
  <div id='settings'>
    <header>
      <h2>{R.strings.settings}</h2>
    </header>
    <div className='wrapper'>
      <div className='user-info'>
        <div className='picture' style={{ backgroundImage: `url(${user.picture})` }} />
        <div className='info'>
          <h3>{user.name}</h3>
          <p className='provider'>
            {R.strings.signedInWith} <span>{user.provider}</span>
          </p>
        </div>
        <div>
          <InputButton text={R.strings.signOut} onClick={onClickSignOut} />
        </div>
      </div>
      <div className='language-info'>
        <h3>{R.strings.language}</h3>
        <ul>
          <li>
            <InputButton
              text={R.strings.english}
              onClick={() => onClickLanguage('en')}
              className={`language ${settings.language === 'en' ? 'selected' : ''}`} />
          </li>
          <li>
            <InputButton
              text={R.strings.portuguese}
              onClick={() => onClickLanguage('pt-br')}
              className={`language ${settings.language === 'pt-br' ? 'selected' : ''}`} />
          </li>
        </ul>
      </div>
    </div>
  </div>
)

Settings.propTypes = {
  R: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  onClickSignOut: PropTypes.func.isRequired
}

export default Settings
