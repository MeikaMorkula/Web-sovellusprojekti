
export async function userLoggedIn()
{
  try{
        const me = await fetch("http://localhost:3001/user/me", {
        credentials: "include",
      });

      return me.ok;
  } catch (err)
  {
    return false;
  }

      
}