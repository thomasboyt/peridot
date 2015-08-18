export default async function apiRequest(...args) {
  const resp = await window.fetch(...args);

  if (resp.status !== 200) {
    throw new Error(resp);
  }

  return await resp.json();
}
