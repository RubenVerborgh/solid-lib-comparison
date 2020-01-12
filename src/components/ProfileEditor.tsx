import React from 'react';
import data from '@solid/query-ldflex';

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

  React.useEffect(() => void (async () => {
    await data[props.webId].name.then(setName);
    await data[props.webId].nick.then(setNickname);
    setIsLoaded(true);
  })(), [props.webId]);

  if (!isLoaded) {
    return <>Loading&hellip;</>;
  }

  const onSubmit: React.FormEventHandler = async (event) => {
    event.preventDefault();

    setIsSaving(true);
    await data[props.webId].name.set(name);
    await data[props.webId].nick.set(nickname);
    setIsSaving(false);
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
