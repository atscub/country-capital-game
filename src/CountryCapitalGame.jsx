import React, { useState, useMemo } from "react";

export default function CountryCapitalGame({ data }) {
  const randomizedPlaces = useMemo(() => {
    return [...Object.keys(data), ...Object.values(data)].sort(
      (a, b) => 0.5 - Math.random()
    );
  }, []);

  const [places, setPlaces] = useState(randomizedPlaces);
  const [selected, setSelected] = useState([]);

  const selectedColor = selected.length === 1 ? "blue" : "red";

  const handleSelectPlace = (place) => {
    if (
      selected.length === 1 &&
      (data[place] == selected[0] || data[selected[0]] == place)
    ) {
      setSelected([]);
      setPlaces(places.filter((p) => p !== place && p !== selected[0]));
    } else if (selected.length > 1) {
      setSelected([place]);
    } else {
      // Values should be unique
      setSelected([...new Set([...selected, place])]);
    }
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
