interface TokenData {
  token_type: string;
  expires_in: number;
  access_token: string;
}
export const getToken = async () => {
  const res = await fetch("https://api.petfinder.com/v2/oauth2/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      grant_type: "client_credentials",
      client_id: "vvdSXI35WImE30w1spcTbVvIX6NGRa5ZdsDPQRM1m01hjziFPz",
      client_secret: "0479O0ZRBUFOuHbVrRvOBfVfhSop3cLY4XPG2fsU",
    }),
  });
  const data: TokenData = await res.json();
  return data.access_token;
};
