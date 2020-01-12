import React from 'react';
import data from '@solid/query-ldflex';

interface Props {
  webId: string;
};

export const FriendList: React.FC<Props> = (props) => {
  const [friendList, setFriendList] = React.useState<string[]>();

  React.useEffect(() => {
    data[props.webId].friends.toArray((f: any) => data[f].name.value)
      .then(setFriendList);
  }, [props.webId]);

  if (!friendList) {
    return <>Loading friends&hellip;</>;
  }

  return <>
    <section className="section content">
      <h2>Friends:</h2>
      <ul>
        {friendList.map((friend, i) => <li key={`friend${i}`}>{friend}</li>)}
      </ul>
    </section>
  </>;
};
