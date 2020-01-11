import React from 'react';
import { getProfile } from '../services/getProfile';
import { updateProfile } from '../services/updateProfile';

interface Props {
  webId: string;
};

export interface Profile {
  name?: string;
  nickname?: string;
};

export const ProfileEditor: React.FC<Props> = (props) => {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);
  const [name, setName] = React.useState('');
  const [nickname, setNickname] = React.useState('');

  React.useEffect(() => {
    getProfile(props.webId).then(({ name, nickname }) => {
      setIsLoaded(true);
      setName(name || '');
      setNickname(nickname || '');
    });
  }, [props.webId]);

  if (!isLoaded) {
    return <>Loading&hellip;</>;
  }

  const onSubmit: React.FormEventHandler = (event) => {
    event.preventDefault();

    setIsSaving(true);

    updateProfile(props.webId, { name, nickname })
    .then(() => setIsSaving(false));
  };

  const buttonClass = isSaving ? 'is-loading button is-primary' : 'button is-primary';

  return <>
    <section className="section">
      <form onSubmit={onSubmit}>
        <div className="field">
          <div className="control">
            <label htmlFor="name" className="label">Name:</label>
            <input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="input"
              disabled={isSaving}
            />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <label htmlFor="nickname" className="label">Nickname:</label>
            <input
              id="nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              type="text"
              className="input"
              disabled={isSaving}
            />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <button type="submit" className={buttonClass}>Update</button>
          </div>
        </div>
      </form>
    </section>
  </>;
};
