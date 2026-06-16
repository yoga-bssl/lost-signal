const NODES = [
    {
        id: 1,
        name: "Embankment Node",
        lat: 51.5070,
        lng: -0.1220,
        fragment: "A7",
        instruction: "Urban interference detected. Extract signal fragment.",
        expectedAction: "append"
    },
    {
        id: 2,
        name: "South Bank Node",
        lat: 51.5064,
        lng: -0.1150,
        fragment: "19",
        instruction: "Phase inversion detected.",
        expectedAction: "reverse"
    },
    {
        id: 3,
        name: "Waterloo Node",
        lat: 51.5033,
        lng: -0.1147,
        fragment: "LX",
        instruction: "Final vector alignment.",
        expectedAction: "append"
    }
];
