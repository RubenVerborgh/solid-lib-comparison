import React from 'react';
import data from '@solid/query-ldflex';

interface Props {
  webId: string;
};

export const FriendList: React.FC<Props> = (props) => {
  const [friendList, setFriendList] = React.useState<string[]>([]);

  React.useEffect(() => void (async () => {
    let friends : string[] = [];
    for await (const friend of data[props.webId].friends)
      setFriendList(friends = [...friends, await data[friend].name.value]);
  })(), [props.webId]);

  return <>
    <section className="section content">
      <h2>Friends:</h2>
      <ul>
        {friendList.map((friend, i) => <li key={`friend${i}`}>{friend}</li>)}
      </ul>
    </section>
  </>;
};
