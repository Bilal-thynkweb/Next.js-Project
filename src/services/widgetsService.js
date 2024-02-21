export async function getAllRecords() {
  const res = await fetch(`/api/records`);
  return res.json();
}

export async function updateRecord(body) {
  const res = await fetch(`/api/records`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return res.json();
}

export async function addRecord(body) {
  const res = await fetch(`/api/records`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return res.json();
}

export async function deleteRecord(id) {
  const res = await fetch(`/api/records?id=${id}`, {
    method: "DELETE",
  });
  return res.json();
}
