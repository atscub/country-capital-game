import React, { useReducer, useEffect } from "react";

const ACTIONS = {
  INIT: "init",
  SELECT: "select",
};

const onInit = (state, data) => {
  const places = [...Object.keys(data), ...Object.values(data)].sort(
    (a, b) => 0.5 - Math.random()
  );
  return { selected: [], places: places, data: data };
};

const onSelect = (state, place) => {
  const { selected, places, data } = state;
  if (
    selected.length === 1 &&
    (data[place] == selected[0] || data[selected[0]] == place)
  ) {
    return {
      ...state,
      selected: [],
      places: places.filter((p) => p !== place && p !== selected[0]),
    };
  } else if (selected.length > 1) {
    return { ...state, selected: [place] };
  } else {
    // Values should be unique
    return { ...state, selected: [...new Set([...selected, place])] };
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.INIT:
      return onInit(state, action.payload);
    case ACTIONS.SELECT:
      return onSelect(state, action.payload);
  }
};

export default function CountryCapitalGame({ data }) {
  const [{ selected, places }, dispatch] = useReducer(reducer, {
    selected: [],
    places: [],
    data: {},
  });

  useEffect(() => {
    dispatch({ type: ACTIONS.INIT, payload: data });
  }, [data]);

  const selectedColor = selected.length === 1 ? "blue" : "red";

  const handleSelectPlace = (place) => {
    dispatch({ type: ACTIONS.SELECT, payload: place });
  };

  return (
    <div>
      {places.length > 0 ? (
        places.map((place) => (
          <button
            key={place}
            onClick={() => handleSelectPlace(place)}
            style={
              selected.includes(place) ? { background: selectedColor } : {}
            }
          >
            {place}
          </button>
        ))
      ) : (
        <h2>Congratulations</h2>
      )}
    </div>
  );
}
