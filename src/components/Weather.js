export default function Weather({ location, children }) {
  return (
    <div>
      <h2>Weather {location}</h2>
      <ul className="weather">{children}</ul>
    </div>
  );
}
