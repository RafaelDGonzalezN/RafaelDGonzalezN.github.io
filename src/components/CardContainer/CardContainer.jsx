import React from "react";

function Cards({ allDogs }) {
  const dogsList = allDogs;

  return (
    <div>
      {dogsList?.map((dog) => (
        <div key={dog.id}></div>
      ))}
    </div>
  );
}

export default Cards;