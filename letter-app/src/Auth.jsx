import { useEffect } from "react";
import { gapi } from "gapi-script";

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const Auth = ({ onLogin }) => {
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: "profile email https://www.googleapis.com/auth/drive.file",
      });
    }
    gapi.load("client:auth2", start);
  }, []);

  const signIn = () => {
    gapi.auth2.getAuthInstance().signIn().then(user => {
      const profile = user.getBasicProfile();
      const token = user.getAuthResponse().access_token;
      onLogin({ name: profile.getName(), email: profile.getEmail(), token });
    });
  };

  return <button onClick={signIn}>Sign in with Google</button>;
};

export default Auth;
