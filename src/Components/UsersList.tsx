import React from "react";
import ListItem from "./ListItem";
import NoMoreItems from "./NoMoreItems";

type UsersListProps = {
  propName?: string;
};
const UsersList: React.FC<UsersListProps> = () => {
  const [usersArray, setUsersArray] = React.useState<IUser[]>([]);
  const [usersTotal, setUsersTotal] = React.useState<number>(0);
  const [isAll, setIsAll] = React.useState(false);
  const [noUsers, setNoUsers] = React.useState(false);

  React.useEffect(() => {
    usersTotal === usersArray?.length && usersTotal !== 0
      ? setIsAll(true)
      : setIsAll(false);
    usersArray?.length === 0 || !usersArray
      ? setNoUsers(true)
      : setNoUsers(false);
  }, [usersTotal, usersArray]);

  const showUser = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    login: string
  ) => {
    console.log("clicked");
    // history.push(`/${login}`);
    // history.push(`/${e.currentTarget.getAttribute("data-value")}`);
  };

  return (
    <div>
      {noUsers ? (
        <NoMoreItems information="There are no users! Let's add someone..." />
      ) : (
        usersArray &&
        usersArray.map((user: IUser) => {
          return (
            <ListItem
              key={user.id}
              avatarUrl={user.avatar_url}
              description={user.node_id}
              fullName={user.login}
              id={user.id.toString()}
              type={user.type}
              showUser={(e) => showUser(e, user.login)}
            />
          );
        })
      )}
      {isAll && <NoMoreItems information="Yay! You have seen it all!" />}
    </div>
  );
};

export default UsersList;
