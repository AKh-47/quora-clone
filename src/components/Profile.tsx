import React, { ReactElement, useEffect, useState } from "react";
import "../styles/profile.scss";

import { useUser } from "../context/UserContext";

interface Props {
  match: any;
}

export default function Profile({ match }: Props): ReactElement {
  const { getUserbyId } = useUser();

  const [user, setUser] = useState<any>();

  useEffect(() => {
    getUserbyId(match.params.id).then((userDetails) => {
      setUser(userDetails);
    });
  }, []);

  return (
    <div className="profile">
      <main>
        <section>
          <div className="profile__details">
            <img
              src={user?.photo}
              alt={user?.firstName + " " + user?.lastName}
            />
            <h1>{user?.firstName + " " + user?.lastName}</h1>
          </div>
        </section>
        <aside></aside>
      </main>
    </div>
  );
}
