export function useLocalUser() {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}
