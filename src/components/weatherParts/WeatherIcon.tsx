//https://www.hko.gov.hk/textonly/v2/explain/wxicon_e.htm

const WeatherIcon = ({ code }) => {
  return (
    <img
      className="weatherIcon"
      src={`https://www.hko.gov.hk/images/HKOWxIconOutline/pic${code}.png`}
    />
  );
};

export default WeatherIcon;
