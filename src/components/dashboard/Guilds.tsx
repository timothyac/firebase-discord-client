import React, { useState, useEffect } from "react";

import { db } from "../../firebase";
import { requestUserGuild } from "../../utils/discord";

const Guilds = ({ uid }: { uid: string }) => {
  const [guilds, setGuilds] = useState([]);

  const loadUsersGuilds = async () => {
    try {
      // Get user doc
      const doc = await db.collection("users").doc(uid).get();

      // Get user guilds
      const guilds = await doc.data()?.guilds;

      // Check to see if it is empty
      if (!guilds || guilds.length === 0) {
        requestUserGuild(uid)
          // Save the guilds in the database
          .then((guilds) => {
            db.collection("users").doc(uid).update({ guilds });
            return guilds;
          })
          // Store the user's guilds in state
          .then((guilds) => setGuilds(guilds))
          .catch((err) => alert(err));
      } else {
        setGuilds(guilds);
      }
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };

  useEffect(() => {
    loadUsersGuilds();
  }, []);

  return (
    <>
      {guilds.length !== 0 &&
        guilds.map(({ id, name }) => <div key={id}>{name}</div>)}
    </>
  );
};

export default Guilds;
