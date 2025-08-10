// Get data using api
async function loadData(api) {
  try {
    const res = await fetch(api);
    const data = await res.json();
  } catch (error) {}
}

// Show warning

// Show Spinner
