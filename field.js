const FIELD_KEY = "signal_field";

function getField() {
    return JSON.parse(localStorage.getItem(FIELD_KEY) || "{}");
}

function setField(data) {
    localStorage.setItem(FIELD_KEY, JSON.stringify(data));
}

function updateField(team, nodeId, fragment) {
    const field = getField();

    if (!field[nodeId]) {
        field[nodeId] = { visits: [] };
    }

    field[nodeId].visits.push({
        team,
        fragment,
        time: Date.now()
    });

    setField(field);
}
